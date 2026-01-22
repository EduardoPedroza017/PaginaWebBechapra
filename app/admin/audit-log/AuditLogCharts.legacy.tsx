"use client";

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

  // Opciones comunes para gráficos
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
              {successRate >= 80 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <div className={`text-2xl font-bold ${
              successRate >= 80 ? 'text-green-600' : 'text-red-600'
            }`}>
              {successRate}%
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Tasa de Fallo" />
              </div>
              <AlertTriangle className={`w-4 h-4 ${
                failRate > 20 ? 'text-red-500' : isDark ? 'text-yellow-400' : 'text-yellow-500'
              }`} />
            </div>
            <div className={`text-2xl font-bold ${
              failRate > 20 ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {failRate}%
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
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {timeRange}
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenedor de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de donut */}
        <div className={`rounded-xl border p-4 ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h4 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <TranslateText text="Distribución de Resultados" />
          </h4>
          <div className="h-64">
            {/* Aquí iría el componente Chart de Chart.js */}
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <ShieldCheck className={`w-12 h-12 mx-auto mb-2 ${
                  successRate >= 80 ? 'text-green-500' : 'text-yellow-500'
                }`} />
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  <TranslateText text="Gráfico de distribución" />
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gráfico de usuarios */}
        <div className={`rounded-xl border p-4 ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h4 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <TranslateText text="Usuarios Más Activos" />
          </h4>
          <div className="h-64">
            {/* Aquí iría el componente Chart de Chart.js */}
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Users className={`w-12 h-12 mx-auto mb-2 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  <TranslateText text="Gráfico de usuarios" />
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gráfico de tendencias (ocupa todo el ancho) */}
        <div className={`lg:col-span-2 rounded-xl border p-4 ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Tendencias de Acceso" />
            </h4>
            <span className={`text-sm px-2 py-1 rounded ${
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              {chartType === 'line' ? 'Línea' : 'Barras'}
            </span>
          </div>
          <div className="h-80">
            {/* Aquí iría el componente Chart de Chart.js */}
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className={`w-12 h-12 mx-auto mb-2 ${
                  isDark ? 'text-purple-400' : 'text-purple-500'
                }`} />
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  <TranslateText text="Gráfico de tendencias" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}