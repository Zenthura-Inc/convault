import type { NextRequest } from "next/server";
import type { JobRouteContext } from "@/lib/job-route-security";

import {
  deleteAuthorizedConversionJob,
  getAuthorizedConversionJob,
  toPublicConversionJob,
} from "@/lib/conversion-jobs";
import { jsonApiOk } from "@/lib/api-responses";
import {
  getAuthorizedJobRouteParams,
  jobNotFound,
} from "@/lib/job-route-security";

export const runtime = "nodejs";

export async function GET(request: NextRequest, context: JobRouteContext) {
  const routeParams = await getAuthorizedJobRouteParams(request, context);
  if (!routeParams) {
    return jobNotFound();
  }

  const job = getAuthorizedConversionJob(routeParams.id, routeParams.token);
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
  const routeParams = await getAuthorizedJobRouteParams(request, context);
  if (!routeParams) {
    return jobNotFound();
  }

  const deleted = deleteAuthorizedConversionJob(routeParams.id, routeParams.token);
  if (!deleted) {
    return jobNotFound();
  }

  return jsonApiOk({});
}
