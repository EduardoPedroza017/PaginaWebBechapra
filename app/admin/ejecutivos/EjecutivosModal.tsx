"use client";

import React from 'react';
import { X, User, Mail, Phone, Calendar, Briefcase, GraduationCap, FileText, MapPin, Camera, Edit } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-6">
            {/* Foto o avatar grande */}
            <div className="relative">
              {ejecutivo.foto_url ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600">
                  <img
                    src={ejecutivo.foto_url}
                    alt={`${ejecutivo.nombre} ${ejecutivo.apellido_paterno}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => onUploadPhoto(ejecutivo)}
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-full"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                </div>
              ) : (
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl border-4 border-gray-200 dark:border-gray-600">
                  {getInitials(ejecutivo.nombre, ejecutivo.apellido_paterno)}
                  <button
                    onClick={() => onUploadPhoto(ejecutivo)}
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-full flex items-center justify-center"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                </div>
              )}

              {/* Estado activo/inactivo */}
              <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 ${
                ejecutivo.activo ? 'bg-green-500' : 'bg-red-500'
              }`} />
            </div>

            {/* Información principal */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {ejecutivo.nombre} {ejecutivo.apellido_paterno}
                    {ejecutivo.apellido_materno && ` ${ejecutivo.apellido_materno}`}
                  </h1>

                  {ejecutivo.puesto && (
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      {ejecutivo.puesto}
                    </p>
                  )}

                  {ejecutivo.edad && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      {ejecutivo.edad} años
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(ejecutivo)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    <TranslateText text="Editar" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Información Personal */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <TranslateText text="Información Personal" />
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <User className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <TranslateText text="Nombre completo" />
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {ejecutivo.nombre} {ejecutivo.apellido_paterno} {ejecutivo.apellido_materno}
                    </p>
                  </div>
                </div>

                {ejecutivo.fecha_nacimiento && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <TranslateText text="Fecha de nacimiento" />
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatDate(ejecutivo.fecha_nacimiento)}
                        {ejecutivo.edad && ` (${ejecutivo.edad} años)`}
                      </p>
                    </div>
                  </div>
                )}

                {ejecutivo.carrera_estudiada && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <TranslateText text="Carrera estudiada" />
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {ejecutivo.carrera_estudiada}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Información de Contacto */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-600" />
                <TranslateText text="Información de Contacto" />
              </h3>

              <div className="space-y-4">
                {ejecutivo.email && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <TranslateText text="Email" />
                      </p>
                      <a
                        href={`mailto:${ejecutivo.email}`}
                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {ejecutivo.email}
                      </a>
                    </div>
                  </div>
                )}

                {ejecutivo.telefono && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <TranslateText text="Teléfono" />
                      </p>
                      <a
                        href={`tel:${ejecutivo.telefono}`}
                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {ejecutivo.telefono}
                      </a>
                    </div>
                  </div>
                )}

                {/* Estado */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    ejecutivo.activo ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <TranslateText text="Estado" />
                    </p>
                    <p className={`font-medium ${
                      ejecutivo.activo ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {ejecutivo.activo ? <TranslateText text="Activo" /> : <TranslateText text="Inactivo" />}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biografía */}
          {ejecutivo.biografia && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <TranslateText text="Biografía" />
              </h3>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {ejecutivo.biografia}
                </p>
              </div>
            </div>
          )}

          {/* Información del sistema */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              <TranslateText text="Información del Sistema" />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  <TranslateText text="Creado:" />
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatDateTime(ejecutivo.created_at)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  <TranslateText text="Actualizado:" />
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatDateTime(ejecutivo.updated_at)}
                </span>
              </div>
              {ejecutivo.foto_version && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">
                    <TranslateText text="Versión de foto:" />
                  </span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {ejecutivo.foto_version}
                  </span>
                </div>
              )}
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  ID:
                </span>
                <span className="ml-2 font-mono text-gray-900 dark:text-white text-xs">
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