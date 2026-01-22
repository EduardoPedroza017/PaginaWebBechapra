"use client";

import { useEffect, useState } from "react";
import { 
  Globe, 
  User, 
  Clock, 
  Shield, 
  MapPin, 
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw
} from "lucide-react";

interface AdminAuditLog {
  action?: string;
  by?: string;
  target?: string;
  ip?: string;
  geo?: { country?: string; city?: string };
  timestamp?: string;
  details?: Record<string, React.ReactNode>[];
}

type SortField = 'timestamp' | 'action' | 'by';
type SortOrder = 'asc' | 'desc';

export default function AdminAuditLogSection() {
  const [logs, setLogs] = useState<AdminAuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AdminAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  
  // Extraer acciones únicas para el filtro
  const actionTypes = Array.from(new Set(logs.map(log => log.action).filter(Boolean))) as string[];

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    filterAndSortLogs();
  }, [logs, searchTerm, sortField, sortOrder, selectedAction]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
      }
      const res = await fetch(`${apiUrl}/admin/audit-admin`);
      const data = await res.json();
      setLogs(data.logs || []);
      setError('');
    } catch {
      setError('No se pudo cargar el registro de auditoría');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortLogs = () => {
    let filtered = [...logs];

    // Filtro por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(log => 
        (log.by?.toLowerCase().includes(term)) ||
        (log.action?.toLowerCase().includes(term)) ||
        (log.target?.toLowerCase().includes(term)) ||
        (log.ip?.toLowerCase().includes(term))
      );
    }

    // Filtro por acción
    if (selectedAction !== 'all') {
      filtered = filtered.filter(log => log.action === selectedAction);
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';

      if (sortField === 'timestamp') {
        aVal = a.timestamp || '';
        bVal = b.timestamp || '';
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredLogs(filtered);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getActionIcon = (action: string = '') => {
    if (action.toLowerCase().includes('create') || action.toLowerCase().includes('add')) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (action.toLowerCase().includes('delete') || action.toLowerCase().includes('remove')) {
      return <XCircle className="w-4 h-4 text-red-500" />;
    }
    if (action.toLowerCase().includes('update') || action.toLowerCase().includes('modify')) {
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
    return <AlertCircle className="w-4 h-4 text-blue-500" />;
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

  return (
    <div className="mt-10 space-y-4">
      {/* Header con título y controles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-900/30 rounded-lg">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Registro de Auditoría</h2>
            <p className="text-sm text-gray-400">Seguimiento de acciones administrativas</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLogs}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Actualizar
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por usuario, acción, IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas las acciones</option>
              {actionTypes.map((action) => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Total de registros</div>
          <div className="text-2xl font-bold text-white">{logs.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Mostrando</div>
          <div className="text-2xl font-bold text-white">{filteredLogs.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Última actualización</div>
          <div className="text-lg font-semibold text-white">
            {logs[0]?.timestamp ? formatTimeAgo(logs[0].timestamp) : 'N/A'}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Acciones únicas</div>
          <div className="text-2xl font-bold text-white">{actionTypes.length}</div>
        </div>
      </div>

      {/* Tabla */}
      {loading ? (
        <div className="py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-3 text-gray-400">Cargando registros...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center rounded-xl bg-red-900/20 border border-red-800/50">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 text-lg font-medium mb-2">{error}</p>
          <button
            onClick={fetchLogs}
            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50 border-b border-gray-700">
                    <th 
                      className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-800"
                      onClick={() => handleSort('by')}
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Usuario</span>
                        {sortField === 'by' && (
                          sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-800"
                      onClick={() => handleSort('action')}
                    >
                      <div className="flex items-center gap-2">
                        <span>Acción</span>
                        {sortField === 'action' && (
                          sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Afectado
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-800"
                      onClick={() => handleSort('timestamp')}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Fecha/Hora</span>
                        {sortField === 'timestamp' && (
                          sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>IP</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="max-w-sm mx-auto">
                          <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400 text-lg font-medium mb-2">No se encontraron registros</p>
                          <p className="text-gray-500 text-sm">
                            {searchTerm || selectedAction !== 'all' 
                              ? 'Intenta con otros términos de búsqueda o filtros' 
                              : 'No hay acciones registradas aún'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : filteredLogs.map((log, i) => (
                    <tr 
                      key={i} 
                      className="hover:bg-gray-900/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{log.by || 'Sistema'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getActionIcon(log.action)}
                          <span className="font-medium text-gray-100">{log.action || '-'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-300">{log.target || '-'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-300">
                            {log.timestamp ? new Date(log.timestamp).toLocaleString('es-ES') : '-'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {log.timestamp ? formatTimeAgo(log.timestamp) : ''}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="font-mono text-sm text-gray-300">{log.ip || '-'}</div>
                          {log.geo && (log.geo.city || log.geo.country) && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              {`${log.geo.city || ''}${log.geo.city && log.geo.country ? ', ' : ''}${log.geo.country || ''}`}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginación/footer */}
          <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-400">
            <div>
              Mostrando <span className="font-semibold text-white">{filteredLogs.length}</span> de{' '}
              <span className="font-semibold text-white">{logs.length}</span> registros
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Anterior
              </button>
              <span className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</span>
              <button className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}