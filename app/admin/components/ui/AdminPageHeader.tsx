"use client";

import React from 'react';
import { RefreshCw, Plus, Settings, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import {
  getPageHeaderClasses,
  getPageTitleClasses,
  getPageSubtitleClasses,
  getRefreshButtonClasses,
  getActionButtonClasses,
  GRID_COLS,
} from '../../design-system';
import { TranslateText } from '@/components/TranslateText';

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconColor?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'yellow' | 'gray';
  theme?: 'light' | 'dark';
  actions?: {
    refresh?: { onClick: () => void; loading?: boolean };
    add?: { onClick: () => void; label?: string };
    settings?: { onClick: () => void };
  };
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
  className?: string;
  gridCols?: keyof typeof GRID_COLS;
}

export default function AdminPageHeader({
  title,
  subtitle,
  icon,
  iconColor = 'blue',
  theme = 'light',
  actions,
  breadcrumbs,
  children,
  className = '',
  gridCols = 1,
}: AdminPageHeaderProps) {
  const isDark = theme === 'dark';

  const iconColorMap = {
    blue: isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600',
    purple: isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600',
    green: isDark ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-600',
    orange: isDark ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-600',
    red: isDark ? 'bg-rose-900/30 text-rose-400' : 'bg-rose-100 text-rose-600',
    yellow: isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600',
    gray: isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600',
  };

  return (
    <div className={clsx('mb-6 md:mb-8', className)}>
      <div className={getPageHeaderClasses(theme)}>
        <div className={clsx('grid gap-4', GRID_COLS[gridCols])}>
          {/* Left: Icon, Title & Breadcrumbs */}
          <div className="flex items-start gap-4">
            {icon && (
              <div className={clsx('p-3 rounded-2xl shrink-0', iconColorMap[iconColor])}>
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              {/* Breadcrumbs */}
              {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="hidden sm:flex items-center gap-2 text-sm mb-2">
                  {breadcrumbs.map((crumb, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                      {crumb.href ? (
                        <a
                          href={crumb.href}
                          className={clsx(
                            'hover:underline',
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          )}
                        >
                          <TranslateText text={crumb.label} />
                        </a>
                      ) : (
                        <span
                          className={clsx(
                            idx === breadcrumbs.length - 1
                              ? isDark
                                ? 'text-white font-medium'
                                : 'text-slate-900 font-medium'
                              : isDark
                                ? 'text-slate-400'
                                : 'text-slate-500'
                          )}
                        >
                          <TranslateText text={crumb.label} />
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              )}
              
              {/* Title */}
              <h1 className={getPageTitleClasses(theme)}>
                <TranslateText text={title} />
              </h1>
              
              {/* Subtitle */}
              {subtitle && (
                <p className={getPageSubtitleClasses(theme)}>
                  <TranslateText text={subtitle} />
                </p>
              )}
              
              {/* Children (extra content) */}
              {children}
            </div>
          </div>

          {/* Right: Actions */}
          {(actions?.refresh || actions?.add || actions?.settings) && (
            <div className="flex items-center gap-3 justify-start sm:justify-end">
              {actions.refresh && (
                <button
                  onClick={actions.refresh.onClick}
                  disabled={actions.refresh.loading}
                  className={getRefreshButtonClasses(theme)}
                  title="Refrescar"
                >
                  <RefreshCw
                    className={clsx('w-5 h-5', actions.refresh.loading && 'animate-spin')}
                  />
                </button>
              )}

              {actions.add && (
                <button
                  onClick={actions.add.onClick}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <TranslateText text={actions.add.label || 'Agregar'} />
                </button>
              )}

              {actions.settings && (
                <button
                  onClick={actions.settings.onClick}
                  className={getActionButtonClasses(theme)}
                  title="Configuración"
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

