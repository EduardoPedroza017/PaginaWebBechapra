"use client";

import { TranslateText } from "@/components/TranslateText";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

type ColorType = 'blue' | 'green' | 'red' | 'purple' | 'amber' | 'orange' | 'gray';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: ColorType;
  theme: 'light' | 'dark';
  trend?: number;
  anomaly?: boolean;
}

const colorStyles: Record<ColorType, { text: string; bg: string }> = {
  blue: { text: 'text-blue-500', bg: 'bg-blue-500/10' },
  green: { text: 'text-green-500', bg: 'bg-green-500/10' },
  red: { text: 'text-red-500', bg: 'bg-red-500/10' },
  purple: { text: 'text-purple-500', bg: 'bg-purple-500/10' },
  amber: { text: 'text-amber-500', bg: 'bg-amber-500/10' },
  orange: { text: 'text-orange-500', bg: 'bg-orange-500/10' },
  gray: { text: 'text-gray-500', bg: 'bg-gray-500/10' },
};

export function MetricCard({ title, value, icon, color, theme, trend, anomaly }: MetricCardProps) {
  const { text: textColor, bg: bgColor } = colorStyles[color] || colorStyles.blue;
  
  return (
    <div className={`rounded-2xl p-5 border transition-all duration-300 hover:shadow-lg backdrop-blur-xl ${
      theme === 'dark' 
        ? `bg-gray-900/50 border-gray-700/50 shadow-lg shadow-blue-500/10` 
        : `bg-white/80 border-gray-200/60 shadow-lg shadow-blue-500/10`
    } ${anomaly ? (theme === 'dark' ? 'border-red-500/50' : 'border-red-300/50') : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
          }`}>
            <TranslateText text={title} />
          </p>
          <div className="flex items-center gap-2">
            <p className={`text-2xl font-bold ${textColor}`}>
              {value}
            </p>
            {trend !== undefined && (
              <span className={`text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1 ${
                trend >= 0 
                  ? (theme === 'dark' ? 'bg-green-900/40 text-green-300' : 'bg-green-100 text-green-700')
                  : (theme === 'dark' ? 'bg-red-900/40 text-red-300' : 'bg-red-100 text-red-700')
              }`}>
                {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(trend)}%
              </span>
            )}
            {anomaly && (
              <span className="text-xs font-bold px-2 py-1 rounded-lg bg-red-900/40 text-red-300 animate-pulse flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Alerta
              </span>
            )}
          </div>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
