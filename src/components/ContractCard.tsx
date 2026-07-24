import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Contract } from "@/types/contracts";
import { getServiceCount } from "@/utils/contracts";

interface ContractCardProps {
  contract: Contract;
  onOpen?: (contractId: string) => void;
}

export const ContractCard = ({ contract, onOpen }: ContractCardProps) => {
  const Icon = getIcon(contract.icon);
  const hasBrandLogo = Boolean(contract.brandLogo);
  const isFeaturedEinstein = contract.id === "einstein-ses-sp";
  const isSesMa = contract.id === "einstein-ses-ma";

  return (
    <motion.div className="h-full" whileHover={{ y: -3 }} transition={{ duration: 0.16 }}>
      <Link to={`/contracts/${contract.id}`} onClick={() => onOpen?.(contract.id)} className="group block h-full rounded-lg">
        <Card
          className={cn(
            "flex h-full min-h-[268px] flex-col overflow-hidden transition-shadow hover:shadow-soft",
            isFeaturedEinstein &&
              "border-[#0096D2]/35 bg-[linear-gradient(135deg,#00539A_0%,#00539A_48%,#0096D2_78%,#00DBFF_100%)] text-white"
          )}
        >
          <CardHeader className="gap-5">
            <div className={cn("flex min-h-24 items-start justify-between gap-4", hasBrandLogo && "justify-end", isSesMa && "justify-center")}>
              <span
                className={cn(
                  "relative inline-flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-b-[28px] rounded-t-lg border border-[#005243]/15 bg-[#002747]/5 px-4 shadow-inner transition-colors group-hover:border-[#36FFC0]/40 group-hover:bg-white dark:bg-white/90",
                  hasBrandLogo &&
                    "order-2 ml-auto h-20 w-44 border-transparent bg-transparent px-0 shadow-none group-hover:border-transparent group-hover:bg-transparent dark:bg-transparent",
                  isSesMa && "mx-auto"
                )}
              >
                {contract.brandLogo ? (
                  <img
                    src={contract.brandLogo.src}
                    alt={contract.brandLogo.alt}
                    className={cn(
                      "max-h-16 w-full object-contain drop-shadow-sm transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
                      isFeaturedEinstein ? "opacity-70" : "opacity-65 grayscale saturate-50 group-hover:grayscale-0 group-hover:saturate-100 group-focus-visible:grayscale-0 group-focus-visible:saturate-100"
                    )}
                  />
                ) : (
                  <span className="inline-flex size-12 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon aria-hidden="true" />
                  </span>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <CardTitle>{contract.name}</CardTitle>
              <Badge variant="accent" className={cn("w-fit", isFeaturedEinstein && "border-white/25 bg-white/15 text-white")}>
                {getServiceCount(contract)} serviços disponíveis
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col">
            <p className={cn("text-sm leading-6 text-muted-foreground", isFeaturedEinstein && "text-white/90")}>
              {contract.shortDescription}
            </p>
            <p className={cn("mt-auto pt-5 text-sm font-semibold text-primary", isFeaturedEinstein && "text-white")}>Clique para visualizar</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
