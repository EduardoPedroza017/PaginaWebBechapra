import React from "react";
import { TranslateText } from "@/components/TranslateText";

interface DeleteUserModalProps {
  userEmail: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  processing?: boolean;
}

export function DeleteUserModal({ userEmail, open, onConfirm, onCancel, processing }: DeleteUserModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-lg font-bold mb-2 text-red-600 dark:text-red-400">
          <TranslateText text="¿Eliminar usuario?" />
        </h2>
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          <TranslateText text="¿Estás seguro que deseas eliminar el usuario" /> <span className="font-semibold">{userEmail}</span>?
        </p>
        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            disabled={processing}
          >
            <TranslateText text="Cancelar" />
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all"
            disabled={processing}
          >
            {processing ? <TranslateText text="Eliminando..." /> : <TranslateText text="Eliminar" />}
          </button>
        </div>
      </div>
    </div>
  );
}
