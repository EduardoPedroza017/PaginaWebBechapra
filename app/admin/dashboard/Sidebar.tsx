"use client";

import React from "react";
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
  MapPin,
} from "lucide-react";

export type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

export const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
  { label: "Usuarios", path: "/admin/usuarios", icon: <Users size={20} /> },
  { label: "Logs de Auditoría", path: "/admin/audit-log", icon: <ClipboardList size={20} /> },
  { label: "Conexion a la Base de Datos", path: "/admin/config", icon: <Database size={20} /> },
  { label: "Galerías", path: "/admin/galeria", icon: <GalleryIcon size={20} /> },
  { label: "Formularios de Contacto", path: "/admin/conctform", icon: <MessageCircle size={20} /> },
  { label: "Gestión de Noticias", path: "/admin/news", icon: <Newspaper size={20} /> },
  { label: "Gestión de Comunicados", path: "/admin/press", icon: <Megaphone size={20} /> },
  { label: "Gestión de Essence", path: "/admin/essence", icon: <Map size={20} /> },
  { label: "Gestión de Directivos", path: "/admin/organigrama", icon: <UserCheck size={20} /> },
  { label: "Ubicación de la Empresa", path: "/admin/ubicacion", icon: <MapPin size={20} /> },
];

interface SidebarProps {
  selected: string;
  theme?: 'light' | 'dark';
}

export function Sidebar({ selected, theme }: SidebarProps) {
  const isDark = theme === 'dark';
  
  // Diseño moderno y limpio sin gradientes agresivos
  const bgClasses = isDark
    ? 'bg-slate-900 border-slate-800'
    : 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-xl shadow-slate-200/60';
  
  const headerBg = isDark
    ? 'bg-slate-800/50 border-slate-700'
    : 'bg-slate-50/80 border-slate-200';

  return (
    <aside
      className={`${bgClasses} w-64 min-h-screen flex flex-col shadow-xl border-r fixed md:static left-0 top-0 z-40 transition-all duration-300`}
      style={{ maxWidth: '100vw' }}
    >
      {/* Header del sidebar */}
      <div className={`px-5 py-5 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'} ${headerBg}`}>
        <div className="flex items-center gap-3">
          <div className={`relative w-11 h-11 rounded-xl overflow-hidden ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'} shadow-sm flex-shrink-0 ring-2 ${isDark ? 'ring-blue-500/20' : 'ring-blue-100'}`}>
            <NextImage
              src="/image/LOGO/logo.png"
              alt="Logo Bechapra"
              fill
              sizes="44px"
              className="object-contain p-1.5"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'} tracking-[0.15em] uppercase font-semibold`}>
              Bechapra
            </span>
            <h2 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'} leading-tight`}>
              <TranslateText text="Panel Admin" />
            </h2>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {sidebarItems.map((item) => {
          const isActive = selected === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`group flex items-center justify-between px-3.5 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? isDark
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : isDark
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`flex-shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                  {item.icon}
                </span>
                <span className="text-[13px] font-semibold truncate">
                  <TranslateText text={item.label} />
                </span>
              </div>
              {isActive && (
                <ChevronRight size={16} className="flex-shrink-0 ml-2 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer del sidebar */}
      <div className={`px-5 py-4 border-t ${isDark ? 'border-slate-800 bg-slate-800/30' : 'border-slate-200 bg-slate-50'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'} animate-pulse shadow-lg ${isDark ? 'shadow-emerald-400/50' : 'shadow-emerald-500/50'}`} />
          <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Sistema Activo
          </span>
        </div>
        <p className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-500'} font-medium`}>
          Bechapra CMS
        </p>
        <p className={`text-[10px] ${isDark ? 'text-slate-600' : 'text-slate-400'} mt-0.5`}>
          Versión 2.0.0
        </p>
      </div>
    </aside>
  );
}
