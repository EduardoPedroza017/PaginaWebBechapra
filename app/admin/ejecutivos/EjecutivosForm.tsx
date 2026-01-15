"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal } from '../jobs/utils/Modal';
import { TranslateText } from '@/components/TranslateText';
import { EjecutivoFormData } from './hooks/useEjecutivos';
import { ChevronLeft, ChevronRight, User, Briefcase, Mail, FileText, Check, Camera, Calendar, Phone, GraduationCap } from 'lucide-react';

interface EjecutivosFormProps {
  ejecutivo: EjecutivoFormData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EjecutivoFormData, photo?: File | null) => void;
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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EjecutivoFormData>(
    ejecutivo || {
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      fecha_nacimiento: '',
      puesto: '',
      carrera_estudiada: '',
      email: '',
      telefono: '',
      biografia: '',
      descripcion: '',
      activo: true,
    }
  );

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const totalSteps = 4;

  const steps = [
    { number: 1, title: 'Personal', icon: User },
    { number: 2, title: 'Profesional', icon: Briefcase },
    { number: 3, title: 'Contacto', icon: Mail },
    { number: 4, title: 'Biografía', icon: FileText },
  ];

  useEffect(() => {
    if (ejecutivo) {
      setFormData(ejecutivo);
      setCurrentStep(1);
    } else {
      setFormData({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nacimiento: '',
        puesto: '',
        carrera_estudiada: '',
        email: '',
        telefono: '',
        biografia: '',
        descripcion: '',
        activo: true,
      });
      setCurrentStep(1);
    }
  }, [ejecutivo]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, photo);
  };

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.nombre && formData.apellido_paterno;
      case 2:
        return true;
      case 3:
        return formData.email;
      case 4:
        return true;
      default:
        return true;
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-6xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden w-full mx-auto border border-gray-200 dark:border-gray-700"
      >
        {/* Header con azul semi-oscuro */}
        <div className="bg-linear-to-r from-slate-800 to-slate-900 px-8 py-8">
          <h2 className="text-3xl font-bold text-white">
            {ejecutivo ? <TranslateText text="Editar Ejecutivo" /> : <TranslateText text="Nuevo Ejecutivo" />}
          </h2>
          <p className="text-slate-200 text-base mt-2">
            <TranslateText text="Completa la información en cada sección paso a paso" />
          </p>
        </div>

        {/* Progress Steps mejorado */}
        <div className="bg-slate-50 dark:bg-slate-900/70 px-8 py-8 border-b border-slate-200 dark:border-slate-700 backdrop-blur-sm">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              
              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center flex-1 relative">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                        isCompleted
                          ? 'bg-emerald-500 text-white scale-110 shadow-lg'
                          : isActive
                          ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white ring-4 ring-slate-300 dark:ring-slate-800 scale-110 shadow-xl'
                          : 'bg-slate-300 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shadow-md'
                      }`}
                    >
                      {isCompleted ? <Check className="w-7 h-7" /> : <Icon className="w-7 h-7" />}
                    </div>
                    <span
                      className={`text-sm font-semibold mt-3 transition-all duration-300 ${
                        isCurrent
                          ? 'text-slate-800 dark:text-slate-300 scale-105'
                          : isCompleted
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-500 dark:text-slate-500'
                      }`}
                    >
                      <TranslateText text={step.title} />
                    </span>
                    <div className="absolute top-7 -right-6 w-12 h-0.5">
                      {index < steps.length - 1 && (
                        <div
                          className={`h-0.5 w-full transition-all duration-500 ${
                            currentStep > step.number
                              ? 'bg-emerald-500'
                              : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form Content - Expandido horizontalmente */}
        <div className="px-10 py-10 min-h-[500px] grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Step 1: Información Personal */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300 col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                  <User className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  <TranslateText text="Información Personal" />
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <TranslateText text="Nombre" /> <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-600 dark:focus:ring-slate-400 focus:border-transparent transition-all shadow-sm"
                    placeholder="Ej: Juan"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <TranslateText text="Apellido Paterno" /> <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="apellido_paterno"
                    value={formData.apellido_paterno}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-600 dark:focus:ring-slate-400 focus:border-transparent transition-all shadow-sm"
                    placeholder="Ej: Pérez"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <TranslateText text="Apellido Materno" />
                  </label>
                  <input
                    type="text"
                    name="apellido_materno"
                    value={formData.apellido_materno}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-600 dark:focus:ring-slate-400 focus:border-transparent transition-all shadow-sm"
                    placeholder="Ej: García"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <TranslateText text="Fecha de Nacimiento" />
                  </label>
                  <input
                    type="date"
                    name="fecha_nacimiento"
                    value={formData.fecha_nacimiento}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-600 dark:focus:ring-slate-400 focus:border-transparent transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Información Profesional */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300 col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    <TranslateText text="Información Profesional" />
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    <TranslateText text="Cargo y formación académica" />
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    <TranslateText text="Puesto / Cargo" />
                  </label>
                  <select
                    name="puesto"
                    value={formData.puesto}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-600 dark:focus:ring-slate-400 focus:border-transparent transition-all shadow-sm appearance-none"
                  >
                    <option value="">Seleccionar puesto</option>
                    <option value="Director General">Director General</option>
                    <option value="Director">Director</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Coordinador">Coordinador</option>
                    <option value="Analista">Analista</option>
                    <option value="Asistente">Asistente</option>
                    <option value="Consultor">Consultor</option>
                    <option value="Especialista">Especialista</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    <TranslateText text="Carrera Estudiada" />
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400" />
                    <input
                      type="text"
                      name="carrera_estudiada"
                      value={formData.carrera_estudiada}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-600 dark:focus:ring-slate-400 focus:border-transparent transition-all shadow-sm"
                      placeholder="Ej: Administración de Empresas"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 rounded-2xl p-6 mt-8">
                <p className="text-blue-800 dark:text-blue-300 text-sm">
                  <span className="font-semibold">💡 Nota:</span>{' '}
                  <TranslateText text="Estos datos ayudarán a identificar el rol del ejecutivo en la organización" />
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Información de Contacto */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300 col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    <TranslateText text="Información de Contacto" />
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    <TranslateText text="Medios de comunicación oficiales" />
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    <TranslateText text="Email Corporativo" /> <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
                      placeholder="ejemplo@empresa.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    <TranslateText text="Teléfono" />
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400" />
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-700 rounded-2xl p-6">
                <p className="text-emerald-800 dark:text-emerald-300 text-sm">
                  <span className="font-semibold">📞 Importante:</span>{' '}
                  <TranslateText text="Esta información será visible para contacto oficial" />
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Biografía */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300 col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    <TranslateText text="Biografía Profesional" />
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    <TranslateText text="Trayectoria, logros y especialidades" />
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  <TranslateText text="Describe la trayectoria profesional" />
                </label>
                <textarea
                  name="biografia"
                  value={formData.biografia}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-600 dark:focus:ring-slate-400 focus:border-transparent transition-all shadow-sm resize-none"
                  rows={12}
                  placeholder={`Ejemplo: ${ejecutivo?.nombre || "El ejecutivo"} cuenta con más de 10 años de experiencia en liderazgo estratégico. Ha dirigido equipos multidisciplinarios y ha sido clave en la expansión internacional de la empresa. Entre sus logros destacan...`}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    <TranslateText text="Recomendado: 200-500 palabras" />
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {formData.biografia.length} caracteres
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
                <p className="text-slate-800 dark:text-slate-300 text-sm">
                  <span className="font-semibold">💼 Sugerencias:</span>{' '}
                  <TranslateText text="Incluye experiencia clave, logros destacados, certificaciones y habilidades especiales." />
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer con botones de navegación - Mejorado */}
        <div className="bg-slate-50 dark:bg-slate-900/70 px-10 py-8 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between backdrop-blur-sm">
          <button
            type="button"
            onClick={(e) => prevStep(e)}
            disabled={currentStep === 1}
            className="px-7 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 border border-slate-300 dark:border-slate-600 hover:shadow-md hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
            <TranslateText text="Volver" />
          </button>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-7 py-3.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-semibold transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
            >
              <TranslateText text="Cancelar" />
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={(e) => nextStep(e)}
                disabled={!isStepValid()}
                className="px-7 py-3.5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <TranslateText text="Continuar" />
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !isStepValid()}
                className="px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <TranslateText text="Procesando..." />
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <TranslateText text="Guardar Ejecutivo" />
                  </>
                )}
              </button>
            )}   
          </div>
        </div>
      </form>
    </Modal>
  );
};