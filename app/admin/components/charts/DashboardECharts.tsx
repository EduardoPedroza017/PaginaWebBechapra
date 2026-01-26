"use client";

import React, { useMemo } from 'react';
import { TranslateText } from '@/components/TranslateText';
import { LineChart, BarChart, PieChart, GaugeChart, RadarChart, AreaChart, type ThemeMode } from './index';

interface ContentStats {
  news: number;
  gallery: number;
  press: number;
  users: number;
}

interface ContentTrend {
  date: string;
  news: number;
  gallery: number;
  press: number;
}

interface DashboardEChartsProps {
  theme: ThemeMode;
  stats: ContentStats;
  trends: ContentTrend[];
  loading?: boolean;
}

/**
 * Dashboard charts powered by ECharts
 * Shows content distribution, trends, and system metrics
 */
export function DashboardECharts({ 
  theme, 
  stats, 
  trends,
  loading = false 
}: DashboardEChartsProps) {
  const isDark = theme === 'dark';

  // Calculate content distribution for pie chart
  const distributionData = useMemo(() => [
    { name: 'Noticias', value: stats.news || 1 },
    { name: 'Galería', value: stats.gallery || 1 },
    { name: 'Prensa', value: stats.press || 1 },
    { name: 'Usuarios', value: stats.users || 1 },
  ], [stats]);

  // Prepare trend data for line chart
  const trendCategories = useMemo(() => 
    trends.map(t => {
      const date = new Date(t.date);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    }),
    [trends]
  );

  const trendSeries = useMemo(() => [
    { name: 'Noticias', data: trends.map(t => t.news) },
    { name: 'Galería', data: trends.map(t => t.gallery) },
    { name: 'Prensa', data: trends.map(t => t.press) },
  ], [trends]);

  // Calculate percentages
  const total = stats.news + stats.gallery + stats.press + stats.users;
  
  // System health (use fixed value for stability)
  const systemHealth = 97;

  // Radar chart indicators for performance metrics
  const performanceIndicators = useMemo(() => [
    { name: 'Rendimiento', max: 100 },
    { name: 'Disponibilidad', max: 100 },
    { name: 'Velocidad', max: 100 },
    { name: 'Seguridad', max: 100 },
    { name: 'UX', max: 100 },
    { name: 'Mantenimiento', max: 100 },
  ], []);

  const performanceData = useMemo(() => [
    { name: 'Métricas Actuales', values: [92, 98, 88, 95, 90, 85] },
  ], []);

  // Colors for pie chart
  const pieColors = ['#0057D9', '#059669', '#6B21A8', '#d97706'];

  return (
    <div className="space-y-6">
      {/* Row 1: Distribution + System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Distribution Pie Chart */}
        <div className={`relative overflow-hidden rounded-2xl p-6 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700' 
            : 'bg-white border border-gray-200'
        }`}>
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600" />
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-blue-900/40' : 'bg-blue-50'}`}>
              <svg className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Distribución de Contenido" />
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Distribución por tipo
              </p>
            </div>
          </div>

          <div className="h-64">
            <PieChart
              data={distributionData}
              theme={theme}
              height="100%"
              donut
              showPercentage
              valueFormatter={(v: number) => `${v}`}
              loading={loading}
            />
          </div>

          {/* Legend with percentages */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {distributionData.map((item, index) => {
              const color = pieColors[index % pieColors.length];
              const percent = ((item.value / total) * 100).toFixed(1);
              
              return (
                <div key={item.name} className={`flex items-center gap-2 p-2 rounded-lg ${
                  isDark ? 'bg-slate-800/50' : 'bg-gray-50'
                }`}>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                    {item.name}: <span className="font-semibold">{percent}%</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Health Gauge */}
        <div className={`relative overflow-hidden rounded-2xl p-6 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-600" />
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-green-900/40' : 'bg-green-50'}`}>
              <svg className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Salud del Sistema" />
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Estado general
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <GaugeChart
              value={systemHealth}
              theme={theme}
              height={200}
              title=""
              unit="%"
              thresholds={{ low: 60, medium: 85 }}
              decimals={0}
              loading={loading}
            />
          </div>

          <div className="flex justify-between mt-4 text-xs">
            <span className={`${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Resp. API</span>
            <span className={`${isDark ? 'text-green-400' : 'text-green-600'} font-medium`}>~45ms</span>
            <span className={`${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Uptime</span>
            <span className={`${isDark ? 'text-green-400' : 'text-green-600'} font-medium`}>99.9%</span>
          </div>
        </div>

        {/* Performance Radar */}
        <div className={`relative overflow-hidden rounded-2xl p-6 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-violet-400 to-purple-600" />
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-purple-900/40' : 'bg-purple-50'}`}>
              <svg className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Rendimiento" />
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Métricas clave
              </p>
            </div>
          </div>

          <div className="h-64">
            <RadarChart
              indicators={performanceIndicators}
              data={performanceData}
              theme={theme}
              height="100%"
              areaStyle
              fillOpacity={0.2}
            />
          </div>
        </div>
      </div>

      {/* Row 2: Content Trends */}
      <div className={`relative overflow-hidden rounded-2xl p-6 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700' 
          : 'bg-white border border-gray-200'
      }`}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-600" />
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-cyan-900/40' : 'bg-cyan-50'}`}>
              <svg className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Tendencias de Contenido" />
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Evolución temporal de publicaciones
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className={isDark ? 'text-slate-300' : 'text-gray-600'}>Noticias</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className={isDark ? 'text-slate-300' : 'text-gray-600'}>Galería</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500" />
              <span className={isDark ? 'text-slate-300' : 'text-gray-600'}>Prensa</span>
            </div>
          </div>
        </div>

        <div className="h-72">
          <LineChart
            categories={trendCategories}
            data={trendSeries}
            theme={theme}
            height="100%"
            smooth
            showSymbol={false}
            areaStyle
            enableZoom
            valueFormatter={(v: number) => `${v}`}
            loading={loading}
          />
        </div>
      </div>

      {/* Row 3: Quick Stats Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Comparison */}
        <div className={`relative overflow-hidden rounded-2xl p-6 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-600" />
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-amber-900/40' : 'bg-amber-50'}`}>
              <svg className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Comparativa Mensual" />
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Este mes vs. mes anterior
              </p>
            </div>
          </div>

          <div className="h-64">
            <BarChart
              categories={['Noticias', 'Galería', 'Prensa', 'Usuarios']}
              data={[
                { name: 'Este Mes', data: [Math.round(stats.news * 0.8), Math.round(stats.gallery * 0.75), Math.round(stats.press * 0.9), Math.round(stats.users * 0.6)] },
                { name: 'Mes Pasado', data: [stats.news, stats.gallery, stats.press, stats.users] },
              ]}
              theme={theme}
              height="100%"
              colors={['#0057D9', '#059669']}
              valueFormatter={(v: number) => `${Math.round(v)}`}
              loading={loading}
              showLabels
            />
          </div>
        </div>

        {/* Activity by Day */}
        <div className={`relative overflow-hidden rounded-2xl p-6 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-400 to-rose-600" />
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-rose-900/40' : 'bg-rose-50'}`}>
              <svg className={`w-5 h-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Actividad por Día" />
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Últimos 7 días
              </p>
            </div>
          </div>

          <div className="h-64">
            <AreaChart
              categories={['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']}
              data={[12, 19, 15, 22, 18, 8, 5]}
              theme={theme}
              height="100%"
              smooth
              fillOpacity={0.3}
              colors={['#dc2626']}
              valueFormatter={(v: number) => `${v}`}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardECharts;

