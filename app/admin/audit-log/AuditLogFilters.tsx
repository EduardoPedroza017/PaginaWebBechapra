"use client";

import { TranslateText } from "@/components/TranslateText";

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
}

export function AuditLogFilters({ filters, setFilters, theme }: AuditLogFiltersProps) {
  const inputClasses = `px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-700 text-white focus:bg-gray-700' 
      : 'bg-white border-gray-300 text-gray-900 focus:bg-white focus:border-blue-400'
  }`;

  return (
    <div className={`rounded-2xl shadow-lg p-5 mb-6 border backdrop-blur-xl transition-all duration-300 ${
      theme === 'dark' ? 'bg-gray-900/50 border-gray-700/50 shadow-blue-500/10' : 'bg-white/80 border-gray-200/60 shadow-blue-500/10'
    }`}>
      <h3 className={`text-sm font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Filtros Avanzados
      </h3>
      <div className="flex flex-col gap-4">
        {/* Primera fila: Usuario, IP, Estado */}
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[180px]">
            <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Usuario
            </label>
            <input
              type="text"
              placeholder="Buscar usuario..."
              className={inputClasses + " w-full"}
              value={filters.user}
              onChange={e => setFilters({ ...filters, user: e.target.value })}
            />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              IP
            </label>
            <input
              type="text"
              placeholder="Buscar IP..."
              className={inputClasses + " w-full"}
              value={filters.ip}
              onChange={e => setFilters({ ...filters, ip: e.target.value })}
            />
          </div>
          <div className="min-w-[130px]">
            <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Estado
            </label>
            <select
              className={inputClasses + " w-full"}
              value={filters.success}
              onChange={e => setFilters({ ...filters, success: e.target.value as '' | 'success' | 'fail' })}
            >
              <option value="">Todos</option>
              <option value="success">Exitosos</option>
              <option value="fail">Fallidos</option>
            </select>
          </div>
        </div>

        {/* Segunda fila: Rango de fechas */}
        <div className="flex flex-wrap gap-3 items-end">
          <div className="min-w-[140px]">
            <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Desde
            </label>
            <input
              type="date"
              className={inputClasses + " w-full"}
              value={filters.dateFrom}
              onChange={e => setFilters({ ...filters, dateFrom: e.target.value })}
            />
          </div>
          <div className="min-w-[140px]">
            <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Hasta
            </label>
            <input
              type="date"
              className={inputClasses + " w-full"}
              value={filters.dateTo}
              onChange={e => setFilters({ ...filters, dateTo: e.target.value })}
            />
          </div>
          {(filters.user || filters.ip || filters.success || filters.dateFrom || filters.dateTo) && (
            <button
              onClick={() => setFilters({ user: '', ip: '', success: '', dateFrom: '', dateTo: '' })}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-red-600/20 text-red-300 hover:bg-red-600/30 border border-red-600/30'
                  : 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-200'
              }`}
            >
              ✕ Limpiar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
