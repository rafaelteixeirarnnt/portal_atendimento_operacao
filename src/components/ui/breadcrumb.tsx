import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<"nav">>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("inline-flex items-center gap-2", className)} {...props} />
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("text-muted-foreground/70", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator };
