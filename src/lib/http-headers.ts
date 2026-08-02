export const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
} as const;

export const API_SECURITY_HEADERS = {
  ...NO_STORE_HEADERS,
  "X-Content-Type-Options": "nosniff",
} as const;
