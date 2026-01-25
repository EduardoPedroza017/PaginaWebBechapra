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
  const currentPath = pathname || '';
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
      <aside className={`admin-sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="flex items-center gap-4">
            <div className={`relative ${expanded ? 'w-36 h-10' : 'w-10 h-10'} rounded-lg overflow-hidden flex-shrink-0`}>
              <NextImage
                src={expanded ? '/image/logo/bausen-logo.png' : '/image/logo/Favicon_Bausen_01.png'}
                alt={expanded ? 'Logo BAUSEN' : 'Bausen mark'}
                fill
                sizes="40px"
                className="object-contain p-2"
                priority
              />
            </div>
          </div>
          <button onClick={onToggle} aria-label="Toggle sidebar" className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"> 
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {(() => {
              const pathname = usePathname() || '/admin/dashboard';
              const grouped = sidebarItems.reduce((acc: Record<string, SidebarItem[]>, item) => {
                const section = item.section || 'General';
                acc[section] = acc[section] || [];
                acc[section].push(item);
                return acc;
              }, {} as Record<string, SidebarItem[]>);

              const order = ['Principal','Contenido','Usuarios','Multimedia','Comunicación','Sistema'];

              return order.map((section) => {
                const items = grouped[section];
                if (!items) return null;
                return (
                  <li key={section}>
                    {expanded && <div className="px-3 text-xs text-gray-500 mb-2">{section}</div>}
                    <div>
                      {items.map((item) => {
                        const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
                        return (
                          <div key={item.path} className="relative">
                            {!expanded && <span className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-lg ${isActive ? 'bg-blue-600' : ''}`} />}
                            <Link key={item.path} href={item.path} className={clsx('flex items-center gap-4 px-4 py-3 rounded-md transition-colors', isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800') } title={!expanded ? item.label : undefined}>
                              <span className="flex-shrink-0">{item.icon}</span>
                              {expanded && <div className="flex flex-col min-w-0">
                                <span className="text-sm font-medium truncate"><TranslateText text={item.label} /></span>
                                {item.description && <span className="text-xs text-gray-500 truncate">{item.description}</span>}
                              </div>}
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                );
              });
            })()}
          </ul>
        </nav>

        <div className="px-4 py-5">
          {/* Logout is provided in the header to avoid duplicate controls; keep this area for future utilities */}
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