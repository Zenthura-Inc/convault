import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";

type FooterLink =
  | {
      label: string;
      href: string;
      planned?: never;
    }
  | {
      label: string;
      planned: true;
      href?: never;
    };

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
  {
    title: "Converters",
    links: [
      { label: "TXT to PDF", href: "/#converter" },
      { label: "PDF tools", href: "/#converter" },
      { label: "Image tools", href: "/#converter" },
      { label: "All converters", href: "/#converter" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", planned: true },
      { label: "Contact Us", planned: true },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "FAQ", planned: true },
      { label: "Blog", planned: true },
      { label: "Help Center", planned: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-white dark:bg-zinc-950">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.6fr]">
        <div>
          <BrandLogo iconSize={36} />
          <p className="mt-4 max-w-64 text-sm leading-6 text-slate-600 dark:text-zinc-300">
            The easiest way to convert files online. Fast, secure, and simple.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
              {group.title}
            </h2>
            <div className="mt-4 space-y-3">
              {group.links.map((link) => (
                link.planned ? (
                  <span
                    key={link.label}
                    className="block text-sm text-slate-400 dark:text-zinc-500"
                  >
                    {link.label}
                  </span>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-slate-600 transition hover:text-[var(--brand)] dark:text-zinc-300"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        ))}

        <div>
          <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
            Stay Updated
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-zinc-300">
            Product updates signup is planned for a later phase.
          </p>
          <div
            className="mt-4 flex gap-2 opacity-75"
            aria-disabled="true"
            title="Newsletter signup is planned"
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address for future updates"
              disabled
              className="min-w-0 flex-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--brand)] focus:ring-2 focus:ring-purple-500/20"
            />
            <button
              type="button"
              disabled
              className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white opacity-60"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border-subtle)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-10 dark:text-zinc-400">
          <p>Copyright {new Date().getFullYear()} Convault. All rights reserved.</p>
          <p>Social links planned.</p>
        </div>
      </div>
    </footer>
  );
}
