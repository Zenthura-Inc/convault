export type SupportedUploadFormat =
  | "jpg"
  | "png"
  | "webp"
  | "gif"
  | "pdf"
  | "txt"
  | "mp3"
  | "wav";

export type UploadValidationResult = {
  detectedFormat: SupportedUploadFormat;
  mimeType: string;
  allowedOutputs: string[];
};

export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

const OUTPUTS_BY_FORMAT: Record<SupportedUploadFormat, string[]> = {
  jpg: ["jpg", "png", "webp"],
  png: ["jpg", "png", "webp"],
  webp: ["jpg", "png", "webp"],
  gif: ["gif", "jpg", "png", "webp"],
  pdf: ["pdf", "txt"],
  txt: ["txt", "pdf"],
  mp3: ["mp3", "wav"],
  wav: ["mp3", "wav"],
};

const MIME_BY_FORMAT: Record<SupportedUploadFormat, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  pdf: "application/pdf",
  txt: "text/plain",
  mp3: "audio/mpeg",
  wav: "audio/wav",
};

export function sanitizeDisplayFilename(name: string) {
  return (
    name
      .normalize("NFKC")
      .replace(/[\\/:*?"<>|\u0000-\u001f\u007f]+/g, "-")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120) || "upload"
  );
}

export function validateUploadBytes(bytes: Uint8Array): UploadValidationResult | null {
  const detectedFormat = detectFormat(bytes);
  if (!detectedFormat) return null;

  return {
    detectedFormat,
    mimeType: MIME_BY_FORMAT[detectedFormat],
    allowedOutputs: OUTPUTS_BY_FORMAT[detectedFormat],
  };
}

function detectFormat(bytes: Uint8Array): SupportedUploadFormat | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpg";
  }

  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "png";
  }

  if (
    bytes.length >= 12 &&
    ascii(bytes, 0, 4) === "RIFF" &&
    ascii(bytes, 8, 12) === "WEBP"
  ) {
    return "webp";
  }

  if (
    bytes.length >= 6 &&
    (ascii(bytes, 0, 6) === "GIF87a" || ascii(bytes, 0, 6) === "GIF89a")
  ) {
    return "gif";
  }

  if (bytes.length >= 5 && ascii(bytes, 0, 5) === "%PDF-") {
    return "pdf";
  }

  if (
    bytes.length >= 12 &&
    ascii(bytes, 0, 4) === "RIFF" &&
    ascii(bytes, 8, 12) === "WAVE"
  ) {
    return "wav";
  }

  if (
    bytes.length >= 3 &&
    ascii(bytes, 0, 3) === "ID3"
  ) {
    return "mp3";
  }

  if (
    bytes.length >= 2 &&
    bytes[0] === 0xff &&
    (bytes[1] & 0xe0) === 0xe0
  ) {
    return "mp3";
  }

  if (looksLikeUtf8Text(bytes)) {
    return "txt";
  }

  return null;
}

function ascii(bytes: Uint8Array, start: number, end: number) {
  return String.fromCharCode(...bytes.slice(start, end));
}

function looksLikeUtf8Text(bytes: Uint8Array) {
  if (bytes.length === 0 || bytes.length > 1024 * 1024) return false;

  let controlCount = 0;
  for (const byte of bytes.slice(0, Math.min(bytes.length, 4096))) {
    if (byte === 0) return false;
    if (byte < 0x09 || (byte > 0x0d && byte < 0x20)) controlCount += 1;
  }

  if (controlCount > 0) return false;

  try {
    new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return true;
  } catch {
    return false;
  }
}
