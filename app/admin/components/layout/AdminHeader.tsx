"use client";

import React, { useState } from 'react';
import { LogOut, Bell, Search, ChevronRight, Menu, User, Settings } from 'lucide-react';
import ThemeToggle from '@/components/admin/ui/ThemeToggle';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  return (
    <header className="admin-header sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200/80 bg-white/85 px-4 py-4 backdrop-blur-xl md:px-6 dark:border-slate-800/80 dark:bg-slate-950/80">
      {/* Left side - Breadcrumbs & Title */}
      <div className="flex min-w-0 items-center gap-4">
        {/* Mobile menu button */}
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden rounded-xl border border-slate-200 bg-white/80 p-2.5 text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Breadcrumb */}
        <div className="min-w-0">
          <nav className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-slate-500 dark:text-slate-400">Admin</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-900 dark:text-white">Dashboard</span>
          </nav>
          <div className="mt-1 hidden lg:block">
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              Control centralizado de operaciones, contenido y estado del sistema.
            </p>
          </div>
        </div>
      </div>

      {/* Center - Search (optional, hidden on mobile) */}
      <div className="mx-8 hidden max-w-lg flex-1 lg:flex">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar en el panel..."
            className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-3 pl-11 pr-4 text-sm text-slate-700 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button 
          className="relative rounded-2xl border border-slate-200/80 bg-white/80 p-2.5 text-slate-600 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Notificaciones"
        >
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle className="hidden sm:flex" />

        {/* User Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/85 px-2 py-1.5 text-left shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-slate-900 dark:text-white">Administrador</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">admin@bausen.com</div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950/50">
                <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Administrador</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@bausen.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <User className="w-4 h-4" />
                    Perfil
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Settings className="w-4 h-4" />
                    Configuración
                  </button>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                  <button
                    onClick={async () => {
                      try {
                        await fetch('/web/api/backend/admin/auth/logout', { method: 'POST', credentials: 'include' });
                      } catch {
                        // ignore
                      }
                      try { sessionStorage.clear(); } catch {}
                      try { localStorage.removeItem('token'); } catch {}
                      try { localStorage.removeItem('user'); } catch {}
                      window.location.href = '/web/admin';
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

