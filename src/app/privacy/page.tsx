export default function PrivacyPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy & File Security
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
          We built Convault to be simple, fast, and privacy-first.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <h2 className="text-base font-semibold">Temporary files</h2>
          <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            Uploaded and converted files are intended to be stored temporarily.
            We automatically delete files after a short period to reduce privacy
            risk.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <h2 className="text-base font-semibold">Secure access</h2>
          <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            Downloads will use time-limited links. In future phases, logged-in
            users can view their conversion history.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <h2 className="text-base font-semibold">Data minimization</h2>
          <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            We aim to store only what’s necessary to provide the service (file
            metadata, conversion status, and temporary storage paths).
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <h2 className="text-base font-semibold">No payments yet</h2>
          <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            Premium features are planned but not implemented. Today, the core
            converter is free.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-6 text-sm leading-7 text-zinc-700 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200">
        <p>
          If you have any questions about privacy, please check back later for
          updates as we expand documentation alongside new features.
        </p>
      </section>
    </div>
  );
}
