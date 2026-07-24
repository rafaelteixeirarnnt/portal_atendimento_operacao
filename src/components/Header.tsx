import { ThemeToggle } from "@/components/ThemeToggle";
import type { useLocalPreferences } from "@/hooks/useLocalPreferences";

interface HeaderProps {
  preferences: ReturnType<typeof useLocalPreferences>;
}

export const Header = ({ preferences }: HeaderProps) => (
  <header className="border-b border-emerald-950/20 bg-[#073f30] text-white shadow-sm">
    <div className="container grid min-h-20 grid-cols-[1fr_auto] items-center gap-4 py-3 md:grid-cols-[1fr_auto_auto] md:gap-8">
      <div className="hidden md:block" aria-hidden="true" />
      <a
        href="/"
        className="inline-flex w-fit items-center justify-center rounded-md bg-white px-4 py-2 shadow-sm transition-transform hover:-translate-y-0.5 md:justify-self-end"
        aria-label="Liberty health - Portal de Atendimento"
      >
        <img
          src="/brand/logo-horizontal.png"
          alt="Liberty health"
          className="h-10 w-auto max-w-[210px] object-contain sm:h-12 sm:max-w-[310px]"
        />
      </a>
      <div className="justify-self-end">
        <ThemeToggle theme={preferences.preferences.theme} onThemeChange={preferences.updateTheme} />
      </div>
    </div>
  </header>
);
