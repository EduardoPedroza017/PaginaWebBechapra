"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { ExportAuditLogsButton } from "./ExportAuditLogsButton";
import { TranslateText } from "@/components/TranslateText";
import { Activity, CheckCircle, XCircle, BarChart3, Database, Shield, AlertTriangle, RefreshCw } from "lucide-react";

// Componentes modularizados
import { MetricCard } from "./MetricCard";
import { AuditLogFilters } from "./AuditLogFilters";
import { AuditLogCharts } from "./AuditLogCharts";
import { AuditLogTable } from "./AuditLogTable";
import { DbMetricsSection } from "./DbMetricsSection";

import dynamic from "next/dynamic";

// Importación dinámica para evitar problemas de SSR
const AdminAuditLogSection = dynamic(() => import("../dashboard/AdminAuditLogSection"), { 
  ssr: false,
  loading: () => (
    <div className="py-8 text-center text-gray-400">
      <TranslateText text="Cargando registros administrativos..." />
    </div>
  )
});

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
  geo?: { country?: string; city?: string };
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [filters, setFilters] = useState<AuditLogFiltersState>({ 
    user: '', 
    ip: '', 
    success: '', 
    dateFrom: '', 
    dateTo: '' 
  });
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'audit' | 'database'>('audit');
  const [refreshing, setRefreshing] = useState(false);

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

  const fetchAuditLogs = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const admin = sessionStorage.getItem("admin") === "true";
      const role = sessionStorage.getItem("role") || "";
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      
      const response = await fetch(`${apiBase}/admin/audit`, {
        headers: {
          "Content-Type": "application/json",
          "X-Admin": String(admin),
          "X-Role": role,
        },
      });

      if (!response.ok) {
        throw new Error("No autorizado");
      }

      const data = await response.json();
      setLogs(data.logs || []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  // Reset página al cambiar filtros
  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [filters, page]);

  // Filtrado de logs usando useMemo para mejor performance
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      if (filters.user && !log.user_id.toLowerCase().includes(filters.user.toLowerCase())) return false;
      if (filters.ip && (!log.ip || !log.ip.toLowerCase().includes(filters.ip.toLowerCase()))) return false;
      if (filters.success === 'success' && !log.success) return false;
      if (filters.success === 'fail' && log.success) return false;
      
      if (log.timestamp) {
        const logDate = new Date(log.timestamp);
        
        if (filters.dateFrom) {
          const filterFrom = new Date(filters.dateFrom);
          if (logDate < filterFrom) return false;
        }
        
        if (filters.dateTo) {
          const filterTo = new Date(filters.dateTo);
          filterTo.setHours(23, 59, 59, 999);
          if (logDate > filterTo) return false;
        }
      }
      
      return true;
    });
  }, [logs, filters]);

  // Detección de anomalías usando useMemo
  const anomalies = useMemo(() => {
    const ipFailCounts: { [key: string]: number } = {};
    logs.forEach(log => {
      if (!log.success && log.ip) {
        ipFailCounts[log.ip] = (ipFailCounts[log.ip] || 0) + 1;
      }
    });
    
    const suspiciousIPs = Object.entries(ipFailCounts)
      .filter(([, count]) => count >= 3)
      .map(([ip, count]) => ({ ip, count }));
    
    return {
      hasAnomalies: suspiciousIPs.length > 0,
      suspiciousIPs,
      totalSuspicious: suspiciousIPs.length
    };
  }, [logs]);

  // Paginación
  const rowsPerPage = 20;
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / rowsPerPage));
  const paginatedLogs = filteredLogs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Métricas calculadas usando useMemo
  const metrics = useMemo(() => {
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

    return {
      total,
      successCount,
      failCount,
      successRate,
      totalTrend,
      successTrend,
      failTrend,
      rateTrend
    };
  }, [filteredLogs, logs]);

  // Datos agrupados para gráficas usando useMemo
  const chartData = useMemo(() => {
    const byUser: { [key: string]: number } = {};
    const byDate: { [key: string]: number } = {};
    
    filteredLogs.forEach(log => {
      byUser[log.user_id] = (byUser[log.user_id] || 0) + 1;
      if (log.timestamp) {
        const date = new Date(log.timestamp).toLocaleDateString();
        byDate[date] = (byDate[date] || 0) + 1;
      }
    });

    return { byUser, byDate };
  }, [filteredLogs]);

  if (loading && !refreshing) {
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

  if (error && !refreshing) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="text-center p-8 max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 text-lg font-medium mb-4">{error}</p>
          <button
            onClick={() => fetchAuditLogs(true)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-red-100 hover:bg-red-200 text-red-700'
            }`}
          >
            <TranslateText text="Reintentar" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <Sidebar selected="/admin/audit-log" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-400 mx-auto w-full">
          {/* Header principal */}
          <div className="mb-6">
            <div className={`rounded-2xl p-5 md:p-6 border ${
              theme === 'dark'
                ? 'bg-linear-to-br from-gray-900 to-gray-800 border-gray-800'
                : 'bg-linear-to-br from-white to-gray-50 border-gray-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
                  }`}>
                    <Shield className={`w-6 h-6 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h1 className={`text-xl md:text-2xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      <TranslateText text="Centro de Auditoría" />
                    </h1>
                    <p className={`text-sm mt-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <TranslateText text="Monitoreo y análisis de accesos al sistema" />
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => fetchAuditLogs(true)}
                    disabled={refreshing}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    } ${refreshing ? 'opacity-50' : ''}`}
                  >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    <TranslateText text="Actualizar" />
                  </button>
                  <ExportAuditLogsButton logs={logs} theme={theme} />
                </div>
              </div>
            </div>
          </div>

          {/* Métricas principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon={<Activity className="w-6 h-6 text-blue-500" />}
              title="Total Registros"
              value={metrics.total.toLocaleString()}
              color="blue"
              theme={theme}
              trend={metrics.totalTrend}
              loading={refreshing}
            />
            <MetricCard
              icon={<CheckCircle className="w-6 h-6 text-green-500" />}
              title="Exitosos"
              value={metrics.successCount.toLocaleString()}
              color="green"
              theme={theme}
              trend={metrics.successTrend}
              loading={refreshing}
            />
            <MetricCard
              icon={<XCircle className="w-6 h-6 text-red-500" />}
              title="Fallidos"
              value={metrics.failCount.toLocaleString()}
              color="red"
              theme={theme}
              trend={metrics.failTrend}
              loading={refreshing}
              anomaly={anomalies.hasAnomalies}
            />
            <MetricCard
              icon={<BarChart3 className="w-6 h-6 text-purple-500" />}
              title="Tasa de Éxito"
              value={`${metrics.successRate}%`}
              color="purple"
              theme={theme}
              trend={metrics.rateTrend}
              loading={refreshing}
              anomaly={metrics.successRate < 85}
            />
          </div>

          {/* Gráficas */}
          <AuditLogCharts
            successCount={metrics.successCount}
            failCount={metrics.failCount}
            byUser={chartData.byUser}
            byDate={chartData.byDate}
            theme={theme}
          />

          {/* Tabla de logs de accesos */}
          <AuditLogTable
            logs={paginatedLogs}
            theme={theme}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            totalItems={filteredLogs.length}
            itemsPerPage={rowsPerPage}
          />

          {/* Sección de acciones administrativas */}
          <div className="mt-12">
            <AdminAuditLogSection />
          </div>
        </main>
      </div>
    </div>
  );
}