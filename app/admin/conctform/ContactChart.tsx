"use client";

import React, { useMemo } from "react";
import { BarChart } from "../components/charts";
import { TranslateText } from "@/components/TranslateText";

type ContactMessage = {
  name: string;
  email: string;
  message: string;
  timestamp: string;
};

type Props = {
  data: ContactMessage[];
  theme?: "light" | "dark";
};

export function ContactChart({ data, theme = "dark" }: Props) {
  const isDark = theme === "dark";
  const total = data.length;

  const grouped = useMemo(() => {
    const map: Record<string, number> = {};
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      map[key] = 0;
    }
    data.forEach(item => {
      const key = item.timestamp.slice(0, 10);
      if (key in map) map[key]++;
    });
    const labels = Object.keys(map).sort();
    const values = labels.map(l => map[l]);
    return { labels, values };
  }, [data]);

  const formattedLabels = useMemo(() => 
    grouped.labels.map(l => {
      const date = new Date(l);
      return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
    }),
    [grouped.labels]
  );

  const maxValue = useMemo(() => Math.max(...grouped.values, 1), [grouped.values]);

  const palette = isDark 
    ? ["#3b82f6", "#34d399", "#a78bfa", "#fbbf24", "#22d3ee", "#f87171"]
    : ["#0057D9", "#059669", "#6B21A8", "#d97706", "#0099CC", "#dc2626"];

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600`} />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
              <svg className={`w-5 h-5 ${isDark ? "text-blue-400" : "text-blue-600"}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                <TranslateText text="Mensajes de Contacto" />
              </h3>
              <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                <TranslateText text="Ultimos 30 dias" />
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{total}</div>
            <div className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>
              <TranslateText text="Total Mensajes" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Card */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
        <div className={`absolute top-0 left-0 right-0 h-1 ${isDark ? "bg-gradient-to-r from-green-500 to-emerald-400" : "bg-gradient-to-r from-green-500 to-emerald-400"}`} />
        
        <div className="h-56">
          <BarChart
            categories={formattedLabels}
            data={grouped.values}
            theme={theme}
            height="100%"
            colors={[palette[0]]}
            valueFormatter={(v: number) => `${v} mensaje${v !== 1 ? "s" : ""}`}
            barRadius={4}
            showLabels={false}
            enableZoom
          />
        </div>

        {/* Stats footer */}
        <div className={`mt-4 pt-4 border-t flex items-center justify-between text-xs ${isDark ? "border-slate-700 text-slate-400" : "border-gray-100 text-gray-500"}`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isDark ? "bg-blue-500" : "bg-blue-600"}`}></span>
            <span>Maximo: {maxValue} mensajes/dia</span>
          </div>
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>Actualizado ahora</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactChart;

