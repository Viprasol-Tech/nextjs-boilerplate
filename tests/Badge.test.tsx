import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/Badge";

describe("<Badge />", () => {
  it("renders its children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies the neutral tone by default", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default").className).toContain("bg-slate-100");
  });

  it("applies a requested tone", () => {
    render(<Badge tone="success">OK</Badge>);
    expect(screen.getByText("OK").className).toContain("bg-emerald-100");
  });

  it("merges a custom className", () => {
    render(<Badge className="custom-x">Z</Badge>);
    expect(screen.getByText("Z").className).toContain("custom-x");
  });
});
