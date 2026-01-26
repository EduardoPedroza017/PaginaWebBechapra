"use client";

import React, { useMemo, useState } from "react";
import { PieChart, BarChart, AreaChart, LineChart } from "../components/charts";
import { TranslateText } from "@/components/TranslateText";

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

interface Props {
  data: CookieConsent[];
  theme?: "light" | "dark";
  className?: string;
  activeChart?: "distribution" | "dailyActivity" | "trend" | "all";
}

export function CookieCharts({ data, theme = "dark", className, activeChart = "all" }: Props) {
  const isDark = theme === "dark";
  const [selectedView, setSelectedView] = useState<string>(activeChart === "all" ? "distribution" : activeChart);

  const accepted = useMemo(() => data.filter(d => d.accepted).length, [data]);
  const rejected = useMemo(() => data.filter(d => !d.accepted).length, [data]);
  const total = useMemo(() => data.length, [data]);

  const last7 = useMemo(() => {
    const map: Record<string, { accepted: number; rejected: number }> = {};
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      map[key] = { accepted: 0, rejected: 0 };
    }
    data.forEach(it => {
      const k = new Date(it.timestamp).toISOString().split("T")[0];
      if (map[k]) {
        if (it.accepted) map[k].accepted++; else map[k].rejected++;
      }
    });
    const keys = Object.keys(map).sort();
    const labels = keys.map(k => {
      const d = new Date(k);
      const todayDate = new Date();
      const yesterday = new Date(todayDate); yesterday.setDate(yesterday.getDate() - 1);
      if (d.toDateString() === todayDate.toDateString()) return "Hoy";
      if (d.toDateString() === yesterday.toDateString()) return "Ayer";
      return d.toLocaleDateString("es-ES", { weekday: "short", day: "2-digit" });
    });
    const acceptedArr = keys.map(k => map[k].accepted);
    const rejectedArr = keys.map(k => map[k].rejected);
    return { labels, acceptedArr, rejectedArr };
  }, [data]);

  const distributionData = useMemo(() => [
    { name: "Aceptados", value: accepted },
    { name: "Rechazados", value: rejected },
  ], [accepted, rejected]);

  const barMultiData = useMemo(() => [
    { name: "Aceptados", data: last7.acceptedArr },
    { name: "Rechazados", data: last7.rejectedArr },
  ], [last7]);

  const trendData = useMemo(() => 
    last7.labels.map((_, i) => last7.acceptedArr[i] + last7.rejectedArr[i]),
    [last7]
  );

  const views = [
    { id: "distribution", label: "Distribucion", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" },
    { id: "dailyActivity", label: "Actividad Diaria", icon: "M3 13h4v8H3zM10 7h4v14h-4zM17 3h4v18h-4z" },
    { id: "trend", label: "Tendencia", icon: "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" },
  ];

  const showDistribution = activeChart === "all" || activeChart === "distribution";
  const showDailyActivity = activeChart === "all" || activeChart === "dailyActivity";
  const showTrend = activeChart === "all" || activeChart === "trend";

  return (
    <div className={className}>
      {activeChart === "all" && (
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                selectedView === view.id
                  ? isDark ? "bg-blue-600 text-white" : "bg-blue-600 text-white"
                  : isDark ? "bg-slate-800 text-slate-300" : "bg-gray-100 text-gray-600"
              }`}
            >
              <TranslateText text={view.label} />
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {((activeChart === "all" && selectedView === "distribution") || showDistribution) && (
          <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
            <div className={`absolute top-0 left-0 right-0 h-1 ${isDark ? "bg-gradient-to-r from-green-500 to-emerald-400" : "bg-gradient-to-r from-green-500 to-emerald-400"}`} />
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-green-900/30" : "bg-green-100"}`}>
                <svg className={`w-5 h-5 ${isDark ? "text-green-400" : "text-green-600"}`} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  <TranslateText text="Distribucion" />
                </h3>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                  <TranslateText text="Consentimientos totales" />
                </p>
              </div>
            </div>

            <div className="h-48">
              <PieChart
                data={distributionData}
                theme={theme}
                height="100%"
                donut
                showPercentage
                colors={isDark ? ["#34d399", "#f87171"] : ["#10b981", "#ef4444"]}
                valueFormatter={(v: number) => `${v} (${((v / (total || 1)) * 100).toFixed(1)}%)`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className={`p-3 rounded-lg ${isDark ? "bg-slate-800/50" : "bg-gray-50"}`}>
                <div className={`text-xl font-bold ${isDark ? "text-green-400" : "text-green-600"}`}>{accepted}</div>
                <div className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>Aceptados</div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? "bg-slate-800/50" : "bg-gray-50"}`}>
                <div className={`text-xl font-bold ${isDark ? "text-red-400" : "text-red-600"}`}>{rejected}</div>
                <div className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>Rechazados</div>
              </div>
            </div>
          </div>
        )}

        {((activeChart === "all" && selectedView === "dailyActivity") || showDailyActivity) && (
          <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
            <div className={`absolute top-0 left-0 right-0 h-1 ${isDark ? "bg-gradient-to-r from-blue-500 to-cyan-400" : "bg-gradient-to-r from-blue-500 to-cyan-400"}`} />
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                <svg className={`w-5 h-5 ${isDark ? "text-blue-400" : "text-blue-600"}`} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h4v8H3zM10 7h4v14h-4zM17 3h4v18h-4z"/>
                </svg>
              </div>
              <div>
                <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  <TranslateText text="Actividad Diaria" />
                </h3>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                  <TranslateText text="Ultimos 7 dias" />
                </p>
              </div>
            </div>

            <div className="h-48">
              <BarChart
                categories={last7.labels}
                data={barMultiData}
                theme={theme}
                height="100%"
                colors={isDark ? ["#34d399", "#f87171"] : ["#10b981", "#ef4444"]}
                valueFormatter={(v: number) => `${v}`}
                barRadius={4}
              />
            </div>
          </div>
        )}

        {((activeChart === "all" && selectedView === "trend") || showTrend) && (
          <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
            <div className={`absolute top-0 left-0 right-0 h-1 ${isDark ? "bg-gradient-to-r from-purple-500 to-violet-400" : "bg-gradient-to-r from-purple-500 to-violet-400"}`} />
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-purple-900/30" : "bg-purple-100"}`}>
                <svg className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                </svg>
              </div>
              <div>
                <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  <TranslateText text="Tendencia" />
                </h3>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                  <TranslateText text="Ultimos 7 dias" />
                </p>
              </div>
            </div>

            <div className="h-48">
              <AreaChart
                categories={last7.labels}
                data={trendData}
                theme={theme}
                height="100%"
                smooth
                colors={[isDark ? "#a78bfa" : "#8b5cf6"]}
                valueFormatter={(v: number) => `${v}`}
                fillOpacity={0.3}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CookieCharts;

