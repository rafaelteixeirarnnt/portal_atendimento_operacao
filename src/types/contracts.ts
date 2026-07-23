import type { LucideIcon } from "lucide-react";

export type ThemePreference = "light" | "dark" | "system";

export interface GuidanceItem {
  id: string;
  label: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  url?: string;
  keywords: string[];
  system?: string;
  requiresGuidance?: boolean;
  guidanceItems?: GuidanceItem[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  services: Service[];
}

export interface Contract {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  system?: string;
  categories: Category[];
}

export interface ServiceSearchResult {
  contract: Contract;
  category: Category;
  service: Service;
}

export interface ContractSearchResult {
  contract: Contract;
  matchedServices: ServiceSearchResult[];
}

export interface RecentService {
  contractId: string;
  serviceId: string;
  usedAt: string;
}

export interface LocalPreferences {
  theme: ThemePreference;
  lastContractId?: string;
  recentServices: RecentService[];
}

export type IconMap = Record<string, LucideIcon>;
