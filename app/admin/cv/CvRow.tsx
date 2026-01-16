"use client";

import React from 'react';
import { Eye, Download } from 'lucide-react';
import type { FormularioItem } from './hooks/useCv';

interface Props {
  item: FormularioItem;
  onView: (item: FormularioItem) => void;
  onDownload: (id: string, filename?: string) => void;
}

export const CvRow: React.FC<Props> = ({ item, onView, onDownload }) => {
  return (
    <tr className="bg-white dark:bg-slate-800 border-b last:border-b-0">
      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{item.nombre_completo}</td>
      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{item.correo}</td>
      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{item.area_interes}</td>
      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{new Date(item.fecha).toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <button onClick={() => onView(item)} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
            <Eye className="w-4 h-4" />
          </button>
          {item.cv_filename && (
            <button onClick={() => onDownload(item.id, item.cv_original_name)} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
