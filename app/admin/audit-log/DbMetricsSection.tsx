"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "./MetricCard";
import { Doughnut, Bar } from "react-chartjs-2";
import { TranslateText } from "@/components/TranslateText";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface DbMetrics {
  total_documents: number;
  collections: {
    [key: string]: {
      count: number;
      size_bytes: number;
    };
  };
  total_size_mb: number;
  avg_doc_size_kb: number;
}

interface DbMetricsSectionProps {
  theme: 'light' | 'dark';
}

export function DbMetricsSection({ theme }: DbMetricsSectionProps) {
  const [dbMetrics, setDbMetrics] = useState<DbMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDbMetrics = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/db/metrics", {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setDbMetrics(data);
        } else {
          setError("Error al cargar métricas de la base de datos");
        }
      } catch {
        setError("No se pudo conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };
    fetchDbMetrics();
  }, []);

  if (loading) {
    return (
      <div className={`rounded-2xl p-8 border text-center ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="animate-pulse">
          <div className={`h-4 w-48 mx-auto rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
      </div>
    );
  }

  if (error || !dbMetrics) {
    return (
      <div className={`rounded-2xl p-8 border text-center ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <p className="text-red-500">{error || "Error desconocido"}</p>
      </div>
    );
  }

  const textColor = theme === 'dark' ? '#e5e7eb' : '#374151';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';

  // Colores para las colecciones
  const collectionColors = [
    'rgba(59, 130, 246, 0.8)',   // blue
    'rgba(16, 185, 129, 0.8)',   // green
    'rgba(245, 158, 11, 0.8)',   // amber
    'rgba(139, 92, 246, 0.8)',   // violet
    'rgba(236, 72, 153, 0.8)',   // pink
    'rgba(6, 182, 212, 0.8)',    // cyan
    'rgba(249, 115, 22, 0.8)',   // orange
  ];

  // Valores seguros con fallbacks
  const totalDocs = dbMetrics.total_documents ?? 0;
  const totalSizeMb = dbMetrics.total_size_mb ?? 0;
  const avgDocSizeKb = dbMetrics.avg_doc_size_kb ?? 0;
  const collections = dbMetrics.collections ?? {};

  const collectionNames = Object.keys(collections);
  const collectionCounts = collectionNames.map(c => collections[c]?.count ?? 0);
  const collectionSizes = collectionNames.map(c => (collections[c]?.size_bytes ?? 0) / 1024);

  // Datos para gráfica Doughnut
  const doughnutData = {
    labels: collectionNames,
    datasets: [{
      data: collectionCounts,
      backgroundColor: collectionColors.slice(0, collectionNames.length),
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  // Datos para gráfica de barras (tamaño)
  const barData = {
    labels: collectionNames,
    datasets: [{
      label: "Tamaño (KB)",
      data: collectionSizes,
      backgroundColor: collectionColors.slice(0, collectionNames.length),
      borderRadius: 4,
    }]
  };

  return (
    <div className="space-y-5">
      <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <TranslateText text="Métricas de Base de Datos" />
      </h2>
      
      {/* Tarjetas de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon="📊"
          title="Total Documentos"
          value={totalDocs.toLocaleString()}
          color="blue"
          theme={theme}
        />
        <MetricCard
          icon="📁"
          title="Colecciones"
          value={collectionNames.length.toString()}
          color="green"
          theme={theme}
        />
        <MetricCard
          icon="💾"
          title="Tamaño Total"
          value={`${totalSizeMb.toFixed(2)} MB`}
          color="purple"
          theme={theme}
        />
        <MetricCard
          icon="📄"
          title="Tamaño Prom. Doc"
          value={`${avgDocSizeKb.toFixed(2)} KB`}
          color="amber"
          theme={theme}
        />
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Doughnut - Documentos por colección */}
        <div className={`rounded-2xl shadow-sm p-5 border ${
          theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            <TranslateText text="Documentos por Colección" />
          </h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                  legend: {
                    position: 'right',
                    labels: { color: textColor, padding: 12, font: { size: 11 } }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Bar - Tamaño por colección */}
        <div className={`rounded-2xl shadow-sm p-5 border ${
          theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            <TranslateText text="Tamaño por Colección (KB)" />
          </h3>
          <div className="h-64">
            <Bar 
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                  x: { 
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                  },
                  y: { 
                    ticks: { color: textColor },
                    grid: { display: false }
                  }
                },
                plugins: {
                  legend: { display: false }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Tabla detallada de colecciones */}
      <div className={`rounded-2xl shadow-sm overflow-hidden border ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            <TranslateText text="Detalle de Colecciones" />
          </h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Colección" />
              </th>
              <th className={`px-5 py-3 text-right text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Documentos" />
              </th>
              <th className={`px-5 py-3 text-right text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Tamaño" />
              </th>
              <th className={`px-5 py-3 text-right text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="% del Total" />
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {collectionNames.map((name, i) => {
              const col = collections[name] ?? { count: 0, size_bytes: 0 };
              const percentage = totalDocs > 0 ? ((col.count / totalDocs) * 100).toFixed(1) : '0.0';
              return (
                <tr key={name} className={`transition-colors ${theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                  <td className={`px-5 py-3 whitespace-nowrap text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: collectionColors[i] }}></span>
                    {name}
                  </td>
                  <td className={`px-5 py-3 whitespace-nowrap text-sm text-right ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {col.count.toLocaleString()}
                  </td>
                  <td className={`px-5 py-3 whitespace-nowrap text-sm text-right ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {(col.size_bytes / 1024).toFixed(2)} KB
                  </td>
                  <td className={`px-5 py-3 whitespace-nowrap text-sm text-right ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center justify-end gap-2">
                      <div className={`w-16 h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${percentage}%`, 
                            backgroundColor: collectionColors[i] 
                          }}
                        ></div>
                      </div>
                      <span>{percentage}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
