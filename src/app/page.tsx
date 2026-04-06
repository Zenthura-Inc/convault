import { ConverterCard } from "@/components/converter-card";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-b from-indigo-50 via-white to-white px-6 py-12 shadow-sm sm:px-10 sm:py-16 dark:border-white/10 dark:from-indigo-950/40 dark:via-black dark:to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.20),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center rounded-full border border-indigo-200/70 bg-white px-4 py-1 text-xs font-semibold text-indigo-700 shadow-sm dark:border-indigo-400/20 dark:bg-zinc-950 dark:text-indigo-200">
            Trusted flow • Upload → Convert → Download
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
            Convert Files
            <span className="block text-indigo-600 dark:text-indigo-400">
              Instantly & Securely
            </span>
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
            Transform files in seconds. No software to install, no registration
            required for basic conversions. Files are intended to be deleted
            automatically after a short time.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.98] sm:w-auto"
            >
              Start Converting Now
            </button>
            <a
              href="/privacy"
              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm transition active:scale-[0.98] sm:w-auto dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100"
            >
              Privacy & Security
            </a>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-zinc-600 sm:grid-cols-3 dark:text-zinc-300">
            <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5">
              No registration required
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5">
              Files auto-delete
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5">
              Multiple formats
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Upload & Convert
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Drag and drop your files or click to browse. We&apos;ll handle the rest.
          </p>
        </div>

        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900/30">
            <ConverterCard />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Supported Formats
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Convert between common formats with professional-grade quality.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-950">
            <p className="text-sm font-semibold">Documents</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
                PDF
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
                DOCX
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
                TXT
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-950">
            <p className="text-sm font-semibold">Images</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
                JPG
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
                PNG
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
                WEBP
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
                GIF
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-950">
            <p className="text-sm font-semibold">Videos</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
                MP4
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
                MOV
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
                AVI
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-950">
            <p className="text-sm font-semibold">Audio</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
                MP3
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
                WAV
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Why Choose Convault?
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Professional file conversion with security-focused defaults.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-zinc-950">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-200">
              ⚡
            </div>
            <h3 className="mt-4 text-sm font-semibold">Lightning Fast</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Convert files quickly with a streamlined conversion pipeline.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-zinc-950">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-200">
              🛡️
            </div>
            <h3 className="mt-4 text-sm font-semibold">Secure & Private</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Files are intended to be temporary and deleted automatically.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-zinc-950">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-200">
              ⏱️
            </div>
            <h3 className="mt-4 text-sm font-semibold">Simple Workflow</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Upload → Select format → Convert → Download.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Loved by Professionals
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            A simple converter people can rely on for daily work.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
            <p className="text-sm text-zinc-700 dark:text-zinc-200">
              “Fast, reliable, and secure. Exactly what I need for client work.”
            </p>
            <p className="mt-4 text-sm font-semibold">Michael Rodriguez</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Freelance Designer
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
            <p className="text-sm text-zinc-700 dark:text-zinc-200">
              “Clean interface and quick results. Perfect for quick format
              changes.”
            </p>
            <p className="mt-4 text-sm font-semibold">Emily Watson</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Content Creator
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
            <p className="text-sm text-zinc-700 dark:text-zinc-200">
              “The workflow is simple. Upload, convert, download — done.”
            </p>
            <p className="mt-4 text-sm font-semibold">Sarah Chen</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Marketing Manager
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-gradient-to-b from-indigo-50 to-white p-10 text-center shadow-sm dark:border-white/10 dark:from-indigo-950/40 dark:to-black">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to Convert?
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Start converting files instantly. No account required for basic
          conversions.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.98] sm:w-auto"
          >
            Get Started Free
          </button>
          <a
            href="/privacy"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm transition active:scale-[0.98] sm:w-auto dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100"
          >
            Privacy & Security
          </a>
        </div>
      </section>
    </div>
  );
}
