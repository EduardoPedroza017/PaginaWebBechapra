"use client";

import React from "react";
import { Sparkles, Calendar, ArrowUpRight, Shield, Bell, Clock, Zap } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface WelcomeCardProps {
  role: string;
  theme?: 'light' | 'dark';
  userName?: string;
  lastLogin?: string;
  unreadNotifications?: number;
}

export function WelcomeCard({ 
  role, 
  theme = 'light', 
  userName, 
  lastLogin,
  unreadNotifications = 0
}: WelcomeCardProps) {
  const isDark = theme === "dark";
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "☀️";
    if (hour < 18) return "⛅";
    return "🌙";
  };

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return "Nunca";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Ahora";
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffMins < 1440) return `Hace ${Math.floor(diffMins / 60)} h`;
    return `Hace ${Math.floor(diffMins / 1440)} d`;
  };

  const getRoleDisplay = () => {
    switch (role) {
      case 'superadmin': return { text: 'Super Admin', color: 'purple' };
      case 'admin': return { text: 'Administrador', color: 'blue' };
      case 'editor': return { text: 'Editor', color: 'green' };
      case 'viewer': return { text: 'Solo Lectura', color: 'gray' };
      default: return { text: 'Usuario', color: 'gray' };
    }
  };

  const roleInfo = getRoleDisplay();

  return (
    <div className="space-y-4">
      {/* Main Welcome Card */}
      <div className={`relative overflow-hidden rounded-xl border ${
        isDark 
          ? "bg-gradient-to-br from-gray-800/90 via-gray-800/90 to-gray-900/90 border-gray-700" 
          : "bg-gradient-to-br from-white via-white to-blue-50/30 border-gray-200 shadow-sm"
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 w-64 h-64">
            <div className="w-full h-full bg-grid-pattern" />
          </div>
        </div>

        <div className="relative p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
            {/* Left Section - Greeting & Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl ${
                  isDark ? 'bg-blue-900/30' : 'bg-blue-100'
                }`}>
                  <Sparkles className={`w-5 h-5 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h1 className={`text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <TranslateText text="Panel de Control" />
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-2xl md:text-3xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {getGreetingEmoji()} <TranslateText text={getGreeting()} />
                    </span>
                    {userName && (
                      <span className={`text-2xl md:text-3xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        , {userName}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className={`text-sm md:text-base mb-6 max-w-2xl ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <TranslateText text="Gestión centralizada de contenido y administración del sitio web" />
              </p>

              {/* Info Cards */}
              <div className="flex flex-wrap gap-3">
                {/* Date Card */}
                <div className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg ${
                  isDark ? 'bg-gray-800/50' : 'bg-white border border-gray-200'
                }`}>
                  <Calendar className={`w-4 h-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <div>
                    <div className={`text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <TranslateText text="Hoy es" />
                    </div>
                    <div className={`text-sm font-medium capitalize ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {today}
                    </div>
                  </div>
                </div>

                {/* Role Card */}
                <div className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg ${
                  isDark 
                    ? 'bg-gray-800/50' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <Shield className={`w-4 h-4 ${
                    roleInfo.color === 'purple' ? (isDark ? 'text-purple-400' : 'text-purple-600') :
                    roleInfo.color === 'blue' ? (isDark ? 'text-blue-400' : 'text-blue-600') :
                    roleInfo.color === 'green' ? (isDark ? 'text-green-400' : 'text-green-600') :
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <div>
                    <div className={`text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <TranslateText text="Tu rol" />
                    </div>
                    <div className={`text-sm font-semibold ${
                      roleInfo.color === 'purple' ? (isDark ? 'text-purple-400' : 'text-purple-700') :
                      roleInfo.color === 'blue' ? (isDark ? 'text-blue-400' : 'text-blue-700') :
                      roleInfo.color === 'green' ? (isDark ? 'text-green-400' : 'text-green-700') :
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <TranslateText text={roleInfo.text} />
                    </div>
                  </div>
                </div>

                {/* Last Login */}
                {lastLogin && (
                  <div className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg ${
                    isDark ? 'bg-gray-800/50' : 'bg-white border border-gray-200'
                  }`}>
                    <Clock className={`w-4 h-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <div>
                      <div className={`text-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <TranslateText text="Último acceso" />
                      </div>
                      <div className={`text-sm font-medium ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {formatTimeAgo(lastLogin)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Quick Tip */}
            <div className={`lg:block w-full md:w-auto md:min-w-[280px] p-4 rounded-lg ${
              isDark ? 'bg-gray-800/30 border border-gray-700' : 'bg-white/80 border border-gray-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${
                  isDark ? 'bg-emerald-900/30' : 'bg-emerald-100'
                }`}>
                  <Zap className={`w-4 h-4 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-sm font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      <TranslateText text="Consejo rápido" />
                    </h3>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}>
                      Nuevo
                    </span>
                  </div>
                  <p className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <TranslateText text="Usa los atajos rápidos en el panel lateral para acceder rápidamente a las secciones más utilizadas." />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className={`px-5 md:px-6 py-3 border-t ${
          isDark ? 'border-gray-700 bg-gray-900/30' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isDark ? 'bg-emerald-500' : 'bg-emerald-400'
                }`} />
                <span className="text-xs">
                  <TranslateText text="Sistema operativo" />
                </span>
              </div>
              <div className={`text-xs hidden sm:block ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {new Date().toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
            </div>

            {/* Notifications Badge */}
            {unreadNotifications > 0 && (
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Bell className={`w-3.5 h-3.5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                  isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                }`}>
                  {unreadNotifications}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Optional: Quick Stats Bar (empty state) */}
      <div className={`rounded-lg border px-4 py-3 ${
        isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-blue-50/50 border-blue-100'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowUpRight className={`w-4 h-4 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <span className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <TranslateText text="Comienza gestionando tu contenido desde las secciones principales" />
            </span>
          </div>
          <button className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
            isDark 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
          }`}>
            <TranslateText text="Ver tutorial" />
          </button>
        </div>
      </div>

      {/* CSS for grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, ${isDark ? '#374151' : '#e5e7eb'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? '#374151' : '#e5e7eb'} 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}