import type { NextRequest } from "next/server";

import {
  deleteAuthorizedConversionJob,
  getAuthorizedConversionJob,
  toPublicConversionJob,
} from "@/lib/conversion-jobs";

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
  const token = getRequestToken(request);

  if (!isValidIdentifier(id) || !isValidIdentifier(token)) {
    return Response.json(
      {
        ok: false,
        error: {
          code: "not_found",
          message: "Conversion job was not found or has expired.",
        },
      },
      {
        status: 404,
        headers: NO_STORE_HEADERS,
      },
    );
  }

  const job = getAuthorizedConversionJob(id, token);
  if (!job) {
    return Response.json(
      {
        ok: false,
        error: {
          code: "not_found",
          message: "Conversion job was not found or has expired.",
        },
      },
      {
        status: 404,
        headers: NO_STORE_HEADERS,
      },
    );
  }

  return Response.json(
    {
      ok: true,
      job: toPublicConversionJob(job),
    },
    {
      headers: NO_STORE_HEADERS,
    },
  );
}

export async function DELETE(request: NextRequest, context: JobRouteContext) {
  const { id } = await context.params;
  const token = getRequestToken(request);

  if (!isValidIdentifier(id) || !isValidIdentifier(token)) {
    return jobNotFound();
  }

  const deleted = deleteAuthorizedConversionJob(id, token);
  if (!deleted) {
    return jobNotFound();
  }

  return Response.json(
    {
      ok: true,
    },
    {
      headers: NO_STORE_HEADERS,
    },
  );
}

function jobNotFound() {
  return Response.json(
    {
      ok: false,
      error: {
        code: "not_found",
        message: "Conversion job was not found or has expired.",
      },
    },
    {
      status: 404,
      headers: NO_STORE_HEADERS,
    },
  );
}

function isValidIdentifier(value: string) {
  return /^[0-9a-f-]{36}$/i.test(value);
}

function getRequestToken(request: NextRequest) {
  const authorization = request.headers.get("authorization") ?? "";
  const [scheme, token] = authorization.split(/\s+/, 2);

  if (scheme?.toLowerCase() === "bearer" && token) {
    return token;
  }

  return request.nextUrl.searchParams.get("token") ?? "";
}
