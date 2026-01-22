"use client";

import React, { useMemo } from "react";
import { Card, BarChart } from "@tremor/react";
import { TranslateText } from "@/components/TranslateText";
import { mapBarDataToTremor, themeColorsForTremor } from "../components/charts/tremorAdapter";

type ContactMessage = {
  name: string;
  email: string;
  message: string;
  timestamp: string;
};

type Props = {
  data: ContactMessage[];
  theme?: 'light' | 'dark';
};

export default function ContactChart({ data, theme = 'dark' }: Props) {
  const palette = themeColorsForTremor(theme, 6);
  const isDark = theme === 'dark';

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

  const barData = useMemo(() => mapBarDataToTremor(grouped.labels, grouped.values, 'messages'), [grouped]);

  return (
    <div className="space-y-4">
      <Card className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}><TranslateText text="Mensajes de Contacto" /></h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}><TranslateText text="Últimos 30 días" /></p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{data.length}</div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}><TranslateText text="Total Mensajes" /></div>
          </div>
        </div>
      </Card>

      <Card className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'}`}>
        <div className="h-56">
          <BarChart
            data={barData}
            index="name"
            categories={["messages"]}
            colors={palette}
            valueFormatter={(v) => `${v} mensaje${v !== 1 ? 's' : ''}`}
          />
        </div>
      </Card>
    </div>
  );
}
