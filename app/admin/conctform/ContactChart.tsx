import { useMemo } from "react";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface Props {
  data: ContactMessage[];
}

export default function ContactChart({ data }: Props) {
  // Agrupar por día
  const grouped = useMemo(() => {
    const map: { [date: string]: number } = {};
    data.forEach(msg => {
      const d = new Date(msg.timestamp).toISOString().slice(0, 10);
      map[d] = (map[d] || 0) + 1;
    });
    return map;
  }, [data]);

  const labels = Object.keys(grouped).sort();
  const values = labels.map(l => grouped[l]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <h2 className="text-lg font-semibold mb-2">Mensajes por día</h2>
      <div className="bg-white rounded-xl shadow p-4">
        {labels.length === 0 ? (
          <div className="text-center text-gray-400 py-8">Sin datos para graficar</div>
        ) : (
          <svg width="100%" height="180" viewBox={`0 0 400 180`}>
            {/* Ejes */}
            <line x1="40" y1="20" x2="40" y2="160" stroke="#64748b" strokeWidth="2" />
            <line x1="40" y1="160" x2="380" y2="160" stroke="#64748b" strokeWidth="2" />
            {/* Barras */}
            {values.map((v, i) => (
              <rect key={i} x={50 + i * 40} y={160 - v * 20} width="28" height={v * 20} fill="#2563eb" rx="6" />
            ))}
            {/* Etiquetas de valor */}
            {values.map((v, i) => (
              <text key={i} x={64 + i * 40} y={150 - v * 20} fontSize="13" fill="#2563eb" fontWeight="bold" textAnchor="middle">{v}</text>
            ))}
            {/* Etiquetas de fecha */}
            {labels.map((l, i) => (
              <text key={i} x={64 + i * 40} y={175} fontSize="12" fill="#334155" textAnchor="middle">{l.slice(5)}</text>
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}
