import { Link, useOutletContext } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ContractCard } from "@/components/ContractCard";
import { EmptyState } from "@/components/EmptyState";
import { SearchBar } from "@/components/SearchBar";
import { getIcon } from "@/components/icons";
import { contracts } from "@/data/contracts";
import { useContractSearch } from "@/hooks/useSearch";
import type { useLocalPreferences } from "@/hooks/useLocalPreferences";
import { getContractsByState } from "@/utils/contracts";

export const HomePage = () => {
  const { preferences, rememberContract } = useOutletContext<ReturnType<typeof useLocalPreferences>>();
  const visibleContracts = preferences.selectedState ? getContractsByState(preferences.selectedState, contracts) : contracts;
  const { query, setQuery, results, hasQuery } = useContractSearch(visibleContracts);
  const matchedServices = results.flatMap((result) => result.matchedServices).slice(0, 8);

  return (
    <div className="grid gap-10">
      <section className="max-w-3xl">
        <div>
          <h1 className="text-4xl font-bold tracking-normal md:text-5xl">Portal de Atendimento</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Escolha o contrato para acessar os canais corretos de atendimento.
          </p>
        </div>
      </section>

      <section aria-label="Pesquisa de contratos e serviços">
        <SearchBar value={query} onChange={setQuery} placeholder="Buscar por contrato ou serviço (ex.: prescrição, senha, BI)" />
      </section>

      <section aria-label="Contratos" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.length > 0 ? (
          results.map(({ contract }) => (
            <ContractCard key={contract.id} contract={contract} onOpen={rememberContract} />
          ))
        ) : (
          <div className="sm:col-span-2 lg:col-span-3">
            <EmptyState title="Nenhum resultado encontrado" description="Tente buscar por contrato, sistema, categoria, serviço ou palavra-chave." />
          </div>
        )}
      </section>

      {hasQuery && matchedServices.length > 0 ? (
        <section aria-label="Resultados de serviços" className="grid gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">Resultados da busca</h2>
            <Badge variant="secondary">{matchedServices.length}</Badge>
          </div>
          <Card className="overflow-hidden">
            <div className="divide-y">
              {matchedServices.map(({ contract, category, service }) => {
                const Icon = getIcon(service.icon);
                return (
                  <Link
                    key={`${contract.id}-${service.id}`}
                    to={`/contracts/${contract.id}`}
                    onClick={() => rememberContract(contract.id)}
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-accent"
                  >
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-primary">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{service.name}</span>
                      <span className="block text-sm text-muted-foreground">{contract.name} · {category.name}</span>
                    </span>
                    {service.url ? <ExternalLink aria-hidden="true" className="text-primary" /> : <ArrowRight aria-hidden="true" className="text-primary" />}
                  </Link>
                );
              })}
            </div>
          </Card>
        </section>
      ) : null}
    </div>
  );
};
