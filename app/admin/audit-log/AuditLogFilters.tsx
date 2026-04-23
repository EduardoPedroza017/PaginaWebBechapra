"use client";

import { TranslateText } from "@/components/TranslateText";
import { Filter, X, Calendar, User, Globe, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

export type AuditLogFiltersState = {
  user: string;
  ip: string;
  success: '' | 'success' | 'fail';
  dateFrom: string;
  dateTo: string;
};

interface AuditLogFiltersProps {
  filters: AuditLogFiltersState;
  setFilters: (f: AuditLogFiltersState) => void;
  theme: 'light' | 'dark';
  onClear?: () => void;
  resultsCount?: number;
  totalCount?: number;
}

export function AuditLogFilters({ 
  filters, 
  setFilters, 
  theme, 
  onClear,
  resultsCount,
  totalCount
}: AuditLogFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDark = theme === 'dark';
  
  // Derivamos el estado directamente del prop filters para evitar sincronización manual
  const activeFilters = Object.values(filters).filter((val) => val !== null && val !== undefined && val !== '').length;

  const baseInputClasses = `px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
    isDark 
      ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500' 
      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-400'
  }`;

  const handleClear = () => {
    setFilters({ user: '', ip: '', success: '', dateFrom: '', dateTo: '' });
    onClear?.();
  };

  const handleDateChange = (type: 'from' | 'to', value: string) => {
    if (type === 'from') {
      setFilters({ ...filters, dateFrom: value });
    } else {
      setFilters({ ...filters, dateTo: value });
    }
  };

  const getStatusIcon = (status: '' | 'success' | 'fail') => {
    switch (status) {
      case 'success': return <CheckCircle className="w-3.5 h-3.5 text-green-500" />;
      case 'fail': return <XCircle className="w-3.5 h-3.5 text-red-500" />;
      default: return null;
    }
  };

  const formatDateForDisplay = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="space-y-4">
      {/* Header compacto */}
      <div className={`rounded-xl border p-4 ${
        isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              isDark ? 'bg-blue-900/20' : 'bg-blue-100'
            }`}>
              <Filter className={`w-4 h-4 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Filtros de Auditoría" />
              </h3>
              {resultsCount !== undefined && totalCount !== undefined && (
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="font-medium">
                    {resultsCount} de {totalCount}
                  </span>{' '}
                  <TranslateText text="registros mostrados" />
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeFilters > 0 && (
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700'
              }`}>
                {activeFilters} {activeFilters === 1 ? 'filtro' : 'filtros'} activo{activeFilters !== 1 ? 's' : ''}
              </span>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {isExpanded ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  <TranslateText text="Ocultar" />
                </>
              ) : (
                <>
                  <Filter className="w-3.5 h-3.5" />
                  <TranslateText text="Mostrar filtros" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Badges de filtros activos */}
        {activeFilters > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700/50 dark:border-gray-600/30">
            {filters.user && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                <User className="w-3 h-3" />
                {filters.user}
                <button
                  onClick={() => setFilters({ ...filters, user: '' })}
                  className="ml-0.5 hover:opacity-70"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {filters.ip && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                <Globe className="w-3 h-3" />
                {filters.ip}
                <button
                  onClick={() => setFilters({ ...filters, ip: '' })}
                  className="ml-0.5 hover:opacity-70"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {filters.success && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${
                filters.success === 'success' 
                  ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                  : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
              }`}>
                {getStatusIcon(filters.success)}
                <TranslateText text={filters.success === 'success' ? 'Exitosos' : 'Fallidos'} />
                <button
                  onClick={() => setFilters({ ...filters, success: '' })}
                  className="ml-0.5 hover:opacity-70"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {(filters.dateFrom || filters.dateTo) && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                <Calendar className="w-3 h-3" />
                {filters.dateFrom ? formatDateForDisplay(filters.dateFrom) : '· · ·'} → 
                {filters.dateTo ? formatDateForDisplay(filters.dateTo) : '· · ·'}
                <button
                  onClick={() => setFilters({ ...filters, dateFrom: '', dateTo: '' })}
                  className="ml-0.5 hover:opacity-70"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Panel de filtros expandible */}
      {isExpanded && (
        <div className={`rounded-xl border p-5 ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="space-y-6">
            {/* Sección 1: Búsqueda básica */}
            <div>
              <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Búsqueda básica" />
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <TranslateText text="Usuario" />
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ej: admin, user123..."
                      className={`${baseInputClasses} pl-10 w-full`}
                      value={filters.user}
                      onChange={e => setFilters({ ...filters, user: e.target.value })}
                    />
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      <TranslateText text="Dirección IP" />
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ej: 192.168.1.1..."
                      className={`${baseInputClasses} pl-10 w-full`}
                      value={filters.ip}
                      onChange={e => setFilters({ ...filters, ip: e.target.value })}
                    />
                    <Globe className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 2: Estado y fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Estado */}
              <div>
                <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Estado del intento" />
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilters({ ...filters, success: '' })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      filters.success === ''
                        ? isDark 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-600 text-white'
                        : isDark 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                    <TranslateText text="Todos" />
                  </button>
                  <button
                    onClick={() => setFilters({ ...filters, success: 'success' })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      filters.success === 'success'
                        ? isDark 
                          ? 'bg-green-900/30 text-green-400 border border-green-800' 
                          : 'bg-green-100 text-green-700 border border-green-200'
                        : isDark 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <TranslateText text="Exitosos" />
                  </button>
                  <button
                    onClick={() => setFilters({ ...filters, success: 'fail' })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      filters.success === 'fail'
                        ? isDark 
                          ? 'bg-red-900/30 text-red-400 border border-red-800' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                        : isDark 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <TranslateText text="Fallidos" />
                  </button>
                </div>
              </div>

              {/* Fechas */}
              <div>
                <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <TranslateText text="Rango de fechas" />
                  </div>
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <TranslateText text="Desde" />
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className={`${baseInputClasses} w-full`}
                        value={filters.dateFrom}
                        onChange={e => handleDateChange('from', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <TranslateText text="Hasta" />
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className={`${baseInputClasses} w-full`}
                        value={filters.dateTo}
                        onChange={e => handleDateChange('to', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      const today = new Date().toISOString().split('T')[0];
                      const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                      setFilters({ ...filters, dateFrom: lastWeek, dateTo: today });
                    }}
                    className={`text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <TranslateText text="Últimos 7 días" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className={`mt-6 pt-6 border-t ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {activeFilters > 0 ? (
                  <>
                    <span className="font-medium">
                      {activeFilters} {activeFilters === 1 ? 'filtro aplicado' : 'filtros aplicados'}
                    </span>
                    {' • '}
                    <button
                      onClick={handleClear}
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <TranslateText text="Limpiar todos" />
                    </button>
                  </>
                ) : (
                  <TranslateText text="Sin filtros activos" />
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  } ${activeFilters === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={activeFilters === 0}
                >
                  <X className="w-3.5 h-3.5" />
                  <TranslateText text="Limpiar filtros" />
                </button>
                
                <button
                  onClick={() => setIsExpanded(false)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isDark 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <TranslateText text="Aplicar filtros" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nota sobre filtros */}
      {activeFilters > 0 && !isExpanded && (
        <div className={`p-3 rounded-lg text-sm ${
          isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-700'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>
                <TranslateText text="Filtros activos" />: {activeFilters}
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(true)}
              className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                isDark 
                  ? 'bg-blue-900/30 hover:bg-blue-900/50' 
                  : 'bg-blue-100 hover:bg-blue-200'
              }`}
            >
              <TranslateText text="Ver detalles" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}