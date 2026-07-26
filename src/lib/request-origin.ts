import type { NextRequest } from "next/server";

import { jsonApiError } from "@/lib/api-responses";

export function requireSameOriginRequest(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return null;
  }

  try {
    if (new URL(origin).origin === request.nextUrl.origin) {
      return null;
    }
  } catch {
    return forbiddenOrigin();
  }

  return forbiddenOrigin();
}

function forbiddenOrigin() {
  return jsonApiError(403, "forbidden_origin", "Request origin is not allowed.");
}
