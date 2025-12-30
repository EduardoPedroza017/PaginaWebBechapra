"use client";

import { 
  Shield, 
  Clock, 
  Server, 
  Newspaper, 
  Image as ImageIcon, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Users,
  BarChart3,
  Activity,
  RefreshCw,
  Globe,
  Database,
  CheckCircle,
  AlertCircle,
  Calendar,
  Eye,
  Download,
  ChevronRight,
  Zap
} from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { useEffect, useState, useMemo } from "react";
import { StatCard } from "../components/shared";

interface DashboardStatsProps {
  role: string;
  theme: 'light' | 'dark';
  compact?: boolean;
}

interface Stats {
  news: number;
  gallery: number;
  press: number;
  users: number;
  newsDelta?: number;
  galleryDelta?: number;
  pressDelta?: number;
  usersDelta?: number;
  systemStatus?: 'operational' | 'degraded' | 'maintenance';
  uptime?: number; // percentage
  lastUpdated?: string;
  peakHours?: { hour: number; requests: number }[];
}

interface SystemStatus {
  status: 'operational' | 'degraded' | 'maintenance';
  message: string;
  updatedAt: string;
  services: {
    name: string;
    status: 'up' | 'down' | 'slow';
    responseTime: number;
  }[];
}

export default function DashboardStats({ role, theme, compact = false }: DashboardStatsProps) {
  const [stats, setStats] = useState<Stats>({ 
    news: 0, 
    gallery: 0, 
    press: 0, 
    users: 0,
    uptime: 99.8,
    systemStatus: 'operational'
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('week');
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    status: 'operational',
    message: 'Todos los sistemas operan normalmente',
    updatedAt: new Date().toISOString(),
    services: [
      { name: 'API Backend', status: 'up', responseTime: 120 },
      { name: 'Base de Datos', status: 'up', responseTime: 45 },
      { name: 'Servidor de Archivos', status: 'up', responseTime: 80 },
      { name: 'Cache Redis', status: 'up', responseTime: 12 },
      { name: 'Servicio de Email', status: 'up', responseTime: 200 },
    ]
  });

  const fetchStats = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      // Simular diferentes estadísticas basadas en el rango de tiempo
      const baseStats = {
        today: { news: 5, gallery: 12, press: 3, users: 42 },
        week: { news: 28, gallery: 85, press: 15, users: 243 },
        month: { news: 124, gallery: 420, press: 68, users: 1250 },
      };

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

      const base = baseStats[timeRange];
      
      // Calcular tendencias
      const calculateTrend = (current: number, previous: number) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return Math.round(((current - previous) / previous) * 100);
      };

      setStats({
        news: Array.isArray(news) ? news.length : base.news,
        gallery: Array.isArray(gallery) ? gallery.length : base.gallery,
        press: Array.isArray(press) ? press.length : base.press,
        users: base.users,
        newsDelta: calculateTrend(Array.isArray(news) ? news.length : base.news, base.news - 3),
        galleryDelta: calculateTrend(Array.isArray(gallery) ? gallery.length : base.gallery, base.gallery - 8),
        pressDelta: calculateTrend(Array.isArray(press) ? press.length : base.press, base.press - 2),
        usersDelta: 12,
        uptime: 99.8,
        systemStatus: 'operational',
        lastUpdated: new Date().toISOString(),
        peakHours: [
          { hour: 8, requests: 45 },
          { hour: 9, requests: 120 },
          { hour: 10, requests: 185 },
          { hour: 11, requests: 150 },
          { hour: 12, requests: 95 },
          { hour: 13, requests: 65 },
          { hour: 14, requests: 110 },
          { hour: 15, requests: 165 },
          { hour: 16, requests: 140 },
          { hour: 17, requests: 100 },
        ]
      });

      // Actualizar estado del sistema
      setSystemStatus(prev => ({
        ...prev,
        updatedAt: new Date().toISOString(),
        services: prev.services.map(service => ({
          ...service,
          responseTime: Math.floor(Math.random() * 50) + 20,
        }))
      }));

    } catch {
      // Fallback con datos estáticos
      setStats({
        news: 28,
        gallery: 85,
        press: 15,
        users: 243,
        newsDelta: 12,
        galleryDelta: 8,
        pressDelta: -5,
        usersDelta: 12,
        uptime: 99.8,
        systemStatus: 'operational',
        lastUpdated: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const getStatusColor = (status: 'operational' | 'degraded' | 'maintenance') => {
    switch (status) {
      case 'operational': return 'green';
      case 'degraded': return 'yellow';
      case 'maintenance': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: 'operational' | 'degraded' | 'maintenance') => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-4 h-4" />;
      case 'degraded': return <AlertCircle className="w-4 h-4" />;
      case 'maintenance': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'superadmin': return 'Super Administrador';
      case 'admin': return 'Administrador';
      case 'editor': return 'Editor';
      case 'viewer': return 'Solo Lectura';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin': return 'purple';
      case 'admin': return 'blue';
      case 'editor': return 'green';
      case 'viewer': return 'gray';
      default: return 'gray';
    }
  };

  const formatTimeSince = (dateString?: string) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `Hace ${diffMins} min`;
    } else if (diffMins < 1440) {
      return `Hace ${Math.floor(diffMins / 60)} h`;
    } else {
      return `Hace ${Math.floor(diffMins / 1440)} d`;
    }
  };

  const getPeakHour = useMemo(() => {
    if (!stats.peakHours) return null;
    return stats.peakHours.reduce((prev, current) => 
      prev.requests > current.requests ? prev : current
    );
  }, [stats.peakHours]);

  const totalContent = stats.news + stats.gallery + stats.press;
  const avgPerDay = timeRange === 'today' ? totalContent : 
                   timeRange === 'week' ? Math.round(totalContent / 7) : 
                   Math.round(totalContent / 30);

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            <TranslateText text="Resumen" />
          </h3>
          <button
            onClick={() => fetchStats(true)}
            disabled={refreshing}
            className={`p-1.5 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            } ${refreshing ? 'opacity-50' : ''}`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${
                theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'
              }`}>
                <Newspaper className={`w-3.5 h-3.5 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <span className={`text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Noticias
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {loading ? '...' : stats.news}
              </div>
              {stats.newsDelta !== undefined && (
                <div className={`flex items-center gap-0.5 text-xs ${
                  stats.newsDelta >= 0 
                    ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`}>
                  {stats.newsDelta >= 0 ? 
                    <TrendingUp className="w-3 h-3" /> : 
                    <TrendingDown className="w-3 h-3" />
                  }
                  {Math.abs(stats.newsDelta)}%
                </div>
              )}
            </div>
          </div>

          <div className={`p-3 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${
                theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'
              }`}>
                <ImageIcon className={`w-3.5 h-3.5 ${
                  theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`} />
              </div>
              <span className={`text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Imágenes
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {loading ? '...' : stats.gallery}
              </div>
              {stats.galleryDelta !== undefined && (
                <div className={`flex items-center gap-0.5 text-xs ${
                  stats.galleryDelta >= 0 
                    ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`}>
                  {stats.galleryDelta >= 0 ? 
                    <TrendingUp className="w-3 h-3" /> : 
                    <TrendingDown className="w-3 h-3" />
                  }
                  {Math.abs(stats.galleryDelta)}%
                </div>
              )}
            </div>
          </div>

          <div className={`p-3 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${
                theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'
              }`}>
                <FileText className={`w-3.5 h-3.5 ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`} />
              </div>
              <span className={`text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Comunicados
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {loading ? '...' : stats.press}
              </div>
              {stats.pressDelta !== undefined && (
                <div className={`flex items-center gap-0.5 text-xs ${
                  stats.pressDelta >= 0 
                    ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`}>
                  {stats.pressDelta >= 0 ? 
                    <TrendingUp className="w-3 h-3" /> : 
                    <TrendingDown className="w-3 h-3" />
                  }
                  {Math.abs(stats.pressDelta)}%
                </div>
              )}
            </div>
          </div>

          <div className={`p-3 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${
                theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50'
              }`}>
                <Users className={`w-3.5 h-3.5 ${
                  theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                }`} />
              </div>
              <span className={`text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Usuarios
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {loading ? '...' : stats.users}
              </div>
              {stats.usersDelta !== undefined && (
                <div className={`flex items-center gap-0.5 text-xs ${
                  stats.usersDelta >= 0 
                    ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`}>
                  {stats.usersDelta >= 0 ? 
                    <TrendingUp className="w-3 h-3" /> : 
                    <TrendingDown className="w-3 h-3" />
                  }
                  {Math.abs(stats.usersDelta)}%
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            <TranslateText text="Panel de Control" />
          </h2>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <TranslateText text="Resumen y métricas del sistema" />
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className={`flex rounded-lg border ${
            theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            {(['today', 'week', 'month'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  timeRange === range
                    ? theme === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-600 hover:text-gray-900'
                } ${range === 'today' ? 'rounded-l-lg' : ''} ${
                  range === 'month' ? 'rounded-r-lg' : ''
                }`}
              >
                {range === 'today' && <TranslateText text="Hoy" />}
                {range === 'week' && <TranslateText text="7 días" />}
                {range === 'month' && <TranslateText text="30 días" />}
              </button>
            ))}
          </div>

          <button
            onClick={() => fetchStats(true)}
            disabled={refreshing}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } ${refreshing ? 'opacity-50' : ''}`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline"><TranslateText text="Actualizar" /></span>
          </button>

          <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            theme === 'dark' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}>
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline"><TranslateText text="Exportar" /></span>
          </button>
        </div>
      </div>

      {/* System Status Banner */}
      <div className={`p-4 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gradient-to-r from-blue-50 to-gray-50 border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'
            }`}>
              {getStatusIcon(systemStatus.status)}
            </div>
            <div>
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Estado del Sistema" />: <span className="text-green-500">
                  <TranslateText text="Operativo" />
                </span>
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {systemStatus.message}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="text-center">
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Tiempo Activo" />
              </div>
              <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {stats.uptime}%
              </div>
            </div>
            <div className="text-center">
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Actualizado" />
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {formatTimeSince(systemStatus.updatedAt)}
              </div>
            </div>
            <div className="text-center">
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Hora Pico" />
              </div>
              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {getPeakHour ? `${getPeakHour.hour}:00` : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                <TranslateText text="Métricas Rápidas" />
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                {timeRange === 'today' ? 'Hoy' : 
                 timeRange === 'week' ? 'Últimos 7 días' : 
                 'Últimos 30 días'}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
                  }`}>
                    <Newspaper className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <TranslateText text="Noticias" />
                    </div>
                    <div className={`text-2xl font-bold mt-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {loading ? '...' : stats.news}
                    </div>
                  </div>
                </div>
                {stats.newsDelta !== undefined && (
                  <div className={`flex items-center gap-1 text-xs ${
                    stats.newsDelta >= 0 
                      ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`}>
                    {stats.newsDelta >= 0 ? 
                      <TrendingUp className="w-3 h-3" /> : 
                      <TrendingDown className="w-3 h-3" />
                    }
                    {Math.abs(stats.newsDelta)}% vs período anterior
                  </div>
                )}
              </div>

              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'
                  }`}>
                    <ImageIcon className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <TranslateText text="Imágenes" />
                    </div>
                    <div className={`text-2xl font-bold mt-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {loading ? '...' : stats.gallery}
                    </div>
                  </div>
                </div>
                {stats.galleryDelta !== undefined && (
                  <div className={`flex items-center gap-1 text-xs ${
                    stats.galleryDelta >= 0 
                      ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`}>
                    {stats.galleryDelta >= 0 ? 
                      <TrendingUp className="w-3 h-3" /> : 
                      <TrendingDown className="w-3 h-3" />
                    }
                    {Math.abs(stats.galleryDelta)}% vs período anterior
                  </div>
                )}
              </div>

              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <TranslateText text="Comunicados" />
                    </div>
                    <div className={`text-2xl font-bold mt-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {loading ? '...' : stats.press}
                    </div>
                  </div>
                </div>
                {stats.pressDelta !== undefined && (
                  <div className={`flex items-center gap-1 text-xs ${
                    stats.pressDelta >= 0 
                      ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`}>
                    {stats.pressDelta >= 0 ? 
                      <TrendingUp className="w-3 h-3" /> : 
                      <TrendingDown className="w-3 h-3" />
                    }
                    {Math.abs(stats.pressDelta)}% vs período anterior
                  </div>
                )}
              </div>

              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-100'
                  }`}>
                    <Users className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <TranslateText text="Usuarios Activos" />
                    </div>
                    <div className={`text-2xl font-bold mt-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {loading ? '...' : stats.users}
                    </div>
                  </div>
                </div>
                {stats.usersDelta !== undefined && (
                  <div className={`flex items-center gap-1 text-xs ${
                    stats.usersDelta >= 0 
                      ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`}>
                    {stats.usersDelta >= 0 ? 
                      <TrendingUp className="w-3 h-3" /> : 
                      <TrendingDown className="w-3 h-3" />
                    }
                    {Math.abs(stats.usersDelta)}% vs período anterior
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Performance & Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Services Status */}
            <div className={`p-4 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h4 className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Estado de Servicios" />
              </h4>
              <div className="space-y-3">
                {systemStatus.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        service.status === 'up' ? 'bg-green-500' :
                        service.status === 'slow' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {service.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {service.responseTime}ms
                      </span>
                      <div className={`px-2 py-0.5 rounded text-xs ${
                        service.responseTime < 100 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        service.responseTime < 300 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {service.responseTime < 100 ? 'Rápido' :
                         service.responseTime < 300 ? 'Normal' : 'Lento'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Summary */}
            <div className={`p-4 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h4 className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Resumen de Contenido" />
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <TranslateText text="Total de Elementos" />
                    </span>
                    <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {totalContent}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(stats.news / totalContent) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <TranslateText text="Promedio Diario" />
                    </span>
                    <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {avgPerDay}/día
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${Math.min(100, (avgPerDay / 50) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className={`text-2xl font-bold mb-1 ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {Math.round((stats.news / totalContent) * 100)}%
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Noticias
                      </div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold mb-1 ${
                        theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        {Math.round((stats.gallery / totalContent) * 100)}%
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Imágenes
                      </div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold mb-1 ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {Math.round((stats.press / totalContent) * 100)}%
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Comunicados
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel - User & System Info */}
        <div className="space-y-6">
          {/* User Profile Card */}
          <div className={`p-5 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'
              }`}>
                <Shield className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`} />
              </div>
              <div>
                <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {getRoleDisplay(role)}
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Cuenta Administrativa" />
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Último Acceso" />
                </span>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Sesión Activa" />
                </span>
                <span className={`text-sm font-medium text-green-600 dark:text-green-400`}>
                  <TranslateText text="En línea" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="IP de Conexión" />
                </span>
                <span className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  192.168.1.100
                </span>
              </div>
            </div>

            <button className={`w-full mt-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}>
              <Eye className="w-4 h-4" />
              <TranslateText text="Ver Actividad Completa" />
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className={`p-5 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h4 className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Acciones Rápidas" />
            </h4>
            <div className="space-y-2">
              <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}>
                <Newspaper className="w-4 h-4" />
                <TranslateText text="Nueva Noticia" />
              </button>
              <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}>
                <ImageIcon className="w-4 h-4" />
                <TranslateText text="Subir Imágenes" />
              </button>
              <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}>
                <FileText className="w-4 h-4" />
                <TranslateText text="Publicar Comunicado" />
              </button>
              <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}>
                <BarChart3 className="w-4 h-4" />
                <TranslateText text="Ver Reportes" />
              </button>
            </div>
          </div>

          {/* System Health */}
          <div className={`p-5 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Salud del Sistema" />
              </h4>
              <Activity className={`w-4 h-4 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`} />
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    CPU
                  </span>
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>
                    24%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '24%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Memoria
                  </span>
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    68%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Almacenamiento
                  </span>
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    42%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <TranslateText text="Última Respuesta" />
                  </span>
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>
                    128ms
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <TranslateText text="Solicitudes/día" />
                  </span>
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    2.4K
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}