"use client";

import React from 'react';

interface DashboardMonitoringProps {
  theme: 'light' | 'dark';
}

// Iconos inline para evitar problemas de tipos
const Icons = {
  Activity: (props: { className?: string }) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  Server: (props: { className?: string }) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
  ),
  Zap: (props: { className?: string }) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Clock: (props: { className?: string }) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
};

export function DashboardMonitoring({ theme }: DashboardMonitoringProps) {
  const isDark = theme === 'dark';

  // Simulated monitoring data
  const monitoringData = {
    cpu: 24,
    memory: 68,
    storage: 42,
    responseTime: 128,
    requestsPerDay: 2400,
    activeConnections: 156,
  };

  const colorClasses: Record<string, { bg: string; icon: string; bar: string; text: string }> = {
    green: { bg: 'bg-green-900/20', icon: 'text-green-400', bar: 'bg-green-500', text: 'text-green-400' },
    blue: { bg: 'bg-blue-900/20', icon: 'text-blue-400', bar: 'bg-blue-500', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-900/20', icon: 'text-purple-400', bar: 'bg-purple-500', text: 'text-purple-400' },
    orange: { bg: 'bg-orange-900/20', icon: 'text-orange-400', bar: 'bg-orange-500', text: 'text-orange-400' },
  };

  const getColorClasses = (color: string) => colorClasses[color] || colorClasses.green;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${isDark ? 'bg-blue-600/20' : 'bg-blue-100'}`}>
          <Icons.Activity className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        </div>
        <div>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Monitoreo del Sistema
          </h3>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Rendimiento y métricas en tiempo real
          </p>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard label="CPU" value={monitoringData.cpu} unit="%" icon={Icons.Zap} color="green" isDark={isDark} getColorClasses={getColorClasses} />
        <MetricCard label="Memoria" value={monitoringData.memory} unit="%" icon={Icons.Server} color="blue" isDark={isDark} getColorClasses={getColorClasses} />
        <MetricCard label="Almacenamiento" value={monitoringData.storage} unit="%" icon={Icons.Activity} color="purple" isDark={isDark} getColorClasses={getColorClasses} />
      </div>

      {/* Response Time & Requests */}
      <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'}`}>
        <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Métricas de Rendimiento
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              {monitoringData.responseTime}ms
            </div>
            <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Última Respuesta
            </div>
          </div>

          <div className="text-center">
            <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {monitoringData.requestsPerDay.toLocaleString()}
            </div>
            <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Solicitudes/día
            </div>
          </div>

          <div className="text-center">
            <div className={`text-3xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              {monitoringData.activeConnections}
            </div>
            <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Conexiones Activas
            </div>
          </div>

          <div className="text-center">
            <div className={`text-3xl font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
              99.9%
            </div>
            <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Disponibilidad
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <Icons.Clock className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Salud del Sistema
          </h4>
        </div>

        <div className="space-y-4">
          {/* CPU Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>CPU</span>
              <span className={`text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {monitoringData.cpu}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${monitoringData.cpu}%` }} />
            </div>
          </div>

          {/* Memory Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Memoria</span>
              <span className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {monitoringData.memory}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${monitoringData.memory}%` }} />
            </div>
          </div>

          {/* Storage Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Almacenamiento</span>
              <span className={`text-sm font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {monitoringData.storage}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${monitoringData.storage}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para métricas
interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  isDark: boolean;
  getColorClasses: (color: string) => { bg: string; icon: string; bar: string; text: string };
}

function MetricCard({ label, value, unit, icon: IconComponent, color, isDark, getColorClasses }: MetricCardProps) {
  const colors = getColorClasses(color);

  return (
    <div className={`p-5 rounded-xl border ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${colors.bg}`}>
          <IconComponent className={`w-5 h-5 ${colors.icon}`} />
        </div>
        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {label}
        </span>
      </div>
      
      <div className="flex items-end justify-between">
        <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {value}
          <span className={`text-lg ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {unit}
          </span>
        </div>
      </div>

      <div className="mt-3 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full ${colors.bar} rounded-full transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default DashboardMonitoring;

