"use client";

import { TranslateText } from "@/components/TranslateText";
import { TrendingUp, TrendingDown, AlertTriangle, Info, ExternalLink, Sparkles } from "lucide-react";
import { useState } from "react";

type ColorType = 'blue' | 'green' | 'red' | 'purple' | 'amber' | 'orange' | 'gray' | 'indigo' | 'emerald' | 'pink' | 'cyan';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: ColorType;
  theme: 'light' | 'dark';
  trend?: number;
  anomaly?: boolean;
  loading?: boolean;
  description?: string;
  target?: number;
  onClick?: () => void;
  sparklineValues?: number[];
}

const colorStyles: Record<ColorType, { 
  text: string; 
  bg: string; 
  darkText: string;
  lightText: string;
  border: string;
}> = {
  blue: { 
    text: 'text-blue-600', 
    bg: 'bg-blue-500/10',
    darkText: 'text-blue-400',
    lightText: 'text-blue-600',
    border: 'border-blue-200'
  },
  green: { 
    text: 'text-green-600', 
    bg: 'bg-green-500/10',
    darkText: 'text-green-400',
    lightText: 'text-green-600',
    border: 'border-green-200'
  },
  red: { 
    text: 'text-red-600', 
    bg: 'bg-red-500/10',
    darkText: 'text-red-400',
    lightText: 'text-red-600',
    border: 'border-red-200'
  },
  purple: { 
    text: 'text-purple-600', 
    bg: 'bg-purple-500/10',
    darkText: 'text-purple-400',
    lightText: 'text-purple-600',
    border: 'border-purple-200'
  },
  amber: { 
    text: 'text-amber-600', 
    bg: 'bg-amber-500/10',
    darkText: 'text-amber-400',
    lightText: 'text-amber-600',
    border: 'border-amber-200'
  },
  orange: { 
    text: 'text-orange-600', 
    bg: 'bg-orange-500/10',
    darkText: 'text-orange-400',
    lightText: 'text-orange-600',
    border: 'border-orange-200'
  },
  gray: { 
    text: 'text-gray-600', 
    bg: 'bg-gray-500/10',
    darkText: 'text-gray-400',
    lightText: 'text-gray-600',
    border: 'border-gray-200'
  },
  indigo: { 
    text: 'text-indigo-600', 
    bg: 'bg-indigo-500/10',
    darkText: 'text-indigo-400',
    lightText: 'text-indigo-600',
    border: 'border-indigo-200'
  },
  emerald: { 
    text: 'text-emerald-600', 
    bg: 'bg-emerald-500/10',
    darkText: 'text-emerald-400',
    lightText: 'text-emerald-600',
    border: 'border-emerald-200'
  },
  pink: { 
    text: 'text-pink-600', 
    bg: 'bg-pink-500/10',
    darkText: 'text-pink-400',
    lightText: 'text-pink-600',
    border: 'border-pink-200'
  },
  cyan: { 
    text: 'text-cyan-600', 
    bg: 'bg-cyan-500/10',
    darkText: 'text-cyan-400',
    lightText: 'text-cyan-600',
    border: 'border-cyan-200'
  },
};

export function MetricCard({ 
  title, 
  value, 
  icon, 
  color, 
  theme, 
  trend, 
  anomaly, 
  loading = false,
  description,
  target,
  onClick,
  sparklineValues = []
}: MetricCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const { text, bg, darkText, lightText, border } = colorStyles[color] || colorStyles.blue;
  const isDark = theme === 'dark';
  const textColor = isDark ? darkText : lightText;
  
  // Calcular progreso si hay target
  const progress = target && typeof value === 'number' 
    ? Math.min(100, Math.round((value / target) * 100))
    : null;

  // Calcular color del trend
  const getTrendColor = (trendValue: number) => {
    if (trendValue >= 10) return isDark ? 'text-emerald-400' : 'text-emerald-600';
    if (trendValue >= 5) return isDark ? 'text-green-400' : 'text-green-600';
    if (trendValue > 0) return isDark ? 'text-amber-400' : 'text-amber-600';
    if (trendValue === 0) return isDark ? 'text-gray-400' : 'text-gray-600';
    if (trendValue >= -5) return isDark ? 'text-orange-400' : 'text-orange-600';
    return isDark ? 'text-red-400' : 'text-red-600';
  };

  // Generar sparkline simple
  const renderSparkline = () => {
    if (sparklineValues.length < 2) return null;
    
    const max = Math.max(...sparklineValues);
    const min = Math.min(...sparklineValues);
    const range = max - min;
    
    return (
      <div className="relative h-8 w-full overflow-hidden rounded">
        <div className="absolute inset-0 flex items-end">
          {sparklineValues.map((val, index) => {
            const height = range > 0 ? ((val - min) / range) * 100 : 50;
            const opacity = 0.3 + (index / sparklineValues.length) * 0.7;
            return (
              <div
                key={index}
                className="flex-1"
                style={{ 
                  height: `${height}%`,
                  backgroundColor: isDark ? `rgba(59, 130, 246, ${opacity})` : `rgba(59, 130, 246, ${opacity * 0.6})`,
                  margin: '0 1px',
                  borderRadius: '1px'
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`group relative rounded-xl border transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800/30 border-gray-700 hover:border-gray-600' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      } ${onClick ? 'cursor-pointer hover:shadow-lg active:scale-[0.99]' : ''} ${
        anomaly ? (isDark ? 'border-red-500/30' : 'border-red-300') : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Efecto de fondo sutil */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isDark ? 'bg-gradient-to-br from-gray-800/50 to-transparent' : 'bg-gradient-to-br from-gray-50/50 to-transparent'
      }`} />

      <div className="relative p-4">
        {/* Header con título y acciones */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className={`text-xs font-medium uppercase tracking-wider ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <TranslateText text={title} />
              </p>
              {(description || progress !== null) && (
                <button
                  className="opacity-0 group-hover:opacity-70 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(!showTooltip);
                  }}
                >
                  <Info className={`w-3 h-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                </button>
              )}
            </div>
            
            {/* Valor principal */}
            <div className="flex items-baseline gap-2">
              <p className={`text-2xl font-bold ${textColor}`}>
                {loading ? (
                  <span className="inline-block h-6 w-16 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
                ) : (
                  value
                )}
              </p>
              
              {/* Trend badge */}
              {trend !== undefined && !loading && (
                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                } ${getTrendColor(trend)}`}>
                  {trend >= 0 ? (
                    <TrendingUp className="w-2.5 h-2.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5" />
                  )}
                  {Math.abs(trend)}%
                </span>
              )}
              
              {/* Anomaly badge */}
              {anomaly && !loading && (
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400 flex items-center gap-0.5 animate-pulse">
                  <AlertTriangle className="w-2.5 h-2.5" />
                  <TranslateText text="Alerta" />
                </span>
              )}
            </div>
          </div>
          
          {/* Icono */}
          <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${bg}`}>
            <div className={`${textColor}`}>
              {icon}
            </div>
          </div>
        </div>

        {/* Progress bar si hay target */}
        {progress !== null && !loading && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                <TranslateText text="Progreso" />
              </span>
              <span className={`font-medium ${textColor}`}>
                {progress}% / 100%
              </span>
            </div>
            <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className={`h-full rounded-full ${bg.replace('10', '50')}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Sparkline si hay datos */}
        {sparklineValues.length > 0 && !loading && (
          <div className="mb-3">
            {renderSparkline()}
          </div>
        )}

        {/* Footer con información adicional */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          {description && (
            <p className={`text-xs line-clamp-1 flex-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              {description}
            </p>
          )}
          
          {onClick && (
            <div className={`flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
              <span className="hidden sm:inline">
                <TranslateText text="Ver más" />
              </span>
              <ExternalLink className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* Tooltip para información adicional */}
        {showTooltip && (description || progress !== null) && (
          <div className={`absolute z-50 top-full left-0 right-0 mt-2 p-3 rounded-lg border shadow-lg ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-gray-300' 
              : 'bg-white border-gray-200 text-gray-700'
          }`}>
            <div className="text-sm">
              {description && (
                <p className="mb-2">{description}</p>
              )}
              {progress !== null && (
                <div className="flex items-center justify-between text-xs">
                  <span><TranslateText text="Meta establecida" /></span>
                  <span className="font-semibold">{target}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente helper para mostrar estado de carga
export function MetricCardSkeleton({ theme }: { theme: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  
  return (
    <div className={`rounded-xl border p-4 ${
      isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="h-4 w-24 mb-2 rounded animate-pulse bg-gray-300 dark:bg-gray-700" />
          <div className="h-8 w-16 mb-2 rounded animate-pulse bg-gray-300 dark:bg-gray-700" />
        </div>
        <div className="w-10 h-10 rounded-lg animate-pulse bg-gray-300 dark:bg-gray-700" />
      </div>
      <div className="h-2 w-full rounded animate-pulse bg-gray-300 dark:bg-gray-700" />
    </div>
  );
}