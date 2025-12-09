"use client";

import { HTMLAttributes } from 'react';
import { getTableClasses } from '../../design-system';

interface TableProps extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
}

export function Table({ theme = 'light', className = '', children, ...props }: TableProps) {
  const { wrapper } = getTableClasses(theme);

  return (
    <div className={`${wrapper} ${className}`} {...props}>
      <div className="overflow-x-auto">
        <table className="w-full">
          {children}
        </table>
      </div>
    </div>
  );
}

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  theme?: 'light' | 'dark';
}

export function TableHead({ theme = 'light', className = '', children, ...props }: TableHeadProps) {
  const { header } = getTableClasses(theme);

  return (
    <thead className={`${header} ${className}`} {...props}>
      {children}
    </thead>
  );
}

type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export function TableBody({ className = '', children, ...props }: TableBodyProps) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  theme?: 'light' | 'dark';
}

export function TableRow({ theme = 'light', className = '', children, ...props }: TableRowProps) {
  const { row } = getTableClasses(theme);

  return (
    <tr className={`${row} ${className}`} {...props}>
      {children}
    </tr>
  );
}

interface TableHeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  theme?: 'light' | 'dark';
}

export function TableHeaderCell({ theme = 'light', className = '', children, ...props }: TableHeaderCellProps) {
  const isDark = theme === 'dark';

  return (
    <th
      className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${
        isDark ? 'text-slate-300' : 'text-slate-700'
      } ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  theme?: 'light' | 'dark';
}

export function TableCell({ theme = 'light', className = '', children, ...props }: TableCellProps) {
  const isDark = theme === 'dark';

  return (
    <td
      className={`px-6 py-4 text-sm ${
        isDark ? 'text-slate-300' : 'text-slate-700'
      } ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}

interface TableEmptyStateProps {
  theme?: 'light' | 'dark';
  message?: string;
  icon?: React.ReactNode;
}

export function TableEmptyState({ 
  theme = 'light', 
  message = 'No hay datos disponibles',
  icon 
}: TableEmptyStateProps) {
  const isDark = theme === 'dark';

  return (
    <tr>
      <td colSpan={100} className="px-6 py-12">
        <div className="flex flex-col items-center justify-center gap-3">
          {icon && (
            <div className={isDark ? 'text-slate-600' : 'text-slate-400'}>
              {icon}
            </div>
          )}
          <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {message}
          </p>
        </div>
      </td>
    </tr>
  );
}
