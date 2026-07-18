import { createHash } from "node:crypto";

export type RateLimitResult = {
  allowed: boolean;
  retryAfter?: number;
  remaining: number;
  resetAt: number;
  store: "memory" | "redis-rest";
};

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type MemoryBucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, MemoryBucket>();

export async function checkRateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> {
  const hashedKey = hashRateLimitKey(key);
  const redisUrl = process.env.RATE_LIMIT_REDIS_REST_URL;
  const redisToken = process.env.RATE_LIMIT_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    const redisResult = await checkRedisRestRateLimit({
      key: hashedKey,
      limit,
      windowMs,
      redisUrl,
      redisToken,
    });

    if (redisResult) return redisResult;
  }

  return checkMemoryRateLimit({ key: hashedKey, limit, windowMs });
}

function hashRateLimitKey(key: string) {
  return createHash("sha256").update(key).digest("hex");
}

function checkMemoryRateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();

  for (const [bucketKey, bucket] of memoryBuckets) {
    if (bucket.resetAt <= now) memoryBuckets.delete(bucketKey);
  }

  const bucket = memoryBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    const resetAt = now + windowMs;
    memoryBuckets.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      resetAt,
      store: "memory",
    };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
      remaining: 0,
      resetAt: bucket.resetAt,
      store: "memory",
    };
  }

  bucket.count += 1;

  return {
    allowed: true,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
    store: "memory",
  };
}

async function checkRedisRestRateLimit({
  key,
  limit,
  windowMs,
  redisUrl,
  redisToken,
}: RateLimitOptions & {
  redisUrl: string;
  redisToken: string;
}): Promise<RateLimitResult | null> {
  const safeKey = `rate-limit:${encodeURIComponent(key)}`;
  const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000));

  try {
    const increment = await redisCommand<number>(redisUrl, redisToken, [
      "INCR",
      safeKey,
    ]);

    if (increment === 1) {
      await redisCommand<string>(redisUrl, redisToken, [
        "EXPIRE",
        safeKey,
        String(windowSeconds),
      ]);
    }

    const ttl = await redisCommand<number>(redisUrl, redisToken, ["TTL", safeKey]);
    const retryAfter = ttl > 0 ? ttl : windowSeconds;
    const resetAt = Date.now() + retryAfter * 1000;

    if (increment > limit) {
      return {
        allowed: false,
        retryAfter,
        remaining: 0,
        resetAt,
        store: "redis-rest",
      };
    }

    return {
      allowed: true,
      remaining: Math.max(0, limit - increment),
      resetAt,
      store: "redis-rest",
    };
  } catch {
    return null;
  }
}

async function redisCommand<T>(
  redisUrl: string,
  redisToken: string,
  command: string[],
): Promise<T> {
  const response = await fetch(redisUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Redis rate limit command failed.");
  }

  const payload = (await response.json()) as { result?: T; error?: string };
  if (payload.error || payload.result === undefined) {
    throw new Error("Redis rate limit command returned an error.");
  }

  return payload.result;
}
