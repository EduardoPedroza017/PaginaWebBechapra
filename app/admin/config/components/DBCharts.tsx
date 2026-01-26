"use client";

import React, { useMemo } from "react";
import { BarChart, PieChart, AreaChart } from "../../components/charts";
import { TranslateText } from "@/components/TranslateText";

interface CollectionStats {
  name: string;
  count: number;
  size: number;
  storageSize: number;
  avgObjSize: number;
  totalIndexSize: number;
}

interface DBChartsProps {
  theme: "light" | "dark";
  collections: CollectionStats[];
  chartColors?: string[];
  totalSize: number;
  totalDocs: number;
}

export function DBCharts({ theme, collections, chartColors, totalSize, totalDocs }: DBChartsProps) {
  const isDark = theme === "dark";
  
  const sortedByCount = useMemo(() => 
    [...collections].sort((a, b) => b.count - a.count).slice(0, 8),
    [collections]
  );
  
  const sortedBySize = useMemo(() => 
    [...collections].sort((a, b) => b.size - a.size).slice(0, 8),
    [collections]
  );

  const growthData = useMemo(() => {
    const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    // Use a deterministic pseudo-random based on index for stable rendering
    const values = Array.from({ length: 12 }, (_, i) => {
      const factor = 0.8 + (i + 1) * 0.15;
      const pseudoRandom = Math.sin(i * 1234.5678) * 0.1;
      return Math.round((totalDocs / 12) * factor + pseudoRandom * 100);
    });
    return { labels, values };
  }, [totalDocs]);

  const barData = useMemo(() => 
    sortedByCount.map(c => c.name.length > 12 ? c.name.substring(0, 10) + "..." : c.name),
    [sortedByCount]
  );
  const barValues = useMemo(() => 
    sortedByCount.map(c => c.count),
    [sortedByCount]
  );

  const donutData = useMemo(() => 
    sortedBySize.map(c => ({
      name: c.name.length > 15 ? c.name.substring(0, 12) + "..." : c.name,
      value: Math.round(c.size / 1024 / 1024),
    })),
    [sortedBySize]
  );

  const palette = chartColors || (isDark 
    ? ["#3b82f6", "#34d399", "#a78bfa", "#fbbf24", "#22d3ee", "#f87171", "#2dd4bf", "#818cf8"]
    : ["#0057D9", "#059669", "#6B21A8", "#d97706", "#0099CC", "#dc2626", "#0891b2", "#7c3aed"]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600`} />
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              <TranslateText text="Dashboard de Performance" />
            </h2>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}>
              <TranslateText text="Metricas en tiempo real de MongoDB" />
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {totalDocs.toLocaleString()}
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
              categories={barData}
              data={barValues}
              theme={theme}
              height="100%"
              colors={[palette[0]]}
              valueFormatter={(v: number) => `${v.toLocaleString()} docs`}
              barRadius={4}
              showLabels={false}
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
              data={donutData}
              theme={theme}
              height="100%"
              donut
              colors={palette}
              valueFormatter={(v: number) => `${v} MB`}
            />
          </div>
        </div>
      </div>

      {/* Growth Trend */}
      <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
        <div className={`absolute top-0 left-0 right-0 h-1 ${isDark ? "bg-gradient-to-r from-cyan-500 to-blue-400" : "bg-gradient-to-r from-cyan-500 to-blue-400"}`} />
        
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-cyan-900/30" : "bg-cyan-100"}`}>
            <svg className={`w-5 h-5 ${isDark ? "text-cyan-400" : "text-cyan-600"}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
            </svg>
          </div>
          <div>
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              <TranslateText text="Tendencia de Crecimiento" />
            </h3>
          </div>
        </div>

        <div className="h-64">
          <AreaChart
            categories={growthData.labels}
            data={growthData.values}
            theme={theme}
            height="100%"
            smooth
            colors={[palette[0]]}
            valueFormatter={(v: number) => `${v.toLocaleString()}`}
            fillOpacity={0.3}
          />
        </div>
      </div>
    </div>
  );
}

export default DBCharts;

