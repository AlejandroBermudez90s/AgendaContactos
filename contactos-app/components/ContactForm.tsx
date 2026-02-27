"use client";
import { useState } from "react";
import { PlusCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Contact } from "@/lib/types";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";

const EMPTY: Omit<Contact, "id"> = {
  "Ámbito": "", Nombre: "", Cargo: "", "Dirección": "", Web: "",
  "Teléfono": "", Correo: "", Medio: "", Respuesta: "", Positiva: "", Detalle: "",
};

const AMBITOS = ["", "Nacional", "Regional", "Local", "Centro educativo", "Internacional"].map(v => ({ value: v, label: v || "Ámbito" }));
const MEDIOS = ["", "Correo", "Teléfono", "Correo y Teléfono", "Formulario en su página web"].map(v => ({ value: v, label: v || "Medio de contacto" }));
const RESPUESTAS = ["", "Sí", "No", "Pendiente"].map(v => ({ value: v, label: v || "¿Se obtuvo respuesta?" }));
const POSITIVAS = ["", "Sí", "No"].map(v => ({ value: v, label: v || "¿Info útil?" }));

export function ContactForm({ onAdd }: { onAdd: (c: Omit<Contact, "id">) => Promise<void> }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const set = (key: keyof typeof EMPTY, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = async () => {
    if (!form.Nombre.trim()) return alert("El nombre es obligatorio.");
    setLoading(true);
    try {
      await onAdd(form);
      setForm(EMPTY);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 flex items-center gap-2">
          <PlusCircle size={18} className="text-blue-600" /> Añadir nuevo contacto
        </span>
        {open ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            <Select label="Ámbito" options={AMBITOS} value={form["Ámbito"]} onChange={e => set("Ámbito", e.target.value)} />
            <Input label="Nombre *" placeholder="Nombre completo" value={form.Nombre} onChange={e => set("Nombre", e.target.value)} />
            <Input label="Cargo / Institución" placeholder="Cargo o institución" value={form.Cargo} onChange={e => set("Cargo", e.target.value)} />
            <Input label="Dirección" placeholder="Dirección postal" value={form["Dirección"]} onChange={e => set("Dirección", e.target.value)} />
            <Input label="Página web" placeholder="https://..." value={form.Web} onChange={e => set("Web", e.target.value)} />
            <Input label="Teléfono" placeholder="+34 000 000 000" value={form["Teléfono"]} onChange={e => set("Teléfono", e.target.value)} />
            <Input label="Correo electrónico" type="email" placeholder="email@ejemplo.com" value={form.Correo} onChange={e => set("Correo", e.target.value)} />
            <Select label="Medio de contacto" options={MEDIOS} value={form.Medio} onChange={e => set("Medio", e.target.value)} />
            <Select label="¿Se obtuvo respuesta?" options={RESPUESTAS} value={form.Respuesta} onChange={e => set("Respuesta", e.target.value)} />
            <Select label="¿Info útil obtenida?" options={POSITIVAS} value={form.Positiva} onChange={e => set("Positiva", e.target.value)} />
            <div className="md:col-span-2">
              <Input label="Detalles de la respuesta" placeholder="Escribe aquí los detalles…" value={form.Detalle} onChange={e => set("Detalle", e.target.value)} />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button onClick={handleSubmit} disabled={loading}>
              <PlusCircle size={15} /> {loading ? "Guardando…" : "Añadir contacto"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}