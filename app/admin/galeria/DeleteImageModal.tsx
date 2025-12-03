"use client";

import { TranslateText } from "@/components/TranslateText";
import { AlertTriangle, X } from "lucide-react";

interface DeleteImageModalProps {
  isOpen: boolean;
  filename: string | null;
  theme: 'light' | 'dark';
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteImageModal({ isOpen, filename, theme, onClose, onConfirm }: DeleteImageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl p-6 ${
        theme === 'dark' ? 'bg-gray-900 border border-gray-800' : 'bg-white'
      }`}>
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1 rounded-lg transition-colors ${
            theme === 'dark' 
              ? 'hover:bg-gray-800 text-gray-500 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icono */}
        <div className="flex justify-center mb-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
            theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'
          }`}>
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
        </div>

        {/* Contenido */}
        <div className="text-center mb-6">
          <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <TranslateText text="¿Eliminar imagen?" />
          </h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <TranslateText text="¿Estás seguro de que deseas eliminar" /> <span className="font-medium">{filename}</span>?
          </p>
          <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            <TranslateText text="Esta acción no se puede deshacer." />
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-all ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <TranslateText text="Cancelar" />
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl font-medium bg-red-500 hover:bg-red-600 text-white transition-all"
          >
            <TranslateText text="Eliminar" />
          </button>
        </div>
      </div>
    </div>
  );
}
