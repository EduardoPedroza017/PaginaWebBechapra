"use client";

import { useEffect, useState } from "react";

import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { ExportAuditLogsButton } from "./ExportAuditLogsButton";
import { TranslateText } from "@/components/TranslateText";

// Componentes modularizados
import { MetricCard } from "./MetricCard";
import { AuditLogFilters } from "./AuditLogFilters";
import { AuditLogCharts } from "./AuditLogCharts";
import { AuditLogTable } from "./AuditLogTable";
import { DbMetricsSection } from "./DbMetricsSection";

export type AuditLogFiltersState = {
  user: string;
  ip: string;
  success: '' | 'success' | 'fail';
  date: string;
};

interface AuditLogEntry {
  user_id: string;
  timestamp?: string;
  ip?: string;
  user_agent?: string;
  success: boolean;
  reason?: string;
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [filters, setFilters] = useState<AuditLogFiltersState>({ user: '', ip: '', success: '', date: '' });
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'audit' | 'database'>('audit');

  // Cargar tema desde localStorage después de montar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('role');
    window.location.href = '/admin';
  };

  useEffect(() => {
    const admin = sessionStorage.getItem("admin") === "true";
    const role = sessionStorage.getItem("role") || "";
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${apiBase}/admin/audit`, {
      headers: {
        "Content-Type": "application/json",
        "X-Admin": String(admin),
        "X-Role": role,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch(() => {
        setError("No autorizado o error de servidor");
        setLoading(false);
      });
  }, []);

  // Filtrado de logs
  const filteredLogs = logs.filter(log => {
    if (filters.user && !log.user_id.toLowerCase().includes(filters.user.toLowerCase())) return false;
    if (filters.ip && (!log.ip || !log.ip.includes(filters.ip))) return false;
    if (filters.success === 'success' && !log.success) return false;
    if (filters.success === 'fail' && log.success) return false;
    if (filters.date && log.timestamp) {
      const logDate = new Date(log.timestamp);
      const filterDate = new Date(filters.date);
      if (
        logDate.getFullYear() !== filterDate.getFullYear() ||
        logDate.getMonth() !== filterDate.getMonth() ||
        logDate.getDate() !== filterDate.getDate()
      ) return false;
    }
    return true;
  });

  // Paginación
  const rowsPerPage = 10;
  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
  const paginatedLogs = filteredLogs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Reset página al cambiar filtros
  useEffect(() => {
    if (page !== 1) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  if (loading) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            <TranslateText text="Cargando auditoría..." />
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="text-center p-8">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  // Métricas calculadas
  const total = filteredLogs.length;
  const successCount = filteredLogs.filter(l => l.success).length;
  const failCount = total - successCount;
  const successRate = total > 0 ? Math.round((successCount / total) * 100) : 0;

  // Datos agrupados para gráficas
  const byUser: { [key: string]: number } = {};
  const byDate: { [key: string]: number } = {};
  
  filteredLogs.forEach(log => {
    byUser[log.user_id] = (byUser[log.user_id] || 0) + 1;
    if (log.timestamp) {
      const date = new Date(log.timestamp).toLocaleDateString();
      byDate[date] = (byDate[date] || 0) + 1;
    }
  });

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      <Sidebar selected="/admin/audit-log" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="flex-1 p-6 lg:p-8">
          {/* Encabezado */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className={`text-2xl lg:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Centro de Auditoría" />
                </h1>
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Monitoreo y análisis de accesos al sistema" />
                </p>
              </div>
              <ExportAuditLogsButton logs={logs} />
            </div>
          </div>

          {/* Tabs de navegación */}
          <div className="mb-6">
            <div className={`inline-flex rounded-xl p-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'audit'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : theme === 'dark' 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TranslateText text="Logs de Acceso" />
              </button>
              <button
                onClick={() => setActiveTab('database')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'database'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : theme === 'dark' 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TranslateText text="Métricas de BD" />
              </button>
            </div>
          </div>

          {activeTab === 'audit' ? (
            <div className="space-y-6">
              {/* Filtros */}
              <AuditLogFilters 
                filters={filters} 
                setFilters={setFilters} 
                theme={theme} 
              />

              {/* Métricas principales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  icon="📊"
                  title="Total Registros"
                  value={total.toLocaleString()}
                  color="blue"
                  theme={theme}
                />
                <MetricCard
                  icon="✓"
                  title="Exitosos"
                  value={successCount.toLocaleString()}
                  color="green"
                  theme={theme}
                />
                <MetricCard
                  icon="✗"
                  title="Fallidos"
                  value={failCount.toLocaleString()}
                  color="red"
                  theme={theme}
                />
                <MetricCard
                  icon="📈"
                  title="Tasa de Éxito"
                  value={`${successRate}%`}
                  color="purple"
                  theme={theme}
                />
              </div>

              {/* Gráficas */}
              <AuditLogCharts
                successCount={successCount}
                failCount={failCount}
                byUser={byUser}
                byDate={byDate}
                theme={theme}
              />

              {/* Tabla de logs */}
              <AuditLogTable
                logs={paginatedLogs}
                theme={theme}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          ) : (
            <DbMetricsSection theme={theme} />
          )}
        </main>
      </div>
    </div>
  );
}
