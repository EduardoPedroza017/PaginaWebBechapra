"use client";

import React, { useMemo } from "react";
import { PieChart, BarChart, AreaChart, LineChart } from "../components/charts";
import { TranslateText } from "@/components/TranslateText";

interface AuditLogChartsProps {
  successCount: number;
  failCount: number;
  byUser: { [key: string]: number };
  byDate: { [key: string]: number };
  theme: "light" | "dark";
}

export function AuditLogCharts({ successCount, failCount, byUser, byDate, theme }: AuditLogChartsProps) {
  const isDark = theme === "dark";
  const total = successCount + failCount;

  const pieData = useMemo(() => [
    { name: "Exitos", value: successCount },
    { name: "Fallidos", value: failCount },
  ], [successCount, failCount]);

  const topUsers = useMemo(() => {
    return Object.entries(byUser)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);
  }, [byUser]);

  const userLabels = useMemo(() => 
    topUsers.map(([u]) => u.length > 15 ? `${u.substring(0, 12)}...` : u),
    [topUsers]
  );
  const userValues = useMemo(() => 
    topUsers.map(([, c]) => c),
    [topUsers]
  );

  const dateLabels = useMemo(() => Object.keys(byDate).sort(), [byDate]);
  const trendValues = useMemo(() => 
    dateLabels.slice(-30).map(d => byDate[d] || 0),
    [byDate, dateLabels]
  );
  const trendLabels = useMemo(() => 
    dateLabels.slice(-30).map(d => {
      const dt = new Date(d);
      return dt.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
    }),
    [dateLabels]
  );

  const successRate = useMemo(() => {
    if (total === 0) return 0;
    return ((successCount / total) * 100).toFixed(1);
  }, [successCount, total]);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600`} />
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              <TranslateText text="Analisis de Auditoria" />
            </h3>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>
              <TranslateText text="Metricas y tendencias de acceso al sistema" />
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {total.toLocaleString()}
            </div>
            <div className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>
              <TranslateText text="Total Intentos" />
            </div>
            <div className={`mt-1 text-sm font-medium ${Number(successRate) >= 90 ? "text-green-500" : Number(successRate) >= 70 ? "text-yellow-500" : "text-red-500"}`}>
              {successRate}% exitos
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Success vs Failed */}
        <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
          <div className={`absolute top-0 left-0 right-0 h-1 ${isDark ? "bg-gradient-to-r from-green-500 to-emerald-400" : "bg-gradient-to-r from-green-500 to-emerald-400"}`} />
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-green-900/30" : "bg-green-100"}`}>
              <svg className={`w-5 h-5 ${isDark ? "text-green-400" : "text-green-600"}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                <TranslateText text="Exitos vs Fallidos" />
              </h4>
            </div>
          </div>

          <div className="h-44">
            <PieChart
              data={pieData}
              theme={theme}
              height="100%"
              donut
              colors={isDark ? ["#34d399", "#f87171"] : ["#10b981", "#ef4444"]}
              valueFormatter={(v: number) => `${v}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className={`p-3 rounded-lg ${isDark ? "bg-slate-800/50" : "bg-gray-50"}`}>
              <div className={`text-xl font-bold ${isDark ? "text-green-400" : "text-green-600"}`}>{successCount}</div>
              <div className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>Exitos</div>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? "bg-slate-800/50" : "bg-gray-50"}`}>
              <div className={`text-xl font-bold ${isDark ? "text-red-400" : "text-red-600"}`}>{failCount}</div>
              <div className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>Fallidos</div>
            </div>
          </div>
        </div>

        {/* Top Users */}
        <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
          <div className={`absolute top-0 left-0 right-0 h-1 ${isDark ? "bg-gradient-to-r from-blue-500 to-cyan-400" : "bg-gradient-to-r from-blue-500 to-cyan-400"}`} />
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
              <svg className={`w-5 h-5 ${isDark ? "text-blue-400" : "text-blue-600"}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <div>
              <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                <TranslateText text="Usuarios activos" />
              </h4>
            </div>
          </div>

          <div className="h-44">
            <BarChart
              categories={userLabels}
              data={userValues}
              theme={theme}
              height="100%"
              colors={[isDark ? "#3b82f6" : "#0057D9"]}
              valueFormatter={(v: number) => `${v} intentos`}
              barRadius={4}
              showLabels={false}
              horizontal
            />
          </div>
        </div>

        {/* Access Trend */}
        <div className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}>
          <div className={`absolute top-0 left-0 right-0 h-1 ${isDark ? "bg-gradient-to-r from-purple-500 to-violet-400" : "bg-gradient-to-r from-purple-500 to-violet-400"}`} />
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-purple-900/30" : "bg-purple-100"}`}>
              <svg className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
              </svg>
            </div>
            <div>
              <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                <TranslateText text="Accesos (ultimos 30 dias)" />
              </h4>
            </div>
          </div>

          <div className="h-44">
            <AreaChart
              categories={trendLabels}
              data={trendValues}
              theme={theme}
              height="100%"
              smooth
              colors={[isDark ? "#a78bfa" : "#8b5cf6"]}
              valueFormatter={(v: number) => `${v}`}
              fillOpacity={0.3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuditLogCharts;

