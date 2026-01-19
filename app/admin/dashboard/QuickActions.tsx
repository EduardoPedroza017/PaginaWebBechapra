"use client";

import { 
  Newspaper, 
  Image, 
  FileText, 
  Users, 
  Settings, 
  Sparkles, 
  Network, 
  MessageSquare,
  ArrowRight,
  BarChart3,
  ExternalLink,
  Shield
} from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import Link from "next/link";

interface QuickActionsProps {
  theme: 'light' | 'dark';
  role: string;
}

interface ActionItem {
  label: string;
  description: string;
  icon: any;
  href: string;
  color: string;
  iconBg: string;
  iconColor: string;
  requiresSuperAdmin?: boolean;
}

export default function QuickActions({ theme, role }: QuickActionsProps) {
  const isDark = theme === 'dark';

  const baseActions: ActionItem[] = [
    {
      label: "Noticias",
      description: "Gestionar publicaciones",
      icon: Newspaper,
      href: "/admin/news",
      color: isDark ? 'bg-blue-900/20 border-blue-800/50 hover:border-blue-700' : 'bg-blue-50 border-blue-200 hover:border-blue-300',
      iconBg: isDark ? 'bg-blue-600/20' : 'bg-blue-100',
      iconColor: isDark ? 'text-blue-400' : 'text-blue-600',
    },
    {
      label: "Galería",
      description: "Administrar imágenes",
      icon: Image,
      href: "/admin/galeria",
      color: isDark ? 'bg-pink-900/20 border-pink-800/50 hover:border-pink-700' : 'bg-pink-50 border-pink-200 hover:border-pink-300',
      iconBg: isDark ? 'bg-pink-600/20' : 'bg-pink-100',
      iconColor: isDark ? 'text-pink-400' : 'text-pink-600',
    },
    {
      label: "Comunicados",
      description: "Publicaciones oficiales",
      icon: FileText,
      href: "/admin/press",
      color: isDark ? 'bg-gray-900/20 border-gray-800/50 hover:border-gray-700' : 'bg-gray-50 border-gray-200 hover:border-gray-300',
      iconBg: isDark ? 'bg-gray-600/20' : 'bg-gray-100',
      iconColor: isDark ? 'text-gray-400' : 'text-gray-600',
    },
    {
      label: "Contactos",
      description: "Mensajes recibidos",
      icon: MessageSquare,
      href: "/admin/conctform",
      color: isDark ? 'bg-green-900/20 border-green-800/50 hover:border-green-700' : 'bg-green-50 border-green-200 hover:border-green-300',
      iconBg: isDark ? 'bg-green-600/20' : 'bg-green-100',
      iconColor: isDark ? 'text-green-400' : 'text-green-600',
    },
    {
      label: "Essence",
      description: "Misión y valores",
      icon: Sparkles,
      href: "/admin/essence",
      color: isDark ? 'bg-purple-900/20 border-purple-800/50 hover:border-purple-700' : 'bg-purple-50 border-purple-200 hover:border-purple-300',
      iconBg: isDark ? 'bg-purple-600/20' : 'bg-purple-100',
      iconColor: isDark ? 'text-purple-400' : 'text-purple-600',
    },
    {
      label: "Organigrama",
      description: "Estructura empresarial",
      icon: Network,
      href: "/admin/organigrama",
      color: isDark ? 'bg-amber-900/20 border-amber-800/50 hover:border-amber-700' : 'bg-amber-50 border-amber-200 hover:border-amber-300',
      iconBg: isDark ? 'bg-amber-600/20' : 'bg-amber-100',
      iconColor: isDark ? 'text-amber-400' : 'text-amber-600',
    },
  ];

  const superadminActions: ActionItem[] = [
    {
      label: "Usuarios",
      description: "Gestión de accesos",
      icon: Users,
      href: "/admin/usuarios",
      requiresSuperAdmin: true,
      color: isDark ? 'bg-slate-900/20 border-slate-800/50 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300',
      iconBg: isDark ? 'bg-slate-600/20' : 'bg-slate-100',
      iconColor: isDark ? 'text-slate-400' : 'text-slate-600',
    },
    {
      label: "Auditoría",
      description: "Logs del sistema",
      icon: BarChart3,
      href: "/admin/audit-log",
      requiresSuperAdmin: true,
      color: isDark ? 'bg-slate-900/20 border-slate-800/50 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300',
      iconBg: isDark ? 'bg-slate-600/20' : 'bg-slate-100',
      iconColor: isDark ? 'text-slate-400' : 'text-slate-600',
    },
    {
      label: "Configuración",
      description: "Ajustes del sistema",
      icon: Settings,
      href: "/admin/settings",
      requiresSuperAdmin: true,
      color: isDark ? 'bg-slate-900/20 border-slate-800/50 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300',
      iconBg: isDark ? 'bg-slate-600/20' : 'bg-slate-100',
      iconColor: isDark ? 'text-slate-400' : 'text-slate-600',
    },
  ];

  const allActions = role === 'superadmin' 
    ? [...baseActions, ...superadminActions]
    : baseActions;

  const getGridCols = () => {
    const count = allActions.length;
    if (count <= 4) return "grid-cols-2 md:grid-cols-2 lg:grid-cols-4";
    if (count <= 6) return "grid-cols-2 md:grid-cols-3 lg:grid-cols-6";
    if (count <= 8) return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
  };

  return (
    <div className={`grid gap-4 ${getGridCols()}`}>
      {allActions.map((action) => (
        <ActionCard key={action.label} action={action} theme={theme} />
      ))}
    </div>
  );
}

// Componente de tarjeta de acción reutilizable
function ActionCard({ 
  action, 
  theme
}: { 
  action: ActionItem; 
  theme: 'light' | 'dark';
}) {
  const isDark = theme === 'dark';

  return (
    <Link
      href={action.href}
      className={`group flex flex-col p-4 rounded-lg border transition-colors ${action.color}`}
    >
      {/* Icono */}
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${action.iconBg}`}>
          <action.icon className={`w-5 h-5 ${action.iconColor}`} />
        </div>
        
        {/* Indicador de superadmin */}
        {action.requiresSuperAdmin && (
          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
            isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
          }`}>
            Admin
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="flex-1">
        <h4 className={`font-semibold text-sm mb-1.5 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          <TranslateText text={action.label} />
        </h4>
        <p className={`text-xs leading-tight line-clamp-2 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          <TranslateText text={action.description} />
        </p>
      </div>

      {/* Indicador de acción */}
      <div className={`mt-3 pt-3 border-t ${
        isDark ? 'border-slate-800/50' : 'border-slate-100'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            <TranslateText text="Acceder" />
          </span>
          <ExternalLink className={`w-3.5 h-3.5 ${
            isDark ? 'text-slate-600 group-hover:text-slate-400' : 'text-slate-400 group-hover:text-slate-600'
          } transition-colors`} />
        </div>
      </div>
    </Link>
  );
}