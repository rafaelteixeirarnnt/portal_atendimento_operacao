import { useCallback, useState } from "react";
import type { Contract, Service } from "@/types/contracts";

interface GuidanceState {
  contract: Contract;
  service: Service;
}

export const useGuidance = () => {
  const [state, setState] = useState<GuidanceState | null>(null);

  const openGuidance = useCallback((contract: Contract, service: Service) => {
    setState({ contract, service });
  }, []);

  const closeGuidance = useCallback(() => {
    setState(null);
  }, []);

  return {
    guidance: state,
    openGuidance,
    closeGuidance
  };
};
