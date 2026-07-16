import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-purple-400/20 bg-purple-700 text-white shadow-sm">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl px-2 py-2 text-sm font-semibold tracking-tight transition hover:bg-white/10"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-xs font-bold text-purple-700 shadow-sm">
                C
              </span>
              <span className="hidden sm:block text-base">Convault</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="hidden h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50 active:scale-[0.98] sm:inline-flex"
            >
              Sign In
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <nav className="mt-3 flex items-center gap-2 sm:hidden">
          <Link
            href="/dashboard"
            className="inline-flex h-10 w-full flex-1 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-purple-700 shadow-sm transition active:scale-[0.98]"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
