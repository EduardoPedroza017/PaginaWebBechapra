"use client";

import React, { useEffect, useMemo, useState } from "react";
import { BarChart, PieChart, GaugeChart } from "../components/charts";
import { TranslateText } from "@/components/TranslateText";

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
  const isDark = theme === "dark";

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

  const distributionData = useMemo(() => {
    return collectionNames.slice(0, 8).map((name, i) => ({
      name: name.length > 15 ? name.substring(0, 12) + "..." : name,
      value: Math.round(((data?.collections[name]?.size_bytes ?? 0) / 1024 / 1024) * 100) / 100,
    }));
  }, [data]);

  const documentData = useMemo(() => {
    const labels = collectionNames.slice(0, 8).map(l => l.length > 18 ? l.slice(0, 15) + "..." : l);
    const values = labels.map(l => data?.collections[l]?.count ?? 0);
    return { labels, values };
  }, [data]);

  if (loading) {
    return (
      <div className={`rounded-2xl border p-5 ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
            <div className="w-5 h-5 m-2.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
          <div>
            <div className={`h-5 w-32 rounded ${isDark ? "bg-gray-700" : "bg-gray-200"}`}></div>
            <div className={`h-4 w-24 rounded mt-1 ${isDark ? "bg-gray-700" : "bg-gray-200"}`}></div>
          </div>
        </div>
        <div className={`h-32 rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-100"}`}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-2xl border p-5 ${isDark ? "bg-red-900/20 border-red-800" : "bg-red-50 border-red-200"}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-red-900/30" : "bg-red-100"}`}>
            <svg className={`w-5 h-5 ${isDark ? "text-red-400" : "text-red-600"}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <div>
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              <TranslateText text="Error al cargar metricas" />
            </h3>
            <p className={`text-sm ${isDark ? "text-red-400" : "text-red-600"}`}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`rounded-2xl border p-4 ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500"><TranslateText text="Documentos" /></div>
            <div className="text-xl font-bold">{data?.total_documents?.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500"><TranslateText text="Tamano" /></div>
            <div className="text-xl font-bold">{(data?.total_size_mb ?? 0).toFixed(1)} MB</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600`} />
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              <TranslateText text="Metricas de Base de Datos" />
            </h2>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}>
              <TranslateText text="Monitoreo y estadisticas del sistema de almacenamiento" />
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {data?.total_documents?.toLocaleString()}
            </div>
            <div className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>Total Documentos</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documents by Collection */}
        <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
          <div className={`absolute top-0 left-0 right-0 h-1 ${isDark ? "bg-gradient-to-r from-green-500 to-emerald-400" : "bg-gradient-to-r from-green-500 to-emerald-400"}`} />
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-green-900/30" : "bg-green-100"}`}>
              <svg className={`w-5 h-5 ${isDark ? "text-green-400" : "text-green-600"}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h4v8H3zM10 7h4v14h-4zM17 3h4v18h-4z"/>
              </svg>
            </div>
            <div>
              <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                <TranslateText text="Documentos por Coleccion" />
              </h3>
            </div>
          </div>

          <div className="h-64">
            <BarChart
              categories={documentData.labels}
              data={documentData.values}
              theme={theme}
              height="100%"
              colors={[isDark ? "#34d399" : "#10b981"]}
              valueFormatter={(v: number) => `${v.toLocaleString()} docs`}
              barRadius={4}
              showLabels={false}
              horizontal
            />
          </div>
        </div>

        {/* Storage Distribution */}
        <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
          <div className={`absolute top-0 left-0 right-0 h-1 ${isDark ? "bg-gradient-to-r from-purple-500 to-violet-400" : "bg-gradient-to-r from-purple-500 to-violet-400"}`} />
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-purple-900/30" : "bg-purple-100"}`}>
              <svg className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/>
              </svg>
            </div>
            <div>
              <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                <TranslateText text="Distribucion de Almacenamiento" />
              </h3>
            </div>
          </div>

          <div className="h-64">
            <PieChart
              data={distributionData}
              theme={theme}
              height="100%"
              donut
              colors={isDark 
                ? ["#3b82f6", "#34d399", "#a78bfa", "#fbbf24", "#22d3ee", "#f87171", "#2dd4bf", "#818cf8"]
                : ["#0057D9", "#059669", "#6B21A8", "#d97706", "#0099CC", "#dc2626", "#0891b2", "#7c3aed"]
              }
              valueFormatter={(v: number) => `${v} MB`}
            />
          </div>
        </div>
      </div>

      {/* Collection Details */}
      <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-cyan-900/30" : "bg-cyan-100"}`}>
            <svg className={`w-5 h-5 ${isDark ? "text-cyan-400" : "text-cyan-600"}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
            </svg>
          </div>
          <div>
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              <TranslateText text="Colecciones principales" />
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collectionNames.slice(0, 6).map((name, i) => {
            const count = data?.collections[name]?.count ?? 0;
            const mb = ((data?.collections[name]?.size_bytes ?? 0) / 1024 / 1024).toFixed(2);
            const pct = (data && data.total_documents > 0) ? ((count / (data.total_documents || 1)) * 100).toFixed(1) : "0.0";
            const colors = isDark 
              ? ["#3b82f6", "#34d399", "#a78bfa", "#fbbf24", "#22d3ee", "#f87171"]
              : ["#0057D9", "#059669", "#6B21A8", "#d97706", "#0099CC", "#dc2626"];
            
            return (
              <div key={name} className={`p-4 rounded-xl ${isDark ? "bg-slate-800/50" : "bg-gray-50"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
                  <span className={`font-medium truncate ${isDark ? "text-white" : "text-gray-900"}`}>{name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={isDark ? "text-slate-400" : "text-gray-500"}>{count.toLocaleString()} docs</span>
                  <span className={`font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`}>{mb} MB</span>
                </div>
                <div className={`mt-2 text-xs ${isDark ? "text-slate-500" : "text-gray-400"}`}>{pct}% del total</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DbMetricsSection;

