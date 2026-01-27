"use client";

import React, { useMemo } from "react";
import { BarChart } from "../components/charts";
import { TranslateText } from "@/components/TranslateText";

export interface NewsItem {
  id?: string;
  title: string;
  date: string;
  status: string;
  category?: string;
}

interface NewsChartProps {
  data: NewsItem[];
  theme: "light" | "dark";
}

interface ChartStats {
  counts: Record<string, number>;
  total: number;
  maxValue: number;
  average: number;
  dates: string[];
}

export function NewsChart({ data, theme }: NewsChartProps) {
  const isDark = theme === "dark";

  const stats: ChartStats = useMemo(() => {
    const counts: Record<string, number> = {};
    
    if (Array.isArray(data)) {
      data.forEach((n: NewsItem) => {
        const raw = n.date;
        if (!raw) return;
        const s = String(raw);
        const d = s.slice(0, 10);
        counts[d] = (counts[d] || 0) + 1;
      });
    }
    
    const sortedDates = Object.keys(counts).sort();
    const values = sortedDates.map(d => counts[d]);
    const totalCount = values.reduce((a: number, b: number) => a + b, 0);
    const max = Math.max(...values, 1);
    const avg = values.length > 0 ? Math.round(totalCount / values.length) : 0;
    
    return {
      counts,
      total: totalCount,
      maxValue: max,
      average: avg,
      dates: sortedDates
    };
  }, [data]);

  const labels = stats.dates.slice(-10).map(l => {
    const date = new Date(l);
    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
  });
  const values = labels.map((_, i) => stats.counts[stats.dates[stats.dates.length - 10 + i]] || 0);

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
      {/* Decorative gradient background */}
      <div className={`absolute top-0 inset-x-0 h-32 opacity-10 ${
        isDark 
          ? 'bg-gradient-to-b from-blue-600 to-transparent' 
          : 'bg-gradient-to-b from-blue-500 to-transparent'
      }`} />
      
      <div className="relative p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl shadow-lg ${
              isDark ? "bg-gradient-to-br from-blue-600 to-blue-800" : "bg-gradient-to-br from-blue-500 to-blue-600"
            }`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                <TranslateText text="Tendencia de Publicaciones" />
              </h3>
              <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Actividad de los últimos 14 días
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-lg text-sm font-medium border ${
              isDark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-gray-50 border-gray-100 text-gray-600"
            }`}>
              <span className={`font-bold mr-1 ${isDark ? "text-blue-400" : "text-blue-600"}`}>{stats.total}</span> total
            </div>
            <div className={`px-4 py-2 rounded-lg text-sm font-medium border ${
              isDark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-gray-50 border-gray-100 text-gray-600"
            }`}>
              <span className={`font-bold mr-1 ${isDark ? "text-green-400" : "text-green-600"}`}>{stats.average}</span> / día
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <BarChart
            categories={labels}
            data={values}
            theme={theme}
            height="100%"
            colors={[isDark ? "#3b82f6" : "#2563eb"]}
            valueFormatter={(v: number) => `${v} ${v === 1 ? "noticia" : "noticias"}`}
            barRadius={8}
            showLabels={true}
          />
        </div>
      </div>

      <div className={`p-4 border-t flex items-center justify-between text-xs font-medium ${
        isDark ? "border-gray-800 text-gray-400 bg-gray-800/30" : "border-gray-100 text-gray-500 bg-gray-50/50"
      }`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? "bg-blue-500" : "bg-blue-600"}`}></span>
          <span>Pico máximo: {stats.maxValue} noticias en un día</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span>Actualizado en tiempo real</span>
        </div>
      </div>
    </div>
  );
}

export default NewsChart;

