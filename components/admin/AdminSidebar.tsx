"use client";

import React from 'react';
import { Sidebar as DashboardSidebar } from '../../app/admin/components/layout/Sidebar';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/contexts/ThemeContext';

export default function AdminSidebar(){
  const pathname = usePathname() || '/admin/dashboard';
  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  return <DashboardSidebar selected={pathname} theme={theme} />;
}

