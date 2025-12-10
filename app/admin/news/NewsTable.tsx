"use client";

import { useState } from "react";
import { Pencil, Trash2, Calendar, FileText, Image as ImageIcon, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { NewsItem } from "./NewsFilter";

interface Props {
  news: NewsItem[];
  onEdit: (item: NewsItem) => void;
  onDelete: (item: NewsItem) => void;
  theme: 'light' | 'dark';
}

// Convierte HTML en texto plano para mostrar en la tabla sin etiquetas
const toPlainText = (html: string, maxLength: number) => {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
};

export default function NewsTable({ news, onEdit, onDelete, theme }: Props) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(news.length / pageSize);
  const paginated = news.slice((page - 1) * pageSize, page * pageSize);

  if (news.length === 0) {
    return (
      <div className={`rounded-2xl border p-8 ${
        theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
      }`}>
        <div className="text-center py-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}>
            <Newspaper className={`w-8 h-8 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
          </div>
          <p className={`text-base font-medium mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <TranslateText text="No hay noticias" />
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
            <TranslateText text="Crea tu primera noticia para comenzar" />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border ${
      theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      {/* Header */}
      <div className={`px-5 py-4 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <TranslateText text="Lista de Noticias" />
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            theme === 'dark' ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700'
          }`}>
            {news.length} <TranslateText text="noticias" />
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-800">
              <thead>
                <tr className={`text-left text-xs uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-400 bg-gray-800/50' : 'text-gray-500 bg-gray-50'
                }`}>
                  <th className="px-5 py-3 font-semibold whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <TranslateText text="Fecha" />
                    </div>
                  </th>
                  <th className="px-5 py-3 font-semibold whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <TranslateText text="Título" />
                    </div>
                  </th>
                  <th className="px-5 py-3 font-semibold hidden md:table-cell whitespace-nowrap"><TranslateText text="Subtítulo" /></th>
                  <th className="px-5 py-3 font-semibold hidden lg:table-cell whitespace-nowrap"><TranslateText text="Descripción" /></th>
                  <th className="px-5 py-3 font-semibold whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <TranslateText text="Imagen" />
                    </div>
                  </th>
                  <th className="px-5 py-3 font-semibold text-right whitespace-nowrap"><TranslateText text="Acciones" /></th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-800' : 'divide-gray-100'}`}>
                {paginated.map((item, i) => (
                  <tr 
                    key={i} 
                    className={`transition-colors ${
                      theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className={`px-5 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <div className="text-sm">{new Date(item.date).toLocaleDateString()}</div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {new Date(item.date).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className={`px-5 py-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      <span className="font-semibold line-clamp-1 max-w-[200px] block">{item.title}</span>
                    </td>
                    <td className={`px-5 py-4 hidden md:table-cell ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="line-clamp-1 max-w-[200px] block">{item.subtitle}</span>
                    </td>
                    <td className={`px-5 py-4 hidden lg:table-cell ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <p className="line-clamp-2 text-sm max-w-[300px]">{toPlainText(item.description || '', 180)}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {item.image_url ? (
                        <img
                          src={`http://localhost:5000${item.image_url}`}
                          alt="img"
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className={`w-16 h-12 rounded-lg flex items-center justify-center ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                        }`}>
                          <ImageIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
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
        </div>
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
