"use client";
import { useState, useEffect, useMemo } from "react";
import { Contact, Filters, SortField, SortDirection } from "@/lib/types";
import { getContacts, createContact, updateContact, deleteContact } from "@/lib/api";

const EMPTY_FILTERS: Filters = { search: "", ambito: "", respuesta: "", positiva: "" };

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      setContacts(await getContacts());
    } catch {
      setError("No se pudieron cargar los contactos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const filtered = useMemo(() => {
    let data = [...contacts];
    const s = filters.search.toLowerCase();
    if (s) data = data.filter(c =>
      c.Nombre.toLowerCase().includes(s) ||
      c.Cargo.toLowerCase().includes(s) ||
      c.Correo.toLowerCase().includes(s)
    );
    if (filters.ambito) data = data.filter(c => c["Ámbito"] === filters.ambito);
    if (filters.respuesta) data = data.filter(c => c.Respuesta === filters.respuesta);
    if (filters.positiva) data = data.filter(c => c.Positiva === filters.positiva);
    if (sortField) {
      data.sort((a, b) => {
        const av = a[sortField] ?? "";
        const bv = b[sortField] ?? "";
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return data;
  }, [contacts, filters, sortField, sortDir]);

  const stats = useMemo(() => ({
    total: contacts.length,
    conRespuesta: contacts.filter(c => c.Respuesta === "Sí").length,
    sinRespuesta: contacts.filter(c => c.Respuesta === "No").length,
    pendiente: contacts.filter(c => c.Respuesta === "Pendiente").length,
    utiles: contacts.filter(c => c.Positiva === "Sí").length,
    porAmbito: contacts.reduce<Record<string, number>>((acc, c) => {
      const a = c["Ámbito"] || "Sin ámbito";
      acc[a] = (acc[a] || 0) + 1;
      return acc;
    }, {}),
  }), [contacts]);

  const add = async (contact: Omit<Contact, "id">) => {
    await createContact(contact);
    await load();
  };

  const edit = async (id: string, contact: Omit<Contact, "id">) => {
    await updateContact(id, contact);
    await load();
  };

  const remove = async (id: string) => {
    await deleteContact(id);
    await load();
  };

  return {
    contacts: filtered, stats, loading, error, filters, setFilters,
    sortField, sortDir, handleSort, add, edit, remove
  };
}