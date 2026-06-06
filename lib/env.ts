/**
 * Typed, validated access to environment variables.
 *
 * Centralizes reads from `process.env` so the rest of the app never touches
 * raw strings. Missing required variables fail fast with a clear message
 * instead of surfacing as `undefined` deep inside the request lifecycle.
 */

export type NodeEnv = "development" | "test" | "production";

export interface AppEnv {
  /** Current runtime mode. Defaults to "development" when unset. */
  nodeEnv: NodeEnv;
  /** Public, absolute base URL of the site (used for canonical/OG URLs). */
  siteUrl: string;
  /** Human-readable site name surfaced in metadata. */
  siteName: string;
}

const VALID_NODE_ENVS: readonly NodeEnv[] = [
  "development",
  "test",
  "production",
];

/** Source of values; injectable so the logic is unit-testable. */
export type EnvSource = Record<string, string | undefined>;

/**
 * Reads a required variable, throwing a descriptive error when it is missing
 * or blank. Whitespace-only values are treated as missing.
 */
export function requireEnv(key: string, source: EnvSource): string {
  const raw = source[key];
  if (raw === undefined || raw.trim() === "") {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return raw.trim();
}

/**
 * Reads an optional variable, returning `fallback` when missing or blank.
 */
export function optionalEnv(
  key: string,
  fallback: string,
  source: EnvSource,
): string {
  const raw = source[key];
  if (raw === undefined || raw.trim() === "") {
    return fallback;
  }
  return raw.trim();
}

/** Coerces an arbitrary string into a known `NodeEnv`, defaulting safely. */
export function parseNodeEnv(value: string | undefined): NodeEnv {
  if (value && (VALID_NODE_ENVS as readonly string[]).includes(value)) {
    return value as NodeEnv;
  }
  return "development";
}

/**
 * Builds the typed {@link AppEnv} from a source map (defaults to
 * `process.env`). Throws when required configuration is absent.
 */
export function readEnv(source: EnvSource = process.env): AppEnv {
  return {
    nodeEnv: parseNodeEnv(source.NODE_ENV),
    siteUrl: optionalEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000", source),
    siteName: optionalEnv("NEXT_PUBLIC_SITE_NAME", "Next.js Boilerplate", source),
  };
}
