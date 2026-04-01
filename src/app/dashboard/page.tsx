import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Dashboard
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
          Sign in to view your conversion history and access your recently
          converted files.
        </p>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
        <h2 className="text-base font-semibold">Your conversions</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          This will show your conversion history once authentication is added.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] dark:bg-white dark:text-black"
          >
            Convert a file
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-zinc-900 shadow-sm transition active:scale-[0.98] dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100"
          >
            See plans
          </Link>
        </div>
      </section>
    </div>
  );
}
