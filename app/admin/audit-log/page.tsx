"use client";

import { useEffect, useState, useMemo, useCallback } from "react";

import { ExportAuditLogsButton } from "./ExportAuditLogsButton";
import { TranslateText } from "@/components/TranslateText";
import { Activity, CheckCircle, XCircle, BarChart3, Shield, RefreshCw } from "lucide-react";

// Componentes modularizados
import { MetricCard } from "./MetricCard";
import { AuditLogFilters } from "./AuditLogFilters";
import { AuditLogCharts } from "./AuditLogCharts";
import { AuditLogTable } from "./AuditLogTable";

import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";
import { useTheme } from "../hooks";

type TabId = 'centro' | 'registros';

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
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();
  const themeStrict: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  const [filters, setFilters] = useState<AuditLogFiltersState>({ 
    user: '', 
    ip: '', 
    success: '', 
    dateFrom: '', 
    dateTo: '' 
  });
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>("centro");
  const [refreshing, setRefreshing] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 5;
  
  const [loadingTabs, setLoadingTabs] = useState<Record<TabId, boolean>>({
    centro: false,
    registros: false,
  });

  const handleTabChange = async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 300));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAuditLogs(true);
  }, []);

  const fetchAuditLogs = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const tryAdminAudit = async () => {
        return fetch('/web/api/backend/admin/auth/audit-admin', {
          credentials: 'include',
        });
      };

      const tryLoginAudit = async () => {
        return fetch('/web/api/backend/admin/auth/audit', {
          credentials: 'include',
        });
      };

      let response = await tryAdminAudit();
      if (!response.ok) {
        response = await tryLoginAudit();
      }

      if (!response.ok) {
        throw new Error("No autorizado");
      }

      const data = await response.json();

      let items: any[] = [];
      if (data.logs && Array.isArray(data.logs)) {
        items = data.logs;
      } else if (data.data && Array.isArray(data.data.items)) {
        items = data.data.items;
      } else if (Array.isArray(data)) {
        items = data;
      }

      const normalized = items.map((it: any) => {
        if (it.user_id || typeof it.success !== 'undefined') {
          return it as AuditLogEntry;
        }
        return {
          user_id: it.by || it.user || it.user_id || 'system',
          timestamp: it.timestamp ? (typeof it.timestamp === 'string' ? it.timestamp : new Date(it.timestamp).toISOString()) : undefined,
          ip: it.ip || undefined,
          user_agent: it.user_agent || undefined,
          success: typeof it.success === 'boolean' ? it.success : true,
          reason: it.action || (it.details && JSON.stringify(it.details)) || it.reason || undefined,
          geo: it.geo || undefined
        } as AuditLogEntry;
      });

      setLogs(normalized || []);
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

  // Reset page when filters change
  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages, page, setPage]);

  // Filtrado de logs usando useMemo
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

  // Detección de anomalías
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

  // Métricas calculadas
  const metrics = useMemo(() => {
    const total = filteredLogs.length;
    const successCount = filteredLogs.filter(l => l.success).length;
    const failCount = total - successCount;
    const successRate = total > 0 ? Math.round((successCount / total) * 100) : 0;

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

  // Datos agrupados para gráficas
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

  const tabs: TabItem[] = [
    { id: 'centro', label: 'Centro de Auditoría', icon: <Shield size={18} /> },
    { id: 'registros', label: 'Registros', icon: <Activity size={18} /> },
  ];

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className={themeStrict === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            <TranslateText text="Cargando auditoría..." />
          </p>
        </div>
      </div>
    );
  }

  if (error && !refreshing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full ${
            themeStrict === 'dark' ? 'bg-red-900/30' : 'bg-red-100'
          }`}>
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <p className={themeStrict === 'dark' ? 'text-red-400' : 'text-red-600'}>{error}</p>
          <button
            onClick={() => fetchAuditLogs(true)}
            className={`mt-4 px-6 py-2 rounded-lg font-medium transition-colors ${
              themeStrict === 'dark'
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
    <div className="min-h-screen">
      <AdminPageHeader
        title="Centro de Auditoría"
        subtitle="Monitoreo y análisis de accesos al sistema"
        icon={<Shield className="w-6 h-6 text-white" />}
        iconColor="blue"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: refreshing },
          custom: <ExportAuditLogsButton logs={logs} theme={themeStrict} />
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Auditoría" }]}
      />

      <AdminTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tabId) => handleTabChange(tabId as TabId)}
        loadingTabs={loadingTabs}
        theme={themeStrict}
        variant="pills"
      />

      <AdminSection theme={themeStrict}>
        {activeTab === 'centro' && (
          <>
            {/* Export button */}
            <div className="flex justify-end mb-4">
              <ExportAuditLogsButton logs={logs} theme={themeStrict} />
            </div>

            {/* Métricas principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard
                icon={<Activity className="w-6 h-6 text-blue-500" />}
                title="Total Registros"
                value={metrics.total.toLocaleString()}
                color="blue"
                theme={themeStrict}
                trend={metrics.totalTrend}
                loading={refreshing}
              />
              <MetricCard
                icon={<CheckCircle className="w-6 h-6 text-green-500" />}
                title="Exitosos"
                value={metrics.successCount.toLocaleString()}
                color="green"
                theme={themeStrict}
                trend={metrics.successTrend}
                loading={refreshing}
              />
              <MetricCard
                icon={<XCircle className="w-6 h-6 text-red-500" />}
                title="Fallidos"
                value={metrics.failCount.toLocaleString()}
                color="red"
                theme={themeStrict}
                trend={metrics.failTrend}
                loading={refreshing}
                anomaly={anomalies.hasAnomalies}
              />
              <MetricCard
                icon={<BarChart3 className="w-6 h-6 text-purple-500" />}
                title="Tasa de Éxito"
                value={`${metrics.successRate}%`}
                color="purple"
                theme={themeStrict}
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
              theme={themeStrict}
            />
          </>
        )}

        {activeTab === 'registros' && (
          <>
            {/* Filtros */}
            <AuditLogFilters
              filters={filters}
              setFilters={setFilters}
              theme={themeStrict}
            />

            {/* Tabla de logs */}
            <AuditLogTable
              logs={filteredLogs}
              theme={themeStrict}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              totalItems={filteredLogs.length}
              itemsPerPage={rowsPerPage}
            />
          </>
        )}
      </AdminSection>
    </div>
  );
}

