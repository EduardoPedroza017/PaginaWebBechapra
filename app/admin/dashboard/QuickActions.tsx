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
  Zap,
  Shield
} from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import Link from "next/link";
import { useState, useEffect } from "react";

interface QuickActionsProps {
  theme: 'light' | 'dark';
  role: string;
}

interface ActionItem {
  label: string;
  description: string;
  icon: any;
  href: string;
  count?: number;
  color: string;
  iconBg: string;
  iconColor: string;
  borderColor: string;
  badgeColor: string;
  isNew?: boolean;
  requiresSuperAdmin?: boolean;
}

export default function QuickActions({ theme, role }: QuickActionsProps) {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<{ [key: string]: number }>({});
  
  // Cargar estadísticas reales desde las APIs
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Aquí puedes hacer fetch a tus endpoints reales
        // Por ahora usamos datos estáticos como tienes
        setStats({
          news: 3,
          gallery: 12,
          press: 2,
          contacts: 5,
          organigrama: 1,
          usuarios: 4,
          audit: 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const baseActions: ActionItem[] = [
    {
      label: "Noticias",
      description: "Gestionar publicaciones",
      icon: Newspaper,
      href: "/admin/news",
      count: stats.news,
      color: theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50',
      iconBg: theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100',
      iconColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      borderColor: theme === 'dark' ? 'border-blue-800/50 hover:border-blue-700' : 'border-blue-200 hover:border-blue-300',
      badgeColor: theme === 'dark' ? 'bg-blue-600/30 text-blue-400' : 'bg-blue-100 text-blue-700'
    },
    {
      label: "Galería",
      description: "Administrar imágenes",
      icon: Image,
      href: "/admin/galeria",
      count: stats.gallery,
      color: theme === 'dark' ? 'bg-pink-900/20' : 'bg-pink-50',
      iconBg: theme === 'dark' ? 'bg-pink-600/20' : 'bg-pink-100',
      iconColor: theme === 'dark' ? 'text-pink-400' : 'text-pink-600',
      borderColor: theme === 'dark' ? 'border-pink-800/50 hover:border-pink-700' : 'border-pink-200 hover:border-pink-300',
      badgeColor: theme === 'dark' ? 'bg-pink-600/30 text-pink-400' : 'bg-pink-100 text-pink-700'
    },
    {
      label: "Prensa",
      description: "Comunicados oficiales",
      icon: FileText,
      href: "/admin/press",
      count: stats.press,
      color: theme === 'dark' ? 'bg-emerald-900/20' : 'bg-emerald-50',
      iconBg: theme === 'dark' ? 'bg-emerald-600/20' : 'bg-emerald-100',
      iconColor: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
      borderColor: theme === 'dark' ? 'border-emerald-800/50 hover:border-emerald-700' : 'border-emerald-200 hover:border-emerald-300',
      badgeColor: theme === 'dark' ? 'bg-emerald-600/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
    },
    {
      label: "Contactos",
      description: "Mensajes recibidos",
      icon: MessageSquare,
      href: "/admin/conctform",
      count: stats.contacts,
      isNew: true,
      color: theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50',
      iconBg: theme === 'dark' ? 'bg-amber-600/20' : 'bg-amber-100',
      iconColor: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
      borderColor: theme === 'dark' ? 'border-amber-800/50 hover:border-amber-700' : 'border-amber-200 hover:border-amber-300',
      badgeColor: theme === 'dark' ? 'bg-amber-600/30 text-amber-400' : 'bg-amber-100 text-amber-700'
    },
    {
      label: "Esencia",
      description: "Misión y valores",
      icon: Sparkles,
      href: "/admin/essence",
      color: theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50',
      iconBg: theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-100',
      iconColor: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
      borderColor: theme === 'dark' ? 'border-purple-800/50 hover:border-purple-700' : 'border-purple-200 hover:border-purple-300',
      badgeColor: theme === 'dark' ? 'bg-purple-600/30 text-purple-400' : 'bg-purple-100 text-purple-700'
    },
    {
      label: "Organigrama",
      description: "Estructura empresarial",
      icon: Network,
      href: "/admin/organigrama",
      count: stats.organigrama,
      color: theme === 'dark' ? 'bg-cyan-900/20' : 'bg-cyan-50',
      iconBg: theme === 'dark' ? 'bg-cyan-600/20' : 'bg-cyan-100',
      iconColor: theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600',
      borderColor: theme === 'dark' ? 'border-cyan-800/50 hover:border-cyan-700' : 'border-cyan-200 hover:border-cyan-300',
      badgeColor: theme === 'dark' ? 'bg-cyan-600/30 text-cyan-400' : 'bg-cyan-100 text-cyan-700'
    },
  ];

  const superadminActions: ActionItem[] = [
    {
      label: "Usuarios",
      description: "Gestión de accesos",
      icon: Users,
      href: "/admin/usuarios",
      count: stats.usuarios,
      requiresSuperAdmin: true,
      color: theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50',
      iconBg: theme === 'dark' ? 'bg-red-600/20' : 'bg-red-100',
      iconColor: theme === 'dark' ? 'text-red-400' : 'text-red-600',
      borderColor: theme === 'dark' ? 'border-red-800/50 hover:border-red-700' : 'border-red-200 hover:border-red-300',
      badgeColor: theme === 'dark' ? 'bg-red-600/30 text-red-400' : 'bg-red-100 text-red-700'
    },
    {
      label: "Auditoría",
      description: "Logs del sistema",
      icon: BarChart3,
      href: "/admin/audit-log",
      count: stats.audit,
      requiresSuperAdmin: true,
      color: theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-50',
      iconBg: theme === 'dark' ? 'bg-indigo-600/20' : 'bg-indigo-100',
      iconColor: theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600',
      borderColor: theme === 'dark' ? 'border-indigo-800/50 hover:border-indigo-700' : 'border-indigo-200 hover:border-indigo-300',
      badgeColor: theme === 'dark' ? 'bg-indigo-600/30 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
    },
    {
      label: "Configuración",
      description: "Ajustes del sistema",
      icon: Settings,
      href: "/admin/config",
      requiresSuperAdmin: true,
      color: theme === 'dark' ? 'bg-gray-800/40' : 'bg-gray-50',
      iconBg: theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-200',
      iconColor: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
      borderColor: theme === 'dark' ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300',
      badgeColor: theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
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
    <div className="space-y-4">
      {/* Header */}
      <div className={`flex items-center justify-between p-4 rounded-xl ${
        theme === 'dark' ? 'bg-gray-800/30 border border-gray-700' : 'bg-gray-50 border border-gray-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-emerald-900/20' : 'bg-emerald-100'
          }`}>
            <Zap className={`w-5 h-5 ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
          </div>
          <div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Accesos Rápidos" />
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {role === 'superadmin' 
                ? <TranslateText text="Acceso completo al sistema" />
                : <TranslateText text="Navegación principal del sistema" />
              }
            </p>
          </div>
        </div>
        
        {role === 'superadmin' && (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}>
            <Shield className="w-4 h-4" />
            <span className="font-medium">
              <TranslateText text="Super Admin" />
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`rounded-xl border overflow-hidden ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="p-4">
          {/* Sección principal */}
          <div className="mb-4">
            <h4 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Contenido" />
            </h4>
            <div className={`grid gap-3 ${getGridCols()}`}>
              {baseActions.map((action, idx) => (
                <ActionCard 
                  key={idx}
                  action={action}
                  theme={theme}
                  loading={loading}
                />
              ))}
            </div>
          </div>

          {/* Sección de administración (solo para superadmin) */}
          {role === 'superadmin' && (
            <div>
              <div className={`h-px w-full mb-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`} />
              <h4 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Administración" />
              </h4>
              <div className={`grid gap-3 ${getGridCols()}`}>
                {superadminActions.map((action, idx) => (
                  <ActionCard 
                    key={idx}
                    action={action}
                    theme={theme}
                    loading={loading}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-4 py-3 border-t ${
          theme === 'dark' ? 'bg-gray-800/30 border-gray-800' : 'bg-gray-50 border-gray-100'
        }`}>
          <div className="flex items-center justify-between">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Accesos directos a las secciones principales" />
            </p>
            <ArrowRight className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
          </div>
        </div>
      </div>

      {/* Nota de uso */}
      {loading && (
        <div className={`p-3 rounded-lg text-sm text-center ${
          theme === 'dark' ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-600'
        }`}>
          <TranslateText text="Cargando estadísticas..." />
        </div>
      )}
    </div>
  );
}

// Componente de tarjeta de acción reutilizable
function ActionCard({ 
  action, 
  theme, 
  loading 
}: { 
  action: ActionItem; 
  theme: 'light' | 'dark';
  loading: boolean;
}) {
  return (
    <Link
      href={action.href}
      className={`group relative flex flex-col p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
        action.color
      } ${action.borderColor} ${action.requiresSuperAdmin ? 'ring-1 ring-inset ring-yellow-500/20' : ''}`}
    >
      {/* Indicador de nuevo */}
      {action.isNew && (
        <span className={`absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-xs font-medium z-10 ${
          theme === 'dark' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'
        }`}>
          Nuevo
        </span>
      )}

      {/* Icono */}
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${action.iconBg}`}>
          <action.icon className={`w-5 h-5 ${action.iconColor}`} />
        </div>
        
        {/* Badge de contador o superadmin */}
        {action.count !== undefined && action.count > 0 ? (
          <span className={`px-2 py-0.5 rounded-md text-xs font-medium min-w-[24px] text-center ${
            action.badgeColor
          }`}>
            {loading ? '...' : action.count}
          </span>
        ) : action.requiresSuperAdmin ? (
          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
            theme === 'dark' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
          }`}>
            Admin
          </span>
        ) : null}
      </div>

      {/* Contenido */}
      <div className="flex-1">
        <h4 className={`font-semibold text-sm mb-1.5 group-hover:underline ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <TranslateText text={action.label} />
        </h4>
        <p className={`text-xs leading-tight line-clamp-2 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <TranslateText text={action.description} />
        </p>
      </div>

      {/* Indicador de acción */}
      <div className={`mt-3 pt-3 border-t ${
        theme === 'dark' ? 'border-gray-800/50' : 'border-gray-100'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            <TranslateText text="Acceder" />
          </span>
          <ExternalLink className={`w-3.5 h-3.5 ${
            theme === 'dark' ? 'text-gray-600 group-hover:text-gray-400' : 'text-gray-400 group-hover:text-gray-600'
          } transition-colors`} />
        </div>
      </div>
    </Link>
  );
}