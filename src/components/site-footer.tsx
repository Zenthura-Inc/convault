import Link from "next/link";

const footerGroups = [
  {
    title: "Converters",
    links: ["TXT to PDF", "PDF tools", "Image tools", "All converters"],
  },
  {
    title: "Company",
    links: ["About Us", "Privacy Policy", "Terms of Use", "Contact Us"],
  },
  {
    title: "Support",
    links: ["FAQ", "How It Works", "Blog", "Help Center"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-white dark:bg-zinc-950">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.6fr]">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-lg font-bold tracking-tight text-[var(--brand)]"
          >
            <span className="relative flex h-9 w-8 items-end justify-center rounded-md bg-[var(--brand)] pb-1 text-[0.52rem] font-black leading-none text-white shadow-sm">
              CV
              <span className="absolute right-0 top-0 h-0 w-0 border-l-[9px] border-t-[9px] border-l-purple-200 border-t-white dark:border-l-purple-300 dark:border-t-zinc-950" />
            </span>
            <span>Convault</span>
          </Link>
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
                <Link
                  key={link}
                  href={link === "Privacy Policy" ? "/privacy" : "/#converter"}
                  className="block text-sm text-slate-600 transition hover:text-[var(--brand)] dark:text-zinc-300"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
            Stay Updated
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-zinc-300">
            Subscribe to get the latest updates and features.
          </p>
          <form className="mt-4 flex gap-2" action="#">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--brand)] focus:ring-2 focus:ring-purple-500/20"
            />
            <button
              type="submit"
              className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[var(--border-subtle)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-10 dark:text-zinc-400">
          <p>Copyright {new Date().getFullYear()} Convault. All rights reserved.</p>
          <div className="flex gap-4">
            <span aria-hidden="true">x</span>
            <span aria-hidden="true">f</span>
            <span aria-hidden="true">ig</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
