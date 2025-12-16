"use client";

import React, { useEffect } from "react";

interface Props {
  id?: string;
  type?: "success" | "error" | "info";
  message: string;
  onClose?: (id?: string) => void;
}

export default function Toast({ id, type = 'info', message, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(id), 4000);
    return () => clearTimeout(t);
  }, [onClose, id]);

  return (
    <div className={`max-w-xs w-full px-4 py-3 rounded-xl shadow-lg border flex items-start gap-3 transition-opacity duration-200 ${
      type === 'success' ? 'bg-emerald-600 text-white border-emerald-700' : type === 'error' ? 'bg-red-600 text-white border-red-700' : 'bg-gray-800 text-white border-gray-700'
    }`}>
      <div className="flex-1 text-sm">
        {message}
      </div>
      <button onClick={() => onClose && onClose(id)} className="text-xs opacity-80">Cerrar</button>
    </div>
  );
}
