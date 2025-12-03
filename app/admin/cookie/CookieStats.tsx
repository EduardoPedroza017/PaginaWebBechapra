"use client";

import { TranslateText } from "@/components/TranslateText";
import { Cookie, CheckCircle, XCircle, TrendingUp, Users, Clock, Percent } from "lucide-react";

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

interface CookieStatsProps {
  data: CookieConsent[];
  theme?: 'light' | 'dark';
}

export default function CookieStats({ data, theme = 'light' }: CookieStatsProps) {
  const accepted = data.filter(d => d.accepted).length;
  const rejected = data.filter(d => !d.accepted).length;
  const total = data.length;
  const acceptanceRate = total > 0 ? ((accepted / total) * 100).toFixed(1) : '0';

  // Obtener últimos 7 días únicos
  const uniqueDays = new Set(data.map(d => new Date(d.timestamp).toDateString())).size;

  // Consentimientos de hoy
  const today = new Date().toDateString();
  const todayCount = data.filter(d => new Date(d.timestamp).toDateString() === today).length;

  const stats = [
    {
      icon: Users,
      label: "Total Registros",
      value: total,
      color: "blue",
      bgLight: "bg-blue-100",
      bgDark: "bg-blue-600/20",
      textLight: "text-blue-600",
      textDark: "text-blue-400"
    },
    {
      icon: CheckCircle,
      label: "Aceptados",
      value: accepted,
      color: "green",
      bgLight: "bg-green-100",
      bgDark: "bg-green-600/20",
      textLight: "text-green-600",
      textDark: "text-green-400"
    },
    {
      icon: XCircle,
      label: "Rechazados",
      value: rejected,
      color: "red",
      bgLight: "bg-red-100",
      bgDark: "bg-red-600/20",
      textLight: "text-red-600",
      textDark: "text-red-400"
    },
    {
      icon: Percent,
      label: "Tasa de Aceptación",
      value: `${acceptanceRate}%`,
      color: "purple",
      bgLight: "bg-purple-100",
      bgDark: "bg-purple-600/20",
      textLight: "text-purple-600",
      textDark: "text-purple-400"
    },
    {
      icon: Clock,
      label: "Hoy",
      value: todayCount,
      color: "orange",
      bgLight: "bg-orange-100",
      bgDark: "bg-orange-600/20",
      textLight: "text-orange-600",
      textDark: "text-orange-400"
    },
    {
      icon: TrendingUp,
      label: "Días Activos",
      value: uniqueDays,
      color: "cyan",
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
