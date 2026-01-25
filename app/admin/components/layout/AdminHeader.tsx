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
    <header className="admin-header">
      <div className="flex items-center gap-4">
        <div className="text-lg font-bold">Panel de Administración</div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle className="hidden sm:inline-flex" />
        <button
          onClick={async () => {
            try {
              await fetch('/api/backend/admin/logout', { method: 'POST', credentials: 'include' });
            } catch (e) {
              // ignore
            }
            try { sessionStorage.removeItem('admin'); } catch (e) {}
            try { sessionStorage.removeItem('role'); } catch (e) {}
            try { sessionStorage.removeItem('admin_token'); } catch (e) {}
            try { sessionStorage.removeItem('user_email'); } catch (e) {}
            try { sessionStorage.removeItem('user_name'); } catch (e) {}
            try { localStorage.removeItem('token'); } catch (e) {}
            try { localStorage.removeItem('user'); } catch (e) {}
            window.location.href = '/admin';
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-red-50 dark:bg-red-900/20 hover:opacity-95"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}
