import { describe, it, expect } from "vitest";
import {
  absoluteUrl,
  formatTitle,
  buildMetadata,
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
});
