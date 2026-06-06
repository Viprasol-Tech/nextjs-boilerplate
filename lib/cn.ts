/**
 * Tiny className joiner. Filters out falsy values so conditional classes can
 * be expressed inline without pulling in a dependency.
 */
export type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values
    .filter((value): value is string => Boolean(value))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
