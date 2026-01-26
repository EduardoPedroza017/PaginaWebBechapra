"use client";

import React, { useState, useEffect } from 'react';

import { TranslateText } from "@/components/TranslateText";
import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminSection from "../components/ui/AdminSection";
import { useTheme } from "../hooks";
import { CvList } from './CvList';
import { useCv } from './hooks/useCv';
import { FileText, Download } from "lucide-react";

export default function CvAdminPage() {
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();
  const themeStrict: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  const [mounted, setMounted] = useState(false);
  const { items, loading, error, fetchFormularios, downloadCv, exportFormularios } = useCv();
  const [selected, setSelected] = useState<any | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleView = (item: any) => {
    setSelected(item);
  };

  const handleDownload = async (id: string, filename?: string) => {
    await downloadCv(id, filename);
  };

  const handleExport = async () => {
    setExporting(true);
    await exportFormularios();
    setExporting(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchFormularios();
    setTimeout(() => setRefreshing(false), 500);
  };

  if (!mounted || !themeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminPageHeader
        title="Envíos de CV"
        subtitle="Listado de CVs enviados por el público"
        icon={<FileText className="w-6 h-6 text-white" />}
        iconColor="blue"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: refreshing },
          export: { onClick: handleExport, loading: exporting, label: 'Exportar CSV' }
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "CVs" }]}
      />

      <AdminSection theme={themeStrict}>
        {error && (
          <div className={`mb-6 p-4 rounded-xl border ${
            themeStrict === 'dark'
              ? 'bg-red-900/20 border-red-700/50 text-red-300'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <p className="font-medium">{error}</p>
          </div>
        )}

        <CvList 
          items={items} 
          loading={loading} 
          onRefresh={fetchFormularios} 
          onView={handleView} 
          onDownload={handleDownload} 
        />

        {selected && (
          <div className={`mt-6 rounded-2xl p-4 border shadow ${
            themeStrict === 'dark' 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-gray-200'
          }`}>
            <h3 className="font-semibold mb-2">Detalles</h3>
            <p className={`text-sm ${themeStrict === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {selected.nombre_completo} — {selected.correo}
            </p>
            <p className={`text-sm mt-2 ${themeStrict === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
              {selected.comentario}
            </p>
          </div>
        )}
      </AdminSection>
    </div>
  );
}

