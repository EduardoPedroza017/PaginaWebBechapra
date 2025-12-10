"use client";

import { useEffect, useState } from "react";

import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { ExportAuditLogsButton } from "./ExportAuditLogsButton";
import { TranslateText } from "@/components/TranslateText";
import { Activity, CheckCircle, XCircle, BarChart3 } from "lucide-react";

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
  dateFrom: string;
  dateTo: string;
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
  const [filters, setFilters] = useState<AuditLogFiltersState>({ user: '', ip: '', success: '', dateFrom: '', dateTo: '' });
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
    if (filters.dateFrom && log.timestamp) {
      const logDate = new Date(log.timestamp);
      const filterDate = new Date(filters.dateFrom);
      if (logDate < filterDate) return false;
    }
    if (filters.dateTo && log.timestamp) {
      const logDate = new Date(log.timestamp);
      const filterDate = new Date(filters.dateTo);
      filterDate.setHours(23, 59, 59, 999);
      if (logDate > filterDate) return false;
    }
    return true;
  });

  // Detección de anomalías: múltiples fallos desde la misma IP
  const ipFailCounts: { [key: string]: number } = {};
  logs.forEach(log => {
    if (!log.success && log.ip) {
      ipFailCounts[log.ip] = (ipFailCounts[log.ip] || 0) + 1;
    }
  });
  const hasAnomalies = Object.values(ipFailCounts).some(count => count >= 5);

  // Paginación - Cambiado a 20 filas por página
  const rowsPerPage = 20;
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

  // Calcular trends comparando última semana vs semana anterior
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const lastWeekLogs = logs.filter(log => log.timestamp && new Date(log.timestamp) >= weekAgo);
  const prevWeekLogs = logs.filter(log => log.timestamp && new Date(log.timestamp) >= twoWeeksAgo && new Date(log.timestamp) < weekAgo);

  const lastWeekTotal = lastWeekLogs.length;
  const prevWeekTotal = prevWeekLogs.length;
  const totalTrend = prevWeekTotal > 0 ? Math.round(((lastWeekTotal - prevWeekTotal) / prevWeekTotal) * 100) : 0;

  const lastWeekSuccess = lastWeekLogs.filter(l => l.success).length;
  const prevWeekSuccess = prevWeekLogs.filter(l => l.success).length;
  const successTrend = prevWeekSuccess > 0 ? Math.round(((lastWeekSuccess - prevWeekSuccess) / prevWeekSuccess) * 100) : 0;

  const lastWeekFail = lastWeekLogs.length - lastWeekSuccess;
  const prevWeekFail = prevWeekLogs.length - prevWeekSuccess;
  const failTrend = prevWeekFail > 0 ? Math.round(((lastWeekFail - prevWeekFail) / prevWeekFail) * 100) : 0;

  const lastWeekRate = lastWeekLogs.length > 0 ? Math.round((lastWeekSuccess / lastWeekLogs.length) * 100) : 0;
  const prevWeekRate = prevWeekLogs.length > 0 ? Math.round((prevWeekSuccess / prevWeekLogs.length) * 100) : 0;
  const rateTrend = prevWeekRate > 0 ? lastWeekRate - prevWeekRate : 0;

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
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-white via-slate-50 to-slate-100'}`}>
      <Sidebar selected="/admin/audit-log" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="flex-1 p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          {/* Encabezado mejorado */}
          <div className="mb-8">
            <div className={`rounded-2xl p-6 border backdrop-blur-xl transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-700/50 shadow-lg shadow-blue-500/10'
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200/60 shadow-lg shadow-blue-500/10'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                    Centro de Auditoría
                  </h1>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Monitoreo y análisis de accesos al sistema
                  </p>
                </div>
                <ExportAuditLogsButton logs={logs} />
              </div>
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
                  icon={<Activity className="w-6 h-6 text-blue-500" />}
                  title="Total Registros"
                  value={total.toLocaleString()}
                  color="blue"
                  theme={theme}
                  trend={totalTrend}
                />
                <MetricCard
                  icon={<CheckCircle className="w-6 h-6 text-green-500" />}
                  title="Exitosos"
                  value={successCount.toLocaleString()}
                  color="green"
                  theme={theme}
                  trend={successTrend}
                />
                <MetricCard
                  icon={<XCircle className="w-6 h-6 text-red-500" />}
                  title="Fallidos"
                  value={failCount.toLocaleString()}
                  color="red"
                  theme={theme}
                  trend={failTrend}
                  anomaly={hasAnomalies}
                />
                <MetricCard
                  icon={<BarChart3 className="w-6 h-6 text-purple-500" />}
                  title="Tasa de Éxito"
                  value={`${successRate}%`}
                  color="purple"
                  theme={theme}
                  trend={rateTrend}
                  anomaly={successRate < 85}
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
          ) : null}
        </main>
      </div>
    </div>
  );
}
