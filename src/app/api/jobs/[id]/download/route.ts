import type { NextRequest } from "next/server";
import type { JobRouteContext } from "@/lib/job-route-security";

import { consumeAuthorizedConversionResult } from "@/lib/conversion-jobs";
import { API_SECURITY_HEADERS } from "@/lib/http-headers";
import {
  getAuthorizedJobRouteParams,
  jobNotFound,
} from "@/lib/job-route-security";

export const runtime = "nodejs";

export async function GET(request: NextRequest, context: JobRouteContext) {
  const routeParams = await getAuthorizedJobRouteParams(request, context);
  if (!routeParams) {
    return resultNotFound();
  }

  const result = consumeAuthorizedConversionResult(routeParams.id, routeParams.token);
  if (!result) {
    return resultNotFound();
  }

  const body = new Blob([Uint8Array.from(result.bytes).buffer], {
    type: result.mimeType,
  });

  return new Response(body, {
    headers: {
      ...API_SECURITY_HEADERS,
      "Content-Type": result.mimeType,
      "Content-Length": String(result.bytes.byteLength),
      "Content-Disposition": contentDispositionAttachment(result.filename),
      "X-Download-Options": "noopen",
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
    .replace(/[^A-Za-z0-9._ -]/g, "_")
    .slice(0, 120) || "converted-file";
  const encoded = encodeURIComponent(filename).replace(/['()]/g, escapeContentDispositionChar);

  return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}

function escapeContentDispositionChar(value: string) {
  return `%${value.charCodeAt(0).toString(16).toUpperCase()}`;
}
