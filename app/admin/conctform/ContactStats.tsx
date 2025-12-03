"use client";

import { MessageSquare, Users, TrendingUp, Clock } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

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
  // Calcular estadísticas
  const totalMessages = messages.length;
  const filteredCount = filtered.length;
  
  // Emails únicos
  const uniqueEmails = new Set(messages.map(m => m.email)).size;
  
  // Mensajes esta semana
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeek = messages.filter(m => new Date(m.timestamp) >= oneWeekAgo).length;
  
  // Último mensaje
  const lastMessage = messages.length > 0 
    ? new Date(Math.max(...messages.map(m => new Date(m.timestamp).getTime())))
    : null;

  const stats = [
    {
      label: "Total Mensajes",
      value: totalMessages,
      icon: MessageSquare,
      color: "blue",
      bgColor: theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100',
      textColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      iconBg: theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'
    },
    {
      label: "Contactos Únicos",
      value: uniqueEmails,
      icon: Users,
      color: "green",
      bgColor: theme === 'dark' ? 'bg-green-600/20' : 'bg-green-100',
      textColor: theme === 'dark' ? 'text-green-400' : 'text-green-600',
      iconBg: theme === 'dark' ? 'bg-green-600' : 'bg-green-500'
    },
    {
      label: "Esta Semana",
      value: thisWeek,
      icon: TrendingUp,
      color: "purple",
      bgColor: theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-100',
      textColor: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
      iconBg: theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500'
    },
    {
      label: "Último Mensaje",
      value: lastMessage ? lastMessage.toLocaleDateString() : "-",
      icon: Clock,
      color: "amber",
      bgColor: theme === 'dark' ? 'bg-amber-600/20' : 'bg-amber-100',
      textColor: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
      iconBg: theme === 'dark' ? 'bg-amber-600' : 'bg-amber-500',
      isDate: true
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`rounded-2xl p-4 border transition-all hover:scale-[1.02] ${
            theme === 'dark' 
              ? 'bg-gray-900/80 border-gray-800' 
              : 'bg-white border-gray-100 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium truncate ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <TranslateText text={stat.label} />
              </p>
              <p className={`text-xl font-bold ${stat.textColor}`}>
                {stat.isDate ? stat.value : stat.value.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
