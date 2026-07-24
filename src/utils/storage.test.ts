import { describe, expect, it } from "vitest";
import { addRecentService, readPreferences, setLastContract, setSelectedState, setThemePreference } from "@/utils/storage";

const createMemoryStorage = (): Storage => {
  const values = new Map<string, string>();

  return {
    get length() {
      return values.size;
    },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => Array.from(values.keys())[index] ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value)
  };
};

describe("preferences storage", () => {
  it("falls back to system theme when storage is empty", () => {
    expect(readPreferences(createMemoryStorage()).theme).toBe("system");
  });

  it("persists theme, last contract and recent services", () => {
    const storage = createMemoryStorage();

    setThemePreference("dark", storage);
    setLastContract("sms-sp", "SP", storage);
    addRecentService({ contractId: "sms-sp", serviceId: "incident" }, storage);

    const preferences = readPreferences(storage);
    expect(preferences.theme).toBe("dark");
    expect(preferences.lastContractId).toBe("sms-sp");
    expect(preferences.lastContractByState?.SP).toBe("sms-sp");
    expect(preferences.recentServices[0]).toMatchObject({ contractId: "sms-sp", serviceId: "incident" });
  });

  it("persists selected state and ignores invalid saved state values", () => {
    const storage = createMemoryStorage();

    setLastContract("sms-sp", "SP", storage);
    addRecentService({ contractId: "sms-sp", serviceId: "incident" }, storage);
    setSelectedState("SP", storage);
    const selectedPreferences = readPreferences(storage);
    expect(selectedPreferences.selectedState).toBe("SP");
    expect(selectedPreferences.lastContractId).toBeUndefined();
    expect(selectedPreferences.lastContractByState).toBeUndefined();
    expect(selectedPreferences.recentServices).toEqual([]);

    storage.setItem(
      "liberty.portal-atendimento.preferences.v1",
      JSON.stringify({ theme: "system", selectedState: "RJ", recentServices: [] })
    );

    expect(readPreferences(storage).selectedState).toBeUndefined();
  });
});
