import { CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import type { Contract, Service } from "@/types/contracts";

interface GuidanceModalProps {
  contract?: Contract;
  service?: Service;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (contractId: string, serviceId: string) => void;
}

export const GuidanceModal = ({ contract, service, open, onOpenChange, onContinue }: GuidanceModalProps) => {
  const items = service?.guidanceItems ?? [];

  const handleContinue = () => {
    if (!contract || !service?.url) {
      return;
    }

    onContinue(contract.id, service.id);
    window.open(service.url, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Antes de continuar confirme que você possui:</DialogTitle>
          <DialogDescription>
            Essas informações ajudam a equipe a reproduzir o cenário e acelerar o atendimento.
          </DialogDescription>
        </DialogHeader>
        <ul className="grid gap-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 text-sm">
              <CheckCircle2 aria-hidden="true" className="text-primary" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Voltar
          </Button>
          <Button onClick={handleContinue}>
            <ExternalLink data-icon="inline-start" aria-hidden="true" />
            Continuar para o Jira
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
