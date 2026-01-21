"use client";

import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import ThemeToggle from '@/components/admin/ui/ThemeToggle';
import Link from 'next/link';

export default function AdminHeader({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-card sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="text-sm font-semibold">Panel de Administración</div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle className="hidden sm:inline-flex" />
        <Link href="/admin/logout" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-red-50 dark:bg-red-900/20 hover:opacity-95">
          <LogOut size={16} />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </Link>
      </div>
    </header>
  );
}
