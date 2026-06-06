import type { Metadata } from "next";

/**
 * SEO / metadata helpers.
 *
 * `buildMetadata` produces a Next.js `Metadata` object from a small,
 * page-level options bag, applying sensible site-wide defaults (title
 * template, canonical URL, Open Graph and Twitter cards). Keeping this in a
 * pure function makes the metadata shape trivially unit-testable.
 */

export interface SeoConfig {
  /** Site name, used in the title template and OG site name. */
  siteName: string;
  /** Absolute base URL, e.g. "https://example.com". No trailing slash needed. */
  siteUrl: string;
  /** Default description used when a page does not supply its own. */
  defaultDescription: string;
  /** Site-wide keywords, merged with any page-level keywords. */
  defaultKeywords?: string[];
  /** Twitter/X handle (with or without leading @) for `twitter:creator`. */
  twitterHandle?: string;
}

/** De-duplicates and trims a list of keywords, preserving order. */
export function mergeKeywords(...lists: (string[] | undefined)[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const list of lists) {
    for (const raw of list ?? []) {
      const keyword = raw.trim();
      if (keyword !== "" && !seen.has(keyword.toLowerCase())) {
        seen.add(keyword.toLowerCase());
        result.push(keyword);
      }
    }
  }
  return result;
}

/** Normalizes a Twitter handle to the leading-@ form, or undefined. */
export function normalizeHandle(handle?: string): string | undefined {
  if (!handle) return undefined;
  const trimmed = handle.trim().replace(/^@+/, "");
  return trimmed === "" ? undefined : `@${trimmed}`;
}

export interface PageSeoOptions {
  /** Page title. When omitted, the site name is used as-is. */
  title?: string;
  /** Page description. Falls back to the site default. */
  description?: string;
  /** Path (with or without leading slash) for the canonical URL. */
  path?: string;
  /** Per-page keywords, merged with any site-wide defaults. */
  keywords?: string[];
  /** When true, the page is excluded from search indexing. */
  noindex?: boolean;
}

/** Joins a base URL and a path into a clean absolute URL. */
export function absoluteUrl(siteUrl: string, path = "/"): string {
  const base = siteUrl.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

/** Formats a page title against the site name (no duplication when equal). */
export function formatTitle(siteName: string, title?: string): string {
  if (!title || title.trim() === "" || title.trim() === siteName) {
    return siteName;
  }
  return `${title.trim()} | ${siteName}`;
}

/**
 * Builds a fully-populated Next.js {@link Metadata} object for a page.
 */
export function buildMetadata(
  config: SeoConfig,
  options: PageSeoOptions = {},
): Metadata {
  const title = formatTitle(config.siteName, options.title);
  const description =
    options.description?.trim() || config.defaultDescription;
  const url = absoluteUrl(config.siteUrl, options.path ?? "/");
  const keywords = mergeKeywords(config.defaultKeywords, options.keywords);
  const creator = normalizeHandle(config.twitterHandle);

  return {
    metadataBase: new URL(config.siteUrl),
    title,
    description,
    ...(keywords.length > 0 ? { keywords } : {}),
    robots: options.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      siteName: config.siteName,
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(creator ? { creator } : {}),
    },
  };
}

/** Minimal JSON-LD WebSite schema for richer search results. */
export interface WebSiteJsonLd {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
}

/** Builds a JSON-LD WebSite object suitable for a <script> tag. */
export function buildWebSiteJsonLd(config: SeoConfig): WebSiteJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.siteName,
    url: absoluteUrl(config.siteUrl, "/"),
    description: config.defaultDescription,
  };
}
