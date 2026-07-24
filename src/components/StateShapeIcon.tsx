import type { SVGProps } from "react";
import type { BrazilianState } from "@/types/contracts";

const statePaths: Record<BrazilianState, string> = {
  SP: "M17.8 35.5 20.4 27.7 27.1 22.7 35.1 23.6 41.5 28.2 47 29 48.8 34.4 45 38.5 40.1 38.7 36.9 43.7 30.9 42.5 24.7 45.2 21.3 41.1 16.1 40.8Z",
  MA: "M21.4 11.8 29.8 13.7 36.2 18.5 43.9 19.5 50.2 27 46.5 35.2 49.3 40.4 40.8 48.7 32.3 47.2 27.4 53.2 20.4 47.4 16.8 38.5 12.9 35.4 17.3 26.7 15.2 20.2Z",
  MT: "M12.7 22.7 21 15.7 34.4 14.4 44.5 18.7 52.2 28.9 49.6 39.3 41.1 46.9 27.9 46.7 22.7 42.7 13.9 42.9 10.5 33.7Z"
};

interface StateShapeIconProps extends SVGProps<SVGSVGElement> {
  state: BrazilianState;
  title?: string;
}

export const StateShapeIcon = ({ state, title, ...props }: StateShapeIconProps) => (
  <svg viewBox="0 0 64 64" fill="none" role={title ? "img" : undefined} {...props}>
    {title ? <title>{title}</title> : null}
    <circle cx="32" cy="32" r="30" fill="currentColor" />
    <circle cx="32" cy="32" r="24.5" fill="none" stroke="white" strokeWidth="3" />
    <path data-state-shape={state} d={statePaths[state]} fill="white" />
  </svg>
);
