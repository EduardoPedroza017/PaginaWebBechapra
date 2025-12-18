"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface EssenceHistoryItem {
  id: string;
  date?: string;
  user?: string;
  old: { mision: string; vision: string; valores: string };
  new: { mision: string; vision: string; valores: string };
}

interface Props {
  open: boolean;
  onClose: () => void;
  item: EssenceHistoryItem | null;
  theme: 'light' | 'dark';
  onRequestRestore?: (id: string) => void;
}

export default function EssenceHistoryModal({ open, onClose, item, theme, onRequestRestore }: Props) {
  if (!item) return null;

  const fields: Array<{ key: keyof typeof item.old; label: string }> = [
    { key: 'mision', label: 'Misión' },
    { key: 'vision', label: 'Visión' },
    { key: 'valores', label: 'Valores' },
  ];

  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-3xl w-full mx-auto p-6 sm:p-8 z-10`}> 
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="mb-4">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}><TranslateText text="Detalles del Cambio" /></h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {item.date ? new Date(item.date).toLocaleString() : ''} {item.user ? ` — ${item.user}` : ''}
            </p>
          </div>

          <div className="space-y-4">
            {fields.map(f => {
              const oldVal = item.old[f.key] || '';
              const newVal = item.new[f.key] || '';
              const changed = oldVal !== newVal;
              return (
                <div key={String(f.key)} className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{f.label}</h4>
                        {changed && <span className={`text-xs font-medium ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>Modificado</span>}
                      </div>
                      <div className="text-sm space-y-2">
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Antes</div>
                        <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} ${oldVal === '' ? 'italic text-gray-500' : ''}`}>
                          <div className="whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{ __html: oldVal || '<em>Sin contenido</em>' }} />
                        </div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Ahora</div>
                        <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} ${newVal === '' ? 'italic text-gray-500' : ''}`}>
                          <div className="whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{ __html: newVal || '<em>Sin contenido</em>' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end gap-3">
            {onRequestRestore && (
              <button onClick={() => onRequestRestore(item.id)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white">Restaurar</button>
            )}
            <button onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Cerrar</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
