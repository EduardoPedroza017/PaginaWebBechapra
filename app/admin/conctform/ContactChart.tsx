"use client";

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { TranslateText } from "@/components/TranslateText";
import { BarChart3, TrendingUp, Calendar, Info } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface Props {
  data: ContactMessage[];
  theme: 'light' | 'dark';
}

export default function ContactChart({ data, theme }: Props) {
  const grouped = useMemo(() => {
    const map: { [date: string]: number } = {};
    data.forEach(msg => {
      const d = new Date(msg.timestamp).toISOString().slice(0, 10);
      map[d] = (map[d] || 0) + 1;
    });
    return map;
  }, [data]);

  const labels = Object.keys(grouped).sort().slice(-10); // Últimos 10 días
  const values = labels.map(l => grouped[l]);
  const total = values.reduce((a, b) => a + b, 0);
  const maxValue = Math.max(...values, 1);
  const avgValue = total / labels.length || 0;

  const chartData = {
    labels: labels.map(l => {
      const date = new Date(l);
      return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: "Mensajes",
        data: values,
        backgroundColor: values.map((value, index) => {
          const ratio = value / maxValue;
          return theme === 'dark' 
            ? `rgba(59, 130, 246, ${0.5 + ratio * 0.5})` 
            : `rgba(59, 130, 246, ${0.3 + ratio * 0.5})`;
        }),
        borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.9)' : 'rgba(59, 130, 246, 0.8)',
        borderWidth: 2,
        borderRadius: 12,
        borderSkipped: false,
        hoverBackgroundColor: theme === 'dark' ? 'rgba(96, 165, 250, 0.9)' : 'rgba(59, 130, 246, 0.8)',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
        titleColor: theme === 'dark' ? '#fff' : '#111827',
        bodyColor: theme === 'dark' ? '#9ca3af' : '#4b5563',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 16,
        boxPadding: 8,
        titleFont: {
          size: 13,
          weight: 'bold' as const // Ensured compatibility with Chart.js types
        },
        bodyFont: { size: 14 },
        callbacks: {
          title: (items: any) => {
            return items[0].label;
          },
          label: (context: any) => {
            return `${context.raw} mensaje${context.raw !== 1 ? 's' : ''}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { 
          display: false,
          drawBorder: false
        },
        ticks: { 
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          font: { size: 12 }
        }
      },
      y: {
        beginAtZero: true,
        grid: { 
          color: theme === 'dark' ? '#374151' : '#f3f4f6',
          drawBorder: false
        },
        ticks: { 
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          stepSize: Math.ceil(maxValue / 5) || 1,
          font: { size: 12 },
          callback: function(value: any) {
            return Number.isInteger(value) ? value : '';
          }
        },
        border: { dash: [4, 4] }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  // Finalized Tailwind CSS class updates
  const containerClass = theme === 'dark'
    ? 'bg-linear-to-br from-gray-900 to-gray-800 border-gray-800'
    : 'bg-linear-to-br from-white to-blue-50/50 border-gray-100 shadow-sm';

  return (
    <div className={`rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
      theme === 'dark' 
        ? 'bg-linear-to-br from-gray-900 to-gray-800 border-gray-800' 
        : 'bg-linear-to-br from-white to-blue-50/50 border-gray-100 shadow-sm'
    } border`}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              theme === 'dark' 
                ? 'bg-blue-600/20 text-blue-400' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-bold text-lg ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <TranslateText text="Actividad de Mensajes" />
              </h3>
              <p className={`text-sm flex items-center gap-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Calendar className="w-4 h-4" />
                <span>Últimos 10 días</span>
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {total}
            </div>
            <div className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <TranslateText text="mensajes totales" />
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
            theme === 'dark' 
              ? 'bg-blue-600/20 text-blue-400' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Promedio: {avgValue.toFixed(1)}/día</span>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
            theme === 'dark' 
              ? 'bg-gray-800 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            <Info className="w-3.5 h-3.5" />
            <span>Máximo: {maxValue} en un día</span>
          </div>
        </div>
        
        {labels.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 py-8">
            <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <BarChart3 className={`w-8 h-8 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`} />
            </div>
            <p className={`text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <TranslateText text="No hay datos para mostrar" />
            </p>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <TranslateText text="Los mensajes aparecerán aquí" />
            </p>
          </div>
        ) : (
          <div className="h-56">
            <Bar data={chartData} options={options} />
          </div>
        )}
        
        {/* Leyenda */}
        <div className={`mt-4 pt-4 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
        }`}>
          <div className="flex items-center justify-between text-xs">
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
              Cada barra representa un día
            </span>
            <span className={`px-2 py-1 rounded ${
              theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              {labels.length} días mostrados
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}