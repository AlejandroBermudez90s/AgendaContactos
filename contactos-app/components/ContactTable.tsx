"use client";
import { ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2, ExternalLink } from "lucide-react";
import { Contact, SortField, SortDirection } from "@/lib/types";
import { Button } from "./ui/Button";

const BADGE: Record<string, string> = {
  "Sí":        "bg-emerald-100 text-emerald-700",
  "No":        "bg-red-100 text-red-600",
  "Pendiente": "bg-amber-100 text-amber-700",
};

interface Props {
  contacts: Contact[];
  sortField: SortField;
  sortDir: SortDirection;
  onSort: (f: SortField) => void;
  onEdit: (c: Contact) => void;
  onDelete: (id: string) => void;
  authenticated: boolean;
}

function SortIcon({ field, active, dir }: { field: string; active: boolean; dir: SortDirection }) {
  if (!active) return <ArrowUpDown size={12} className="text-gray-300" />;
  return dir === "asc"
    ? <ArrowUp size={12} className="text-blue-500" />
    : <ArrowDown size={12} className="text-blue-500" />;
}

const COLS: { key: keyof Contact; label: string }[] = [
  { key: "Nombre",    label: "Nombre"             },
  { key: "Ámbito",   label: "Ámbito"              },
  { key: "Cargo",    label: "Cargo / Institución" },
  { key: "Correo",   label: "Correo"              },
  { key: "Teléfono", label: "Teléfono"            },
  { key: "Medio",    label: "Medio"               },
  { key: "Respuesta",label: "Respuesta"           },
  { key: "Positiva", label: "Info útil"           },
];

export function ContactTable({ contacts, sortField, sortDir, onSort, onEdit, onDelete, authenticated }: Props) {
  if (contacts.length === 0)
    return (
      <div className="text-center py-20 text-gray-400">
        No se encontraron contactos con los filtros actuales.
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-xs table-fixed">
        <colgroup>
          {authenticated && <col className="w-20" />}  {/* Acciones */}
          <col className="w-32" />                      {/* Nombre */}
          <col className="w-24" />                      {/* Ámbito */}
          <col className="w-36" />                      {/* Cargo */}
          <col className="w-40" />                      {/* Correo */}
          <col className="w-28" />                      {/* Teléfono */}
          <col className="w-28" />                      {/* Medio */}
          <col className="w-24" />                      {/* Respuesta */}
          <col className="w-20" />                      {/* Info útil */}
        </colgroup>
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {authenticated && (
              <th className="px-2 py-2 text-left font-semibold text-gray-600">
                Acciones
              </th>
            )}
            {COLS.map(({ key, label }) => (
              <th
                key={key}
                className="px-2 py-2 text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors select-none"
                onClick={() => onSort(key)}
              >
                <span className="flex items-center gap-1">
                  {label}
                  <SortIcon field={key} active={sortField === key} dir={sortDir} />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {contacts.map(c => (
            <tr key={c.id} className="hover:bg-blue-50/30 transition-colors align-top">
              {authenticated && (
                <td className="px-2 py-2">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(c)}>
                      <Pencil size={12} />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => onDelete(c.id)}>
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </td>
              )}
              <td className="px-2 py-2 font-medium text-gray-900 break-words">
                {c.Nombre || "—"}
              </td>
              <td className="px-2 py-2">
                <span className="bg-blue-100 text-blue-700 font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  {c["Ámbito"] || "—"}
                </span>
              </td>
              <td className="px-2 py-2 text-gray-600 break-words">
                {c.Cargo || "—"}
              </td>
              <td className="px-2 py-2 break-all">
                {c.Correo
                  ? <a href={`mailto:${c.Correo}`} className="text-blue-600 hover:underline flex items-center gap-1">
                      <span>{c.Correo}</span>
                      <ExternalLink size={10} className="shrink-0" />
                    </a>
                  : "—"}
              </td>
              <td className="px-2 py-2 text-gray-600 whitespace-nowrap">
                {c["Teléfono"] || "—"}
              </td>
              <td className="px-2 py-2 text-gray-600 break-words">
                {c.Medio || "—"}
              </td>
              <td className="px-2 py-2">
                <span className={`font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${BADGE[c.Respuesta] || "bg-gray-100 text-gray-600"}`}>
                  {c.Respuesta || "—"}
                </span>
              </td>
              <td className="px-2 py-2">
                <span className={`font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${BADGE[c.Positiva] || "bg-gray-100 text-gray-600"}`}>
                  {c.Positiva || "—"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}