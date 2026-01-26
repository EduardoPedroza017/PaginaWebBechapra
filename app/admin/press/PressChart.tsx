"use client";

import React, { useMemo } from "react";
import { BarChart } from "../components/charts";
import { TranslateText } from "@/components/TranslateText";

export interface PressItem {
  id: string;
  title: string;
  date: string;
  status?: string;
}

interface PressChartProps {
  data: PressItem[];
  theme: 'light' | 'dark';
}

const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

/**
 * ECharts-based Press Chart - Comunicados por Mes
 * Replaces Tremor/Chart.js with modern animated ECharts
 */
export function PressChart({ data, theme }: PressChartProps) {
  const isDark = theme === 'dark';

  const { labels, values, maxValue } = useMemo(() => {
    const counts: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      counts[key] = 0;
    }
    data.forEach((item) => {
      const d = new Date(item.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (counts.hasOwnProperty(key)) {
        counts[key]++;
      }
    });
    const sortedKeys = Object.keys(counts).sort();
    const labels = sortedKeys.map(key => {
      const [year, month] = key.split('-');
      return `${monthNames[parseInt(month) - 1]} ${year.slice(2)}`;
    });
    const values = sortedKeys.map(k => counts[k]);
    const maxValue = Math.max(...values, 1);
    return { labels, values, maxValue };
  }, [data]);

  const total = values.reduce((a: number, b: number) => a + b, 0);

  return (
    <div className={`
      relative overflow-hidden rounded-2xl border p-5
      ${isDark 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700' 
        : 'bg-white border-gray-100 shadow-sm'
      }
    `}>
      {/* Gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        isDark ? 'bg-gradient-to-r from-emerald-600 to-teal-400' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
      }`} />

      <div className="flex items-center gap-3 mb-5">
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center
          ${isDark ? 'bg-emerald-900/30' : 'bg-emerald-100'}
        `}>
          <svg 
            className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M3 13h4v8H3zM10 7h4v14h-4zM17 3h4v18h-4z"/>
          </svg>
        </div>
        <div>
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <TranslateText text="Comunicados por Mes" />
          </h3>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <TranslateText text="Últimos 6 meses" />
          </p>
        </div>
      </div>

      {/* Stats badges */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`
          px-3 py-1.5 rounded-lg text-xs font-medium
          ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}
        `}>
          <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>{total}</span> total
        </div>
        <div className={`
          px-3 py-1.5 rounded-lg text-xs font-medium
          ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}
        `}>
          <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>{maxValue}</span> máximo
        </div>
      </div>

      <div className="h-52">
        <BarChart
          categories={labels}
          data={values}
          theme={theme}
          height="100%"
          colors={[isDark ? '#10b981' : '#059669']}
          valueFormatter={(v: number) => `${v} comunicado${v !== 1 ? 's' : ''}`}
          barRadius={8}
          showLabels={false}
        />
      </div>
    </div>
  );
}

export default PressChart;

