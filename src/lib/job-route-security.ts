import type { NextRequest } from "next/server";

import { jsonApiError } from "@/lib/api-responses";

export function getRequestToken(request: NextRequest) {
  const parts = (request.headers.get("authorization") ?? "").trim().split(/\s+/);
  const [scheme, token] = parts;

  if (parts.length === 2 && scheme?.toLowerCase() === "bearer" && token) {
    return token;
  }

  return "";
}

export function isValidJobIdentifier(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function jobNotFound(message = "Conversion job was not found or has expired.") {
  return jsonApiError(404, "not_found", message);
}
