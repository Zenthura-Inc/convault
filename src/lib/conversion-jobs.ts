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
  sourceBytes: Uint8Array;
  resultBytes?: Uint8Array;
  resultFilename?: string;
  resultMimeType?: string;
  failureReason?: string;
  createdAt: string;
  expiresAt: string;
};

type CreateConversionJobInput = {
  filename: string;
  bytes: number;
  inputFormat: SupportedUploadFormat;
  outputFormat: string;
  mimeType: string;
  sourceBytes: Uint8Array;
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
  sourceBytes,
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
    sourceBytes,
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

export function processAuthorizedConversionJob(id: string, token: string) {
  const job = getAuthorizedConversionJob(id, token);
  if (!job || job.status === "expired") return null;

  if (job.status === "ready" || job.status === "failed") {
    return job;
  }

  job.status = "processing";

  const result = convertJob(job);
  if (!result) {
    job.status = "failed";
    job.failureReason = "This conversion is not available yet.";
    job.sourceBytes = new Uint8Array();
    return job;
  }

  job.status = "ready";
  job.resultBytes = result.bytes;
  job.resultFilename = result.filename;
  job.resultMimeType = result.mimeType;
  job.sourceBytes = new Uint8Array();
  return job;
}

export function getAuthorizedConversionResult(id: string, token: string) {
  const job = getAuthorizedConversionJob(id, token);
  if (!job || job.status !== "ready" || !job.resultBytes || !job.resultFilename || !job.resultMimeType) {
    return null;
  }

  return {
    bytes: job.resultBytes,
    filename: job.resultFilename,
    mimeType: job.resultMimeType,
  };
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
    resultFilename: job.resultFilename,
    resultMimeType: job.resultMimeType,
    failureReason: job.failureReason,
    createdAt: job.createdAt,
    expiresAt: job.expiresAt,
  };
}

function convertJob(job: ConversionJob) {
  const outputBaseName = getBaseName(job.filename);

  if (job.inputFormat === job.outputFormat) {
    return {
      bytes: job.sourceBytes,
      filename: `${outputBaseName}.${job.outputFormat}`,
      mimeType: job.mimeType,
    };
  }

  if (job.inputFormat === "txt" && job.outputFormat === "pdf") {
    const text = new TextDecoder("utf-8", { fatal: false }).decode(job.sourceBytes);
    return {
      bytes: createSimplePdf(text),
      filename: `${outputBaseName}.pdf`,
      mimeType: "application/pdf",
    };
  }

  return null;
}

function getBaseName(filename: string) {
  return (
    filename
      .replace(/\.[^/.]+$/, "")
      .replace(/[^\w.-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "converted-file"
  );
}

function createSimplePdf(text: string) {
  const lines = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .flatMap((line) => wrapPdfLine(line, 86))
    .slice(0, 42);

  const content = [
    "BT",
    "/F1 11 Tf",
    "50 770 Td",
    "14 TL",
    ...lines.map((line) => `(${escapePdfText(line)}) Tj T*`),
    "ET",
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${byteLength(content)} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefStart = byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  pdf += offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("");
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefStart}\n%%EOF\n`;

  return new TextEncoder().encode(pdf);
}

function wrapPdfLine(line: string, width: number) {
  if (!line) return [""];

  const wrapped: string[] = [];
  for (let index = 0; index < line.length; index += width) {
    wrapped.push(line.slice(index, index + width));
  }
  return wrapped;
}

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function byteLength(value: string) {
  return new TextEncoder().encode(value).length;
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
