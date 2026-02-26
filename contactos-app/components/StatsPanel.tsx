import { Users, CheckCircle, XCircle, Clock, ThumbsUp } from "lucide-react";

interface Stats {
  total: number;
  conRespuesta: number;
  sinRespuesta: number;
  pendiente: number;
  utiles: number;
  porAmbito: Record<string, number>;
}

export function StatsPanel({ stats }: { stats: Stats }) {
  const cards = [
    { label: "Total contactos", value: stats.total, icon: Users, color: "bg-blue-600" },
    { label: "Con respuesta", value: stats.conRespuesta, icon: CheckCircle, color: "bg-emerald-500" },
    { label: "Sin respuesta", value: stats.sinRespuesta, icon: XCircle, color: "bg-red-500" },
    { label: "Pendientes", value: stats.pendiente, icon: Clock, color: "bg-amber-500" },
    { label: "Info útil obtenida", value: stats.utiles, icon: ThumbsUp, color: "bg-indigo-500" },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Resumen</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
            <div className={`${color} text-white rounded-lg p-2`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {Object.keys(stats.porAmbito).length > 0 && (
        <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Por ámbito</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.porAmbito).map(([ambito, count]) => (
              <span key={ambito} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                {ambito} <span className="bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}