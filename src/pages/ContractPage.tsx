import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { CategoryAccordion } from "@/components/CategoryAccordion";
import { EmptyState } from "@/components/EmptyState";
import { GuidanceModal } from "@/components/GuidanceModal";
import { SearchBar } from "@/components/SearchBar";
import { getIcon } from "@/components/icons";
import { useGuidance } from "@/hooks/useGuidance";
import { cn } from "@/lib/utils";
import type { useLocalPreferences } from "@/hooks/useLocalPreferences";
import { useServiceSearch } from "@/hooks/useSearch";
import { findContractById, getServiceCount } from "@/utils/contracts";
import type { Contract } from "@/types/contracts";

export const ContractPage = () => {
  const { contractId } = useParams();
  const preferences = useOutletContext<ReturnType<typeof useLocalPreferences>>();
  const contract = contractId ? findContractById(contractId) : undefined;

  if (!contract) {
    return <EmptyState title="Contrato inexistente" description="Verifique o endereço acessado ou volte para a lista de contratos." />;
  }

  return <ContractDetail contract={contract} preferences={preferences} />;
};

interface ContractDetailProps {
  contract: Contract;
  preferences: ReturnType<typeof useLocalPreferences>;
}

const ContractDetail = ({ contract, preferences }: ContractDetailProps) => {
  const guidance = useGuidance();
  const Icon = getIcon(contract.icon);
  const search = useServiceSearch(contract);
  const { rememberContract, rememberService } = preferences;

  useEffect(() => {
    rememberContract(contract.id);
  }, [contract.id, rememberContract]);

  return (
    <div className="grid gap-8">
      <BreadcrumbNav current={contract.name} />

      <section className="grid gap-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <span
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-lg bg-accent text-primary",
              contract.brandLogo ? "h-16 w-32 border border-border bg-white px-3 shadow-sm" : "size-16"
            )}
          >
            {contract.brandLogo ? (
              <img
                src={contract.brandLogo.srcOnLight ?? contract.brandLogo.src}
                alt={contract.brandLogo.alt}
                className="max-h-12 w-full object-contain"
              />
            ) : (
              <Icon aria-hidden="true" />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold md:text-4xl">{contract.name}</h1>
              <Badge variant="accent">{getServiceCount(contract)} serviços</Badge>
            </div>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{contract.description}</p>
          </div>
        </div>
        <Separator />
      </section>

      <SearchBar value={search.query} onChange={search.setQuery} placeholder="Filtrar serviços deste contrato" />

      {search.results.length > 0 ? (
        <CategoryAccordion
          contract={contract}
          categories={contract.categories}
          visibleResults={search.results}
          onRequiresGuidance={guidance.openGuidance}
          onOpenService={rememberService}
        />
      ) : (
        <EmptyState title="Nenhum serviço encontrado" description="Ajuste a busca ou limpe o campo para ver todas as categorias." />
      )}

      <GuidanceModal
        contract={guidance.guidance?.contract}
        service={guidance.guidance?.service}
        open={Boolean(guidance.guidance)}
        onOpenChange={(open) => {
          if (!open) {
            guidance.closeGuidance();
          }
        }}
        onContinue={rememberService}
      />
    </div>
  );
};
