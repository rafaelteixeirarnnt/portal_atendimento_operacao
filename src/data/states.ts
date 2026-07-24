import type { BrazilianState } from "@/types/contracts";

export interface StateOption {
  id: BrazilianState;
  name: string;
}

export const stateOptions: StateOption[] = [
  {
    id: "MA",
    name: "Maranhão"
  },
  {
    id: "MT",
    name: "Mato Grosso"
  },
  {
    id: "SP",
    name: "São Paulo"
  }
];

export const getStateName = (state: BrazilianState): string =>
  stateOptions.find((option) => option.id === state)?.name ?? state;
