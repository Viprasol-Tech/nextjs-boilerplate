/**
 * Small, dependency-free formatting helpers. Pure functions, easy to test.
 */

/** Converts a string into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Truncates `text` to `max` characters, appending an ellipsis when cut. */
export function truncate(text: string, max: number): string {
  if (max <= 0) return "";
  if (text.length <= max) return text;
  if (max <= 1) return "…";
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

/** Capitalizes the first character of a string. */
export function capitalize(input: string): string {
  if (input.length === 0) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

/** Pluralizes a noun based on count, e.g. pluralize(2, "item") -> "items". */
export function pluralize(count: number, singular: string, plural?: string): string {
  const word = Math.abs(count) === 1 ? singular : (plural ?? `${singular}s`);
  return `${count} ${word}`;
}

/** Formats a byte count into a human-readable size (e.g. "1.5 KB"). */
export function formatBytes(bytes: number, decimals = 1): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / Math.pow(1024, exponent);
  const rounded = exponent === 0 ? value : Number(value.toFixed(decimals));
  return `${rounded} ${units[exponent]}`;
}

/** Formats an ISO date (or Date) as a locale-independent YYYY-MM-DD string. */
export function formatDate(value: string | number | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
