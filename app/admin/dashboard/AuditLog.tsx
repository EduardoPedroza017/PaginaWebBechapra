"use client";

import { useEffect, useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import { CheckCircle, XCircle, Shield, User, Globe, Monitor, Clock, ChevronLeft, ChevronRight, RefreshCw, X } from "lucide-react";

type AuditLogEntry = {
  user_id?: string | Record<string, unknown>;
  timestamp?: string;
  ip?: string | Record<string, unknown>;
  user_agent?: string | Record<string, unknown>;
  success: boolean;
  reason?: string | Record<string, unknown>;
};

interface AuditLogProps {
  theme?: 'light' | 'dark';
}

export default function AuditLog({ theme = 'light' }: AuditLogProps) {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'failed'>('all');
  const [filterDays, setFilterDays] = useState<number>(7);
  const pageSize = 5;

  const fetchLogs = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const admin = sessionStorage.getItem("admin") === "true";
      const role = sessionStorage.getItem("role") || "";
      const res = await fetch('http://localhost:5000/admin/audit', {
        headers: {
          "Content-Type": "application/json",
          "X-Admin": String(admin),
          "X-Role": role,
        },
      });
      if (!res.ok) throw new Error("No autorizado");
      const data = await res.json();
      setLogs(data.logs || []);
      setError("");
    } catch {
      setError("No autorizado o error de servidor");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const formatCell = (value?: string | Record<string, unknown>) => {
    if (value === undefined || value === null) return "-";
    if (typeof value === "object") {
      try {
        return JSON.stringify(value);
      } catch {
        return "-";
      }
    }
    return value;
  };

  // Filter logs by date range and status
  const now = new Date();
  const cutoffDate = new Date(now.getTime() - filterDays * 24 * 60 * 60 * 1000);
  const filteredLogs = logs.filter(log => {
    const logDate = log.timestamp ? new Date(log.timestamp) : now;
    const inDateRange = logDate >= cutoffDate;
    const statusMatch = filterStatus === 'all' 
      ? true 
      : filterStatus === 'success' ? log.success : !log.success;
    return inDateRange && statusMatch;
  });

  const totalPages = Math.ceil(filteredLogs.length / pageSize);
  const paginatedLogs = filteredLogs.slice((page - 1) * pageSize, page * pageSize);
  const successCount = logs.filter(l => l.success).length;
  const failCount = logs.filter(l => !l.success).length;

  if (loading) {
    return (
      <div className={`rounded-2xl border p-8 ${
        theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-blue-600 mb-3"></div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              <TranslateText text="Cargando auditoría..." />
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-2xl border p-6 ${
        theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
      }`}>
        <p className={`text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with stats and filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'}`}>
              <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Auditoría de Sesiones" />
              </h3>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {logs.length} <TranslateText text="registros totales" />
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Quick stats - hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700'
              }`}>
                <CheckCircle className="w-3.5 h-3.5" />
                {successCount}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                theme === 'dark' ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-700'
              }`}>
                <XCircle className="w-3.5 h-3.5" />
                {failCount}
              </span>
            </div>

            <button
              onClick={() => fetchLogs(true)}
              disabled={refreshing}
              className={`p-2 rounded-lg transition-all ${
                refreshing ? 'opacity-50' : ''
              } ${
                theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''} ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`} />
            </button>
          </div>
        </div>

        {/* Responsive Filters */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as 'all' | 'success' | 'failed');
              setPage(1);
            }}
            className={`text-xs sm:text-sm px-3 py-2 rounded-lg border transition-all ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white hover:border-gray-500'
                : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300'
            }`}
          >
            <option value="all">Todos</option>
            <option value="success">Exitosos</option>
            <option value="failed">Fallidos</option>
          </select>

          {/* Days Filter */}
          <select
            value={filterDays}
            onChange={(e) => {
              setFilterDays(Number(e.target.value));
              setPage(1);
            }}
            className={`text-xs sm:text-sm px-3 py-2 rounded-lg border transition-all ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white hover:border-gray-500'
                : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300'
            }`}
          >
            <option value="1">Hoy</option>
            <option value="7">7 días</option>
            <option value="30">30 días</option>
            <option value="90">90 días</option>
            <option value="999">Todos</option>
          </select>

          {/* Clear Filters Button */}
          {(filterStatus !== 'all' || filterDays !== 7) && (
            <button
              onClick={() => {
                setFilterStatus('all');
                setFilterDays(7);
                setPage(1);
              }}
              className={`text-xs sm:text-sm px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <X className="w-3 h-3" />
              <span className="hidden sm:inline"><TranslateText text="Limpiar" /></span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-xl border overflow-hidden ${
        theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
                <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <TranslateText text="Usuario" />
                  </div>
                </th>
                <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <TranslateText text="Fecha" />
                  </div>
                </th>
                <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <TranslateText text="IP" />
                  </div>
                </th>
                <th className={`px-4 py-3 text-left font-semibold hidden lg:table-cell ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    <TranslateText text="Dispositivo" />
                  </div>
                </th>
                <th className={`px-4 py-3 text-center font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <TranslateText text="Estado" />
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-100'}`}>
              {paginatedLogs.map((log, i) => (
                <tr
                  key={i}
                  className={`transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className={`px-4 py-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <span className="font-medium">{formatCell(log.user_id)}</span>
                  </td>
                  <td className={`px-4 py-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {log.timestamp ? new Date(log.timestamp).toLocaleString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : "-"}
                  </td>
                  <td className={`px-4 py-3`}>
                    <span className={`px-2 py-1 rounded-md text-xs font-mono ${
                      theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {formatCell(log.ip)}
                    </span>
                  </td>
                  <td className={`px-4 py-3 hidden lg:table-cell max-w-[200px] truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatCell(log.user_agent)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {log.success ? (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700'
                      }`}>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <TranslateText text="Éxito" />
                      </span>
                    ) : (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        theme === 'dark' ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-700'
                      }`}>
                        <XCircle className="w-3.5 h-3.5" />
                        <TranslateText text="Fallido" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={`px-4 py-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          }`}>
            <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Página" /> {page} <TranslateText text="de" /> {totalPages}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1}
                className={`p-2 rounded-lg transition-all disabled:opacity-40 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                disabled={page === totalPages}
                className={`p-2 rounded-lg transition-all disabled:opacity-40 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
