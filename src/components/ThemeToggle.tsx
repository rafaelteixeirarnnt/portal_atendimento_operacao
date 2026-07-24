import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ThemePreference } from "@/types/contracts";

interface ThemeToggleProps {
  theme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
}

export const ThemeToggle = ({ theme, onThemeChange }: ThemeToggleProps) => {
  const isDark = theme === "dark";
  const nextTheme: ThemePreference = isDark ? "light" : "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full border-[#005243]/25 bg-[#002747] text-[#36FFC0] shadow-none hover:bg-[#005243] hover:text-[#B0FF8C]"
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      onClick={() => onThemeChange(nextTheme)}
    >
      <Icon aria-hidden="true" />
    </Button>
  );
};
