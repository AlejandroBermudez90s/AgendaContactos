export interface Contact {
  id: string;
  "Ámbito": string;
  Nombre: string;
  Cargo: string;
  "Dirección": string;
  Web: string;
  "Teléfono": string;
  Correo: string;
  Medio: string;
  Respuesta: string;
  Positiva: string;
  Detalle: string;
}

export type SortField = keyof Contact | null;
export type SortDirection = "asc" | "desc";

export interface Filters {
  search: string;
  ambito: string;
  respuesta: string;
  positiva: string;
}