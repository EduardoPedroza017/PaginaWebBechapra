"use client";

import React, { useState } from "react";
import { History, ChevronLeft, ChevronRight, Calendar, User, ArrowRight } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface EssenceHistoryItem {
  id: string;
  date?: string;
  user?: string;
  old: { mision: string; vision: string; valores: string };
  new: { mision: string; vision: string; valores: string };
}

interface EssenceHistoryProps {
  history: EssenceHistoryItem[];
  loading: boolean;
  theme: 'light' | 'dark';
}

export default function EssenceHistory({ history, loading, theme }: EssenceHistoryProps) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(history.length / pageSize);
  const paginated = history.slice((page - 1) * pageSize, page * pageSize);

  const getChangedFields = (item: EssenceHistoryItem) => {
    const changes: string[] = [];
    if (item.old.mision !== item.new.mision) changes.push('Misión');
    if (item.old.vision !== item.new.vision) changes.push('Visión');
    if (item.old.valores !== item.new.valores) changes.push('Valores');
    return changes;
  };

  if (loading) {
    return (
      <div className={`rounded-2xl border p-8 ${
        theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
      }`}>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-emerald-600 mb-3"></div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              <TranslateText text="Cargando historial..." />
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className={`rounded-2xl border p-8 ${
        theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
      }`}>
        <div className="text-center py-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}>
            <History className={`w-8 h-8 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
          </div>
          <p className={`text-base font-medium mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <TranslateText text="Sin cambios registrados" />
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
            <TranslateText text="El historial aparecerá cuando realices modificaciones" />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border overflow-hidden ${
      theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      {/* Header */}
      <div className={`px-5 py-4 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <History className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Historial de Cambios" />
            </h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            theme === 'dark' ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-700'
          }`}>
            {history.length} <TranslateText text="registros" />
          </span>
        </div>
      </div>

      {/* History Items */}
      <div className={`divide-y ${theme === 'dark' ? 'divide-gray-800' : 'divide-gray-100'}`}>
        {paginated.map((item) => {
          const changedFields = getChangedFields(item);
          return (
            <div 
              key={item.id} 
              className={`p-4 transition-colors ${
                theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Meta info */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`flex items-center gap-1.5 text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date ? new Date(item.date).toLocaleDateString('es-MX', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : '—'}
                    </div>
                    {item.user && (
                      <div className={`flex items-center gap-1.5 text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <User className="w-3.5 h-3.5" />
                        {item.user}
                      </div>
                    )}
                  </div>

                  {/* Changed fields */}
                  <div className="flex flex-wrap gap-2">
                    {changedFields.map((field) => (
                      <span 
                        key={field}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                          theme === 'dark'
                            ? 'bg-amber-600/20 text-amber-400'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        <TranslateText text={field} />
                      </span>
                    ))}
                  </div>

                  {/* Change preview */}
                  {changedFields.length > 0 && (
                    <div className={`mt-3 p-3 rounded-xl text-xs ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                    }`}>
                      {changedFields.slice(0, 1).map((field) => {
                        const key = field.toLowerCase() as 'mision' | 'vision' | 'valores';
                        const oldVal = item.old[key]?.substring(0, 60) || '';
                        const newVal = item.new[key]?.substring(0, 60) || '';
                        return (
                          <div key={field} className="flex items-center gap-2">
                            <span className={`line-through ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                              {oldVal}{oldVal.length >= 60 ? '...' : ''}
                            </span>
                            <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                            <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>
                              {newVal}{newVal.length >= 60 ? '...' : ''}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={`px-5 py-4 border-t flex items-center justify-between ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
        }`}>
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <TranslateText text="Página" /> {page} <TranslateText text="de" /> {totalPages}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              disabled={page === 1} 
              className={`p-2 rounded-lg transition-all disabled:opacity-40 ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
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
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
