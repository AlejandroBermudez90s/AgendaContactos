import { Contact } from "./types";

const API_URL = process.env.NEXT_PUBLIC_SHEETDB_URL!;

export async function getContacts(): Promise<Contact[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al cargar contactos");
  return res.json();
}

export async function createContact(contact: Omit<Contact, "id">): Promise<void> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { ...contact, id: Date.now().toString() } }),
  });
  if (!res.ok) throw new Error("Error al crear contacto");
}

export async function updateContact(id: string, contact: Omit<Contact, "id">): Promise<void> {
  const res = await fetch(`${API_URL}/id/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: contact }),
  });
  if (!res.ok) throw new Error("Error al actualizar contacto");
}

export async function deleteContact(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/id/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar contacto");
}