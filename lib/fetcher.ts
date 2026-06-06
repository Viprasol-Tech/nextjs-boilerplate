/**
 * A small, typed `fetch` wrapper.
 *
 * Adds JSON parsing, request timeouts (via AbortController), and a structured
 * error type so callers can branch on HTTP status without re-deriving it from
 * a string. Dependency-free and isomorphic (works on server and client).
 */

export interface FetchJsonOptions extends Omit<RequestInit, "signal"> {
  /** Abort the request after this many milliseconds. 0 disables the timeout. */
  timeoutMs?: number;
}

/** Error thrown for non-2xx responses, carrying the status for branching. */
export class HttpError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;

  constructor(status: number, statusText: string, url: string) {
    super(`Request to ${url} failed with ${status} ${statusText}`);
    this.name = "HttpError";
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }
}

/** Builds an absolute or root-relative URL with an encoded query string. */
export function withQuery(
  url: string,
  params?: Record<string, string | number | boolean | undefined>,
): string {
  if (!params) return url;
  const pairs = Object.entries(params).filter(
    ([, value]) => value !== undefined,
  );
  if (pairs.length === 0) return url;
  const search = pairs
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join("&");
  return url.includes("?") ? `${url}&${search}` : `${url}?${search}`;
}

const DEFAULT_TIMEOUT_MS = 10_000;

/**
 * Fetches `url` and parses the body as JSON, typed as `T`.
 *
 * Throws {@link HttpError} on non-2xx responses and re-throws abort/network
 * errors. The `fetchImpl` parameter is injectable so the logic can be tested
 * without a live network.
 */
export async function fetchJson<T>(
  url: string,
  options: FetchJsonOptions = {},
  fetchImpl: typeof fetch = fetch,
): Promise<T> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, headers, ...rest } = options;

  const controller = new AbortController();
  const timer =
    timeoutMs > 0
      ? setTimeout(() => controller.abort(), timeoutMs)
      : undefined;

  try {
    const response = await fetchImpl(url, {
      ...rest,
      headers: {
        Accept: "application/json",
        ...headers,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText, url);
    }

    return (await response.json()) as T;
  } finally {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
  }
}
