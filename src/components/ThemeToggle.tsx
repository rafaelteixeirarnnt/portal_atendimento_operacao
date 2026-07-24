import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { ThemePreference } from "@/types/contracts";

interface ThemeToggleProps {
  theme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
}

const themeLabels: Record<ThemePreference, string> = {
  light: "Tema claro",
  dark: "Tema escuro",
  system: "Tema automático"
};

export const ThemeToggle = ({ theme, onThemeChange }: ThemeToggleProps) => {
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Laptop;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-3 sm:min-w-40 sm:justify-between" aria-label="Alterar tema">
          <Icon data-icon="inline-start" aria-hidden="true" />
          <span className="hidden sm:inline">{themeLabels[theme]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => onThemeChange(value as ThemePreference)}>
          <DropdownMenuRadioItem value="light">Tema claro</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Tema escuro</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">Tema automático</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
