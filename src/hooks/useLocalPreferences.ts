import { useCallback, useEffect, useState } from "react";
import type { BrazilianState, ThemePreference } from "@/types/contracts";
import { addRecentService, readPreferences, setLastContract, setSelectedState, setThemePreference } from "@/utils/storage";
import { findContractById } from "@/utils/contracts";

const applyTheme = (theme: ThemePreference) => {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = theme === "dark" || (theme === "system" && systemDark);

  root.classList.toggle("dark", shouldUseDark);
};

export const useLocalPreferences = () => {
  const [preferences, setPreferences] = useState(() => readPreferences());

  useEffect(() => {
    applyTheme(preferences.theme);
  }, [preferences.theme]);

  useEffect(() => {
    if (preferences.theme !== "system") {
      return undefined;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => applyTheme("system");
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [preferences.theme]);

  const updateTheme = useCallback((theme: ThemePreference) => {
    setPreferences(setThemePreference(theme));
  }, []);

  const updateSelectedState = useCallback((selectedState: BrazilianState) => {
    setPreferences(setSelectedState(selectedState));
  }, []);

  const rememberContract = useCallback((contractId: string) => {
    setPreferences(setLastContract(contractId, findContractById(contractId)?.state));
  }, []);

  const rememberService = useCallback((contractId: string, serviceId: string) => {
    setPreferences(addRecentService({ contractId, serviceId }));
  }, []);

  return {
    preferences,
    updateTheme,
    updateSelectedState,
    rememberContract,
    rememberService
  };
};
