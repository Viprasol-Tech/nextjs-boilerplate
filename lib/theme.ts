/**
 * Theme utilities.
 *
 * Pure, framework-agnostic helpers for a light/dark/system theme model. The
 * React glue (provider, toggle) lives in `components/`; everything here is a
 * plain function so the resolution logic is trivially unit-testable.
 */

/** The user's chosen preference. "system" follows the OS setting. */
export type Theme = "light" | "dark" | "system";

/** A concrete, applied theme — never "system". */
export type ResolvedTheme = "light" | "dark";

export const THEMES: readonly Theme[] = ["light", "dark", "system"];

/** localStorage key under which the preference is persisted. */
export const THEME_STORAGE_KEY = "viprasol-theme";

/** Type guard: is `value` one of the known {@link Theme} values? */
export function isTheme(value: unknown): value is Theme {
  return (
    typeof value === "string" && (THEMES as readonly string[]).includes(value)
  );
}

/** Normalizes arbitrary input into a valid {@link Theme}, defaulting to system. */
export function parseTheme(value: unknown): Theme {
  return isTheme(value) ? value : "system";
}

/**
 * Resolves a preference into the concrete theme to apply, given whether the
 * environment currently prefers dark mode.
 */
export function resolveTheme(theme: Theme, prefersDark: boolean): ResolvedTheme {
  if (theme === "system") {
    return prefersDark ? "dark" : "light";
  }
  return theme;
}

/** Cycles light -> dark -> system -> light. Useful for a single toggle button. */
export function nextTheme(theme: Theme): Theme {
  const index = THEMES.indexOf(theme);
  return THEMES[(index + 1) % THEMES.length];
}

/**
 * Returns the class name to place on the document root for a resolved theme.
 * Tailwind's `darkMode: "class"` strategy keys off the "dark" class.
 */
export function themeClass(resolved: ResolvedTheme): string {
  return resolved === "dark" ? "dark" : "";
}

/** Human-friendly label for a preference, e.g. for a toggle's aria-label. */
export function themeLabel(theme: Theme): string {
  switch (theme) {
    case "light":
      return "Light";
    case "dark":
      return "Dark";
    case "system":
      return "System";
  }
}
