/**
 * Admin Utilities & Exports
 * 
 * Centraliza todas las utilidades, hooks y constantes del panel de admin
 * 
 * Fase 3 Optimization:
 * - API caching with request deduplication
 * - Virtual scrolling components
 * - Web Vitals monitoring
 * - Image optimization utilities
 */

export * from './admin-api';
export { useAdminApi, adminApi } from './admin-api';

// Lazy components para code splitting
export * from '../../../lib/utils/lazy-components';
export { createDynamicComponent } from '../../../lib/utils/lazy-components';

// Phase 3 Optimizations
export {
  apiRequestCache,
  cachedFetch,
  useCachedFetch,
  invalidateRelatedCache,
  mutateWithCache,
} from './api-cache';

// Admin-specific hooks y utilities pueden agregarse aquí
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',
  USERS: '/admin/usuarios',
  NEWS: '/admin/noticias',
  PRESS: '/admin/prensa',
  GALLERY: '/admin/galeria',
  SERVICES: '/admin/servicios',
  SETTINGS: '/admin/configuracion',
  COOKIES: '/admin/cookies',
  TERMS: '/admin/terminos',
  AUDIT_LOG: '/admin/audit-log',
} as const;

export const ADMIN_SECTIONS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'content', label: 'Contenido', icon: 'article' },
  { id: 'users', label: 'Usuarios', icon: 'people' },
  { id: 'settings', label: 'Configuración', icon: 'settings' },
  { id: 'analytics', label: 'Analytics', icon: 'analytics' },
] as const;
