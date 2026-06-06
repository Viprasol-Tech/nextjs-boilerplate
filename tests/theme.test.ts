import { describe, it, expect } from "vitest";
import {
  isTheme,
  parseTheme,
  resolveTheme,
  nextTheme,
  themeClass,
  themeLabel,
  THEMES,
} from "@/lib/theme";

describe("isTheme", () => {
  it("accepts the known themes", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("system")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isTheme("blue")).toBe(false);
    expect(isTheme(null)).toBe(false);
    expect(isTheme(42)).toBe(false);
  });
});

describe("parseTheme", () => {
  it("passes through valid themes", () => {
    expect(parseTheme("dark")).toBe("dark");
  });

  it("defaults to system for invalid input", () => {
    expect(parseTheme("nonsense")).toBe("system");
    expect(parseTheme(undefined)).toBe("system");
  });
});

describe("resolveTheme", () => {
  it("returns the explicit theme regardless of the OS setting", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("follows the OS setting when system", () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
  });
});

describe("nextTheme", () => {
  it("cycles light -> dark -> system -> light", () => {
    expect(nextTheme("light")).toBe("dark");
    expect(nextTheme("dark")).toBe("system");
    expect(nextTheme("system")).toBe("light");
  });

  it("covers every theme in the cycle", () => {
    const seen = new Set<string>();
    let current = THEMES[0];
    for (let i = 0; i < THEMES.length; i += 1) {
      seen.add(current);
      current = nextTheme(current);
    }
    expect(seen.size).toBe(THEMES.length);
  });
});

describe("themeClass", () => {
  it("maps dark to the dark class and light to empty", () => {
    expect(themeClass("dark")).toBe("dark");
    expect(themeClass("light")).toBe("");
  });
});

describe("themeLabel", () => {
  it("returns human-friendly labels", () => {
    expect(themeLabel("light")).toBe("Light");
    expect(themeLabel("dark")).toBe("Dark");
    expect(themeLabel("system")).toBe("System");
  });
});
