"use client";

import { MessageSquare, Users, TrendingUp, Clock, TrendingDown, Target } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { useEffect, useState } from "react";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface ContactStatsProps {
  messages: ContactMessage[];
  filtered: ContactMessage[];
  theme: 'light' | 'dark';
}

export function ContactStats({ messages, filtered, theme }: ContactStatsProps) {
  const [previousStats, setPreviousStats] = useState({
    total: 0,
    unique: 0,
    weekly: 0
  });

  // Calcular estadísticas actuales
  const totalMessages = messages.length;
  const filteredCount = filtered.length;
  const uniqueEmails = new Set(messages.map(m => m.email)).size;
  
  // Mensajes esta semana
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeek = messages.filter(m => new Date(m.timestamp) >= oneWeekAgo).length;
  
  // Último mensaje
  const lastMessage = messages.length > 0 
    ? new Date(Math.max(...messages.map(m => new Date(m.timestamp).getTime())))
    : null;
  
  // Mensajes hoy
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayMessages = messages.filter(m => new Date(m.timestamp) >= today).length;
  
  // Tasa de crecimiento (comparar con última semana completa)
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const weekBefore = messages.filter(m => {
    const date = new Date(m.timestamp);
    return date >= twoWeeksAgo && date < oneWeekAgo;
  }).length;
  
  const growthRate = weekBefore > 0 
    ? ((thisWeek - weekBefore) / weekBefore * 100).toFixed(1)
    : thisWeek > 0 ? "100" : "0";

  // Calcular tendencia
  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  const stats = [
    {
      id: "total",
      label: "Total Mensajes",
      value: totalMessages,
      description: filteredCount === totalMessages ? "Todos los registros" : `${filteredCount} filtrados`,
      icon: MessageSquare,
      color: "blue",
      trend: null,
      bgColor: theme === 'dark' 
        ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/20' 
        : 'bg-gradient-to-br from-blue-50 to-blue-100/50',
      borderColor: theme === 'dark' ? 'border-blue-800/50' : 'border-blue-200',
      iconBg: theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500',
      iconColor: "text-blue-500"
    },
    {
      id: "unique",
      label: "Contactos Únicos",
      value: uniqueEmails,
      description: `${((uniqueEmails / totalMessages) * 100 || 0).toFixed(1)}% de reutilización`,
      icon: Users,
      color: "green",
      trend: null,
      bgColor: theme === 'dark' 
        ? 'bg-gradient-to-br from-emerald-900/30 to-emerald-800/20' 
        : 'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
      borderColor: theme === 'dark' ? 'border-emerald-800/50' : 'border-emerald-200',
      iconBg: theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500',
      iconColor: "text-emerald-500"
    },
    {
      id: "activity",
      label: "Actividad Semanal",
      value: thisWeek,
      description: `Hoy: ${todayMessages} mensajes`,
      icon: TrendingUp,
      color: "purple",
      trend: getTrendIcon(parseFloat(growthRate)),
      trendText: `${growthRate}% vs semana anterior`,
      bgColor: theme === 'dark' 
        ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/20' 
        : 'bg-gradient-to-br from-purple-50 to-purple-100/50',
      borderColor: theme === 'dark' ? 'border-purple-800/50' : 'border-purple-200',
      iconBg: theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500',
      iconColor: "text-purple-500"
    },
    {
      id: "last",
      label: "Última Actividad",
      value: lastMessage ? lastMessage.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short' 
      }) : "-",
      description: lastMessage ? lastMessage.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }) : "Sin actividad",
      icon: Clock,
      color: "amber",
      trend: null,
      bgColor: theme === 'dark' 
        ? 'bg-gradient-to-br from-amber-900/30 to-amber-800/20' 
        : 'bg-gradient-to-br from-amber-50 to-amber-100/50',
      borderColor: theme === 'dark' ? 'border-amber-800/50' : 'border-amber-200',
      iconBg: theme === 'dark' ? 'bg-amber-600' : 'bg-amber-500',
      iconColor: "text-amber-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
            stat.bgColor
          } ${stat.borderColor}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.iconBg} shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            {stat.trend && (
              <div className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white/80'
              }`}>
                {stat.trend}
                {stat.trendText && (
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    {stat.trendText}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <p className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.value}
              </p>
              <span className={`text-sm font-medium ${stat.iconColor}`}>
                {stat.id === 'activity' && 'esta semana'}
                {stat.id === 'last' && 'último contacto'}
              </span>
            </div>
            
            <p className={`text-sm font-semibold ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <TranslateText text={stat.label} />
            </p>
            
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {stat.description}
            </p>
          </div>
          
          {/* Barra de progreso para algunos stats */}
          {(stat.id === 'total' || stat.id === 'unique') && (
            <div className="mt-4">
              <div className={`h-1.5 rounded-full overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    stat.id === 'total' ? 'bg-blue-500' : 'bg-emerald-500'
                  }`}
                  style={{ 
                    width: stat.id === 'total' 
                      ? '100%' 
                      : `${(Number(stat.value) / (Number(totalMessages) || 1)) * 100}%` 
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}