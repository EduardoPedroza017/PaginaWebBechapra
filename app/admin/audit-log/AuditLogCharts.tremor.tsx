"use client";

import React, { useMemo } from "react";
import { Card, DonutChart, BarChart, AreaChart } from "@tremor/react";
import { TranslateText } from "@/components/TranslateText";
import { mapBarDataToTremor, mapMultiSeriesToTremor, themeColorsForTremor } from "../components/charts/tremorAdapter";

interface AuditLogChartsProps {
  successCount: number;
  failCount: number;
  byUser: { [key: string]: number };
  byDate: { [key: string]: number };
  theme: 'light' | 'dark';
}

export function AuditLogCharts({ successCount, failCount, byUser, byDate, theme }: AuditLogChartsProps) {
  const isDark = theme === 'dark';
  const palette = themeColorsForTremor(theme, 8);

  const pieData = useMemo(() => {
    const labels = ['Éxitos', 'Fallidos'];
    const values = [successCount, failCount];
    return mapBarDataToTremor(labels, values, 'count');
  }, [successCount, failCount]);

  const topUsers = useMemo(() => {
    return Object.entries(byUser)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);
  }, [byUser]);

  const barData = useMemo(() => {
    const labels = topUsers.map(([u]) => u.length > 15 ? `${u.substring(0,12)}...` : u);
    const values = topUsers.map(([, c]) => c);
    return mapBarDataToTremor(labels, values, 'attempts');
  }, [topUsers]);

  const dateLabels = useMemo(() => Object.keys(byDate).sort(), [byDate]);
  const lineData = useMemo(() => {
    const labels = dateLabels.slice(-30).map(d => {
      const dt = new Date(d);
      return dt.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    });
    const values = dateLabels.slice(-30).map(d => byDate[d] || 0);
    return mapBarDataToTremor(labels, values, 'accesses');
  }, [byDate, dateLabels]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}><TranslateText text="Análisis de Auditoría" /></h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}><TranslateText text="Métricas y tendencias de acceso al sistema" /></p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{(successCount + failCount).toLocaleString()}</div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}><TranslateText text="Total Intentos" /></div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'}`}>
          <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}><TranslateText text="Éxitos vs Fallidos" /></h4>
          <div className="h-44">
            <DonutChart data={pieData} index="name" category="count" colors={[palette[0], palette[1]]} valueFormatter={(v) => `${v}`} />
          </div>
        </Card>

        <Card className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'}`}>
          <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}><TranslateText text="Usuarios activos" /></h4>
          <div className="h-44">
            <BarChart data={barData} index="name" categories={["attempts"]} colors={palette} valueFormatter={(v) => `${v} intentos`} />
          </div>
        </Card>

        <Card className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'}`}>
          <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}><TranslateText text="Accesos (últimos 30 días)" /></h4>
          <div className="h-44">
            <AreaChart data={lineData} index="name" categories={["accesses"]} colors={[palette[2]]} valueFormatter={(v) => `${v}`} />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AuditLogCharts;
