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
      className="rounded-full border-white/35 bg-white/10 text-white shadow-none backdrop-blur hover:bg-white/20 hover:text-white"
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      onClick={() => onThemeChange(nextTheme)}
    >
      <Icon aria-hidden="true" />
    </Button>
  );
};
