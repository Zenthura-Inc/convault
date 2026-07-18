import type { NextRequest } from "next/server";

import {
  getAuthorizedConversionJob,
  toPublicConversionJob,
} from "@/lib/conversion-jobs";

export const runtime = "nodejs";

type JobRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, context: JobRouteContext) {
  const { id } = await context.params;
  const token = request.nextUrl.searchParams.get("token") ?? "";

  if (!isValidIdentifier(id) || !isValidIdentifier(token)) {
    return Response.json(
      {
        ok: false,
        error: {
          code: "not_found",
          message: "Conversion job was not found or has expired.",
        },
      },
      { status: 404 },
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
      { status: 404 },
    );
  }

  return Response.json({
    ok: true,
    job: toPublicConversionJob(job),
  });
}

function isValidIdentifier(value: string) {
  return /^[0-9a-f-]{36}$/i.test(value);
}
