"use client";

import React, { useMemo } from "react";
import { Card, BarChart, DonutChart, AreaChart } from "@tremor/react";
import { TranslateText } from "@/components/TranslateText";
import { mapBarDataToTremor, mapMultiSeriesToTremor, themeColorsForTremor } from "../../components/charts/tremorAdapter";

interface CollectionStats {
  name: string;
  count: number;
  size: number;
  storageSize: number;
  avgObjSize: number;
  totalIndexSize: number;
}

interface DBChartsProps {
  theme: "light" | "dark";
  collections: CollectionStats[];
  chartColors: string[];
  totalSize: number;
  totalDocs: number;
}

export default function DBChartsTremor({ theme, collections, chartColors, totalSize, totalDocs }: DBChartsProps) {
  const isDark = theme === 'dark';
  const sortedByCount = [...collections].sort((a, b) => b.count - a.count).slice(0, 8);
  const sortedBySize = [...collections].sort((a, b) => b.size - a.size).slice(0, 8);

  const barData = useMemo(() => {
    const labels = sortedByCount.map(c => c.name.length > 12 ? c.name.substring(0, 10) + '...' : c.name);
    const values = sortedByCount.map(c => c.count);
    return mapBarDataToTremor(labels, values, 'docs');
  }, [sortedByCount]);

  const donutData = useMemo(() => {
    const labels = sortedBySize.map(c => c.name);
    const values = sortedBySize.map(c => Math.round(c.size / 1024 / 1024));
    return mapBarDataToTremor(labels, values, 'mb');
  }, [sortedBySize]);

  const lineData = useMemo(() => {
    const labels = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const values = Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000) + 5000);
    return mapBarDataToTremor(labels, values, 'value');
  }, []);

  const palette = themeColorsForTremor(theme);

  return (
    <div className="space-y-6">
      <Card className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}><TranslateText text="Dashboard de Performance" /></h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}><TranslateText text="Métricas en tiempo real de MongoDB" /></p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalDocs.toLocaleString()}</div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Documentos</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-2"><TranslateText text="Documentos por Colección" /></h3>
            <div className="h-64">
              <BarChart data={barData} index="name" categories={["docs"]} colors={palette} valueFormatter={(v) => `${v.toLocaleString()} docs`} />
            </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-2"><TranslateText text="Distribución de Almacenamiento" /></h3>
          <div className="h-64">
            <DonutChart data={donutData} index="name" category="mb" colors={palette} valueFormatter={(v) => `${v} MB`} />
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold mb-2"><TranslateText text="Tendencia de Crecimiento" /></h3>
        <div className="h-64">
          <AreaChart data={lineData} index="name" categories={["value"]} colors={palette} valueFormatter={(v) => `${v}`} />
        </div>
      </Card>
    </div>
  );
}
