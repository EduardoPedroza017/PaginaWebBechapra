"use client";

import { useEffect, useState, useMemo } from "react";
import { MetricCard } from "./MetricCard";
import { Doughnut, Bar, Line } from "react-chartjs-2";
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
import { 
  Database, 
  Folder, 
  HardDrive, 
  FileText, 
  TrendingUp, 
  RefreshCw,
  AlertCircle,
  Activity,
  Server,
  Download,
  ChevronRight
} from "lucide-react";

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
  last_backup?: string;
  performance?: {
    query_time_ms: number;
    connection_count: number;
    uptime_days: number;
  };
}

interface DbMetricsSectionProps {
  theme: 'light' | 'dark';
  compact?: boolean;
}

export function DbMetricsSection({ theme, compact = false }: DbMetricsSectionProps) {
  const [dbMetrics, setDbMetrics] = useState<DbMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [chartType, setChartType] = useState<'doughnut' | 'bar' | 'horizontal'>('doughnut');
  
  const isDark = theme === 'dark';

  const fetchDbMetrics = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/admin/db/metrics`, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setDbMetrics(data);
        setError(null);
      } else {
        throw new Error('Error al cargar métricas');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDbMetrics();
  }, []);

  // Valores seguros con fallbacks
  const totalDocs = dbMetrics?.total_documents ?? 0;
  const totalSizeMb = dbMetrics?.total_size_mb ?? 0;
  const totalSizeGB = totalSizeMb / 1024;
  const avgDocSizeKb = dbMetrics?.avg_doc_size_kb ?? 0;
  const collections = dbMetrics?.collections ?? {};
  const performance = dbMetrics?.performance;
  const lastBackup = dbMetrics?.last_backup;

  const collectionNames = Object.keys(collections);
  const collectionCounts = collectionNames.map(c => collections[c]?.count ?? 0);
  const collectionSizesMB = collectionNames.map(c => (collections[c]?.size_bytes ?? 0) / 1024 / 1024);
  const collectionSizesKB = collectionNames.map(c => (collections[c]?.size_bytes ?? 0) / 1024);

  // Calcular porcentajes
  const collectionPercentages = collectionCounts.map(count => 
    totalDocs > 0 ? (count / totalDocs) * 100 : 0
  );

  // Colores para las colecciones
  const collectionColors = [
    '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899',
    '#06b6d4', '#f97316', '#84cc16', '#6366f1', '#ef4444'
  ];

  const collectionColorsWithOpacity = collectionColors.map(color => 
    isDark ? `${color}80` : `${color}`
  );

  const textColor = isDark ? '#e5e7eb' : '#374151';
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  // Formatear fecha de backup
  const formatBackupDate = (dateString?: string) => {
    if (!dateString) return "Nunca";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  // Datos para gráficas
  const doughnutData = {
    labels: collectionNames,
    datasets: [{
      data: collectionCounts,
      backgroundColor: collectionColorsWithOpacity.slice(0, collectionNames.length),
      borderColor: isDark ? '#1f2937' : '#ffffff',
      borderWidth: 2,
      hoverOffset: 8,
      hoverBorderWidth: 3,
    }]
  };

  const barData = {
    labels: collectionNames,
    datasets: [{
      label: "Documentos",
      data: collectionCounts,
      backgroundColor: collectionColorsWithOpacity.slice(0, collectionNames.length),
      borderRadius: 6,
      borderSkipped: false,
    }]
  };

  const horizontalBarData = {
    labels: collectionNames,
    datasets: [{
      label: "Tamaño (MB)",
      data: collectionSizesMB,
      backgroundColor: collectionColorsWithOpacity.slice(0, collectionNames.length),
      borderRadius: 6,
    }]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: { size: 11 },
          padding: 12,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    }
  };

  // Colecciones más grandes
  const largestCollections = useMemo(() => {
    return collectionNames
      .map(name => ({
        name,
        count: collections[name]?.count || 0,
        sizeMB: (collections[name]?.size_bytes || 0) / 1024 / 1024,
        percentage: totalDocs > 0 ? ((collections[name]?.count || 0) / totalDocs) * 100 : 0
      }))
      .sort((a, b) => b.sizeMB - a.sizeMB)
      .slice(0, 5);
  }, [collections, collectionNames, totalDocs]);

  if (loading && !refreshing) {
    return (
      <div className={`rounded-xl border p-8 ${
        isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-blue-600 mb-3"></div>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              <TranslateText text="Cargando métricas de base de datos..." />
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-xl border p-6 ${
        isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-start gap-3">
          <AlertCircle className={`w-5 h-5 mt-0.5 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
          <div>
            <p className={`font-medium mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
              <TranslateText text="Error al cargar métricas" />
            </p>
            <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-500'}`}>
              {error}
            </p>
            <button
              onClick={() => fetchDbMetrics(true)}
              className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium ${
                isDark 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-red-100 hover:bg-red-200 text-red-700'
              } transition-colors`}
            >
              <TranslateText text="Reintentar" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`rounded-xl border p-5 ${
        isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              isDark ? 'bg-blue-900/20' : 'bg-blue-100'
            }`}>
              <Database className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Base de Datos" />
              </h3>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {collectionNames.length} <TranslateText text="colecciones" />
              </p>
            </div>
          </div>
          
          <button
            onClick={() => fetchDbMetrics(true)}
            disabled={refreshing}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            } ${refreshing ? 'opacity-50' : ''}`}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''} ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Documentos" />
            </div>
            <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {totalDocs.toLocaleString()}
            </div>
          </div>
          
          <div>
            <div className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Tamaño" />
            </div>
            <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {totalSizeMb.toFixed(1)} MB
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-xl border p-5 ${
        isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              isDark ? 'bg-blue-900/20' : 'bg-blue-100'
            }`}>
              <Database className={`w-6 h-6 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Métricas de Base de Datos" />
              </h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <TranslateText text="Monitoreo y estadísticas del sistema de almacenamiento" />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex rounded-lg border ${
              isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              {(['doughnut', 'bar', 'horizontal'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`px-3 py-1.5 text-sm transition-colors ${
                    chartType === type
                      ? isDark
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-600 text-white'
                      : isDark
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-600 hover:text-gray-900'
                  } ${type === 'doughnut' ? 'rounded-l-lg' : ''} ${
                    type === 'horizontal' ? 'rounded-r-lg' : ''
                  }`}
                >
                  {type === 'doughnut' && 'Donut'}
                  {type === 'bar' && 'Barras'}
                  {type === 'horizontal' && 'Horizontal'}
                </button>
              ))}
            </div>

            <button
              onClick={() => fetchDbMetrics(true)}
              disabled={refreshing}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } ${refreshing ? 'opacity-50' : ''}`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <TranslateText text="Actualizar" />
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Documentos" />
            </div>
            <FileText className={`w-5 h-5 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {totalDocs.toLocaleString()}
          </div>
          <div className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            <TranslateText text="Total almacenado" />
          </div>
        </div>

        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Colecciones" />
            </div>
            <Folder className={`w-5 h-5 ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`} />
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {collectionNames.length}
          </div>
          <div className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            <TranslateText text="Tablas activas" />
          </div>
        </div>

        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Almacenamiento" />
            </div>
            <HardDrive className={`w-5 h-5 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} />
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {totalSizeGB < 1 ? `${totalSizeMb.toFixed(1)} MB` : `${totalSizeGB.toFixed(2)} GB`}
          </div>
          <div className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            <TranslateText text="Espacio utilizado" />
          </div>
        </div>

        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Promedio/Doc" />
            </div>
            <Activity className={`w-5 h-5 ${
              isDark ? 'text-amber-400' : 'text-amber-600'
            }`} />
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {avgDocSizeKb.toFixed(1)} KB
          </div>
          <div className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            <TranslateText text="Tamaño promedio" />
          </div>
        </div>
      </div>

      {/* Gráficas */}
      <div className={`rounded-xl border overflow-hidden ${
        isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Distribución de Datos" />
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {collectionNames.length} <TranslateText text="colecciones analizadas" />
              </p>
            </div>
            
            <div className={`text-xs px-2.5 py-1.5 rounded-lg ${
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              {chartType === 'doughnut' && <TranslateText text="Vista circular" />}
              {chartType === 'bar' && <TranslateText text="Vista de barras" />}
              {chartType === 'horizontal' && <TranslateText text="Tamaño por colección" />}
            </div>
          </div>

          <div className="h-80">
            {chartType === 'doughnut' ? (
              <Doughnut 
                data={doughnutData}
                options={{
                  ...commonOptions,
                  cutout: '65%',
                  plugins: {
                    ...commonOptions.plugins,
                    legend: {
                      position: 'right',
                      labels: {
                        ...commonOptions.plugins.legend.labels,
                        font: { size: 10 },
                        padding: 10,
                      }
                    }
                  }
                }}
              />
            ) : chartType === 'bar' ? (
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
            ) : (
              <Bar 
                data={horizontalBarData}
                options={{
                  ...commonOptions,
                  indexAxis: 'y',
                  scales: {
                    x: { 
                      ticks: { 
                        color: textColor,
                        padding: 8,
                      },
                      grid: { 
                        color: gridColor,
                        drawOnChartArea: false,
                      }
                    },
                    y: { 
                      ticks: { 
                        color: textColor,
                        font: { size: 11 },
                      },
                      grid: { 
                        display: false,
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
        </div>
      </div>

      {/* Detalle y performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detalle de colecciones */}
        <div className={`rounded-xl border overflow-hidden ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Colecciones" />
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Ordenadas por tamaño" />
            </p>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {largestCollections.map((col, index) => (
              <div 
                key={col.name} 
                className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: collectionColors[index] }}
                    />
                    <div>
                      <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {col.name}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {col.count.toLocaleString()} documentos
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {col.sizeMB.toFixed(2)} MB
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {col.percentage.toFixed(1)}% del total
                  </div>
                  <div className="w-24">
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${Math.min(col.percentage, 100)}%`,
                          backgroundColor: collectionColors[index]
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {collectionNames.length > 5 && (
            <div className={`px-5 py-3 border-t ${
              isDark ? 'border-gray-700 bg-gray-800/30' : 'border-gray-100 bg-gray-50'
            }`}>
              <div className="text-center">
                <button className={`text-sm font-medium flex items-center justify-center gap-1.5 mx-auto ${
                  isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  <span>
                    <TranslateText text="Ver todas las colecciones" /> ({collectionNames.length})
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Información de sistema */}
        <div className={`rounded-xl border overflow-hidden ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Información del Sistema" />
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Estado y performance" />
            </p>
          </div>
          
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Último Backup" />
                </div>
                <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {formatBackupDate(lastBackup)}
                </div>
              </div>
              
              <div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Estado" />
                </div>
                <div className={`text-sm font-medium text-green-600 dark:text-green-400`}>
                  <TranslateText text="Operativo" />
                </div>
              </div>
            </div>
            
            {performance && (
              <>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <TranslateText text="Tiempo de Consulta" />
                      </div>
                      <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {performance.query_time_ms.toFixed(2)} ms
                      </div>
                    </div>
                    
                    <div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <TranslateText text="Conexiones" />
                      </div>
                      <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {performance.connection_count}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <TranslateText text="Tiempo Activo" />
                  </div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {performance.uptime_days} días
                  </div>
                </div>
              </>
            )}
            
            <button className={`w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}>
              <Download className="w-4 h-4" />
              <TranslateText text="Descargar Reporte Completo" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}