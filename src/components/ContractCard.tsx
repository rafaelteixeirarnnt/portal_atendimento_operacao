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
            "relative flex h-full min-h-[268px] flex-col overflow-hidden transition-shadow hover:shadow-soft",
            isFeaturedEinstein &&
              "border-[#0096D2]/35 bg-[linear-gradient(135deg,#00539A_0%,#00539A_48%,#0096D2_78%,#00DBFF_100%)] text-white",
            isSesMa && "border-[#BDEB8D]/45 bg-white"
          )}
        >
          {isSesMa ? (
            <>
              <span aria-hidden="true" className="pointer-events-none absolute -left-14 -top-14 z-0 size-36 rounded-full bg-[#F5A38A] opacity-30 blur-[56px]" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-14 -left-14 z-0 size-40 rounded-full bg-[#A9D4FF] opacity-25 blur-[60px]" />
              <span aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 z-0 size-36 rounded-full bg-[#F7D54A] opacity-30 blur-[56px]" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-14 -right-14 z-0 size-40 rounded-full bg-[#BDEB8D] opacity-25 blur-[60px]" />
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 h-full w-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 360 268"
              >
                <path d="M-22 30 C24 10 34 72 72 48 C108 26 128 4 160 18" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
                <path d="M314 -18 C300 34 372 42 332 86 C310 110 356 120 382 148" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
                <path d="M-18 226 C30 198 48 280 92 242 C120 218 134 246 160 272" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
                <path d="M300 286 C324 244 366 260 348 208 C340 184 372 170 386 150" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
              </svg>
            </>
          ) : null}
          <CardHeader className="relative z-10 gap-5">
            <div className={cn("flex min-h-24 items-start justify-between gap-4", hasBrandLogo && "justify-end")}>
              <span
                className={cn(
                  "relative inline-flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-b-[28px] rounded-t-lg border border-[#005243]/15 bg-[#002747]/5 px-4 shadow-inner transition-colors group-hover:border-[#36FFC0]/40 group-hover:bg-white dark:bg-white/90",
                  hasBrandLogo &&
                    "order-2 ml-auto h-20 w-44 border-transparent bg-transparent px-0 shadow-none group-hover:border-transparent group-hover:bg-transparent dark:bg-transparent",
                  isSesMa && "ml-auto mr-0 h-24 w-56"
                )}
              >
                {contract.brandLogo ? (
                  <img
                    src={contract.brandLogo.srcOnDark ?? contract.brandLogo.src}
                    alt={contract.brandLogo.alt}
                    className={cn(
                      "max-h-16 w-full object-contain drop-shadow-sm transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
                      isFeaturedEinstein
                        ? "scale-95 opacity-85 group-hover:scale-105 group-focus-visible:scale-105"
                        : isSesMa
                          ? "max-h-20 opacity-100"
                        : "opacity-65 grayscale saturate-50 group-hover:grayscale-0 group-hover:saturate-100 group-focus-visible:grayscale-0 group-focus-visible:saturate-100"
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
          <CardContent className="relative z-10 flex flex-1 flex-col">
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
