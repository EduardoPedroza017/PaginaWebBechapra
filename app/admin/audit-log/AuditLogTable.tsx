"use client";

import { TranslateText } from "@/components/TranslateText";

interface AuditLogEntry {
  user_id: string;
  timestamp?: string;
  ip?: string;
  user_agent?: string;
  success: boolean;
  reason?: string;
}

interface AuditLogTableProps {
  logs: AuditLogEntry[];
  theme: 'light' | 'dark';
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
}

export function AuditLogTable({ logs, theme, page, setPage, totalPages }: AuditLogTableProps) {
  return (
    <div className={`rounded-2xl shadow-sm overflow-hidden border ${
      theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className={`text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <TranslateText text="Registro Detallado de Accesos" />
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Usuario" />
              </th>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Fecha/Hora" />
              </th>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="IP" />
              </th>
              <th className={`px-5 py-3 text-center text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Estado" />
              </th>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Motivo" />
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className={`px-5 py-8 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <TranslateText text="No hay registros" />
                </td>
              </tr>
            ) : (
              logs.map((log, i) => (
                <tr key={i} className={`transition-colors ${
                  log.success
                    ? (theme === 'dark' ? 'hover:bg-green-900/20' : 'hover:bg-green-50')
                    : (theme === 'dark' ? 'hover:bg-red-900/20' : 'hover:bg-red-50')
                }`}>
                  <td className={`px-5 py-3 whitespace-nowrap text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {log.user_id}
                  </td>
                  <td className={`px-5 py-3 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {log.timestamp ? new Date(log.timestamp).toLocaleString() : "-"}
                  </td>
                  <td className={`px-5 py-3 whitespace-nowrap text-sm font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {log.ip || "-"}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-center">
                    {log.success ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        ✓ <TranslateText text="Éxito" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        ✗ <TranslateText text="Fallo" />
                      </span>
                    )}
                  </td>
                  <td className={`px-5 py-3 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {log.reason || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Paginación */}
      <div className={`flex justify-between items-center px-5 py-3 border-t ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <button
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            page === 1 
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          <TranslateText text="Anterior" />
        </button>
        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <TranslateText text="Página" /> {page} <TranslateText text="de" /> {totalPages || 1}
        </span>
        <button
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            page >= totalPages || totalPages === 0 
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages || totalPages === 0}
        >
          <TranslateText text="Siguiente" />
        </button>
      </div>
    </div>
  );
}
