"use client";

import React from "react";
import { X } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface Props {
  isOpen: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  theme?: 'light'|'dark';
}

export default function ConfirmModal({ isOpen, title = 'Confirmar', message = '', onCancel, onConfirm, theme = 'light' }: Props) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className={`relative w-full max-w-md rounded-2xl p-6 ${theme === 'dark' ? 'bg-gray-900 border border-gray-700 text-white' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button onClick={onCancel} className="p-2 rounded-md hover:bg-gray-100"><X className="w-4 h-4" /></button>
        </div>
        <p className="text-sm mb-6 text-gray-400">{message}</p>
        <div className="flex items-center justify-end gap-3">
          <button onClick={onCancel} className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>Cancelar</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-emerald-600 text-white font-semibold">Confirmar</button>
        </div>
      </div>
    </div>
  );
}
