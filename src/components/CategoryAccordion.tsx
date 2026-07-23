import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EmptyState } from "@/components/EmptyState";
import { ServiceCard } from "@/components/ServiceCard";
import { getIcon } from "@/components/icons";
import type { Category, Contract, ServiceSearchResult } from "@/types/contracts";

interface CategoryAccordionProps {
  contract: Contract;
  categories: Category[];
  visibleResults: ServiceSearchResult[];
  onRequiresGuidance: (contract: Contract, service: Category["services"][number]) => void;
  onOpenService: (contractId: string, serviceId: string) => void;
}

export const CategoryAccordion = ({
  contract,
  categories,
  visibleResults,
  onRequiresGuidance,
  onOpenService
}: CategoryAccordionProps) => {
  const visibleByCategory = new Map<string, ServiceSearchResult[]>();
  visibleResults.forEach((result) => {
    const current = visibleByCategory.get(result.category.id) ?? [];
    visibleByCategory.set(result.category.id, [...current, result]);
  });

  return (
    <Accordion type="multiple" defaultValue={categories.map((category) => category.id)} className="flex flex-col gap-3">
      {categories.map((category) => {
        const Icon = getIcon(category.icon);
        const services = visibleByCategory.get(category.id) ?? [];

        return (
          <AccordionItem key={category.id} value={category.id} className="rounded-lg border bg-card px-5">
            <AccordionTrigger>
              <span className="flex min-w-0 items-center gap-3 text-left">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-primary">
                  <Icon aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold">{category.name}</span>
                  <span className="block text-sm font-normal text-muted-foreground">{category.description}</span>
                </span>
              </span>
              <Badge variant="secondary" className="ml-auto mr-4 shrink-0">
                {services.length} serviços
              </Badge>
            </AccordionTrigger>
            <AccordionContent>
              {services.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {services.map(({ service }) => (
                    <ServiceCard
                      key={service.id}
                      contract={contract}
                      service={service}
                      categoryName={category.name}
                      onRequiresGuidance={onRequiresGuidance}
                      onOpenService={onOpenService}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState title="Categoria vazia" description="Nenhum serviço desta categoria corresponde à busca atual." />
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
