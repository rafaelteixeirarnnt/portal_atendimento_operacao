import type { SVGProps } from "react";
import type { BrazilianState } from "@/types/contracts";

const statePaths: Record<BrazilianState, string> = {
  SP: "M17 18.5 27.5 12 39 15.5 48 25 45.5 37.5 36 48.5 23.5 45 15 34.5 18 25.5Z",
  MA: "M21 9.5 36.5 13 48.5 24 43.5 39 30.5 52 18.5 42 14.5 28.5Z",
  MT: "M13.5 18.5 27.5 12.5 47.5 18 51.5 33.5 41.5 47 21 43.5 12 31Z"
};

interface StateShapeIconProps extends SVGProps<SVGSVGElement> {
  state: BrazilianState;
}

export const StateShapeIcon = ({ state, ...props }: StateShapeIconProps) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" {...props}>
    <path d={statePaths[state]} />
  </svg>
);
