// NewsTable.tsx - Table component for displaying news items
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Edit, Trash2, Eye, Star, StarOff, CheckSquare, Square, MoreHorizontal } from 'lucide-react';
import { News } from '../../types';
import { NewsActions } from '../NewsActions/NewsActions';

interface NewsTableProps {
  news: News[];
  loading?: boolean;
  selectedIds?: string[];
  onSelect?: (ids: string[]) => void;
  onEdit: (news: News) => void;
  onDelete: (news: News) => void;
  onPreview: (news: News) => void;
  onToggleStatus: (news: News) => void;
  theme: 'light' | 'dark';
  compact?: boolean;
}

export const NewsTable: React.FC<NewsTableProps> = ({
  news,
  loading = false,
  selectedIds = [],
  onSelect,
  onEdit,
  onDelete,
  onPreview,
  onToggleStatus,
  theme,
  compact = false
}) => {
  const [sortField, setSortField] = useState<keyof News>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Sort news items
  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (!aValue && !bValue) return 0;
      if (!aValue) return 1;
      if (!bValue) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [news, sortField, sortDirection]);

  const handleSort = (field: keyof News) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleSelectAll = () => {
    if (!onSelect) return;
    if (selectedIds.length === sortedNews.length) {
      onSelect([]);
    } else {
      onSelect(sortedNews.map(n => n._id || n.slug || ''));
    }
  };

  const handleSelectItem = (id: string) => {
    if (!onSelect) return;
    if (selectedIds.includes(id)) {
      onSelect(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      onSelect([...selectedIds, id]);
    }
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return '—';
    try {
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return date;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return theme === 'dark' ? 'text-green-400' : 'text-green-600';
      case 'inactive':
        return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
      default:
        return theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`rounded-lg border p-4 animate-pulse ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="w-20 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (compact) {
    // Card layout for mobile/small screens
    return (
      <div className="space-y-4">
        {sortedNews.map((item) => (
          <div key={item._id || item.slug} className={`rounded-lg border p-4 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start space-x-4">
              {onSelect && (
                <button
                  onClick={() => handleSelectItem(item._id || item.slug || '')}
                  className="mt-1"
                >
                  {selectedIds.includes(item._id || item.slug || '') ? (
                    <CheckSquare className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Square className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              )}

              {item.image_url && (
                <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image_url.startsWith('http') ? item.image_url : `${process.env.NEXT_PUBLIC_API_URL}${item.image_url}`}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3 className={`font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm truncate mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.subtitle || item.description?.slice(0, 100)}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs ${getStatusColor(item.status)}`}>
                    {item.status === 'active' ? 'Activo' : item.status === 'inactive' ? 'Inactivo' : 'Borrador'}
                  </span>
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </div>

              <NewsActions
                news={item}
                onEdit={onEdit}
                onDelete={onDelete}
                onPreview={onPreview}
                onToggleStatus={onToggleStatus}
                theme={theme}
                compact
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Table layout for desktop
  return (
    <div className={`rounded-lg border overflow-hidden ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}>
            <tr>
              {onSelect && (
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={handleSelectAll}
                    className={`p-1 rounded ${
                      theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                    }`}
                  >
                    {selectedIds.length === sortedNews.length && sortedNews.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Square className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </button>
                </th>
              )}
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('title')}
                  className={`font-medium text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Noticia
                  {sortField === 'title' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className={`font-medium text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Estado
                  {sortField === 'status' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('createdAt')}
                  className={`font-medium text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Fecha
                  {sortField === 'createdAt' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedNews.map((item) => (
              <tr key={item._id || item.slug} className={`border-t ${
                theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'
              }`}>
                {onSelect && (
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleSelectItem(item._id || item.slug || '')}
                    >
                      {selectedIds.includes(item._id || item.slug || '') ? (
                        <CheckSquare className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Square className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                      )}
                    </button>
                  </td>
                )}
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    {item.image_url && (
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image_url.startsWith('http') ? item.image_url : `${process.env.NEXT_PUBLIC_API_URL}${item.image_url}`}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className={`font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </p>
                      <p className={`text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.subtitle || item.description?.slice(0, 60)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'active'
                      ? theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                      : item.status === 'inactive'
                      ? theme === 'dark' ? 'bg-gray-900/30 text-gray-400' : 'bg-gray-100 text-gray-800'
                      : theme === 'dark' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status === 'active' ? 'Activo' : item.status === 'inactive' ? 'Inactivo' : 'Borrador'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {formatDate(item.createdAt)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <NewsActions
                    news={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onPreview={onPreview}
                    onToggleStatus={onToggleStatus}
                    theme={theme}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedNews.length === 0 && (
        <div className="px-4 py-12 text-center">
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            No hay noticias para mostrar
          </div>
        </div>
      )}
    </div>
  );
};
