import type { NextRequest } from "next/server";

import { jsonApiError } from "@/lib/api-responses";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type JobRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type AuthorizedJobRouteParams = {
  id: string;
  token: string;
};

export async function getAuthorizedJobRouteParams(
  request: NextRequest,
  context: JobRouteContext,
): Promise<AuthorizedJobRouteParams | null> {
  const { id } = await context.params;
  const token = getRequestToken(request);

  if (!isValidUuid(id) || !token) {
    return null;
  }

  return { id, token };
}

export function getRequestToken(request: NextRequest): string {
  const parts = (request.headers.get("authorization") ?? "").trim().split(/\s+/);
  const [scheme, token] = parts;
  const hasBearerScheme = scheme?.toLowerCase() === "bearer";
  const hasExactBearerShape = parts.length === 2;

  if (hasExactBearerShape && hasBearerScheme && token && isValidUuid(token)) {
    return token;
  }

  return "";
}

export function isValidUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}

export function jobNotFound(message = "Conversion job was not found or has expired."): Response {
  return jsonApiError(404, "not_found", message);
}
