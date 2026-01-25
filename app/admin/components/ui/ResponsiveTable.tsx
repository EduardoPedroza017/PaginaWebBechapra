"use client";

import React from 'react';
import clsx from 'clsx';
import { ChevronRight, MoreVertical } from 'lucide-react';

// ============================================================================
// RESPONSIVE TABLE TYPES
// ============================================================================

export interface ResponsiveTableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  label: string;
  width?: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  hideOnMobile?: boolean;
  mobileOrder?: number;
}

export interface ResponsiveTableAction<T = Record<string, unknown>> {
  label: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  onClick: (row: T) => void;
  showOnMobile?: boolean;
}

export interface ResponsiveTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: ResponsiveTableColumn<T>[];
  data: T[];
  actions?: ResponsiveTableAction<T>[];
  theme?: 'light' | 'dark';
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
}

// ============================================================================
// RESPONSIVE TABLE COMPONENT
// ============================================================================

export default function ResponsiveTable({
  columns,
  data,
  actions = [],
  theme = 'light',
  loading = false,
  emptyMessage = 'No hay datos disponibles',
  onRowClick,
  striped = true,
  hoverable = true,
  className = '',
}: ResponsiveTableProps) {
  const isDark = theme === 'dark';

  // Get visible columns for mobile (non-hidden)
  const mobileColumns = columns.filter(col => !col.hideOnMobile);
  const desktopColumns = columns;

  // Loading state
  if (loading) {
    return (
      <div className={clsx('rounded-xl border overflow-hidden', className,
        isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'
      )}>
        <TableSkeleton columns={columns} rows={5} theme={theme} />
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className={clsx('rounded-xl border p-12 text-center', className,
        isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'
      )}>
        <p className={clsx(isDark ? 'text-slate-400' : 'text-slate-500')}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={clsx('w-full', className)}>
      {/* Mobile View: Card Stack */}
      <div className="lg:hidden space-y-4">
        {data.map((row, index) => (
          <MobileCard
            key={`mobile-row-${index}`}
            row={row}
            columns={mobileColumns}
            actions={actions.filter(a => a.showOnMobile !== false)}
            theme={theme}
            onRowClick={onRowClick ? () => onRowClick(row) : undefined}
            striped={striped}
            index={index}
          />
        ))}
      </div>

      {/* Desktop View: Traditional Table */}
      <div className={clsx(
        'hidden lg:block rounded-xl border overflow-hidden',
        isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'
      )}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={clsx(
              isDark ? 'bg-slate-800' : 'bg-slate-50'
            )}>
              <tr>
                {desktopColumns.map((col) => (
                  <th
                    key={col.key}
                    className={clsx(
                      'px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider',
                      isDark ? 'text-slate-400' : 'text-slate-600',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right'
                    )}
                    style={{ width: col.width }}
                  >
                    {col.label}
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className={clsx(
                    'px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider',
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  )}>
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className={clsx('divide-y',
              isDark ? 'divide-slate-700' : 'divide-slate-200'
            )}>
              {data.map((row, index) => (
                <tr
                  key={`desktop-row-${index}`}
                  className={clsx(
                    'transition-colors',
                    striped && index % 2 === 0 && (isDark ? 'bg-slate-900/50' : 'bg-slate-50/50'),
                    hoverable && 'hover:bg-blue-50/50 dark:hover:bg-blue-900/20',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {desktopColumns.map((col) => {
                    const value = row[col.key];
                    return (
                      <td
                        key={col.key}
                        className={clsx(
                          'px-6 py-4 text-sm whitespace-nowrap',
                          isDark ? 'text-slate-300' : 'text-slate-700',
                          col.align === 'center' && 'text-center',
                          col.align === 'right' && 'text-right'
                        )}
                      >
                        {col.render
                          ? col.render(value, row)
                          : String(value ?? '')}
                      </td>
                    );
                  })}
                  {actions.length > 0 && (
                    <td className="px-6 py-4 text-right">
                      <DesktopActions
                        actions={actions}
                        row={row}
                        theme={theme}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MOBILE CARD COMPONENT
// ============================================================================

interface MobileCardProps<T extends Record<string, unknown> = Record<string, unknown>> {
  row: T;
  columns: ResponsiveTableColumn<T>[];
  actions: ResponsiveTableAction<T>[];
  theme: 'light' | 'dark';
  onRowClick?: () => void;
  striped: boolean;
  index: number;
}

function MobileCard<T extends Record<string, unknown>>({
  row,
  columns,
  actions,
  theme,
  onRowClick,
  striped,
  index,
}: MobileCardProps<T>) {
  const isDark = theme === 'dark';

  // Sort columns by mobileOrder if specified
  const sortedColumns = [...columns].sort((a, b) => 
    (a.mobileOrder ?? 100) - (b.mobileOrder ?? 100)
  );

  // Get first 3 columns for main display
  const mainColumns = sortedColumns.slice(0, 3);
  const extraColumns = sortedColumns.slice(3);

  return (
    <div
      className={clsx(
        'rounded-xl border p-4',
        'transition-all duration-200',
        'min-h-[88px]',
        isDark 
          ? (striped && index % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800/50')
          : (striped && index % 2 === 0 ? 'bg-white' : 'bg-slate-50'),
        onRowClick && 'cursor-pointer',
        onRowClick && (isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100')
      )}
      onClick={onRowClick}
    >
      {/* Main content row */}
      <div className="flex flex-col gap-3">
        {mainColumns.map((col) => (
          <div key={String(col.key)} className="flex justify-between items-start gap-4">
            <span className={clsx(
              'text-xs font-medium uppercase tracking-wider',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              {col.label}
            </span>
            <span className={clsx(
              'text-sm font-medium text-right flex-1',
              isDark ? 'text-slate-200' : 'text-slate-800'
            )}>
              {col.render
                ? col.render(row[col.key as keyof T], row)
                : String(row[col.key as keyof T] ?? '')}
            </span>
          </div>
        ))}

        {/* Extra columns (collapsed) */}
        {extraColumns.length > 0 && (
          <details className="group">
            <summary className={clsx(
              'list-none cursor-pointer',
              'flex items-center gap-1',
              'text-xs',
              isDark ? 'text-blue-400' : 'text-blue-600',
              'select-none'
            )}>
              <span>Ver más</span>
              <ChevronRight className="w-3 h-3 transition-transform group-open:rotate-90" />
            </summary>
            <div className="mt-3 pt-3 border-t border-dashed space-y-2">
              {extraColumns.map((col) => (
                <div key={String(col.key)} className="flex justify-between items-start gap-4">
                  <span className={clsx(
                    'text-xs font-medium uppercase tracking-wider',
                    isDark ? 'text-slate-500' : 'text-slate-500'
                  )}>
                    {col.label}
                  </span>
                  <span className={clsx(
                    'text-sm font-medium text-right flex-1',
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  )}>
                    {col.render
                      ? col.render(row[col.key as keyof T], row)
                      : String(row[col.key as keyof T] ?? '')}
                  </span>
                </div>
              ))}
            </div>
          </details>
        )}

        {/* Actions row */}
        {actions.length > 0 && (
          <div className="flex items-center justify-end gap-2 pt-2 mt-2 border-t border-dashed">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(row);
                }}
                className={clsx(
                  'inline-flex items-center gap-1.5',
                  'px-3 py-1.5 rounded-lg',
                  'text-xs font-medium',
                  'min-h-[36px] min-w-[36px]',
                  'touch-manipulation',
                  'transition-colors duration-200',
                  action.variant === 'danger'
                    ? (isDark ? 'text-rose-400 hover:bg-rose-900/30' : 'text-rose-600 hover:bg-rose-50')
                    : action.variant === 'primary'
                    ? (isDark ? 'text-blue-400 hover:bg-blue-900/30' : 'text-blue-600 hover:bg-blue-50')
                    : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100')
                )}
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// DESKTOP ACTIONS DROPDOWN
// ============================================================================

interface DesktopActionsProps<T extends Record<string, unknown> = Record<string, unknown>> {
  actions: ResponsiveTableAction<T>[];
  row: T;
  theme: 'light' | 'dark';
}

function DesktopActions<T extends Record<string, unknown>>({ actions, row, theme }: DesktopActionsProps<T>) {
  const isDark = theme === 'dark';
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          'p-2 rounded-lg',
          'min-w-[36px] min-h-[36px]',
          'flex items-center justify-center',
          'transition-colors',
          isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
        )}
      >
        <MoreVertical className={clsx('w-4 h-4', isDark ? 'text-slate-400' : 'text-slate-500')} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className={clsx(
            'absolute right-0 mt-1',
            'w-48 bg-white dark:bg-slate-800',
            'rounded-lg shadow-lg border',
            'z-20 overflow-hidden',
            isDark ? 'border-slate-700' : 'border-slate-200'
          )}>
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  action.onClick(row);
                  setOpen(false);
                }}
                className={clsx(
                  'w-full flex items-center gap-2 px-4 py-2',
                  'text-sm text-left',
                  'min-h-[40px]',
                  'transition-colors',
                  isDark 
                    ? 'text-slate-300 hover:bg-slate-700' 
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// SKELETON LOADER
// ============================================================================

interface TableSkeletonProps {
  columns: ResponsiveTableColumn[];
  rows?: number;
  theme?: 'light' | 'dark';
}

export function TableSkeleton({ columns, rows = 5, theme = 'light' }: TableSkeletonProps) {
  const isDark = theme === 'dark';

  return (
    <div className="p-4 space-y-4">
      {/* Header skeleton */}
      <div className="flex gap-4 px-4 py-3 border-b border-dashed">
        {columns.map((_, idx) => (
          <div
            key={idx}
            className={clsx(
              'h-4 rounded animate-pulse',
              isDark ? 'bg-slate-700' : 'bg-slate-200'
            )}
            style={{ width: `${100 / columns.length}%` }}
          />
        ))}
      </div>

      {/* Rows skeleton */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="flex gap-4 px-4 py-4 border-b border-dashed last:border-0"
        >
          {columns.map((_, colIdx) => (
            <div
              key={colIdx}
              className={clsx(
                'h-6 rounded animate-pulse',
                isDark ? 'bg-slate-700' : 'bg-slate-200'
              )}
              style={{ width: `${100 / columns.length}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

