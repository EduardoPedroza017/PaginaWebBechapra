"use client";

import React from 'react';
import { CvRow } from './CvRow';
import type { FormularioItem } from './hooks/useCv';

interface Props {
  items: FormularioItem[];
  loading: boolean;
  onRefresh: () => void;
  onView: (item: FormularioItem) => void;
  onDownload: (id: string, filename?: string) => void;
}

export const CvList: React.FC<Props> = ({ items, loading, onRefresh, onView, onDownload }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-4 border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Envíos de CV</h3>
        <div>
          <button onClick={onRefresh} className="px-3 py-2 bg-blue-500 text-white rounded-md">{loading ? 'Cargando...' : 'Actualizar'}</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-slate-500">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Área</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <CvRow key={it.id} item={it} onView={onView} onDownload={onDownload} />
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div className="p-6 text-center text-slate-600 dark:text-slate-400">No hay envíos aún.</div>
        )}
      </div>
    </div>
  );
};
