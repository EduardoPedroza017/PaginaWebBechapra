"use client";

import { Newspaper, Calendar, TrendingUp, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { NewsItem } from "./types";

interface NewsStatsProps {
  news: NewsItem[];
  filtered: NewsItem[];
  theme: 'light' | 'dark';
}

export function NewsStats({ news, filtered, theme }: NewsStatsProps) {
  const totalNews = news.length;
  const isDark = theme === 'dark';
  
  // Noticias esta semana
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeek = news.filter(n => new Date(n.date) >= oneWeekAgo).length;
  
  // Noticias semana pasada (para tendencia)
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const lastWeek = news.filter(n => {
    const d = new Date(n.date);
    return d >= twoWeeksAgo && d < oneWeekAgo;
  }).length;

  const weeklyGrowth = lastWeek > 0 
    ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) 
    : thisWeek > 0 ? 100 : 0;
  
  // Noticias este mes
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const thisMonth = news.filter(n => new Date(n.date) >= oneMonthAgo).length;
  
  // Última noticia
  const lastNews = news.length > 0 
    ? new Date(Math.max(...news.map(n => new Date(n.date).getTime())))
    : null;

  const stats = [
    {
      label: "Total Noticias",
      value: totalNews,
      icon: Newspaper,
      gradient: isDark ? 'from-blue-600 to-blue-800' : 'from-blue-500 to-blue-600',
      iconColor: 'text-white',
      trend: "+12%", // Mock trend for total
      trendUp: true
    },
    {
      label: "Esta Semana",
      value: thisWeek,
      icon: TrendingUp,
      gradient: isDark ? 'from-green-600 to-green-800' : 'from-green-500 to-green-600',
      iconColor: 'text-white',
      trend: `${weeklyGrowth > 0 ? '+' : ''}${weeklyGrowth}%`,
      trendUp: weeklyGrowth >= 0
    },
    {
      label: "Este Mes",
      value: thisMonth,
      icon: Calendar,
      gradient: isDark ? 'from-purple-600 to-purple-800' : 'from-purple-500 to-purple-600',
      iconColor: 'text-white',
      trend: "Estable",
      trendUp: true
    },
    {
      label: "Última Publicación",
      value: lastNews ? lastNews.toLocaleDateString() : "-",
      icon: Clock,
      gradient: isDark ? 'from-amber-600 to-amber-800' : 'from-amber-500 to-amber-600',
      iconColor: 'text-white',
      isDate: true
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`
            relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1
            ${isDark 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-white border-gray-100 shadow-sm'
            }
          `}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <TranslateText text={stat.label} />
              </p>
              <h4 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.isDate ? stat.value : stat.value.toLocaleString()}
              </h4>
            </div>
            <div className={`
              p-3 rounded-xl bg-gradient-to-br shadow-lg ${stat.gradient}
            `}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>

          {!stat.isDate && (
            <div className="mt-4 flex items-center gap-2">
              <span className={`
                text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1
                ${stat.trendUp 
                  ? (isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600')
                  : (isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600')
                }
              `}>
                {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </span>
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                vs periodo anterior
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
