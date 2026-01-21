"use client";

import React, { useState, useEffect } from 'react';
import AdminThemeProvider from './providers/ThemeProvider';
import ResponsiveSidebar from './components/layout/ResponsiveSidebar';
import AdminHeader from './components/layout/AdminHeader';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState<boolean>(() => {
    try {
      const v = typeof window !== 'undefined' ? localStorage.getItem('admin:sidebar:expanded') : null;
      return v === null ? true : v === '1';
    } catch (e) { return true; }
  });

  useEffect(() => {
    try { localStorage.setItem('admin:sidebar:expanded', expanded ? '1' : '0'); } catch (e) {}
  }, [expanded]);

  const toggle = () => setExpanded((s) => !s);

  return (
    <AdminThemeProvider>
      <div className="flex h-screen bg-background text-foreground">
        {/* Sidebar (left) */}
        <ResponsiveSidebar expanded={expanded} onToggle={toggle} />

        {/* Main area */}
        <div className="flex-1 flex flex-col">
          <AdminHeader onToggleSidebar={toggle} />
          <main className="flex-1 overflow-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-12">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </AdminThemeProvider>
  );
}
