"use client";

import { Pie, Bar, Line } from "react-chartjs-2";
import { TranslateText } from "@/components/TranslateText";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler
);

interface AuditLogChartsProps {
  successCount: number;
  failCount: number;
  byUser: { [key: string]: number };
  byDate: { [key: string]: number };
  theme: 'light' | 'dark';
}

export function AuditLogCharts({ successCount, failCount, byUser, byDate, theme }: AuditLogChartsProps) {
  // Colores para gráficas
  const textColor = theme === 'dark' ? '#e5e7eb' : '#374151';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
  
  // Opciones comunes para las gráficas
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: textColor, font: { size: 12 } }
      }
    }
  };

  // Datos para gráfica de Pie
  const pieData = {
    labels: ["Exitosos", "Fallidos"],
    datasets: [{
      data: [successCount, failCount],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)'
      ],
      borderWidth: 2
    }]
  };

  // Datos para gráfica de barras por usuario
  const barData = {
    labels: Object.keys(byUser).slice(0, 10),
    datasets: [{
      label: "Intentos",
      data: Object.values(byUser).slice(0, 10),
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1,
      borderRadius: 4,
    }]
  };

  // Datos para gráfica de línea por fecha
  const sortedDates = Object.keys(byDate).sort();
  const lineData = {
    labels: sortedDates.slice(-14),
    datasets: [{
      label: "Accesos",
      data: sortedDates.slice(-14).map(d => byDate[d]),
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      fill: true,
      tension: 0.3,
      pointBackgroundColor: 'rgb(99, 102, 241)',
      pointBorderColor: '#fff',
      pointRadius: 4,
      pointHoverRadius: 6,
    }]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Gráfica Pie - Éxitos vs Fallos */}
      <div className={`rounded-2xl shadow-sm p-5 border ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <TranslateText text="Distribución de Intentos" />
        </h3>
        <div className="h-56">
          <Pie 
            data={pieData} 
            options={{
              ...commonOptions,
              plugins: {
                ...commonOptions.plugins,
                legend: {
                  position: 'bottom',
                  labels: { color: textColor, padding: 16 }
                }
              }
            }} 
          />
        </div>
      </div>

      {/* Gráfica Bar - Por Usuario */}
      <div className={`rounded-2xl shadow-sm p-5 border ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <TranslateText text="Intentos por Usuario" />
        </h3>
        <div className="h-56">
          <Bar 
            data={barData} 
            options={{
              ...commonOptions,
              scales: {
                x: { 
                  ticks: { color: textColor, font: { size: 10 } },
                  grid: { color: gridColor }
                },
                y: { 
                  ticks: { color: textColor },
                  grid: { color: gridColor }
                }
              },
              plugins: {
                ...commonOptions.plugins,
                legend: { display: false }
              }
            }} 
          />
        </div>
      </div>

      {/* Gráfica Line - Por Fecha */}
      <div className={`rounded-2xl shadow-sm p-5 border ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <TranslateText text="Tendencia de Accesos (14 días)" />
        </h3>
        <div className="h-56">
          <Line 
            data={lineData} 
            options={{
              ...commonOptions,
              scales: {
                x: { 
                  ticks: { color: textColor, font: { size: 10 } },
                  grid: { display: false }
                },
                y: { 
                  ticks: { color: textColor },
                  grid: { color: gridColor }
                }
              },
              plugins: {
                ...commonOptions.plugins,
                legend: { display: false }
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
}
