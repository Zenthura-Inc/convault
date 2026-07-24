import type { NextRequest } from "next/server";
import type { JobRouteContext } from "@/lib/job-route-security";

import {
  processAuthorizedConversionJob,
  toPublicConversionJob,
} from "@/lib/conversion-jobs";
import { jsonApiResponse } from "@/lib/api-responses";
import {
  getAuthorizedJobRouteParams,
  jobNotFound,
} from "@/lib/job-route-security";

export const runtime = "nodejs";

export async function POST(request: NextRequest, context: JobRouteContext) {
  const routeParams = await getAuthorizedJobRouteParams(request, context);
  if (!routeParams) {
    return jobNotFound();
  }

  const job = processAuthorizedConversionJob(routeParams.id, routeParams.token);
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
