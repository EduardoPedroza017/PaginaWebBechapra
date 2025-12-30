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
  Bell,
  Sparkles,
  Zap,
  Globe,
  Target,
  BarChart3,
  Calendar,
  Mail,
  Layers,
  Code,
  Palette,
  Server,
  Network,
  Users2,
  FileCode,
  BookOpen,
  Clock
} from "lucide-react";

export type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
  isNew?: boolean;
  section?: string;
};

// Organizado por secciones
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
    section: "Contenido",
    badge: 3
  },
  { 
    label: "Comunicados", 
    path: "/admin/press", 
    icon: <Megaphone size={20} />,
    section: "Contenido",
    isNew: true
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
    section: "Usuarios",
    badge: 5
  },
  { 
    label: "Directivos", 
    path: "/admin/organigrama", 
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
    section: "Comunicación",
    badge: 12
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
    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-slate-800 shadow-2xl shadow-slate-900/50'
    : 'bg-gradient-to-b from-white via-slate-50 to-white border-slate-200 shadow-2xl shadow-slate-200/30';

  const headerClasses = isDark
    ? 'bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 border-slate-700'
    : 'bg-gradient-to-r from-blue-50 via-white to-blue-50 border-slate-200';

  const mobileOverlayClasses = isMobileOpen
    ? 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden'
    : 'hidden';

  const mobileSidebarClasses = isMobileOpen
    ? 'translate-x-0'
    : '-translate-x-full md:translate-x-0';

  const sectionLabelClasses = isDark
    ? 'text-slate-500 font-semibold'
    : 'text-slate-500 font-semibold';

  const activeItemClasses = isDark
    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30';

  const inactiveItemClasses = isDark
    ? 'text-slate-400 hover:text-white hover:bg-slate-800/50 hover:shadow-lg hover:shadow-slate-800/30'
    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:shadow-lg hover:shadow-slate-200/30';

  const badgeClasses = isDark
    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white'
    : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white';

  const newBadgeClasses = isDark
    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white'
    : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white';

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
        className={`${sidebarClasses} w-64 md:w-72 min-h-screen flex flex-col border-r fixed md:static left-0 top-0 z-50 transition-transform duration-300 ${mobileSidebarClasses}`}
      >
        {/* Header */}
        <div className={`px-6 py-5 border-b ${headerClasses}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-2 ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-blue-500/30' 
                  : 'bg-gradient-to-br from-blue-100 to-indigo-100 ring-blue-200'
              }`}>
                <NextImage
                  src="/image/LOGO/logo.png"
                  alt="Logo Bechapra"
                  fill
                  sizes="48px"
                  className="object-contain p-2"
                  priority
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'} font-bold tracking-widest uppercase`}>
                    Bechapra
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                    PRO
                  </span>
                </div>
                <h2 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'} leading-tight mt-1`}>
                  <TranslateText text="Panel Admin" />
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'} mt-0.5`}>
                  Sistema de Gestión
                </p>
              </div>
            </div>
            
            {/* Mobile Close Button */}
            <button
              onClick={onMobileClose}
              className={`p-2 rounded-lg md:hidden ${
                isDark 
                  ? 'hover:bg-slate-800 text-slate-400' 
                  : 'hover:bg-slate-200 text-slate-600'
              }`}
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {sectionOrder.map((section) => {
            const items = groupedItems[section];
            if (!items || items.length === 0) return null;

            return (
              <div key={section} className="space-y-2">
                {/* Section Label */}
                <div className="px-3 mb-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs uppercase tracking-wider ${sectionLabelClasses}`}>
                      {section}
                    </span>
                    {section === "Principal" && (
                      <Sparkles size={12} className={isDark ? "text-blue-400" : "text-blue-500"} />
                    )}
                  </div>
                  <div className={`h-px mt-2 ${isDark ? 'bg-gradient-to-r from-transparent via-slate-700 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-300 to-transparent'}`} />
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
                          className={`group flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 relative ${
                            isActive ? activeItemClasses : inactiveItemClasses
                          }`}
                        >
                          {/* Active Indicator */}
                          {isActive && (
                            <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r ${
                              isDark ? 'bg-blue-400' : 'bg-blue-500'
                            }`} />
                          )}

                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`flex-shrink-0 transition-transform duration-200 ${
                              isActive 
                                ? 'scale-110' 
                                : 'group-hover:scale-105'
                            }`}>
                              {item.icon}
                            </span>
                            <span className="text-sm font-semibold truncate">
                              <TranslateText text={item.label} />
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Badges */}
                            {item.badge && (
                              <span className={`text-xs px-2 py-1 rounded-full font-bold ${badgeClasses}`}>
                                {item.badge}
                              </span>
                            )}
                            {item.isNew && (
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${newBadgeClasses}`}>
                                NEW
                              </span>
                            )}
                            {isActive && (
                              <ChevronRight size={16} className="flex-shrink-0 animate-pulse" />
                            )}
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`px-5 py-4 border-t ${
          isDark 
            ? 'border-slate-800 bg-gradient-to-r from-slate-900/50 to-slate-800/50' 
            : 'border-slate-200 bg-gradient-to-r from-slate-50 to-white'
        }`}>
          {/* System Status */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`relative flex items-center justify-center`}>
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'} animate-ping absolute`} />
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'} relative z-10`} />
              </div>
              <span className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Sistema Activo
              </span>
            </div>
            <div className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>
              v2.0.0
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}>
              <HelpCircle size={12} />
              Ayuda
            </button>
            <button className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              isDark 
                ? 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
            }`}>
              <Settings size={12} />
              Config
            </button>
          </div>

          {/* Copyright */}
          <p className={`text-[10px] text-center mt-4 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            © 2025 Bechapra CMS
            <br />
            Todos los derechos reservados
          </p>
        </div>
      </aside>
    </>
  );
}

// Mobile Toggle Button Component
export function SidebarToggle({ theme, onToggle }: { theme?: 'light' | 'dark', onToggle: () => void }) {
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-6 left-6 z-40 p-3 rounded-xl shadow-2xl transition-all md:hidden ${
        isDark
          ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white border border-slate-700 shadow-slate-900/50'
          : 'bg-gradient-to-r from-white to-slate-50 text-slate-700 border border-slate-300 shadow-slate-200/50'
      }`}
      aria-label="Abrir menú"
    >
      <Menu size={20} />
    </button>
  );
}