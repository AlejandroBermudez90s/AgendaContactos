# 📋 Gestión de Contactos

Aplicación web para el registro y seguimiento de contactos institucionales en el contexto de proyectos de investigación educativa. Permite gestionar contactos de distintos ámbitos (nacional, regional, local, etc.), registrar el resultado de cada contacto y filtrar la información de forma eficiente.

---

## 🚀 Tecnologías utilizadas

- **[Next.js 14](https://nextjs.org/)** — Framework de React con App Router
- **[TypeScript](https://www.typescriptlang.org/)** — Tipado estático
- **[Tailwind CSS v3](https://tailwindcss.com/)** — Estilos utilitarios
- **[Lucide React](https://lucide.dev/)** — Iconos
- **[SheetDB](https://sheetdb.io/)** — API REST sobre Google Sheets (base de datos)
- **[Vercel](https://vercel.com/)** — Despliegue

---

## ✨ Funcionalidades

- 📊 **Dashboard de estadísticas** — total de contactos, con/sin respuesta, pendientes e información útil obtenida
- ➕ **Añadir contactos** — formulario colapsable con todos los campos necesarios
- ✏️ **Editar contactos** — modal de edición
- 🗑️ **Eliminar contactos** — con confirmación previa
- 🔍 **Búsqueda y filtros** — por nombre, cargo, correo, ámbito, respuesta e información útil
- 🔃 **Ordenación por columnas** — en la vista de tabla
- 🃏 **Dos vistas** — tabla o tarjetas (cards), alternables con un botón
- 🔒 **Autenticación por contraseña** — solo los usuarios autorizados pueden añadir, editar o eliminar
- 🎨 **Leyenda de colores** — en la vista de cards, cada ámbito tiene un color identificativo

---

## 📁 Estructura del proyecto

```
contactos-app/
├── app/
│   ├── layout.tsx          # Layout global
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales (Tailwind)
├── components/
│   ├── AuthButton.tsx      # Botón de autenticación con modal
│   ├── ContactCards.tsx    # Vista en tarjetas
│   ├── ContactForm.tsx     # Formulario de añadir contacto
│   ├── ContactTable.tsx    # Vista en tabla con ordenación
│   ├── EditModal.tsx       # Modal de edición
│   ├── FilterBar.tsx       # Barra de búsqueda y filtros
│   ├── StatsPanel.tsx      # Panel de estadísticas
│   └── ui/
│       ├── Button.tsx      # Botón reutilizable
│       ├── Input.tsx       # Input reutilizable
│       └── Select.tsx      # Select reutilizable
├── hooks/
│   ├── useAuth.ts          # Lógica de autenticación
│   └── useContacts.ts      # Lógica de contactos (CRUD, filtros, ordenación)
├── lib/
│   ├── api.ts              # Cliente de la API SheetDB
│   └── types.ts            # Tipos TypeScript
├── .env.local              # Variables de entorno (no se sube a Git)
└── README.md
```

---

## ⚙️ Instalación y uso local

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/contactos-app.git
cd contactos-app
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SHEETDB_URL=https://sheetdb.io/api/v1/tu_id_aqui
NEXT_PUBLIC_APP_PASSWORD=tu_contraseña_aqui
```

### 4. Inicia el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🗄️ Configuración de la base de datos (SheetDB)

Este proyecto utiliza [SheetDB](https://sheetdb.io/) como capa API sobre una hoja de Google Sheets. La hoja debe tener las siguientes columnas en la primera fila:

| id | Ámbito | Nombre | Cargo | Dirección | Web | Teléfono | Correo | Medio | Respuesta | Positiva | Detalle |
|----|--------|--------|-------|-----------|-----|----------|--------|-------|-----------|----------|---------|

> ⚠️ Los nombres de las columnas deben ser exactamente esos, respetando mayúsculas y tildes.

---

## 🔒 Sistema de autenticación

La autenticación es mediante contraseña simple almacenada como variable de entorno. Al introducir la contraseña correcta:

- Se muestra el formulario para añadir contactos
- Se muestran los botones de editar y eliminar en cada contacto
- La sesión se mantiene activa mientras el navegador esté abierto (via `sessionStorage`)
- Al cerrar el navegador o la pestaña, la sesión se cierra automáticamente

> ⚠️ Al usar `NEXT_PUBLIC_`, la contraseña es visible en el bundle del cliente. Es suficiente para un uso interno informal, pero no se recomienda para aplicaciones con datos sensibles.

---

## 🌐 Despliegue en Vercel

### 1. Sube el proyecto a GitHub

```bash
git init
git add .
git commit -m "init: contactos-app"
git remote add origin https://github.com/tu-usuario/contactos-app.git
git push -u origin main
```

### 2. Importa el proyecto en Vercel

1. Entra en [vercel.com](https://vercel.com) y haz clic en **New Project**
2. Importa el repositorio de GitHub
3. En **Environment Variables** añade:
   - `NEXT_PUBLIC_SHEETDB_URL`
   - `NEXT_PUBLIC_APP_PASSWORD`
4. Haz clic en **Deploy**

> Tras cualquier cambio en las variables de entorno, ve a **Deployments → ⋯ → Redeploy** para que los cambios surtan efecto.

---

## 🎨 Colores por ámbito

| Ámbito | Color |
|--------|-------|
| Nacional | Azul (`blue-700`) |
| Regional | Verde azulado (`teal-600`) |
| Local | Gris pizarra (`slate-600`) |
| Centro educativo | Índigo (`indigo-600`) |
| Internacional | Cian oscuro (`cyan-700`) |

---

## 📄 Licencia

Proyecto de uso interno para investigación educativa.
