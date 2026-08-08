export const FALLBACK_UPLOAD_FILENAME = "upload";
const MAX_RAW_FILENAME_LENGTH = 512;
const MAX_SANITIZED_FILENAME_LENGTH = 120;

const RESERVED_FILENAMES = new Set([
  "con",
  "prn",
  "aux",
  "nul",
  "com1",
  "com2",
  "com3",
  "com4",
  "com5",
  "com6",
  "com7",
  "com8",
  "com9",
  "lpt1",
  "lpt2",
  "lpt3",
  "lpt4",
  "lpt5",
  "lpt6",
  "lpt7",
  "lpt8",
  "lpt9",
]);

export function sanitizeUploadFilename(name: string) {
  const sanitized = name
    .slice(0, MAX_RAW_FILENAME_LENGTH)
    .normalize("NFKC")
    .replace(/[\\/:*?"<>|\u0000-\u001f\u007f]+/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[.\s]+|[.\s]+$/g, "")
    .slice(0, MAX_SANITIZED_FILENAME_LENGTH);

  if (!sanitized || isReservedFilename(sanitized)) {
    return FALLBACK_UPLOAD_FILENAME;
  }

  return sanitized;
}

function isReservedFilename(name: string) {
  const stem = name.split(".", 1)[0]?.toLowerCase();
  return stem ? RESERVED_FILENAMES.has(stem) : false;
}
