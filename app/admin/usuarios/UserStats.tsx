"use client";

import { TranslateText } from "@/components/TranslateText";
import { Users, Shield, UserX, UserCheck, Crown, Eye } from "lucide-react";

interface Usuario {
  email: string;
  role: string | string[];
  roles?: string[];
  permissions?: string[];
  bloqueado?: boolean;
}

interface UserStatsProps {
  users: Usuario[];
  theme?: 'light' | 'dark';
}

export default function UserStats({ users, theme = 'light' }: UserStatsProps) {
  const total = users.length;
  const blocked = users.filter(u => u.bloqueado).length;
  const active = total - blocked;
  
  // Contar roles
  const superadmins = users.filter(u => {
    const roles = Array.isArray(u.role) ? u.role : (u.roles || [u.role]);
    return roles.includes('superadmin');
  }).length;
  
  const admins = users.filter(u => {
    const roles = Array.isArray(u.role) ? u.role : (u.roles || [u.role]);
    return roles.includes('admin') && !roles.includes('superadmin');
  }).length;
  
  const viewers = users.filter(u => {
    const roles = Array.isArray(u.role) ? u.role : (u.roles || [u.role]);
    return roles.includes('viewer') || roles.includes('editor');
  }).length;

  const stats = [
    {
      icon: Users,
      label: "Total Usuarios",
      value: total,
      bgLight: "bg-blue-100",
      bgDark: "bg-blue-600/20",
      textLight: "text-blue-600",
      textDark: "text-blue-400"
    },
    {
      icon: UserCheck,
      label: "Activos",
      value: active,
      bgLight: "bg-green-100",
      bgDark: "bg-green-600/20",
      textLight: "text-green-600",
      textDark: "text-green-400"
    },
    {
      icon: UserX,
      label: "Bloqueados",
      value: blocked,
      bgLight: "bg-red-100",
      bgDark: "bg-red-600/20",
      textLight: "text-red-600",
      textDark: "text-red-400"
    },
    {
      icon: Crown,
      label: "Super Admins",
      value: superadmins,
      bgLight: "bg-purple-100",
      bgDark: "bg-purple-600/20",
      textLight: "text-purple-600",
      textDark: "text-purple-400"
    },
    {
      icon: Shield,
      label: "Admins",
      value: admins,
      bgLight: "bg-amber-100",
      bgDark: "bg-amber-600/20",
      textLight: "text-amber-600",
      textDark: "text-amber-400"
    },
    {
      icon: Eye,
      label: "Editores/Viewers",
      value: viewers,
      bgLight: "bg-cyan-100",
      bgDark: "bg-cyan-600/20",
      textLight: "text-cyan-600",
      textDark: "text-cyan-400"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-2xl border p-4 transition-all hover:scale-[1.02] ${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              theme === 'dark' ? stat.bgDark : stat.bgLight
            }`}>
              <stat.icon className={`w-5 h-5 ${
                theme === 'dark' ? stat.textDark : stat.textLight
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium truncate ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <TranslateText text={stat.label} />
              </p>
              <p className={`text-xl font-bold ${
                theme === 'dark' ? stat.textDark : stat.textLight
              }`}>
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
