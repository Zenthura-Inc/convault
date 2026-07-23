import type { NextRequest } from "next/server";

import {
  deleteAuthorizedConversionJob,
  getAuthorizedConversionJob,
  toPublicConversionJob,
} from "@/lib/conversion-jobs";
import { jsonApiOk } from "@/lib/api-responses";
import {
  getRequestToken,
  isValidJobIdentifier,
  jobNotFound,
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
    return jobNotFound();
  }

  const job = getAuthorizedConversionJob(id, token);
  if (!job) {
    return jobNotFound();
  }

  return jsonApiOk(
    {
      job: toPublicConversionJob(job),
    },
  );
}

export async function DELETE(request: NextRequest, context: JobRouteContext) {
  const { id } = await context.params;
  const token = getRequestToken(request);

  if (!isValidJobIdentifier(id) || !isValidJobIdentifier(token)) {
    return jobNotFound();
  }

  const deleted = deleteAuthorizedConversionJob(id, token);
  if (!deleted) {
    return jobNotFound();
  }

  return jsonApiOk({});
}
