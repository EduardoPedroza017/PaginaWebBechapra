"use client";

import React, { useState, useRef } from 'react';
import { X, Upload, Camera, AlertCircle, CheckCircle } from 'lucide-react';
import { Ejecutivo } from './hooks/useEjecutivos';
import { TranslateText } from '@/components/TranslateText';

interface EjecutivosPhotoUploadProps {
  ejecutivo: Ejecutivo;
  isOpen: boolean;
  onClose: () => void;
  onUpload: (id: string, file: File) => Promise<void>;
  loading: boolean;
  theme: 'light' | 'dark';
}

export const EjecutivosPhotoUpload: React.FC<EjecutivosPhotoUploadProps> = ({
  ejecutivo,
  isOpen,
  onClose,
  onUpload,
  loading,
  theme,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setError(null);

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen');
      return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar los 5MB');
      return;
    }

    setSelectedFile(file);

    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    try {
      await onUpload(ejecutivo._id, selectedFile);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir la foto');
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                <TranslateText text="Subir Foto" />
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {ejecutivo.nombre} {ejecutivo.apellido_paterno}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Current photo or placeholder */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <TranslateText text="Foto actual" />
            </h3>
            <div className="flex justify-center">
              {ejecutivo.foto_url ? (
                <img
                  src={ejecutivo.foto_url}
                  alt={`${ejecutivo.nombre} ${ejecutivo.apellido_paterno}`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Upload area */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <TranslateText text="Seleccionar nueva foto" />
            </h3>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                preview
                  ? 'border-green-300 bg-green-50 dark:bg-green-900/10'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <div className="space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-green-200">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      <TranslateText text="Foto seleccionada" />
                    </span>
                  </div>
                  {selectedFile && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      <TranslateText text="Arrastra una imagen aquí o haz clic para seleccionar" />
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <TranslateText text="PNG, JPG, JPEG, GIF, WebP hasta 5MB" />
                    </p>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileSelect(file);
                }
              }}
              className="hidden"
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}

          {/* Info about versioning */}
          <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  <TranslateText text="Versionado automático" />
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  <TranslateText text="Las fotos se versionan automáticamente por mes/año. La versión actual será:" /> {new Date().toISOString().slice(0, 7)}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 font-medium"
            >
              <TranslateText text="Cancelar" />
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedFile || loading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <TranslateText text="Subiendo..." />
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <TranslateText text="Subir Foto" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};