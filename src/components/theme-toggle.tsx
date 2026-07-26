"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="inline-flex h-11 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--brand)] shadow-sm transition hover:bg-[var(--brand-soft)] active:scale-[0.98]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      suppressHydrationWarning
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
      }}
    >
      {isDark ? "Dark" : "Light"}
    </button>
  );
}
