"use client";

import { FileText, Calendar, TrendingUp, Clock } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { PressItem } from "./page";

interface PressStatsProps {
  data: PressItem[];
  theme: 'light' | 'dark';
}

export default function PressStats({ data, theme }: PressStatsProps) {
  const totalPress = data.length;
  
  // Comunicados esta semana
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeek = data.filter(p => new Date(p.date) >= oneWeekAgo).length;
  
  // Comunicados este mes
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const thisMonth = data.filter(p => new Date(p.date) >= oneMonthAgo).length;
  
  // Último comunicado
  const lastPress = data.length > 0 
    ? new Date(Math.max(...data.map(p => new Date(p.date).getTime())))
    : null;

  const stats = [
    {
      label: "Total Comunicados",
      value: totalPress,
      icon: FileText,
      iconBg: theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500',
      textColor: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
    },
    {
      label: "Esta Semana",
      value: thisWeek,
      icon: TrendingUp,
      iconBg: theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500',
      textColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    },
    {
      label: "Este Mes",
      value: thisMonth,
      icon: Calendar,
      iconBg: theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500',
      textColor: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
    },
    {
      label: "Última Publicación",
      value: lastPress ? lastPress.toLocaleDateString() : "-",
      icon: Clock,
      iconBg: theme === 'dark' ? 'bg-amber-600' : 'bg-amber-500',
      textColor: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
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
              <p className={`text-xs font-semibold truncate ${
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
