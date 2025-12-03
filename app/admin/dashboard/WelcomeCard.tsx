"use client";

import React from "react";
import { Sparkles, Calendar, ArrowUpRight } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface WelcomeCardProps {
  role: string;
  theme?: 'light' | 'dark';
  userName?: string;
}

export function WelcomeCard({ role, theme = 'light', userName }: WelcomeCardProps) {
  const isDark = theme === "dark";
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <section
      className={`relative overflow-hidden rounded-2xl p-6 md:p-8 mb-6 border ${
        isDark 
          ? "bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/30 border-gray-800" 
          : "bg-gradient-to-br from-white via-blue-50/50 to-indigo-100/50 border-gray-100 shadow-sm"
      }`}
    >
      {/* Decorative elements */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 ${
        isDark ? 'bg-blue-500' : 'bg-blue-400'
      }`} />
      <div className={`absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-10 ${
        isDark ? 'bg-purple-500' : 'bg-indigo-400'
      }`} />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-amber-600/20' : 'bg-amber-100'}`}>
              <Sparkles className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
              <TranslateText text="Panel de Administración" />
            </span>
          </div>
          
          <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            <TranslateText text={getGreeting()} />{userName ? `, ${userName}` : ''} 
          </h1>
          
          <p className={`text-base mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            <TranslateText text="Gestiona el contenido de tu sitio web desde aquí." />
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              isDark ? 'bg-gray-800/50' : 'bg-white/80'
            }`}>
              <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm capitalize ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {today}
              </span>
            </div>
            
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              isDark 
                ? role === 'superadmin' ? 'bg-purple-600/20' : 'bg-blue-600/20'
                : role === 'superadmin' ? 'bg-purple-100' : 'bg-blue-100'
            }`}>
              <span className={`text-sm font-semibold ${
                isDark 
                  ? role === 'superadmin' ? 'text-purple-400' : 'text-blue-400'
                  : role === 'superadmin' ? 'text-purple-700' : 'text-blue-700'
              }`}>
                {role === 'superadmin' ? <TranslateText text="Super Admin" /> : <TranslateText text="Administrador" />}
              </span>
            </div>
          </div>
        </div>

        {/* Quick tip */}
        <div className={`hidden lg:block max-w-xs p-4 rounded-xl ${
          isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-gray-200'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg shrink-0 ${isDark ? 'bg-emerald-600/20' : 'bg-emerald-100'}`}>
              <ArrowUpRight className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
            <div>
              <p className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Consejo rápido" />
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <TranslateText text="Usa los accesos rápidos para navegar más eficientemente entre secciones." />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
