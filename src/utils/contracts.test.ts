import { describe, expect, it } from "vitest";
import { contracts } from "@/data/contracts";
import { findContractById, getContractsByState, getServiceCount } from "@/utils/contracts";

describe("contract utilities", () => {
  it("counts services across all categories", () => {
    const sms = contracts.find((contract) => contract.id === "sms-sp");

    expect(sms && getServiceCount(sms)).toBe(10);
  });

  it("finds contracts by id", () => {
    expect(findContractById("einstein-ses-ma")?.name).toBe("SES-MA");
    expect(findContractById("missing")).toBeUndefined();
  });

  it("filters contracts by state", () => {
    expect(getContractsByState("SP").map((contract) => contract.name)).toEqual(["SMS-SP", "Einstein SES-SP"]);
    expect(getContractsByState("MA").map((contract) => contract.name)).toEqual(["SES-MA"]);
    expect(getContractsByState("MT").map((contract) => contract.name)).toEqual(["Einstein SES-MT"]);
  });
});
