import { readEnv } from "@/lib/env";
import type { SeoConfig } from "@/lib/seo";

/**
 * Resolves the site-wide SEO configuration from the typed environment.
 * Shared by the root layout and individual route metadata.
 */
export function siteConfig(): SeoConfig {
  const env = readEnv();
  return {
    siteName: env.siteName,
    siteUrl: env.siteUrl,
    defaultDescription:
      "Production-ready Next.js (App Router) + TypeScript + Tailwind starter.",
  };
}
