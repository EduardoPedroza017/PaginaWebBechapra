"use client";

import { 
  Server, 
  Database, 
  Globe, 
  Cpu, 
  Shield, 
  Wifi, 
  Clock,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { useState, useEffect } from "react";

interface DBServerInfoProps {
  theme: "light" | "dark";
  loading: boolean;
  error: boolean;
  dbName: string;
  host: string;
  version: string;
  uptime: number;
  connections: number;
}

export function DBServerInfo({ theme, loading, error, dbName, host, version, uptime, connections }: DBServerInfoProps) {
  const [serverHealth, setServerHealth] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    connections: 0
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    queriesPerSecond: 0,
    avgResponseTime: 0,
    cacheHitRatio: 0,
    replicationLag: 0
  });

  // Simular métricas de salud en tiempo real
  useEffect(() => {
    if (!loading && !error) {
      const interval = setInterval(() => {
        setServerHealth({
          cpu: Math.min(100, Math.random() * 80 + 10),
          memory: Math.min(100, Math.random() * 70 + 20),
          disk: Math.min(100, Math.random() * 50 + 30),
          network: Math.random() * 100,
          connections: connections || Math.floor(Math.random() * 100) + 10
        });

        setPerformanceMetrics({
          queriesPerSecond: Math.floor(Math.random() * 5000) + 1000,
          avgResponseTime: Math.random() * 50 + 10,
          cacheHitRatio: Math.random() * 20 + 80,
          replicationLag: Math.random() * 100
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [loading, error, connections]);

  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days} días ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes} minutos`;
  };

  const getHealthStatus = (value: number, type: string) => {
    if (type === 'cpu' || type === 'memory') {
      if (value > 80) return { color: 'text-red-500', bg: 'bg-red-500/10', status: 'Crítico' };
      if (value > 60) return { color: 'text-amber-500', bg: 'bg-amber-500/10', status: 'Alto' };
      return { color: 'text-green-500', bg: 'bg-green-500/10', status: 'Normal' };
    }
    
    if (value > 90) return { color: 'text-green-500', bg: 'bg-green-500/10', status: 'Excelente' };
    if (value > 70) return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', status: 'Bueno' };
    return { color: 'text-blue-500', bg: 'bg-blue-500/10', status: 'Normal' };
  };

  const healthMetrics = [
    {
      name: 'CPU Usage',
      value: serverHealth.cpu,
      unit: '%',
      icon: Cpu,
      type: 'cpu',
      description: 'Utilización del procesador'
    },
    {
      name: 'Memory',
      value: serverHealth.memory,
      unit: '%',
      icon: Database,
      type: 'memory',
      description: 'Uso de memoria RAM'
    },
    {
      name: 'Disk I/O',
      value: serverHealth.disk,
      unit: '%',
      icon: Activity,
      type: 'disk',
      description: 'Actividad de disco'
    },
    {
      name: 'Network',
      value: serverHealth.network,
      unit: 'MB/s',
      icon: Wifi,
      type: 'network',
      description: 'Throughput de red'
    }
  ];

  return (
    <div className={`rounded-2xl overflow-hidden ${theme === 'dark' 
      ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-800' 
      : 'bg-gradient-to-br from-white to-blue-50/50 border-blue-100'
    } border shadow-lg`}>
      {/* Header */}
      <div className={`p-6 border-b ${theme === 'dark' 
        ? 'border-gray-800/50 bg-gradient-to-r from-gray-900 to-gray-800' 
        : 'border-blue-100/50 bg-gradient-to-r from-blue-50 to-indigo-50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${theme === 'dark' 
              ? 'bg-gradient-to-br from-blue-600/20 to-blue-500/20' 
              : 'bg-gradient-to-br from-blue-100 to-blue-200'
            }`}>
              <Server className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={20} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Panel de Control del Servidor" />
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Monitorización avanzada en tiempo real
              </p>
            </div>
          </div>
          
          <div className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${
            theme === 'dark' 
              ? 'bg-green-600/20 text-green-400' 
              : 'bg-green-100 text-green-700'
          }`}>
            <Zap size={14} />
            <span>Tiempo Real</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
              <div className="absolute inset-4 rounded-full border-4 border-transparent border-b-purple-500 border-l-purple-500 animate-spin animation-delay-500"></div>
            </div>
            <p className={`mt-4 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Conectando con el servidor..." />
            </p>
          </div>
        ) : error ? (
          <div className={`rounded-xl p-4 border ${theme === 'dark' 
            ? 'bg-red-900/20 border-red-800/50' 
            : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
              <div>
                <p className={`font-medium ${theme === 'dark' ? 'text-red-300' : 'text-red-800'}`}>
                  <TranslateText text="Error de conexión" />
                </p>
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                  <TranslateText text="No se pudo conectar con la base de datos. Verifica la configuración." />
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Información del servidor */}
            <div className={`rounded-xl p-5 ${theme === 'dark' 
              ? 'bg-gray-800/30 border border-gray-700/50' 
              : 'bg-white/50 border border-blue-100'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Database className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Base de Datos
                    </span>
                  </div>
                  <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {dbName}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className={`w-4 h-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                    <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Host
                    </span>
                  </div>
                  <p className={`text-sm font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {host}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className={`w-4 h-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Versión
                    </span>
                  </div>
                  <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {version}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
                    <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Uptime
                    </span>
                  </div>
                  <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {formatUptime(uptime)}
                  </p>
                </div>
              </div>
            </div>

            {/* Estado de salud */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Salud del Sistema" />
                </h3>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                  theme === 'dark' 
                    ? 'bg-green-600/20 text-green-400' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  <CheckCircle size={12} />
                  <TranslateText text="Estable" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {healthMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  const health = getHealthStatus(metric.value, metric.type);
                  
                  return (
                    <div 
                      key={index}
                      className={`rounded-xl p-4 border transition-all hover:scale-[1.02] ${
                        health.bg
                      } ${theme === 'dark' ? 'border-gray-700/50' : 'border-blue-100'}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-white/80'}`}>
                          <Icon className={`w-4 h-4 ${health.color}`} />
                        </div>
                        <span className={`text-xs font-medium ${health.color}`}>
                          {health.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {metric.name}
                        </p>
                        
                        <div className="flex items-baseline gap-2">
                          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {metric.value.toFixed(1)}
                            <span className="text-sm">{metric.unit}</span>
                          </p>
                        </div>
                        
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                          {metric.description}
                        </p>
                      </div>
                      
                      {/* Barra de progreso */}
                      <div className="mt-3">
                        <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                          <div 
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${metric.value}%`,
                              backgroundColor: health.color.replace('text-', '').replace('-500', '-500')
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Métricas de performance */}
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Performance" />
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`rounded-xl p-4 border ${theme === 'dark' 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-white/50 border-blue-100'
                }`}>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {performanceMetrics.queriesPerSecond.toLocaleString()}
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Queries/Segundo
                    </div>
                  </div>
                </div>
                
                <div className={`rounded-xl p-4 border ${theme === 'dark' 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-white/50 border-blue-100'
                }`}>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {performanceMetrics.avgResponseTime.toFixed(1)}ms
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Tiempo Respuesta
                    </div>
                  </div>
                </div>
                
                <div className={`rounded-xl p-4 border ${theme === 'dark' 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-white/50 border-blue-100'
                }`}>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {performanceMetrics.cacheHitRatio.toFixed(1)}%
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Cache Hit Ratio
                    </div>
                  </div>
                </div>
                
                <div className={`rounded-xl p-4 border ${theme === 'dark' 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-white/50 border-blue-100'
                }`}>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {performanceMetrics.replicationLag.toFixed(0)}ms
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Lag de Replicación
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conexiones activas */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Conexiones Activas" />
                </h3>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  connections > 50 
                    ? theme === 'dark' 
                      ? 'bg-red-600/20 text-red-400' 
                      : 'bg-red-100 text-red-700'
                    : connections > 20 
                    ? theme === 'dark' 
                      ? 'bg-amber-600/20 text-amber-400' 
                      : 'bg-amber-100 text-amber-700'
                    : theme === 'dark' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-green-100 text-green-700'
                }`}>
                  {connections} conexiones
                </div>
              </div>
              
              <div className={`h-4 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${Math.min(100, (connections / 100) * 100)}%`,
                    background: connections > 50 
                      ? 'linear-gradient(90deg, #ef4444, #dc2626)' 
                      : connections > 20 
                      ? 'linear-gradient(90deg, #f59e0b, #d97706)' 
                      : 'linear-gradient(90deg, #10b981, #059669)'
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  <TranslateText text="Bajo" />
                </span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  <TranslateText text="Moderado" />
                </span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  <TranslateText text="Alto" />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`px-6 py-4 border-t ${theme === 'dark' 
        ? 'border-gray-800/50 bg-gray-900/30' 
        : 'border-blue-100/50 bg-blue-50/30'
      }`}>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                <TranslateText text="En línea" />
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                <TranslateText text="Monitoreando" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}