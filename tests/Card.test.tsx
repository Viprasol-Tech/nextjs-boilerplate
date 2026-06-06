import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/Card";

describe("<Card />", () => {
  it("renders its children", () => {
    render(<Card>Body content</Card>);
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("renders a heading when title is given", () => {
    render(<Card title="My Card">x</Card>);
    expect(
      screen.getByRole("heading", { name: "My Card" }),
    ).toBeInTheDocument();
  });

  it("omits the heading when no title", () => {
    render(<Card>x</Card>);
    expect(screen.queryByRole("heading")).toBeNull();
  });

  it("adds hover styling when interactive", () => {
    const { container } = render(<Card interactive>x</Card>);
    expect(container.firstElementChild?.className).toContain("hover:shadow-md");
  });
});
