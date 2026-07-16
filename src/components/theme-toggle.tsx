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
      className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-purple-800 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-purple-900 active:scale-[0.98]"
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
