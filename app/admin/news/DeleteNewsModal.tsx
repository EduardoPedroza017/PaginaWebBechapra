"use client";

import { AlertTriangle, X } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface DeleteNewsModalProps {
  isOpen: boolean;
  newsTitle: string | null;
  theme: 'light' | 'dark';
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteNewsModal({ isOpen, newsTitle, theme, loading, onClose, onConfirm }: DeleteNewsModalProps) {
  if (!isOpen || !newsTitle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className={`w-full max-w-md rounded-2xl shadow-2xl border p-6 ${
          theme === 'dark' 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="¿Eliminar noticia?" />
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'hover:bg-gray-800 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <TranslateText text="Estás a punto de eliminar la siguiente noticia:" />
          </p>
          <div className={`p-3 rounded-xl ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <p className={`font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {newsTitle}
            </p>
          </div>
          <p className={`text-sm mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <TranslateText text="Esta acción no se puede deshacer." />
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className={`flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <TranslateText text="Cancelar" />
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm bg-red-600 text-white hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <TranslateText text="Eliminando..." />
              </span>
            ) : (
              <TranslateText text="Eliminar" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
