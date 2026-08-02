import { API_SECURITY_HEADERS } from "@/lib/http-headers";

type JsonApiResponseOptions = {
  status?: number;
  headers?: HeadersInit;
};

type JsonObject = Record<string, unknown>;

type JsonApiOkPayload = JsonObject & {
  ok?: never;
};

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
      ...API_SECURITY_HEADERS,
      ...options.headers,
    },
  });
}

export function jsonApiOk(body: JsonApiOkPayload, headers?: HeadersInit): Response {
  return jsonApiResponse(
    {
      ...body,
      ok: true,
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
