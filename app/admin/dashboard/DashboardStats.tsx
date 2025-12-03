"use client";

import { Activity, Shield, Clock, Server, Database, Users, Newspaper, Image, FileText } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { useEffect, useState } from "react";

interface DashboardStatsProps {
  role: string;
  theme: 'light' | 'dark';
}

interface Stats {
  news: number;
  gallery: number;
  press: number;
  users: number;
}

export default function DashboardStats({ role, theme }: DashboardStatsProps) {
  const [stats, setStats] = useState<Stats>({ news: 0, gallery: 0, press: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [newsRes, galleryRes, pressRes] = await Promise.all([
          fetch('http://localhost:5000/api/news', { credentials: 'include' }),
          fetch('http://localhost:5000/api/gallery', { credentials: 'include' }),
          fetch('http://localhost:5000/api/press', { credentials: 'include' }),
        ]);

        const [news, gallery, press] = await Promise.all([
          newsRes.json(),
          galleryRes.json(),
          pressRes.json(),
        ]);

        setStats({
          news: Array.isArray(news) ? news.length : 0,
          gallery: Array.isArray(gallery) ? gallery.length : 0,
          press: Array.isArray(press) ? press.length : 0,
          users: 0,
        });
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickStats = [
    {
      label: "Estado del Sistema",
      value: "Operativo",
      icon: Server,
      color: 'green',
      bgColor: theme === 'dark' ? 'bg-green-600/20' : 'bg-green-100',
      textColor: theme === 'dark' ? 'text-green-400' : 'text-green-600',
      iconColor: theme === 'dark' ? 'text-green-400' : 'text-green-600',
      pulse: true,
    },
    {
      label: "Tu Rol",
      value: role === 'superadmin' ? 'Super Admin' : 'Administrador',
      icon: Shield,
      color: 'purple',
      bgColor: theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-100',
      textColor: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
      iconColor: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
    },
    {
      label: "Última Sesión",
      value: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      icon: Clock,
      color: 'amber',
      bgColor: theme === 'dark' ? 'bg-amber-600/20' : 'bg-amber-100',
      textColor: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
      iconColor: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
    },
  ];

  const contentStats = [
    {
      label: "Noticias",
      value: loading ? '...' : stats.news,
      icon: Newspaper,
      bgColor: theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100',
      textColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      iconColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    },
    {
      label: "Imágenes",
      value: loading ? '...' : stats.gallery,
      icon: Image,
      bgColor: theme === 'dark' ? 'bg-pink-600/20' : 'bg-pink-100',
      textColor: theme === 'dark' ? 'text-pink-400' : 'text-pink-600',
      iconColor: theme === 'dark' ? 'text-pink-400' : 'text-pink-600',
    },
    {
      label: "Comunicados",
      value: loading ? '...' : stats.press,
      icon: FileText,
      bgColor: theme === 'dark' ? 'bg-emerald-600/20' : 'bg-emerald-100',
      textColor: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
      iconColor: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickStats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-5 border transition-all hover:scale-[1.02] ${
              theme === 'dark' 
                ? 'bg-gray-900/80 border-gray-800' 
                : 'bg-white border-gray-100 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <TranslateText text={stat.label} />
                </p>
                <p className={`text-xl font-bold ${stat.textColor}`}>
                  <TranslateText text={String(stat.value)} />
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
                {stat.pulse ? (
                  <div className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-green-400' : 'bg-green-500'} animate-pulse shadow-lg shadow-green-500/50`} />
                ) : (
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Stats */}
      <div className={`rounded-2xl border p-5 ${
        theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
      }`}>
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
          }`}>
            <Database className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Contenido del Sitio" />
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Resumen de contenido publicado" />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {contentStats.map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-4 text-center transition-all hover:scale-[1.02] ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <p className={`text-2xl font-bold mb-1 ${stat.textColor}`}>
                {stat.value}
              </p>
              <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <TranslateText text={stat.label} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
