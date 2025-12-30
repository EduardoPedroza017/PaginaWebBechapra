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
import { TrendingUp, TrendingDown, Users, Calendar, ShieldCheck, AlertTriangle } from "lucide-react";
import { useState, useMemo } from "react";

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
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [chartType, setChartType] = useState<'bar' | 'line'>('line');
  
  const isDark = theme === 'dark';
  const textColor = isDark ? '#e5e7eb' : '#374151';
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
  
  // Estadísticas calculadas
  const totalAttempts = successCount + failCount;
  const successRate = totalAttempts > 0 ? Math.round((successCount / totalAttempts) * 100) : 0;
  const failRate = totalAttempts > 0 ? Math.round((failCount / totalAttempts) * 100) : 0;
  
  // Usuarios más activos
  const topUsers = useMemo(() => {
    return Object.entries(byUser)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);
  }, [byUser]);

  // Datos agrupados por período de tiempo
  const filteredDates = useMemo(() => {
    const sortedDates = Object.keys(byDate).sort();
    const now = new Date();
    
    const filterMap: { [key in typeof timeRange]: number } = {
      '7d': 7,
      '30d': 30,
      '90d': 90
    };
    
    const days = filterMap[timeRange];
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    return sortedDates.filter(date => {
      const dateObj = new Date(date);
      return dateObj >= cutoff;
    }).slice(-days);
  }, [byDate, timeRange]);

  // Opciones comunes
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        labels: { 
          color: textColor, 
          font: { size: 12 },
          padding: 16,
        }
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        boxPadding: 6,
      }
    }
  };

  // Gráfico de donut (Pie mejorado)
  const pieData = {
    labels: ["Éxitos", "Fallidos"],
    datasets: [{
      data: [successCount, failCount],
      backgroundColor: [
        isDark ? 'rgba(34, 197, 94, 0.8)' : 'rgba(34, 197, 94, 0.9)',
        isDark ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 0.9)'
      ],
      borderColor: [
        isDark ? 'rgb(34, 197, 94)' : 'rgb(21, 128, 61)',
        isDark ? 'rgb(239, 68, 68)' : 'rgb(185, 28, 28)'
      ],
      borderWidth: 2,
      borderRadius: 4,
      spacing: 4,
    }]
  };

  // Gráfico de barras por usuario
  const barData = {
    labels: topUsers.map(([user]) => user.length > 15 ? `${user.substring(0, 12)}...` : user),
    datasets: [{
      label: "Intentos",
      data: topUsers.map(([, count]) => count),
      backgroundColor: isDark 
        ? 'rgba(59, 130, 246, 0.7)' 
        : 'rgba(59, 130, 246, 0.8)',
      borderColor: isDark ? 'rgb(59, 130, 246)' : 'rgb(29, 78, 216)',
      borderWidth: 1,
      borderRadius: 6,
      barPercentage: 0.7,
      categoryPercentage: 0.8,
    }]
  };

  // Gráfico de línea por fecha
  const lineData = {
    labels: filteredDates.map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }),
    datasets: [{
      label: "Accesos",
      data: filteredDates.map(date => byDate[date] || 0),
      borderColor: isDark ? 'rgb(139, 92, 246)' : 'rgb(99, 102, 241)',
      backgroundColor: isDark 
        ? 'rgba(139, 92, 246, 0.15)' 
        : 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: isDark ? 'rgb(139, 92, 246)' : 'rgb(99, 102, 241)',
      pointBorderColor: isDark ? 'rgb(31, 41, 55)' : '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 3,
    }]
  };

  // Datos para gráfico de barras por fecha (alternativa)
  const dateBarData = {
    labels: filteredDates.map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }),
    datasets: [{
      label: "Accesos",
      data: filteredDates.map(date => byDate[date] || 0),
      backgroundColor: isDark 
        ? 'rgba(59, 130, 246, 0.7)' 
        : 'rgba(59, 130, 246, 0.8)',
      borderColor: isDark ? 'rgb(59, 130, 246)' : 'rgb(29, 78, 216)',
      borderWidth: 1,
      borderRadius: 6,
      barPercentage: 0.8,
    }]
  };

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className={`rounded-xl border p-5 ${
        isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Análisis de Auditoría" />
            </h3>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Métricas y tendencias de acceso al sistema" />
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`flex rounded-lg border ${
              isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-sm transition-colors ${
                    timeRange === range
                      ? isDark
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-600 text-white'
                      : isDark
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-600 hover:text-gray-900'
                  } ${range === '7d' ? 'rounded-l-lg' : ''} ${
                    range === '90d' ? 'rounded-r-lg' : ''
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <div className={`flex rounded-lg border ${
              isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  chartType === 'line'
                    ? isDark
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-600 text-white'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-600 hover:text-gray-900'
                } rounded-l-lg`}
              >
                <TranslateText text="Línea" />
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  chartType === 'bar'
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-600 hover:text-gray-900'
                } rounded-r-lg`}
              >
                <TranslateText text="Barras" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Total Intentos" />
              </div>
              <Users className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {totalAttempts}
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Tasa de Éxito" />
              </div>
              <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <div className="flex items-baseline gap-2">
              <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {successRate}%
              </div>
              <TrendingUp className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Fallidos" />
              </div>
              <AlertTriangle className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            <div className="flex items-baseline gap-2">
              <div className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                {failCount}
              </div>
              {failCount > 0 && (
                <TrendingDown className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              )}
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Período" />
              </div>
              <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {timeRange === '7d' ? '7 días' : 
               timeRange === '30d' ? '30 días' : 
               '90 días'}
            </div>
          </div>
        </div>
      </div>

      {/* Grid de gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de donut - Éxitos vs Fallos */}
        <div className={`rounded-xl border overflow-hidden ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <TranslateText text="Distribución de Intentos" />
              </h3>
              <div className={`text-xs px-2 py-1 rounded ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                <TranslateText text="Donut" />
              </div>
            </div>
          </div>
          <div className="h-64 px-2">
            <Pie 
              data={pieData} 
              options={{
                ...commonOptions,
                cutout: '65%',
                plugins: {
                  ...commonOptions.plugins,
                  legend: {
                    position: 'bottom' as const,
                    labels: { 
                      color: textColor, 
                      padding: 16,
                      font: { size: 11 }
                    }
                  }
                }
              }} 
            />
          </div>
          <div className={`px-5 py-3 border-t ${
            isDark ? 'border-gray-700 bg-gray-800/30' : 'border-gray-100 bg-gray-50'
          }`}>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Éxitos" />
                </div>
                <div className={`text-lg font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  {successCount}
                </div>
              </div>
              <div className="text-center">
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Fallidos" />
                </div>
                <div className={`text-lg font-semibold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  {failCount}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de barras por usuario */}
        <div className={`rounded-xl border overflow-hidden ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <TranslateText text="Top Usuarios Activos" />
              </h3>
              <div className={`text-xs px-2 py-1 rounded ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                {topUsers.length} <TranslateText text="usuarios" />
              </div>
            </div>
          </div>
          <div className="h-64 px-2">
            <Bar 
              data={barData} 
              options={{
                ...commonOptions,
                scales: {
                  x: { 
                    ticks: { 
                      color: textColor, 
                      font: { size: 10 },
                      maxRotation: 45,
                    },
                    grid: { 
                      color: gridColor,
                      drawOnChartArea: false,
                    }
                  },
                  y: { 
                    beginAtZero: true,
                    ticks: { 
                      color: textColor,
                      padding: 8,
                    },
                    grid: { 
                      color: gridColor,
                      drawOnChartArea: false,
                    }
                  }
                },
                plugins: {
                  ...commonOptions.plugins,
                  legend: { display: false }
                }
              }} 
            />
          </div>
          <div className={`px-5 py-3 border-t ${
            isDark ? 'border-gray-700 bg-gray-800/30' : 'border-gray-100 bg-gray-50'
          }`}>
            <div className="text-xs text-center">
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Mostrando los" /> {Math.min(topUsers.length, 8)}{' '}
                <TranslateText text="usuarios más activos" />
              </span>
            </div>
          </div>
        </div>

        {/* Gráfico de línea/barras por fecha */}
        <div className={`rounded-xl border overflow-hidden ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <TranslateText text="Tendencia Temporal" />
              </h3>
              <div className={`text-xs px-2 py-1 rounded ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                {chartType === 'line' ? <TranslateText text="Línea" /> : <TranslateText text="Barras" />}
              </div>
            </div>
          </div>
          <div className="h-64 px-2">
            {chartType === 'line' ? (
              <Line 
                data={lineData} 
                options={{
                  ...commonOptions,
                  scales: {
                    x: { 
                      ticks: { 
                        color: textColor, 
                        font: { size: 10 },
                        maxRotation: 45,
                      },
                      grid: { 
                        color: gridColor,
                        drawOnChartArea: false,
                      }
                    },
                    y: { 
                      beginAtZero: true,
                      ticks: { 
                        color: textColor,
                        padding: 8,
                      },
                      grid: { 
                        color: gridColor,
                        drawOnChartArea: false,
                      }
                    }
                  },
                  plugins: {
                    ...commonOptions.plugins,
                    legend: { display: false }
                  }
                }} 
              />
            ) : (
              <Bar 
                data={dateBarData} 
                options={{
                  ...commonOptions,
                  scales: {
                    x: { 
                      ticks: { 
                        color: textColor, 
                        font: { size: 10 },
                        maxRotation: 45,
                      },
                      grid: { 
                        color: gridColor,
                        drawOnChartArea: false,
                      }
                    },
                    y: { 
                      beginAtZero: true,
                      ticks: { 
                        color: textColor,
                        padding: 8,
                      },
                      grid: { 
                        color: gridColor,
                        drawOnChartArea: false,
                      }
                    }
                  },
                  plugins: {
                    ...commonOptions.plugins,
                    legend: { display: false }
                  }
                }} 
              />
            )}
          </div>
          <div className={`px-5 py-3 border-t ${
            isDark ? 'border-gray-700 bg-gray-800/30' : 'border-gray-100 bg-gray-50'
          }`}>
            <div className="text-xs text-center">
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {filteredDates.length} <TranslateText text="días mostrados" />
                {' • '}
                <TranslateText text="Últimos" /> {timeRange === '7d' ? '7' : timeRange === '30d' ? '30' : '90'}{' '}
                <TranslateText text="días" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className={`rounded-xl border p-5 ${
        isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Usuarios Únicos" />
            </div>
            <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {Object.keys(byUser).length}
            </div>
          </div>
          
          <div>
            <div className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Días con Actividad" />
            </div>
            <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {Object.keys(byDate).length}
            </div>
          </div>
          
          <div>
            <div className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Fecha más Activa" />
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {Object.keys(byDate).length > 0 
                ? (() => {
                    const dates = Object.entries(byDate);
                    const maxDate = dates.reduce((max, [date, count]) => 
                      count > max.count ? { date, count } : max, 
                      { date: '', count: 0 }
                    );
                    const d = new Date(maxDate.date);
                    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                  })()
                : <TranslateText text="Sin datos" />
              }
            </div>
          </div>
          
          <div>
            <div className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Promedio Diario" />
            </div>
            <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {Object.keys(byDate).length > 0 
                ? Math.round(totalAttempts / Object.keys(byDate).length)
                : 0
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}