"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SiteNavItem = {
  label: string;
  href: string;
};

type SiteNavProps = {
  items: SiteNavItem[];
  variant: "desktop" | "mobile";
};

export function SiteNav({ items, variant }: SiteNavProps) {
  const pathname = usePathname();
  const isDesktop = variant === "desktop";

  return (
    <nav
      className={
        isDesktop
          ? "hidden items-center gap-8 text-sm font-medium text-slate-700 lg:flex dark:text-zinc-200"
          : "mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto border-t border-[var(--border-subtle)] px-4 py-2 text-sm font-medium text-slate-700 sm:px-6 lg:hidden dark:text-zinc-200"
      }
      aria-label={isDesktop ? "Primary navigation" : "Mobile navigation"}
    >
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              isDesktop
                ? [
                    "relative py-6 transition hover:text-[var(--brand)]",
                    active
                      ? "text-[var(--brand)] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-[var(--brand)]"
                      : "",
                  ].join(" ")
                : [
                    "shrink-0 rounded-lg px-3 py-2 transition hover:bg-[var(--brand-soft)] hover:text-[var(--brand)]",
                    active ? "bg-[var(--brand-soft)] text-[var(--brand)]" : "",
                  ].join(" ")
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href.includes("#")) {
    return false;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
