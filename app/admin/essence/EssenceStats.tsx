"use client";

import { Target, Eye, Heart, Clock } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface Essence {
  mision: string;
  vision: string;
  valores: string;
}

interface EssenceStatsProps {
  essence: Essence;
  lastUpdate?: string;
  theme: 'light' | 'dark';
}

export default function EssenceStats({ essence, lastUpdate, theme }: EssenceStatsProps) {
  const stats = [
    {
      label: "Misión",
      value: essence.mision ? `${essence.mision.split(' ').length} palabras` : "Sin definir",
      icon: Target,
      color: theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500',
      textColor: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
      hasContent: !!essence.mision,
    },
    {
      label: "Visión",
      value: essence.vision ? `${essence.vision.split(' ').length} palabras` : "Sin definir",
      icon: Eye,
      color: theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500',
      textColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      hasContent: !!essence.vision,
    },
    {
      label: "Valores",
      value: essence.valores ? `${essence.valores.split(' ').length} palabras` : "Sin definir",
      icon: Heart,
      color: theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500',
      textColor: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
      hasContent: !!essence.valores,
    },
    {
      label: "Última Actualización",
      value: lastUpdate || "—",
      icon: Clock,
      color: theme === 'dark' ? 'bg-amber-600' : 'bg-amber-500',
      textColor: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
      isDate: true,
    },
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
            <div className={`p-2.5 rounded-xl ${stat.color}`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold truncate ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <TranslateText text={stat.label} />
              </p>
              <p className={`text-sm font-bold truncate ${stat.textColor}`}>
                {stat.isDate ? stat.value : <TranslateText text={stat.value} />}
              </p>
            </div>
            {!stat.isDate && (
              <div className={`w-2 h-2 rounded-full ${
                stat.hasContent 
                  ? 'bg-green-500' 
                  : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
