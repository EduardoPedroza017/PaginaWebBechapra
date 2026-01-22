"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, BarChart, DonutChart, AreaChart } from "@tremor/react";
import { TranslateText } from "@/components/TranslateText";
import { mapBarDataToTremor, themeColorsForTremor } from "../components/charts/tremorAdapter";

interface DbMetrics {
  total_documents: number;
  collections: {
    [key: string]: {
      count: number;
      size_bytes: number;
    };
  };
  total_size_mb: number;
  avg_doc_size_kb: number;
  last_backup?: string;
  performance?: {
    query_time_ms: number;
    connection_count: number;
    uptime_days: number;
  };
}

interface Props {
  theme: "light" | "dark";
  compact?: boolean;
}

export function DbMetricsSection({ theme, compact = false }: Props) {
  const [data, setData] = useState<DbMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    let mounted = true;
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL no definido");
        const res = await fetch(`${apiUrl}/admin/db/metrics`, { credentials: "include" });
        if (!res.ok) throw new Error("Error fetching metrics");
        const json = await res.json();
        if (mounted) setData(json);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchMetrics();
    return () => { mounted = false; };
  }, []);

  const collectionNames = Object.keys(data?.collections ?? {});
  const counts = collectionNames.map(n => data?.collections[n]?.count ?? 0);
  const sizesMB = collectionNames.map(n => ((data?.collections[n]?.size_bytes ?? 0) / 1024 / 1024));

  const palette = themeColorsForTremor(theme, 8);

  const donutData = useMemo(() => {
    const labels = collectionNames.slice(0, 8);
    const values = labels.map((l) => Math.round((data?.collections[l]?.size_bytes ?? 0) / 1024 / 1024));
    return mapBarDataToTremor(labels, values, 'mb');
  }, [data]);

  const barData = useMemo(() => {
    const labels = collectionNames.slice(0, 8).map(l => l.length > 18 ? l.slice(0,15) + '...' : l);
    const values = labels.map(l => data?.collections[l]?.count ?? 0);
    return mapBarDataToTremor(labels, values, 'docs');
  }, [data]);

  if (loading) {
    return (
      <Card>
        <div className={`py-6 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <TranslateText text="Cargando métricas de base de datos..." />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className={`py-6 text-center text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</div>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500"><TranslateText text="Documentos" /></div>
            <div className="text-xl font-bold">{(data?.total_documents ?? 0).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500"><TranslateText text="Tamaño" /></div>
            <div className="text-xl font-bold">{(data?.total_size_mb ?? 0).toFixed(1)} MB</div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}><TranslateText text="Métricas de Base de Datos" /></h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}><TranslateText text="Monitoreo y estadísticas del sistema de almacenamiento" /></p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{(data?.total_documents ?? 0).toLocaleString()}</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Documentos</div>
            </div>
          </div>
        </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'}`}>
          <h3 className="font-semibold mb-2"><TranslateText text="Documentos por Colección" /></h3>
          <div className="h-64">
            <BarChart data={barData} index="name" categories={["docs"]} colors={palette} valueFormatter={(v) => `${v.toLocaleString()} docs`} />
          </div>
        </Card>

        <Card className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'}`}>
          <h3 className="font-semibold mb-2"><TranslateText text="Distribución de Almacenamiento" /></h3>
          <div className="h-64">
            <DonutChart data={donutData} index="name" category="mb" colors={palette} valueFormatter={(v) => `${v} MB`} />
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold mb-2"><TranslateText text="Colecciones principales" /></h3>
        <div className="space-y-3">
          {collectionNames.slice(0, 6).map((name, i) => {
            const count = data?.collections[name]?.count ?? 0;
            const mb = ((data?.collections[name]?.size_bytes ?? 0) / 1024 / 1024).toFixed(2);
            const pct = (data && data.total_documents > 0) ? ((count / (data.total_documents || 1)) * 100).toFixed(1) : '0.0';
            return (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette[i % palette.length] }} />
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-xs text-gray-500">{count.toLocaleString()} documentos</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-700">{mb} MB • {pct}%</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default DbMetricsSection;
