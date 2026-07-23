import type { NextRequest } from "next/server";

import {
  processAuthorizedConversionJob,
  toPublicConversionJob,
} from "@/lib/conversion-jobs";
import { jsonApiResponse } from "@/lib/api-responses";
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

export async function POST(request: NextRequest, context: JobRouteContext) {
  const { id } = await context.params;
  const token = getRequestToken(request);

  if (!isValidJobIdentifier(id) || !isValidJobIdentifier(token)) {
    return jobNotFound();
  }

  const job = processAuthorizedConversionJob(id, token);
  if (!job) {
    return jobNotFound();
  }

  return jsonApiResponse(
    {
      ok: job.status !== "failed",
      job: toPublicConversionJob(job),
      error:
        job.status === "failed"
          ? {
              code: "conversion_failed",
              message: job.failureReason ?? "Conversion failed.",
            }
          : undefined,
    },
    { status: job.status === "failed" ? 422 : 200 },
  );
}
