'use client';

import React, { useMemo, useCallback, useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

export interface Column<T> {
  key: keyof T;
  label: string;
  width?: number;
  render?: (value: any, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface VirtualizedTableProps<T extends { id: string | number }> {
  columns: Column<T>[];
  data: T[];
  height?: number;
  rowHeight?: number;
  theme?: 'light' | 'dark';
  onRowClick?: (row: T) => void;
  onRowSelect?: (rows: T[]) => void;
  selectable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: keyof T, order: 'asc' | 'desc') => void;
}

/**
 * Hook para manejar selección de filas
 */
function useRowSelection<T extends { id: string | number }>(data: T[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  const toggleRow = useCallback((id: string | number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const toggleAll = useCallback(() => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map((d) => d.id)));
    }
  }, [data, selectedIds.size]);

  return {
    selectedIds,
    setSelectedIds,
    toggleRow,
    toggleAll,
    selectedRows: data.filter((d) => selectedIds.has(d.id)),
  };
}

/**
 * Tabla simple con scroll (optimizada para rendimiento)
 */
export default function VirtualizedTable<T extends { id: string | number }>({
  columns,
  data,
  height = 600,
  rowHeight = 44,
  theme = 'light',
  onRowClick,
  onRowSelect,
  selectable = false,
  loading = false,
  emptyMessage = 'No data',
  sortBy,
  sortOrder = 'asc',
  onSort,
}: VirtualizedTableProps<T>) {
  const { selectedIds, setSelectedIds, toggleRow, toggleAll, selectedRows } =
    useRowSelection(data);

  const [localSort, setLocalSort] = useState<{
    key: keyof T | null;
    order: 'asc' | 'desc';
  }>({
    key: sortBy || null,
    order: sortOrder,
  });

  const sortedData = useMemo(() => {
    if (!localSort.key) return data;

    const sorted = [...data].sort((a, b) => {
      const aVal = a[localSort.key as keyof T];
      const bVal = b[localSort.key as keyof T];

      if (aVal < bVal) return localSort.order === 'asc' ? -1 : 1;
      if (aVal > bVal) return localSort.order === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, localSort]);

  const handleSort = useCallback(
    (key: keyof T) => {
      const newOrder =
        localSort.key === key && localSort.order === 'asc' ? 'desc' : 'asc';
      setLocalSort({ key, order: newOrder });
      onSort?.(key, newOrder);
    },
    [localSort, onSort]
  );

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-3"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  const isDark = theme === 'dark';
  const headerBg = isDark ? 'bg-gray-800' : 'bg-gray-100';
  const rowBg = isDark ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-50';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
  const textColor = isDark ? 'text-gray-100' : 'text-gray-900';

  return (
    <div className={`border rounded-lg overflow-hidden ${borderColor}`}>
      <div
        style={{ height: `${height}px`, overflow: 'auto' }}
        className="w-full"
      >
        <table className="w-full border-collapse">
          <thead className={`sticky top-0 z-10 ${headerBg} ${textColor}`}>
            <tr>
              {selectable && (
                <th className="w-12 h-12 px-4 shrink-0 border-b border-gray-200 dark:border-gray-700">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.size === data.length && data.length > 0
                    }
                    onChange={toggleAll}
                    className="rounded cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  style={{ width: col.width ? `${col.width}px` : 'auto' }}
                  className={`px-4 py-3 text-left text-sm font-semibold border-b ${borderColor} ${
                    col.sortable ? 'cursor-pointer hover:bg-gray-700' : ''
                  }`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label}</span>
                    {col.sortable && localSort.key === col.key && (
                      <span>
                        {localSort.order === 'asc' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={`px-4 py-8 text-center text-gray-500 dark:text-gray-400 ${rowBg}`}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, idx) => {
                const isSelected = selectedIds.has(row.id);
                return (
                  <tr
                    key={row.id}
                    style={{ height: `${rowHeight}px` }}
                    className={`border-b transition-colors ${borderColor} ${
                      isSelected
                        ? isDark
                          ? 'bg-blue-900/30 hover:bg-blue-800/30'
                          : 'bg-blue-50'
                        : rowBg
                    } ${onRowClick ? 'cursor-pointer' : ''}`}
                    onClick={() => onRowClick?.(row)}
                  >
                    {selectable && (
                      <td className="w-12 px-4 shrink-0 flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleRow(row.id);
                          }}
                          className="rounded cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        style={{ width: col.width ? `${col.width}px` : 'auto' }}
                        className={`px-4 py-3 text-sm ${textColor}`}
                      >
                        {col.render
                          ? col.render(row[col.key], row)
                          : String(row[col.key])}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {selectable && selectedIds.size > 0 && (
        <div
          className={`sticky bottom-0 px-4 py-3 border-t flex items-center justify-between ${headerBg} ${borderColor}`}
        >
          <span className={`text-sm font-medium ${textColor}`}>
            <Check className="w-4 h-4 inline mr-2" />
            {selectedIds.size} de {data.length} seleccionado(s)
          </span>
          <button
            onClick={() => setSelectedIds(new Set())}
            className={`text-xs px-3 py-1 rounded transition-colors ${
              isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Limpiar selección
          </button>
        </div>
      )}
    </div>
  );
}
