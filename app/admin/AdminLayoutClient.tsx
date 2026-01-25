"use client";

import React, { useState, useEffect } from 'react';
import AdminThemeProvider from './providers/ThemeProvider';
import ResponsiveSidebar from './components/layout/ResponsiveSidebar';
import AdminHeader from './components/layout/AdminHeader';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const { isExpanded, toggleSidebar } = useSidebar();

  return (
    <SidebarProvider>
      <div className="admin-root">
        <div className="flex h-screen bg-background text-foreground">
          {/* Sidebar with responsive and collapsible behavior */}
          <aside className={`admin-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <ResponsiveSidebar expanded={isExpanded} onToggle={toggleSidebar} />
          </aside>

          {/* Main content area */}
          <div className="flex-1 flex flex-col" style={{ marginLeft: isExpanded ? '18rem' : '5rem' }}>
            <header className="admin-header fixed top-0 left-0 w-full z-20" style={{ marginLeft: isExpanded ? '18rem' : '5rem' }}>
              <AdminHeader onToggleSidebar={toggleSidebar} />
            </header>
            <main className="admin-main" style={{ marginTop: '4rem' }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-12">{children}</div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
