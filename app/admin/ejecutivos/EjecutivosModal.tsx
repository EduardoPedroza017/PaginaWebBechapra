"use client";

import React from 'react';
import { X, User, Mail, Phone, Calendar, Briefcase, GraduationCap, FileText, Camera, Edit, MapPin, Award } from 'lucide-react';
import { Ejecutivo } from './hooks/useEjecutivos';
import { TranslateText } from '@/components/TranslateText';

interface EjecutivosModalProps {
  ejecutivo: Ejecutivo | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (ejecutivo: Ejecutivo) => void;
  onUploadPhoto: (ejecutivo: Ejecutivo) => void;
  theme: 'light' | 'dark';
}

export const EjecutivosModal: React.FC<EjecutivosModalProps> = ({
  ejecutivo,
  isOpen,
  onClose,
  onEdit,
  onUploadPhoto,
  theme,
}) => {
  if (!isOpen || !ejecutivo) return null;

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificada';
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Fecha inválida';
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Fecha inválida';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
        
        {/* Header con azul semi-oscuro */}
        <div className="relative">
          {/* Background - Azul semi-oscuro sólido */}
          <div className="h-48 bg-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00SDB2NGgzMnYtNHptMCA4aDB2LTRIMHY0aDM2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all duration-200 flex items-center justify-center z-10 hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Profile section */}
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-12 px-8">
            <div className="flex items-end gap-6">
              {/* Foto grande */}
              <div className="relative group">
                {ejecutivo.foto_url ? (
                  <div className="relative w-36 h-36 rounded-xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-2xl bg-white dark:bg-gray-800">
                    <img
                      src={ejecutivo.foto_url}
                      alt={`${ejecutivo.nombre} ${ejecutivo.apellido_paterno}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => onUploadPhoto(ejecutivo)}
                      className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-sm"
                    >
                      <Camera className="w-7 h-7 text-white" />
                      <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-lg">
                        <TranslateText text="Cambiar foto" />
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="relative w-36 h-36 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-5xl border-4 border-white dark:border-gray-900 shadow-2xl">
                    {getInitials(ejecutivo.nombre, ejecutivo.apellido_paterno)}
                    <button
                      onClick={() => onUploadPhoto(ejecutivo)}
                      className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex flex-col items-center justify-center gap-2 backdrop-blur-sm"
                    >
                      <Camera className="w-7 h-7 text-white" />
                      <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-lg">
                        <TranslateText text="Subir foto" />
                      </span>
                    </button>
                  </div>
                )}

                {/* Estado activo/inactivo */}
                <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 shadow-lg flex items-center justify-center ${
                  ejecutivo.activo ? 'bg-emerald-500' : 'bg-rose-500'
                }`}>
                  <div className={`w-3 h-3 rounded-full bg-white ${ejecutivo.activo ? 'animate-pulse' : ''}`} />
                </div>
              </div>

              {/* Info principal - Expandido horizontalmente */}
              <div className="flex-1 pb-4">
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl px-8 py-5 shadow-2xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {ejecutivo.nombre} {ejecutivo.apellido_paterno}
                        {ejecutivo.apellido_materno && ` ${ejecutivo.apellido_materno}`}
                      </h1>

                      <div className="flex items-center flex-wrap gap-4 mt-3">
                        {ejecutivo.puesto && (
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-semibold">{ejecutivo.puesto}</span>
                          </div>
                        )}

                        {ejecutivo.edad && (
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">{ejecutivo.edad} años</span>
                          </div>
                        )}

                        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                          ejecutivo.activo 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' 
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'
                        }`}>
                          <div className={`w-2.5 h-2.5 rounded-full ${ejecutivo.activo ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          {ejecutivo.activo ? <TranslateText text="Activo" /> : <TranslateText text="Inactivo" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón editar */}
              <div className="pb-4">
                <button
                  onClick={() => onEdit(ejecutivo)}
                  className="px-7 py-3.5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                >
                  <Edit className="w-5 h-5" />
                  <TranslateText text="Editar ejecutivo" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido con scroll - Expandido horizontalmente */}
        <div className="flex-1 overflow-y-auto mt-20 px-8 pb-8">
          
          {/* Grid de información - 3 columnas en pantallas grandes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Información Personal */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  <TranslateText text="Información Personal" />
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0 shadow-md border border-slate-200 dark:border-slate-700">
                    <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <TranslateText text="Nombre completo" />
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">
                      {ejecutivo.nombre} {ejecutivo.apellido_paterno} {ejecutivo.apellido_materno}
                    </p>
                  </div>
                </div>

                {ejecutivo.fecha_nacimiento && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0 shadow-md border border-slate-200 dark:border-slate-700">
                      <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <TranslateText text="Fecha de nacimiento" />
                      </p>
                      <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">
                        {formatDate(ejecutivo.fecha_nacimiento)}
                        {ejecutivo.edad && (
                          <span className="text-slate-500 dark:text-slate-400 ml-2 font-normal">
                            ({ejecutivo.edad} años)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {ejecutivo.carrera_estudiada && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0 shadow-md border border-slate-200 dark:border-slate-700">
                      <GraduationCap className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <TranslateText text="Carrera estudiada" />
                      </p>
                      <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">
                        {ejecutivo.carrera_estudiada}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  <TranslateText text="Contacto" />
                </h3>
              </div>

              <div className="space-y-4">
                {ejecutivo.email && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0 shadow-md border border-blue-200 dark:border-blue-700">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider">
                        <TranslateText text="Email" />
                      </p>
                      <a
                        href={`mailto:${ejecutivo.email}`}
                        className="text-base font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline mt-1 block transition-colors truncate"
                      >
                        {ejecutivo.email}
                      </a>
                    </div>
                  </div>
                )}

                {ejecutivo.telefono && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0 shadow-md border border-blue-200 dark:border-blue-700">
                      <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider">
                        <TranslateText text="Teléfono" />
                      </p>
                      <a
                        href={`tel:${ejecutivo.telefono}`}
                        className="text-base font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline mt-1 block transition-colors"
                      >
                        {ejecutivo.telefono}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Información Profesional */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  <TranslateText text="Información Profesional" />
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0 shadow-md border border-slate-200 dark:border-slate-700">
                    <Briefcase className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <TranslateText text="Puesto" />
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">
                      {ejecutivo.puesto || 'No especificado'}
                    </p>
                  </div>
                </div>

                {ejecutivo.carrera_estudiada && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0 shadow-md border border-slate-200 dark:border-slate-700">
                      <GraduationCap className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <TranslateText text="Formación" />
                      </p>
                      <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">
                        {ejecutivo.carrera_estudiada}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Biografía - Ancho completo */}
          {ejecutivo.biografia && (
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  <TranslateText text="Biografía" />
                </h3>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
                  {ejecutivo.biografia}
                </p>
              </div>
            </div>
          )}

          {/* Información del sistema */}
          <div className="bg-slate-50/80 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <TranslateText text="Información del Sistema" />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  <TranslateText text="Creado:" />
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatDateTime(ejecutivo.created_at)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  <TranslateText text="Actualizado:" />
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatDateTime(ejecutivo.updated_at)}
                </span>
              </div>
              {ejecutivo.foto_version && (
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    <TranslateText text="Versión de foto:" />
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {ejecutivo.foto_version}
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">ID del ejecutivo:</span>
                <span className="font-mono text-sm text-gray-700 dark:text-gray-400 bg-slate-200 dark:bg-slate-800 px-3 py-2 rounded-lg truncate">
                  {ejecutivo._id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};