"use client";

import React from 'react';
import { Header as DashboardHeader } from '../../app/admin/components/layout/Header';
import { useTheme } from '@/lib/contexts/ThemeContext';

export default function AdminNavbar(){
  const themeCtx = useTheme();

  const handleLogout = () => { /* placeholder logout - integrate with auth if available */ };

  const handleToggleTheme = () => {
    try {
      // next-themes useTheme provides `theme` and `setTheme`
      const current = themeCtx.resolvedTheme || themeCtx.theme;
      const next = current === 'dark' ? 'light' : 'dark';
      themeCtx.setTheme?.(next);
    } catch (e) {
      // fallback: toggle localStorage and reload
      const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light';
      const next = saved === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') localStorage.setItem('theme', next);
      if (typeof window !== 'undefined') document.documentElement.classList.toggle('dark', next === 'dark');
    }
  };

  // Determine theme value for Header prop
  const headerTheme = (themeCtx.resolvedTheme || themeCtx.theme) === 'dark' ? 'dark' : 'light';

  return (
    <DashboardHeader
      onLogout={handleLogout}
      onToggleTheme={handleToggleTheme}
      theme={headerTheme}
    />
  );
}

