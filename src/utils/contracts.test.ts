import { describe, expect, it } from "vitest";
import { contracts } from "@/data/contracts";
import { findContractById, getServiceCount } from "@/utils/contracts";

describe("contract utilities", () => {
  it("counts services across all categories", () => {
    const sms = contracts.find((contract) => contract.id === "sms-sp");

    expect(sms && getServiceCount(sms)).toBe(10);
  });

  it("finds contracts by id", () => {
    expect(findContractById("einstein-ses-ma")?.name).toBe("Einstein SES-MA");
    expect(findContractById("missing")).toBeUndefined();
  });
});
