import { describe, it, expect } from "vitest";
import {
  requireEnv,
  optionalEnv,
  requireUrl,
  parseNodeEnv,
  readEnv,
} from "@/lib/env";

describe("requireEnv", () => {
  it("returns a trimmed value when present", () => {
    expect(requireEnv("KEY", { KEY: "  value  " })).toBe("value");
  });

  it("throws when the variable is missing", () => {
    expect(() => requireEnv("KEY", {})).toThrow(
      /Missing required environment variable: KEY/,
    );
  });

  it("throws when the variable is blank", () => {
    expect(() => requireEnv("KEY", { KEY: "   " })).toThrow();
  });
});

describe("optionalEnv", () => {
  it("returns the value when present", () => {
    expect(optionalEnv("KEY", "fallback", { KEY: "real" })).toBe("real");
  });

  it("returns the fallback when missing", () => {
    expect(optionalEnv("KEY", "fallback", {})).toBe("fallback");
  });

  it("returns the fallback when blank", () => {
    expect(optionalEnv("KEY", "fallback", { KEY: "" })).toBe("fallback");
  });
});

describe("requireUrl", () => {
  it("returns a valid https url", () => {
    expect(requireUrl("URL", { URL: "https://example.com" })).toBe(
      "https://example.com",
    );
  });

  it("accepts http urls", () => {
    expect(requireUrl("URL", { URL: "http://localhost:3000" })).toBe(
      "http://localhost:3000",
    );
  });

  it("throws when missing", () => {
    expect(() => requireUrl("URL", {})).toThrow(
      /Missing required environment variable/,
    );
  });

  it("throws on a malformed url", () => {
    expect(() => requireUrl("URL", { URL: "not a url" })).toThrow(/Invalid URL/);
  });

  it("rejects non-http protocols", () => {
    expect(() => requireUrl("URL", { URL: "ftp://example.com" })).toThrow(
      /must be an http\(s\) URL/,
    );
  });
});

describe("parseNodeEnv", () => {
  it("accepts known environments", () => {
    expect(parseNodeEnv("production")).toBe("production");
    expect(parseNodeEnv("test")).toBe("test");
  });

  it("defaults to development for unknown or missing values", () => {
    expect(parseNodeEnv(undefined)).toBe("development");
    expect(parseNodeEnv("staging")).toBe("development");
  });
});

describe("readEnv", () => {
  it("builds defaults from an empty source", () => {
    const env = readEnv({});
    expect(env).toEqual({
      nodeEnv: "development",
      siteUrl: "http://localhost:3000",
      siteName: "Next.js Boilerplate",
    });
  });

  it("reads provided overrides", () => {
    const env = readEnv({
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "https://example.com",
      NEXT_PUBLIC_SITE_NAME: "My Site",
    });
    expect(env.nodeEnv).toBe("production");
    expect(env.siteUrl).toBe("https://example.com");
    expect(env.siteName).toBe("My Site");
  });
});
