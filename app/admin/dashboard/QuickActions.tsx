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
  BarChart3
} from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import Link from "next/link";

interface QuickActionsProps {
  theme: 'light' | 'dark';
  role: string;
}

export default function QuickActions({ theme, role }: QuickActionsProps) {
  const actions = [
    {
      label: "Noticias",
      description: "Gestionar publicaciones",
      icon: Newspaper,
      href: "/admin/news",
      count: 3,
      color: theme === 'dark' ? 'from-blue-600/20 to-blue-600/5' : 'from-blue-50 to-blue-100',
      iconBg: theme === 'dark' ? 'bg-blue-600/30' : 'bg-blue-100',
      iconColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      borderColor: theme === 'dark' ? 'border-blue-600/30 hover:border-blue-500/50' : 'border-blue-200 hover:border-blue-300',
    },
    {
      label: "Galería",
      description: "Administrar imágenes",
      icon: Image,
      href: "/admin/galeria",
      count: 12,
      color: theme === 'dark' ? 'from-pink-600/20 to-pink-600/5' : 'from-pink-50 to-pink-100',
      iconBg: theme === 'dark' ? 'bg-pink-600/30' : 'bg-pink-100',
      iconColor: theme === 'dark' ? 'text-pink-400' : 'text-pink-600',
      borderColor: theme === 'dark' ? 'border-pink-600/30 hover:border-pink-500/50' : 'border-pink-200 hover:border-pink-300',
    },
    {
      label: "Prensa",
      description: "Comunicados oficiales",
      icon: FileText,
      href: "/admin/press",
      count: 2,
      color: theme === 'dark' ? 'from-emerald-600/20 to-emerald-600/5' : 'from-emerald-50 to-emerald-100',
      iconBg: theme === 'dark' ? 'bg-emerald-600/30' : 'bg-emerald-100',
      iconColor: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
      borderColor: theme === 'dark' ? 'border-emerald-600/30 hover:border-emerald-500/50' : 'border-emerald-200 hover:border-emerald-300',
    },
    {
      label: "Contactos",
      description: "Mensajes recibidos",
      icon: MessageSquare,
      href: "/admin/conctform",
      count: 5,
      color: theme === 'dark' ? 'from-amber-600/20 to-amber-600/5' : 'from-amber-50 to-amber-100',
      iconBg: theme === 'dark' ? 'bg-amber-600/30' : 'bg-amber-100',
      iconColor: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
      borderColor: theme === 'dark' ? 'border-amber-600/30 hover:border-amber-500/50' : 'border-amber-200 hover:border-amber-300',
    },
    {
      label: "Esencia",
      description: "Misión y valores",
      icon: Sparkles,
      href: "/admin/essence",
      color: theme === 'dark' ? 'from-purple-600/20 to-purple-600/5' : 'from-purple-50 to-purple-100',
      iconBg: theme === 'dark' ? 'bg-purple-600/30' : 'bg-purple-100',
      iconColor: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
      borderColor: theme === 'dark' ? 'border-purple-600/30 hover:border-purple-500/50' : 'border-purple-200 hover:border-purple-300',
    },
    {
      label: "Organigrama",
      description: "Estructura empresarial",
      icon: Network,
      href: "/admin/organigrama",
      count: 1,
      color: theme === 'dark' ? 'from-cyan-600/20 to-cyan-600/5' : 'from-cyan-50 to-cyan-100',
      iconBg: theme === 'dark' ? 'bg-cyan-600/30' : 'bg-cyan-100',
      iconColor: theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600',
      borderColor: theme === 'dark' ? 'border-cyan-600/30 hover:border-cyan-500/50' : 'border-cyan-200 hover:border-cyan-300',
    },
  ];

  // Acciones exclusivas de superadmin
  const superadminActions = [
    {
      label: "Usuarios",
      description: "Gestión de accesos",
      icon: Users,
      href: "/admin/usuarios",
      count: 4,
      color: theme === 'dark' ? 'from-red-600/20 to-red-600/5' : 'from-red-50 to-red-100',
      iconBg: theme === 'dark' ? 'bg-red-600/30' : 'bg-red-100',
      iconColor: theme === 'dark' ? 'text-red-400' : 'text-red-600',
      borderColor: theme === 'dark' ? 'border-red-600/30 hover:border-red-500/50' : 'border-red-200 hover:border-red-300',
    },
    {
      label: "Auditoría",
      description: "Logs del sistema",
      icon: BarChart3,
      href: "/admin/audit-log",
      count: 0,
      color: theme === 'dark' ? 'from-indigo-600/20 to-indigo-600/5' : 'from-indigo-50 to-indigo-100',
      iconBg: theme === 'dark' ? 'bg-indigo-600/30' : 'bg-indigo-100',
      iconColor: theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600',
      borderColor: theme === 'dark' ? 'border-indigo-600/30 hover:border-indigo-500/50' : 'border-indigo-200 hover:border-indigo-300',
    },
    {
      label: "Configuración",
      description: "Base de datos",
      icon: Settings,
      href: "/admin/config",
      count: undefined,
      color: theme === 'dark' ? 'from-gray-600/20 to-gray-600/5' : 'from-gray-50 to-gray-100',
      iconBg: theme === 'dark' ? 'bg-gray-600/30' : 'bg-gray-200',
      iconColor: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
      borderColor: theme === 'dark' ? 'border-gray-600/30 hover:border-gray-500/50' : 'border-gray-200 hover:border-gray-300',
    },
  ];

  const allActions = role === 'superadmin' ? [...actions, ...superadminActions] : actions;

  return (
    <div className={`rounded-2xl border p-5 ${
      theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          theme === 'dark' ? 'bg-emerald-600/20' : 'bg-emerald-100'
        }`}>
          <ArrowRight className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
        </div>
        <div>
          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <TranslateText text="Accesos Rápidos" />
          </h3>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <TranslateText text="Navega a las secciones principales" />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {allActions.map((action, idx) => (
          <Link
            key={idx}
            href={action.href}
            className={`group rounded-xl p-4 border bg-gradient-to-br transition-all hover:scale-[1.02] active:scale-[0.98] ${action.color} ${action.borderColor}`}
          >
            <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${action.iconBg}`}>
              <action.icon className={`w-5 h-5 ${action.iconColor}`} />
            </div>
            <h4 className={`font-semibold text-sm mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text={action.label} />
            </h4>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text={action.description} />
            </p>
            {typeof action.count === 'number' && (
              <span className={`mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold ${
                theme === 'dark' ? 'bg-white/5 text-white border border-white/10' : 'bg-white text-gray-800 border border-gray-100 shadow-sm'
              }`}>
                {action.count}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
