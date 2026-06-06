import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { THEME_STORAGE_KEY } from "@/lib/theme";

function stubMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

function Probe() {
  const { theme, resolvedTheme } = useTheme();
  return (
    <span data-testid="state">
      {theme}:{resolvedTheme}
    </span>
  );
}

describe("<ThemeToggle /> + ThemeProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    stubMatchMedia(false);
  });

  it("renders an accessible toggle button", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    const button = screen.getByRole("button");
    expect(button.getAttribute("aria-label")).toMatch(/Theme:/);
  });

  it("cycles the preference and persists it on click", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("state").textContent).toBe("light:light");

    act(() => {
      fireEvent.click(screen.getByRole("button"));
    });
    expect(screen.getByTestId("state").textContent).toBe("dark:dark");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("applies the dark class to the document root when dark", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("throws when useTheme is used outside a provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow(/within a ThemeProvider/);
    spy.mockRestore();
  });
});
