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
  ShieldCheck,
  ChevronRight,
  UserCheck,
  MapPin,
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
  palette?: Palette;
}

export function Sidebar({ selected, theme, palette }: SidebarProps) {
  const isDark = theme === 'dark';
  // Unificar azul con Header y mejorar contraste
  const baseGradient = palette?.background || (isDark
    ? 'bg-gradient-to-b from-[#0b1b3f] via-[#1b3f9c] to-[#0b1b3f]'
    : 'bg-gradient-to-b from-[#1f82ff] via-[#3b8dff] to-[#1f82ff]');
  const borderColor = palette?.border || (isDark ? 'border-[#1b3f9c]/60' : 'border-[#1f82ff]/60');
  const headerAccent = palette?.primary || 'bg-gradient-to-br from-[#3b8dff] to-[#1f82ff]';
  const footerText = palette?.secondary || 'text-white/70';

  return (
    <aside
      className={`${baseGradient} w-60 md:w-64 min-h-screen flex flex-col shadow-2xl border-r ${borderColor} fixed md:static left-0 top-0 z-40 transition-all duration-300`}
      style={{ maxWidth: '100vw' }}
    >
      <div className={`px-5 py-5 border-b ${borderColor} bg-white/5 backdrop-blur-sm`}>
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white/10 shadow-sm flex-shrink-0">
            <NextImage
              src="/image/LOGO/logo.png"
              alt="Logo Bechapra"
              fill
              sizes="44px"
              className="object-contain p-1.5"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-white/50 tracking-[0.15em] uppercase font-medium">
              Bechapra
            </span>
            <h2 className="font-semibold text-base text-white leading-tight"><TranslateText text="Panel Admin" /></h2>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {sidebarItems.map((item) => {
          const isActive = selected === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white text-[#1b3f9c] shadow-md'
                  : 'text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`flex-shrink-0 ${isActive ? 'text-[#1b3f9c]' : 'text-white/60 group-hover:text-white/80'}`}>
                  {item.icon}
                </span>
                <span className="text-[13px] truncate"><TranslateText text={item.label} /></span>
              </div>
              {isActive && <ChevronRight size={16} className="text-[#1b3f9c] flex-shrink-0 ml-2" />}
            </Link>
          );
        })}
      </nav>

      <div className={`px-5 py-3.5 border-t ${borderColor} bg-white/5`}>
        <p className="text-[11px] text-white/60 font-medium text-center">Bechapra CMS</p>
        <p className="text-[10px] text-white/40 text-center mt-0.5">v1.0.0</p>
      </div>
    </aside>
  );
}
