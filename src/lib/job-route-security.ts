import type { NextRequest } from "next/server";

import { jsonApiError } from "@/lib/api-responses";
import { NO_STORE_HEADERS } from "@/lib/http-headers";

export { NO_STORE_HEADERS };

export function getRequestToken(request: NextRequest) {
  const authorization = request.headers.get("authorization") ?? "";
  const [scheme, token] = authorization.split(/\s+/, 2);

  if (scheme?.toLowerCase() === "bearer" && token) {
    return token;
  }

  return "";
}

export function isValidJobIdentifier(value: string) {
  return /^[0-9a-f-]{36}$/i.test(value);
}

export function jobNotFound(message = "Conversion job was not found or has expired.") {
  return jsonApiError(404, "not_found", message);
}
