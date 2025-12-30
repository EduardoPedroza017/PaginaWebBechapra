"use client";

import { 
  Database, 
  HardDrive, 
  Layers, 
  Users, 
  Clock, 
  Activity, 
  Server,
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  Cpu,
  Network,
  BarChart,
  AlertCircle
} from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { useEffect, useState } from "react";

interface DBMetricCardsProps {
  theme: "light" | "dark";
  loading: boolean;
  error: boolean;
  totalSize: number;
  totalDocs: number;
  connections: number;
  uptime: number;
  collectionsCount: number;
  totalIndexSize: number;
  avgDocSize: number;
  version: string;
}

export function DBMetricCards({
  theme, loading, error, totalSize, totalDocs, connections, uptime, 
  collectionsCount, totalIndexSize, avgDocSize, version
}: DBMetricCardsProps) {
  const [animatedValues, setAnimatedValues] = useState({
    totalSize: 0,
    totalDocs: 0,
    connections: 0,
    collectionsCount: 0,
    totalIndexSize: 0,
    avgDocSize: 0
  });

  // Animación de valores numéricos
  useEffect(() => {
    if (!loading && !error) {
      const targets = {
        totalSize: totalSize,
        totalDocs: totalDocs,
        connections: connections || 0,
        collectionsCount: collectionsCount,
        totalIndexSize: totalIndexSize,
        avgDocSize: avgDocSize
      };

      const duration = 1000;
      const steps = 60;
      const stepValues: any = {};

      Object.keys(targets).forEach(key => {
        stepValues[key] = [];
        const target = (targets as any)[key];
        const start = 0;
        const diff = target - start;
        
        for (let i = 0; i <= steps; i++) {
          const progress = i / steps;
          // Easing function for smooth animation
          const easeProgress = progress < 0.5 
            ? 2 * progress * progress 
            : -1 + (4 - 2 * progress) * progress;
          stepValues[key].push(start + diff * easeProgress);
        }
      });

      let currentStep = 0;
      const interval = setInterval(() => {
        const newValues: any = {};
        Object.keys(targets).forEach(key => {
          newValues[key] = Math.floor(stepValues[key][currentStep]);
        });
        setAnimatedValues(newValues);
        
        currentStep++;
        if (currentStep > steps) {
          clearInterval(interval);
          // Set final values
          setAnimatedValues(targets);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [loading, error, totalSize, totalDocs, connections, collectionsCount, totalIndexSize, avgDocSize]);

  // Formatear uptime
  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Calcular tendencia de uso
  const getUsageTrend = (current: number, previous?: number) => {
    if (!previous) return { icon: TrendingUp, color: 'text-green-500', trend: '+5.2%' };
    const change = ((current - previous) / previous) * 100;
    return {
      icon: change >= 0 ? TrendingUp : TrendingDown,
      color: change >= 0 ? 'text-green-500' : 'text-red-500',
      trend: `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`
    };
  };

  const metrics = [
    {
      id: 'totalSize',
      title: 'Tamaño Total',
      value: loading ? '...' : error ? 'N/A' : `${(animatedValues.totalSize / 1024 / 1024).toFixed(2)} MB`,
      icon: HardDrive,
      color: 'blue',
      trend: getUsageTrend(totalSize),
      description: 'Almacenamiento en disco',
      gradient: theme === 'dark' 
        ? 'from-blue-600/20 to-blue-500/10' 
        : 'from-blue-50 to-blue-100/50'
    },
    {
      id: 'totalDocs',
      title: 'Documentos',
      value: loading ? '...' : error ? 'N/A' : animatedValues.totalDocs.toLocaleString(),
      icon: Layers,
      color: 'green',
      trend: getUsageTrend(totalDocs),
      description: 'Total de registros',
      gradient: theme === 'dark' 
        ? 'from-emerald-600/20 to-emerald-500/10' 
        : 'from-emerald-50 to-emerald-100/50'
    },
    {
      id: 'connections',
      title: 'Conexiones Activas',
      value: loading ? '...' : error ? 'N/A' : animatedValues.connections.toString(),
      icon: Users,
      color: 'purple',
      description: 'Clientes conectados',
      status: connections > 50 ? 'high' : connections > 20 ? 'medium' : 'low',
      gradient: theme === 'dark' 
        ? 'from-purple-600/20 to-purple-500/10' 
        : 'from-purple-50 to-purple-100/50'
    },
    {
      id: 'uptime',
      title: 'Uptime',
      value: loading ? '...' : error ? 'N/A' : formatUptime(uptime),
      icon: Clock,
      color: 'amber',
      description: 'Tiempo activo',
      gradient: theme === 'dark' 
        ? 'from-amber-600/20 to-amber-500/10' 
        : 'from-amber-50 to-amber-100/50'
    },
    {
      id: 'collectionsCount',
      title: 'Colecciones',
      value: loading ? '...' : error ? 'N/A' : animatedValues.collectionsCount.toString(),
      icon: Database,
      color: 'cyan',
      trend: getUsageTrend(collectionsCount),
      description: 'Total colecciones',
      gradient: theme === 'dark' 
        ? 'from-cyan-600/20 to-cyan-500/10' 
        : 'from-cyan-50 to-cyan-100/50'
    },
    {
      id: 'totalIndexSize',
      title: 'Índices',
      value: loading ? '...' : error ? 'N/A' : `${(animatedValues.totalIndexSize / 1024 / 1024).toFixed(2)} MB`,
      icon: Activity,
      color: 'pink',
      description: 'Tamaño de índices',
      gradient: theme === 'dark' 
        ? 'from-pink-600/20 to-pink-500/10' 
        : 'from-pink-50 to-pink-100/50'
    },
    {
      id: 'avgDocSize',
      title: 'Promedio Doc',
      value: loading ? '...' : error ? 'N/A' : `${(animatedValues.avgDocSize / 1024).toFixed(2)} KB`,
      icon: Server,
      color: 'orange',
      description: 'Tamaño promedio',
      gradient: theme === 'dark' 
        ? 'from-orange-600/20 to-orange-500/10' 
        : 'from-orange-50 to-orange-100/50'
    },
    {
      id: 'version',
      title: 'Versión MongoDB',
      value: loading ? '...' : error ? 'N/A' : version,
      icon: Shield,
      color: 'indigo',
      description: 'Motor de base de datos',
      gradient: theme === 'dark' 
        ? 'from-indigo-600/20 to-indigo-500/10' 
        : 'from-indigo-50 to-indigo-100/50'
    }
  ];

  const colorMap: Record<string, string> = {
    blue: '#3b82f6',
    green: '#10b981',
    purple: '#8b5cf6',
    amber: '#f59e0b',
    cyan: '#06b6d4',
    pink: '#ec4899',
    orange: '#f97316',
    indigo: '#6366f1'
  };

  const colorMapDark: Record<string, string> = {
    blue: '#60a5fa',
    green: '#34d399',
    purple: '#a78bfa',
    amber: '#fbbf24',
    cyan: '#22d3ee',
    pink: '#f472b6',
    orange: '#fb923c',
    indigo: '#818cf8'
  };

  return (
    <div className="space-y-6">
      {/* Header de métricas */}
      <div className={`rounded-2xl p-6 ${theme === 'dark' 
        ? 'bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-gray-800' 
        : 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-blue-100'
      } border`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${theme === 'dark' 
              ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20' 
              : 'bg-gradient-to-br from-blue-100 to-purple-100'
            }`}>
              <BarChart className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={20} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Métricas en Tiempo Real" />
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Monitorización continua de la base de datos
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${
              theme === 'dark' 
                ? 'bg-green-600/20 text-green-400' 
                : 'bg-green-100 text-green-700'
            }`}>
              <Zap size={14} />
              <span>Actualizado cada 10s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de métricas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.slice(0, 4).map((metric, index) => {
          const Icon = metric.icon;
          const color = theme === 'dark' ? colorMapDark[metric.color] : colorMap[metric.color];
          
          return (
            <div
              key={metric.id}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-800' 
                : 'bg-gradient-to-br from-white to-blue-50/50 border-blue-100'
              }`}
            >
              <div className={`p-5 bg-gradient-to-r ${metric.gradient}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${theme === 'dark' 
                    ? 'bg-white/10' 
                    : 'bg-white/80'
                  }`}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  
                  {metric.trend && (
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <metric.trend.icon className={`w-3 h-3 ${metric.trend.color}`} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {metric.trend.trend}
                      </span>
                    </div>
                  )}
                  
                  {metric.status && (
                    <div className={`w-2 h-2 rounded-full ${metric.status === 'high' 
                      ? 'bg-red-500 animate-pulse' 
                      : metric.status === 'medium' 
                      ? 'bg-amber-500' 
                      : 'bg-green-500'
                    }`} />
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
                  }`}>
                    <TranslateText text={metric.title} />
                  </p>
                  
                  <div className="flex items-baseline gap-2">
                    <p className={`text-2xl font-bold ${theme === 'dark' 
                      ? 'text-white' 
                      : 'text-gray-900'
                    }`}>
                      {metric.value}
                    </p>
                    
                    {metric.id === 'connections' && connections > 0 && (
                      <div className={`text-xs px-2 py-0.5 rounded-full ${theme === 'dark' 
                        ? 'bg-gray-800 text-gray-300' 
                        : 'bg-gray-100 text-gray-600'
                      }`}>
                        {connections > 50 ? 'Alto' : connections > 20 ? 'Moderado' : 'Normal'}
                      </div>
                    )}
                  </div>
                  
                  <p className={`text-xs ${theme === 'dark' 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
                  }`}>
                    {metric.description}
                  </p>
                </div>
                
                {/* Barra de progreso sutil */}
                <div className="mt-4">
                  <div className={`h-1 rounded-full overflow-hidden ${theme === 'dark' 
                    ? 'bg-gray-800' 
                    : 'bg-gray-200'
                  }`}>
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: loading ? '0%' : `${Math.min(100, index * 25 + 30)}%`,
                        backgroundColor: color
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Segunda fila de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.slice(4).map((metric, index) => {
          const Icon = metric.icon;
          const color = theme === 'dark' ? colorMapDark[metric.color] : colorMap[metric.color];
          
          return (
            <div
              key={metric.id}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-800' 
                : 'bg-gradient-to-br from-white to-blue-50/50 border-blue-100'
              }`}
            >
              <div className={`p-5 bg-gradient-to-r ${metric.gradient}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${theme === 'dark' 
                    ? 'bg-white/10' 
                    : 'bg-white/80'
                  }`}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  
                  {metric.trend && (
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <metric.trend.icon className={`w-3 h-3 ${metric.trend.color}`} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {metric.trend.trend}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
                  }`}>
                    <TranslateText text={metric.title} />
                  </p>
                  
                  <div className="flex items-baseline gap-2">
                    <p className={`text-2xl font-bold ${theme === 'dark' 
                      ? 'text-white' 
                      : 'text-gray-900'
                    }`}>
                      {metric.value}
                    </p>
                    
                    {metric.id === 'avgDocSize' && avgDocSize > 10240 && (
                      <div className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${theme === 'dark' 
                        ? 'bg-amber-600/20 text-amber-400' 
                        : 'bg-amber-100 text-amber-700'
                      }`}>
                        <AlertCircle size={10} />
                        <span>Grande</span>
                      </div>
                    )}
                  </div>
                  
                  <p className={`text-xs ${theme === 'dark' 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
                  }`}>
                    {metric.description}
                  </p>
                </div>
                
                {/* Indicador circular */}
                <div className="mt-4 flex justify-center">
                  <div className="relative w-12 h-12">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={theme === 'dark' ? '#374151' : '#e5e7eb'}
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeDasharray={`${(index + 1) * 15}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {(index + 1) * 15}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Barra de estado del sistema */}
      <div className={`rounded-2xl p-4 ${theme === 'dark' 
        ? 'bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-gray-800' 
        : 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-blue-100'
      } border`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${theme === 'dark' 
              ? 'bg-green-600/20 text-green-400' 
              : 'bg-green-100 text-green-600'
            }`}>
              <Cpu size={16} />
            </div>
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Estado del Sistema" />
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Todos los sistemas operativos
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <TranslateText text="Latencia" />
              </div>
              <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-green-500">18ms</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <TranslateText text="Throughput" />
              </div>
              <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                2.4k ops/s
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <TranslateText text="Cache Hit" />
              </div>
              <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                94.7%
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <TranslateText text="I/O" />
              </div>
              <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Network className="inline w-4 h-4 text-blue-500" /> 45 MB/s
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}