"use client";

import React from 'react';
import { Plus, Loader2, AlertCircle, Users } from 'lucide-react';
import type { Ejecutivo } from './hooks/useEjecutivos';
import { EjecutivosCard } from './EjecutivosCard';
import { TranslateText } from '@/components/TranslateText';

interface EjecutivosListProps {
  ejecutivos: Ejecutivo[];
  loading: boolean;
  error: string | null;
  onView: (ejecutivo: Ejecutivo) => void;
  onEdit: (ejecutivo: Ejecutivo) => void;
  onDelete: (ejecutivo: Ejecutivo) => void;
  onCreate: () => void;
  onUploadPhoto: (ejecutivo: Ejecutivo) => void;
  onToggleActive: (ejecutivo: Ejecutivo, activo: boolean) => void;
  theme: 'light' | 'dark';
}

export const EjecutivosList: React.FC<EjecutivosListProps> = ({
  ejecutivos,
  loading,
  error,
  onView,
  onEdit,
  onDelete,
  onCreate,
  onUploadPhoto,
  onToggleActive,
  theme,
}) => {
  if (loading && ejecutivos.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            <TranslateText text="Cargando ejecutivos..." />
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
              <TranslateText text="Error al cargar ejecutivos" />
            </h3>
            <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con contador y botón crear */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              <TranslateText text="Ejecutivos" />
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {ejecutivos.length} {ejecutivos.length === 1 ? 'ejecutivo' : 'ejecutivos'} registrado{ejecutivos.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <button
          onClick={onCreate}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 font-medium"
        >
          <Plus className="w-4 h-4" />
          <TranslateText text="Nuevo Ejecutivo" />
        </button>
      </div>

      {/* Grid de cards */}
      {ejecutivos.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            <TranslateText text="No hay ejecutivos registrados" />
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            <TranslateText text="Comienza creando el primer ejecutivo de la organización." />
          </p>
          <button
            onClick={onCreate}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            <TranslateText text="Crear Primer Ejecutivo" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ejecutivos.map((ejecutivo) => (
            <EjecutivosCard
              key={ejecutivo._id}
              ejecutivo={ejecutivo}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              onUploadPhoto={onUploadPhoto}
              onToggleActive={onToggleActive}
              theme={theme}
            />
          ))}
        </div>
      )}

      {/* Loading overlay cuando se está cargando más */}
      {loading && ejecutivos.length > 0 && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            <TranslateText text="Cargando más..." />
          </span>
        </div>
      )}
    </div>
  );
};