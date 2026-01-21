"use client";

import React, { useState } from "react";
import { 
  Database, 
  Activity, 
  HardDrive, 
  Users, 
  Clock, 
  Server, 
  Layers, 
  RefreshCw,
  Zap,
  Shield,
  TrendingUp,
  Cpu,
  Network,
  AlertTriangle
} from "lucide-react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import useSWR from 'swr';
import { DBCharts } from './components/DBCharts';
import { DBMetricCards } from './components/DBMetricCards';
import { DBServerInfo } from './components/DBServerInfo';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Fetcher para SWR
const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

// Tipos
interface CollectionStats {
  name: string;
  count: number;
  size: number;
  storageSize: number;
  avgObjSize: number;
  totalIndexSize: number;
}

interface DBStats {
  db: string;
  dataSize: number;
  objects: number;
}

interface Connections {
  current: number;
}

interface ServerStatus {
  uptime: number;
  host: string;
  version: string;
}

interface Metrics {
  db: DBStats;
  collections: CollectionStats[];
  connections: Connections;
  serverStatus: ServerStatus;
}

export default function ConfiguracionDBPage() {
  // Tema con persistencia y SSR-safe
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'metricas' | 'servidor' | 'colecciones'>('metricas');
  const [collectionsPage, setCollectionsPage] = useState(1);

  React.useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
    setLastRefresh(new Date());

    // Cargar pestaña activa
    const savedTab = localStorage.getItem('configActiveTab');
    if (savedTab === 'metricas' || savedTab === 'servidor' || savedTab === 'colecciones') {
      setActiveTab(savedTab);
    }
  }, []);

  // Guardar pestaña activa cuando cambie
  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem("configActiveTab", activeTab);
    }
  }, [activeTab, mounted]);

  // Resetear página de colecciones cuando se cambie a esa pestaña
  React.useEffect(() => {
    if (activeTab === 'colecciones') {
      setCollectionsPage(1);
    }
  }, [activeTab]);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Obtener métricas de Mongo (SWR)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
  }
  const {
    data: metrics,
    error: metricsError,
    isLoading: loadingMetrics,
    mutate: refreshMetrics,
  } = useSWR<Metrics>(`${apiUrl}/admin/db/metrics`, fetcher, {
    refreshInterval: 10000,
    onSuccess: () => {
      setLastRefresh(new Date());
      setRefreshCount(prev => prev + 1);
    }
  });

  // Colores para gráficas
  const chartColors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(139, 92, 246, 0.8)',
    'rgba(236, 72, 153, 0.8)',
    'rgba(6, 182, 212, 0.8)',
    'rgba(249, 115, 22, 0.8)',
    'rgba(34, 197, 94, 0.8)',
  ];

  const handleRefresh = async () => {
    await refreshMetrics();
    setLastRefresh(new Date());
    setRefreshCount(prev => prev + 1);
  };

  const formatTimeSince = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Hace unos segundos';
    if (diffMins === 1) return 'Hace 1 minuto';
    if (diffMins < 60) return `Hace ${diffMins} minutos`;
    return `Hace ${Math.floor(diffMins / 60)} horas`;
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950">
        <div className="w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-purple-500 animate-pulse mx-auto mb-4 flex items-center justify-center">
          <Database size={32} className="text-white" />
        </div>
        <p className="text-gray-600 dark:text-gray-400">Inicializando dashboard...</p>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      theme === "dark" 
        ? "bg-linear-to-br from-gray-950 via-gray-900 to-gray-950" 
        : "bg-linear-to-br from-blue-50/30 via-indigo-50/20 to-white"
    }`}>
      <Sidebar selected="/admin/config" theme={theme} />

      <div className="flex-1 flex flex-col">
        <Header
          onLogout={() => {
            sessionStorage.removeItem("admin");
            sessionStorage.removeItem("role");
            window.location.href = "/admin";
          }}
          onToggleTheme={handleToggleTheme}
          theme={theme}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header premium */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 shadow-xl ${
                  theme === "dark" ? "shadow-blue-500/30" : "shadow-blue-500/20"
                }`}>
                  <Database className="text-white" size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className={`text-3xl lg:text-4xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      <TranslateText text="Database Intelligence" />
                    </h1>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      theme === "dark" 
                        ? "bg-linear-to-r from-blue-600/30 to-purple-600/30 text-blue-400" 
                        : "bg-linear-to-r from-blue-100 to-purple-100 text-blue-700"
                    }`}>
                      MongoDB
                    </div>
                  </div>
                  <p className={`text-sm flex items-center gap-2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <Activity className="w-4 h-4" />
                    <TranslateText text="Monitorización avanzada y métricas en tiempo real" />
                    {lastRefresh && (
                      <>
                        <span className="mx-2">•</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
                        }`}>
                          Actualizado: {formatTimeSince(lastRefresh)}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className={`p-3 rounded-xl ${
                  theme === "dark" 
                    ? "bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700" 
                    : "bg-linear-to-r from-white to-blue-50 border border-blue-100"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${theme === "dark" 
                      ? "bg-green-600/20 text-green-400" 
                      : "bg-green-100 text-green-600"
                    }`}>
                      <Shield size={16} />
                    </div>
                    <div>
                      <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        <TranslateText text="Estado" />
                      </div>
                      <div className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {metricsError ? 'Error' : loadingMetrics ? 'Conectando...' : 'Operacional'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleRefresh}
                  disabled={loadingMetrics}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                    theme === "dark"
                      ? "bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/20"
                      : "bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30"
                  } ${loadingMetrics ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <RefreshCw className={`w-4 h-4 ${loadingMetrics ? "animate-spin" : ""}`} />
                  <TranslateText text="Actualizar Datos" />
                  {refreshCount > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      theme === "dark" ? "bg-white/20" : "bg-white/30"
                    }`}>
                      {refreshCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Alertas rápidas */}
            {metricsError && (
              <div className={`rounded-xl p-4 mb-6 ${
                theme === "dark" 
                  ? "bg-linear-to-r from-red-900/20 to-red-800/20 border border-red-800/50" 
                  : "bg-linear-to-r from-red-50 to-red-100/50 border border-red-200"
              }`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`} />
                  <div className="flex-1">
                    <p className={`font-medium ${
                      theme === "dark" ? "text-red-300" : "text-red-800"
                    }`}>
                      <TranslateText text="Error de conexión con MongoDB" />
                    </p>
                    <p className={`text-sm mt-1 ${
                      theme === "dark" ? "text-red-400" : "text-red-600"
                    }`}>
                      <TranslateText text="Verifica que el servidor de base de datos esté en ejecución y accesible." />
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pestañas */}
          <div className="mb-8">
            <div className={`rounded-xl border ${
              theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <div className="flex">
                <button
                  onClick={() => setActiveTab('metricas')}
                  className={`flex-1 px-6 py-3 text-center font-medium transition-colors ${
                    activeTab === 'metricas'
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                        : 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  MÉTRICAS EN TIEMPO REAL
                </button>
                <button
                  onClick={() => setActiveTab('servidor')}
                  className={`flex-1 px-6 py-3 text-center font-medium transition-colors ${
                    activeTab === 'servidor'
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                        : 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  PANEL DE CONTROL DEL SERVIDOR
                </button>
                <button
                  onClick={() => setActiveTab('colecciones')}
                  className={`flex-1 px-6 py-3 text-center font-medium transition-colors ${
                    activeTab === 'colecciones'
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                        : 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  ANÁLISIS DE COLECCIONES
                </button>
              </div>
            </div>
          </div>

          {/* Contenido de pestañas */}
          {activeTab === 'metricas' && (
            <div>
              {/* Tarjetas de métricas */}
              <div className="mb-8">
                <DBMetricCards 
                  theme={theme}
                  loading={loadingMetrics}
                  error={!!metricsError}
                  totalSize={metrics?.db?.dataSize || 0}
                  totalDocs={metrics?.db?.objects || 0}
                  connections={metrics?.connections?.current || 0}
                  uptime={metrics?.serverStatus?.uptime || 0}
                  collectionsCount={metrics?.collections?.length || 0}
                  totalIndexSize={metrics?.collections?.reduce((acc, c) => acc + (c.totalIndexSize || 0), 0) || 0}
                  avgDocSize={(metrics?.db?.objects || 0) > 0 ? (metrics?.db?.dataSize || 0) / (metrics?.db?.objects || 1) : 0}
                  version={metrics?.serverStatus?.version || "N/A"}
                />
              </div>

              {/* Gráficos */}
              <div className="mb-8">
                <DBCharts 
                  theme={theme}
                  collections={metrics?.collections || []}
                  chartColors={chartColors}
                  totalSize={metrics?.db?.dataSize || 0}
                  totalDocs={metrics?.db?.objects || 0}
                />
              </div>
            </div>
          )}

          {activeTab === 'servidor' && (
            <div>
              {/* Información del servidor */}
              <div className="w-full max-w-7xl mx-auto">
                <DBServerInfo
                  theme={theme}
                  loading={loadingMetrics}
                  error={!!metricsError}
                  dbName={metrics?.db?.db || "N/A"}
                  host={metrics?.serverStatus?.host || "localhost"}
                  version={metrics?.serverStatus?.version || "N/A"}
                  uptime={metrics?.serverStatus?.uptime || 0}
                  connections={metrics?.connections?.current || 0}
                />
              </div>
            </div>
          )}

          {activeTab === 'colecciones' && (
            <div>
              {/* Tabla de colecciones */}
              <div className={`rounded-2xl overflow-hidden ${
                theme === "dark" 
                  ? "bg-linear-to-br from-gray-900/80 to-gray-800/80 border-gray-800" 
                  : "bg-linear-to-br from-white to-blue-50/50 border-blue-100"
              } border shadow-lg`}>
                <div className={`px-6 py-5 border-b ${
                  theme === "dark" ? "border-gray-800" : "border-blue-100"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-lg font-bold mb-1 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        <TranslateText text="Análisis de Colecciones" />
                      </h2>
                      <p className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}>
                        <TranslateText text="Desglose detallado por colección" />
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        theme === "dark" 
                          ? "bg-blue-600/20 text-blue-400" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {metrics?.collections?.length || 0} colecciones
                      </div>
                    </div>
                  </div>
                </div>

                {loadingMetrics ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-blue-600 mb-3"></div>
                      <p className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>
                        <TranslateText text="Cargando colecciones..." />
                      </p>
                    </div>
                  </div>
                ) : metricsError ? (
                  <div className="p-8 text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                    }`}>
                      <AlertTriangle className={`w-8 h-8 ${
                        theme === "dark" ? "text-gray-600" : "text-gray-400"
                      }`} />
                    </div>
                    <p className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
                      <TranslateText text="No se pudieron cargar las colecciones" />
                    </p>
                  </div>
                ) : metrics?.collections?.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`text-left ${
                          theme === "dark" 
                            ? "bg-gray-800/50 border-b border-gray-800" 
                            : "bg-blue-50/50 border-b border-blue-100"
                        }`}>
                          <th className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Database className={`w-4 h-4 ${
                                theme === "dark" ? "text-blue-400" : "text-blue-600"
                              }`} />
                              <span className={`text-xs font-semibold uppercase ${
                                theme === "dark" ? "text-gray-400" : "text-blue-600"
                              }`}>
                                <TranslateText text="Colección" />
                              </span>
                            </div>
                          </th>
                          <th className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Layers className={`w-4 h-4 ${
                                theme === "dark" ? "text-green-400" : "text-green-600"
                              }`} />
                              <span className={`text-xs font-semibold uppercase ${
                                theme === "dark" ? "text-gray-400" : "text-green-600"
                              }`}>
                                <TranslateText text="Documentos" />
                              </span>
                            </div>
                          </th>
                          <th className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <HardDrive className={`w-4 h-4 ${
                                theme === "dark" ? "text-purple-400" : "text-purple-600"
                              }`} />
                              <span className={`text-xs font-semibold uppercase ${
                                theme === "dark" ? "text-gray-400" : "text-purple-600"
                              }`}>
                                <TranslateText text="Tamaño" />
                              </span>
                            </div>
                          </th>
                          <th className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Activity className={`w-4 h-4 ${
                                theme === "dark" ? "text-pink-400" : "text-pink-600"
                              }`} />
                              <span className={`text-xs font-semibold uppercase ${
                                theme === "dark" ? "text-gray-400" : "text-pink-600"
                              }`}>
                                <TranslateText text="Índices" />
                              </span>
                            </div>
                          </th>
                          <th className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <TrendingUp className={`w-4 h-4 ${
                                theme === "dark" ? "text-amber-400" : "text-amber-600"
                              }`} />
                              <span className={`text-xs font-semibold uppercase ${
                                theme === "dark" ? "text-gray-400" : "text-amber-600"
                              }`}>
                                <TranslateText text="Distribución" />
                              </span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {(() => {
                          const itemsPerPage = 5;
                          const startIndex = (collectionsPage - 1) * itemsPerPage;
                          const endIndex = startIndex + itemsPerPage;
                          const displayedCollections = metrics?.collections?.slice(startIndex, endIndex) || [];
                          
                          return displayedCollections.map((col, i) => {
                            const percentage = metrics?.db?.objects > 0 
                              ? ((col.count / metrics.db.objects) * 100) 
                              : 0;
                            const sizeMB = col.size / 1024 / 1024;
                            const indexMB = col.totalIndexSize / 1024 / 1024;
                            const color = chartColors[(startIndex + i) % chartColors.length];
                            
                            return (
                              <tr 
                                key={col.name}
                                className={`group transition-all duration-200 ${
                                  theme === "dark" 
                                    ? "hover:bg-gray-800/30" 
                                    : "hover:bg-blue-50/30"
                                }`}
                              >
                                <td className={`px-6 py-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                  <div className="flex items-center gap-3">
                                    <div 
                                      className="w-3 h-3 rounded-full"
                                      style={{ backgroundColor: color }}
                                    />
                                    <div>
                                      <div className="font-medium text-sm">{col.name}</div>
                                      <div className={`text-xs ${
                                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                                      }`}>
                                        {col.avgObjSize ? `${(col.avgObjSize / 1024).toFixed(1)} KB promedio` : 'Sin tamaño promedio'}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className={`px-6 py-4 text-right ${
                                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                                }`}>
                                  <div className="text-sm font-semibold">
                                    {col.count.toLocaleString()}
                                  </div>
                                </td>
                                <td className={`px-6 py-4 text-right ${
                                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                                }`}>
                                  <div>
                                    <div className="text-sm font-semibold">
                                      {sizeMB.toFixed(2)} MB
                                    </div>
                                    <div className={`text-xs ${
                                      theme === "dark" ? "text-gray-500" : "text-gray-400"
                                    }`}>
                                      {(col.storageSize / 1024 / 1024).toFixed(1)} MB almacenamiento
                                    </div>
                                  </div>
                                </td>
                                <td className={`px-6 py-4 text-right ${
                                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                                }`}>
                                  <div>
                                    <div className="text-sm font-semibold">
                                      {indexMB.toFixed(2)} MB
                                    </div>
                                    <div className={`text-xs ${
                                      theme === "dark" ? "text-gray-500" : "text-gray-400"
                                    }`}>
                                      {col.totalIndexSize > 0 
                                        ? `${((indexMB / sizeMB) * 100).toFixed(1)}% del tamaño` 
                                        : 'Sin índices'
                                      }
                                    </div>
                                  </div>
                                </td>
                                <td className={`px-6 py-4 text-right ${
                                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                                }`}>
                                  <div className="flex items-center justify-end gap-3">
                                    <div className="w-24">
                                      <div className={`h-2 rounded-full overflow-hidden ${
                                        theme === "dark" ? "bg-gray-800" : "bg-gray-200"
                                      }`}>
                                        <div 
                                          className="h-full rounded-full"
                                          style={{ 
                                            width: `${percentage}%`,
                                            backgroundColor: color
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="text-sm font-semibold w-12 text-left">
                                      {percentage.toFixed(1)}%
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          });
                        })()}
                      </tbody>
                    </table>

                    {/* Controles de paginación */}
                    {(metrics?.collections?.length ?? 0) > 5 && (
                      <div className={`px-6 py-4 border-t ${theme === "dark" ? "border-gray-800" : "border-blue-100"}`}>
                        <div className="flex items-center justify-between">
                          <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            {(() => {
                              const itemsPerPage = 5;
                              const totalItems = metrics?.collections?.length || 0;
                              const startItem = (collectionsPage - 1) * itemsPerPage + 1;
                              const endItem = Math.min(collectionsPage * itemsPerPage, totalItems);
                              return `Mostrando ${startItem}-${endItem} de ${totalItems} colecciones`;
                            })()}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setCollectionsPage(Math.max(1, collectionsPage - 1))}
                              disabled={collectionsPage === 1}
                              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                collectionsPage === 1
                                  ? theme === "dark"
                                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : theme === "dark"
                                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              Anterior
                            </button>
                            
                            {(() => {
                              const itemsPerPage = 5;
                              const totalPages = Math.ceil((metrics?.collections?.length || 0) / itemsPerPage);
                              const pages = [];
                              const maxVisiblePages = 5;
                              let startPage = Math.max(1, collectionsPage - Math.floor(maxVisiblePages / 2));
                              let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                              
                              if (endPage - startPage + 1 < maxVisiblePages) {
                                startPage = Math.max(1, endPage - maxVisiblePages + 1);
                              }
                              
                              for (let i = startPage; i <= endPage; i++) {
                                pages.push(i);
                              }
                              
                              return pages.map(page => (
                                <button
                                  key={page}
                                  onClick={() => setCollectionsPage(page)}
                                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                    page === collectionsPage
                                      ? theme === "dark"
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-500 text-white"
                                      : theme === "dark"
                                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                  }`}
                                >
                                  {page}
                                </button>
                              ));
                            })()}
                            
                            <button
                              onClick={() => {
                                const itemsPerPage = 5;
                                const totalPages = Math.ceil((metrics?.collections?.length || 0) / itemsPerPage);
                                setCollectionsPage(Math.min(totalPages, collectionsPage + 1));
                              }}
                              disabled={collectionsPage === Math.ceil((metrics?.collections?.length || 0) / 5)}
                              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                collectionsPage === Math.ceil((metrics?.collections?.length || 0) / 5)
                                  ? theme === "dark"
                                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : theme === "dark"
                                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              Siguiente
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      theme === "dark" ? "bg-gray-800" : "bg-blue-50"
                    }`}>
                      <Database className={`w-8 h-8 ${
                        theme === "dark" ? "text-gray-600" : "text-blue-400"
                      }`} />
                    </div>
                    <p className={`text-sm font-medium mb-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
                      <TranslateText text="No hay colecciones disponibles" />
                    </p>
                    <p className={`text-xs ${
                      theme === "dark" ? "text-gray-500" : "text-gray-400"
                    }`}>
                      <TranslateText text="Las colecciones aparecerán aquí cuando existan datos" />
                    </p>
                  </div>
                )}

                {/* Footer de tabla */}
                {metrics?.collections?.length && (
                  <div className={`px-6 py-4 border-t ${
                    theme === "dark"
                      ? "border-gray-800 bg-gray-900/30"
                      : "border-blue-100 bg-blue-50/30"
                  }`}>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                      <div className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                        Mostrando {metrics?.collections?.length || 0} colecciones
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColors[0] }} />
                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                              Colección
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                              Documentos
                            </span>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded ${
                          theme === "dark"
                            ? "bg-gray-800 text-gray-300"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          Tamaño total: {((metrics?.db?.dataSize || 0) / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer del dashboard */}
          <div className={`mt-8 p-5 rounded-xl ${
            theme === "dark" 
              ? "bg-linear-to-r from-gray-900/50 to-gray-800/50 border border-gray-800" 
              : "bg-linear-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100"
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm">
                <p className={`font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  <TranslateText text="MongoDB Intelligence Dashboard" />
                </p>
                <p className={`text-xs ${
                  theme === "dark" ? "text-gray-500" : "text-gray-600"
                }`}>
                  <TranslateText text="Monitorización en tiempo real • Actualización automática • Análisis predictivo" />
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Zap className={`w-3 h-3 ${
                    theme === "dark" ? "text-amber-400" : "text-amber-500"
                  }`} />
                  <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                    Latencia: <span className="font-semibold">18ms</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className={`w-3 h-3 ${
                    theme === "dark" ? "text-blue-400" : "text-blue-500"
                  }`} />
                  <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                    CPU: <span className="font-semibold">24%</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Network className={`w-3 h-3 ${
                    theme === "dark" ? "text-green-400" : "text-green-500"
                  }`} />
                  <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                    I/O: <span className="font-semibold">45 MB/s</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}