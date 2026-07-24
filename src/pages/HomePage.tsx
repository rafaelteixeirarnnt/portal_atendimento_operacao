import { useEffect } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { ContractCard } from "@/components/ContractCard";
import { EmptyState } from "@/components/EmptyState";
import { contracts } from "@/data/contracts";
import type { useLocalPreferences } from "@/hooks/useLocalPreferences";
import { findContractById, getContractsByState } from "@/utils/contracts";

export const HomePage = () => {
  const { preferences, rememberContract } = useOutletContext<ReturnType<typeof useLocalPreferences>>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const shouldSelectClient = searchParams.get("selecionarCliente") === "1";
  const visibleContracts = preferences.selectedState ? getContractsByState(preferences.selectedState, contracts) : contracts;
  const savedContractId = preferences.selectedState
    ? (preferences.lastContractByState?.[preferences.selectedState] ?? preferences.lastContractId)
    : undefined;
  const savedContract = savedContractId ? findContractById(savedContractId) : undefined;

  useEffect(() => {
    if (shouldSelectClient || !preferences.selectedState || !savedContract || savedContract.state !== preferences.selectedState) {
      return;
    }

    navigate(`/contracts/${savedContract.id}`, { replace: true });
  }, [navigate, preferences.selectedState, savedContract, shouldSelectClient]);

  return (
    <div className="grid gap-10">
      <section className="max-w-3xl">
        <div>
          <h1 className="text-4xl font-bold tracking-normal md:text-5xl">Encontre o atendimento certo para o seu contrato</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Selecione sua operação e acesse o contrato correspondente. O portal direciona você para o canal correto de atendimento.
          </p>
        </div>
      </section>

      <section aria-label="Contratos disponíveis">
        <div aria-label="Contratos" className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleContracts.length > 0 ? (
            visibleContracts.map((contract) => <ContractCard key={contract.id} contract={contract} onOpen={rememberContract} />)
          ) : (
            <div className="sm:col-span-2 lg:col-span-3">
              <EmptyState title="Nenhum contrato encontrado" description="Troque o estado selecionado para ver os contratos disponíveis." />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
