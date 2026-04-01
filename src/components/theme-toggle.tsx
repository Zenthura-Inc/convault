"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      type="button"
      className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-zinc-900 shadow-sm transition active:scale-[0.98] dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100"
      aria-label="Toggle theme"
      onClick={() => {
        if (!mounted) return;
        setTheme(effectiveTheme === "dark" ? "light" : "dark");
      }}
    >
      {mounted ? (effectiveTheme === "dark" ? "Dark" : "Light") : "Theme"}
    </button>
  );
}
