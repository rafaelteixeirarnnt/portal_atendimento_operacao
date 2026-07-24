import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ContractCard } from "@/components/ContractCard";
import { findContractById } from "@/utils/contracts";

describe("ContractCard", () => {
  it("keeps a visible hover treatment on the featured Einstein logo", () => {
    const contract = findContractById("einstein-ses-sp");

    if (!contract) {
      throw new Error("Einstein SES-SP contract fixture was not found");
    }

    render(
      <MemoryRouter>
        <ContractCard contract={contract} />
      </MemoryRouter>
    );

    expect(screen.getByRole("img", { name: "Einstein Hospital Israelita" })).toHaveClass("group-hover:scale-105");
  });
});
