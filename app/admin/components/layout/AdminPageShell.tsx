"use client";

import React from 'react';
import QuickActions from '../../dashboard/QuickActions';
import { WebVitalsWidget } from '@/lib/utils/web-vitals';
import CookieConsentAdmin from '../../cookie/CookieConsentAdminNew';

interface AdminPageShellProps {
  children: React.ReactNode;
  containerClassName?: string;
  showSidebar?: boolean;
}

/**
 * AdminPageShell - Contenedor estandarizado para páginas del admin.
 * 
 * Proporciona:
 * - Layout consistente con padding uniforme
 * - Sidebar derecho opcional (QuickActions, WebVitals, Cookies)
 * - Grid responsive de 2 columnas (contenido + sidebar)
 * 
 * @example
 * ```tsx
 * <AdminPageShell>
 *   <AdminPageHeader title="Noticias" />
 *   <AdminTabs ... />
 *   <NewsList />
 * </AdminPageShell>
 * ```
 */
export default function AdminPageShell({ 
  children, 
  containerClassName = '',
  showSidebar = true,
}: AdminPageShellProps) {
  return (
    <div className={containerClassName}>
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {children}
            </div>

            {/* Sidebar (Quick Actions, etc.) */}
            {showSidebar && (
              <aside className="lg:col-span-1 space-y-6">
                <div className="sticky top-6">
                  <QuickActions />
                  <div className="mt-4">
                    <WebVitalsWidget />
                  </div>
                  <div className="mt-4">
                    <CookieConsentAdmin />
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
