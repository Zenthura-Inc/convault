export default function Home() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-5">
          <div className="inline-flex w-fit items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
            Free for now • Premium coming soon
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Convert files fast.
            <span className="block text-zinc-500 dark:text-zinc-400">
              Simple, privacy-first, and mobile-friendly.
            </span>
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            Upload a file, pick an output format, convert, and download.
            Anonymous usage is supported — no login required.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] dark:bg-white dark:text-black"
            >
              Start converting
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-zinc-900 shadow-sm transition active:scale-[0.98] dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100"
            >
              View supported formats
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="rounded-2xl border border-dashed border-black/15 bg-zinc-50 p-6 text-center dark:border-white/15 dark:bg-zinc-900/30">
            <div className="mx-auto flex max-w-md flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-zinc-950">
                <span className="text-sm font-semibold">Up</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">Upload your file</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Drag & drop on desktop, or use file picker on mobile.
                </p>
              </div>
              <button
                type="button"
                className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] dark:bg-white dark:text-black"
              >
                Choose a file
              </button>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Max size and conversion availability will be enforced in later
                phases.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Supported types</h2>
        <div className="flex flex-wrap gap-2">
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
          <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
            PDF
          </span>
          <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
            DOCX
          </span>
          <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
            TXT
          </span>
          <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
            MP3
          </span>
          <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
            WAV
          </span>
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
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 text-sm leading-7 text-zinc-700 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200">
        <p>
          We’re currently focused on delivering a fast, simple, and reliable file
          conversion experience for everyone — completely free.
        </p>
        <p className="mt-3">
          In the future, we plan to introduce a Premium subscription designed
          for users who need more power, speed, and flexibility.
        </p>
        <p className="mt-3 font-medium">
          Premium features are not yet implemented. For now, all core tools
          remain free while we continue improving the platform.
        </p>
      </section>
    </div>
  );
}
