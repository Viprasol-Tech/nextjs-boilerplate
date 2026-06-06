"use client";

import { nextTheme, themeLabel } from "@/lib/theme";
import { cn } from "@/lib/cn";
import { useTheme } from "@/components/ThemeProvider";

const ICON: Record<string, string> = {
  light: "☀",
  dark: "☾",
  system: "◐",
};

/**
 * A single button that cycles light -> dark -> system. Uses the theme context
 * and is fully keyboard- and screen-reader-accessible.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme(theme))}
      aria-label={`Theme: ${themeLabel(theme)}. Click to change.`}
      title={`Theme: ${themeLabel(theme)}`}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border",
        "border-slate-200 text-slate-700 transition-colors hover:bg-slate-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
        "dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
        className,
      )}
    >
      <span aria-hidden="true">{ICON[theme]}</span>
    </button>
  );
}

export default ThemeToggle;
