"use client";

import { TranslateText } from "@/components/TranslateText";
import { Users, Shield, UserX, UserCheck, Crown, Eye } from "lucide-react";

interface Usuario {
  email: string;
  role: string | string[];
  roles?: string[];
  bloqueado?: boolean;
}

interface UserStatsProps {
  users: Usuario[];
  theme?: 'light' | 'dark';
}

export default function UserStats({ users, theme = 'light' }: UserStatsProps) {
  const isDark = theme === 'dark';
  
  // Calcular estadísticas reales
  const total = users.length;
  const blocked = users.filter(u => u.bloqueado).length;
  const active = total - blocked;
  
  // Contar roles reales
  const superadmins = users.filter(u => {
    const roles = Array.isArray(u.role) ? u.role : (u.roles || [u.role]);
    return roles.includes('superadmin');
  }).length;
  
  const admins = users.filter(u => {
    const roles = Array.isArray(u.role) ? u.role : (u.roles || [u.role]);
    return roles.includes('admin') && !roles.includes('superadmin');
  }).length;
  
  const editorsViewers = users.filter(u => {
    const roles = Array.isArray(u.role) ? u.role : (u.roles || [u.role]);
    return roles.includes('editor') || roles.includes('viewer') || roles.includes('moderator');
  }).length;

  const stats = [
    {
      icon: Users,
      label: "Total",
      value: total,
      color: isDark ? 'text-blue-400' : 'text-blue-600',
      bg: isDark ? 'bg-blue-900/20' : 'bg-blue-50',
    },
    {
      icon: UserCheck,
      label: "Activos",
      value: active,
      color: isDark ? 'text-green-400' : 'text-green-600',
      bg: isDark ? 'bg-green-900/20' : 'bg-green-50',
    },
    {
      icon: UserX,
      label: "Bloqueados",
      value: blocked,
      color: isDark ? 'text-red-400' : 'text-red-600',
      bg: isDark ? 'bg-red-900/20' : 'bg-red-50',
    },
    {
      icon: Crown,
      label: "Super Admins",
      value: superadmins,
      color: isDark ? 'text-purple-400' : 'text-purple-600',
      bg: isDark ? 'bg-purple-900/20' : 'bg-purple-50',
    },
    {
      icon: Shield,
      label: "Admins",
      value: admins,
      color: isDark ? 'text-amber-400' : 'text-amber-600',
      bg: isDark ? 'bg-amber-900/20' : 'bg-amber-50',
    },
    {
      icon: Eye,
      label: "Editores/Lectores",
      value: editorsViewers,
      color: isDark ? 'text-slate-400' : 'text-slate-600',
      bg: isDark ? 'bg-slate-800/30' : 'bg-slate-100',
    }
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-lg border p-4 ${stat.bg} ${
              isDark ? 'border-slate-700' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isDark ? 'bg-slate-800/50' : 'bg-white'
              }`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <TranslateText text={stat.label} />
                </p>
                <p className={`text-xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}