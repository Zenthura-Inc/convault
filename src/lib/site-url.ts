const DEFAULT_SITE_URL = "https://convault.app";

export function getSiteUrl() {
  const configuredUrl = process.env.SITE_URL?.trim();

  if (!configuredUrl) {
    return DEFAULT_SITE_URL;
  }

  try {
    const parsedUrl = new URL(configuredUrl);

    const isLocalhost =
      parsedUrl.hostname === "localhost" ||
      parsedUrl.hostname === "127.0.0.1" ||
      parsedUrl.hostname === "::1" ||
      parsedUrl.hostname === "[::1]";

    if (parsedUrl.username || parsedUrl.password) {
      return DEFAULT_SITE_URL;
    }

    if (parsedUrl.pathname !== "/" || parsedUrl.search || parsedUrl.hash) {
      return DEFAULT_SITE_URL;
    }

    if (parsedUrl.protocol !== "https:" && !(parsedUrl.protocol === "http:" && isLocalhost)) {
      return DEFAULT_SITE_URL;
    }

    return parsedUrl.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}
