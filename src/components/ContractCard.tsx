import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIcon } from "@/components/icons";
import type { Contract } from "@/types/contracts";
import { getServiceCount } from "@/utils/contracts";

interface ContractCardProps {
  contract: Contract;
  onOpen?: (contractId: string) => void;
}

export const ContractCard = ({ contract, onOpen }: ContractCardProps) => {
  const Icon = getIcon(contract.icon);

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.16 }}>
      <Link to={`/contracts/${contract.id}`} onClick={() => onOpen?.(contract.id)} className="block rounded-lg">
        <Card className="h-full transition-shadow hover:shadow-soft">
          <CardHeader className="gap-5">
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex size-12 items-center justify-center rounded-lg bg-accent text-primary">
                <Icon aria-hidden="true" />
              </span>
              <ArrowRight aria-hidden="true" className="mt-3 text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <CardTitle>{contract.name}</CardTitle>
              <Badge variant="accent" className="w-fit">
                {getServiceCount(contract)} serviços disponíveis
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">{contract.shortDescription}</p>
            <p className="mt-5 text-sm font-semibold text-primary">Clique para visualizar</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
