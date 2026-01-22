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
  Title,
  ChartOptions
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
  const { grouped, labels, values, total, maxValue, avgValue } = useMemo(() => {
    const map: { [date: string]: number } = {};
    data.forEach(msg => {
      try {
        const d = new Date(msg.timestamp).toISOString().slice(0, 10);
        map[d] = (map[d] || 0) + 1;
      } catch (error) {
        console.warn('Fecha inválida:', msg.timestamp);
      }
    });
    
    const sortedDates = Object.keys(map).sort();
    const recentLabels = sortedDates.slice(-10); // Últimos 10 días
    const recentValues = recentLabels.map(l => map[l]);
    const totalValue = recentValues.reduce((a, b) => a + b, 0);
    const max = Math.max(...recentValues, 1);
    const avg = recentLabels.length > 0 ? totalValue / recentLabels.length : 0;
    
    return {
      grouped: map,
      labels: recentLabels,
      values: recentValues,
      total: totalValue,
      maxValue: max,
      avgValue: avg
    };
  }, [data]);

  const formattedLabels = useMemo(() => {
    return labels.map(l => {
      try {
        const date = new Date(l);
        return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
      } catch {
        return l;
      }
    });
  }, [labels]);

  const chartData = useMemo(() => ({
    labels: formattedLabels,
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
        borderSkipped: false as const,
        hoverBackgroundColor: theme === 'dark' ? 'rgba(96, 165, 250, 0.9)' : 'rgba(59, 130, 246, 0.8)',
      }
    ]
  }), [formattedLabels, values, maxValue, theme]);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        titleColor: theme === 'dark' ? '#ffffff' : '#111827',
        bodyColor: theme === 'dark' ? '#9ca3af' : '#4b5563',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 16,
        boxPadding: 8,
        titleFont: {
          size: 13,
          weight: 'bold'
        },
        bodyFont: { 
          size: 14,
          family: "'Inter', sans-serif"
        },
        callbacks: {
          title: (items: any) => {
            if (items.length > 0) {
              const item = items[0];
              const originalLabel = labels[item.dataIndex];
              try {
                const date = new Date(originalLabel);
                return date.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                });
              } catch {
                return item.label;
              }
            }
            return '';
          },
          label: (context: any) => {
            const value = context.raw as number;
            return `${value} mensaje${value !== 1 ? 's' : ''}`;
          },
          afterLabel: (context: any) => {
            if (values.length > 1) {
              const value = context.raw as number;
              const percentage = ((value / total) * 100).toFixed(1);
              return `${percentage}% del total`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      x: {
        grid: { 
          display: false,
        },
        ticks: { 
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          font: { 
            size: 12,
            family: "'Inter', sans-serif"
          },
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        grid: { 
          color: theme === 'dark' ? '#374151' : '#f3f4f6',
          drawTicks: false
        },
        ticks: { 
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          stepSize: Math.ceil(maxValue / 5) || 1,
          font: { 
            size: 11,
            family: "'Inter', sans-serif"
          },
          callback: function(value: any) {
            if (typeof value === 'number' && Number.isInteger(value)) {
              return value.toString();
            }
            return '';
          }
        },
        border: { 
          dash: [4, 4],
          color: theme === 'dark' ? '#4b5563' : '#d1d5db'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const getTrendColor = () => {
    if (avgValue === 0) return theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
    if (avgValue > 5) return 'text-green-500';
    if (avgValue > 2) return 'text-blue-500';
    return 'text-yellow-500';
  };

  return (
    <div className={`rounded-2xl border transition-all duration-300 hover:shadow-lg ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700' 
        : 'bg-gradient-to-br from-white to-blue-50/50 border-gray-200 shadow-sm'
    } overflow-hidden`}>
      <div className="p-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              theme === 'dark' 
                ? 'bg-blue-900/30 text-blue-400' 
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
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Últimos {labels.length} días</span>
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
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
            theme === 'dark' 
              ? 'bg-blue-900/20 text-blue-300' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Promedio: <span className={getTrendColor()}>{avgValue.toFixed(1)}</span>/día</span>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
            theme === 'dark' 
              ? 'bg-gray-800 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Máximo: {maxValue} en un día</span>
          </div>
        </div>
        
        {/* Gráfico o estado vacío */}
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
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <TranslateText text="No hay datos para mostrar" />
            </p>
            <p className={`text-xs text-center ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              <TranslateText text="Los mensajes aparecerán aquí cuando se reciban" />
            </p>
          </div>
        ) : (
          <div className="h-64">
            <Bar data={chartData} options={options} />
          </div>
        )}
        
        {/* Footer con información */}
        <div className={`mt-4 pt-4 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} max-w-[70%]`}>
              <TranslateText text="Cada barra representa la cantidad de mensajes recibidos en un día" />
            </span>
            <span className={`px-2 py-1 rounded ${
              theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
            } whitespace-nowrap`}>
              {labels.length} {labels.length === 1 ? 'día' : 'días'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}