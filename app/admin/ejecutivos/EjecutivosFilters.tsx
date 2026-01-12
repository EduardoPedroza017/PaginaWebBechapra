"use client";

import React from 'react';
import { Search, Filter, X, Users, Briefcase } from 'lucide-react';
import { TranslateText } from '@/components/TranslateText';

interface EjecutivosFiltersProps {
  filters: {
    search?: string;
    activo?: boolean;
    puesto?: string;
  };
  onFiltersChange: (filters: Partial<{
    search?: string;
    activo?: boolean;
    puesto?: string;
  }>) => void;
  onClearFilters: () => void;
  theme: 'light' | 'dark';
}

export const EjecutivosFilters: React.FC<EjecutivosFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  theme,
}) => {
  const hasActiveFilters = filters.search || filters.activo !== undefined || filters.puesto;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            <TranslateText text="Filtros y Búsqueda" />
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <TranslateText text="Encuentra ejecutivos por nombre, puesto o estado" />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o puesto..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Estado */}
        <div>
          <select
            value={filters.activo === undefined ? '' : filters.activo.toString()}
            onChange={(e) => {
              const value = e.target.value;
              onFiltersChange({
                activo: value === '' ? undefined : value === 'true'
              });
            }}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">
              <TranslateText text="Todos los estados" asOption={true} />
            </option>
            <option value="true">
              <TranslateText text="Activos" asOption={true} />
            </option>
            <option value="false">
              <TranslateText text="Inactivos" asOption={true} />
            </option>
          </select>
        </div>

        {/* Puesto */}
        <div>
          <select
            value={filters.puesto || ''}
            onChange={(e) => onFiltersChange({ puesto: e.target.value || undefined })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">
              <TranslateText text="Todos los puestos" asOption={true} />
            </option>
            <option value="Director General">Director General</option>
            <option value="Director">Director</option>
            <option value="Gerente">Gerente</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Coordinador">Coordinador</option>
            <option value="Analista">Analista</option>
            <option value="Asistente">Asistente</option>
          </select>
        </div>

        {/* Limpiar filtros */}
        <div className="flex items-end">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              <TranslateText text="Limpiar" />
            </button>
          )}
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span>
            <TranslateText text="Filtros aplicados:" />
          </span>
        </div>
        <div className="flex gap-2">
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
              <Search className="w-3 h-3" />
              "{filters.search}"
            </span>
          )}
          {filters.activo !== undefined && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
              <span className={`w-2 h-2 rounded-full ${filters.activo ? 'bg-green-500' : 'bg-red-500'}`} />
              {filters.activo ? 'Activos' : 'Inactivos'}
            </span>
          )}
          {filters.puesto && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
              <Briefcase className="w-3 h-3" />
              {filters.puesto}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};