import {
  ArrowRight,
  Bug,
  Building2,
  CalendarDays,
  ChartColumn,
  CircleHelp,
  ExternalLink,
  FolderOpen,
  GraduationCap,
  KeyRound,
  Landmark,
  MessagesSquare,
  Moon,
  Search,
  ShieldCheck,
  Sun,
  TriangleAlert,
  Users,
  Wrench
} from "lucide-react";
import type { IconMap } from "@/types/contracts";

export const iconMap: IconMap = {
  ArrowRight,
  Bug,
  Building2,
  CalendarDays,
  ChartColumn,
  CircleHelp,
  ExternalLink,
  FolderOpen,
  GraduationCap,
  KeyRound,
  Landmark,
  MessagesSquare,
  Moon,
  Search,
  ShieldCheck,
  Sun,
  TriangleAlert,
  Users,
  Wrench
};

export const getIcon = (name: string) => iconMap[name] ?? CircleHelp;
