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
  AlertCircle,
  Loader2
} from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { useEffect, useState, useCallback } from "react";

interface DBMetricCardsProps {
  theme: "light" | "dark";
  loading: boolean;
  error: boolean;
  totalSize: number; // en bytes
  totalDocs: number;
  connections: number;
  uptime: number; // en segundos
  collectionsCount: number;
  totalIndexSize: number; // en bytes
  avgDocSize: number; // en bytes
  version: string;
}

interface MetricValue {
  totalSize: number;
  totalDocs: number;
  connections: number;
  collectionsCount: number;
  totalIndexSize: number;
  avgDocSize: number;
}

export function DBMetricCards({
  theme, loading, error, totalSize, totalDocs, connections, uptime, 
  collectionsCount, totalIndexSize, avgDocSize, version
}: DBMetricCardsProps) {
  const [animatedValues, setAnimatedValues] = useState<MetricValue>({
    totalSize: 0,
    totalDocs: 0,
    connections: 0,
    collectionsCount: 0,
    totalIndexSize: 0,
    avgDocSize: 0
  });

  const formatBytes = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }, []);

  const formatBytesToMB = useCallback((bytes: number): string => {
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(2)} MB`;
  }, []);

  const formatBytesToKB = useCallback((bytes: number): string => {
    const kb = bytes / 1024;
    return `${kb.toFixed(2)} KB`;
  }, []);

  // Animación de valores numéricos con requestAnimationFrame
  useEffect(() => {
    if (!loading && !error) {
      const targets: MetricValue = {
        totalSize,
        totalDocs,
        connections: connections || 0,
        collectionsCount,
        totalIndexSize,
        avgDocSize
      };

      const duration = 1200; // ms
      const startTime = Date.now();
      const startValues = { ...animatedValues };

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function: easeOutCubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const newValues: MetricValue = { ...animatedValues };
        
        (Object.keys(targets) as Array<keyof MetricValue>).forEach(key => {
          const start = startValues[key];
          const target = targets[key];
          const value = start + (target - start) * easeProgress;
          newValues[key] = Math.round(value);
        });
        
        setAnimatedValues(newValues);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Asegurar valores finales exactos
          setAnimatedValues(targets);
        }
      };

      const animationFrame = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [loading, error, totalSize, totalDocs, connections, collectionsCount, totalIndexSize, avgDocSize]);

  // Formatear uptime
  const formatUptime = useCallback((seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }, []);

  // Calcular tendencia de uso
  const getUsageTrend = useCallback((current: number, previous?: number) => {
    if (!previous) return { icon: TrendingUp, color: 'text-green-500', trend: '+5.2%' };
    const change = ((current - previous) / previous) * 100;
    return {
      icon: change >= 0 ? TrendingUp : TrendingDown,
      color: change >= 0 ? 'text-green-500' : 'text-red-500',
      trend: `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`
    };
  }, []);

  const metrics = [
    {
      id: 'totalSize',
      title: 'Tamaño Total',
      value: loading ? '...' : error ? 'N/A' : formatBytes(totalSize),
      animatedValue: formatBytes(animatedValues.totalSize),
      icon: HardDrive,
      color: 'blue',
      trend: getUsageTrend(totalSize),
      description: 'Almacenamiento en disco',
      gradient: theme === 'dark' 
        ? 'from-blue-600/20 via-blue-600/10 to-blue-600/5' 
        : 'from-blue-50 via-blue-50/50 to-blue-50/20',
      border: theme === 'dark' ? 'border-blue-500/20' : 'border-blue-200'
    },
    {
      id: 'totalDocs',
      title: 'Documentos',
      value: loading ? '...' : error ? 'N/A' : totalDocs.toLocaleString(),
      animatedValue: animatedValues.totalDocs.toLocaleString(),
      icon: Layers,
      color: 'green',
      trend: getUsageTrend(totalDocs),
      description: 'Total de registros',
      gradient: theme === 'dark' 
        ? 'from-emerald-600/20 via-emerald-600/10 to-emerald-600/5' 
        : 'from-emerald-50 via-emerald-50/50 to-emerald-50/20',
      border: theme === 'dark' ? 'border-emerald-500/20' : 'border-emerald-200'
    },
    {
      id: 'connections',
      title: 'Conexiones Activas',
      value: loading ? '...' : error ? 'N/A' : connections.toString(),
      animatedValue: animatedValues.connections.toString(),
      icon: Users,
      color: 'purple',
      description: 'Clientes conectados',
      status: connections > 50 ? 'high' : connections > 20 ? 'medium' : 'low',
      gradient: theme === 'dark' 
        ? 'from-purple-600/20 via-purple-600/10 to-purple-600/5' 
        : 'from-purple-50 via-purple-50/50 to-purple-50/20',
      border: theme === 'dark' ? 'border-purple-500/20' : 'border-purple-200'
    },
    {
      id: 'uptime',
      title: 'Uptime',
      value: loading ? '...' : error ? 'N/A' : formatUptime(uptime),
      animatedValue: formatUptime(uptime),
      icon: Clock,
      color: 'amber',
      description: 'Tiempo activo',
      gradient: theme === 'dark' 
        ? 'from-amber-600/20 via-amber-600/10 to-amber-600/5' 
        : 'from-amber-50 via-amber-50/50 to-amber-50/20',
      border: theme === 'dark' ? 'border-amber-500/20' : 'border-amber-200'
    },
    {
      id: 'collectionsCount',
      title: 'Colecciones',
      value: loading ? '...' : error ? 'N/A' : collectionsCount.toString(),
      animatedValue: animatedValues.collectionsCount.toString(),
      icon: Database,
      color: 'cyan',
      trend: getUsageTrend(collectionsCount),
      description: 'Total colecciones',
      gradient: theme === 'dark' 
        ? 'from-cyan-600/20 via-cyan-600/10 to-cyan-600/5' 
        : 'from-cyan-50 via-cyan-50/50 to-cyan-50/20',
      border: theme === 'dark' ? 'border-cyan-500/20' : 'border-cyan-200'
    },
    {
      id: 'totalIndexSize',
      title: 'Índices',
      value: loading ? '...' : error ? 'N/A' : formatBytesToMB(totalIndexSize),
      animatedValue: formatBytesToMB(animatedValues.totalIndexSize),
      icon: Activity,
      color: 'pink',
      description: 'Tamaño de índices',
      gradient: theme === 'dark' 
        ? 'from-pink-600/20 via-pink-600/10 to-pink-600/5' 
        : 'from-pink-50 via-pink-50/50 to-pink-50/20',
      border: theme === 'dark' ? 'border-pink-500/20' : 'border-pink-200'
    },
    {
      id: 'avgDocSize',
      title: 'Promedio Doc',
      value: loading ? '...' : error ? 'N/A' : formatBytesToKB(avgDocSize),
      animatedValue: formatBytesToKB(animatedValues.avgDocSize),
      icon: Server,
      color: 'orange',
      description: 'Tamaño promedio',
      gradient: theme === 'dark' 
        ? 'from-orange-600/20 via-orange-600/10 to-orange-600/5' 
        : 'from-orange-50 via-orange-50/50 to-orange-50/20',
      border: theme === 'dark' ? 'border-orange-500/20' : 'border-orange-200'
    },
    {
      id: 'version',
      title: 'Versión MongoDB',
      value: loading ? '...' : error ? 'N/A' : version,
      animatedValue: version,
      icon: Shield,
      color: 'indigo',
      description: 'Motor de base de datos',
      gradient: theme === 'dark' 
        ? 'from-indigo-600/20 via-indigo-600/10 to-indigo-600/5' 
        : 'from-indigo-50 via-indigo-50/50 to-indigo-50/20',
      border: theme === 'dark' ? 'border-indigo-500/20' : 'border-indigo-200'
    }
  ];

  const colorMap = {
    blue: { light: '#3b82f6', dark: '#60a5fa' },
    green: { light: '#10b981', dark: '#34d399' },
    purple: { light: '#8b5cf6', dark: '#a78bfa' },
    amber: { light: '#f59e0b', dark: '#fbbf24' },
    cyan: { light: '#06b6d4', dark: '#22d3ee' },
    pink: { light: '#ec4899', dark: '#f472b6' },
    orange: { light: '#f97316', dark: '#fb923c' },
    indigo: { light: '#6366f1', dark: '#818cf8' }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className={`rounded-2xl p-6 ${theme === 'dark' 
          ? 'bg-gray-900/50 border-gray-800' 
          : 'bg-blue-50/50 border-blue-100'
        } border`}>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className={`w-8 h-8 animate-spin mx-auto mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                Cargando métricas de base de datos...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className={`rounded-2xl p-6 ${theme === 'dark' 
          ? 'bg-red-900/20 border-red-800/30' 
          : 'bg-red-50/50 border-red-100'
        } border`}>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className={`w-8 h-8 mx-auto mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
              <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                Error al cargar métricas
              </p>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                No se pudieron obtener los datos de la base de datos
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header de métricas */}
      <div className={`rounded-2xl p-6 ${theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900/80 border-gray-800' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 border-blue-100'
      } border shadow-sm`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${theme === 'dark' 
              ? 'bg-gradient-to-br from-blue-600/20 via-blue-500/20 to-purple-600/20' 
              : 'bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100'
            }`}>
              <BarChart className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={20} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Métricas en Tiempo Real" />
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Monitorización continua de la base de datos" />
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
              <span><TranslateText text="Actualizado cada 10s" /></span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de métricas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.slice(0, 4).map((metric, index) => {
          const Icon = metric.icon;
          const color = colorMap[metric.color as keyof typeof colorMap][theme === 'dark' ? 'dark' : 'light'];
          
          return (
            <div
              key={metric.id}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90' 
                : 'bg-gradient-to-br from-white via-white/90 to-white'
              } ${metric.border} shadow-sm`}
            >
              <div className={`p-5 bg-gradient-to-r ${metric.gradient} h-full`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl backdrop-blur-sm ${theme === 'dark' 
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
                    <div className={`w-2 h-2 rounded-full animate-pulse ${metric.status === 'high' 
                      ? 'bg-red-500' 
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
                      {loading ? '...' : metric.animatedValue}
                    </p>
                    
                    {metric.id === 'connections' && connections > 0 && (
                      <div className={`text-xs px-2 py-0.5 rounded-full ${
                        connections > 50 
                          ? theme === 'dark' ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-700'
                          : connections > 20 
                          ? theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700'
                          : theme === 'dark' ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
                      }`}>
                        {connections > 50 
                          ? <TranslateText text="Alto" />
                          : connections > 20 
                          ? <TranslateText text="Moderado" />
                          : <TranslateText text="Normal" />
                        }
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
          const color = colorMap[metric.color as keyof typeof colorMap][theme === 'dark' ? 'dark' : 'light'];
          
          return (
            <div
              key={metric.id}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90' 
                : 'bg-gradient-to-br from-white via-white/90 to-white'
              } ${metric.border} shadow-sm`}
            >
              <div className={`p-5 bg-gradient-to-r ${metric.gradient} h-full`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl backdrop-blur-sm ${theme === 'dark' 
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
                      {loading ? '...' : metric.animatedValue}
                    </p>
                    
                    {metric.id === 'avgDocSize' && avgDocSize > 10240 && (
                      <div className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${theme === 'dark' 
                        ? 'bg-amber-600/20 text-amber-400' 
                        : 'bg-amber-100 text-amber-700'
                      }`}>
                        <AlertCircle size={10} />
                        <span><TranslateText text="Grande" /></span>
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
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke={theme === 'dark' ? '#374151' : '#e5e7eb'}
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeDasharray={`${(index + 1) * 15} 100`}
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
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900/80 border-gray-800' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 border-blue-100'
      } border shadow-sm`}>
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
                <TranslateText text="Todos los sistemas operativos" />
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-center min-w-[70px]">
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <TranslateText text="Latencia" />
              </div>
              <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-green-500">18ms</span>
              </div>
            </div>
            
            <div className="text-center min-w-[70px]">
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <TranslateText text="Throughput" />
              </div>
              <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                2.4k ops/s
              </div>
            </div>
            
            <div className="text-center min-w-[70px]">
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <TranslateText text="Cache Hit" />
              </div>
              <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                94.7%
              </div>
            </div>
            
            <div className="text-center min-w-[70px]">
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