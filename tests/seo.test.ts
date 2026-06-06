import { describe, it, expect } from "vitest";
import {
  absoluteUrl,
  formatTitle,
  buildMetadata,
  mergeKeywords,
  normalizeHandle,
  buildWebSiteJsonLd,
  type SeoConfig,
} from "@/lib/seo";

const config: SeoConfig = {
  siteName: "Acme",
  siteUrl: "https://acme.test",
  defaultDescription: "Default description.",
};

describe("absoluteUrl", () => {
  it("joins base and path with a single slash", () => {
    expect(absoluteUrl("https://acme.test", "/about")).toBe(
      "https://acme.test/about",
    );
  });

  it("adds a leading slash when the path lacks one", () => {
    expect(absoluteUrl("https://acme.test", "about")).toBe(
      "https://acme.test/about",
    );
  });

  it("strips trailing slashes from the base", () => {
    expect(absoluteUrl("https://acme.test///", "/x")).toBe(
      "https://acme.test/x",
    );
  });

  it("defaults to the root path", () => {
    expect(absoluteUrl("https://acme.test")).toBe("https://acme.test/");
  });
});

describe("formatTitle", () => {
  it("returns the site name alone when no title is given", () => {
    expect(formatTitle("Acme")).toBe("Acme");
  });

  it("composes title and site name", () => {
    expect(formatTitle("Acme", "About")).toBe("About | Acme");
  });

  it("avoids duplication when title equals site name", () => {
    expect(formatTitle("Acme", "Acme")).toBe("Acme");
  });
});

describe("buildMetadata", () => {
  it("applies defaults for a bare page", () => {
    const meta = buildMetadata(config);
    expect(meta.title).toBe("Acme");
    expect(meta.description).toBe("Default description.");
    expect(meta.alternates?.canonical).toBe("https://acme.test/");
    expect(meta.metadataBase?.toString()).toBe("https://acme.test/");
  });

  it("merges page-level options into OG and Twitter cards", () => {
    const meta = buildMetadata(config, {
      title: "About",
      description: "About page.",
      path: "/about",
    });
    expect(meta.title).toBe("About | Acme");
    expect(meta.openGraph?.title).toBe("About | Acme");
    expect(meta.openGraph && "url" in meta.openGraph ? meta.openGraph.url : undefined).toBe(
      "https://acme.test/about",
    );
    expect(
      meta.twitter && "card" in meta.twitter ? meta.twitter.card : undefined,
    ).toBe("summary_large_image");
  });

  it("emits indexable robots by default and noindex when requested", () => {
    const indexed = buildMetadata(config);
    expect(indexed.robots).toEqual({ index: true, follow: true });
    const hidden = buildMetadata(config, { noindex: true });
    expect(hidden.robots).toEqual({ index: false, follow: false });
  });

  it("merges site-wide and page-level keywords", () => {
    const withKeywords: SeoConfig = {
      ...config,
      defaultKeywords: ["next", "react"],
    };
    const meta = buildMetadata(withKeywords, { keywords: ["seo", "react"] });
    expect(meta.keywords).toEqual(["next", "react", "seo"]);
  });

  it("adds a twitter creator when configured", () => {
    const withHandle: SeoConfig = { ...config, twitterHandle: "viprasol" };
    const meta = buildMetadata(withHandle);
    expect(
      meta.twitter && "creator" in meta.twitter
        ? meta.twitter.creator
        : undefined,
    ).toBe("@viprasol");
  });
});

describe("mergeKeywords", () => {
  it("de-duplicates case-insensitively and preserves order", () => {
    expect(mergeKeywords(["A", "b"], ["B", "c"])).toEqual(["A", "b", "c"]);
  });

  it("trims and drops blanks", () => {
    expect(mergeKeywords([" x ", ""], undefined)).toEqual(["x"]);
  });
});

describe("normalizeHandle", () => {
  it("adds a leading @ and strips extras", () => {
    expect(normalizeHandle("viprasol")).toBe("@viprasol");
    expect(normalizeHandle("@@viprasol")).toBe("@viprasol");
  });

  it("returns undefined for empty input", () => {
    expect(normalizeHandle(undefined)).toBeUndefined();
    expect(normalizeHandle("  ")).toBeUndefined();
  });
});

describe("buildWebSiteJsonLd", () => {
  it("builds a schema.org WebSite object", () => {
    const jsonLd = buildWebSiteJsonLd(config);
    expect(jsonLd).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Acme",
      url: "https://acme.test/",
      description: "Default description.",
    });
  });
});
