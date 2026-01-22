"use client";

import React, { useMemo } from "react";
import { TranslateText } from "@/components/TranslateText";
import { BarChart, Card, Title } from "@tremor/react";
import { mapBarDataToTremor, themeColorsForTremor } from "../components/charts/tremorAdapter";
import { PressItem } from "./page";

interface PressChartProps {
  data: PressItem[];
  theme: 'light' | 'dark';
}

export default function PressChartTremor({ data, theme }: PressChartProps) {
  // Reuse the same grouping logic as legacy to keep behavior identical
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const { labels, values } = useMemo(() => {
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
      if (counts.hasOwnProperty(key)) counts[key]++;
    });
    const sorted = Object.keys(counts).sort();
    const labels = sorted.map(k => {
      const [year, month] = k.split('-');
      return `${monthNames[parseInt(month) - 1]} ${year.slice(2)}`;
    });
    const values = sorted.map(k => counts[k]);
    return { labels, values };
  }, [data]);

  const tremorData = mapBarDataToTremor(labels, values, 'value');
  const isDark = theme === 'dark';
  const palette = themeColorsForTremor(theme);

  return (
    <Card className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
          <svg className={`w-5 h-5 ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`} viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h4v8H3zM10 7h4v14h-4zM17 3h4v18h-4z"/></svg>
        </div>
        <div>
          <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold`}><TranslateText text="Comunicados por Mes" /></h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs`}><TranslateText text="Últimos 6 meses" /></p>
        </div>
      </div>
      {/* Tremor BarChart expects data array of objects */}
      <div className="h-52">
        <BarChart
          data={tremorData}
          index="name"
          categories={["value"]}
          colors={palette}
          valueFormatter={(v) => `${v} comunicado${v !== 1 ? 's' : ''}`}
        />
      </div>
    </Card>
  );
}
