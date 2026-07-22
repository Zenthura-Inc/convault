import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Converters", href: "/#converter" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/privacy" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[var(--border-subtle)] bg-white/95 backdrop-blur dark:bg-zinc-950/95">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-4 px-6 sm:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-xl py-2 text-lg font-bold tracking-tight text-[var(--brand)]"
          aria-label="Convault home"
        >
          <span className="relative flex h-10 w-8 items-end justify-center rounded-md bg-[var(--brand)] pb-1 text-[0.55rem] font-black leading-none text-white shadow-sm">
            CV
            <span className="absolute right-0 top-0 h-0 w-0 border-l-[10px] border-t-[10px] border-l-purple-200 border-t-white dark:border-l-purple-300 dark:border-t-zinc-950" />
          </span>
          <span>Convault</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 lg:flex dark:text-zinc-200">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative py-6 transition hover:text-[var(--brand)] first:text-[var(--brand)] first:after:absolute first:after:inset-x-0 first:after:-bottom-px first:after:h-0.5 first:after:rounded-full first:after:bg-[var(--brand)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/#converter"
            className="hidden h-11 items-center justify-center rounded-lg bg-[var(--brand)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-hover)] active:scale-[0.98] sm:inline-flex"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </header>
  );
}
