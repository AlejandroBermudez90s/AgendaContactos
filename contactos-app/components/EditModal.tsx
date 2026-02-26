"use client";
import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import { Contact } from "@/lib/types";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";

const AMBITOS = ["", "Nacional", "Regional", "Local", "Centro educativo", "Internacional"].map(v => ({ value: v, label: v || "Ámbito" }));
const MEDIOS  = ["", "Correo", "Teléfono", "Formulario en su página web"].map(v => ({ value: v, label: v || "Medio de contacto" }));
const RESPUESTAS = ["", "Sí", "No", "Pendiente"].map(v => ({ value: v, label: v || "¿Se obtuvo respuesta?" }));
const POSITIVAS  = ["", "Sí", "No"].map(v => ({ value: v, label: v || "¿Info útil?" }));

interface Props {
  contact: Contact | null;
  onClose: () => void;
  onSave: (id: string, data: Omit<Contact, "id">) => Promise<void>;
}

export function EditModal({ contact, onClose, onSave }: Props) {
  const [form, setForm] = useState<Omit<Contact, "id">>({
    "Ámbito": "", Nombre: "", Cargo: "", "Dirección": "", Web: "",
    "Teléfono": "", Correo: "", Medio: "", Respuesta: "", Positiva: "", Detalle: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contact) {
      const { id, ...rest } = contact;
      setForm(rest);
    }
  }, [contact]);

  if (!contact) return null;

  const set = (key: keyof typeof form, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setLoading(true);
    try { await onSave(contact.id, form); onClose(); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-800">Editar contacto</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={22} /></button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Ámbito" options={AMBITOS} value={form["Ámbito"]} onChange={e => set("Ámbito", e.target.value)} />
          <Input label="Nombre" value={form.Nombre} onChange={e => set("Nombre", e.target.value)} />
          <Input label="Cargo / Institución" value={form.Cargo} onChange={e => set("Cargo", e.target.value)} />
          <Input label="Dirección" value={form["Dirección"]} onChange={e => set("Dirección", e.target.value)} />
          <Input label="Página web" value={form.Web} onChange={e => set("Web", e.target.value)} />
          <Input label="Teléfono" value={form["Teléfono"]} onChange={e => set("Teléfono", e.target.value)} />
          <Input label="Correo" type="email" value={form.Correo} onChange={e => set("Correo", e.target.value)} />
          <Select label="Medio de contacto" options={MEDIOS} value={form.Medio} onChange={e => set("Medio", e.target.value)} />
          <Select label="¿Se obtuvo respuesta?" options={RESPUESTAS} value={form.Respuesta} onChange={e => set("Respuesta", e.target.value)} />
          <Select label="¿Info útil obtenida?" options={POSITIVAS} value={form.Positiva} onChange={e => set("Positiva", e.target.value)} />
          <div className="md:col-span-2">
            <Input label="Detalles de la respuesta" value={form.Detalle} onChange={e => set("Detalle", e.target.value)} />
          </div>
        </div>

        <div className="px-6 pb-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={loading}>
            <Save size={15} /> {loading ? "Guardando…" : "Guardar cambios"}
          </Button>
        </div>
      </div>
    </div>
  );
}