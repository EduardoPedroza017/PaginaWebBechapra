"use client";

import React from 'react';
import { User, Mail, Phone, Calendar, Briefcase, GraduationCap, FileText, Eye, Edit, Trash2, Camera, MapPin, Award, Clock } from 'lucide-react';
import type { Ejecutivo } from './hooks/useEjecutivos';

interface EjecutivosCardProps {
  ejecutivo: Ejecutivo;
  onView: (ejecutivo: Ejecutivo) => void;
  onEdit: (ejecutivo: Ejecutivo) => void;
  onToggleActive: (ejecutivo: Ejecutivo, activo: boolean) => void;
  theme: 'light' | 'dark';
}

export const EjecutivosCard: React.FC<EjecutivosCardProps> = ({
  ejecutivo,
  onView,
  onEdit,
  onToggleActive,
  theme,
}) => {
  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificada';
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Fecha inválida';
    }
  };

  const getAge = (dateString?: string) => {
    if (!dateString) return null;
    try {
      const today = new Date();
      const birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } catch {
      return null;
    }
  };

  const age = getAge(ejecutivo.fecha_nacimiento);

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="relative h-48 md:h-auto md:w-1/3 overflow-hidden">
        {ejecutivo.foto_url ? (
          <div className="relative h-full">
            <img
              src={ejecutivo.foto_url}
              alt={`${ejecutivo.nombre} ${ejecutivo.apellido_paterno}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-500 via-blue-600 to-purple-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-white/90">
                {getInitials(ejecutivo.nombre, ejecutivo.apellido_paterno)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
              {ejecutivo.nombre} {ejecutivo.apellido_paterno}
              {ejecutivo.apellido_materno && ` ${ejecutivo.apellido_materno}`}
            </h3>
            {ejecutivo.puesto && (
              <div className="flex items-center gap-2 text-sm">
                <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium inline-flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  {ejecutivo.puesto}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 mb-4">
            {ejecutivo.email && (
              <div className="flex items-start gap-3 group/item">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0 group-hover:item:bg-blue-100 dark:group-hover:item:bg-blue-900/30 transition-colors">
                  <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:item:text-blue-600 dark:group-hover:item:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-0.5">Email</p>
                  <p className="text-sm text-gray-900 dark:text-white truncate font-medium">
                    {ejecutivo.email}
                  </p>
                </div>
              </div>
            )}

            {ejecutivo.telefono && (
              <div className="flex items-start gap-3 group/item">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0 group-hover:item:bg-green-100 dark:group-hover:item:bg-green-900/30 transition-colors">
                  <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:item:text-green-600 dark:group-hover:item:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-0.5">Teléfono</p>
                  <p className="text-sm text-gray-900 dark:text-white font-medium">
                    {ejecutivo.telefono}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {ejecutivo.descripcion && (
            <div className="mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Descripción</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                    {ejecutivo.descripcion}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onView(ejecutivo)}
            className="flex-1 px-4 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105"
          >
            <Eye className="w-4 h-4" />
            Ver Perfil
          </button>

          <button
            onClick={() => onEdit(ejecutivo)}
            className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold hover:scale-105"
            title="Editar"
          >
            <Edit className="w-4 h-4" />
          </button>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={ejecutivo.activo}
              onChange={(e) => onToggleActive(ejecutivo, e.target.checked)}
              className="toggle-checkbox hidden"
            />
            <div className="toggle-slot w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner flex items-center transition-all duration-200">
              <div
                className={`toggle-circle w-6 h-6 bg-white dark:bg-gray-300 rounded-full shadow-md transform transition-transform duration-200 ${
                  ejecutivo.activo ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {ejecutivo.activo ? 'Activo' : 'Inactivo'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};