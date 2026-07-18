import type { NextRequest } from "next/server";

import { getAuthorizedConversionResult } from "@/lib/conversion-jobs";

export const runtime = "nodejs";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

type JobRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, context: JobRouteContext) {
  const { id } = await context.params;
  const token = request.nextUrl.searchParams.get("token") ?? "";

  if (!isValidIdentifier(id) || !isValidIdentifier(token)) {
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
      "Content-Disposition": `attachment; filename="${escapeContentDispositionFilename(
        result.filename,
      )}"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function resultNotFound() {
  return Response.json(
    {
      ok: false,
      error: {
        code: "not_found",
        message: "Converted file was not found or has expired.",
      },
    },
    {
      status: 404,
      headers: NO_STORE_HEADERS,
    },
  );
}

function escapeContentDispositionFilename(filename: string) {
  return filename.replace(/["\\\r\n]/g, "_");
}

function isValidIdentifier(value: string) {
  return /^[0-9a-f-]{36}$/i.test(value);
}
