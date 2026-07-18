import type { NextRequest } from "next/server";

import {
  createConversionJob,
  toPublicConversionJob,
} from "@/lib/conversion-jobs";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  MAX_UPLOAD_BYTES,
  sanitizeDisplayFilename,
  validateUploadBytes,
} from "@/lib/upload-validation";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const MULTIPART_OVERHEAD_BYTES = 64 * 1024;
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

type ErrorCode =
  | "invalid_content_type"
  | "missing_content_length"
  | "file_too_large"
  | "missing_file"
  | "invalid_file"
  | "unsupported_file"
  | "unsupported_output"
  | "rate_limited"
  | "internal_error";

function jsonError(
  status: number,
  code: ErrorCode,
  message: string,
  headers?: HeadersInit,
) {
  return Response.json(
    {
      ok: false,
      error: {
        code,
        message,
      },
    },
    {
      status,
      headers: {
        ...NO_STORE_HEADERS,
        ...headers,
      },
    },
  );
}

export async function POST(request: NextRequest) {
  try {
    const rateLimit = await checkRateLimit({
      key: getClientKey(request),
      limit: RATE_LIMIT_MAX_REQUESTS,
      windowMs: RATE_LIMIT_WINDOW_MS,
    });

    const rateLimitHeaders = {
      "RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
      "RateLimit-Remaining": String(rateLimit.remaining),
      "RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
    };

    if (!rateLimit.allowed) {
      return jsonError(
        429,
        "rate_limited",
        "Too many upload attempts. Please wait a moment and try again.",
        {
          ...rateLimitHeaders,
          "Retry-After": String(rateLimit.retryAfter ?? 60),
        },
      );
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
      return jsonError(415, "invalid_content_type", "Upload must use multipart form data.");
    }

    const contentLength = request.headers.get("content-length");
    if (!contentLength) {
      return jsonError(411, "missing_content_length", "Upload size is required.");
    }

    const requestBytes = Number(contentLength);
    if (!Number.isSafeInteger(requestBytes) || requestBytes <= 0) {
      return jsonError(400, "invalid_file", "Upload size is invalid.");
    }

    if (requestBytes > MAX_UPLOAD_BYTES + MULTIPART_OVERHEAD_BYTES) {
      return jsonError(413, "file_too_large", "File is too large for the free converter.");
    }

    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return jsonError(400, "missing_file", "Please upload one file.");
    }

    if (file.size <= 0) {
      return jsonError(400, "invalid_file", "Uploaded file is empty.");
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return jsonError(413, "file_too_large", "File is too large for the free converter.");
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const validation = validateUploadBytes(bytes);

    if (!validation) {
      return jsonError(
        415,
        "unsupported_file",
        "Unsupported or ambiguous file type. Try JPG, PNG, WEBP, GIF, PDF, TXT, MP3, or WAV.",
      );
    }

    const outputFormat = String(form.get("outputFormat") ?? "").toLowerCase();
    if (!validation.allowedOutputs.includes(outputFormat)) {
      return jsonError(400, "unsupported_output", "Selected output format is not supported for this file.");
    }

    const job = createConversionJob({
      filename: sanitizeDisplayFilename(file.name),
      bytes: file.size,
      inputFormat: validation.detectedFormat,
      outputFormat,
      mimeType: validation.mimeType,
    });

    return Response.json(
      {
        ok: true,
        job: toPublicConversionJob(job),
        token: job.token,
        allowedOutputs: validation.allowedOutputs,
      },
      {
        headers: {
          ...NO_STORE_HEADERS,
          ...rateLimitHeaders,
        },
      },
    );
  } catch {
    return jsonError(500, "internal_error", "Upload could not be validated.");
  }
}

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "anonymous";
}
