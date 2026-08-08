const DEFAULT_SITE_URL = "https://convault.app";

export function getSiteUrl() {
  const configuredUrl = process.env.SITE_URL?.trim();

  if (!configuredUrl) {
    return DEFAULT_SITE_URL;
  }

  try {
    const parsedUrl = new URL(configuredUrl);

    if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
      return DEFAULT_SITE_URL;
    }

    return parsedUrl.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}
