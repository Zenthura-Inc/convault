import { timingSafeEqual } from "node:crypto";

import type { SupportedUploadFormat } from "@/lib/upload-validation";

export type ConversionJobStatus = "validated" | "queued" | "processing" | "ready" | "failed" | "expired";

export type ConversionJob = {
  id: string;
  token: string;
  status: ConversionJobStatus;
  filename: string;
  bytes: number;
  inputFormat: SupportedUploadFormat;
  outputFormat: string;
  mimeType: string;
  createdAt: string;
  expiresAt: string;
};

type CreateConversionJobInput = {
  filename: string;
  bytes: number;
  inputFormat: SupportedUploadFormat;
  outputFormat: string;
  mimeType: string;
  ttlMs?: number;
};

const DEFAULT_JOB_TTL_MS = 15 * 60 * 1000;
const MAX_IN_MEMORY_JOBS = 500;
const jobs = new Map<string, ConversionJob>();

export function createConversionJob({
  filename,
  bytes,
  inputFormat,
  outputFormat,
  mimeType,
  ttlMs = DEFAULT_JOB_TTL_MS,
}: CreateConversionJobInput) {
  cleanupExpiredJobs();

  if (jobs.size >= MAX_IN_MEMORY_JOBS) {
    deleteOldestJob();
  }

  const now = Date.now();
  const job: ConversionJob = {
    id: crypto.randomUUID(),
    token: crypto.randomUUID(),
    status: "validated",
    filename,
    bytes,
    inputFormat,
    outputFormat,
    mimeType,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + ttlMs).toISOString(),
  };

  jobs.set(job.id, job);
  return job;
}

export function getAuthorizedConversionJob(id: string, token: string) {
  cleanupExpiredJobs();

  const job = jobs.get(id);
  if (!job || !isTokenMatch(job.token, token)) {
    return null;
  }

  if (Date.parse(job.expiresAt) <= Date.now()) {
    jobs.delete(job.id);
    return {
      ...job,
      status: "expired" as const,
    };
  }

  return job;
}

export function toPublicConversionJob(job: ConversionJob) {
  return {
    id: job.id,
    status: job.status,
    filename: job.filename,
    bytes: job.bytes,
    inputFormat: job.inputFormat,
    outputFormat: job.outputFormat,
    mimeType: job.mimeType,
    createdAt: job.createdAt,
    expiresAt: job.expiresAt,
  };
}

function cleanupExpiredJobs() {
  const now = Date.now();

  for (const [id, job] of jobs) {
    if (Date.parse(job.expiresAt) <= now) {
      jobs.delete(id);
    }
  }
}

function deleteOldestJob() {
  const oldestKey = jobs.keys().next().value;
  if (oldestKey) jobs.delete(oldestKey);
}

function isTokenMatch(expected: string, received: string) {
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer);
}
