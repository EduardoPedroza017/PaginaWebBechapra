"use client";

import React from 'react';
import { LayoutDashboard, Activity, BarChart3, RefreshCw } from 'lucide-react';
import { TranslateText } from '@/components/TranslateText';
import { useStats } from '../../hooks';

interface DashboardOverviewProps {
  role: string;
  theme: 'light' | 'dark';
}

// Helper component for stat items
const StatItem = React.memo(function StatItem({ 
  label, 
  value, 
  delta, 
  theme 
}: { 
  label: string; 
  value: number; 
  delta?: number; 
  theme: 'light' | 'dark';
}) {
  const isDark = theme === 'dark';

  return (
    <div className={`p-4 rounded-xl ${
      isDark ? 'bg-gray-800/50' : 'bg-gray-50'
    }`}>
      <div className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </div>
      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {value}
      </div>
      {delta !== undefined && (
        <div className={`text-xs mt-1 ${
          delta >= 0 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-red-600 dark:text-red-400'
        }`}>
          {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}%
        </div>
      )}
    </div>
  );
});

export function DashboardOverview({ role, theme }: DashboardOverviewProps) {
  const isDark = theme === 'dark';
  const { stats, systemStatus, loading, refreshing, refreshStats } = useStats();
  
  const getRoleDisplay = () => {
    switch (role) {
      case 'superadmin': return 'Super Administrador';
      case 'admin': return 'Administrador';
      case 'editor': return 'Editor';
      case 'viewer': return 'Solo Lectura';
      default: return role;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational': return 'Operativo';
      case 'degraded': return 'Degradado';
      case 'maintenance': return 'Mantenimiento';
      default: return 'Desconocido';
    }
  };

  const formatTimeSince = (dateString?: string) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffMins < 1440) return `Hace ${Math.floor(diffMins / 60)} h`;
    return `Hace ${Math.floor(diffMins / 1440)} d`;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className={`relative overflow-hidden rounded-2xl p-6 ${
        isDark 
          ? 'bg-gradient-to-br from-blue-900/50 to-slate-900 border border-slate-700/50' 
          : 'bg-gradient-to-br from-blue-50 to-white border border-blue-100'
      }`}>
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-400/10 to-transparent rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-xl ${
                  isDark ? 'bg-blue-600/20' : 'bg-blue-100'
                }`}>
                  <LayoutDashboard className={`w-5 h-5 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  role === 'superadmin' 
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                    : role === 'admin'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {getRoleDisplay()}
                </span>
              </div>
              
              <h2 className={`text-2xl font-bold mb-1 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <TranslateText text="Bienvenido al Panel" />
              </h2>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <TranslateText text="Aquí tienes un resumen de tu sistema" />
              </p>
            </div>
            
            <button
              onClick={() => refreshStats()}
              disabled={refreshing}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm'
              } ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium">
                <TranslateText text={refreshing ? 'Actualizando...' : 'Actualizar'} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats & System Status Grid */}
      <div className={`p-6 rounded-xl border ${
        isDark 
          ? 'bg-gray-900/50 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-xl ${
            systemStatus.status === 'operational' 
              ? 'bg-green-100 dark:bg-green-900/30' 
              : systemStatus.status === 'degraded'
                ? 'bg-yellow-100 dark:bg-yellow-900/30'
                : 'bg-blue-100 dark:bg-blue-900/30'
          }`}>
            <Activity className={`w-6 h-6 ${
              systemStatus.status === 'operational' 
                ? 'text-green-600 dark:text-green-400' 
                : systemStatus.status === 'degraded'
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-blue-600 dark:text-blue-400'
            }`} />
          </div>
          <div className="flex-1">
            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <TranslateText text="Estado del Sistema" />
            </h4>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {systemStatus.message || 'Cargando estado...'}
            </p>
          </div>
          <div className={`px-4 py-2 rounded-lg font-medium ${
            systemStatus.status === 'operational'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : systemStatus.status === 'degraded'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
          }`}>
            {getStatusText(systemStatus.status)}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatItem 
            label="Noticias"
            value={stats.news}
            delta={stats.newsDelta}
            theme={theme}
          />
          <StatItem 
            label="Imágenes"
            value={stats.gallery}
            delta={stats.galleryDelta}
            theme={theme}
          />
          <StatItem 
            label="Comunicados"
            value={stats.press}
            delta={stats.pressDelta}
            theme={theme}
          />
          <StatItem 
            label="Usuarios"
            value={stats.users}
            delta={stats.usersDelta}
            theme={theme}
          />
        </div>

        {/* Services Status */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h5 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <TranslateText text="Servicios" />
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {systemStatus.services?.map((service, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                isDark ? 'bg-gray-800/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    service.status === 'up' ? 'bg-green-500' :
                    service.status === 'slow' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {service.name}
                  </span>
                </div>
                <span className={`text-sm font-mono ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {service.responseTime}ms
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {stats.uptime || 0}%
            </div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Tiempo Activo" />
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {formatTimeSince(systemStatus.updatedAt)}
            </div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Última Actualización" />
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {stats.news + stats.gallery + stats.press}
            </div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Total Contenido" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DashboardOverview);
