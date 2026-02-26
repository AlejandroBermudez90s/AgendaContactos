"use client";
import { useState } from "react";
import { Contact } from "@/lib/types";
import { useContacts } from "@/hooks/useContacts";
import { StatsPanel } from "@/components/StatsPanel";
import { FilterBar } from "@/components/FilterBar";
import { ContactForm } from "@/components/ContactForm";
import { ContactTable } from "@/components/ContactTable";
import { EditModal } from "@/components/EditModal";

export default function Page() {
  const { contacts, stats, loading, error, filters, setFilters,
          sortField, sortDir, handleSort, add, edit, remove } = useContacts();
  const [editContact, setEditContact] = useState<Contact | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este contacto?")) return;
    await remove(id);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-screen-xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Gestión de Contactos</h1>
            <p className="text-blue-200 text-sm mt-0.5">Registro y seguimiento de contactos institucionales</p>
          </div>
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full border border-blue-500">
            {stats.total} contactos
          </span>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
            ⚠️ {error}
          </div>
        )}

        <StatsPanel stats={stats} />
        <ContactForm onAdd={add} />
        <FilterBar filters={filters} onChange={setFilters} total={stats.total} filtered={contacts.length} />

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-3" />
            Cargando contactos…
          </div>
        ) : (
          <ContactTable
            contacts={contacts}
            sortField={sortField}
            sortDir={sortDir}
            onSort={handleSort}
            onEdit={setEditContact}
            onDelete={handleDelete}
          />
        )}
      </div>

      <EditModal contact={editContact} onClose={() => setEditContact(null)} onSave={edit} />
    </main>
  );
}