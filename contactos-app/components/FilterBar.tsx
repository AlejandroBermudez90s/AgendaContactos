"use client";
import { Search, X } from "lucide-react";
import { Filters } from "@/lib/types";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";

const AMBITOS = [
  { value: "", label: "Todos los ámbitos" },
  { value: "Nacional", label: "Nacional" },
  { value: "Regional", label: "Regional" },
  { value: "Local", label: "Local" },
  { value: "Centro educativo", label: "Centro educativo" },
  { value: "Internacional", label: "Internacional" },
];

const RESPUESTAS = [
  { value: "", label: "Todas las respuestas" },
  { value: "Sí", label: "Sí" },
  { value: "No", label: "No" },
  { value: "Pendiente", label: "Pendiente" },
];

const POSITIVAS = [
  { value: "", label: "Info útil: todas" },
  { value: "Sí", label: "Sí" },
  { value: "No", label: "No" },
];

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  total: number;
  filtered: number;
}

export function FilterBar({ filters, onChange, total, filtered }: Props) {
  const hasFilters = Object.values(filters).some(Boolean);
  const set = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });
  const clear = () => onChange({ search: "", ambito: "", respuesta: "", positiva: "" });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={15} />
          <input
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
            placeholder="Buscar nombre, cargo, correo…"
            value={filters.search}
            onChange={e => set("search", e.target.value)}
          />
        </div>
        <Select options={AMBITOS} value={filters.ambito} onChange={e => set("ambito", e.target.value)} />
        <Select options={RESPUESTAS} value={filters.respuesta} onChange={e => set("respuesta", e.target.value)} />
        <Select options={POSITIVAS} value={filters.positiva} onChange={e => set("positiva", e.target.value)} />
      </div>
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-gray-500">
          Mostrando <span className="font-semibold text-blue-600">{filtered}</span> de <span className="font-semibold">{total}</span> contactos
        </p>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clear}>
            <X size={13} /> Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
}