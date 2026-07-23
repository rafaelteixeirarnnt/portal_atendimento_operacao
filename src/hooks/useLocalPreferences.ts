import { useCallback, useEffect, useState } from "react";
import type { ThemePreference } from "@/types/contracts";
import { addRecentService, readPreferences, setLastContract, setThemePreference } from "@/utils/storage";

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

  const rememberContract = useCallback((contractId: string) => {
    setPreferences(setLastContract(contractId));
  }, []);

  const rememberService = useCallback((contractId: string, serviceId: string) => {
    setPreferences(addRecentService({ contractId, serviceId }));
  }, []);

  return {
    preferences,
    updateTheme,
    rememberContract,
    rememberService
  };
};
