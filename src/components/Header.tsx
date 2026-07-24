import { MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { getStateName } from "@/data/states";
import type { useLocalPreferences } from "@/hooks/useLocalPreferences";

interface HeaderProps {
  preferences: ReturnType<typeof useLocalPreferences>;
  onOpenStateSelector: () => void;
}

export const Header = ({ preferences, onOpenStateSelector }: HeaderProps) => (
  <header className="border-b border-emerald-950/20 bg-[#073f30] text-white shadow-sm">
    <div className="container flex min-h-20 items-center justify-between gap-4 py-3">
      <a
        href="/"
        className="inline-flex w-fit items-center justify-center rounded-md transition-transform hover:-translate-y-0.5"
        aria-label="Liberty health - Portal de Atendimento"
      >
        <img
          src="/brand/logo-horizontal.png"
          alt="Liberty health"
          className="h-10 w-auto max-w-[210px] object-contain sm:h-12 sm:max-w-[310px]"
        />
      </a>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="rounded-full border-white/35 bg-white/10 px-4 text-xs font-bold uppercase tracking-wide text-white shadow-none backdrop-blur hover:bg-white/20 hover:text-white"
          onClick={onOpenStateSelector}
        >
          <MapPin aria-hidden="true" />
          {preferences.preferences.selectedState
            ? getStateName(preferences.preferences.selectedState)
            : "Estado"}
        </Button>
        <ThemeToggle theme={preferences.preferences.theme} onThemeChange={preferences.updateTheme} />
      </div>
    </div>
  </header>
);
