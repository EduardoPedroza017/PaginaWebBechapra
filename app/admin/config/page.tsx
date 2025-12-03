"use client";

import React, { useState } from "react";
import { Database, Activity, HardDrive, Users, Clock, Server, Layers, RefreshCw } from "lucide-react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import useSWR from 'swr';
import { Bar, Doughnut } from 'react-chartjs-2';

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
  // Configuración eliminada: uri, dbName, editMode, saved (no usados)

  // Tema con persistencia y SSR-safe
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  // Obtener métricas de Mongo (SWR)
  const {
    data: metrics,
    error: metricsError,
    isLoading: loadingMetrics,
    mutate: refreshMetrics,
  } = useSWR<Metrics>("http://localhost:5000/admin/db/metrics", fetcher, {
    refreshInterval: 10000,
  });

  // Calcular totales
  const totalSize = metrics?.db?.dataSize ?? 0;
  const totalDocs = metrics?.db?.objects ?? 0;
  const totalIndexSize = metrics?.collections?.reduce((acc, c) => acc + (c.totalIndexSize || 0), 0) ?? 0;
  const avgDocSize = totalDocs > 0 ? totalSize / totalDocs : 0;

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

  // Helper para formatear uptime
  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  if (!mounted) {
    // Render a placeholder to avoid hydration mismatch
    return <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" />;
  }

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-gray-950" : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
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

        <main className="flex-1 p-6 lg:p-8">
          {/* Header de la página */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${
                  theme === "dark" ? "bg-blue-600 shadow-lg shadow-blue-500/30" : "bg-blue-600"
                }`}>
                  <Database className="text-white" size={24} />
                </div>
                <div>
                  <h1 className={`text-2xl lg:text-3xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    <TranslateText text="Base de Datos" />
                  </h1>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <TranslateText text="Monitoreo y métricas de MongoDB" />
                  </p>
                </div>
              </div>
              <button
                onClick={() => refreshMetrics()}
                disabled={loadingMetrics}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
                } ${loadingMetrics ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <RefreshCw className={`w-4 h-4 ${loadingMetrics ? "animate-spin" : ""}`} />
                <TranslateText text="Actualizar" />
              </button>
            </div>
          </div>

          {/* Tarjetas de métricas principales */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${
              theme === "dark" 
                ? "bg-gray-900/50 border-gray-800" 
                : "bg-white border-gray-200"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}>
                    <TranslateText text="Tamaño Total" />
                  </p>
                  <p className="text-2xl font-semibold text-blue-500">
                    {loadingMetrics ? "..." : metricsError ? "N/A" : 
                      `${(totalSize / 1024 / 1024).toFixed(2)} MB`}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <HardDrive className="w-5 h-5 text-blue-500" />
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${
              theme === "dark" 
                ? "bg-gray-900/50 border-gray-800" 
                : "bg-white border-gray-200"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}>
                    <TranslateText text="Documentos" />
                  </p>
                  <p className="text-2xl font-semibold text-green-500">
                    {loadingMetrics ? "..." : metricsError ? "N/A" : 
                      totalDocs.toLocaleString()}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${
              theme === "dark" 
                ? "bg-gray-900/50 border-gray-800" 
                : "bg-white border-gray-200"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}>
                    <TranslateText text="Conexiones" />
                  </p>
                  <p className="text-2xl font-semibold text-purple-500">
                    {loadingMetrics ? "..." : metricsError ? "N/A" : 
                      metrics?.connections?.current ?? "N/A"}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${
              theme === "dark" 
                ? "bg-gray-900/50 border-gray-800" 
                : "bg-white border-gray-200"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}>
                    <TranslateText text="Uptime" />
                  </p>
                  <p className="text-2xl font-semibold text-amber-500">
                    {loadingMetrics ? "..." : metricsError ? "N/A" : 
                      metrics?.serverStatus?.uptime 
                        ? formatUptime(metrics.serverStatus.uptime) 
                        : "N/A"}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Segunda fila de métricas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${
              theme === "dark" 
                ? "bg-gray-900/50 border-gray-800" 
                : "bg-white border-gray-200"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}>
                    <TranslateText text="Colecciones" />
                  </p>
                  <p className="text-2xl font-semibold text-cyan-500">
                    {loadingMetrics ? "..." : metricsError ? "N/A" : 
                      metrics?.collections?.length ?? 0}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-cyan-500" />
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${
              theme === "dark" 
                ? "bg-gray-900/50 border-gray-800" 
                : "bg-white border-gray-200"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}>
                    <TranslateText text="Tamaño Índices" />
                  </p>
                  <p className="text-2xl font-semibold text-pink-500">
                    {loadingMetrics ? "..." : metricsError ? "N/A" : 
                      `${(totalIndexSize / 1024 / 1024).toFixed(2)} MB`}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-pink-500" />
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${
              theme === "dark" 
                ? "bg-gray-900/50 border-gray-800" 
                : "bg-white border-gray-200"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}>
                    <TranslateText text="Prom. Doc" />
                  </p>
                  <p className="text-2xl font-semibold text-orange-500">
                    {loadingMetrics ? "..." : metricsError ? "N/A" : 
                      `${(avgDocSize / 1024).toFixed(2)} KB`}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Server className="w-5 h-5 text-orange-500" />
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${
              theme === "dark" 
                ? "bg-gray-900/50 border-gray-800" 
                : "bg-white border-gray-200"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}>
                    <TranslateText text="Versión" />
                  </p>
                  <p className="text-2xl font-semibold text-indigo-500">
                    {loadingMetrics ? "..." : metricsError ? "N/A" : 
                      metrics?.serverStatus?.version ?? "N/A"}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <span className="text-indigo-500 text-lg">🍃</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Gráficas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            {/* Gráfica de Documentos por Colección */}
            <div className={`rounded-2xl p-5 border lg:col-span-2 ${
              theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"
            }`}>
              <h2 className={`text-sm font-medium mb-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                <TranslateText text="Documentos por Colección" />
              </h2>

              {metrics?.collections?.length ? (
                <div className="h-64">
                  <Bar
                    data={{
                      labels: metrics.collections.map((c) => c.name),
                      datasets: [
                        {
                          label: "Documentos",
                          data: metrics.collections.map((c) => c.count),
                          backgroundColor: chartColors.slice(0, metrics.collections.length),
                          borderRadius: 4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                      },
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
            <div className={`rounded-2xl p-5 border ${
              theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"
            }`}>
              <h2 className={`text-sm font-medium mb-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                <TranslateText text="Distribución de Tamaño" />
              </h2>

              {metrics?.collections?.length ? (
                <div className="h-64 flex items-center justify-center">
                  <Doughnut
                    data={{
                      labels: metrics.collections.map((c) => c.name),
                      datasets: [
                        {
                          data: metrics.collections.map((c) => c.size),
                          backgroundColor: chartColors.slice(0, metrics.collections.length),
                          borderWidth: 0,
                          hoverOffset: 4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      cutout: '60%',
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: { 
                            color: theme === "dark" ? "#9ca3af" : "#4b5563",
                            padding: 12,
                            font: { size: 10 }
                          }
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

          {/* Grid de Información del Servidor y Tabla */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            {/* Información del Servidor */}
            <div className={`rounded-2xl p-5 border ${
              theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <Server className={theme === "dark" ? "text-blue-400" : "text-blue-600"} size={18} />
                <h2 className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  <TranslateText text="Información del Servidor" />
                </h2>
              </div>

              {loadingMetrics ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                </div>
              ) : metricsError ? (
                <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-3 text-red-600 dark:text-red-400 text-sm">
                  <TranslateText text="Error al cargar" />
                </div>
              ) : metrics ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Base de datos</span>
                    <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {metrics.db.db}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Host</span>
                    <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"} truncate max-w-[150px]`}>
                      {metrics.serverStatus.host}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Versión</span>
                    <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {metrics.serverStatus.version}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Estado</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                      Conectado
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm"><TranslateText text="Sin datos" /></div>
              )}
            </div>

          {/* Tabla de colecciones */}
            <div className={`rounded-2xl overflow-hidden border lg:col-span-2 ${
              theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"
            }`}>
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  <TranslateText text="Detalle de Colecciones" />
                </h2>
              </div>

              {metrics?.collections?.length ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                    <thead className={theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"}>
                      <tr>
                        <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}>
                          <TranslateText text="Colección" />
                        </th>
                        <th className={`px-5 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}>
                          <TranslateText text="Docs" />
                        </th>
                        <th className={`px-5 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}>
                          <TranslateText text="Tamaño" />
                        </th>
                        <th className={`px-5 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}>
                          <TranslateText text="Índices" />
                        </th>
                        <th className={`px-5 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}>
                          <TranslateText text="% Total" />
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === "dark" ? "divide-gray-800" : "divide-gray-100"}`}>
                      {metrics.collections.map((col, i) => {
                        const percentage = totalDocs > 0 ? ((col.count / totalDocs) * 100).toFixed(1) : '0';
                        return (
                          <tr key={col.name} className={`transition-colors ${
                            theme === "dark" ? "hover:bg-gray-800/30" : "hover:bg-gray-50"
                          }`}>
                            <td className={`px-5 py-3 whitespace-nowrap text-sm font-medium ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}>
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColors[i % chartColors.length] }}></span>
                                {col.name}
                              </div>
                            </td>
                            <td className={`px-5 py-3 whitespace-nowrap text-sm text-right ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              {col.count.toLocaleString()}
                            </td>
                            <td className={`px-5 py-3 whitespace-nowrap text-sm text-right ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              {(col.size / 1024).toFixed(1)} KB
                            </td>
                            <td className={`px-5 py-3 whitespace-nowrap text-sm text-right ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              {(col.totalIndexSize / 1024).toFixed(1)} KB
                            </td>
                            <td className={`px-5 py-3 whitespace-nowrap text-sm text-right ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              <div className="flex items-center justify-end gap-2">
                                <div className={`w-12 h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                  <div 
                                    className="h-full rounded-full" 
                                    style={{ 
                                      width: `${percentage}%`, 
                                      backgroundColor: chartColors[i % chartColors.length] 
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
              ) : (
                <div className="px-5 py-12 text-center text-gray-400 text-sm">
                  <TranslateText text="No hay colecciones disponibles" />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}