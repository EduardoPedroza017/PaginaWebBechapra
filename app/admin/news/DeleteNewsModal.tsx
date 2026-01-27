"use client";

import { AlertTriangle, X, Trash2 } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className={`w-full max-w-md rounded-2xl shadow-2xl border transform transition-all scale-100 ${
          theme === 'dark' 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${
              theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'
            }`}>
              <div className="p-2 bg-red-500 rounded-full shadow-lg shadow-red-500/30">
                <Trash2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="¿Eliminar noticia?" />
              </h3>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <TranslateText text="Esta acción es irreversible" />
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              theme === 'dark' 
                ? 'hover:bg-gray-800 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className={`p-4 rounded-xl border ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-red-50 border-red-100'
          }`}>
            <p className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-red-600'}`}>
              <TranslateText text="Estás eliminando:" />
            </p>
            <p className={`font-bold text-lg line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              "{newsTitle}"
            </p>
          </div>
          
          <p className={`text-sm mt-4 text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            <TranslateText text="Al eliminar esta noticia, dejará de ser visible para los usuarios inmediatamente." />
          </p>
        </div>

        {/* Actions */}
        <div className={`flex gap-3 p-6 pt-2 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
          <button
            onClick={onClose}
            disabled={loading}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
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
            className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-red-600 text-white hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-red-600/20"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <TranslateText text="Eliminando..." />
              </span>
            ) : (
              <TranslateText text="Sí, eliminar" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
