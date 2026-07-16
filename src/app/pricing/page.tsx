export default function PricingPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Pricing
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
          Convault is currently free for everyone. Premium is planned for the
          future, but it is not available yet.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Free</h2>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                All core conversion tools, no account required.
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-purple-700 dark:text-purple-300">
                $0
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">forever</p>
            </div>
          </div>
          <div className="mt-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
            <p>Upload - Convert - Download</p>
            <p>Anonymous usage supported</p>
            <p>Privacy-first temporary files</p>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-purple-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-600 active:scale-[0.98]"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-800 dark:border-purple-500/30 dark:bg-purple-950/40 dark:text-purple-100">
                Coming Soon
              </div>
              <h2 className="mt-3 text-lg font-semibold">Premium</h2>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                More power, speed, and flexibility for advanced workflows.
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-zinc-500">-</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                not available
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
            <p>Larger file upload limits</p>
            <p>Priority processing</p>
            <p>Batch conversions</p>
            <p>Ad-free experience</p>
            <p>Extended file availability and history</p>
          </div>

          <div className="mt-6">
            <button
              type="button"
              disabled
              className="inline-flex h-11 w-full cursor-not-allowed items-center justify-center rounded-full border border-black/10 bg-zinc-50 px-5 text-sm font-semibold text-zinc-400 shadow-sm dark:border-white/10 dark:bg-zinc-900"
            >
              Premium (Coming Soon)
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-6 text-sm leading-7 text-zinc-700 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200">
        <p>
          We&apos;re currently focused on delivering a fast, simple, and reliable
          file conversion experience for everyone - completely free.
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
