"use client";

import React, { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { TranslateText } from '@/components/TranslateText';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Database,
  Image as GalleryIcon,
  MessageCircle,
  Newspaper,
  Megaphone,
  Map,
  ChevronRight,
  UserCheck,
  Building2,
  Settings,
  Briefcase,
  GraduationCap,
  Shield,
  FileText,
  Menu,
  X,
  LogOut,
  HelpCircle,
  Layers,
  Code,
  Palette,
  Server,
  Network,
  Users2,
  FileCode,
  BookOpen,
  Clock,
  Target
} from "lucide-react";

export type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
  section?: string;
};

// Organizado por secciones - Solo datos reales
export const sidebarItems: SidebarItem[] = [
  // Sección Principal
  { 
    label: "Dashboard", 
    path: "/admin/dashboard", 
    icon: <LayoutDashboard size={20} />,
    section: "Principal"
  },
  
  // Sección Gestión de Contenido
  { 
    label: "Gestión de Noticias", 
    path: "/admin/news", 
    icon: <Newspaper size={20} />,
    section: "Contenido"
  },
  { 
    label: "Comunicados", 
    path: "/admin/press", 
    icon: <Megaphone size={20} />,
    section: "Contenido"
  },
  { 
    label: "Servicios", 
    path: "/admin/servicios", 
    icon: <Layers size={20} />,
    section: "Contenido"
  },
  { 
    label: "Sub-Servicios", 
    path: "/admin/sub-servicio", 
    icon: <FileCode size={20} />,
    section: "Contenido"
  },
  { 
    label: "Essence", 
    path: "/admin/essence", 
    icon: <Target size={20} />,
    section: "Contenido"
  },
  
  // Sección Gestión de Usuarios
  { 
    label: "Usuarios", 
    path: "/admin/usuarios", 
    icon: <Users2 size={20} />,
    section: "Usuarios"
  },
  { 
    label: "Ejecutivos", 
    path: "/admin/ejecutivos", 
    icon: <UserCheck size={20} />,
    section: "Usuarios"
  },
  { 
    label: "Bolsa de Trabajo", 
    path: "/admin/jobs", 
    icon: <Briefcase size={20} />,
    section: "Usuarios"
  },
  { 
    label: "Prácticas Profesionales", 
    path: "/admin/internships", 
    icon: <GraduationCap size={20} />,
    section: "Usuarios"
  },
  
  // Sección Multimedia
  { 
    label: "Galerías", 
    path: "/admin/galeria", 
    icon: <GalleryIcon size={20} />,
    section: "Multimedia"
  },
  { 
    label: "Branding / Logo", 
    path: "/admin/branding", 
    icon: <Palette size={20} />,
    section: "Multimedia"
  },
  
  // Sección Comunicación
  { 
    label: "Formularios de Contacto", 
    path: "/admin/conctform", 
    icon: <MessageCircle size={20} />,
    section: "Comunicación"
  },
  { 
    label: "Sucursales", 
    path: "/admin/sucursales", 
    icon: <Building2 size={20} />,
    section: "Comunicación"
  },
  
  // Sección Sistema
  { 
    label: "Logs de Auditoría", 
    path: "/admin/audit-log", 
    icon: <Clock size={20} />,
    section: "Sistema"
  },
  { 
    label: "Base de Datos", 
    path: "/admin/config", 
    icon: <Database size={20} />,
    section: "Sistema"
  },
  { 
    label: "Configuración", 
    path: "/admin/settings", 
    icon: <Settings size={20} />,
    section: "Sistema"
  },
  { 
    label: "API & Webhooks", 
    path: "/admin/api", 
    icon: <Code size={20} />,
    section: "Sistema"
  },
];

interface SidebarProps {
  selected: string;
  theme?: 'light' | 'dark';
  role?: string;
  admin?: boolean;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ 
  selected, 
  theme, 
  role, 
  admin, 
  isMobileOpen = false,
  onMobileClose 
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const isDark = theme === 'dark';
  
  // Agrupar items por sección
  const groupedItems = sidebarItems.reduce((acc, item) => {
    const section = item.section || "General";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  // Orden de secciones
  const sectionOrder = ["Principal", "Contenido", "Usuarios", "Multimedia", "Comunicación", "Sistema"];

  // Theme-based styles
  const sidebarClasses = isDark
    ? 'bg-slate-900 border-slate-700'
    : 'bg-white border-slate-200';

  const headerClasses = isDark
    ? 'bg-slate-800 border-slate-700'
    : 'bg-white border-slate-200';

  const mobileOverlayClasses = isMobileOpen
    ? 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden'
    : 'hidden';

  const mobileSidebarClasses = isMobileOpen
    ? 'translate-x-0'
    : '-translate-x-full md:translate-x-0';

  const sectionLabelClasses = isDark
    ? 'text-slate-400 font-medium'
    : 'text-slate-500 font-medium';

  const activeItemClasses = isDark
    ? 'bg-blue-600 text-white'
    : 'bg-blue-600 text-white';

  const inactiveItemClasses = isDark
    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100';

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={mobileOverlayClasses}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`${sidebarClasses} w-64 min-h-screen flex flex-col border-r fixed md:static left-0 top-0 z-50 transition-transform duration-300 ${mobileSidebarClasses}`}
      >
        {/* Header */}
        <div className={`px-4 py-4 border-b ${headerClasses}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 ${
                isDark 
                  ? 'bg-slate-700' 
                  : 'bg-slate-100'
              }`}>
                <NextImage
                  src="/image/logo/bausen-logo.png"
                  alt="Logo BAUSEN"
                  fill
                  sizes="40px"
                  className="object-contain p-2"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <h2 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <TranslateText text="Panel Admin" />
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Sistema de Gestión
                </p>
              </div>
            </div>
            
            {/* Mobile Close Button */}
            <button
              onClick={onMobileClose}
              className={`p-2 rounded-lg md:hidden ${
                isDark 
                  ? 'hover:bg-slate-700 text-slate-400' 
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
          {sectionOrder.map((section) => {
            const items = groupedItems[section];
            if (!items || items.length === 0) return null;

            return (
              <div key={section} className="space-y-1">
                {/* Section Label */}
                <div className="px-3">
                  <span className={`text-xs uppercase tracking-wider ${sectionLabelClasses}`}>
                    {section}
                  </span>
                </div>

                {/* Section Items */}
                <div className="space-y-1">
                  {items
                    .filter((item) => {
                      if (admin === false) {
                        const adminOnly = [
                          '/admin/usuarios',
                          '/admin/audit-log',
                          '/admin/config',
                          '/admin/branding',
                          '/admin/api',
                          '/admin/settings'
                        ];
                        if (adminOnly.includes(item.path)) return false;
                      }
                      return true;
                    })
                    .map((item) => {
                      const isActive = selected === item.path;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={onMobileClose}
                          className={`group flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-colors ${
                            isActive ? activeItemClasses : inactiveItemClasses
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`}>
                              {item.icon}
                            </span>
                            <span className="text-sm font-medium truncate">
                              <TranslateText text={item.label} />
                            </span>
                          </div>

                          {isActive && (
                            <ChevronRight size={16} className="flex-shrink-0" />
                          )}
                        </Link>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer - Solo información básica */}
        <div className={`px-4 py-4 border-t ${
          isDark 
            ? 'border-slate-700' 
            : 'border-slate-200'
        }`}>
          <p className={`text-xs text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} BAUSEN CMS
          </p>
        </div>
      </aside>
    </>
  );
}

// Mobile Toggle Button Component - Versión simplificada
export function SidebarToggle({ theme, onToggle }: { theme?: 'light' | 'dark', onToggle: () => void }) {
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-6 left-6 z-40 p-3 rounded-lg shadow-lg md:hidden ${
        isDark
          ? 'bg-slate-800 text-white'
          : 'bg-white text-slate-700'
      }`}
      aria-label="Abrir menú"
    >
      <Menu size={20} />
    </button>
  );
}