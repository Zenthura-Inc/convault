export const SUPPORTED_UPLOAD_FORMATS = [
  "jpg",
  "png",
  "webp",
  "gif",
  "pdf",
  "txt",
  "mp3",
  "wav",
] as const;

export type SupportedUploadFormat = (typeof SUPPORTED_UPLOAD_FORMATS)[number];
export type FileCategory = "image" | "document" | "audio" | "unknown";

export type FormatOption = {
  label: string;
  value: SupportedUploadFormat;
};

export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

export const OUTPUTS_BY_FORMAT: Record<SupportedUploadFormat, readonly SupportedUploadFormat[]> = {
  jpg: ["jpg"],
  png: ["png"],
  webp: ["webp"],
  gif: ["gif"],
  pdf: ["pdf"],
  txt: ["txt", "pdf"],
  mp3: ["mp3"],
  wav: ["wav"],
};

export const MIME_BY_FORMAT: Record<SupportedUploadFormat, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  pdf: "application/pdf",
  txt: "text/plain",
  mp3: "audio/mpeg",
  wav: "audio/wav",
};

const FORMAT_ALIASES = {
  jpg: {
    mimeTypes: ["image/jpeg"],
    extensions: [".jpg", ".jpeg"],
  },
  png: {
    mimeTypes: ["image/png"],
    extensions: [".png"],
  },
  webp: {
    mimeTypes: ["image/webp"],
    extensions: [".webp"],
  },
  gif: {
    mimeTypes: ["image/gif"],
    extensions: [".gif"],
  },
  pdf: {
    mimeTypes: ["application/pdf"],
    extensions: [".pdf"],
  },
  txt: {
    mimeTypes: ["text/plain"],
    extensions: [".txt"],
  },
  mp3: {
    mimeTypes: ["audio/mpeg", "audio/mp3"],
    extensions: [".mp3"],
  },
  wav: {
    mimeTypes: ["audio/wav", "audio/x-wav"],
    extensions: [".wav"],
  },
} satisfies Record<
  SupportedUploadFormat,
  {
    mimeTypes: readonly string[];
    extensions: readonly string[];
  }
>;

const CATEGORY_BY_FORMAT: Record<SupportedUploadFormat, Exclude<FileCategory, "unknown">> = {
  jpg: "image",
  png: "image",
  webp: "image",
  gif: "image",
  pdf: "document",
  txt: "document",
  mp3: "audio",
  wav: "audio",
};

const FORMAT_LABELS: Record<SupportedUploadFormat, string> = {
  jpg: "JPG",
  png: "PNG",
  webp: "WEBP",
  gif: "GIF",
  pdf: "PDF",
  txt: "TXT",
  mp3: "MP3",
  wav: "WAV",
};

export const ACCEPTED_FILE_TYPES = SUPPORTED_UPLOAD_FORMATS
  .flatMap((format) => FORMAT_ALIASES[format].extensions)
  .join(",");

export function getClientUploadFormat({
  mimeType,
  filename,
}: {
  mimeType: string;
  filename: string;
}): SupportedUploadFormat | null {
  const normalizedMimeType = mimeType.trim().toLowerCase();
  const normalizedFilename = filename.trim().toLowerCase();

  for (const format of SUPPORTED_UPLOAD_FORMATS) {
    const aliases = FORMAT_ALIASES[format];
    if (aliases.mimeTypes.includes(normalizedMimeType)) return format;
    if (aliases.extensions.some((extension) => normalizedFilename.endsWith(extension))) return format;
  }

  return null;
}

export function getAllowedOutputFormats(format: SupportedUploadFormat | null) {
  return format ? OUTPUTS_BY_FORMAT[format] : [];
}

export function getAllowedFormatOptions(format: SupportedUploadFormat | null): FormatOption[] {
  return getAllowedOutputFormats(format).map((value) => ({
    label: FORMAT_LABELS[value],
    value,
  }));
}

export function getFormatCategory(format: SupportedUploadFormat | null): FileCategory {
  if (!format) return "unknown";
  return CATEGORY_BY_FORMAT[format];
}
