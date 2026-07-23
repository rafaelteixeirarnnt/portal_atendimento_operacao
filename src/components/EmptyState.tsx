import { SearchX } from "lucide-react";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <Empty>
    <span className="inline-flex size-11 items-center justify-center rounded-lg bg-muted text-muted-foreground">
      <SearchX aria-hidden="true" />
    </span>
    <EmptyTitle>{title}</EmptyTitle>
    <EmptyDescription>{description}</EmptyDescription>
  </Empty>
);
