"use client";

import { useMemo } from "react";
import { TranslateText } from "@/components/TranslateText";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Filler, 
  type ScriptableContext,
  ChartOptions 
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { PieChart, BarChart3, TrendingUp, Info, CheckCircle, XCircle } from "lucide-react";
import { ChartTypeRegistry, TooltipItem } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler);

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

interface CookieChartsProps {
  data: CookieConsent[];
  theme?: 'light' | 'dark';
  className?: string;
  activeChart?: 'distribution' | 'dailyActivity' | 'trend' | 'all';
}

export default function CookieChartsLegacy({ data, theme = 'dark', className, activeChart = 'all' }: CookieChartsProps) {
  const accepted = data.filter(d => d.accepted).length;
  const rejected = data.filter(d => !d.accepted).length;
  const total = data.length;

  // Datos para gráfico de dona con gradientes mejorados
  const doughnutData = {
    labels: [<TranslateText key="accepted" text="Aceptados" />, <TranslateText key="rejected" text="Rechazados" />],
    datasets: [{
      data: [accepted, rejected],
      backgroundColor: [
        'rgba(16, 185, 129, 0.95)',
        'rgba(244, 63, 94, 0.95)',
      ],
      borderColor: [
        theme === 'dark' ? 'rgba(16, 185, 129, 1)' : 'rgba(16, 185, 129, 0.8)',
        theme === 'dark' ? 'rgba(244, 63, 94, 1)' : 'rgba(244, 63, 94, 0.8)',
      ],
      borderWidth: 2,
      hoverOffset: 15,
      hoverBorderWidth: 4,
      hoverBorderColor: [
        theme === 'dark' ? 'rgba(16, 185, 129, 0.8)' : 'rgba(16, 185, 129, 1)',
        theme === 'dark' ? 'rgba(244, 63, 94, 0.8)' : 'rgba(244, 63, 94, 1)',
      ],
    }]
  };

  // Datos por día (últimos 7 días) con mejor formato
  const dailyData = useMemo(() => {
    const last7Days: { [key: string]: { accepted: number, rejected: number } } = {};
    const today = new Date();
    
    // Crear 7 días incluyendo hoy
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      last7Days[key] = { accepted: 0, rejected: 0 };
    }

    // Ordenar días cronológicamente
    const sortedDays = Object.keys(last7Days).sort();

    // Procesar datos
    data.forEach(item => {
      const date = new Date(item.timestamp).toISOString().split('T')[0];
      if (last7Days[date]) {
        if (item.accepted) {
          last7Days[date].accepted++;
        } else {
          last7Days[date].rejected++;
        }
      }
    });

    // Retornar objeto ordenado
    const orderedData: typeof last7Days = {};
    sortedDays.forEach(key => {
      orderedData[key] = last7Days[key];
    });

    return orderedData;
  }, [data]);

  const barChartData = {
    labels: Object.keys(dailyData).map(date => {
      const d = new Date(date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (d.toDateString() === today.toDateString()) return 'Hoy';
      if (d.toDateString() === yesterday.toDateString()) return 'Ayer';
      
      return d.toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit' });
    }),
    datasets: [
      {
        label: "Aceptados",
        data: Object.values(dailyData).map(d => d.accepted),
        backgroundColor: theme === 'dark' 
          ? 'rgba(16, 185, 129, 0.9)' 
          : 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(16, 185, 129, 1)',
        hoverBorderColor: theme === 'dark' ? '#059669' : '#10b981',
        hoverBorderWidth: 2,
      },
      {
        label: "Rechazados",
        data: Object.values(dailyData).map(d => d.rejected),
        backgroundColor: theme === 'dark' 
          ? 'rgba(244, 63, 94, 0.9)' 
          : 'rgba(244, 63, 94, 0.8)',
        borderColor: 'rgba(244, 63, 94, 1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(244, 63, 94, 1)',
        hoverBorderColor: theme === 'dark' ? '#be123c' : '#f43f5e',
        hoverBorderWidth: 2,
      }
    ]
  };

  // Datos para línea de tendencia con gradiente mejorado
  const lineData = {
    labels: barChartData.labels,
    datasets: [{
      label: "Total Diario",
      data: Object.values(dailyData).map(d => d.accepted + d.rejected),
      fill: true,
      backgroundColor: (context: ScriptableContext<'line'>) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        if (theme === 'dark') {
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
          gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)');
          gradient.addColorStop(1, 'rgba(236, 72, 153, 0.1)');
        } else {
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
          gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)');
          gradient.addColorStop(1, 'rgba(236, 72, 153, 0.05)');
        }
        return gradient;
      },
      borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.9)' : 'rgba(59, 130, 246, 0.8)',
      borderWidth: 3,
      tension: 0.4,
      pointBackgroundColor: 'rgba(59, 130, 246, 1)',
      pointBorderColor: theme === 'dark' ? '#0f172a' : '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointHoverBorderWidth: 3,
      pointHoverBackgroundColor: 'rgba(96, 165, 250, 1)',
      pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
    }]
  };

  // Opciones base mejoradas
  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: theme === 'dark' ? '#cbd5e1' : '#475569',
          font: { 
            size: 12, 
            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" 
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,
          boxHeight: 10,
        }
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: theme === 'dark' ? '#f1f5f9' : '#1e293b',
        bodyColor: theme === 'dark' ? '#cbd5e1' : '#475569',
        borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 13, weight: "bold" },
        bodyFont: { size: 12, weight: "normal" },
        displayColors: true,
        boxPadding: 6,
        caretSize: 6,
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      }
    }
  };

  const barOptions: ChartOptions<'bar'> = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#000",
          font: {
            size: 12,
            weight: "normal",
          },
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#ddd",
          lineWidth: 1,
        },
        ticks: {
          color: "#000",
          font: {
            size: 12,
            weight: "normal",
          },
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      bar: {
        borderRadius: 6,
      }
    }
  };

  const lineOptions: ChartOptions<'line'> = {
    scales: {
      x: {
        grid: { 
          display: false,
        },
        ticks: { 
          color: theme === 'dark' ? '#94a3b8' : '#64748b',
          font: { size: 11, weight: "normal" },
          maxRotation: 0,
        }
      },
      y: {
        beginAtZero: true,
        grid: { 
          color: theme === 'dark' ? 'rgba(71, 85, 105, 0.2)' : 'rgba(226, 232, 240, 0.6)',
          lineWidth: 1,
        },
        ticks: { 
          color: theme === 'dark' ? '#94a3b8' : '#64748b',
          font: { size: 11, weight: "normal" },
          precision: 0,
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    cutout: '70%',
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            const label = context.dataset.label || "";
            const value = context.raw as number;
            return `${label}: ${value}`;
          },
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  // Función para obtener color de porcentaje
  const getAcceptanceColor = (rate: number) => {
    if (rate >= 70) return 'text-emerald-400';
    if (rate >= 50) return 'text-amber-400';
    return 'text-rose-400';
  };

  const acceptanceRate = total > 0 ? ((accepted / total) * 100).toFixed(1) : '0';

  // Renderizar gráfica individual o todas
  const showDistribution = activeChart === 'all' || activeChart === 'distribution';
  const showDailyActivity = activeChart === 'all' || activeChart === 'dailyActivity';
  const showTrend = activeChart === 'all' || activeChart === 'trend';

  // Determinar clases de grid según qué gráficas se muestran
  const gridClasses = activeChart === 'all' 
    ? `grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`
    : `${className}`;

  return (
    <div className={gridClasses}>
      {/* Gráfico de Dona - Distribución */}
      {showDistribution && (
      <div className={`group rounded-2xl border transition-all duration-500 hover:scale-[1.01] relative overflow-hidden ${
        theme === 'dark' 
          ? "bg-linear-to-br from-gray-900/90 via-gray-800/30 to-gray-900/90 border-gray-700 shadow-xl hover:shadow-gray-700/20 hover:border-gray-600" 
          : "bg-linear-to-br from-white via-gray-50/50 to-white border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300"
      }`}>
        <div className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl transition-all duration-500 ${
                theme === 'dark' 
                  ? 'bg-emerald-600/20 shadow-lg shadow-emerald-500/20' 
                  : 'bg-emerald-100 shadow-md shadow-emerald-200/50'
              }`}>
                <PieChart className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
              <div>
                <h3 className={`font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Distribución" />
                </h3>
                <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Consentimientos totales" />
                </p>
              </div>
            </div>
            <div className={`text-xs px-3 py-1 rounded-full font-medium ${
              theme === 'dark' 
                ? 'bg-gray-800 text-gray-300' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              <TranslateText text="Total" />: {total}
            </div>
          </div>
          
          <div className="h-50 flex items-center justify-center mb-6 relative">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className={`text-2xl font-bold ${getAcceptanceColor(parseFloat(acceptanceRate))}`}>
                {acceptanceRate}%
              </span>
              <span className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Tasa de aceptación" />
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-700/30">
            <div className={`p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
              theme === 'dark' ? 'bg-emerald-900/20' : 'bg-emerald-50'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  <TranslateText text="Aceptados" />
                </span>
                <CheckCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
              <span className="text-2xl font-bold text-emerald-500">{accepted}</span>
            </div>
            <div className={`p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
              theme === 'dark' ? 'bg-rose-900/20' : 'bg-rose-50'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-rose-400' : 'text-rose-700'}`}>
                  <TranslateText text="Rechazados" />
                </span>
                <XCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`} />
              </div>
              <span className="text-2xl font-bold text-rose-500">{rejected}</span>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Gráfico de Barras - Actividad Diaria */}
      {showDailyActivity && (
      <div className={`group rounded-2xl border transition-all duration-500 hover:scale-[1.01] relative overflow-hidden ${
        theme === 'dark' 
          ? "bg-linear-to-br from-gray-900/90 via-gray-800/30 to-gray-900/90 border-gray-700 shadow-xl hover:shadow-gray-700/20 hover:border-gray-600" 
          : "bg-linear-to-br from-white via-gray-50/50 to-white border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300"
      }`}>
        <div className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl transition-all duration-500 ${
                theme === 'dark' 
                  ? 'bg-blue-600/20 shadow-lg shadow-blue-500/20' 
                  : 'bg-blue-100 shadow-md shadow-blue-200/50'
              }`}>
                <BarChart3 className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h3 className={`font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Actividad Diaria" />
                </h3>
                <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Últimos 7 días" />
                </p>
              </div>
            </div>
            <div className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${
              theme === 'dark' 
                ? 'bg-blue-900/30 text-blue-300' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              <Info className="w-3 h-3" />
              <TranslateText text="Doble eje" />
            </div>
          </div>
          <div className="h-62.5">
            <Bar data={barChartData} options={barOptions} />
          </div>
        </div>
      </div>
      )}

      {/* Gráfico de Línea - Tendencia */}
      {showTrend && (
      <div className={`group rounded-2xl border transition-all duration-500 hover:scale-[1.01] relative overflow-hidden ${
        theme === 'dark' 
          ? "bg-linear-to-br from-gray-900/90 via-gray-800/30 to-gray-900/90 border-gray-700 shadow-xl hover:shadow-gray-700/20 hover:border-gray-600" 
          : "bg-linear-to-br from-white via-gray-50/50 to-white border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300"
      }`}>
        <div className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl transition-all duration-500 ${
                theme === 'dark' 
                  ? 'bg-purple-600/20 shadow-lg shadow-purple-500/20' 
                  : 'bg-purple-100 shadow-md shadow-purple-200/50'
              }`}>
                <TrendingUp className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div>
                <h3 className={`font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Tendencia" />
                </h3>
                <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Últimos 7 días" />
                </p>
              </div>
            </div>
          </div>
          <div className="h-62.5">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
