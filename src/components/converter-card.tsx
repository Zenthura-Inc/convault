"use client";

import * as React from "react";

type FileCategory = "image" | "document" | "audio" | "video" | "unknown";
type Step = "idle" | "selected" | "converting" | "ready";

type FormatOption = {
  label: string;
  value: string;
};

const MAX_BYTES = 25 * 1024 * 1024;

function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function getFileCategory(file: File): FileCategory {
  const mime = file.type.toLowerCase();
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("audio/")) return "audio";
  if (mime.startsWith("video/")) return "video";

  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf") || name.endsWith(".docx") || name.endsWith(".txt")) {
    return "document";
  }

  return "unknown";
}

function getAllowedFormats(category: FileCategory): FormatOption[] {
  switch (category) {
    case "image":
      return [
        { label: "JPG", value: "jpg" },
        { label: "PNG", value: "png" },
        { label: "WEBP", value: "webp" },
        { label: "GIF", value: "gif" },
      ];
    case "document":
      return [
        { label: "PDF", value: "pdf" },
        { label: "DOCX", value: "docx" },
        { label: "TXT", value: "txt" },
      ];
    case "audio":
      return [
        { label: "MP3", value: "mp3" },
        { label: "WAV", value: "wav" },
      ];
    case "video":
      return [
        { label: "MP4", value: "mp4" },
        { label: "MOV", value: "mov" },
        { label: "AVI", value: "avi" },
      ];
    default:
      return [];
  }
}

function isAllowedFile(file: File) {
  const category = getFileCategory(file);
  if (category === "unknown") return false;
  if (file.size > MAX_BYTES) return false;
  return true;
}

function sanitizeDownloadBaseName(name: string) {
  return (
    name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^\w.-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "converted-file"
  );
}

export function ConverterCard() {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [step, setStep] = React.useState<Step>("idle");
  const [file, setFile] = React.useState<File | null>(null);
  const [category, setCategory] = React.useState<FileCategory>("unknown");
  const [outputFormat, setOutputFormat] = React.useState("");
  const [error, setError] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [downloadUrl, setDownloadUrl] = React.useState("");
  const [downloadName, setDownloadName] = React.useState("");

  React.useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const formats = React.useMemo(() => getAllowedFormats(category), [category]);

  function resetAll(options: { preserveError?: boolean } = {}) {
    setStep("idle");
    setFile(null);
    setCategory("unknown");
    setOutputFormat("");
    if (!options.preserveError) setError("");
    setProgress(0);

    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl("");
    setDownloadName("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function applyFile(next: File) {
    setError("");

    if (!isAllowedFile(next)) {
      const tooBig = next.size > MAX_BYTES;
      setError(
        tooBig
          ? `File is too large. Max size is ${formatBytes(MAX_BYTES)}.`
          : "Unsupported file type. Please upload an image, document, audio, or video file.",
      );
      resetAll({ preserveError: true });
      return;
    }

    const nextCategory = getFileCategory(next);
    const nextFormats = getAllowedFormats(nextCategory);

    setFile(next);
    setCategory(nextCategory);
    setStep("selected");
    setOutputFormat(nextFormats[0]?.value ?? "");

    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl("");
    setDownloadName("");
    setProgress(0);
  }

  function onPickFile(event: React.ChangeEvent<HTMLInputElement>) {
    const picked = event.target.files?.[0];
    if (picked) applyFile(picked);
  }

  async function startConvert() {
    if (!file) {
      setError("Please upload a file first.");
      return;
    }

    if (!outputFormat) {
      setError("Please select an output format.");
      return;
    }

    setError("");
    setStep("converting");
    setProgress(8);

    const form = new FormData();
    form.append("file", file);
    form.append("outputFormat", outputFormat);

    let validationPayload: {
      ok?: boolean;
      error?: { message?: string };
    } | null = null;

    try {
      const validationResponse = await fetch("/api/uploads/validate", {
        method: "POST",
        body: form,
      });

      validationPayload = await validationResponse.json().catch(() => null);

      if (!validationResponse.ok || validationPayload?.ok !== true) {
        setStep("selected");
        setProgress(35);
        setError(
          validationPayload?.error?.message ??
            "File could not be validated. Please try another file.",
        );
        return;
      }
    } catch {
      setStep("selected");
      setProgress(35);
      setError("File could not be validated. Please check your connection and try again.");
      return;
    }

    let nextProgress = 20;
    const interval = window.setInterval(() => {
      nextProgress += Math.max(3, Math.round(Math.random() * 10));

      if (nextProgress >= 100) {
        window.clearInterval(interval);
        setProgress(100);

        const baseName = sanitizeDownloadBaseName(file.name);
        const name = `${baseName}.${outputFormat}`;
        const content = `Convault mock conversion\n\nInput: ${file.name}\nOutput: ${name}\n\nThis is a placeholder file for Phase 1 UI.`;
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        setDownloadUrl(url);
        setDownloadName(name);
        setStep("ready");
        return;
      }

      setProgress(nextProgress);
    }, 250);
  }

  const isConverting = step === "converting";
  const canConvert = Boolean(file && outputFormat);
  const progressValue =
    step === "ready" ? 100 : step === "converting" ? progress : file ? 35 : 10;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between gap-4 text-xs text-zinc-600 dark:text-zinc-300">
          <span>Single file - Max {formatBytes(MAX_BYTES)} (Phase 1)</span>
          <span className="font-semibold text-[var(--brand)]">
            Free
          </span>
        </div>
        <div
          className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressValue}
          aria-label="Conversion progress"
        >
          <div
            className="h-full rounded-full bg-[var(--brand)] transition-[width]"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>

      <div
        className={`rounded-3xl border border-dashed p-6 text-center transition sm:p-7 ${
          dragActive
            ? "border-[var(--brand)] bg-[var(--brand-soft)]"
            : "border-[var(--border-strong)] bg-[var(--surface)] hover:border-[var(--brand)]/60"
        }`}
        onDragEnter={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setDragActive(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setDragActive(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setDragActive(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setDragActive(false);
          const dropped = event.dataTransfer.files?.[0];
          if (dropped) applyFile(dropped);
        }}
      >
        <div className="mx-auto flex max-w-md flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-lg font-semibold text-[var(--brand)]">
            +
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold">Upload your file</p>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Drag & drop on desktop, or use file picker on mobile.
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={onPickFile}
            aria-describedby="supported-file-types"
          />

          <button
            type="button"
            className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-hover)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => inputRef.current?.click()}
            disabled={isConverting}
          >
            Choose a file
          </button>

          <p id="supported-file-types" className="text-xs text-zinc-500 dark:text-zinc-400">
            Supported: images, documents, audio, video
          </p>
        </div>
      </div>

      <div aria-live="polite">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-200">
            {error}
          </div>
        ) : null}
      </div>

      {file ? (
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {file.name}
              </p>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                {formatBytes(file.size)} - {category}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--surface-muted)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => resetAll()}
              disabled={isConverting}
            >
              Remove
            </button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-left">
              <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Output format
              </span>
              <select
                className="mt-2 h-11 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 text-sm font-semibold text-zinc-900 outline-none transition hover:border-[var(--border-strong)] focus:border-[var(--brand)] focus:ring-2 focus:ring-purple-500/20 dark:text-zinc-100"
                value={outputFormat}
                onChange={(event) => setOutputFormat(event.target.value)}
                disabled={isConverting || formats.length === 0}
              >
                {formats.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-end">
              {step === "ready" && downloadUrl ? (
                <a
                  href={downloadUrl}
                  download={downloadName}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-hover)] active:scale-[0.98]"
                >
                  Download
                </a>
              ) : (
                <button
                  type="button"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-hover)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={startConvert}
                  disabled={!canConvert || step !== "selected" || isConverting}
                >
                  {isConverting ? `Converting... ${progress}%` : "Convert"}
                </button>
              )}
            </div>
          </div>

          {isConverting ? (
            <div className="mt-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-[var(--brand)] transition-[width]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300">
                Uploading - Converting - Preparing download
              </p>
            </div>
          ) : null}

          {step === "ready" ? (
            <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-900 dark:border-green-500/30 dark:bg-green-950/30 dark:text-green-100">
              Conversion complete. Your download is ready.
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-4 text-sm text-zinc-700 dark:text-zinc-200">
        Premium features are not yet implemented. For now, all core tools remain
        free while we continue improving the platform.
      </div>
    </div>
  );
}
