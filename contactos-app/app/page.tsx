"use client";
import { useState } from "react";
import { Contact } from "@/lib/types";
import { useContacts } from "@/hooks/useContacts";
import { StatsPanel } from "@/components/StatsPanel";
import { FilterBar } from "@/components/FilterBar";
import { ContactForm } from "@/components/ContactForm";
import { ContactTable } from "@/components/ContactTable";
import { EditModal } from "@/components/EditModal";
import { LayoutGrid, Table } from "lucide-react";
import { ContactCards } from "@/components/ContactCards";

export default function Page() {
  const [vista, setVista] = useState<"tabla" | "cards">("cards");
  const { contacts, stats, loading, error, filters, setFilters,
    sortField, sortDir, handleSort, add, edit, remove } = useContacts();
  const [editContact, setEditContact] = useState<Contact | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este contacto?")) return;
    await remove(id);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header igual que antes */}

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <StatsPanel stats={stats} />
        <ContactForm onAdd={add} />
        <FilterBar filters={filters} onChange={setFilters} total={stats.total} filtered={contacts.length} />

        {/* Selector de vista */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => setVista("cards")}
            className={`p-2 rounded-lg border transition-colors ${vista === "cards"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
              }`}
            title="Vista en cards"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setVista("tabla")}
            className={`p-2 rounded-lg border transition-colors ${vista === "tabla"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
              }`}
            title="Vista en tabla"
          >
            <Table size={18} />
          </button>
        </div>

        {/* Renderizado condicional */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-3" />
            Cargando contactos…
          </div>
        ) : vista === "tabla" ? (
          <ContactTable
            contacts={contacts}
            sortField={sortField}
            sortDir={sortDir}
            onSort={handleSort}
            onEdit={setEditContact}
            onDelete={handleDelete}
          />
        ) : (
          <ContactCards
            contacts={contacts}
            sortField={null}
            sortDir="asc"
            onSort={() => { }}
            onEdit={setEditContact}
            onDelete={handleDelete}
          />
        )}
      </div>

      <EditModal contact={editContact} onClose={() => setEditContact(null)} onSave={edit} />
    </main>
  );
}