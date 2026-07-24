import type { BrazilianState, LocalPreferences, RecentService, ThemePreference } from "@/types/contracts";

const STORAGE_KEY = "liberty.portal-atendimento.preferences.v1";
const RECENT_LIMIT = 5;

const defaultPreferences: LocalPreferences = {
  theme: "system",
  recentServices: []
};

const isBrazilianState = (value: unknown): value is BrazilianState => value === "SP" || value === "MA" || value === "MT";

export const readPreferences = (storage: Storage = window.localStorage): LocalPreferences => {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultPreferences;
    }

    const parsed = JSON.parse(raw) as Partial<LocalPreferences>;
    const theme: ThemePreference =
      parsed.theme === "light" || parsed.theme === "dark" || parsed.theme === "system" ? parsed.theme : "system";

    return {
      theme,
      selectedState: isBrazilianState(parsed.selectedState) ? parsed.selectedState : undefined,
      lastContractId: typeof parsed.lastContractId === "string" ? parsed.lastContractId : undefined,
      recentServices: Array.isArray(parsed.recentServices) ? parsed.recentServices.slice(0, RECENT_LIMIT) : []
    };
  } catch {
    return defaultPreferences;
  }
};

export const writePreferences = (
  updater: (current: LocalPreferences) => LocalPreferences,
  storage: Storage = window.localStorage
): LocalPreferences => {
  const next = updater(readPreferences(storage));
  storage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};

export const setThemePreference = (theme: ThemePreference, storage?: Storage): LocalPreferences =>
  writePreferences((current) => ({ ...current, theme }), storage);

export const setLastContract = (contractId: string, storage?: Storage): LocalPreferences =>
  writePreferences((current) => ({ ...current, lastContractId: contractId }), storage);

export const setSelectedState = (selectedState: BrazilianState, storage?: Storage): LocalPreferences =>
  writePreferences((current) => ({ ...current, selectedState }), storage);

export const addRecentService = (
  recentService: Omit<RecentService, "usedAt">,
  storage?: Storage
): LocalPreferences =>
  writePreferences((current) => {
    const nextRecent: RecentService = {
      ...recentService,
      usedAt: new Date().toISOString()
    };

    return {
      ...current,
      recentServices: [
        nextRecent,
        ...current.recentServices.filter(
          (item) => item.contractId !== recentService.contractId || item.serviceId !== recentService.serviceId
        )
      ].slice(0, RECENT_LIMIT)
    };
  }, storage);
