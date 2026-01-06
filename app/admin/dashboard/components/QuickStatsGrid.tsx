"use client";

import React, { memo, useMemo } from 'react';
import { Newspaper, ImageIcon, FileText, Users } from 'lucide-react';
import { TranslateText } from '@/components/TranslateText';

interface QuickStatsGridProps {
  stats: {
    news: number;
    gallery: number;
    press: number;
    users: number;
    newsDelta?: number;
    galleryDelta?: number;
    pressDelta?: number;
    usersDelta?: number;
  };
  theme: 'light' | 'dark';
  loading: boolean;
}

// Componente Skeleton para loading states
const StatSkeleton = ({ theme }: { theme: 'light' | 'dark' }) => (
  <div className={`p-3 rounded-lg border animate-pulse ${
    theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-100 border-gray-200'
  }`}>
    <div className="flex items-center gap-2 mb-2">
      <div className={`p-1.5 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
        <div className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-2">
        <div className={`h-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
        <div className={`h-6 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
      </div>
    </div>
  </div>
);

export const QuickStatsGrid = memo<QuickStatsGridProps>(({
  stats,
  theme,
  loading
}) => {
  // Memoizar la configuración de stats para evitar recálculos
  const statItems = useMemo(() => [
    {
      title: 'Noticias',
      value: stats.news,
      delta: stats.newsDelta,
      icon: Newspaper,
      iconColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100',
      description: 'Total de noticias publicadas'
    },
    {
      title: 'Imágenes',
      value: stats.gallery,
      delta: stats.galleryDelta,
      icon: ImageIcon,
      iconColor: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
      bgColor: theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100',
      description: 'Total de imágenes en galería'
    },
    {
      title: 'Comunicados',
      value: stats.press,
      delta: stats.pressDelta,
      icon: FileText,
      iconColor: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
      bgColor: theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100',
      description: 'Total de comunicados de prensa'
    },
    {
      title: 'Usuarios Activos',
      value: stats.users,
      delta: stats.usersDelta,
      icon: Users,
      iconColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100',
      description: 'Usuarios activos en la plataforma'
    }
  ], [stats, theme]);

  // Formatear números grandes
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" data-testid="stats-skeleton">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatSkeleton key={index} theme={theme} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" role="list" aria-label="Métricas rápidas">
      {statItems.map((item, index) => (
        <article
          key={index}
          className={`p-3 rounded-lg border transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' 
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
          role="listitem"
          aria-label={`${item.title}: ${formatNumber(item.value)}${item.delta !== undefined ? `, ${item.delta >= 0 ? 'incremento' : 'decremento'} del ${Math.abs(item.delta)}%` : ''}`}
        >
          <div className="flex items-start gap-2 mb-2">
            <div 
              className={`p-2 rounded-lg ${item.bgColor} flex-shrink-0`}
              aria-hidden="true"
            >
              <item.icon className={`w-5 h-5 ${item.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <TranslateText text={item.title} />
              </div>
              <div className={`text-2xl font-bold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {formatNumber(item.value)}
              </div>
            </div>
          </div>
          
          {item.delta !== undefined && (
            <div className="flex items-center gap-2 mt-3">
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                item.delta >= 0
                  ? theme === 'dark' 
                    ? 'bg-green-900/30 text-green-400' 
                    : 'bg-green-100 text-green-700'
                  : theme === 'dark' 
                    ? 'bg-red-900/30 text-red-400' 
                    : 'bg-red-100 text-red-700'
              }`}>
                <span aria-hidden="true">
                  {item.delta >= 0 ? '↗' : '↘'}
                </span>
                <span>
                  {Math.abs(item.delta)}%
                </span>
              </div>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                vs período anterior
              </span>
            </div>
          )}
          
          <div className={`sr-only`}>
            {item.description}
          </div>
        </article>
      ))}
    </div>
  );
});

QuickStatsGrid.displayName = 'QuickStatsGrid';