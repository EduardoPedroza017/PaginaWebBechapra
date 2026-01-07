"use client";

import { TranslateText } from "@/components/TranslateText";
import { 
  CheckCircle, 
  XCircle, 
  User, 
  Globe, 
  Clock, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle,
  Shield,
  Eye,
  ChevronDown,
  ChevronUp,
  Search,
  Filter
} from "lucide-react";
import { useState, useMemo, useCallback, useEffect } from "react";
import VirtualizedTable, { Column } from "@/app/admin/components/VirtualizedTable";

interface AuditLogEntry {
  id?: string | number;
  user_id: string;
  timestamp?: string;
  ip?: string;
  user_agent?: string;
  success: boolean;
  reason?: string;
  geo?: { country?: string; city?: string };
}

interface AuditLogTableProps {
  logs: AuditLogEntry[];
  theme: 'light' | 'dark';
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
  setTotalPages: (p: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  onViewDetails?: (log: AuditLogEntry) => void;
}

type SortField = 'timestamp' | 'user_id' | 'success';
type SortOrder = 'asc' | 'desc';

export function AuditLogTable({ 
  logs, 
  theme, 
  page, 
  setPage, 
  totalPages,
  setTotalPages,
  totalItems = 0,
  itemsPerPage = 10,
  onViewDetails
}: AuditLogTableProps) {
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const isDark = theme === 'dark';

  // Procesar y ordenar logs
  const processedLogs = useMemo(() => {
    let result = [...logs];
    
    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(log => 
        log.user_id.toLowerCase().includes(term) ||
        log.ip?.toLowerCase().includes(term) ||
        log.reason?.toLowerCase().includes(term) ||
        (log.geo?.city?.toLowerCase().includes(term) || 
         log.geo?.country?.toLowerCase().includes(term))
      );
    }
    
    // Ordenar
    result.sort((a, b) => {
      let aVal: any, bVal: any;
      
      switch (sortField) {
        case 'timestamp':
          aVal = a.timestamp || '';
          bVal = b.timestamp || '';
          break;
        case 'user_id':
          aVal = a.user_id;
          bVal = b.user_id;
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
  }, [logs, searchTerm, sortField, sortOrder]);

  // Actualizar totalPages cuando cambie el filtrado
  useEffect(() => {
    const newTotalPages = Math.max(1, Math.ceil(processedLogs.length / itemsPerPage));
    setTotalPages(newTotalPages);
  }, [processedLogs.length, itemsPerPage, setTotalPages]);

  const handleSort = (key: 'timestamp' | 'user_id' | 'success') => {
    const newOrder = sortField === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setSortField(key as SortField);
  };

  const formatTimeAgo = (timestamp?: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `Hace ${diffMins} min`;
    } else if (diffMins < 1440) {
      return `Hace ${Math.floor(diffMins / 60)} h`;
    } else if (diffMins < 10080) {
      return `Hace ${Math.floor(diffMins / 1440)} d`;
    } else {
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }
  };

  // Preparar datos para VirtualizedTable
  const tableData = useMemo(() => {
    return processedLogs.map((log, index) => ({
      id: `${log.user_id}-${log.timestamp}-${index}`,
      ...log
    }));
  }, [processedLogs]);

  const getBrowserInfo = (userAgent?: string) => {
    if (!userAgent) return '';
    
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    
    return 'Desconocido';
  };

  // Aplicar paginación
  const displayedLogs = processedLogs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems || processedLogs.length);
  const showingCount = processedLogs.length;

  return (
    <div className="space-y-4">
      {/* Header con controles */}
      <div className={`rounded-xl border p-4 ${
        isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              isDark ? 'bg-blue-900/20' : 'bg-blue-100'
            }`}>
              <Shield className={`w-5 h-5 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Registro de Auditoría" />
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Historial detallado de accesos al sistema" />
              </p>
            </div>
          </div>
          
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Buscar en registros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Mostrando" />
              </div>
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {showingCount}
              </div>
            </div>
            <Filter className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          </div>
        </div>
        
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Exitosos" />
              </div>
              <div className={`text-xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {logs.filter(l => l.success).length}
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        </div>
        
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Fallidos" />
              </div>
              <div className={`text-xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                {logs.filter(l => !l.success).length}
              </div>
            </div>
            <XCircle className="w-5 h-5 text-red-500" />
          </div>
        </div>
        
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Usuarios Únicos" />
              </div>
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {new Set(logs.map(l => l.user_id)).size}
              </div>
            </div>
            <User className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          </div>
        </div>
      </div>

      {/* Tabla principal */}
      <div className={`rounded-xl border overflow-hidden ${
        isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
                <th 
                  className={`px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${
                    isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  } transition-colors`}
                  onClick={() => handleSort('user_id')}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    <TranslateText text="Usuario" />
                    {sortField === 'user_id' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th 
                  className={`px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${
                    isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  } transition-colors`}
                  onClick={() => handleSort('timestamp')}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <TranslateText text="Fecha y Hora" />
                    {sortField === 'timestamp' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className={`px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" />
                    <TranslateText text="Información" />
                  </div>
                </th>
                <th 
                  className={`px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${
                    isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  } transition-colors`}
                  onClick={() => handleSort('success')}
                >
                  <div className="flex items-center gap-2">
                    <TranslateText text="Estado" />
                    {sortField === 'success' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className={`px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <TranslateText text="Razón" />
                  </div>
                </th>
                <th className={`px-4 py-3.5 text-center text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <TranslateText text="Acciones" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {processedLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="max-w-sm mx-auto">
                      <Shield className={`w-12 h-12 mx-auto mb-4 ${
                        isDark ? 'text-gray-600' : 'text-gray-400'
                      }`} />
                      <p className={`text-lg font-medium mb-2 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <TranslateText text="No se encontraron registros" />
                      </p>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {searchTerm ? (
                          <TranslateText text="Intenta con otros términos de búsqueda" />
                        ) : (
                          <TranslateText text="No hay actividad registrada" />
                        )}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : displayedLogs.map((log, index) => (
                <tr 
                  key={index} 
                  className={`transition-colors ${
                    isDark 
                      ? log.success ? 'hover:bg-gray-800/50' : 'hover:bg-red-900/10' 
                      : log.success ? 'hover:bg-gray-50' : 'hover:bg-red-50'
                  }`}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isDark ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <User className={`w-4 h-4 ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <div className={`font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {log.user_id}
                        </div>
                        <div className={`text-xs ${
                          isDark ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {getBrowserInfo(log.user_agent)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className={`font-medium ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {log.timestamp ? new Date(log.timestamp).toLocaleDateString('es-ES') : "-"}
                      </div>
                      <div className={`text-xs ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {log.timestamp ? new Date(log.timestamp).toLocaleTimeString('es-ES', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        }) : "-"}
                      </div>
                      <div className={`text-xs ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {formatTimeAgo(log.timestamp)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1.5">
                      <div className={`px-2.5 py-1 rounded-md text-xs font-mono ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {log.ip || "-"}
                      </div>
                      {log.geo && (log.geo.city || log.geo.country) && (
                        <div className={`text-xs ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {log.geo.city ? `${log.geo.city}, ` : ''}{log.geo.country || ''}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex">
                      {log.success ? (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${
                          isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                        }`}>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <TranslateText text="Éxito" />
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${
                          isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
                        }`}>
                          <XCircle className="w-3.5 h-3.5" />
                          <TranslateText text="Fallido" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="max-w-xs">
                      <div className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {log.reason || (
                          <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                            <TranslateText text="Sin motivo especificado" />
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => onViewDetails ? onViewDetails(log) : setSelectedLog(log)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isDark 
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

        {/* Footer con paginación */}
        <div className={`px-4 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 ${
          isDark ? 'border-gray-700 bg-gray-800/30' : 'border-gray-100 bg-gray-50'
        }`}>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {searchTerm ? (
              <>
                <TranslateText text="Mostrando" /> <span className="font-semibold">{showingCount}</span>{' '}
                <TranslateText text="resultados de búsqueda" />
              </>
            ) : (
              <>
                <TranslateText text="Mostrando" /> <span className="font-semibold">{startItem}-{endItem}</span>{' '}
                <TranslateText text="de" /> <span className="font-semibold">{totalItems || processedLogs.length}</span>{' '}
                <TranslateText text="registros" />
              </>
            )}
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`p-2 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                  isDark 
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
                          ? isDark
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-600 text-white'
                          : isDark
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
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className={`p-2 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles (simplificado) */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className={`relative w-full max-w-2xl rounded-xl shadow-2xl ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <TranslateText text="Detalles del Registro" />
                </h3>
                <button
                  onClick={() => setSelectedLog(null)}
                  className={`p-2 rounded-lg hover:opacity-70 ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <XCircle className={`w-5 h-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <TranslateText text="Usuario" />
                  </div>
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedLog.user_id}
                  </div>
                </div>
                
                <div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <TranslateText text="Fecha y Hora" />
                  </div>
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedLog.timestamp ? new Date(selectedLog.timestamp).toLocaleString('es-ES') : "-"}
                  </div>
                </div>
                
                <div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <TranslateText text="IP" />
                  </div>
                  <div className={`font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedLog.ip || "-"}
                  </div>
                </div>
                
                {selectedLog.reason && (
                  <div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <TranslateText text="Razón" />
                    </div>
                    <div className={`p-3 rounded-lg text-sm ${
                      isDark ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-50 text-gray-600'
                    }`}>
                      {selectedLog.reason}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}