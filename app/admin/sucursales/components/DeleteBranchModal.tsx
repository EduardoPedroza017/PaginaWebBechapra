"use client";

import { TranslateText } from "@/components/TranslateText";
import { AlertTriangle, X } from "lucide-react";

interface DeleteBranchModalProps {
  isOpen: boolean;
  branchName: string | null;
  theme: 'light' | 'dark';
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteBranchModal({
  isOpen,
  branchName,
  theme,
  loading,
  onClose,
  onConfirm
}: DeleteBranchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md rounded-2xl p-6 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
            theme === "dark" ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"
          }`}
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            theme === "dark" ? "bg-red-900/30" : "bg-red-100"
          }`}>
            <AlertTriangle className={`w-8 h-8 ${
              theme === "dark" ? "text-red-400" : "text-red-600"
            }`} />
          </div>

          <h3 className={`text-xl font-bold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <TranslateText text="¿Eliminar sucursal?" />
          </h3>

          <p className={`mb-6 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            <TranslateText text="Estás a punto de eliminar" />{" "}
            <span className={`font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              {branchName}
            </span>
            . <TranslateText text="Esta acción no se puede deshacer." />
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <TranslateText text="Cancelar" />
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : theme === "dark"
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {loading ? (
                <TranslateText text="Eliminando..." />
              ) : (
                <TranslateText text="Sí, eliminar" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
