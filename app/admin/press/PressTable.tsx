"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Calendar, FileText, ExternalLink, ChevronLeft, ChevronRight, File } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { PressItem } from "./page";

interface PressTableProps {
  data: PressItem[];
  loading: boolean;
  onEdit: (item: PressItem) => void;
  onDelete: (item: PressItem) => void;
  theme: 'light' | 'dark';
}

export default function PressTable({ data, loading, onEdit, onDelete, theme }: PressTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(data.length / pageSize);
  const paginated = data.slice((page - 1) * pageSize, page * pageSize);

  if (loading) {
    return (
      <div className={`rounded-2xl border p-8 ${
        theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
      }`}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-emerald-600 mb-3"></div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              <TranslateText text="Cargando comunicados..." />
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`rounded-2xl border p-8 ${
        theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
      }`}>
        <div className="text-center py-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}>
            <FileText className={`w-8 h-8 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
          </div>
          <p className={`text-base font-medium mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <TranslateText text="No hay comunicados de prensa" />
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
            <TranslateText text="Crea tu primer comunicado para comenzar" />
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
          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <TranslateText text="Lista de Comunicados" />
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            theme === 'dark' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
          }`}>
            {data.length} <TranslateText text="comunicados" />
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`text-left text-xs uppercase tracking-wider ${
              theme === 'dark' ? 'text-gray-400 bg-gray-800/50' : 'text-gray-500 bg-gray-50'
            }`}>
              <th className="px-5 py-3 font-semibold">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <TranslateText text="Título" />
                </div>
              </th>
              <th className="px-5 py-3 font-semibold">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <TranslateText text="Fecha" />
                </div>
              </th>
              <th className="px-5 py-3 font-semibold hidden md:table-cell"><TranslateText text="Resumen" /></th>
              <th className="px-5 py-3 font-semibold">
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  <TranslateText text="Archivo" />
                </div>
              </th>
              <th className="px-5 py-3 font-semibold text-right"><TranslateText text="Acciones" /></th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-800' : 'divide-gray-100'}`}>
            {paginated.map((item) => (
              <tr 
                key={item.id} 
                className={`transition-colors ${
                  theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                }`}
              >
                <td className={`px-5 py-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <span className="font-semibold line-clamp-1">{item.title}</span>
                </td>
                <td className={`px-5 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="text-sm">
                    {new Date(item.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </td>
                <td className={`px-5 py-4 max-w-xs hidden md:table-cell ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p className="line-clamp-2 text-sm">{item.excerpt}</p>
                </td>
                <td className="px-5 py-4">
                  {item.file_url ? (
                    <a 
                      href={`http://localhost:5000${item.file_url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        theme === 'dark' 
                          ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <TranslateText text="Ver" />
                    </a>
                  ) : (
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>—</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onEdit(item)} 
                      className={`p-2 rounded-lg transition-all active:scale-95 ${
                        theme === 'dark' 
                          ? 'bg-amber-600/20 text-amber-400 hover:bg-amber-600/30' 
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      }`}
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(item)} 
                      className={`p-2 rounded-lg transition-all active:scale-95 ${
                        theme === 'dark' 
                          ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' 
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
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
