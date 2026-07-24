import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CategoryAccordion } from "@/components/CategoryAccordion";
import { contracts } from "@/data/contracts";
import type { ServiceSearchResult } from "@/types/contracts";

describe("CategoryAccordion", () => {
  it("starts every category collapsed", () => {
    const contract = contracts.find((item) => item.id === "einstein-ses-sp");
    if (!contract) {
      throw new Error("Einstein contract fixture was not found");
    }

    const visibleResults: ServiceSearchResult[] = contract.categories.flatMap((category) =>
      category.services.map((service) => ({ contract, category, service }))
    );

    render(
      <CategoryAccordion
        contract={contract}
        categories={contract.categories}
        visibleResults={visibleResults}
        onRequiresGuidance={vi.fn()}
        onOpenService={vi.fn()}
      />
    );

    const supportSection = screen.getByRole("button", { name: /Atendimento Geral/ });
    const trainingSection = screen.getByRole("button", { name: /Treinamentos/ });

    expect(supportSection).toHaveAttribute("aria-expanded", "false");
    expect(trainingSection).toHaveAttribute("aria-expanded", "false");
  });
});
