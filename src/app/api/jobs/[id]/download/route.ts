import type { NextRequest } from "next/server";

import { getAuthorizedConversionResult } from "@/lib/conversion-jobs";
import {
  getRequestToken,
  isValidJobIdentifier,
  jobNotFound,
  NO_STORE_HEADERS,
} from "@/lib/job-route-security";

export const runtime = "nodejs";

type JobRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, context: JobRouteContext) {
  const { id } = await context.params;
  const token = getRequestToken(request);

  if (!isValidJobIdentifier(id) || !isValidJobIdentifier(token)) {
    return resultNotFound();
  }

  const result = getAuthorizedConversionResult(id, token);
  if (!result) {
    return resultNotFound();
  }

  const body = new Blob([Uint8Array.from(result.bytes).buffer], {
    type: result.mimeType,
  });

  return new Response(body, {
    headers: {
      ...NO_STORE_HEADERS,
      "Content-Type": result.mimeType,
      "Content-Length": String(result.bytes.byteLength),
      "Content-Disposition": contentDispositionAttachment(result.filename),
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function resultNotFound() {
  return jobNotFound("Converted file was not found or has expired.");
}

function contentDispositionAttachment(filename: string) {
  const fallback = filename
    .normalize("NFKD")
    .replace(/[^\x20-\x7e]+/g, "_")
    .replace(/["\\\r\n]/g, "_")
    .slice(0, 120) || "converted-file";
  const encoded = encodeURIComponent(filename).replace(/['()]/g, escapeContentDispositionChar);

  return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}

function escapeContentDispositionChar(value: string) {
  return `%${value.charCodeAt(0).toString(16).toUpperCase()}`;
}
