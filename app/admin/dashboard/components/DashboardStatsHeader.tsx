"use client";

import React, { memo } from 'react';
import { Calendar, RefreshCw } from 'lucide-react';
import { TranslateText } from '@/components/TranslateText';

interface DashboardStatsHeaderProps {
  theme: 'light' | 'dark';
  timeRange: 'today' | 'week' | 'month';
  onTimeRangeChange: (range: 'today' | 'week' | 'month') => void;
  onRefresh: () => void;
  refreshing: boolean;
}

// Constantes para evitar "magic strings"
const TIME_RANGES = ['today', 'week', 'month'] as const;
const TIME_RANGE_LABELS = {
  today: 'Hoy',
  week: 'Últimos 7 días',
  month: 'Últimos 30 días'
} as const;

export const DashboardStatsHeader = memo<DashboardStatsHeaderProps>(({
  theme,
  timeRange,
  onTimeRangeChange,
  onRefresh,
  refreshing
}) => {
  // Memoizar el handler para evitar recreaciones innecesarias
  const getTimeRangeHandler = React.useCallback((range: typeof TIME_RANGES[number]) => {
    return () => onTimeRangeChange(range);
  }, [onTimeRangeChange]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
      <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
        <TranslateText text="Métricas Rápidas" />
      </h3>
      
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Indicador de rango de tiempo */}
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span aria-live="polite">
            {TIME_RANGE_LABELS[timeRange]}
          </span>
        </div>
        
        {/* Selector de rango */}
        <div 
          className={`flex rounded-lg border ${
            theme === 'dark' 
              ? 'border-gray-700 bg-gray-800' 
              : 'border-gray-200 bg-white'
          }`}
          role="tablist"
          aria-label="Seleccionar rango de tiempo"
        >
          {TIME_RANGES.map((range) => (
            <button
              key={range}
              onClick={getTimeRangeHandler(range)}
              className={`px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                theme === 'dark' 
                  ? 'focus-visible:ring-blue-500' 
                  : 'focus-visible:ring-blue-600'
              } ${
                timeRange === range
                  ? theme === 'dark'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              } first:rounded-l-lg last:rounded-r-lg`}
              role="tab"
              aria-selected={timeRange === range}
              aria-controls={`${range}-tab`}
              disabled={timeRange === range}
            >
              {range === 'today' ? 'Hoy' :
               range === 'week' ? 'Semana' :
               'Mes'}
            </button>
          ))}
        </div>
        
        {/* Botón de refresh */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className={`p-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            theme === 'dark'
              ? 'focus-visible:ring-blue-500 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
              : 'focus-visible:ring-blue-600 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
          } ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={refreshing ? "Actualizando datos..." : "Actualizar datos"}
          title="Actualizar datos"
        >
          <RefreshCw 
            className={`w-4 h-4 transition-transform ${refreshing ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
          <span className="sr-only">
            {refreshing ? "Actualizando..." : "Actualizar"}
          </span>
        </button>
      </div>
    </div>
  );
});

DashboardStatsHeader.displayName = 'DashboardStatsHeader';