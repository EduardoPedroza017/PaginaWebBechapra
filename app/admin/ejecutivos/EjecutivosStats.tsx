"use client";

import React from 'react';
import { Users, UserCheck, UserX, Camera, GraduationCap, Briefcase, TrendingUp } from 'lucide-react';
import { TranslateText } from '@/components/TranslateText';

interface EjecutivosStatsProps {
  stats: {
    total: number;
    activos: number;
    inactivos: number;
    con_foto: number;
    sin_foto: number;
    puestos: Array<{ _id: string; count: number }>;
    carreras: Array<{ _id: string; count: number }>;
  };
  theme: 'light' | 'dark';
}

export const EjecutivosStats: React.FC<EjecutivosStatsProps> = ({ stats, theme }) => {
  const statCards = [
    {
      title: "Total Ejecutivos",
      value: stats.total,
      icon: Users,
      color: "blue",
      description: "Ejecutivos registrados"
    },
    {
      title: "Activos",
      value: stats.activos,
      icon: UserCheck,
      color: "green",
      description: `${stats.total > 0 ? Math.round((stats.activos / stats.total) * 100) : 0}% del total`
    },
    {
      title: "Inactivos",
      value: stats.inactivos,
      icon: UserX,
      color: "red",
      description: `${stats.total > 0 ? Math.round((stats.inactivos / stats.total) * 100) : 0}% del total`
    },
    {
      title: "Con Foto",
      value: stats.con_foto,
      icon: Camera,
      color: "purple",
      description: `${stats.total > 0 ? Math.round((stats.con_foto / stats.total) * 100) : 0}% tienen foto`
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        icon: 'text-blue-600 dark:text-blue-400',
        value: 'text-blue-600 dark:text-blue-400'
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        icon: 'text-green-600 dark:text-green-400',
        value: 'text-green-600 dark:text-green-400'
      },
      red: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        icon: 'text-red-600 dark:text-red-400',
        value: 'text-red-600 dark:text-red-400'
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        icon: 'text-purple-600 dark:text-purple-400',
        value: 'text-purple-600 dark:text-purple-400'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Cards principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const colors = getColorClasses(stat.color);

          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    <TranslateText text={stat.title} />
                  </p>
                  <p className={`text-3xl font-bold mt-2 ${colors.value}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Distribuciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Puestos más comunes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <TranslateText text="Puestos Más Comunes" />
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <TranslateText text="Distribución por posiciones" />
              </p>
            </div>
          </div>

          {stats.puestos.length > 0 ? (
            <div className="space-y-3">
              {stats.puestos.slice(0, 5).map((puesto, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">
                    {puesto._id || 'Sin especificar'}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${stats.total > 0 ? (puesto.count / stats.total) * 100 : 0}%`
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-right">
                      {puesto.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                <TranslateText text="No hay datos de puestos" />
              </p>
            </div>
          )}
        </div>

        {/* Carreras más estudiadas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <TranslateText text="Carreras Más Estudiadas" />
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <TranslateText text="Formación académica" />
              </p>
            </div>
          </div>

          {stats.carreras.length > 0 ? (
            <div className="space-y-3">
              {stats.carreras.slice(0, 5).map((carrera, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">
                    {carrera._id || 'Sin especificar'}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${stats.total > 0 ? (carrera.count / stats.total) * 100 : 0}%`
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-right">
                      {carrera.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                <TranslateText text="No hay datos de carreras" />
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Resumen general */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            <TranslateText text="Resumen Ejecutivo" />
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.total > 0 ? Math.round((stats.activos / stats.total) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <TranslateText text="Tasa de actividad" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.total > 0 ? Math.round((stats.con_foto / stats.total) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <TranslateText text="Con perfil completo" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.puestos.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <TranslateText text="Puestos diferentes" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};