"use client";

import React from "react";
import { Shield, Sun, Cloud, Moon, ChevronRight } from "lucide-react";
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

  const getGreetingIcon = () => {
    const hour = new Date().getHours();
    if (hour < 12) return Sun;
    if (hour < 18) return Cloud;
    return Moon;
  };

  const getRoleDisplay = () => {
    switch (role) {
      case 'superadmin': return { 
        text: 'Super Admin', 
        color: isDark ? 'text-purple-400' : 'text-purple-600',
        bgColor: isDark ? 'bg-purple-900/30' : 'bg-purple-50'
      };
      case 'admin': return { 
        text: 'Administrador', 
        color: isDark ? 'text-blue-400' : 'text-blue-600',
        bgColor: isDark ? 'bg-blue-900/30' : 'bg-blue-50'
      };
      case 'editor': return { 
        text: 'Editor', 
        color: isDark ? 'text-emerald-400' : 'text-emerald-600',
        bgColor: isDark ? 'bg-emerald-900/30' : 'bg-emerald-50'
      };
      case 'viewer': return { 
        text: 'Solo Lectura', 
        color: isDark ? 'text-slate-400' : 'text-slate-600',
        bgColor: isDark ? 'bg-slate-800' : 'bg-slate-100'
      };
      default: return { 
        text: 'Usuario', 
        color: isDark ? 'text-slate-400' : 'text-slate-600',
        bgColor: isDark ? 'bg-slate-800' : 'bg-slate-100'
      };
    }
  };

  const roleInfo = getRoleDisplay();
  const GreetingIcon = getGreetingIcon();

  return (
    <div className={`p-5 rounded-xl border transition-colors ${
      isDark 
        ? "bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700" 
        : "bg-gradient-to-br from-white to-slate-50 border-slate-200"
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-lg ${roleInfo.bgColor}`}>
            <GreetingIcon className={`w-5 h-5 ${
              isDark ? 'text-amber-400' : 'text-amber-600'
            }`} />
          </div>
          
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className={`text-lg font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <TranslateText text={getGreeting()} />
                {userName && (
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    , {userName}
                  </span>
                )}
              </h1>
              
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${roleInfo.bgColor}`}>
                <Shield className={`w-3.5 h-3.5 ${roleInfo.color}`} />
                <span className={`text-xs font-medium ${roleInfo.color}`}>
                  <TranslateText text={roleInfo.text} />
                </span>
              </div>
            </div>
            
            <p className={`text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Bienvenido al sistema de gestión de Bausen
            </p>
            
            <div className="flex items-center gap-1 pt-1">
              <span className={`text-xs font-medium ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>
                Último acceso: Hoy, {new Date().toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
              <ChevronRight className="w-3 h-3 text-slate-500" />
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center">
          <div className={`w-2 h-16 rounded-full ${
            role === 'superadmin' ? 'bg-gradient-to-b from-blue-500 to-blue-600' :
            role === 'admin' ? 'bg-gradient-to-b from-blue-500 to-blue-600' :
            role === 'editor' ? 'bg-gradient-to-b from-emerald-500 to-emerald-600' :
            'bg-gradient-to-b from-slate-500 to-slate-600'
          }`} />
        </div>
      </div>
    </div>
  );
}