"use client";

import React from "react";
import Link from "next/link";
import { TranslateText } from '@/components/TranslateText';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Database,
  Image,
  MessageCircle,
  Newspaper,
  Megaphone,
  Map,
  ShieldCheck,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { Palette } from "../../../src/theme/palettes";

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
  { label: "Galerías", path: "/admin/galeria", icon: <Image size={20} /> },
  { label: "Formularios de Contacto", path: "/admin/contact", icon: <MessageCircle size={20} /> },
  { label: "Gestión de Noticias", path: "/admin/news", icon: <Newspaper size={20} /> },
  { label: "Gestión de Comunicados", path: "/admin/press", icon: <Megaphone size={20} /> },
  { label: "Gestión de Essence", path: "/admin/essence", icon: <Map size={20} /> },
  { label: "Gestión de Directivos", path: "/admin/organigrama", icon: <UserCheck size={20} /> },
];

interface SidebarProps {
  selected: string;
  theme?: 'light' | 'dark';
  palette?: Palette;
}

export function Sidebar({ selected, theme, palette }: SidebarProps) {
  const isDark = theme === 'dark';
  const baseGradient = palette?.background || (isDark
    ? 'bg-gradient-to-b from-gray-950 via-gray-900 to-blue-900'
    : 'bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900');
  const borderColor = palette?.border || (isDark ? 'border-gray-900/60' : 'border-blue-900/60');
  const headerAccent = palette?.primary || 'bg-blue-600';
  const footerText = palette?.secondary || 'text-white/70';

  return (
    <aside className={`${baseGradient} w-64 min-h-screen flex flex-col shadow-2xl border-r ${borderColor}`}>
      <div className={`px-6 py-6 border-b ${borderColor} bg-white/5 backdrop-blur-sm`}>
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${headerAccent} shadow-inner`}>
            <ShieldCheck size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white leading-tight"><TranslateText text="Panel Admin" /></h2>
            <p className={`text-xs uppercase tracking-[0.3em] ${footerText}`}><TranslateText text="Gestión" /></p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = selected === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`group flex items-center justify-between px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-white text-blue-900 shadow-lg shadow-blue-500/30'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg ${isActive ? 'text-blue-900' : 'text-white/70'}`}>
                  {item.icon}
                </span>
                <span className="text-sm"><TranslateText text={item.label} /></span>
              </div>
              {isActive && <ChevronRight size={18} className="text-blue-900" />}
            </Link>
          );
        })}
      </nav>

      <div className={`px-6 py-4 border-t ${borderColor} ${footerText}`}>
        <p className="text-xs text-white/70">Bechapra CMS</p>
        <p className="text-[10px] text-white/40">v1.0.0 • Activo</p>
      </div>
    </aside>
  );
}
