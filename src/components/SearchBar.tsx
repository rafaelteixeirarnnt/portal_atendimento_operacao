import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = "Buscar por contrato, serviço, sistema ou palavra-chave" }: SearchBarProps) => (
  <div className="relative">
    <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
    <Input
      aria-label="Pesquisar"
      className="h-12 pl-12 text-base shadow-sm"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      type="search"
    />
  </div>
);
