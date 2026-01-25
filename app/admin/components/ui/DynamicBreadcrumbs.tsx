"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ChevronRight, Home } from 'lucide-react';
import { TranslateText } from '@/components/TranslateText';

// ============================================================================
// BREADCRUMB TYPES
// ============================================================================

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface DynamicBreadcrumbsProps {
  items?: BreadcrumbItem[];
  theme?: 'light' | 'dark';
  showHome?: boolean;
  showCurrent?: boolean;
  className?: string;
  homeHref?: string;
}

// ============================================================================
// BREADCRUMB TRANSLATIONS MAP
// ============================================================================

const BREADCRUMB_TRANSLATIONS: Record<string, string> = {
  // Core
  'admin': 'Admin',
  'dashboard': 'Panel',
  
  // Content
  'noticias': 'Noticias',
  'news': 'Noticias',
  'contenido': 'Contenido',
  'content': 'Contenido',
  'categorias': 'Categorías',
  'categories': 'Categorías',
  'tags': 'Etiquetas',
  
  // Users
  'usuarios': 'Usuarios',
  'users': 'Usuarios',
  'roles': 'Roles',
  
  // Media
  'multimedia': 'Multimedia',
  'media': 'Multimedia',
  'galeria': 'Galería',
  'gallery': 'Galería',
  
  // Communication
  'comunicacion': 'Comunicación',
  'communication': 'Comunicación',
  'suscriptores': 'Suscriptores',
  'subscribers': 'Suscriptores',
  'newsletter': 'Boletín',
  
  // System
  'sistema': 'Sistema',
  'system': 'Sistema',
  'configuracion': 'Configuración',
  'settings': 'Configuración',
  'audit-log': 'Registro de Auditoría',
  'logs': 'Registros',
  
  // Actions
  'crear': 'Crear',
  'create': 'Crear',
  'editar': 'Editar',
  'edit': 'Editar',
  'ver': 'Ver',
  'view': 'Ver',
  
  // Common
  'listado': 'Listado',
  'list': 'Listado',
  'estadisticas': 'Estadísticas',
  'stats': 'Estadísticas',
  'config': 'Configuración',
};

// ============================================================================
// HELPER TO TRANSLATE BREADCRUMB LABEL
// ============================================================================

function translateBreadcrumbLabel(label: string): string {
  // Check if we have a translation
  if (BREADCRUMB_TRANSLATIONS[label.toLowerCase()]) {
    return BREADCRUMB_TRANSLATIONS[label.toLowerCase()];
  }
  
  // If it starts with a number (like years or IDs), keep it as is
  if (/^\d/.test(label)) {
    return label;
  }
  
  // Otherwise, try to format it nicely
  return label
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// ============================================================================
// PARSE PATH TO BREADCRUMB ITEMS
// ============================================================================

function parsePathToBreadcrumbs(pathname: string): BreadcrumbItem[] {
  // Remove query params and hash
  const cleanPath = pathname.split('?')[0].split('#')[0];
  
  // Split into segments
  const segments = cleanPath.split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return [];
  }
  
  const items: BreadcrumbItem[] = [];
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    const isLast = index === segments.length - 1;
    const label = translateBreadcrumbLabel(segment);
    
    items.push({
      label,
      href: isLast ? undefined : currentPath,
      icon: index === 0 ? <Home className="w-4 h-4" /> : undefined,
    });
  });
  
  return items;
}

// ============================================================================
// DYNAMIC BREADCRUMBS COMPONENT
// ============================================================================

export default function DynamicBreadcrumbs({
  items: customItems,
  theme = 'light',
  showHome = true,
  showCurrent = true,
  className = '',
  homeHref = '/admin',
}: DynamicBreadcrumbsProps) {
  const pathname = usePathname();
  const isDark = theme === 'dark';
  
  // Use custom items if provided, otherwise parse from path
  const items = customItems || parsePathToBreadcrumbs(pathname);
  
  // Filter out 'admin' segment if showing home
  const filteredItems = showHome 
    ? items.filter(item => !item.href?.endsWith('/admin') && item.label !== 'Admin')
    : items;
  
  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <nav 
      className={clsx(
        'flex items-center gap-1 text-sm',
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-1 flex-wrap">
        {/* Home link */}
        {showHome && (
          <li>
            <Link
              href={homeHref}
              className={clsx(
                'flex items-center gap-1.5 px-2 py-1 rounded-lg',
                'transition-colors duration-200',
                'min-h-[36px]',
                isDark 
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              )}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </li>
        )}
        
        {/* Separator */}
        {filteredItems.length > 0 && (showHome || filteredItems.length > 1) && (
          <li>
            <ChevronRight className={clsx(
              'w-4 h-4 flex-shrink-0',
              isDark ? 'text-slate-600' : 'text-slate-400'
            )} />
          </li>
        )}
        
        {/* Breadcrumb items */}
        {filteredItems.map((item, index) => {
          const isLast = index === filteredItems.length - 1 && !showCurrent;
          const isSecondLast = index === filteredItems.length - 2;
          
          return (
            <React.Fragment key={item.href || index}>
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={clsx(
                      'flex items-center gap-1.5 px-2 py-1 rounded-lg',
                      'transition-colors duration-200',
                      'min-h-[36px]',
                      'hover:scale-105',
                      isDark 
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    )}
                  >
                    {item.icon}
                    <span className={clsx(
                      'truncate max-w-[120px] sm:max-w-[200px]',
                      isSecondLast && 'hidden md:inline'
                    )}>
                      <TranslateText text={item.label} />
                    </span>
                  </Link>
                ) : (
                  <span
                    className={clsx(
                      'flex items-center gap-1.5 px-2 py-1 rounded-lg',
                      'min-h-[36px]',
                      isDark ? 'text-slate-200' : 'text-slate-900',
                      isLast && 'font-medium'
                    )}
                  >
                    {item.icon}
                    <span className={clsx(
                      'truncate max-w-[120px] sm:max-w-[200px]',
                      isSecondLast && 'hidden md:inline'
                    )}>
                      <TranslateText text={item.label} />
                    </span>
                  </span>
                )}
              </li>
              
              {/* Separator between items */}
              {index < filteredItems.length - 1 && (
                <li>
                  <ChevronRight className={clsx(
                    'w-4 h-4 flex-shrink-0',
                    isDark ? 'text-slate-600' : 'text-slate-400'
                  )} />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

// ============================================================================
// STATIC BREADCRUMBS HELPER
// ============================================================================

export function createBreadcrumbs(
  items: BreadcrumbItem[],
  options: {
    theme?: 'light' | 'dark';
    showCurrent?: boolean;
    className?: string;
  } = {}
): React.ReactNode {
  return (
    <DynamicBreadcrumbs
      items={items}
      theme={options.theme}
      showCurrent={options.showCurrent}
      className={options.className}
      showHome={false}
    />
  );
}

// ============================================================================
// COMMON BREADCRUMB CONFIGURATIONS
// ============================================================================

export const BREADCRUMB_CONFIGS = {
  news: [
    { label: 'Admin', href: '/admin' },
    { label: 'Noticias', href: '/admin/noticias' },
  ],
  users: [
    { label: 'Admin', href: '/admin' },
    { label: 'Usuarios', href: '/admin/usuarios' },
  ],
  audit: [
    { label: 'Admin', href: '/admin' },
    { label: 'Sistema', href: '/admin' },
    { label: 'Registro de Auditoría', href: '/admin/audit-log' },
  ],
  settings: [
    { label: 'Admin', href: '/admin' },
    { label: 'Sistema', href: '/admin' },
    { label: 'Configuración', href: '/admin/settings' },
  ],
};

