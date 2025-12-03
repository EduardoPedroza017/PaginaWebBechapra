"use client";

import { useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import { CheckCircle, XCircle, Globe, Monitor, Clock, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

interface CookieTableProps {
  data: CookieConsent[];
  theme?: 'light' | 'dark';
}

export default function CookieTable({ data, theme = 'light' }: CookieTableProps) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'accepted' | 'rejected'>('all');
  const pageSize = 10;

  // Filtrar datos
  const filteredData = data.filter(item => {
    const matchesSearch = item.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.user_agent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'accepted' && item.accepted) ||
                         (filterStatus === 'rejected' && !item.accepted);
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  // Detectar navegador desde user_agent
  const getBrowserIcon = (userAgent: string) => {
    const ua = userAgent.toLowerCase();
    if (ua.includes('chrome')) return '🌐';
    if (ua.includes('firefox')) return '🦊';
    if (ua.includes('safari')) return '🧭';
    if (ua.includes('edge')) return '📐';
    if (ua.includes('opera')) return '🔴';
    return '💻';
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Buscar por IP o dispositivo..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setFilterStatus('all'); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              filterStatus === 'all'
                ? theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                : theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-4 h-4" />
            <TranslateText text="Todos" />
          </button>
          <button
            onClick={() => { setFilterStatus('accepted'); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              filterStatus === 'accepted'
                ? 'bg-green-600 text-white'
                : theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <TranslateText text="Aceptados" />
          </button>
          <button
            onClick={() => { setFilterStatus('rejected'); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              filterStatus === 'rejected'
                ? 'bg-red-600 text-white'
                : theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <XCircle className="w-4 h-4" />
            <TranslateText text="Rechazados" />
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className={`rounded-xl border overflow-hidden ${
        theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
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
                <th className={`px-4 py-3 text-center font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <TranslateText text="Estado" />
                </th>
                <th className={`px-4 py-3 text-left font-semibold hidden md:table-cell ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    <TranslateText text="Dispositivo" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-100'}`}>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <TranslateText text="No se encontraron registros" />
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, i) => (
                  <tr
                    key={i}
                    className={`transition-colors ${
                      theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className={`px-4 py-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <div className="flex flex-col">
                        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {new Date(row.timestamp).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="text-xs">
                          {new Date(row.timestamp).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className={`px-4 py-3`}>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                        theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {row.ip}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.accepted ? (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                          theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700'
                        }`}>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <TranslateText text="Aceptado" />
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                          theme === 'dark' ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-700'
                        }`}>
                          <XCircle className="w-3.5 h-3.5" />
                          <TranslateText text="Rechazado" />
                        </span>
                      )}
                    </td>
                    <td className={`px-4 py-3 hidden md:table-cell max-w-[250px] ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getBrowserIcon(row.user_agent)}</span>
                        <span className="truncate text-xs">{row.user_agent}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className={`px-4 py-3 border-t flex items-center justify-between ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          }`}>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Mostrando" /> {((page - 1) * pageSize) + 1}-{Math.min(page * pageSize, filteredData.length)} <TranslateText text="de" /> {filteredData.length}
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
              <span className={`flex items-center px-3 text-sm font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {page} / {totalPages}
              </span>
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
