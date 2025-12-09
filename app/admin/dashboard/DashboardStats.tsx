"use client";

import { Shield, Clock, Server, Newspaper, Image as ImageIcon, FileText } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { useEffect, useState } from "react";
import { StatCard } from "../components/shared";

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

  return (
    <div className="space-y-8">
      {/* System Stats */}
      <div>
        <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          <TranslateText text="Estado del Sistema" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            title="Estado del Sistema"
            value="Operativo"
            icon={<Server size={24} />}
            color="green"
            theme={theme}
            subtitle="Todos los servicios activos"
          />
          <StatCard
            title="Tu Rol"
            value={role === 'superadmin' ? 'Super Admin' : 'Admin'}
            icon={<Shield size={24} />}
            color="purple"
            theme={theme}
            subtitle="Permisos completos"
          />
          <StatCard
            title="Última Sesión"
            value={new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
            icon={<Clock size={24} />}
            color="blue"
            theme={theme}
            subtitle={new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
          />
        </div>
      </div>

      {/* Content Stats */}
      <div>
        <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          <TranslateText text="Estadísticas de Contenido" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            title="Noticias Publicadas"
            value={loading ? '...' : stats.news}
            icon={<Newspaper size={24} />}
            color="blue"
            theme={theme}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Imágenes en Galería"
            value={loading ? '...' : stats.gallery}
            icon={<ImageIcon size={24} />}
            color="purple"
            theme={theme}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Comunicados de Prensa"
            value={loading ? '...' : stats.press}
            icon={<FileText size={24} />}
            color="green"
            theme={theme}
            trend={{ value: 5, isPositive: false }}
          />
        </div>
      </div>
    </div>
  );
} 