"use client";

import React, { useState, FormEvent } from 'react';
import { apiClient } from '@/lib/api/api-client';
import { PlusCircle, Loader2, X } from 'lucide-react';
import { TranslateText } from '@/components/TranslateText';
import { motion, AnimatePresence } from 'framer-motion';

interface JobsFormProps {
  onCreate: (job: {
    title: string;
    description: string;
    requirements: string;
    location: string;
    modality: string;
    salary: string;
    image_url?: string;
  }) => Promise<void> | void;
  isSubmitting?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const JobsForm: React.FC<JobsFormProps> = ({ onCreate, isSubmitting = false, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [location, setLocation] = useState('');
  const [modality, setModality] = useState('');
  const [salary, setSalary] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !description.trim() || !requirements.trim() || !location.trim() || !modality.trim() || !salary.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      await onCreate({
        title: title.trim(),
        description: description.trim(),
        requirements: requirements.trim(),
        location: location.trim(),
        modality: modality.trim(),
        salary: salary.trim(),
        image_url: imageUrl.trim() || undefined,
      });
      setTitle('');
      setDescription('');
      setRequirements('');
      setLocation('');
      setModality('');
      setSalary('');
      onClose();
    } catch (err) {
      setError('Error al crear la vacante');
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              mass: 0.8
            }}
            className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] my-auto"
          >
            {/* Header del Modal */}
            <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                    <PlusCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      <TranslateText text="Crear Nueva Vacante" />
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <TranslateText text="Completa todos los campos para publicar la vacante" />
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Contenido del Formulario */}
            <div className="flex-1 overflow-y-auto p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grid de campos principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Título */}
                  <div className="space-y-3 md:col-span-2">
                    <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <TranslateText text="Título de la vacante *" />
                    </label>
                    <input
                      id="jobTitle"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ej: Desarrollador Frontend Senior"
                      disabled={isSubmitting}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Ubicación y Modalidad */}
                  <div className="space-y-3">
                    <label htmlFor="jobLocation" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <TranslateText text="Ubicación *" />
                    </label>
                    <input
                      id="jobLocation"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Ej: Ciudad de México"
                      disabled={isSubmitting}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="jobModality" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <TranslateText text="Modalidad *" />
                    </label>
                    <input
                      id="jobModality"
                      type="text"
                      value={modality}
                      onChange={(e) => setModality(e.target.value)}
                      placeholder="Ej: Remoto, Híbrido, Presencial"
                      disabled={isSubmitting}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Salario */}
                  <div className="space-y-3 md:col-span-2">
                    <label htmlFor="jobSalary" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <TranslateText text="Salario (rango o cantidad) *" />
                    </label>
                    <input
                      id="jobSalary"
                      type="text"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="Ej: $30,000 - $45,000 MXN mensuales"
                      disabled={isSubmitting}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Imagen (opcional) */}
                <div className="space-y-3 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Imagen (elige archivo o pega URL)
                  </label>

                  <div className="flex gap-3 items-center">
                    <input
                      id="jobImageFile"
                      type="file"
                      accept="image/*"
                      disabled={isSubmitting || uploadingImage}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          setUploadingImage(true);
                          const fd = new FormData();
                          fd.append('file', file);
                          const res = await apiClient.upload('/api/uploads', fd, { retry: 1 });
                          // `res.url` should be the public URL returned by backend
                          if (res && res.url) {
                            setImageUrl(res.url);
                            setPreviewUrl(res.url);
                          }
                        } catch (err) {
                          console.error('Error uploading image:', err);
                        } finally {
                          setUploadingImage(false);
                        }
                      }}
                      className="text-sm"
                    />

                    <div className="flex-1">
                      <input
                        id="jobImage"
                        type="url"
                        value={imageUrl}
                        onChange={(e) => {
                          setImageUrl(e.target.value);
                          setPreviewUrl(e.target.value || null);
                        }}
                        placeholder="https://example.com/logo.png"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                      {uploadingImage ? (
                        <svg className="animate-spin w-6 h-6 text-gray-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                      ) : previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={previewUrl.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${previewUrl}` : previewUrl} alt="preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-500">Previa</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Áreas de texto largas */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label htmlFor="jobDescription" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <TranslateText text="Descripción del puesto *" />
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-2">
                        <TranslateText text="Responsabilidades y funciones principales" />
                      </span>
                    </label>
                    <textarea
                      id="jobDescription"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe las responsabilidades, actividades y objetivos del puesto..."
                      disabled={isSubmitting}
                      required
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="jobRequirements" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <TranslateText text="Requisitos y cualificaciones *" />
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-2">
                        <TranslateText text="Educación, experiencia y habilidades necesarias" />
                      </span>
                    </label>
                    <textarea
                      id="jobRequirements"
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Lista los requisitos educativos, experiencia previa, habilidades técnicas y blandas requeridas..."
                      disabled={isSubmitting}
                      required
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Mensaje de error */}
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <p className="text-sm font-medium text-red-700 dark:text-red-300 flex items-center gap-2">
                      <span className="text-red-500">⚠</span>
                      {error}
                    </p>
                  </div>
                )}

                {/* Nota informativa */}
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <span className="font-semibold">Nota:</span> Todos los campos marcados con * son obligatorios. La vacante será publicada después de la revisión.
                  </p>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 rounded-xl font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 transition-all disabled:opacity-50"
                  >
                    <TranslateText text="Cancelar" />
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <TranslateText text="Creando..." />
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-5 h-5" />
                        <TranslateText text="Publicar Vacante" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobsForm;