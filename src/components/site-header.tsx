import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-black/5 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold tracking-tight text-zinc-900 transition hover:bg-black/5 dark:text-zinc-100 dark:hover:bg-white/10"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-xs font-bold text-white shadow-sm dark:bg-white dark:text-black">
                CV
              </span>
              <span className="hidden sm:block">Convault</span>
            </Link>
            <nav className="hidden items-center gap-1 sm:flex">
              <Link
                href="/pricing"
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"
              >
                Pricing
              </Link>
              <Link
                href="/privacy"
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"
              >
                Privacy
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

        <nav className="mt-3 flex items-center gap-2 sm:hidden">
          <Link
            href="/pricing"
            className="inline-flex h-10 flex-1 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-semibold text-zinc-900 shadow-sm transition active:scale-[0.98] dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100"
          >
            Pricing
          </Link>
          <Link
            href="/privacy"
            className="inline-flex h-10 flex-1 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-semibold text-zinc-900 shadow-sm transition active:scale-[0.98] dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100"
          >
            Privacy
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-10 flex-1 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-semibold text-zinc-900 shadow-sm transition active:scale-[0.98] dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
