"use client";

import React, { useMemo } from "react";
import { TranslateText } from "@/components/TranslateText";
import { BarChart, Card } from "@tremor/react";
import { mapBarDataToTremor, themeColorsForTremor } from "../components/charts/tremorAdapter";
import { NewsItem } from "./NewsFilter";

interface Props {
  data: NewsItem[];
  theme: 'light' | 'dark';
}

export default function NewsChartTremor({ data, theme }: Props) {
  const isDark = theme === 'dark';
  const grouped = useMemo(() => {
    const counts: Record<string, number> = {};
    if (!Array.isArray(data)) return counts;
    data.forEach(n => {
      const raw = (n as any).date || (n as any).published_date || (n as any).publishedDate || (n as any).createdAt;
      if (!raw) return;
      const s = String(raw);
      const d = s.slice(0, 10);
      counts[d] = (counts[d] || 0) + 1;
    });
    return counts;
  }, [data]);

  const labels = Object.keys(grouped).sort().slice(-10);
  const values = labels.map(l => grouped[l]);

  const tremorData = mapBarDataToTremor(labels.map(l => l.slice(5)), values, 'value');
  const palette = themeColorsForTremor(theme);

  return (
    <Card className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-5 h-5 ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3 13h4v8H3zM10 7h4v14h-4zM17 3h4v18h-4z"/></svg>
        </div>
        <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold`}><TranslateText text="Noticias por día" /></h3>
      </div>
      <div className="h-48">
        <BarChart
          data={tremorData}
          index="name"
          categories={["value"]}
          colors={palette}
          valueFormatter={(v) => `${v} noticia${v !== 1 ? 's' : ''}`}
        />
      </div>
    </Card>
  );
}
