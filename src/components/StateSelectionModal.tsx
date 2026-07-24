import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { stateOptions } from "@/data/states";
import type { BrazilianState } from "@/types/contracts";

interface StateSelectionModalProps {
  open: boolean;
  selectedState?: BrazilianState;
  onOpenChange: (open: boolean) => void;
  onSelectState: (state: BrazilianState) => void;
}

export const StateSelectionModal = ({
  open,
  selectedState,
  onOpenChange,
  onSelectState
}: StateSelectionModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent showCloseButton={Boolean(selectedState)}>
      <DialogHeader>
        <DialogTitle>Selecione seu estado</DialogTitle>
        <DialogDescription>
          Vamos mostrar apenas os sistemas disponíveis para sua região. Você pode alterar essa escolha depois no topo da página.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 sm:grid-cols-3">
        {stateOptions.map((option) => (
          <Button
            key={option.id}
            type="button"
            variant={selectedState === option.id ? "default" : "outline"}
            className="h-auto min-h-20 justify-center px-4 py-5 text-center text-base font-semibold"
            onClick={() => onSelectState(option.id)}
          >
            {option.name}
          </Button>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);
