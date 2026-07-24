import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Contract, Service } from "@/types/contracts";

interface ServiceCardProps {
  contract: Contract;
  service: Service;
  categoryName: string;
  onRequiresGuidance: (contract: Contract, service: Service) => void;
  onOpenService: (contractId: string, serviceId: string) => void;
}

export const ServiceCard = ({ contract, service, onRequiresGuidance, onOpenService }: ServiceCardProps) => {
  const Icon = getIcon(service.icon);
  const isUnavailable = !service.url;
  const cardContent = (
    <CardContent className="flex h-full flex-col gap-5 p-5">
      <div className="flex items-start gap-4">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
          <Icon aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-6">{service.name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.description}</p>
        </div>
      </div>
    </CardContent>
  );

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

  const cardClassName = cn(
    "h-full transition-colors",
    isUnavailable ? "opacity-70" : "cursor-pointer hover:border-primary/45 hover:bg-accent/35"
  );

  if (isUnavailable) {
    return <Card className={cardClassName}>{cardContent}</Card>;
  }

  if (service.requiresGuidance) {
    return (
      <button
        type="button"
        aria-label={`Abrir chamado: ${service.name}`}
        className="block h-full w-full rounded-lg text-left"
        onClick={handleOpen}
      >
        <Card className={cardClassName}>{cardContent}</Card>
      </button>
    );
  }

  return (
    <a
      href={service.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir chamado: ${service.name}`}
      className="block h-full rounded-lg"
      onClick={(event) => {
        event.preventDefault();
        handleOpen();
      }}
    >
      <Card className={cardClassName}>{cardContent}</Card>
    </a>
  );
};
