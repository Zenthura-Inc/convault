"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="inline-flex h-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/15 active:scale-[0.98]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={() => {
        if (!mounted) return;
        setTheme(isDark ? "light" : "dark");
      }}
    >
      {mounted ? (isDark ? "Dark" : "Light") : "Theme"}
    </button>
  );
}
