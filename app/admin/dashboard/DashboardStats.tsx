"use client";

import React, { useState, useMemo, useCallback, memo } from "react";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Newspaper,
  TrendingUp,
  TrendingDown,
  ImageIcon,
  FileText,
  Users,
  Download,
  Shield,
  Eye,
  ChevronRight,
  BarChart3,
  Activity
} from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { useStats } from "../hooks";
import { QuickStatsGrid } from "./components/QuickStatsGrid";
import { DashboardStatsHeader } from "./components/DashboardStatsHeader";

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

function DashboardStatsComponent({ role, theme, compact = false }: DashboardStatsProps) {
  const { stats, systemStatus, loading, refreshing, refreshStats } = useStats();
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('week');

  const handleTimeRangeChange = useCallback((range: 'today' | 'week' | 'month') => {
    setTimeRange(range);
  }, []);

  const handleRefresh = useCallback(async () => {
    await refreshStats();
  }, [refreshStats]);

  // Renderizar componente usando hooks y componentes extraídos
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
    if (!stats.peakHours || stats.peakHours.length === 0) return null;
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
            onClick={() => refreshStats()}
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
                theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'
              }`}>
                <Users className={`w-3.5 h-3.5 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <TranslateText text="Panel de Control" />
          </h2>
          <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <TranslateText text="Resumen y métricas del sistema" />
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className={`flex rounded-lg border ${
            theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
          }`}>
            {(['today', 'week', 'month'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  timeRange === range
                    ? theme === 'dark'
                      ? 'bg-gray-700 text-white'
                      : 'bg-white text-gray-900 shadow-sm'
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
            onClick={() => refreshStats()}
            disabled={refreshing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
              theme === 'dark'
                ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
            } ${refreshing ? 'opacity-50' : ''}`}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline"><TranslateText text="Actualizar" /></span>
          </button>

          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            theme === 'dark'
              ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300'
              : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
          }`}>
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline"><TranslateText text="Exportar" /></span>
          </button>
        </div>
      </div>

      {/* System Status Banner */}
      <div className={`p-6 rounded-lg border ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-100'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              {getStatusIcon(systemStatus.status)}
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Estado del Sistema" />: <span className={`${
                  systemStatus.status === 'operational' ? 'text-green-600 dark:text-green-400' :
                  systemStatus.status === 'degraded' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {systemStatus.status === 'operational' && <TranslateText text="Operativo" />}
                  {systemStatus.status === 'degraded' && <TranslateText text="Degradado" />}
                  {systemStatus.status === 'maintenance' && <TranslateText text="Mantenimiento" />}
                </span>
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {systemStatus.message || <TranslateText text="Cargando estado del sistema..." />}
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
            <DashboardStatsHeader
              theme={theme}
              timeRange={timeRange}
              onTimeRangeChange={handleTimeRangeChange}
              onRefresh={handleRefresh}
              refreshing={refreshing}
            />

            <QuickStatsGrid
              stats={stats}
              theme={theme}
              loading={loading}
            />
          </div>

          {/* Performance & Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Services Status */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-100'
            }`}>
              <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
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
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-100'
            }`}>
              <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
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
          <div className={`p-6 rounded-lg border ${
            theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Shield className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`} />
              </div>
              <div>
                <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
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

            <button className={`w-full mt-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors border ${
              theme === 'dark'
                ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
            }`}>
              <Eye className="w-4 h-4" />
              <TranslateText text="Ver Actividad Completa" />
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className={`p-6 rounded-lg border ${
            theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-100'
          }`}>
            <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Acciones Rápidas" />
            </h4>
            <div className="space-y-3">
              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors border ${
                theme === 'dark'
                  ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
              }`}>
                <Newspaper className="w-4 h-4" />
                <TranslateText text="Nueva Noticia" />
              </button>
              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors border ${
                theme === 'dark'
                  ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
              }`}>
                <ImageIcon className="w-4 h-4" />
                <TranslateText text="Subir Imágenes" />
              </button>
              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors border ${
                theme === 'dark'
                  ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
              }`}>
                <FileText className="w-4 h-4" />
                <TranslateText text="Publicar Comunicado" />
              </button>
              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors border ${
                theme === 'dark'
                  ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
              }`}>
                <BarChart3 className="w-4 h-4" />
                <TranslateText text="Ver Reportes" />
              </button>
            </div>
          </div>

          {/* System Health */}
          <div className={`p-6 rounded-lg border ${
            theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Salud del Sistema" />
              </h4>
              <Activity className={`w-5 h-5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
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

// Memoize para prevenir re-renders innecesarios
// Solo re-renderiza si role, theme, o compact cambian
const DashboardStats = memo(DashboardStatsComponent, (prevProps, nextProps) => {
  return (
    prevProps.role === nextProps.role &&
    prevProps.theme === nextProps.theme &&
    prevProps.compact === nextProps.compact
  );
});

DashboardStats.displayName = 'DashboardStats';

export default DashboardStats;