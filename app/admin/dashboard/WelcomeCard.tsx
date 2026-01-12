"use client";

import React from "react";
import { Shield } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface WelcomeCardProps {
  role: string;
  theme?: 'light' | 'dark';
  userName?: string;
}

export function WelcomeCard({ 
  role, 
  theme = 'light', 
  userName
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
    <div className={`p-4 rounded-lg border ${
      isDark 
        ? "bg-slate-900 border-slate-700" 
        : "bg-white border-slate-200"
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          isDark ? 'bg-slate-800' : 'bg-slate-100'
        }`}>
          <span className="text-lg">{getGreetingEmoji()}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <h1 className={`text-base font-semibold truncate ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <span className="hidden sm:inline">{getGreetingEmoji()} </span>
              <TranslateText text={getGreeting()} />
              {userName && <span>, {userName}</span>}
            </h1>
            
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                isDark 
                  ? 'bg-slate-800 text-slate-300' 
                  : 'bg-slate-100 text-slate-700'
              }`}>
                <Shield className={`w-3.5 h-3.5 ${
                  role === 'superadmin' ? 'text-purple-500' :
                  role === 'admin' ? 'text-blue-500' :
                  role === 'editor' ? 'text-green-500' :
                  'text-slate-500'
                }`} />
                <span className="text-xs font-medium">
                  <TranslateText text={roleInfo.text} />
                </span>
              </div>
            </div>
          </div>
          
          <p className={`text-xs mt-1 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Bienvenido al sistema de gestión de BAUSEN
          </p>
        </div>
      </div>
    </div>
  );
}