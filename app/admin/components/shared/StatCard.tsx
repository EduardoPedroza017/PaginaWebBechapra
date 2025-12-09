"use client";

import { getStatCardClasses } from '../../design-system';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'yellow' | 'gray';
  theme?: 'light' | 'dark';
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({
  title,
  value,
  icon,
  color = 'blue',
  theme = 'light',
  subtitle,
  trend
}: StatCardProps) {
  const isDark = theme === 'dark';
  const cardClasses = getStatCardClasses(color, theme);

  const iconColorMap = {
    blue: isDark ? 'text-blue-400' : 'text-blue-600',
    purple: isDark ? 'text-purple-400' : 'text-purple-600',
    green: isDark ? 'text-emerald-400' : 'text-emerald-600',
    orange: isDark ? 'text-orange-400' : 'text-orange-600',
    red: isDark ? 'text-rose-400' : 'text-rose-600',
    yellow: isDark ? 'text-amber-400' : 'text-amber-600',
    gray: isDark ? 'text-slate-400' : 'text-slate-600'
  };

  const iconBgMap = {
    blue: isDark ? 'bg-blue-500/10' : 'bg-blue-100',
    purple: isDark ? 'bg-purple-500/10' : 'bg-purple-100',
    green: isDark ? 'bg-emerald-500/10' : 'bg-emerald-100',
    orange: isDark ? 'bg-orange-500/10' : 'bg-orange-100',
    red: isDark ? 'bg-rose-500/10' : 'bg-rose-100',
    yellow: isDark ? 'bg-amber-500/10' : 'bg-amber-100',
    gray: isDark ? 'bg-slate-500/10' : 'bg-slate-100'
  };

  return (
    <div className={cardClasses}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {value}
          </p>
          {subtitle && (
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-sm font-semibold ${trend.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                vs. último mes
              </span>
            </div>
          )}
        </div>
        <div className={`${iconBgMap[color]} ${iconColorMap[color]} p-3 rounded-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
