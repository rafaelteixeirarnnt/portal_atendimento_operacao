import { Building2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { useLocalPreferences } from "@/hooks/useLocalPreferences";

interface HeaderProps {
  preferences: ReturnType<typeof useLocalPreferences>;
}

export const Header = ({ preferences }: HeaderProps) => (
  <header className="border-b bg-card/80 backdrop-blur">
    <div className="container flex h-16 items-center justify-between gap-4">
      <a href="/" className="inline-flex items-center gap-3 rounded-md font-semibold text-foreground" aria-label="Portal de Atendimento">
        <span className="inline-flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Building2 aria-hidden="true" />
        </span>
        <span className="text-lg">Liberty TI</span>
      </a>
      <ThemeToggle theme={preferences.preferences.theme} onThemeChange={preferences.updateTheme} />
    </div>
  </header>
);
