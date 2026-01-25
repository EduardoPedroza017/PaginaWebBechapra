"use client";

import React from 'react';
import Link from 'next/link';

interface DashboardActionsProps {
  theme: 'light' | 'dark';
  role?: string;
}

interface ActionItem {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  requiresSuperAdmin?: boolean;
}

export function DashboardActions({ theme, role = '' }: DashboardActionsProps) {
  const isDark = theme === 'dark';

  // Iconos inline para evitar problemas de tipos
  const Icons = {
    Newspaper: (props: { className?: string }) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
    ),
    Image: (props: { className?: string }) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    ),
    FileText: (props: { className?: string }) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    ),
    MessageSquare: (props: { className?: string }) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    ),
    Sparkles: (props: { className?: string }) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
    ),
    Network: (props: { className?: string }) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="2"/><rect x="2" y="16" width="6" height="6" rx="2"/><rect x="8" y="4" width="6" height="6" rx="2"/><path d="M8 10h8M8 10a2 2 0 0 1 2 2M8 10v6M16 10v6"/></svg>
    ),
    Users: (props: { className?: string }) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    BarChart3: (props: { className?: string }) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
    ),
    Settings: (props: { className?: string }) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    ),
    ExternalLink: (props: { className?: string }) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
    ),
  };

  const baseActions: ActionItem[] = [
    { label: "Noticias", description: "Gestionar publicaciones", icon: Icons.Newspaper, href: "/admin/news" },
    { label: "Galería", description: "Administrar imágenes", icon: Icons.Image, href: "/admin/galeria" },
    { label: "Comunicados", description: "Publicaciones oficiales", icon: Icons.FileText, href: "/admin/press" },
    { label: "Contactos", description: "Mensajes recibidos", icon: Icons.MessageSquare, href: "/admin/conctform" },
    { label: "Essence", description: "Misión y valores", icon: Icons.Sparkles, href: "/admin/essence" },
    { label: "Organigrama", description: "Estructura empresarial", icon: Icons.Network, href: "/admin/organigrama" },
  ];

  const superadminActions: ActionItem[] = [
    { label: "Usuarios", description: "Gestión de accesos", icon: Icons.Users, href: "/admin/usuarios", requiresSuperAdmin: true },
    { label: "Auditoría", description: "Logs del sistema", icon: Icons.BarChart3, href: "/admin/audit-log", requiresSuperAdmin: true },
    { label: "Configuración", description: "Ajustes del sistema", icon: Icons.Settings, href: "/admin/settings", requiresSuperAdmin: true },
  ];

  const allActions: ActionItem[] = role === 'superadmin' 
    ? [...baseActions, ...superadminActions]
    : baseActions;

  const getGridCols = (): string => {
    const count = allActions.length;
    if (count <= 4) return "grid-cols-2 md:grid-cols-2 lg:grid-cols-4";
    if (count <= 6) return "grid-cols-2 md:grid-cols-3 lg:grid-cols-6";
    if (count <= 8) return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-xl ${isDark ? 'bg-blue-600/20' : 'bg-blue-100'}`}>
          <Icons.Newspaper className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        </div>
        <div>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Acciones Rápidas
          </h3>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Navega a las secciones del panel
          </p>
        </div>
      </div>

      <div className={`grid gap-4 ${getGridCols()}`}>
        {allActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Link
              key={`${action.href}-${index}`}
              href={action.href}
              className={`group flex flex-col p-4 rounded-xl border transition-all ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800' 
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <IconComponent className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                
                {action.requiresSuperAdmin && (
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                    isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    Admin
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h4 className={`font-semibold text-sm mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {action.label}
                </h4>
                <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {action.description}
                </p>
              </div>

              <div className={`mt-3 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    Acceder
                  </span>
                  <Icons.ExternalLink className={`w-3.5 h-3.5 ${
                    isDark 
                      ? 'text-slate-600 group-hover:text-slate-400' 
                      : 'text-slate-400 group-hover:text-slate-600'
                  } transition-colors`} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardActions;

