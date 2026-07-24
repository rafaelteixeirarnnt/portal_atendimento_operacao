import type { BrazilianState } from "@/types/contracts";

export interface StateOption {
  id: BrazilianState;
  name: string;
  description: string;
}

export const stateOptions: StateOption[] = [
  {
    id: "SP",
    name: "São Paulo",
    description: "SMS-SP e Einstein SES-SP"
  },
  {
    id: "MA",
    name: "Maranhão",
    description: "SES-MA"
  },
  {
    id: "MT",
    name: "Mato Grosso",
    description: "Einstein SES-MT"
  }
];

export const getStateName = (state: BrazilianState): string =>
  stateOptions.find((option) => option.id === state)?.name ?? state;
