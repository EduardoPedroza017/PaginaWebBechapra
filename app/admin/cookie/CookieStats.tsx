"use client";

import { TranslateText } from "@/components/TranslateText";
import { CheckCircle, XCircle, TrendingUp, Users, Clock, Percent, TrendingDown, Activity } from "lucide-react";
import { useState, useEffect } from "react";

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

interface StatCard {
  icon: React.ComponentType<any>;
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  description?: string;
  color: {
    light: string;
    dark: string;
    bgLight: string;
    bgDark: string;
  };
}

export default function CookieStats({ data, theme = 'light' }: CookieStatsProps) {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
  
  const accepted = data.filter(d => d.accepted).length;
  const rejected = data.filter(d => !d.accepted).length;
  const total = data.length;
  const acceptanceRate = total > 0 ? ((accepted / total) * 100) : 0;
  
  // Calcular tasa de cambio (comparando últimos 7 días vs anteriores)
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(today.getDate() - 14);
  
  const recentWeek = data.filter(d => new Date(d.timestamp) >= weekAgo);
  const previousWeek = data.filter(d => new Date(d.timestamp) >= twoWeeksAgo && new Date(d.timestamp) < weekAgo);
  
  const recentAccepted = recentWeek.filter(d => d.accepted).length;
  const previousAccepted = previousWeek.filter(d => d.accepted).length;
  
  const acceptanceChange = previousAccepted > 0 
    ? ((recentAccepted - previousAccepted) / previousAccepted) * 100 
    : 0;
  
  // Días únicos con actividad
  const uniqueDays = new Set(data.map(d => 
    new Date(d.timestamp).toLocaleDateString()
  )).size;
  
  // Hoy
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayCount = data.filter(d => new Date(d.timestamp) >= todayStart).length;
  
  // Máximo diario histórico
  const dailyCounts: Record<string, number> = {};
  data.forEach(d => {
    const date = new Date(d.timestamp).toLocaleDateString();
    dailyCounts[date] = (dailyCounts[date] || 0) + 1;
  });
  const maxDaily = Math.max(...Object.values(dailyCounts), 0);

  // Animación de valores
  useEffect(() => {
    const targetValues = {
      total,
      accepted,
      rejected,
      acceptanceRate: parseFloat(acceptanceRate.toFixed(1)),
      todayCount,
      uniqueDays,
    };

    const interval = setInterval(() => {
      setAnimatedValues(prev => {
        const newValues = { ...prev };
        Object.entries(targetValues).forEach(([key, target]) => {
          const current = newValues[key] || 0;
          const diff = target - current;
          if (Math.abs(diff) > 0.1) {
            newValues[key] = current + diff * 0.1;
          } else {
            newValues[key] = target;
          }
        });
        return newValues;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [total, accepted, rejected, acceptanceRate, todayCount, uniqueDays]);

  const stats: StatCard[] = [
    {
      icon: Users,
      label: "Total Registros",
      value: Math.round(animatedValues.total || 0),
      change: acceptanceChange > 0 ? `+${acceptanceChange.toFixed(1)}%` : acceptanceChange < 0 ? `${acceptanceChange.toFixed(1)}%` : '0%',
      changeType: acceptanceChange > 0 ? 'positive' : acceptanceChange < 0 ? 'negative' : 'neutral',
      description: "Cambio vs semana anterior",
      color: {
        light: "text-blue-600",
        dark: "text-blue-400",
        bgLight: "bg-blue-50",
        bgDark: "bg-blue-900/20"
      }
    },
    {
      icon: CheckCircle,
      label: "Aceptados",
      value: Math.round(animatedValues.accepted || 0),
      description: `${total > 0 ? ((accepted / total) * 100).toFixed(1) : '0'}% del total`,
      color: {
        light: "text-emerald-600",
        dark: "text-emerald-400",
        bgLight: "bg-emerald-50",
        bgDark: "bg-emerald-900/20"
      }
    },
    {
      icon: XCircle,
      label: "Rechazados",
      value: Math.round(animatedValues.rejected || 0),
      description: `${total > 0 ? ((rejected / total) * 100).toFixed(1) : '0'}% del total`,
      color: {
        light: "text-rose-600",
        dark: "text-rose-400",
        bgLight: "bg-rose-50",
        bgDark: "bg-rose-900/20"
      }
    },
    {
      icon: Percent,
      label: "Tasa de Aceptación",
      value: `${(animatedValues.acceptanceRate || 0).toFixed(1)}%`,
      change: acceptanceChange > 0 ? `+${acceptanceChange.toFixed(1)}%` : acceptanceChange < 0 ? `${acceptanceChange.toFixed(1)}%` : '0%',
      changeType: acceptanceChange > 0 ? 'positive' : acceptanceChange < 0 ? 'negative' : 'neutral',
      description: "vs semana anterior",
      color: {
        light: "text-violet-600",
        dark: "text-violet-400",
        bgLight: "bg-violet-50",
        bgDark: "bg-violet-900/20"
      }
    },
    {
      icon: Activity,
      label: "Actividad Hoy",
      value: Math.round(animatedValues.todayCount || 0),
      description: `Máximo histórico: ${maxDaily}`,
      color: {
        light: "text-amber-600",
        dark: "text-amber-400",
        bgLight: "bg-amber-50",
        bgDark: "bg-amber-900/20"
      }
    },
    {
      icon: TrendingUp,
      label: "Días Activos",
      value: Math.round(animatedValues.uniqueDays || 0),
      description: "Período con datos",
      color: {
        light: "text-cyan-600",
        dark: "text-cyan-400",
        bgLight: "bg-cyan-50",
        bgDark: "bg-cyan-900/20"
      }
    }
  ];

  const getChangeIcon = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="w-3 h-3 text-emerald-500" />;
      case 'negative':
        return <TrendingDown className="w-3 h-3 text-rose-500" />;
      default:
        return <TrendingUp className="w-3 h-3 text-gray-500 opacity-50" />;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <TranslateText text="Resumen de Métricas" />
        </h3>
        <div className={`text-sm px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
          {data.length > 0 ? `Actualizado: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Sin datos'}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
              theme === 'dark'
                ? 'bg-gray-800/40 border-gray-700 hover:border-gray-600'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${
                theme === 'dark' ? stat.color.bgDark : stat.color.bgLight
              }`}>
                <stat.icon className={`w-5 h-5 ${theme === 'dark' ? stat.color.dark : stat.color.light}`} />
              </div>
              {stat.change && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  theme === 'dark' 
                    ? stat.changeType === 'positive' 
                      ? 'bg-emerald-900/30 text-emerald-400'
                      : stat.changeType === 'negative'
                      ? 'bg-rose-900/30 text-rose-400'
                      : 'bg-gray-700 text-gray-400'
                    : stat.changeType === 'positive'
                    ? 'bg-emerald-50 text-emerald-700'
                    : stat.changeType === 'negative'
                    ? 'bg-rose-50 text-rose-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {getChangeIcon(stat.changeType!)}
                  {stat.change}
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <p className={`text-sm font-medium truncate ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <TranslateText text={stat.label} />
              </p>
              <p className={`text-2xl font-bold ${
                theme === 'dark' ? stat.color.dark : stat.color.light
              }`}>
                {stat.value}
              </p>
              {stat.description && (
                <p className={`text-xs truncate ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {stat.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Barra de progreso de aceptación */}
      <div className={`mt-6 p-4 rounded-xl ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700' 
          : 'bg-gradient-to-r from-gray-50 to-white border border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            <TranslateText text="Distribución Global" />
          </span>
          <span className={`text-sm font-medium ${
            acceptanceRate >= 70 ? 'text-emerald-500' : 
            acceptanceRate >= 50 ? 'text-amber-500' : 
            'text-rose-500'
          }`}>
            {acceptanceRate.toFixed(1)}% <TranslateText text="aceptación" />
          </span>
        </div>
        <div className={`h-2 rounded-full overflow-hidden ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div 
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300"
            style={{ width: `${acceptanceRate}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500"><TranslateText text="Aceptados" /></span>
          <span className="text-xs text-gray-500"><TranslateText text="Rechazados" /></span>
        </div>
      </div>
    </div>
  );
}