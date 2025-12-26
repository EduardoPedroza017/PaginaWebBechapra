"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import { X, Check } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
}

export default function ConfirmModal({ open, title = "Confirmar", description, confirmLabel = "Confirmar", cancelLabel = "Cancelar", loading = false, onClose, onConfirm }: ConfirmModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full mx-auto p-6 sm:p-8 z-10">
          <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
          {description && <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>}
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{cancelLabel}</button>
            <button disabled={loading} onClick={() => onConfirm()} className="px-4 py-2 rounded-xl bg-emerald-600 text-white inline-flex items-center gap-2">{loading ? 'Procesando...' : <><Check className="w-4 h-4" />{confirmLabel}</>}</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
