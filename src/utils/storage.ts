import type { BrazilianState, LocalPreferences, RecentService, ThemePreference } from "@/types/contracts";

const STORAGE_KEY = "liberty.portal-atendimento.preferences.v1";
const RECENT_LIMIT = 5;

const defaultPreferences: LocalPreferences = {
  theme: "system",
  recentServices: []
};

const isBrazilianState = (value: unknown): value is BrazilianState => value === "SP" || value === "MA" || value === "MT";

const readLastContractByState = (value: unknown): Partial<Record<BrazilianState, string>> | undefined => {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const entries = Object.entries(value).filter(
    (entry): entry is [BrazilianState, string] => isBrazilianState(entry[0]) && typeof entry[1] === "string"
  );

  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
};

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
      lastContractByState: readLastContractByState(parsed.lastContractByState),
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

export const setLastContract = (contractId: string, state?: BrazilianState, storage?: Storage): LocalPreferences =>
  writePreferences(
    (current) => ({
      ...current,
      lastContractId: contractId,
      lastContractByState: state ? { ...current.lastContractByState, [state]: contractId } : current.lastContractByState
    }),
    storage
  );

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
