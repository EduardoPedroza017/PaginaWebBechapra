"use client";

import { useEffect, useState, useMemo } from "react";
import { TranslateText } from "@/components/TranslateText";
import { 
  CheckCircle, 
  XCircle, 
  Shield, 
  User, 
  Globe, 
  Monitor, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  X, 
  Search,
  Filter,
  Download,
  AlertCircle,
  Eye,
  Calendar,
  SortAsc,
  SortDesc,
  BarChart3,
  MapPin
} from "lucide-react";

type AuditLogEntry = {
  user_id?: string | Record<string, unknown>;
  timestamp?: string;
  ip?: string | Record<string, unknown>;
  user_agent?: string | Record<string, unknown>;
  success?: boolean;
  reason?: string | Record<string, unknown>;
  action?: string;
  by?: string;
  target?: string;
  geo?: { country?: string; city?: string };
  details?: any;
};

interface AuditLogProps {
  theme?: 'light' | 'dark';
  compact?: boolean;
}

type SortField = 'timestamp' | 'user_id' | 'ip' | 'success';
type SortOrder = 'asc' | 'desc';

export default function AuditLog({ theme = 'light', compact = false }: AuditLogProps) {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'failed'>('all');
  const [filterDays, setFilterDays] = useState<number>(7);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  const pageSize = compact ? 3 : 5;

  const fetchLogs = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const admin = sessionStorage.getItem('admin') === 'true';
      const role = sessionStorage.getItem('role') || '';
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
      }
      const res = await fetch(`${apiUrl}/admin/audit-admin`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Admin': String(admin),
          'X-Role': role,
        },
      });
      if (!res.ok) throw new Error('No autorizado');
      const data = await res.json();
      setLogs(data.logs || []);
      setError('');
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

  const getBrowserInfo = (userAgent: string | Record<string, unknown> = "") => {
    if (typeof userAgent !== 'string') return "Desconocido";
    
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    
    return "Desconocido";
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `Hace ${diffMins} min`;
    } else if (diffHours < 24) {
      return `Hace ${diffHours} h`;
    } else if (diffDays < 7) {
      return `Hace ${diffDays} d`;
    } else {
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }
  };

  // Filter and sort logs
  const filteredAndSortedLogs = useMemo(() => {
    const now = new Date();
    const cutoffDate = new Date(now.getTime() - filterDays * 24 * 60 * 60 * 1000);
    
    const result = logs.filter(log => {
      const logDate = log.timestamp ? new Date(log.timestamp) : now;
      const inDateRange = logDate >= cutoffDate;
      
      const statusMatch = filterStatus === 'all' 
        ? true 
        : filterStatus === 'success' ? log.success : !log.success;
      
      const searchMatch = !searchTerm || 
        formatCell(log.user_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatCell(log.ip).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.geo?.city?.toLowerCase()?.includes(searchTerm.toLowerCase()) || 
         log.geo?.country?.toLowerCase()?.includes(searchTerm.toLowerCase()));
      
      return inDateRange && statusMatch && searchMatch;
    });

    // Sort
    result.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortField) {
        case 'timestamp':
          aVal = a.timestamp || '';
          bVal = b.timestamp || '';
          break;
        case 'user_id':
          aVal = formatCell(a.user_id);
          bVal = formatCell(b.user_id);
          break;
        case 'ip':
          aVal = formatCell(a.ip);
          bVal = formatCell(b.ip);
          break;
        case 'success':
          aVal = a.success ? 1 : 0;
          bVal = b.success ? 1 : 0;
          break;
        default:
          aVal = a.timestamp || '';
          bVal = b.timestamp || '';
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return result;
  }, [logs, filterStatus, filterDays, searchTerm, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedLogs.length / pageSize);
  const paginatedLogs = filteredAndSortedLogs.slice((page - 1) * pageSize, page * pageSize);
  
  const successCount = logs.filter(l => l.success).length;
  const failCount = logs.filter(l => !l.success).length;
  const totalCount = logs.length;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setPage(1);
  };

  const exportLogs = () => {
    const csv = [
      ['Usuario', 'Fecha', 'IP', 'Ubicación', 'Dispositivo', 'Estado', 'Acción'],
      ...filteredAndSortedLogs.map(log => [
        formatCell(log.user_id),
        log.timestamp ? new Date(log.timestamp).toISOString() : '',
        formatCell(log.ip),
        log.geo ? `${log.geo.city || ''}${log.geo.city && log.geo.country ? ', ' : ''}${log.geo.country || ''}` : '',
        formatCell(log.user_agent),
        log.success ? 'Éxito' : 'Fallido',
        log.action || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auditoria_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const LogDetailModal = ({ log, onClose }: { log: AuditLogEntry, onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`relative w-full max-w-2xl rounded-2xl shadow-2xl ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border`}>
        <div className={`p-6 border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <Eye className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`} />
              </div>
              <h3 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <TranslateText text="Detalles del Registro" />
              </h3>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg hover:opacity-70 transition-opacity ${
                theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <X className={`w-5 h-5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </button>
          </div>
          
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'
          }`}>
            {log.success ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span className={`font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {formatCell(log.user_id)}
            </span>
            <span className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              • {log.timestamp ? new Date(log.timestamp).toLocaleString('es-ES') : '-'}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`text-sm font-medium mb-3 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <TranslateText text="Información de Sesión" />
              </h4>
              <div className="space-y-3">
                <div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <TranslateText text="Usuario" />
                  </div>
                  <div className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {formatCell(log.user_id)}
                  </div>
                </div>
                <div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <TranslateText text="Fecha y Hora" />
                  </div>
                  <div className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {log.timestamp ? new Date(log.timestamp).toLocaleString('es-ES') : '-'}
                  </div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {log.timestamp ? formatTimeAgo(log.timestamp) : ''}
                  </div>
                </div>
                <div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <TranslateText text="Estado" />
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    log.success 
                      ? theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700'
                      : theme === 'dark' ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-700'
                  }`}>
                    {log.success ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <TranslateText text={log.success ? "Éxito" : "Fallido"} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className={`text-sm font-medium mb-3 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <TranslateText text="Información de Conexión" />
              </h4>
              <div className="space-y-3">
                <div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <TranslateText text="Dirección IP" />
                  </div>
                  <div className={`font-mono font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {formatCell(log.ip)}
                  </div>
                </div>
                <div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <TranslateText text="Ubicación" />
                  </div>
                  <div className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {log.geo ? (
                      <>
                        {log.geo.city && <span>{log.geo.city}, </span>}
                        {log.geo.country}
                      </>
                    ) : '-'}
                  </div>
                </div>
                <div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <TranslateText text="Navegador" />
                  </div>
                  <div className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {getBrowserInfo(log.user_agent)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {log.reason && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className={`text-sm font-medium mb-3 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <TranslateText text="Razón/Mensaje" />
              </h4>
              <div className={`p-3 rounded-lg text-sm ${
                theme === 'dark' ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-50 text-gray-600'
              }`}>
                {formatCell(log.reason)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading && !refreshing) {
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
        <div className="flex items-start gap-3">
          <AlertCircle className={`w-5 h-5 mt-0.5 ${
            theme === 'dark' ? 'text-red-400' : 'text-red-500'
          }`} />
          <div>
            <p className={`font-medium mb-2 ${
              theme === 'dark' ? 'text-red-400' : 'text-red-600'
            }`}>
              <TranslateText text="Error al cargar" />
            </p>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-red-300' : 'text-red-500'
            }`}>
              {error}
            </p>
            <button
              onClick={() => fetchLogs()}
              className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium ${
                theme === 'dark' 
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

  return (
    <div className="space-y-4">
      {/* Header with stats */}
      <div className={`p-4 rounded-2xl ${
        theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gradient-to-r from-blue-50 to-gray-50 border-gray-200'
      } border`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <Shield className={`w-6 h-6 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <TranslateText text="Auditoría de Sesiones" />
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <TranslateText text="Monitoreo de actividad del sistema" />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
              className={`p-2 rounded-lg transition-all ${
                theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className={`w-4 h-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`} />
            </button>
            
            <button
              onClick={exportLogs}
              className={`p-2 rounded-lg transition-all ${
                theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Download className={`w-4 h-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`} />
            </button>

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

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className={`p-4 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <TranslateText text="Total" />
                </div>
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {totalCount}
                </div>
              </div>
              <Shield className={`w-8 h-8 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
              }`} />
            </div>
          </div>

          <div className={`p-4 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <TranslateText text="Exitosos" />
                </div>
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}>
                  {successCount}
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className={`p-4 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <TranslateText text="Fallidos" />
                </div>
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`}>
                  {failCount}
                </div>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Buscar por usuario, IP, ubicación..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 transition-all`}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as 'all' | 'success' | 'failed');
              setPage(1);
            }}
            className={`text-sm px-3 py-2.5 rounded-xl border transition-all ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white hover:border-gray-600'
                : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300'
            }`}
          >
            <option value="all">
              Todos los estados
            </option>
            <option value="success">
              Solo exitosos
            </option>
            <option value="failed">
              Solo fallidos
            </option>
          </select>

          <select
            value={filterDays}
            onChange={(e) => {
              setFilterDays(Number(e.target.value));
              setPage(1);
            }}
            className={`text-sm px-3 py-2.5 rounded-xl border transition-all ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white hover:border-gray-600'
                : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300'
            }`}
          >
            <option value="1">
              Hoy
            </option>
            <option value="7">
              7 días
            </option>
            <option value="30">
              30 días
            </option>
            <option value="90">
              90 días
            </option>
            <option value="999">
              Todos
            </option>
          </select>

          {(filterStatus !== 'all' || filterDays !== 7 || searchTerm) && (
            <button
              onClick={() => {
                setFilterStatus('all');
                setFilterDays(7);
                setSearchTerm('');
                setPage(1);
              }}
              className={`text-sm px-3 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <X className="w-3.5 h-3.5" />
              <TranslateText text="Limpiar" />
            </button>
          )}
        </div>
      </div>

      {/* Results info */}
      <div className={`text-sm px-4 py-3 rounded-xl ${
        theme === 'dark' ? 'bg-gray-800/30 text-gray-400' : 'bg-gray-50 text-gray-600'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <TranslateText text="Mostrando" /> <span className={`font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {Math.min((page - 1) * pageSize + 1, filteredAndSortedLogs.length)}-{Math.min(page * pageSize, filteredAndSortedLogs.length)}
            </span> <TranslateText text="de" /> <span className={`font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {filteredAndSortedLogs.length}
            </span> <TranslateText text="registros" />
            {filteredAndSortedLogs.length !== logs.length && (
              <span className={`ml-2 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                ({logs.length} <TranslateText text="total" />)
              </span>
            )}
          </div>
          <div className={`text-xs ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <TranslateText text="Ordenado por" />: <span className={`font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {sortField === 'timestamp' ? 'Fecha' : 
               sortField === 'user_id' ? 'Usuario' :
               sortField === 'ip' ? 'IP' : 'Estado'}
            </span> ({sortOrder === 'asc' ? 'ascendente' : 'descendente'})
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className={`rounded-xl border overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
                  <th 
                    className={`px-4 py-3.5 text-left font-semibold cursor-pointer ${
                      theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors`}
                    onClick={() => handleSort('user_id')}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <TranslateText text="Usuario" />
                      {sortField === 'user_id' && (
                        sortOrder === 'asc' ? <SortAsc className="w-3.5 h-3.5" /> : <SortDesc className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </th>
                  <th 
                    className={`px-4 py-3.5 text-left font-semibold cursor-pointer ${
                      theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors`}
                    onClick={() => handleSort('timestamp')}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <TranslateText text="Fecha" />
                      {sortField === 'timestamp' && (
                        sortOrder === 'asc' ? <SortAsc className="w-3.5 h-3.5" /> : <SortDesc className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </th>
                  <th className={`px-4 py-3.5 text-left font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <TranslateText text="IP" />
                    </div>
                  </th>
                  <th className={`px-4 py-3.5 text-left font-semibold hidden lg:table-cell ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <TranslateText text="Dispositivo" />
                  </th>
                  <th 
                    className={`px-4 py-3.5 text-center font-semibold cursor-pointer ${
                      theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors`}
                    onClick={() => handleSort('success')}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <TranslateText text="Estado" />
                      {sortField === 'success' && (
                        sortOrder === 'asc' ? <SortAsc className="w-3.5 h-3.5" /> : <SortDesc className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </th>
                  <th className={`px-4 py-3.5 text-center font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <TranslateText text="Acciones" />
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-100'}`}>
                {paginatedLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <div className="max-w-sm mx-auto">
                        <Shield className={`w-12 h-12 mx-auto mb-4 ${
                          theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                        }`} />
                        <p className={`text-lg font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <TranslateText text="No se encontraron registros" />
                        </p>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          <TranslateText text="Intenta ajustar los filtros de búsqueda" />
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : paginatedLogs.map((log, i) => (
                  <tr
                    key={i}
                    className={`transition-colors ${
                      theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <User className={`w-4 h-4 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <div className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {formatCell(log.user_id)}
                          </div>
                          <div className={`text-xs ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {log.action || '-'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {log.timestamp ? new Date(log.timestamp).toLocaleDateString('es-ES') : "-"}
                        </div>
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {log.timestamp ? new Date(log.timestamp).toLocaleTimeString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          }) : "-"}
                        </div>
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {log.timestamp ? formatTimeAgo(log.timestamp) : ''}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className={`px-2.5 py-1 rounded-md text-xs font-mono ${
                          theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {formatCell(log.ip)}
                        </div>
                        {log.geo && (log.geo.country || log.geo.city) && (
                          <div className={`text-xs ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {log.geo.city ? `${log.geo.city}, ` : ''}{log.geo.country || ''}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className={`px-4 py-4 hidden lg:table-cell ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[150px]">
                          {getBrowserInfo(log.user_agent)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        {log.success ? (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                            theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700'
                          }`}>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <TranslateText text="Éxito" />
                          </span>
                        ) : (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                            theme === 'dark' ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-700'
                          }`}>
                            <XCircle className="w-3.5 h-3.5" />
                            <TranslateText text="Fallido" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            theme === 'dark' 
                              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                          }`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={`px-4 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <TranslateText text="Mostrando" /> {paginatedLogs.length} <TranslateText text="de" /> {filteredAndSortedLogs.length} <TranslateText text="registros" />
              </span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={page === 1}
                  className={`p-2 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm transition-all ${
                          page === pageNum
                            ? theme === 'dark'
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-600 text-white'
                            : theme === 'dark'
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                  disabled={page === totalPages}
                  className={`p-2 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
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
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedLogs.map((log, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border transition-all hover:shadow-lg ${
                theme === 'dark' 
                  ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <User className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <div className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formatCell(log.user_id)}
                    </div>
                    <div className={`text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {log.action || '-'}
                    </div>
                  </div>
                </div>
                <div>
                  {log.success ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {log.timestamp ? formatTimeAgo(log.timestamp) : '-'}
                  </span>
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    • {log.timestamp ? new Date(log.timestamp).toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    }) : "-"}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Globe className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-mono ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {formatCell(log.ip)}
                  </span>
                </div>
                
                {log.geo && (log.geo.country || log.geo.city) && (
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {log.geo.city ? `${log.geo.city}, ` : ''}{log.geo.country || ''}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Monitor className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {getBrowserInfo(log.user_agent)}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedLog(log)}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <TranslateText text="Ver detalles" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Log Detail Modal */}
      {selectedLog && (
        <LogDetailModal 
          log={selectedLog} 
          onClose={() => setSelectedLog(null)} 
        />
      )}
    </div>
  );
}