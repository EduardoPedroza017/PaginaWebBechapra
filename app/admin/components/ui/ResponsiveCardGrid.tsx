"use client";

import React from 'react';
import clsx from 'clsx';

// ============================================================================
// RESPONSIVE CARD GRID TYPES
// ============================================================================

export interface ResponsiveCardGridProps {
  children: React.ReactNode;
  columns?: {
    mobile?: number;  // default: 1
    tablet?: number;  // default: 2
    desktop?: number; // default: 3
    xl?: number;      // default: 4
  };
  gap?: {
    mobile?: string;  // default: '1rem'
    tablet?: string;  // default: '1.5rem'
    desktop?: string; // default: '1.5rem'
  };
  className?: string;
  theme?: 'light' | 'dark';
}

// ============================================================================
// STAT CARD TYPES
// ============================================================================

export interface StatCardData {
  label: string;
  value: string | number;
  change?: {
    value: string | number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  iconColor?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'yellow' | 'gray';
}

// ============================================================================
// RESPONSIVE CARD GRID COMPONENT
// ============================================================================

export default function ResponsiveCardGrid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3, xl: 4 },
  gap = { mobile: '1rem', tablet: '1.5rem', desktop: '1.5rem' },
  className = '',
}: ResponsiveCardGridProps) {
  return (
    <div
      className={clsx('grid w-full', className)}
      style={{
        gridTemplateColumns: `repeat(${columns.mobile}, 1fr)`,
        gap: gap.mobile,
      }}
    >
      {React.Children.map(children, (child) => (
        <div className="w-full">{child}</div>
      ))}
    </div>
  );
}

// ============================================================================
// RESPONSIVE STAT GRID (For dashboard stats)
// ============================================================================

interface ResponsiveStatGridProps {
  stats: StatCardData[];
  theme?: 'light' | 'dark';
  className?: string;
}

export function ResponsiveStatGrid({
  stats,
  theme = 'light',
  className = '',
}: ResponsiveStatGridProps) {
  const isDark = theme === 'dark';

  return (
    <ResponsiveCardGrid
      columns={{ mobile: 2, tablet: 2, desktop: 4, xl: 4 }}
      gap={{ mobile: '0.75rem', tablet: '1rem', desktop: '1.5rem' }}
      className={className}
    >
      {stats.map((stat, index) => {
        const colorMap: Record<string, string> = {
          blue: isDark ? 'from-blue-900/30 to-blue-800/20 border-blue-700/50' : 'from-blue-50 to-blue-100/50 border-blue-200/60',
          purple: isDark ? 'from-purple-900/30 to-purple-800/20 border-purple-700/50' : 'from-purple-50 to-purple-100/50 border-purple-200/60',
          green: isDark ? 'from-emerald-900/30 to-emerald-800/20 border-emerald-700/50' : 'from-emerald-50 to-emerald-100/50 border-emerald-200/60',
          orange: isDark ? 'from-orange-900/30 to-orange-800/20 border-orange-700/50' : 'from-orange-50 to-orange-100/50 border-orange-200/60',
          red: isDark ? 'from-rose-900/30 to-rose-800/20 border-rose-700/50' : 'from-rose-50 to-rose-100/50 border-rose-200/60',
          yellow: isDark ? 'from-amber-900/30 to-amber-800/20 border-amber-700/50' : 'from-amber-50 to-amber-100/50 border-amber-200/60',
          gray: isDark ? 'from-slate-800/30 to-slate-700/20 border-slate-600/50' : 'from-slate-50 to-slate-100/50 border-slate-200/60',
        };

        return (
          <div
            key={index}
            className={clsx(
              'relative overflow-hidden rounded-xl border p-4 transition-all duration-300',
              'hover:scale-[1.02] hover:shadow-xl',
              isDark ? 'bg-gradient-to-br' : 'bg-gradient-to-br',
              colorMap[stat.iconColor || 'blue']
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className={clsx(
                  'text-xs font-medium uppercase tracking-wider truncate',
                  isDark ? 'text-slate-400' : 'text-slate-500'
                )}>
                  {stat.label}
                </p>
                <p className={clsx(
                  'mt-2 text-2xl md:text-3xl font-bold truncate',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  {stat.value}
                </p>
                {stat.change && (
                  <div className="mt-2 flex items-center gap-1">
                    <span className={clsx(
                      'text-xs font-medium',
                      stat.change.trend === 'up' && 'text-emerald-500',
                      stat.change.trend === 'down' && 'text-rose-500',
                      stat.change.trend === 'neutral' && (isDark ? 'text-slate-400' : 'text-slate-500')
                    )}>
                      {stat.change.trend === 'up' && '↑'}
                      {stat.change.trend === 'down' && '↓'}
                      {stat.change.value}
                    </span>
                  </div>
                )}
              </div>
              {stat.icon && (
                <div className={clsx(
                  'p-2 rounded-lg shrink-0',
                  isDark ? 'bg-white/10' : 'bg-white/60'
                )}>
                  {stat.icon}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </ResponsiveCardGrid>
  );
}

// ============================================================================
// INFO CARD COMPONENT (For general purpose cards)
// ============================================================================

interface InfoCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
  onClick?: () => void;
}

export function InfoCard({
  title,
  subtitle,
  icon,
  content,
  actions,
  theme = 'light',
  className = '',
  onClick,
}: InfoCardProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={clsx(
        'rounded-xl border p-4 md:p-6 transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-0.5',
        isDark 
          ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600' 
          : 'bg-white border-slate-200 hover:border-slate-300',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={clsx(
                'p-2 rounded-lg shrink-0',
                isDark ? 'bg-slate-700' : 'bg-slate-100'
              )}>
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <h3 className={clsx(
                'text-base md:text-lg font-semibold truncate',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                {title}
              </h3>
              {subtitle && (
                <p className={clsx(
                  'text-sm mt-0.5 truncate',
                  isDark ? 'text-slate-400' : 'text-slate-500'
                )}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {content && (
            <div className="mt-4">
              {content}
            </div>
          )}
        </div>
        {actions && (
          <div className="shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// ACTION CARD (For cards with primary actions)
// ============================================================================

interface ActionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryActions?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
  theme?: 'light' | 'dark';
  className?: string;
}

export function ActionCard({
  title,
  description,
  icon,
  primaryAction,
  secondaryActions,
  theme = 'light',
  className = '',
}: ActionCardProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={clsx(
        'rounded-xl border p-4 md:p-6 transition-all duration-300',
        'hover:shadow-lg',
        isDark 
          ? 'bg-slate-800/50 border-slate-700' 
          : 'bg-white border-slate-200',
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start gap-4 flex-1">
          {icon && (
            <div className={clsx(
              'p-3 rounded-xl shrink-0',
              isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'
            )}>
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className={clsx(
              'text-lg font-semibold',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              {title}
            </h3>
            {description && (
              <p className={clsx(
                'text-sm mt-1',
                isDark ? 'text-slate-400' : 'text-slate-500'
              )}>
                {description}
              </p>
            )}
          </div>
        </div>

        <div className={clsx(
          'flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t',
          isDark ? 'border-slate-700' : 'border-slate-200'
        )}>
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className={clsx(
                'flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg',
                'font-medium text-sm transition-all duration-200',
                'min-h-[44px]',
                isDark
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              )}
            >
              {primaryAction.icon}
              {primaryAction.label}
            </button>
          )}
          {secondaryActions?.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              className={clsx(
                'flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg',
                'font-medium text-sm transition-all duration-200',
                'min-h-[44px]',
                isDark
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              )}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  theme?: 'light' | 'dark';
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  theme = 'light',
  className = '',
}: EmptyStateProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl border',
        isDark 
          ? 'bg-slate-800/30 border-slate-700' 
          : 'bg-slate-50 border-slate-200',
        className
      )}
    >
      {icon && (
        <div className={clsx(
          'p-4 rounded-full mb-4',
          isDark ? 'bg-slate-700' : 'bg-slate-200'
        )}>
          {icon}
        </div>
      )}
      <h3 className={clsx(
        'text-lg font-semibold mb-2',
        isDark ? 'text-white' : 'text-slate-900'
      )}>
        {title}
      </h3>
      {description && (
        <p className={clsx(
          'text-sm max-w-md mb-6',
          isDark ? 'text-slate-400' : 'text-slate-500'
        )}>
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className={clsx(
            'flex items-center gap-2 px-6 py-2.5 rounded-lg',
            'font-medium text-sm transition-all duration-200',
            'min-h-[44px]',
            isDark
              ? 'bg-blue-600 hover:bg-blue-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          )}
        >
          {action.icon}
          {action.label}
        </button>
      )}
    </div>
  );
}

