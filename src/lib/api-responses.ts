import { NO_STORE_HEADERS } from "@/lib/http-headers";

type JsonApiResponseOptions = {
  status?: number;
  headers?: HeadersInit;
};

type JsonObject = Record<string, unknown>;

export type JsonApiResponseBody = JsonObject & {
  ok: boolean;
};

type JsonApiErrorBody<TCode extends string = string> = {
  ok: false;
  error: {
    code: TCode;
    message: string;
  };
};

export function jsonApiResponse(
  body: JsonApiResponseBody,
  options: JsonApiResponseOptions = {},
): Response {
  return Response.json(body, {
    status: options.status,
    headers: {
      ...NO_STORE_HEADERS,
      ...options.headers,
    },
  });
}

export function jsonApiOk(body: JsonObject, headers?: HeadersInit): Response {
  return jsonApiResponse(
    {
      ok: true,
      ...body,
    },
    { headers },
  );
}

export function jsonApiError<TCode extends string = string>(
  status: number,
  code: TCode,
  message: string,
  headers?: HeadersInit,
): Response {
  const body: JsonApiErrorBody<TCode> = {
    ok: false,
    error: {
      code,
      message,
    },
  };

  return jsonApiResponse(
    body,
    { status, headers },
  );
}
