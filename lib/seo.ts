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
}

export interface PageSeoOptions {
  /** Page title. When omitted, the site name is used as-is. */
  title?: string;
  /** Page description. Falls back to the site default. */
  description?: string;
  /** Path (with or without leading slash) for the canonical URL. */
  path?: string;
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

  return {
    metadataBase: new URL(config.siteUrl),
    title,
    description,
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
    },
  };
}
