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

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md rounded-lg p-6 ${
        isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-200'
      }`}>
        {/* Close button */}
        <button
          onClick={onCancel}
          className={`absolute top-4 right-4 p-1 rounded ${
            isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`p-3 rounded-full ${
            isDark ? 'bg-red-900/30' : 'bg-red-100'
          }`}>
            <AlertTriangle className={`w-6 h-6 ${
              isDark ? 'text-red-400' : 'text-red-600'
            }`} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className={`text-lg font-bold mb-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <TranslateText text="Eliminar usuario" />
          </h2>
          <p className={`text-sm ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <TranslateText text="Esta acción no se puede deshacer. Se eliminará permanentemente el usuario:" />
          </p>
          <p className={`mt-2 px-4 py-2 rounded-lg font-mono text-sm ${
            isDark ? 'bg-slate-800 text-red-300' : 'bg-slate-100 text-red-600'
          }`}>
            {userEmail}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={processing}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium ${
              isDark
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <TranslateText text="Cancelar" />
          </button>
          <button
            onClick={onConfirm}
            disabled={processing}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 ${
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