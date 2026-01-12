"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Phone, Calendar, Briefcase, GraduationCap, FileText, ToggleLeft, ToggleRight, Camera } from 'lucide-react';
import { Ejecutivo, EjecutivoFormData } from './hooks/useEjecutivos';
import { TranslateText } from '@/components/TranslateText';

interface EjecutivosFormProps {
  ejecutivo?: Ejecutivo | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EjecutivoFormData, photo?: File | null) => Promise<void>;
  loading: boolean;
  theme: 'light' | 'dark';
}

export const EjecutivosForm: React.FC<EjecutivosFormProps> = ({
  ejecutivo,
  isOpen,
  onClose,
  onSave,
  loading,
  theme,
}) => {
  const [formData, setFormData] = useState<EjecutivoFormData>({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_nacimiento: '',
    puesto: '',
    carrera_estudiada: '',
    biografia: '',
    telefono: '',
    email: '',
    activo: true,
  });

  const [errors, setErrors] = useState<Partial<EjecutivoFormData>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  // Cargar datos del ejecutivo cuando se edita
  useEffect(() => {
    if (ejecutivo) {
      setFormData({
        nombre: ejecutivo.nombre || '',
        apellido_paterno: ejecutivo.apellido_paterno || '',
        apellido_materno: ejecutivo.apellido_materno || '',
        fecha_nacimiento: ejecutivo.fecha_nacimiento || '',
        puesto: ejecutivo.puesto || '',
        carrera_estudiada: ejecutivo.carrera_estudiada || '',
        biografia: ejecutivo.biografia || '',
        telefono: ejecutivo.telefono || '',
        email: ejecutivo.email || '',
        activo: ejecutivo.activo,
      });
    } else {
      // Reset form for new ejecutivo
      setFormData({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nacimiento: '',
        puesto: '',
        carrera_estudiada: '',
        biografia: '',
        telefono: '',
        email: '',
        activo: true,
      });
    }
    setErrors({});
  }, [ejecutivo, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<EjecutivoFormData> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.apellido_paterno.trim()) {
      newErrors.apellido_paterno = 'El apellido paterno es requerido';
    } else if (formData.apellido_paterno.length < 2) {
      newErrors.apellido_paterno = 'El apellido paterno debe tener al menos 2 caracteres';
    }

    if (formData.fecha_nacimiento) {
      const birthDate = new Date(formData.fecha_nacimiento);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (birthDate > today) {
        newErrors.fecha_nacimiento = 'La fecha de nacimiento no puede ser futura';
      } else if (age < 18) {
        newErrors.fecha_nacimiento = 'El ejecutivo debe tener al menos 18 años';
      }
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato del email es inválido';
    }

    if (formData.telefono && !/^[\+]?[0-9\s\-\(\)]{7,15}$/.test(formData.telefono)) {
      newErrors.telefono = 'El formato del teléfono es inválido';
    }

    if (formData.biografia && formData.biografia.length > 2000) {
      newErrors.biografia = 'La biografía no puede exceder 2000 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSave(formData, selectedPhoto);
      onClose();
    } catch (error) {
      console.error('Error saving ejecutivo:', error);
    }
  };

  const handleInputChange = (field: keyof EjecutivoFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {ejecutivo ? <TranslateText text="Editar Ejecutivo" /> : <TranslateText text="Nuevo Ejecutivo" />}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {ejecutivo ? <TranslateText text="Modifica la información del ejecutivo" /> : <TranslateText text="Ingresa la información del nuevo ejecutivo" />}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Personal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              <TranslateText text="Información Personal" />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <TranslateText text="Nombre" /> *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.nombre ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Juan Carlos"
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <TranslateText text="Apellido Paterno" /> *
                </label>
                <input
                  type="text"
                  value={formData.apellido_paterno}
                  onChange={(e) => handleInputChange('apellido_paterno', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.apellido_paterno ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="González"
                />
                {errors.apellido_paterno && (
                  <p className="text-red-500 text-sm mt-1">{errors.apellido_paterno}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <TranslateText text="Apellido Materno" />
                </label>
                <input
                  type="text"
                  value={formData.apellido_materno}
                  onChange={(e) => handleInputChange('apellido_materno', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Rodríguez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <TranslateText text="Fecha de Nacimiento" />
                </label>
                <input
                  type="date"
                  value={formData.fecha_nacimiento}
                  onChange={(e) => handleInputChange('fecha_nacimiento', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.fecha_nacimiento ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.fecha_nacimiento && (
                  <p className="text-red-500 text-sm mt-1">{errors.fecha_nacimiento}</p>
                )}
              </div>
            </div>
          </div>

          {/* Información Profesional */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <TranslateText text="Información Profesional" />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <TranslateText text="Puesto" />
                </label>
                <select
                  value={formData.puesto}
                  onChange={(e) => handleInputChange('puesto', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">
                    <TranslateText text="Seleccionar puesto" asOption={true} />
                  </option>
                  <option value="Director General">Director General</option>
                  <option value="Director">Director</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Coordinador">Coordinador</option>
                  <option value="Analista">Analista</option>
                  <option value="Asistente">Asistente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <TranslateText text="Carrera Estudiada" />
                </label>
                <input
                  type="text"
                  value={formData.carrera_estudiada}
                  onChange={(e) => handleInputChange('carrera_estudiada', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ingeniería Industrial"
                />
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <TranslateText text="Información de Contacto" />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <TranslateText text="Email" />
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="juan.gonzalez@empresa.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <TranslateText text="Teléfono" />
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.telefono ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="+52 55 1234 5678"
                />
                {errors.telefono && (
                  <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
                )}
              </div>
            </div>
          </div>

          {/* Biografía */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <TranslateText text="Biografía" />
            </h3>

            <div>
              <textarea
                value={formData.biografia}
                onChange={(e) => handleInputChange('biografia', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none ${
                  errors.biografia ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Describe la trayectoria profesional del ejecutivo..."
              />
              <div className="flex justify-between items-center mt-1">
                {errors.biografia && (
                  <p className="text-red-500 text-sm">{errors.biografia}</p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                  {formData.biografia.length}/2000
                </p>
              </div>
            </div>
          </div>

          {/* Estado */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ToggleLeft className="w-5 h-5" />
              <TranslateText text="Estado" />
            </h3>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleInputChange('activo', !formData.activo)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formData.activo ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.activo ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formData.activo ? (
                  <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                    <ToggleRight className="w-4 h-4" />
                    <TranslateText text="Activo" />
                  </span>
                ) : (
                  <span className="text-red-600 dark:text-red-400 flex items-center gap-1">
                    <ToggleLeft className="w-4 h-4" />
                    <TranslateText text="Inactivo" />
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Foto */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              <TranslateText text="Foto" />
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedPhoto(e.target.files?.[0] || null)}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg cursor-pointer transition-colors duration-200"
                >
                  <Camera className="w-4 h-4" />
                  <TranslateText text="Seleccionar Foto" />
                </label>
                {selectedPhoto && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedPhoto.name}
                  </span>
                )}
              </div>
              {selectedPhoto && (
                <div className="flex items-center gap-3">
                  <img
                    src={URL.createObjectURL(selectedPhoto)}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(null)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    <TranslateText text="Remover" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 font-medium"
            >
              <TranslateText text="Cancelar" />
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <TranslateText text="Guardando..." />
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <TranslateText text="Guardar" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};