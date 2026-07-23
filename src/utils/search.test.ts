import { describe, expect, it } from "vitest";
import { contracts } from "@/data/contracts";
import { searchContracts, searchServicesInContract } from "@/utils/search";

describe("searchContracts", () => {
  it("finds incident services by an accented medical keyword", () => {
    const results = searchContracts(contracts, "prescrição");

    expect(results.some((result) => result.matchedServices.some((match) => match.service.name === "Incidente"))).toBe(
      true
    );
  });

  it("finds password and user related services by senha", () => {
    const results = searchContracts(contracts, "senha");
    const serviceNames = results.flatMap((result) => result.matchedServices.map((match) => match.service.name));

    expect(serviceNames).toContain("Reset de senha para BI");
    expect(serviceNames).toContain("Cadastro de usuários");
    expect(serviceNames).toContain("Criar usuário na Universidade Liberty");
  });
});

describe("searchServicesInContract", () => {
  it("filters services inside a single contract", () => {
    const sms = contracts[0];
    const results = searchServicesInContract(sms, "business intelligence");

    expect(results.every((result) => result.contract.id === "sms-sp")).toBe(true);
    expect(results.map((result) => result.service.name)).toContain("Solicitar acesso ao BI");
  });
});
