import type { Contract, ContractSearchResult, ServiceSearchResult } from "@/types/contracts";

const normalize = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

const includesQuery = (query: string, values: Array<string | undefined>): boolean =>
  values.some((value) => value && normalize(value).includes(query));

export const searchContracts = (contracts: Contract[], rawQuery: string): ContractSearchResult[] => {
  const query = normalize(rawQuery);

  if (!query) {
    return contracts.map((contract) => ({ contract, matchedServices: [] }));
  }

  return contracts
    .map((contract) => {
      const contractMatches = includesQuery(query, [
        contract.name,
        contract.description,
        contract.shortDescription,
        contract.system
      ]);

      const matchedServices: ServiceSearchResult[] = contract.categories.flatMap((category) =>
        category.services
          .filter((service) =>
            includesQuery(query, [
              contract.name,
              contract.description,
              contract.system,
              category.name,
              category.description,
              service.name,
              service.description,
              service.system,
              ...service.keywords
            ])
          )
          .map((service) => ({ contract, category, service }))
      );

      return contractMatches || matchedServices.length > 0 ? { contract, matchedServices } : undefined;
    })
    .filter((result): result is ContractSearchResult => Boolean(result));
};

export const searchServicesInContract = (contract: Contract, rawQuery: string): ServiceSearchResult[] => {
  const query = normalize(rawQuery);

  return contract.categories.flatMap((category) =>
    category.services
      .filter((service) => {
        if (!query) {
          return true;
        }

        return includesQuery(query, [
          contract.name,
          contract.description,
          contract.system,
          category.name,
          category.description,
          service.name,
          service.description,
          service.system,
          ...service.keywords
        ]);
      })
      .map((service) => ({ contract, category, service }))
  );
};
