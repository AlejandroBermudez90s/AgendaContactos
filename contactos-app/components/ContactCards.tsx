"use client";
import { Mail, Phone, Globe, MapPin, Pencil, Trash2 } from "lucide-react";
import { Contact, SortField, SortDirection } from "@/lib/types";
import { Button } from "./ui/Button";

const BADGE_RESPUESTA: Record<string, string> = {
  "Sí":        "bg-emerald-100 text-emerald-700",
  "No":        "bg-red-100 text-red-600",
  "Pendiente": "bg-amber-100 text-amber-700",
};

const BADGE_UTIL: Record<string, string> = {
  "Sí": "bg-indigo-100 text-indigo-700",
  "No": "bg-gray-100 text-gray-500",
};

const AMBITO_COLOR: Record<string, string> = {
  "Nacional":         "bg-blue-600",
  "Regional":         "bg-violet-500",
  "Local":            "bg-cyan-500",
  "Centro educativo": "bg-orange-500",
  "Internacional":    "bg-rose-500",
};

interface Props {
  contacts: Contact[];
  sortField: SortField;
  sortDir: SortDirection;
  onSort: (f: SortField) => void;
  onEdit: (c: Contact) => void;
  onDelete: (id: string) => void;
}

export function ContactCards({ contacts, onEdit, onDelete }: Props) {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        No se encontraron contactos con los filtros actuales.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {contacts.map(c => (
        <div
          key={c.id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
        >
          {/* Cabecera de color según ámbito */}
          <div className={`${AMBITO_COLOR[c["Ámbito"]] ?? "bg-blue-600"} px-5 py-4`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">
                  {c.Nombre || "Sin nombre"}
                </h3>
                {c.Cargo && (
                  <p className="text-white/80 text-sm mt-0.5">{c.Cargo}</p>
                )}
              </div>
              <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                {c["Ámbito"] || "—"}
              </span>
            </div>
          </div>

          {/* Cuerpo */}
          <div className="px-5 py-4 flex flex-col gap-2.5 flex-1">

            {c.Correo && (
              
              <a  href={`mailto:${c.Correo}`}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <Mail size={14} className="shrink-0" />
                <span className="truncate">{c.Correo}</span>
              </a>
            )}

            {c["Teléfono"] && (
              
              <a  href={`tel:${c["Teléfono"]}`}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Phone size={14} className="shrink-0" />
                {c["Teléfono"]}
              </a>
            )}

            {c.Web && (
              
              <a  href={c.Web.startsWith("http") ? c.Web : `https://${c.Web}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Globe size={14} className="shrink-0" />
                <span className="truncate">{c.Web}</span>
              </a>
            )}

            {c["Dirección"] && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} className="shrink-0" />
                {c["Dirección"]}
              </div>
            )}

            {/* Badges */}
            <div className="border-t border-gray-100 mt-1 pt-3 flex flex-wrap gap-2">
              {c.Medio && (
                <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                  📨 {c.Medio}
                </span>
              )}
              {c.Respuesta && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${BADGE_RESPUESTA[c.Respuesta] ?? "bg-gray-100 text-gray-600"}`}>
                  Respuesta: {c.Respuesta}
                </span>
              )}
              {c.Positiva && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${BADGE_UTIL[c.Positiva] ?? "bg-gray-100 text-gray-600"}`}>
                  Info útil: {c.Positiva}
                </span>
              )}
            </div>

            {c.Detalle && (
              <p className="text-xs text-gray-500 italic border-l-2 border-blue-200 pl-3">
                {c.Detalle}
              </p>
            )}
          </div>

          {/* Pie con acciones */}
          <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-2 bg-gray-50/50">
            <Button variant="ghost" size="sm" onClick={() => onEdit(c)}>
              <Pencil size={13} /> Editar
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(c.id)}>
              <Trash2 size={13} /> Eliminar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}