import { describe, it, expect } from "vitest";
import {
  slugify,
  truncate,
  capitalize,
  pluralize,
  formatBytes,
  formatDate,
} from "@/lib/format";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips diacritics", () => {
    expect(slugify("Café Münchën")).toBe("cafe-munchen");
  });

  it("collapses non-alphanumerics and trims dashes", () => {
    expect(slugify("  --A_B!! C--  ")).toBe("a-b-c");
  });
});

describe("truncate", () => {
  it("leaves short strings untouched", () => {
    expect(truncate("hi", 10)).toBe("hi");
  });

  it("cuts and appends an ellipsis", () => {
    expect(truncate("hello world", 5)).toBe("hell…");
  });

  it("returns empty for non-positive max", () => {
    expect(truncate("hello", 0)).toBe("");
  });
});

describe("capitalize", () => {
  it("uppercases the first character", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("handles an empty string", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("pluralize", () => {
  it("uses the singular for a count of 1", () => {
    expect(pluralize(1, "item")).toBe("1 item");
  });

  it("uses the default plural otherwise", () => {
    expect(pluralize(3, "item")).toBe("3 items");
    expect(pluralize(0, "item")).toBe("0 items");
  });

  it("uses a custom plural when provided", () => {
    expect(pluralize(2, "person", "people")).toBe("2 people");
  });
});

describe("formatBytes", () => {
  it("formats zero and small values", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(512)).toBe("512 B");
  });

  it("scales to KB/MB", () => {
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(1_048_576)).toBe("1 MB");
  });

  it("guards against invalid input", () => {
    expect(formatBytes(-1)).toBe("0 B");
    expect(formatBytes(Number.NaN)).toBe("0 B");
  });
});

describe("formatDate", () => {
  it("formats an ISO string as YYYY-MM-DD", () => {
    expect(formatDate("2025-03-09T12:34:56Z")).toBe("2025-03-09");
  });

  it("accepts a Date instance", () => {
    expect(formatDate(new Date("2024-12-31T00:00:00Z"))).toBe("2024-12-31");
  });

  it("returns empty for invalid input", () => {
    expect(formatDate("not-a-date")).toBe("");
  });
});
