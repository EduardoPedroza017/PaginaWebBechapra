"use client";

import React from 'react';
import { User, Mail, Phone, Calendar, Briefcase, GraduationCap, FileText, Eye, Edit, Trash2, Camera, MapPin, Award, Clock } from 'lucide-react';
import type { Ejecutivo } from './hooks/useEjecutivos';

interface EjecutivosCardProps {
  ejecutivo: Ejecutivo;
  onView: (ejecutivo: Ejecutivo) => void;
  onEdit: (ejecutivo: Ejecutivo) => void;
  onDelete: (ejecutivo: Ejecutivo) => void;
  onUploadPhoto: (ejecutivo: Ejecutivo) => void;
  onToggleActive: (ejecutivo: Ejecutivo, activo: boolean) => void;
  theme: 'light' | 'dark';
}

export const EjecutivosCard: React.FC<EjecutivosCardProps> = ({
  ejecutivo,
  onView,
  onEdit,
  onDelete,
  onUploadPhoto,
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
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Header con imagen y overlay */}
      <div className="relative h-48 overflow-hidden">
        {/* Imagen de fondo o gradiente */}
        {ejecutivo.foto_url ? (
          <div className="relative h-full">
            <img
              src={ejecutivo.foto_url}
              alt={`${ejecutivo.nombre} ${ejecutivo.apellido_paterno}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-white/90">
                {getInitials(ejecutivo.nombre, ejecutivo.apellido_paterno)}
              </div>
            </div>
          </div>
        )}

        {/* Overlay con controles */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => onView(ejecutivo)}
              className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition-all"
              title="Ver detalles"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => onEdit(ejecutivo)}
              className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition-all"
              title="Editar"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Badge de estado */}
        <div className="absolute top-4 left-4 z-10">
          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg backdrop-blur-sm ${
            ejecutivo.activo 
              ? 'bg-green-500/90' 
              : 'bg-red-500/90'
          }`}>
            {ejecutivo.activo ? '● Activo' : '● Inactivo'}
          </div>
        </div>

        {/* Controles superiores */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {/* Toggle activo */}
          <label
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center cursor-pointer group/toggle"
            title={ejecutivo.activo ? 'Desactivar' : 'Activar'}
          >
            <input
              type="checkbox"
              checked={!!ejecutivo.activo}
              onChange={(e) => onToggleActive(ejecutivo, e.target.checked)}
              className="sr-only"
            />
            <div className={`w-12 h-6 flex items-center p-0.5 rounded-full transition-all shadow-lg backdrop-blur-sm ${
              ejecutivo.activo 
                ? 'bg-green-500/90' 
                : 'bg-gray-400/90'
            }`}>
              <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                ejecutivo.activo ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </div>
          </label>

          {/* Botón de cámara */}
          <button
            onClick={(e) => { e.stopPropagation(); onUploadPhoto(ejecutivo); }}
            className="bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full p-2.5 transition-all hover:scale-110 shadow-lg"
            title="Cambiar foto"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        {/* Nombre y puesto */}
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

        {/* Información en grid */}
        <div className="space-y-3 mb-4">
          {ejecutivo.email && (
            <div className="flex items-start gap-3 group/item">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-100 dark:group-hover/item:bg-blue-900/30 transition-colors">
                <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400" />
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
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-green-100 dark:group-hover/item:bg-green-900/30 transition-colors">
                <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover/item:text-green-600 dark:group-hover/item:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-0.5">Teléfono</p>
                <p className="text-sm text-gray-900 dark:text-white font-medium">
                  {ejecutivo.telefono}
                </p>
              </div>
            </div>
          )}

          {ejecutivo.fecha_nacimiento && (
            <div className="flex items-start gap-3 group/item">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-purple-100 dark:group-hover/item:bg-purple-900/30 transition-colors">
                <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-0.5">Fecha de Nacimiento</p>
                <p className="text-sm text-gray-900 dark:text-white font-medium">
                  {formatDate(ejecutivo.fecha_nacimiento)}
                  {age && <span className="text-gray-500 dark:text-gray-400 ml-2">({age} años)</span>}
                </p>
              </div>
            </div>
          )}

          {ejecutivo.carrera_estudiada && (
            <div className="flex items-start gap-3 group/item">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-orange-100 dark:group-hover/item:bg-orange-900/30 transition-colors">
                <GraduationCap className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover/item:text-orange-600 dark:group-hover/item:text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-0.5">Carrera</p>
                <p className="text-sm text-gray-900 dark:text-white truncate font-medium">
                  {ejecutivo.carrera_estudiada}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Biografía */}
        {ejecutivo.biografia && (
          <div className="mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Biografía</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                  {ejecutivo.biografia}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onView(ejecutivo)}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105"
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

          <button
            onClick={() => onDelete(ejecutivo)}
            className="px-4 py-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl transition-all duration-200 flex items-center justify-center text-sm font-semibold hover:scale-105"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer con última actualización */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          <span>Actualizado: {formatDate(ejecutivo.updated_at)}</span>
        </div>
      </div>
    </div>
  );
};