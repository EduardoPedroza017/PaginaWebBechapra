"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { 
  Upload, X, Image as ImageIcon, AlertCircle, CheckCircle, 
  Loader2, Trash2, Eye, Sparkles, Tag, 
  Package, Zap, CloudUpload, FileImage
} from 'lucide-react';
import { TranslateText } from '@/components/TranslateText';

interface LogoUploadFormProps {
  uploading?: boolean;
  onUpload: (files: File[]) => void;
  onMessage?: (type: 'success' | 'error' | 'info', text: string) => void;
  theme?: 'light' | 'dark';
}

interface UploadFile {
  id: string;
  file: File;
  preview: string;
  size: number;
  dimensions?: { width: number; height: number };
  status: 'pending' | 'validating' | 'ready' | 'error';
  error?: string;
  tags: string[];
}

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50 MB total
const MAX_FILES = 20; // Máximo 20 logos por batch
const ALLOWED_TYPES = ['image/png','image/jpeg','image/webp','image/svg+xml'];

export const LogoUploadForm: React.FC<LogoUploadFormProps> = ({ 
  uploading: externalUploading = false, 
  onUpload,
  onMessage,
  theme = 'light'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<string[]>([]);
  const [activeUploads, setActiveUploads] = useState<Set<string>>(new Set());
  const [newTag, setNewTag] = useState('');
  const [batchTags, setBatchTags] = useState<string[]>([]);
  const [generateVariants, setGenerateVariants] = useState(true);
  const [optimizeImages, setOptimizeImages] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Generar ID único
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Validar archivo individual
  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    // Validar tipo
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: `Tipo no permitido. Formatos válidos: PNG, JPEG, WebP, SVG`
      };
    }

    // Validar tamaño
    if (file.size > MAX_SIZE) {
      return {
        valid: false,
        error: `Tamaño excede ${MAX_SIZE / (1024*1024)}MB límite`
      };
    }

    // Validar nombre (evitar caracteres especiales)
    const invalidChars = /[<>:"/\\|?*]/g;
    if (invalidChars.test(file.name)) {
      return {
        valid: false,
        error: 'Nombre contiene caracteres inválidos'
      };
    }

    return { valid: true };
  }, []);

  // Validar batch completo
  const validateBatch = useCallback((files: UploadFile[]): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // Validar cantidad
    if (files.length > MAX_FILES) {
      errors.push(`Máximo ${MAX_FILES} logos por lote`);
    }

    // Validar tamaño total
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      errors.push(`Tamaño total excede ${MAX_TOTAL_SIZE / (1024*1024)}MB límite`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }, []);

  // Obtener dimensiones de imagen
  const getImageDimensions = useCallback((file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      // Para SVG y archivos grandes, usar valores por defecto
      if (file.type === 'image/svg+xml' || file.size > 2 * 1024 * 1024) {
        resolve({ width: 512, height: 512 });
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
        URL.revokeObjectURL(url);
      };
      
      img.onerror = () => {
        resolve({ width: 512, height: 512 });
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    });
  }, []);

  // Procesar archivos seleccionados
  const processSelectedFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    // Validar límite
    if (selectedFiles.length + fileArray.length > MAX_FILES) {
      onMessage?.('error', `Máximo ${MAX_FILES} logos por lote`);
      return;
    }

    const newFiles: UploadFile[] = [];
    const errors: string[] = [];

    // Procesar en lotes de 3 para no bloquear UI
    const batchSize = 3;
    for (let i = 0; i < fileArray.length; i += batchSize) {
      const batch = fileArray.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (file) => {
        // Validación básica
        const validation = validateFile(file);
        if (!validation.valid) {
          errors.push(`${file.name}: ${validation.error}`);
          return null;
        }

        try {
          const preview = URL.createObjectURL(file);
          const dimensions = file.type.startsWith('image/') && file.type !== 'image/svg+xml' 
            ? await getImageDimensions(file)
            : undefined;

          return {
            id: generateId(),
            file,
            preview,
            size: file.size,
            dimensions,
            status: 'ready' as const,
            tags: [...batchTags]
          } as UploadFile;
        } catch (error) {
          errors.push(`${file.name}: Error al procesar`);
          return null;
        }
      });

      const results = await Promise.all(batchPromises);
      const validResults = results.filter((f): f is UploadFile => f !== null);
      newFiles.push(...validResults);

      // Actualizar estado progresivamente
      setSelectedFiles(prev => [...prev, ...validResults]);
    }

    // Mostrar resultados
    if (newFiles.length > 0) {
      onMessage?.('success', `${newFiles.length} logo(s) añadido(s)`);
    }
    
    if (errors.length > 0) {
      errors.slice(0, 3).forEach(error => onMessage?.('error', error));
      if (errors.length > 3) {
        onMessage?.('error', `Y ${errors.length - 3} error(es) más`);
      }
    }

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [selectedFiles.length, batchTags, validateFile, getImageDimensions, onMessage]);

  // Manejar drop de archivos
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFiles(e.dataTransfer.files);
    }
  }, [processSelectedFiles]);

  // Manejar selección de archivos
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFiles(e.target.files);
    }
  }, [processSelectedFiles]);

  // Manejar drag
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Eliminar archivo
  const removeFile = useCallback((id: string) => {
    setSelectedFiles(prev => {
      const newFiles = prev.filter(f => f.id !== id);
      const fileToRemove = prev.find(f => f.id === id);
      
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      
      return newFiles;
    });
  }, []);

  // Limpiar todos los archivos
  const clearAll = useCallback(() => {
    selectedFiles.forEach(file => {
      URL.revokeObjectURL(file.preview);
    });
    setSelectedFiles([]);
    setBatchTags([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [selectedFiles]);

  // Añadir tag a todos
  const addTagToAll = useCallback((tag: string) => {
    if (!tag.trim() || batchTags.includes(tag)) return;
    
    const newTags = [...batchTags, tag.trim()];
    setBatchTags(newTags);
    
    setSelectedFiles(prev => 
      prev.map(file => ({
        ...file,
        tags: [...new Set([...file.tags, tag.trim()])]
      }))
    );
    
    setNewTag('');
  }, [batchTags]);

  // Remover tag de todos
  const removeTagFromAll = useCallback((tag: string) => {
    setBatchTags(prev => prev.filter(t => t !== tag));
    
    setSelectedFiles(prev => 
      prev.map(file => ({
        ...file,
        tags: file.tags.filter(t => t !== tag)
      }))
    );
  }, []);

  // Toggle tag en archivo específico
  const toggleTagOnFile = useCallback((fileId: string, tag: string) => {
    setSelectedFiles(prev => 
      prev.map(file => {
        if (file.id !== fileId) return file;
        
        if (file.tags.includes(tag)) {
          return {
            ...file,
            tags: file.tags.filter(t => t !== tag)
          };
        } else {
          return {
            ...file,
            tags: [...file.tags, tag]
          };
        }
      })
    );
  }, []);

  // Subir archivos
  const handleUpload = useCallback(async () => {
    if (selectedFiles.length === 0) return;
    
    // Validar batch
    const validation = validateBatch(selectedFiles);
    if (!validation.valid) {
      validation.errors.forEach(error => onMessage?.('error', error));
      return;
    }
    
    setUploading(true);
    
    try {
      // Preparar archivos para upload
      const filesToUpload = selectedFiles.map(f => f.file);
      
      // Llamar callback con archivos
      await onUpload(filesToUpload);
      
      // Limpiar después de subir
      clearAll();
      
    } catch (error) {
      onMessage?.('error', 'Error al subir los logos');
    } finally {
      setUploading(false);
    }
  }, [selectedFiles, validateBatch, onUpload, clearAll, onMessage]);

  // Formatear tamaño de archivo
  const formatFileSize = useCallback((bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }, []);

  // Calcular estadísticas
  const calculateStats = useCallback(() => {
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    const validCount = selectedFiles.filter(f => f.status === 'ready').length;
    const errorCount = selectedFiles.filter(f => f.status === 'error').length;
    
    return {
      totalSize,
      validCount,
      errorCount,
      formattedSize: formatFileSize(totalSize)
    };
  }, [selectedFiles, formatFileSize]);

  // Limpiar memoria al desmontar
  useEffect(() => {
    return () => {
      selectedFiles.forEach(file => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [selectedFiles]);

  const stats = calculateStats();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' 
              ? 'bg-linear-to-br from-emerald-900/30 to-blue-900/30 text-emerald-400'
              : 'bg-linear-to-br from-emerald-100 to-blue-100 text-emerald-600'
          }`}>
            <CloudUpload size={20} />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              <TranslateText text="Subida Masiva de Logos" />
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Soporta múltiples logos por lote" />
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedFiles.length > 0 && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-300'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {selectedFiles.length} seleccionados
            </span>
          )}
          
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Sparkles size={16} />
            <span>{showAdvanced ? 'Ocultar' : 'Avanzado'}</span>
          </button>
        </div>
      </div>

      {/* Configuración avanzada */}
      {showAdvanced && (
        <div className={`mb-6 p-4 rounded-xl border ${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Optimización */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <TranslateText text="Optimización" />
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={generateVariants}
                    onChange={(e) => setGenerateVariants(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <TranslateText text="Generar variantes (WebP, AVIF)" />
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={optimizeImages}
                    onChange={(e) => setOptimizeImages(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <TranslateText text="Optimizar automáticamente" />
                  </span>
                </label>
              </div>
            </div>

            {/* Gestión de tags */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <TranslateText text="Etiquetas de Lote" />
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addTagToAll(newTag);
                    }
                  }}
                  placeholder="Añadir etiqueta..."
                  className={`flex-1 px-3 py-2 rounded-lg text-sm border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <button
                  onClick={() => addTagToAll(newTag)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Tag size={16} />
                </button>
              </div>
              
              {batchTags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {batchTags.map(tag => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        theme === 'dark' 
                          ? 'bg-blue-900/40 text-blue-300' 
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {tag}
                      <button
                        onClick={() => removeTagFromAll(tag)}
                        className="hover:text-red-400 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Información de límites */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <TranslateText text="Límites" />
              </label>
              <div className={`text-xs space-y-1 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
              }`}>
                <div className="flex items-center gap-2">
                  <Package size={12} />
                  <span>Máx. {MAX_FILES} logos por lote</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileImage size={12} />
                  <span>Máx. {formatFileSize(MAX_SIZE)} por archivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={12} />
                  <span>Total máx. {formatFileSize(MAX_TOTAL_SIZE)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Área de subida */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 mb-6 ${
          dragActive 
            ? theme === 'dark'
              ? 'border-emerald-500 bg-emerald-900/10'
              : 'border-emerald-500 bg-emerald-50'
            : theme === 'dark'
              ? 'border-gray-700 hover:border-gray-600 bg-gray-800/30 hover:bg-gray-800/50'
              : 'border-gray-300 hover:border-gray-400 bg-linear-to-br from-gray-50 to-blue-50/30'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        
        {selectedFiles.length === 0 ? (
          <div className="py-10 text-center">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-linear-to-br from-gray-800 to-gray-900'
                : 'bg-linear-to-br from-emerald-50 to-blue-50'
            }`}>
              <Upload size={32} className={
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'
              } />
            </div>
            <p className={`text-lg font-medium mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <TranslateText text="Arrastra y suelta tus logos aquí" />
            </p>
            <p className={`text-sm mb-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <TranslateText text="o haz clic para seleccionar archivos" />
            </p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-400'
                : 'bg-white text-gray-600 border border-gray-300'
            }`}>
              <ImageIcon size={14} />
              <span><TranslateText text="PNG, JPG, WebP, SVG" /></span>
              <span className="mx-1">•</span>
              <span><TranslateText text="Máx. 5MB c/u" /></span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Resumen */}
            <div className={`flex items-center justify-between p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-blue-50/50'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-blue-100'
                }`}>
                  <Package className={
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  } size={20} />
                </div>
                <div>
                  <p className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedFiles.length} <TranslateText text="logos seleccionados" />
                  </p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stats.formattedSize} • {stats.validCount} válidos • {stats.errorCount} con error
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {batchTags.length > 0 && (
                  <div className={`px-2 py-1 rounded text-xs ${
                    theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {batchTags.length} <TranslateText text="etiquetas" />
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    !uploading && fileInputRef.current?.click();
                  }}
                  disabled={uploading}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    uploading
                      ? theme === 'dark'
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : theme === 'dark'
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                  }`}
                >
                  <TranslateText text="Añadir más" />
                </button>
              </div>
            </div>
            
            {/* Lista de archivos */}
            <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
              {selectedFiles.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    file.status === 'error'
                      ? theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'
                      : theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-50'
                  }`}
                >
                  {/* Miniatura */}
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-full object-cover bg-white"
                    />
                    {file.status === 'error' && (
                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      </div>
                    )}
                  </div>
                  
                  {/* Información */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <p className={`text-sm font-medium truncate ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {file.file.name}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    
                    {/* Detalles */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {file.dimensions && (
                          <span className={`text-xs ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {file.dimensions.width}×{file.dimensions.height}
                          </span>
                        )}
                        
                        {/* Tags individuales */}
                        {file.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {file.tags.slice(0, 2).map(tag => (
                              <button
                                key={tag}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTagOnFile(file.id, tag);
                                }}
                                className={`text-xs px-1.5 py-0.5 rounded transition-colors ${
                                  theme === 'dark'
                                    ? 'bg-gray-800 text-gray-400 hover:text-white'
                                    : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                            {file.tags.length > 2 && (
                              <span className={`text-xs ${
                                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                              }`}>
                                +{file.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Acciones */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(file.preview, '_blank');
                          }}
                          className={`p-1 rounded ${
                            theme === 'dark'
                              ? 'text-gray-500 hover:text-white hover:bg-gray-700'
                              : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200'
                          }`}
                          title="Ver"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(file.id);
                          }}
                          className={`p-1 rounded ${
                            theme === 'dark'
                              ? 'text-gray-500 hover:text-white hover:bg-gray-700'
                              : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200'
                          }`}
                          title="Eliminar"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Mensaje de error */}
                    {file.error && (
                      <p className={`text-xs mt-1 ${
                        theme === 'dark' ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {file.error}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3">
        {selectedFiles.length > 0 && (
          <button
            onClick={clearAll}
            disabled={uploading}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              uploading
                ? theme === 'dark'
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <TranslateText text="Limpiar todo" />
          </button>
        )}
        
        <button
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || uploading}
          className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all relative overflow-hidden group ${
            selectedFiles.length === 0 || uploading
              ? theme === 'dark'
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-linear-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg'
          }`}
        >
          {uploading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span><TranslateText text="Subiendo..." /></span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" />
              <span>
                <TranslateText text="Subir Logos" /> ({selectedFiles.length})
              </span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                theme === 'dark' ? 'bg-emerald-600/50' : 'bg-white/20'
              }`}>
                {stats.formattedSize}
              </span>
            </div>
          )}
          
          {/* Efecto de brillo */}
          {!uploading && selectedFiles.length > 0 && (
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />
          )}
        </button>
      </div>
      
      {/* Información adicional */}
      <div className={`mt-4 pt-4 border-t ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded ${
              theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
            }`}>
              <CheckCircle className={`w-3 h-3 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              <TranslateText text="Validación automática" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded ${
              theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'
            }`}>
              <Sparkles className={`w-3 h-3 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`} />
            </div>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              <TranslateText text="Optimización inteligente" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded ${
              theme === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-100'
            }`}>
              <Package className={`w-3 h-3 ${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
            </div>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              <TranslateText text="Subida por lotes" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded ${
              theme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-100'
            }`}>
              <Zap className={`w-3 h-3 ${
                theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
              }`} />
            </div>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              <TranslateText text="Procesamiento rápido" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};