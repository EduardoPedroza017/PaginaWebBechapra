import React from "react";
import { PressItem } from "./page";

interface PressChartProps {
  data: PressItem[];
}

export default function PressChart({ data }: PressChartProps) {
  // Agrupar por mes
  const counts: Record<string, number> = {};
  data.forEach((item) => {
    const d = new Date(item.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    counts[key] = (counts[key] || 0) + 1;
  });
  const sortedKeys = Object.keys(counts).sort();

  return (
    <div className="bg-white dark:bg-[#232733] rounded-xl shadow p-4 mb-4">
      <h3 className="font-bold text-[#003d8f] dark:text-white mb-2">Comunicados por mes</h3>
      <svg width="100%" height="120" viewBox={`0 0 ${sortedKeys.length * 60} 120`} style={{maxWidth: 600}}>
        {sortedKeys.map((key, i) => (
          <g key={key}>
            <rect
              x={i * 60 + 10}
              y={120 - counts[key] * 20 - 30}
              width={40}
              height={counts[key] * 20}
              fill="#003d8f"
              rx={8}
            />
            <text
              x={i * 60 + 30}
              y={110}
              textAnchor="middle"
              fontSize={13}
              fill="#003d8f"
            >
              {key}
            </text>
            <text
              x={i * 60 + 30}
              y={120 - counts[key] * 20 - 38}
              textAnchor="middle"
              fontSize={14}
              fill="#003d8f"
              fontWeight={700}
            >
              {counts[key]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
