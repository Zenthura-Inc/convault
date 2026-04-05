import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold tracking-tight text-zinc-900 transition hover:bg-black/5 dark:text-zinc-100 dark:hover:bg-white/10"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-600 text-xs font-bold text-white shadow-sm">
                C
              </span>
              <span className="hidden sm:block text-base">Convault</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="hidden h-11 items-center justify-center rounded-full bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.98] sm:inline-flex"
            >
              Sign In
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <nav className="mt-3 flex items-center gap-2 sm:hidden">
          <Link
            href="/dashboard"
            className="inline-flex h-10 w-full flex-1 items-center justify-center rounded-full bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98]"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
