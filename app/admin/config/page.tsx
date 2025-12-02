"use client";

import React, { useState } from "react";
import { Database, Activity, HardDrive, Users, Clock } from "lucide-react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import useSWR from 'swr';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
  } = useSWR<Metrics>("http://localhost:5000/admin/db/metrics", fetcher, {
    refreshInterval: 5000,
  });

  // handleSave y handleCancel eliminados (no usados)

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

        <main className="flex-1 p-8">
          {/* Header de la página */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-3 rounded-xl ${
                theme === "dark" ? "bg-blue-600 shadow-lg shadow-blue-500/50" : "bg-blue-600"
              }`}>
                <Database className="text-white" size={28} />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  <TranslateText text="Configuración de Base de Datos" />
                </h1>
                <p className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  <TranslateText text="Monitoreo y gestión de MongoDB" />
                </p>
              </div>
            </div>
          </div>

          {/* Tarjetas de métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className={`rounded-xl shadow-lg p-6 border ${
              theme === "dark" 
                ? "bg-gradient-to-br from-blue-900/30 to-gray-900 border-blue-800/30" 
                : "bg-white border-blue-200"
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <TranslateText text="Tamaño Total" />
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }`}>
                    {loadingMetrics ? "..." : metricsError ? "N/A" : 
                      metrics ? `${(metrics.db.dataSize / 1024 / 1024).toFixed(2)} MB` : "N/A"}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"
                }`}>
                  <HardDrive className={`w-8 h-8 ${
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }`} />
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-lg p-6 border ${
              theme === "dark" 
                ? "bg-gradient-to-br from-green-900/30 to-gray-900 border-green-800/30" 
                : "bg-white border-green-200"
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <TranslateText text="Documentos" />
                  </p>
                  <p className="text-2xl font-bold text-green-500 mt-1">
                    {loadingMetrics ? "..." : metricsError ? "N/A" : 
                      metrics ? metrics.db.objects.toLocaleString() : "N/A"}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-500/20">
                  <Database className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-lg p-6 border ${
              theme === "dark" 
                ? "bg-gradient-to-br from-purple-900/30 to-gray-900 border-purple-800/30" 
                : "bg-white border-purple-200"
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <TranslateText text="Conexiones" />
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${
                    theme === "dark" ? "text-purple-400" : "text-purple-600"
                  }`}>
                    {loadingMetrics ? "..." : metricsError ? "N/A" : 
                      metrics ? metrics.connections.current : "N/A"}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  theme === "dark" ? "bg-purple-500/20" : "bg-purple-100"
                }`}>
                  <Users className={`w-8 h-8 ${
                    theme === "dark" ? "text-purple-400" : "text-purple-600"
                  }`} />
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-lg p-6 border ${
              theme === "dark" 
                ? "bg-gradient-to-br from-orange-900/30 to-gray-900 border-orange-800/30" 
                : "bg-white border-orange-200"
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <TranslateText text="Uptime" />
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${
                    theme === "dark" ? "text-orange-400" : "text-orange-600"
                  }`}>
                    {loadingMetrics ? "..." : metricsError ? "N/A" : 
                      metrics ? `${Math.floor(metrics.serverStatus.uptime / 60)} min` : "N/A"}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  theme === "dark" ? "bg-orange-500/20" : "bg-orange-100"
                }`}>
                  <Clock className={`w-8 h-8 ${
                    theme === "dark" ? "text-orange-400" : "text-orange-600"
                  }`} />
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Resumen y Gráfica */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className={`rounded-xl shadow-lg p-6 border ${
              theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <Activity className={theme === "dark" ? "text-blue-400" : "text-blue-600"} size={24} />
                <h2 className={`text-xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  <TranslateText text="Información del Servidor" />
                </h2>
              </div>

              {loadingMetrics ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : metricsError ? (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
                  <TranslateText text="Error al cargar métricas del servidor" />
                </div>
              ) : metrics ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Base de datos:</span>
                    <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {metrics.db.db}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Host:</span>
                    <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {metrics.serverStatus.host}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Versión MongoDB:</span>
                    <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {metrics.serverStatus.version}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Estado:</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Conectado
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400"><TranslateText text="No hay métricas disponibles" /></div>
              )}
            </div>

            <div className={`rounded-xl shadow-lg p-6 border ${
              theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                <TranslateText text="Documentos por Colección" />
              </h2>

              {metrics?.collections?.length ? (
                <Bar
                  data={{
                    labels: metrics.collections.map((c) => c.name),
                    datasets: [
                      {
                        label: "Documentos",
                        data: metrics.collections.map((c) => c.count),
                        backgroundColor: theme === "dark" ? "rgba(96, 165, 250, 0.7)" : "rgba(37, 99, 235, 0.7)",
                        borderColor: theme === "dark" ? "rgba(59, 130, 246, 1)" : "rgba(29, 78, 216, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                        titleColor: theme === "dark" ? "#ffffff" : "#000000",
                        bodyColor: theme === "dark" ? "#ffffff" : "#000000",
                        borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                        borderWidth: 1,
                      },
                    },
                    scales: {
                      x: {
                        ticks: { color: theme === "dark" ? "#9ca3af" : "#4b5563" },
                        grid: { color: theme === "dark" ? "#374151" : "#e5e7eb" },
                      },
                      y: {
                        ticks: { color: theme === "dark" ? "#9ca3af" : "#4b5563" },
                        grid: { color: theme === "dark" ? "#374151" : "#e5e7eb" },
                      },
                    },
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                  <TranslateText text="No hay datos disponibles" />
                </div>
              )}
            </div>
          </div>

          {/* Tabla de colecciones */}
          <div className={`rounded-xl shadow-lg overflow-hidden border mb-8 ${
            theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-xl font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                <TranslateText text="Colecciones Detalladas" />
              </h2>
            </div>

            {metrics?.collections?.length ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={theme === "dark" ? "bg-gray-800" : "bg-gray-50"}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        <TranslateText text="Colección" />
                      </th>
                      <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        <TranslateText text="Documentos" />
                      </th>
                      <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        <TranslateText text="Tamaño (MB)" />
                      </th>
                      <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        <TranslateText text="Índices (MB)" />
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
                    {metrics.collections.map((col) => (
                      <tr key={col.name} className={`transition-colors ${
                        theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-50"
                      }`}>
                        <td className={`px-6 py-4 whitespace-nowrap font-medium ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                          {col.name}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-right ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}>
                          {col.count.toLocaleString()}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-right ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}>
                          {(col.size / 1024 / 1024).toFixed(2)}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-right ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}>
                          {(col.totalIndexSize / 1024 / 1024).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-12 text-center text-gray-400">
                <TranslateText text="No hay colecciones disponibles" />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}