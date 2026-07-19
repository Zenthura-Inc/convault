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
export const ACCEPTED_FILE_TYPES = ".jpg,.jpeg,.png,.webp,.gif,.pdf,.txt,.mp3,.wav";

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
  if (["jpg", "png", "webp", "gif"].includes(format)) return "image";
  if (["pdf", "txt"].includes(format)) return "document";
  if (["mp3", "wav"].includes(format)) return "audio";
  return "unknown";
}
