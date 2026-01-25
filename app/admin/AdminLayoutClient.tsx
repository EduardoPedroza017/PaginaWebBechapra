"use client";

import React, { useState, useEffect } from 'react';
import AdminThemeProvider from './providers/ThemeProvider';
import ResponsiveSidebar from './components/layout/ResponsiveSidebar';
import AdminHeader from './components/layout/AdminHeader';
import { useSidebar } from '@/contexts/SidebarContext';
import { GRID_COLS } from './design-system';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar autenticación
    const checkAuth = () => {
      try {
        const adminToken = sessionStorage.getItem('admin_token');
        setIsAuthenticated(!!adminToken);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Mostrar loading mientras verificamos autenticación
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-pulse text-slate-500 dark:text-slate-400">Cargando...</div>
      </div>
    );
  }

  // Si no está autenticado, mostrar solo el contenido (login)
  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        {children}
      </div>
    );
  }

  // Si está autenticado, mostrar layout completo con sidebar y header
  return (
    <div className="admin-root">
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
          <ResponsiveSidebar expanded={isExpanded} onToggle={() => {}} />
        </aside>

        {/* Main content area */}
        <div className={`flex-1 flex flex-col admin-main-wrapper ${isExpanded ? 'expanded' : 'collapsed'}`}>
          <header className="admin-header shrink-0">
            <AdminHeader />
          </header>
          
          <main className="admin-main flex-1 overflow-y-auto">
            <div className="max-w-[1600px] mx-auto w-full px-4 md:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-12">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminThemeProvider>
  );
}

