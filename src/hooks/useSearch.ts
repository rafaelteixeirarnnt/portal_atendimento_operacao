import { useMemo, useState, useDeferredValue } from "react";
import type { Contract } from "@/types/contracts";
import { searchContracts, searchServicesInContract } from "@/utils/search";

export const useContractSearch = (contracts: Contract[]) => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => searchContracts(contracts, deferredQuery), [contracts, deferredQuery]);

  return { query, setQuery, results, hasQuery: deferredQuery.trim().length > 0 };
};

export const useServiceSearch = (contract: Contract) => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => searchServicesInContract(contract, deferredQuery), [contract, deferredQuery]);

  return { query, setQuery, results, hasQuery: deferredQuery.trim().length > 0 };
};
