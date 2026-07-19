import type { NextRequest } from "next/server";

export const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

export function getRequestToken(request: NextRequest) {
  const authorization = request.headers.get("authorization") ?? "";
  const [scheme, token] = authorization.split(/\s+/, 2);

  if (scheme?.toLowerCase() === "bearer" && token) {
    return token;
  }

  return request.nextUrl.searchParams.get("token") ?? "";
}

export function isValidJobIdentifier(value: string) {
  return /^[0-9a-f-]{36}$/i.test(value);
}

export function jobNotFound(message = "Conversion job was not found or has expired.") {
  return Response.json(
    {
      ok: false,
      error: {
        code: "not_found",
        message,
      },
    },
    {
      status: 404,
      headers: NO_STORE_HEADERS,
    },
  );
}
