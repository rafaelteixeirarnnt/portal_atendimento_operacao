import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface BreadcrumbNavProps {
  current: string;
}

export const BreadcrumbNav = ({ current }: BreadcrumbNavProps) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <Link className="rounded-sm hover:text-primary" to="/?selecionarCliente=1">
          Início
        </Link>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <span aria-current="page" className="font-medium text-foreground">
          {current}
        </span>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);
