"use client";
import { useState } from "react";
import { Lock, Unlock, Eye, EyeOff, X } from "lucide-react";
import { Button } from "./ui/Button";

interface Props {
  authenticated: boolean;
  onLogin: (password: string) => boolean;
  onLogout: () => void;
}

export function AuthButton({ authenticated, onLogin, onLogout }: Props) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = () => {
    const ok = onLogin(password);
    if (ok) {
      setOpen(false);
      setPassword("");
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authenticated) {
    return (
      <button
        onClick={onLogout}
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        <Unlock size={15} />
        Sesión activa
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/30"
      >
        <Lock size={15} />
        Acceder
      </button>

      {/* Modal de contraseña */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
                  <Lock size={18} />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Acceso restringido</h2>
              </div>
              <button onClick={() => { setOpen(false); setPassword(""); setError(false); }} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Introduce la contraseña para poder añadir, editar o eliminar contactos.
            </p>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                className={`w-full px-3 py-2.5 pr-10 border rounded-lg text-sm outline-none transition-colors text-gray-900
                  ${error
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-500 mt-1.5">Contraseña incorrecta. Inténtalo de nuevo.</p>
            )}

            <div className="flex gap-2 mt-5">
              <Button variant="ghost" className="flex-1" onClick={() => { setOpen(false); setPassword(""); setError(false); }}>
                Cancelar
              </Button>
              <Button className="flex-1" onClick={handleLogin}>
                Entrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}