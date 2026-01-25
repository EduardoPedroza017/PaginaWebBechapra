"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { TranslateText } from '@/components/TranslateText';
import {
  LayoutDashboard,
  Users,
  Database,
  Image as GalleryIcon,
  MessageCircle,
  Newspaper,
  Megaphone,
  Building2,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  Settings,
  Briefcase,
  GraduationCap,
  FileText,
  Menu,
  X,
  Layers,
  Code,
  Palette,
  Server,
  Users2,
  FileCode,
  BookOpen,
  Clock,
  Target,
  HelpCircle,
  LogOut,
  Home,
  FolderKanban,
  BarChart3
} from "lucide-react";

export type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
  section?: string;
  description?: string;
};

// Organizado por secciones - Solo datos reales
export const sidebarItems: SidebarItem[] = [
  // Sección Principal
  { 
    label: "Dashboard", 
    path: "/admin/dashboard", 
    icon: <LayoutDashboard size={22} />,
    section: "Principal",
    description: "Panel de control principal"
  },
  
  // Sección Gestión de Contenido
  { 
    label: "Noticias", 
    path: "/admin/news", 
    icon: <Newspaper size={22} />,
    section: "Contenido",
    description: "Gestión de noticias"
  },
  { 
    label: "Comunicados", 
    path: "/admin/press", 
    icon: <Megaphone size={22} />,
    section: "Contenido",
    description: "Comunicados oficiales"
  },
  { 
    label: "Servicios", 
    path: "/admin/servicios", 
    icon: <Layers size={22} />,
    section: "Contenido",
    description: "Gestión de servicios"
  },
  { 
    label: "Sub-Servicios", 
    path: "/admin/sub-servicio", 
    icon: <FileCode size={22} />,
    section: "Contenido",
    description: "Sub-servicios"
  },
  { 
    label: "Essence", 
    path: "/admin/essence", 
    icon: <Target size={22} />,
    section: "Contenido",
    description: "Valores esenciales"
  },
  
  // Sección Gestión de Usuarios
  { 
    label: "Usuarios", 
    path: "/admin/usuarios", 
    icon: <Users2 size={22} />,
    section: "Usuarios",
    description: "Gestión de usuarios"
  },
  { 
    label: "Ejecutivos", 
    path: "/admin/ejecutivos", 
    icon: <UserCheck size={22} />,
    section: "Usuarios",
    description: "Ejecutivos y directivos"
  },
  { 
    label: "Bolsa de Trabajo", 
    path: "/admin/jobs", 
    icon: <Briefcase size={22} />,
    section: "Usuarios",
    description: "Ofertas de empleo"
  },
  { 
    label: "Prácticas", 
    path: "/admin/internships", 
    icon: <GraduationCap size={22} />,
    section: "Usuarios",
    description: "Prácticas profesionales"
  },
  {
    label: "CVs",
    path: "/admin/cv",
    icon: <FileText size={22} />,
    section: "Usuarios",
    description: "Gestión de CVs"
  },

  // Sección Multimedia
  { 
    label: "Galerías", 
    path: "/admin/galeria", 
    icon: <GalleryIcon size={22} />,
    section: "Multimedia",
    description: "Galería multimedia"
  },
  { 
    label: "Branding", 
    path: "/admin/branding", 
    icon: <Palette size={22} />,
    section: "Multimedia",
    description: "Identidad visual"
  },
  { 
    label: "Eventos", 
    path: "/admin/eventos", 
    icon: <BookOpen size={22} />,
    section: "Multimedia",
    description: "Gestión de eventos"
  },
  
  // Sección Comunicación
  { 
    label: "Contacto", 
    path: "/admin/conctform", 
    icon: <MessageCircle size={22} />,
    section: "Comunicación",
    description: "Formularios de contacto"
  },
  { 
    label: "Sucursales", 
    path: "/admin/sucursales", 
    icon: <Building2 size={22} />,
    section: "Comunicación",
    description: "Gestión de sucursales"
  },
  
  // Sección Sistema
  { 
    label: "Auditoría", 
    path: "/admin/audit-log", 
    icon: <Clock size={22} />,
    section: "Sistema",
    description: "Logs de auditoría"
  },
  { 
    label: "Base de Datos", 
    path: "/admin/config", 
    icon: <Database size={22} />,
    section: "Sistema",
    description: "Configuración BD"
  },
  
];

interface SidebarProps {
  selected: string;
  theme?: 'light' | 'dark';
  role?: string;
  admin?: boolean;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  collapsed?: boolean;
  onCollapseToggle?: () => void;
}

export function Sidebar({ 
  selected, 
  theme = 'light', 
  role, 
  admin, 
  isMobileOpen = false,
  onMobileClose,
  collapsed: collapsedProp,
  onCollapseToggle
}: SidebarProps) {
  const [localCollapsed, setLocalCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isDark = theme === 'dark';

  // Determine controlled vs uncontrolled collapse state
  const isCollapsed = typeof collapsedProp !== 'undefined' ? collapsedProp : localCollapsed;

  // Handler that respects controlled prop if provided
  const handleToggleCollapse = () => {
    const newState = !localCollapsed;
    setLocalCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', newState.toString());
  };

  // Agrupar items por sección
  const groupedItems = sidebarItems.reduce((acc, item) => {
    const section = item.section || "General";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);
  const sectionOrder = ["Principal", "Contenido", "Usuarios", "Multimedia", "Comunicación", "Sistema"];

  // Effect para cerrar en mobile al cambiar ruta
  useEffect(() => {
    if (isMobileOpen && onMobileClose) {
      onMobileClose();
    }
  }, [pathname]);

  // Restaurar el estado de colapso desde localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setLocalCollapsed(savedState === 'true');
    }
  }, []);

  // Theme-based styles
  const sidebarClasses = `
    ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}
    ${isCollapsed ? 'w-20' : 'w-64'}
    min-h-screen flex flex-col border-r transition-all duration-300 ease-in-out
    fixed md:static left-0 top-0 z-50
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
  `;

  const mobileOverlayClasses = isMobileOpen
    ? 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden'
    : 'hidden';

  const sectionLabelClasses = isDark
    ? 'text-gray-400 font-medium'
    : 'text-gray-500 font-medium';

  const activeItemClasses = 'bg-blue-600 text-white';
  const inactiveItemClasses = isDark
    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={mobileOverlayClasses}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        {/* Header */}
        <div className={`px-4 py-4 border-b ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } ${isCollapsed ? 'px-3' : ''}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed ? (
              <>
                <div className="flex items-center gap-3">
                  <div className={`relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 ${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <NextImage
                        src="/image/logo/Bausen.png"
                        alt="Logo BAUSEN"
                        fill
                        sizes="40px"
                        className="object-contain p-2"
                        priority
                      />
                    </div>
                </div>
                
                {/* Collapse Toggle Button */}
                <button
                  onClick={handleToggleCollapse}
                  className={`p-2 rounded-lg transition-all ${
                    isDark 
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label={isCollapsed ? "Expandir sidebar" : "Minimizar sidebar"}
                >
                  <ChevronLeft size={20} className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
                </button>
              </>
            ) : (
              // Logo solo en modo minimizado
                <div className="flex flex-col items-center gap-2">
                <div className={`relative w-10 h-10 rounded-lg overflow-hidden ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <NextImage
                    src="/image/logo/Favicon_Bausen_01.png"
                    alt="Bausen mark"
                    fill
                    sizes="40px"
                    className="object-contain p-2"
                    priority
                  />
                </div>
                {/* Expand Button in collapsed mode */}
                <button
                  onClick={handleToggleCollapse}
                  className={`p-2 rounded-lg transition-all ${
                    isDark 
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="Expandir sidebar"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
            
            {/* Mobile Close Button */}
            <button
              onClick={onMobileClose}
              className={`p-2 rounded-lg md:hidden ${isCollapsed ? 'absolute top-4 right-4' : ''} ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-600'
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

            // En modo minimizado, solo mostrar iconos sin secciones
            if (isCollapsed) {
              return (
                <div key={section} className="space-y-1">
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
                        <div key={item.path} className="relative">
                          <Link
                            href={item.path}
                            onClick={onMobileClose}
                            onMouseEnter={() => setHoveredItem(item.path)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className={`group flex items-center justify-center p-3 rounded-lg font-medium transition-all ${
                              isActive ? activeItemClasses : inactiveItemClasses
                            }`}
                          >
                            <span className={`${isActive ? 'text-white' : ''}`}>
                              {item.icon}
                            </span>
                          </Link>
                          
                          {/* Tooltip para modo minimizado */}
                          {hoveredItem === item.path && (
                            <div className={`
                              absolute left-full ml-2 top-1/2 transform -translate-y-1/2
                              px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap z-50
                              ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
                              shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                            `}>
                              {item.label}
                              {item.description && (
                                <div className={`text-xs mt-1 ${
                                  isDark ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  {item.description}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              );
            }

            // Modo expandido
            return (
              <div key={section} className="space-y-1">
                {/* Section Label (solo en modo expandido) */}
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
                          className={`group flex items-center justify-between px-3 py-3 rounded-lg font-medium transition-all ${
                            isActive ? activeItemClasses : inactiveItemClasses
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`}>
                              {item.icon}
                            </span>
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-medium truncate">
                                <TranslateText text={item.label} />
                              </span>
                              {item.description && (
                                <span className={`text-xs truncate ${
                                  isActive ? 'text-blue-100' : isDark ? 'text-gray-500' : 'text-gray-500'
                                }`}>
                                  {item.description}
                                </span>
                              )}
                            </div>
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

        {/* Footer */}
        <div className={`px-4 py-4 border-t ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        } ${isCollapsed ? 'px-3' : ''}`}>
          {!isCollapsed ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Users size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {role || 'Administrador'}
                  </span>
                  <span className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {admin ? 'Admin completo' : 'Acceso limitado'}
                  </span>
                </div>
              </div>

              {/* Quick Actions: only help — logout is centralized in header */}
              <div className="flex items-center gap-2">
                <button
                  className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    isDark 
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <TranslateText text="Ayuda" />
                </button>
              </div>
            </>
          ) : (
            // Footer minimizado
              <div className="flex flex-col items-center gap-4">
                <button
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? 'hover:bg-gray-800 text-gray-400' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Ayuda"
                >
                  <HelpCircle size={20} />
                </button>
              </div>
          )}
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
      className={`fixed bottom-6 left-6 z-40 p-3 rounded-lg shadow-lg md:hidden ${
        isDark
          ? 'bg-gray-800 text-white hover:bg-gray-700'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
      aria-label="Abrir menú"
    >
      <Menu size={20} />
    </button>
  );
}

// Floating Expand Button para escritorio (opcional)
export function FloatingExpandButton({ collapsed, onToggle, theme }: { 
  collapsed: boolean, 
  onToggle: () => void,
  theme?: 'light' | 'dark'
}) {
  const isDark = theme === 'dark';
  
  if (!collapsed) return null;
  
  return (
    <button
      onClick={onToggle}
      className={`fixed top-4 left-24 z-40 p-2 rounded-full shadow-lg transition-all ${
        isDark
          ? 'bg-gray-800 text-white hover:bg-gray-700'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
      aria-label="Expandir sidebar"
    >
      <ChevronRight size={20} />
    </button>
  );
}