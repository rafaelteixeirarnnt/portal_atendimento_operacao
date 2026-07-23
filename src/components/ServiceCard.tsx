import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/components/icons";
import type { Contract, Service } from "@/types/contracts";

interface ServiceCardProps {
  contract: Contract;
  service: Service;
  categoryName: string;
  onRequiresGuidance: (contract: Contract, service: Service) => void;
  onOpenService: (contractId: string, serviceId: string) => void;
}

export const ServiceCard = ({ contract, service, categoryName, onRequiresGuidance, onOpenService }: ServiceCardProps) => {
  const Icon = getIcon(service.icon);
  const isUnavailable = !service.url;

  const handleOpen = () => {
    if (isUnavailable) {
      return;
    }

    if (service.requiresGuidance) {
      onRequiresGuidance(contract, service);
      return;
    }

    onOpenService(contract.id, service.id);
    window.open(service.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-5 p-5">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
            <Icon aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{categoryName}</p>
            <h3 className="mt-1 text-base font-semibold leading-6">{service.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.description}</p>
          </div>
        </div>
        <Button
          aria-label={isUnavailable ? `Serviço indisponível: ${service.name}` : `Abrir chamado: ${service.name}`}
          className="mt-auto w-full sm:w-fit"
          disabled={isUnavailable}
          onClick={handleOpen}
        >
          <ExternalLink data-icon="inline-start" aria-hidden="true" />
          {isUnavailable ? "Serviço indisponível" : "Abrir chamado"}
        </Button>
      </CardContent>
    </Card>
  );
};
