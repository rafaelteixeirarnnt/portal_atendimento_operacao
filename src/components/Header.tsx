import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { getStateName } from "@/data/states";
import type { useLocalPreferences } from "@/hooks/useLocalPreferences";
import { replaceWithHashRoute } from "@/utils/navigation";

interface HeaderProps {
  preferences: ReturnType<typeof useLocalPreferences>;
  onOpenStateSelector: () => void;
}

export const Header = ({ preferences, onOpenStateSelector }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-[#36FFC0]/20 bg-[linear-gradient(110deg,#002747_0%,#005243_58%,#002747_100%)] text-white shadow-sm">
      <div className="container flex min-h-24 items-center justify-between gap-4 py-4">
        <Link
          to="/?selecionarCliente=1"
          className="inline-flex w-fit items-center justify-center rounded-md"
          aria-label="Liberty health - Portal de Atendimento"
          onClick={(event) => {
            event.preventDefault();
            replaceWithHashRoute("/?selecionarCliente=1");
            navigate("/?selecionarCliente=1");
          }}
        >
          <img
            src="/brand/logo-horizontal.png"
            alt="Liberty health"
            className="h-10 w-auto max-w-[210px] object-contain sm:h-12 sm:max-w-[310px]"
          />
        </Link>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-[#005243]/25 bg-[#005243] px-4 text-xs font-bold uppercase tracking-wide text-white shadow-none hover:bg-[#002747] hover:text-white"
            onClick={onOpenStateSelector}
          >
            {preferences.preferences.selectedState
              ? getStateName(preferences.preferences.selectedState)
              : "Estado"}
          </Button>
          <ThemeToggle theme={preferences.preferences.theme} onThemeChange={preferences.updateTheme} />
        </div>
      </div>
    </header>
  );
};
