// NewsFilters.tsx - Filter controls for news management
import React, { useState, useCallback, useRef } from 'react';
import { Search, Filter, X, Calendar, Tag, Star } from 'lucide-react';
import { News, NewsFilters as NewsFiltersType } from '../../types';
import { useDebounce } from '@/hooks/useDebounce';

interface NewsFiltersProps {
  news: News[];
  onFilter: (filtered: News[], searchValue?: string) => void;
  theme: 'light' | 'dark';
  className?: string;
}

export const NewsFilters: React.FC<NewsFiltersProps> = ({
  news,
  onFilter,
  theme,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'featured'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Get unique categories from news
  const categories = React.useMemo(() => {
    const cats = new Set(news.map(item => item.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [news]);

  // Apply client-side filters (status, category, date) and trigger server-side search
  const applyFilters = useCallback(() => {
    let filtered = [...news];

    // Status filter (client-side)
    if (statusFilter !== 'all') {
      if (statusFilter === 'featured') {
        filtered = filtered.filter(item => item.featured);
      } else {
        filtered = filtered.filter(item => item.status === statusFilter);
      }
    }

    // Category filter (client-side)
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Date filter (client-side)
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }

      filtered = filtered.filter(item => {
        if (!item.createdAt) return false;
        const itemDate = new Date(item.createdAt);
        return itemDate >= filterDate;
      });
    }

    onFilter(filtered, debouncedSearchTerm);
  }, [news, debouncedSearchTerm, statusFilter, categoryFilter, dateFilter, onFilter]);

  // Apply filters when dependencies change, but skip the first run to avoid
  // triggering a fetch loop with the parent page (which already fetches on mount).
  const initializedRef = useRef(false);
  React.useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      return;
    }
    applyFilters();
  }, [applyFilters]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setDateFilter('all');
  };

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || dateFilter !== 'all';

  const inputClass = `w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
    theme === 'dark'
      ? 'bg-gray-900/50 text-white border-gray-700 placeholder:text-gray-500'
      : 'bg-white text-gray-900 border-gray-200 placeholder:text-gray-400'
  }`;

  const selectClass = `px-3 py-2 rounded-lg border text-sm ${
    theme === 'dark'
      ? 'bg-gray-900/50 text-white border-gray-700'
      : 'bg-white text-gray-900 border-gray-200'
  }`;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        }`} />
        <input
          type="text"
          placeholder="Buscar noticias por título, subtítulo o contenido..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={inputClass}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Quick Filters Row */}
      <div className="flex flex-wrap gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className={selectClass}
        >
          <option value="all">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
          <option value="featured">Destacados</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={selectClass}
        >
          <option value="all">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value as typeof dateFilter)}
          className={selectClass}
        >
          <option value="all">Todas las fechas</option>
          <option value="today">Hoy</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <X className="w-3 h-3" />
            Limpiar filtros
          </button>
        )}

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            showAdvanced
              ? theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              : theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Filter className="w-3 h-3" />
          {showAdvanced ? 'Ocultar' : 'Más filtros'}
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className={`p-4 rounded-lg border ${
          theme === 'dark' ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <h3 className={`font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Filtros avanzados
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range */}
            <div>
              <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Fecha desde
              </label>
              <input
                type="date"
                className={`${inputClass} pl-4`}
                // onChange would be implemented for custom date range
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Fecha hasta
              </label>
              <input
                type="date"
                className={`${inputClass} pl-4`}
                // onChange would be implemented for custom date range
              />
            </div>

            {/* Tags Filter */}
            <div>
              <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Etiqueta específica
              </label>
              <input
                type="text"
                placeholder="Buscar por etiqueta..."
                className={inputClass}
                // onChange would be implemented for tag filtering
              />
            </div>

            {/* Author Filter (if applicable) */}
            <div>
              <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Autor
              </label>
              <input
                type="text"
                placeholder="Buscar por autor..."
                className={inputClass}
                // onChange would be implemented for author filtering
              />
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className={`flex items-center justify-between text-sm ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <span>
          {news.length === 0
            ? 'No hay noticias'
            : `Mostrando ${news.length} noticia${news.length !== 1 ? 's' : ''}`
          }
        </span>

        {hasActiveFilters && (
          <span className="flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Filtros activos
          </span>
        )}
      </div>
    </div>
  );
};
