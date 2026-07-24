import { useEffect } from "react";
import { ListTodo } from "lucide-react";
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
import type { Contract, Service } from "@/types/contracts";

const OPEN_REQUESTS_SERVICE_ID = "requests";

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
  const isSesMa = contract.id === "einstein-ses-ma";
  const openRequestsService = findServiceById(contract, OPEN_REQUESTS_SERVICE_ID);
  const categoryResults = search.results.filter((result) => result.service.id !== OPEN_REQUESTS_SERVICE_ID);

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
              "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-accent text-primary",
              contract.brandLogo ? "h-16 w-32 border border-border bg-white px-3 shadow-sm" : "size-16",
              isSesMa && "border-[#BDEB8D]/60 bg-white"
            )}
          >
            {isSesMa ? (
              <>
                <span aria-hidden="true" className="pointer-events-none absolute -left-7 -top-7 size-16 rounded-full bg-[#F5A38A] opacity-35 blur-2xl" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-7 -left-7 size-16 rounded-full bg-[#A9D4FF] opacity-30 blur-2xl" />
                <span aria-hidden="true" className="pointer-events-none absolute -right-7 -top-7 size-16 rounded-full bg-[#F7D54A] opacity-35 blur-2xl" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-7 -right-7 size-16 rounded-full bg-[#BDEB8D] opacity-30 blur-2xl" />
              </>
            ) : null}
            {contract.brandLogo ? (
              <img
                src={contract.brandLogo.srcOnLight ?? contract.brandLogo.src}
                alt={contract.brandLogo.alt}
                className="relative z-10 max-h-12 w-full object-contain"
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

      {openRequestsService ? (
        <OpenRequestsShortcut contract={contract} service={openRequestsService} onOpenService={rememberService} />
      ) : null}

      {categoryResults.length > 0 ? (
        <CategoryAccordion
          contract={contract}
          categories={contract.categories}
          visibleResults={categoryResults}
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

const findServiceById = (contract: Contract, serviceId: string): Service | undefined => {
  for (const category of contract.categories) {
    const service = category.services.find((item) => item.id === serviceId);
    if (service) {
      return service;
    }
  }

  return undefined;
};

interface OpenRequestsShortcutProps {
  contract: Contract;
  service: Service;
  onOpenService: (contractId: string, serviceId: string) => void;
}

const OpenRequestsShortcut = ({ contract, service, onOpenService }: OpenRequestsShortcutProps) => {
  const handleOpen = () => {
    if (!service.url) {
      return;
    }

    onOpenService(contract.id, service.id);
    window.open(service.url, "_blank", "noopener,noreferrer");
  };

  return (
    <section aria-label="Meus chamados" className="grid gap-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <span className="size-2 rounded-full bg-[#14B887]" aria-hidden="true" />
        Meus chamados
      </div>
      <a
        href={service.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={service.name}
        className="group flex items-center gap-4 rounded-lg border border-[#14B887]/75 bg-[#14B887]/7 px-4 py-4 text-left transition-colors hover:bg-[#14B887]/12"
        onClick={(event) => {
          event.preventDefault();
          handleOpen();
        }}
      >
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-[#14B887] text-white">
          <ListTodo className="size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-foreground">{service.name}</span>
          <span className="mt-1 block text-sm text-muted-foreground">{service.description}</span>
        </span>
      </a>
    </section>
  );
};
