"use client";

import React, { useState } from 'react';
import { Sidebar } from '../dashboard/Sidebar';
import { Header } from '../dashboard/Header';
import { TranslateText } from '@/components/TranslateText';
import { CvList } from './CvList';
import { useCv } from './hooks/useCv';

export default function CvAdminPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { items, loading, error, fetchFormularios, downloadCv } = useCv();
  const [selected, setSelected] = useState<any | null>(null);

  const handleView = (item: any) => {
    setSelected(item);
  };

  const handleDownload = async (id: string, filename?: string) => {
    await downloadCv(id, filename);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-gray-950">
      <Sidebar selected="formularios" theme={theme} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header onLogout={() => {}} onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} theme={theme} />

        <main className="flex-1 p-6 md:p-8 lg:p-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white"><TranslateText text="Envíos de CV" /></h1>
              <p className="text-slate-600 dark:text-slate-400">Listado de CVs enviados por el público.</p>
            </div>
          </div>

          <CvList items={items} loading={loading} onRefresh={fetchFormularios} onView={handleView} onDownload={handleDownload} />

          {selected && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border shadow">
              <h3 className="font-semibold">Detalles</h3>
              <p className="text-sm text-slate-600">{selected.nombre_completo} — {selected.correo}</p>
              <p className="text-sm text-slate-500 mt-2">{selected.comentario}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
