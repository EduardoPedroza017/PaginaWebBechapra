/**
 * LAZY LOADED COMPONENTS UTILITIES
 * 
 * Exporta patrones para lazy loading de componentes pesados
 * Los componentes se cargan bajo demanda para reducir el bundle inicial
 */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';

/**
 * Componente de fallback mientras se carga un componente pesado
 */
const LoadingFallback = () => (
  <div
    className="w-full h-48 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 animate-pulse rounded-lg flex items-center justify-center"
    role="status"
    aria-label="Cargando componente"
  >
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
      <p className="text-sm text-slate-500 dark:text-slate-400">Cargando...</p>
    </div>
  </div>
);

/**
 * Crear un componente dinámico reutilizable con loading state
 * 
 * @example
 * ```typescript
 * const MyComponent = createDynamicComponent(
 *   () => import('@/components/MyComponent'),
 *   { ssr: false }
 * );
 * ```
 */
export function createDynamicComponent<P extends object>(
  loader: () => Promise<{ default: React.ComponentType<P> }>,
  options?: {
    loading?: () => React.ReactElement;
    ssr?: boolean;
  }
) {
  return dynamic(loader, {
    loading: options?.loading || (() => <LoadingFallback />),
    ssr: options?.ssr !== false,
  });
}

/**
 * Precargar componente dinámico en anticipación
 * Útil para evitar delays cuando el usuario navega o interactúa
 * 
 * @example
 * ```typescript
 * // En un botón que abre un modal
 * <button
 *   onMouseEnter={() => preloadComponent(MyDynamicComponent)}
 *   onClick={handleOpen}
 * >
 *   Abrir
 * </button>
 * ```
 */
export function preloadComponent(Component: any) {
  if (typeof window !== 'undefined' && Component.preload) {
    Component.preload?.();
  }
}

export default {
  LoadingFallback,
  createDynamicComponent,
  preloadComponent,
};
