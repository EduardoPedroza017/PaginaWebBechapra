"use client";

import { TranslateText } from "@/components/TranslateText";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteUserModalProps {
  userEmail: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  processing?: boolean;
  theme?: 'light' | 'dark';
}

export function DeleteUserModal({ userEmail, open, onConfirm, onCancel, processing, theme = 'light' }: DeleteUserModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl p-6 ${
        theme === 'dark' ? 'bg-gray-900 border border-gray-800' : 'bg-white'
      }`}>
        {/* Close button */}
        <button
          onClick={onCancel}
          className={`absolute top-4 right-4 p-1 rounded-lg transition-colors ${
            theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`p-4 rounded-full ${
            theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'
          }`}>
            <AlertTriangle className={`w-8 h-8 ${
              theme === 'dark' ? 'text-red-400' : 'text-red-600'
            }`} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className={`text-xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <TranslateText text="¿Eliminar usuario?" />
          </h2>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <TranslateText text="Esta acción no se puede deshacer. Se eliminará permanentemente el usuario:" />
          </p>
          <p className={`mt-2 px-4 py-2 rounded-xl font-mono text-sm ${
            theme === 'dark' ? 'bg-gray-800 text-red-400' : 'bg-red-50 text-red-600'
          }`}>
            {userEmail}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={processing}
            className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-all ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <TranslateText text="Cancelar" />
          </button>
          <button
            onClick={onConfirm}
            disabled={processing}
            className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              processing
                ? 'bg-red-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            } text-white`}
          >
            {processing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <TranslateText text="Eliminando..." />
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <TranslateText text="Eliminar" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
