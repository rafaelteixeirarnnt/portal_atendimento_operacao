import { contracts } from "@/data/contracts";
import { findContractById, getAllServices } from "@/utils/contracts";

export const useContracts = () => ({
  contracts,
  allServices: getAllServices(contracts),
  findContractById
});
