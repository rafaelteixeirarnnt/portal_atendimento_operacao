import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StateShapeIcon } from "@/components/StateShapeIcon";

describe("StateShapeIcon", () => {
  it("renders a circular badge with the selected state silhouette", () => {
    render(<StateShapeIcon state="SP" title="Ícone de São Paulo" />);

    const icon = screen.getByTitle("Ícone de São Paulo").closest("svg");

    expect(icon).not.toBeNull();
    if (!icon) {
      throw new Error("State icon SVG was not rendered");
    }
    expect(icon.querySelectorAll("circle")).toHaveLength(2);
    expect(icon.querySelector("[data-state-shape='SP']")).toHaveAttribute("fill", "white");
  });
});
