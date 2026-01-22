"use client";

import React, { useMemo } from "react";
import { Card, DonutChart, BarChart, AreaChart } from "@tremor/react";
import { TranslateText } from "@/components/TranslateText";
import { mapBarDataToTremor, mapMultiSeriesToTremor, themeColorsForTremor } from "../components/charts/tremorAdapter";

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

interface Props {
  data: CookieConsent[];
  theme?: 'light' | 'dark';
  className?: string;
  activeChart?: 'distribution' | 'dailyActivity' | 'trend' | 'all';
}

export default function CookieChartsTremor({ data, theme = 'dark', className, activeChart = 'all' }: Props) {
  const isDark = theme === 'dark';
  const accepted = data.filter(d => d.accepted).length;
  const rejected = data.filter(d => !d.accepted).length;
  const total = data.length;

  const last7 = useMemo(() => {
    const map: Record<string, { accepted: number; rejected: number }> = {};
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      map[key] = { accepted: 0, rejected: 0 };
    }
    data.forEach(it => {
      const k = new Date(it.timestamp).toISOString().split('T')[0];
      if (map[k]) {
        if (it.accepted) map[k].accepted++; else map[k].rejected++;
      }
    });
    const keys = Object.keys(map).sort();
    const labels = keys.map(k => {
      const d = new Date(k);
      const today = new Date();
      const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
      if (d.toDateString() === today.toDateString()) return 'Hoy';
      if (d.toDateString() === yesterday.toDateString()) return 'Ayer';
      return d.toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit' });
    });
    const acceptedArr = keys.map(k => map[k].accepted);
    const rejectedArr = keys.map(k => map[k].rejected);
    return { labels, acceptedArr, rejectedArr };
  }, [data]);

  const donutData = mapBarDataToTremor([ 'Aceptados', 'Rechazados' ], [ accepted, rejected ], 'value');
  const barMulti = mapMultiSeriesToTremor(last7.labels, [ { key: 'Aceptados', data: last7.acceptedArr }, { key: 'Rechazados', data: last7.rejectedArr } ]);
  const lineData = mapBarDataToTremor(last7.labels, last7.labels.map((_,i) => last7.acceptedArr[i] + last7.rejectedArr[i]), 'total');
  const palette = themeColorsForTremor(theme as any);

  const showDistribution = activeChart === 'all' || activeChart === 'distribution';
  const showDailyActivity = activeChart === 'all' || activeChart === 'dailyActivity';
  const showTrend = activeChart === 'all' || activeChart === 'trend';

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {showDistribution && (
            <Card>
              <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-bold`}><TranslateText text="Distribución" /></h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs`}><TranslateText text="Consentimientos totales" /></p>
                <div className="h-48 mt-4">
                  <DonutChart data={donutData} index="name" category="value" colors={palette} valueFormatter={(v) => `${v} (${((v/ (total || 1))*100).toFixed(1)}%)`} />
                </div>
            </Card>
          )}

        {showDailyActivity && (
          <Card>
            <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-bold`}><TranslateText text="Actividad Diaria" /></h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs`}><TranslateText text="Últimos 7 días" /></p>
            <div className="h-48 mt-4">
              <BarChart data={barMulti} index="name" categories={[ 'Aceptados', 'Rechazados' ]} colors={palette} valueFormatter={(v) => `${v} recibidos`} />
            </div>
          </Card>
        )}

        {showTrend && (
          <Card>
            <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-bold`}><TranslateText text="Tendencia" /></h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs`}><TranslateText text="Últimos 7 días" /></p>
            <div className="h-48 mt-4">
              <AreaChart data={lineData} index="name" categories={[ 'total' ]} colors={palette} valueFormatter={(v) => `${v} total`} />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
