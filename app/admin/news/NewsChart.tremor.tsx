"use client";

import React, { useMemo } from "react";
import { TranslateText } from "@/components/TranslateText";
import { BarChart, Card } from "@tremor/react";
import { mapBarDataToTremor } from "../components/charts/tremorAdapter";
import { NewsItem } from "./NewsFilter";

interface Props {
  data: NewsItem[];
  theme: 'light' | 'dark';
}

interface ChartStats {
  counts: Record<string, number>;
  total: number;
  maxValue: number;
  average: number;
  dates: string[];
}

export default function NewsChartTremor({ data, theme }: Props) {
  const isDark = theme === 'dark';
  
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
    const totalCount = values.reduce((a, b) => a + b, 0);
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

  const labels = stats.dates.slice(-10);
  const values = labels.map(l => stats.counts[l]);

  const tremorData = mapBarDataToTremor(
    labels.map(l => {
      const date = new Date(l);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    }), 
    values, 
    'Noticias'
  );

  return (
    <Card className={`
      relative overflow-hidden
      ${isDark 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
      }
    `}>
      {/* Header with gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600" />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`
            p-2.5 rounded-xl
            ${isDark ? 'bg-blue-900/40' : 'bg-blue-50'}
          `}>
            <svg viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Noticias por día" />
            </h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Últimas 2 semanas
            </p>
          </div>
        </div>
        
        {/* Stats badges */}
        <div className="flex items-center gap-3">
          <div className={`
            px-3 py-1.5 rounded-lg text-xs font-medium
            ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-600'}
          `}>
            <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>{stats.total}</span> total
          </div>
          <div className={`
            px-3 py-1.5 rounded-lg text-xs font-medium
            ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-600'}
          `}>
            <span className={isDark ? 'text-green-400' : 'text-green-600'}>{stats.average}</span> / día
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-56">
        <BarChart
          data={tremorData}
          index="name"
          categories={["Noticias"]}
          colors={["blue"]}
          valueFormatter={(value) => `${value} ${value === 1 ? 'noticia' : 'noticias'}`}
          showLegend={false}
          showGridLines={true}
          showYAxis={true}
          showXAxis={true}
          yAxisWidth={40}
        />
      </div>

      {/* Footer */}
      <div className={`
        mt-4 pt-4 border-t flex items-center justify-between text-xs
        ${isDark ? 'border-slate-700 text-slate-400' : 'border-gray-100 text-gray-500'}
      `}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
          <span>Máximo: {stats.maxValue} noticias</span>
        </div>
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span>Actualizado ahora</span>
        </div>
      </div>
    </Card>
  );
}

