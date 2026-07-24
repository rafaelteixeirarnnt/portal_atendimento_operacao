import { contracts } from "@/data/contracts";
import type { BrazilianState, Contract, Service, ServiceSearchResult } from "@/types/contracts";

export const getServiceCount = (contract: Contract): number =>
  contract.categories.reduce((total, category) => total + category.services.length, 0);

export const findContractById = (id: string): Contract | undefined =>
  contracts.find((contract) => contract.id === id);

export const getContractsByState = (state: BrazilianState, sourceContracts: Contract[] = contracts): Contract[] =>
  sourceContracts.filter((contract) => contract.state === state);

export const getAllServices = (sourceContracts: Contract[] = contracts): ServiceSearchResult[] =>
  sourceContracts.flatMap((contract) =>
    contract.categories.flatMap((category) =>
      category.services.map((service) => ({
        contract,
        category,
        service
      }))
    )
  );

export const findService = (
  contractId: string,
  serviceId: string,
  sourceContracts: Contract[] = contracts
): { contract: Contract; service: Service } | undefined => {
  const contract = sourceContracts.find((item) => item.id === contractId);
  const service = contract?.categories.flatMap((category) => category.services).find((item) => item.id === serviceId);

  return contract && service ? { contract, service } : undefined;
};
