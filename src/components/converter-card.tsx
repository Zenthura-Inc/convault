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

export function ConverterCard() {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = React.useState(false);

  const [step, setStep] = React.useState<Step>("idle");
  const [file, setFile] = React.useState<File | null>(null);
  const [category, setCategory] = React.useState<FileCategory>("unknown");
  const [outputFormat, setOutputFormat] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [progress, setProgress] = React.useState<number>(0);
  const [downloadUrl, setDownloadUrl] = React.useState<string>("");
  const [downloadName, setDownloadName] = React.useState<string>("");

  React.useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const formats = React.useMemo(() => getAllowedFormats(category), [category]);

  function resetAll() {
    setStep("idle");
    setFile(null);
    setCategory("unknown");
    setOutputFormat("");
    setError("");
    setProgress(0);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl("");
    setDownloadName("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function applyFile(next: File) {
    setError("");

    if (!isAllowedFile(next)) {
      const tooBig = next.size > MAX_BYTES;
      if (tooBig) {
        setError(`File is too large. Max size is ${formatBytes(MAX_BYTES)}.`);
      } else {
        setError("Unsupported file type. Please upload an image, document, audio, or video file.");
      }
      resetAll();
      return;
    }

    const nextCategory = getFileCategory(next);
    setFile(next);
    setCategory(nextCategory);
    setStep("selected");
    const nextFormats = getAllowedFormats(nextCategory);
    setOutputFormat(nextFormats[0]?.value ?? "");

    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl("");
    setDownloadName("");
    setProgress(0);
  }

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (!picked) return;
    applyFile(picked);
  }

  function startConvert() {
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
    setProgress(0);

    let p = 0;
    const interval = window.setInterval(() => {
      p += Math.max(3, Math.round(Math.random() * 10));
      if (p >= 100) {
        window.clearInterval(interval);
        setProgress(100);

        const baseName = file.name.replace(/\.[^/.]+$/, "");
        const name = `${baseName}.${outputFormat}`;
        const content = `Convault mock conversion\n\nInput: ${file.name}\nOutput: ${name}\n\nThis is a placeholder file for Phase 1 UI.`;
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        setDownloadUrl(url);
        setDownloadName(name);
        setStep("ready");
        return;
      }
      setProgress(p);
    }, 250);
  }

  const isConverting = step === "converting";
  const canConvert = !!file && !!outputFormat;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950">
        <div className="flex items-center justify-between gap-4 text-xs text-zinc-600 dark:text-zinc-300">
          <span>Single file • Max {formatBytes(MAX_BYTES)} (Phase 1)</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            Free
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-indigo-600 transition-[width]"
            style={{ width: `${step === "ready" ? 100 : step === "converting" ? progress : file ? 35 : 10}%` }}
          />
        </div>
      </div>

      <div
        className={`rounded-2xl border border-dashed p-6 text-center transition ${
          dragActive
            ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-950/20"
            : "border-black/15 bg-white dark:border-white/15 dark:bg-zinc-950"
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
          const dropped = e.dataTransfer.files?.[0];
          if (!dropped) return;
          applyFile(dropped);
        }}
      >
        <div className="mx-auto flex max-w-md flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-950/40 dark:text-indigo-200">
            ↑
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold">Upload your file</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Drag & drop on desktop, or use file picker on mobile.
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={onPickFile}
          />

          <button
            type="button"
            className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.98]"
            onClick={() => inputRef.current?.click()}
            disabled={step === "converting"}
          >
            Choose a file
          </button>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Supported: images, documents, audio, video
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </div>
      ) : null}

      {file ? (
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {file.name}
              </p>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                {formatBytes(file.size)} • {category}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-semibold text-zinc-900 shadow-sm transition active:scale-[0.98] dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100"
              onClick={resetAll}
              disabled={step === "converting"}
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
                className="mt-2 h-11 w-full rounded-2xl border border-black/10 bg-white px-3 text-sm font-semibold text-zinc-900 shadow-sm outline-none transition focus:border-indigo-400 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                disabled={isConverting || formats.length === 0}
              >
                {formats.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-end">
              {step === "ready" && downloadUrl ? (
                <a
                  href={downloadUrl}
                  download={downloadName}
                  className="inline-flex h-11 w-full items-center justify-center rounded-full bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.98]"
                >
                  Download
                </a>
              ) : (
                <button
                  type="button"
                  className="inline-flex h-11 w-full items-center justify-center rounded-full bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={startConvert}
                  disabled={!canConvert || step !== "selected" || isConverting}
                >
                  {step === "converting" ? `Converting… ${progress}%` : "Convert"}
                </button>
              )}
            </div>
          </div>

          {step === "converting" ? (
            <div className="mt-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-[width]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300">
                Uploading → Converting → Preparing download
              </p>
            </div>
          ) : null}

          {step === "ready" ? (
            <div className="mt-4 rounded-2xl border border-indigo-200/70 bg-indigo-50 p-4 text-sm text-indigo-900 dark:border-indigo-400/20 dark:bg-indigo-950/30 dark:text-indigo-100">
              Conversion complete. Your download is ready.
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="rounded-2xl border border-indigo-200/70 bg-indigo-50 p-4 text-sm text-indigo-900 dark:border-indigo-400/20 dark:bg-indigo-950/30 dark:text-indigo-100">
        Premium features are not yet implemented. For now, all core tools remain
        free while we continue improving the platform.
      </div>
    </div>
  );
}
