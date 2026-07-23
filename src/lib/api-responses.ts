import { NO_STORE_HEADERS } from "@/lib/http-headers";

type JsonApiResponseOptions = {
  status?: number;
  headers?: HeadersInit;
};

export function jsonApiResponse(
  body: unknown,
  options: JsonApiResponseOptions = {},
) {
  return Response.json(body, {
    status: options.status,
    headers: {
      ...NO_STORE_HEADERS,
      ...options.headers,
    },
  });
}

export function jsonApiOk(body: Record<string, unknown>, headers?: HeadersInit) {
  return jsonApiResponse(
    {
      ok: true,
      ...body,
    },
    { headers },
  );
}

export function jsonApiError(
  status: number,
  code: string,
  message: string,
  headers?: HeadersInit,
) {
  return jsonApiResponse(
    {
      ok: false,
      error: {
        code,
        message,
      },
    },
    { status, headers },
  );
}
