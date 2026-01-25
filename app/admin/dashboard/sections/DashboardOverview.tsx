"use client";

import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { TranslateText } from '@/components/TranslateText';

interface DashboardOverviewProps {
  role: string;
  theme: 'light' | 'dark';
}

export function DashboardOverview({ role, theme }: DashboardOverviewProps) {
  const isDark = theme === 'dark';
  
  const getRoleDisplay = () => {
    switch (role) {
      case 'superadmin': return 'Super Administrador';
      case 'admin': return 'Administrador';
      case 'editor': return 'Editor';
      case 'viewer': return 'Solo Lectura';
      default: return role;
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 ${
      isDark 
        ? 'bg-gradient-to-br from-blue-900/50 to-slate-900 border border-slate-700/50' 
        : 'bg-gradient-to-br from-blue-50 to-white border border-blue-100'
    }`}>
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-400/10 to-transparent rounded-full blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-xl ${
                isDark ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <LayoutDashboard className={`w-5 h-5 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                role === 'superadmin' 
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                  : role === 'admin'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}>
                {getRoleDisplay()}
              </span>
            </div>
            
            <h2 className={`text-2xl font-bold mb-1 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <TranslateText text="Bienvenido al Panel" />
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <TranslateText text="Aquí tienes un resumen de tu sistema" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;

