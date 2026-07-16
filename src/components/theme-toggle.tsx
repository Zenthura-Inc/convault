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
      className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-purple-800 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-purple-900 active:scale-[0.98]"
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
