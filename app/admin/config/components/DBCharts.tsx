import { Bar, Doughnut } from "react-chartjs-2";
import { TranslateText } from "@/components/TranslateText";

interface CollectionStats {
  name: string;
  count: number;
  size: number;
}

interface DBChartsProps {
  theme: "light" | "dark";
  collections: CollectionStats[];
  chartColors: string[];
}

export function DBCharts({ theme, collections, chartColors }: DBChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
      {/* Gráfica de Documentos por Colección */}
      <div className={`rounded-2xl p-5 border lg:col-span-2 ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
        <h2 className={`text-sm font-medium mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <TranslateText text="Documentos por Colección" />
        </h2>
        {collections.length ? (
          <div className="h-64">
            <Bar
              data={{
                labels: collections.map((c) => c.name),
                datasets: [
                  {
                    label: "Documentos",
                    data: collections.map((c) => c.count),
                    backgroundColor: chartColors.slice(0, collections.length),
                    borderRadius: 4,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: {
                    ticks: { color: theme === "dark" ? "#9ca3af" : "#4b5563", font: { size: 10 } },
                    grid: { display: false },
                  },
                  y: {
                    ticks: { color: theme === "dark" ? "#9ca3af" : "#4b5563" },
                    grid: { color: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" },
                  },
                },
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <TranslateText text="No hay datos disponibles" />
          </div>
        )}
      </div>
      {/* Gráfica Doughnut - Distribución de Tamaño */}
      <div className={`rounded-2xl p-5 border ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
        <h2 className={`text-sm font-medium mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <TranslateText text="Distribución de Tamaño" />
        </h2>
        {collections.length ? (
          <div className="h-64 flex items-center justify-center">
            <Doughnut
              data={{
                labels: collections.map((c) => c.name),
                datasets: [
                  {
                    data: collections.map((c) => c.size),
                    backgroundColor: chartColors.slice(0, collections.length),
                    borderWidth: 0,
                    hoverOffset: 4,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: "60%",
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: theme === "dark" ? "#9ca3af" : "#4b5563",
                      padding: 12,
                      font: { size: 10 },
                    },
                  },
                },
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <TranslateText text="No hay datos disponibles" />
          </div>
        )}
      </div>
    </div>
  );
}
