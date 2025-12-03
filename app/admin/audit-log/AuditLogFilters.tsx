"use client";

import { TranslateText } from "@/components/TranslateText";

export type AuditLogFiltersState = {
  user: string;
  ip: string;
  success: '' | 'success' | 'fail';
  date: string;
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
    <div className={`rounded-2xl shadow-sm p-4 mb-6 border ${
      theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[180px]">
          <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <TranslateText text="Usuario" />
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
            <TranslateText text="IP" />
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
            <TranslateText text="Estado" />
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
        <div className="min-w-[150px]">
          <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <TranslateText text="Fecha" />
          </label>
          <input
            type="date"
            className={inputClasses + " w-full"}
            value={filters.date}
            onChange={e => setFilters({ ...filters, date: e.target.value })}
          />
        </div>
        {(filters.user || filters.ip || filters.success || filters.date) && (
          <button
            onClick={() => setFilters({ user: '', ip: '', success: '', date: '' })}
            className="mt-5 px-3 py-2 text-xs font-medium rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <TranslateText text="Limpiar" />
          </button>
        )}
      </div>
    </div>
  );
}
