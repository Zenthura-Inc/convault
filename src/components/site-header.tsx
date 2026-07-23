import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { SiteNav } from "@/components/site-nav";
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
      <div className="mx-auto flex min-h-[4.5rem] w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <BrandLogo priority />

        <SiteNav items={navItems} variant="desktop" />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/#converter"
            className="hidden h-11 items-center justify-center whitespace-nowrap rounded-lg bg-[var(--brand)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-hover)] active:scale-[0.98] sm:inline-flex"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      <SiteNav items={navItems} variant="mobile" />
    </header>
  );
}
