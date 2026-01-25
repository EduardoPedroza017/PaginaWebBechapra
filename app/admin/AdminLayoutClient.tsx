"use client";

import React, { useState, useEffect, useCallback } from 'react';
import AdminThemeProvider from './providers/ThemeProvider';
import ResponsiveSidebar from './components/layout/ResponsiveSidebar';
import AdminHeader from './components/layout/AdminHeader';
import MobileDrawerOverlay from './components/layout/MobileDrawerOverlay';
import { useSidebar } from '@/contexts/SidebarContext';
import { GRID_COLS } from './design-system';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      if (mobile && isExpanded) {
        // On mobile, always collapse sidebar
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isExpanded]);

  // Verify authentication
  useEffect(() => {
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

  // Handle sidebar toggle
  const handleSidebarToggle = useCallback(() => {
    if (isMobile) {
      setIsMobileDrawerOpen(true);
    }
  }, [isMobile]);

  // Handle mobile drawer close
  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, []);

  // Show loading while verifying authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-pulse text-slate-500 dark:text-slate-400">Cargando...</div>
      </div>
    );
  }

  // If not authenticated, show only the content (login)
  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        {children}
      </div>
    );
  }

  // If authenticated, show full layout with sidebar and header
  return (
    <div className="admin-root">
      {/* Mobile Drawer Overlay */}
      <MobileDrawerOverlay
        isOpen={isMobileDrawerOpen}
        onClose={handleMobileDrawerClose}
        position="left"
        theme="light"
      >
        <ResponsiveSidebar 
          expanded={true} 
          onToggle={handleMobileDrawerClose} 
        />
      </MobileDrawerOverlay>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className={`admin-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
          <ResponsiveSidebar expanded={isExpanded} onToggle={() => {}} />
        </aside>
      )}

      {/* Main content area */}
      <div className={`flex-1 flex flex-col admin-main-wrapper ${isExpanded && !isMobile ? 'expanded' : 'collapsed'}`}>
        <header className="admin-header shrink-0">
          <AdminHeader onToggleSidebar={handleSidebarToggle} />
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
  );
}

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminThemeProvider>
  );
}

