"use client";

import React, { useRef, useState, useCallback } from "react";
import { 
  Upload, Image as ImageIcon, X, Check, 
  AlertCircle, Compass, Zap, Settings, 
  Filter, Clock, HardDrive, CloudUpload,
  Sparkles, Tag
} from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface ImageUploaderProps {
  theme: 'light' | 'dark';
  onUploadSuccess: () => void;
  onMessage: (type: 'success' | 'error', text: string) => void;
  onAddTags?: (tags: string[]) => void;
  existingTags?: string[];
}

interface UploadFile {
  file: File;
  preview: string;
  size: number;
  dimensions?: { width: number; height: number };
  estimatedCompression: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  tags: string[];
}

interface CompressionStats {
  originalSize: number;
  compressedSize: number;
  savings: number;
  percentage: number;
}

export function ImageUploader({ 
  theme, 
  onUploadSuccess, 
  onMessage,
  onAddTags,
  existingTags = []
}: ImageUploaderProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [autoResize, setAutoResize] = useState(true);
  const [maxDimension, setMaxDimension] = useState(1920);
  const [newTag, setNewTag] = useState('');
  const [batchTags, setBatchTags] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const estimateCompression = (file: File, dimensions?: { width: number; height: number }): number => {
    // Estimación basada en tipo de archivo y tamaño
    const sizeMB = file.size / (1024 * 1024);
    const ext = file.name.split('.').pop()?.toLowerCase();
    
    let savings = 0;
    
    if (ext === 'png') {
      savings = 0.4; // 40% de compresión estimada
    } else if (ext === 'jpg' || ext === 'jpeg') {
      savings = 0.2; // 20% de compresión estimada
    } else if (ext === 'webp') {
      savings = 0.3; // 30% de compresión estimada
    }
    
    // Ajustar basado en nivel de compresión
    if (compressionLevel === 'low') savings *= 0.5;
    if (compressionLevel === 'high') savings *= 1.5;
    
    // Ajustar basado en dimensiones
    if (dimensions && autoResize) {
      const maxPixels = maxDimension * maxDimension;
      const currentPixels = dimensions.width * dimensions.height;
      if (currentPixels > maxPixels) {
        savings += 0.2; // Reducción adicional por resize
      }
    }
    
    return Math.min(savings, 0.7); // Máximo 70% de compresión
  };

  const handleFileSelect = async (files: FileList | File[]) => {
    const validFiles: UploadFile[] = [];
    
    for (const file of Array.from(files)) {
      // Validaciones
      if (!file.type.startsWith('image/')) {
        onMessage('error', `Archivo no válido: ${file.name}`);
        continue;
      }
      
      if (file.size > 20 * 1024 * 1024) { // 20MB límite
        onMessage('error', `La imagen ${file.name} supera los 20MB`);
        continue;
      }
      
      try {
        const preview = URL.createObjectURL(file);
        const dimensions = await getImageDimensions(file);
        const estimatedCompression = estimateCompression(file, dimensions);
        
        validFiles.push({
          file,
          preview,
          size: file.size,
          dimensions,
          estimatedCompression,
          status: 'pending',
          progress: 0,
          tags: [...batchTags]
        });
      } catch (error) {
        onMessage('error', `Error al procesar: ${file.name}`);
      }
    }
    
    if (validFiles.length === 0) return;
    
    setUploadFiles(prev => [...prev, ...validFiles]);
    
    if (validFiles.length === 1) {
      onMessage('success', `1 imagen añadida para subir`);
    } else {
      onMessage('success', `${validFiles.length} imágenes añadidas para subir`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, []);

  const removeFile = (index: number) => {
    setUploadFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const clearAll = () => {
    uploadFiles.forEach(file => URL.revokeObjectURL(file.preview));
    setUploadFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addTagToAll = (tag: string) => {
    if (!tag.trim() || batchTags.includes(tag)) return;
    
    const newTags = [...batchTags, tag.trim()];
    setBatchTags(newTags);
    
    setUploadFiles(prev => 
      prev.map(file => ({
        ...file,
        tags: [...file.tags, tag.trim()]
      }))
    );
    
    setNewTag('');
    onAddTags?.([tag.trim()]);
  };

  const removeTagFromAll = (tag: string) => {
    setBatchTags(prev => prev.filter(t => t !== tag));
    
    setUploadFiles(prev => 
      prev.map(file => ({
        ...file,
        tags: file.tags.filter(t => t !== tag)
      }))
    );
  };

  const toggleTagOnFile = (fileIndex: number, tag: string) => {
    setUploadFiles(prev => 
      prev.map((file, idx) => {
        if (idx !== fileIndex) return file;
        
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
  };

  const calculateStats = (): CompressionStats => {
    const originalSize = uploadFiles.reduce((sum, file) => sum + file.size, 0);
    const compressedSize = uploadFiles.reduce((sum, file) => 
      sum + file.size * (1 - file.estimatedCompression), 0
    );
    
    const savings = originalSize - compressedSize;
    const percentage = (savings / originalSize) * 100;
    
    return { originalSize, compressedSize, savings, percentage };
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0) return;
    
    setUploading(true);
    let successCount = 0;
    let failedCount = 0;
    
    // Actualizar estado a uploading
    setUploadFiles(prev => prev.map(file => ({ ...file, status: 'uploading' as const, progress: 0 })));
    
    for (let i = 0; i < uploadFiles.length; i++) {
      const uploadFile = uploadFiles[i];
      
      try {
        const formData = new FormData();
        formData.append("image", uploadFile.file);
        formData.append("compression", compressionLevel);
        formData.append("maxDimension", autoResize ? maxDimension.toString() : "0");
        formData.append("tags", JSON.stringify(uploadFile.tags));
        
        const xhr = new XMLHttpRequest();
        
        // Actualizar progreso
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadFiles(prev => 
              prev.map((f, idx) => 
                idx === i ? { ...f, progress } : f
              )
            );
          }
        };
        
        const uploadPromise = new Promise((resolve, reject) => {
          xhr.open("POST", "http://localhost:5000/admin/upload-image");
          
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(xhr.response);
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          };
          
          xhr.onerror = () => reject(new Error('Network error'));
          xhr.send(formData);
        });
        
        await uploadPromise;
        
        // Actualizar a éxito
        setUploadFiles(prev => 
          prev.map((f, idx) => 
            idx === i ? { ...f, status: 'success' as const, progress: 100 } : f
          )
        );
        
        successCount++;
        
      } catch (error) {
        console.error(`Error uploading ${uploadFile.file.name}:`, error);
        
        // Actualizar a error
        setUploadFiles(prev => 
          prev.map((f, idx) => 
            idx === i ? { ...f, status: 'error' as const } : f
          )
        );
        
        failedCount++;
      }
    }
    
    // Mostrar resultados
    if (successCount > 0) {
      onMessage('success', `${successCount} imagen(es) subidas correctamente`);
      
      if (failedCount > 0) {
        onMessage('error', `${failedCount} imagen(es) fallaron al subir`);
      }
      
      // Limpiar después de 2 segundos
      setTimeout(() => {
        clearAll();
        onUploadSuccess();
      }, 2000);
    } else {
      onMessage('error', 'Todas las imágenes fallaron al subir');
    }
    
    setUploading(false);
  };

  const stats = calculateStats();
  const allUniqueTags = Array.from(new Set([
    ...existingTags,
    ...batchTags,
    ...uploadFiles.flatMap(f => f.tags)
  ])).sort();

  return (
    <div className={`rounded-2xl p-6 border ${
      theme === "dark" 
        ? "bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-800" 
        : "bg-gradient-to-br from-white to-blue-50/30 border-blue-100"
    }`}>
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-lg font-semibold mb-1 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <TranslateText text="Subida Inteligente de Imágenes" />
          </h2>
          <p className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            <TranslateText text="Optimización automática y gestión de etiquetas" />
          </p>
        </div>
        
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
              : "bg-blue-100 hover:bg-blue-200 text-blue-700"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>{showAdvanced ? "Ocultar" : "Avanzado"}</span>
        </button>
      </div>

      {/* Estadísticas de compresión */}
      {uploadFiles.length > 0 && (
        <div className={`mb-6 p-4 rounded-xl ${
          theme === "dark" 
            ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30" 
            : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                theme === "dark" ? "bg-blue-800/30" : "bg-blue-100"
              }`}>
                <Zap className={`w-5 h-5 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${
                    theme === "dark" ? "text-blue-300" : "text-blue-700"
                  }`}>
                    {uploadFiles.length} imágenes seleccionadas
                  </span>
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                    theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    <span>Compresión: {stats.percentage.toFixed(0)}%</span>
                  </div>
                </div>
                <div className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  <span className="line-through">{formatFileSize(stats.originalSize)}</span>
                  <span className="mx-2">→</span>
                  <span className="font-semibold text-emerald-500">
                    {formatFileSize(stats.compressedSize)}
                  </span>
                  <span className="ml-2">
                    ({formatFileSize(stats.savings)} ahorrados)
                  </span>
                </div>
              </div>
            </div>
            
            {uploadFiles.length > 0 && (
              <button
                onClick={clearAll}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <X className="w-4 h-4" />
                <TranslateText text="Limpiar todo" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Configuración avanzada */}
      {showAdvanced && (
        <div className={`mb-6 p-4 rounded-xl ${
          theme === "dark" 
            ? "bg-gray-900/50 border border-gray-800" 
            : "bg-white border border-gray-200"
        }`}>
          <h3 className={`text-sm font-semibold mb-3 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            <TranslateText text="Configuración de Optimización" />
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Nivel de compresión */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <TranslateText text="Compresión" />
              </label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as const).map(level => (
                  <button
                    key={level}
                    onClick={() => setCompressionLevel(level)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      compressionLevel === level
                        ? theme === "dark"
                          ? "bg-blue-600 text-white"
                          : "bg-blue-600 text-white"
                        : theme === "dark"
                          ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                          : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {level === 'low' && <TranslateText text="Baja" />}
                    {level === 'medium' && <TranslateText text="Media" />}
                    {level === 'high' && <TranslateText text="Alta" />}
                  </button>
                ))}
              </div>
              <p className={`text-xs mt-1 ${
                theme === "dark" ? "text-gray-500" : "text-gray-500"
              }`}>
                {compressionLevel === 'low' && "Calidad máxima, tamaño más grande"}
                {compressionLevel === 'medium' && "Balance entre calidad y tamaño"}
                {compressionLevel === 'high' && "Tamaño óptimo, calidad reducida"}
              </p>
            </div>
            
            {/* Redimensionamiento */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <TranslateText text="Redimensionar" />
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={autoResize}
                    onChange={(e) => setAutoResize(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <TranslateText text="Automático" />
                  </span>
                </label>
                
                {autoResize && (
                  <div className="flex-1">
                    <select
                      value={maxDimension}
                      onChange={(e) => setMaxDimension(Number(e.target.value))}
                      className={`w-full px-3 py-2 rounded-lg text-sm border ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value={1024}>1024px (Pequeño)</option>
                      <option value={1920}>1920px (HD)</option>
                      <option value={2560}>2560px (2K)</option>
                      <option value={3840}>3840px (4K)</option>
                      <option value={0}>Original</option>
                    </select>
                  </div>
                )}
              </div>
              {autoResize && (
                <p className={`text-xs mt-1 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-500"
                }`}>
                  Imágenes más grandes serán redimensionadas a {maxDimension === 0 ? 'su tamaño original' : `max ${maxDimension}px`}
                </p>
              )}
            </div>
            
            {/* Gestión de etiquetas */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <TranslateText text="Etiquetas de Lote" />
              </label>
              <div className="flex gap-2">
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
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                />
                <button
                  onClick={() => addTagToAll(newTag)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <Tag className="w-4 h-4" />
                </button>
              </div>
              
              {/* Etiquetas existentes */}
              {batchTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {batchTags.map(tag => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        theme === "dark" 
                          ? "bg-blue-900/40 text-blue-300" 
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {tag}
                      <button
                        onClick={() => removeTagFromAll(tag)}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Área de subida */}
      <div className={`border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer mb-6 ${
        dragActive 
          ? theme === "dark"
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-blue-500 bg-blue-50'
          : theme === "dark"
            ? 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/30'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
      }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {uploadFiles.length === 0 ? (
          <div className="py-8 text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
              theme === "dark" 
                ? "bg-gradient-to-br from-gray-800 to-gray-900" 
                : "bg-gradient-to-br from-blue-50 to-indigo-50"
            }`}>
              <CloudUpload className={`w-8 h-8 ${
                theme === "dark" ? "text-blue-400" : "text-blue-500"
              }`} />
            </div>
            <p className={`text-base font-medium mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              <TranslateText text="Arrastra y suelta imágenes aquí" />
            </p>
            <p className={`text-sm mb-1 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              <TranslateText text="o haz clic para seleccionar archivos" />
            </p>
            <p className={`text-xs ${
              theme === "dark" ? "text-gray-500" : "text-gray-500"
            }`}>
              <TranslateText text="Soporta JPG, PNG, WebP, GIF • Máx. 20MB c/u • Hasta 50 imágenes por lote" />
            </p>
            
            {/* Ejemplos de tamaños */}
            <div className={`mt-4 grid grid-cols-3 gap-2 max-w-md mx-auto ${
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`}>
              <div className="text-center">
                <div className={`w-full h-1 mx-auto mb-1 rounded ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                }`} />
                <span className="text-xs">Móvil (1MB)</span>
              </div>
              <div className="text-center">
                <div className={`w-full h-1 mx-auto mb-1 rounded ${
                  theme === "dark" ? "bg-gray-600" : "bg-gray-400"
                }`} />
                <span className="text-xs">Web (3MB)</span>
              </div>
              <div className="text-center">
                <div className={`w-full h-1 mx-auto mb-1 rounded ${
                  theme === "dark" ? "bg-gray-500" : "bg-gray-500"
                }`} />
                <span className="text-xs">Impresión (10MB)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Resumen */}
            <div className={`flex items-center justify-between p-3 rounded-lg ${
              theme === "dark" ? "bg-gray-800/50" : "bg-blue-50/50"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-blue-100"
                }`}>
                  <ImageIcon className={`w-4 h-4 ${
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }`} />
                </div>
                <div>
                  <p className={`text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    {uploadFiles.length} <TranslateText text="imágenes para subir" />
                  </p>
                  <p className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {formatFileSize(stats.originalSize)} → {formatFileSize(stats.compressedSize)}
                    <span className="text-emerald-500 font-medium ml-2">
                      (Ahorro: {stats.percentage.toFixed(0)}%)
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {batchTags.length > 0 && (
                  <div className={`px-2 py-1 rounded text-xs ${
                    theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
                  }`}>
                    {batchTags.length} <TranslateText text="etiquetas" />
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                  }`}
                >
                  <TranslateText text="Añadir más" />
                </button>
              </div>
            </div>
            
            {/* Lista de imágenes */}
            <div className="max-h-64 overflow-y-auto space-y-2">
              {uploadFiles.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    file.status === 'success'
                      ? theme === "dark" ? "bg-emerald-900/20" : "bg-emerald-50"
                      : file.status === 'error'
                      ? theme === "dark" ? "bg-red-900/20" : "bg-red-50"
                      : file.status === 'uploading'
                      ? theme === "dark" ? "bg-blue-900/20" : "bg-blue-50"
                      : theme === "dark" ? "bg-gray-800/30 hover:bg-gray-800/50" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {/* Miniatura */}
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Indicador de estado */}
                    {file.status === 'uploading' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    {file.status === 'success' && (
                      <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-500" />
                      </div>
                    )}
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
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        {file.file.name}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
                      }`}>
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    
                    {/* Detalles */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {file.dimensions && (
                          <span className={`text-xs ${
                            theme === "dark" ? "text-gray-500" : "text-gray-500"
                          }`}>
                            {file.dimensions.width}×{file.dimensions.height}
                          </span>
                        )}
                        
                        {/* Tags individuales */}
                        {file.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {file.tags.slice(0, 2).map(tag => (
                              <span
                                key={tag}
                                className={`text-xs px-1.5 py-0.5 rounded ${
                                  theme === "dark" 
                                    ? "bg-gray-800 text-gray-400" 
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                            {file.tags.length > 2 && (
                              <span className={`text-xs ${
                                theme === "dark" ? "text-gray-500" : "text-gray-500"
                              }`}>
                                +{file.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Progreso o acción */}
                      {file.status === 'uploading' ? (
                        <div className="flex items-center gap-2">
                          <div className={`w-20 h-1 rounded-full overflow-hidden ${
                            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                          }`}>
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <span className={`text-xs w-8 text-right ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}>
                            {file.progress}%
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className={`p-1 rounded ${
                            theme === "dark"
                              ? "text-gray-500 hover:text-white hover:bg-gray-700"
                              : "text-gray-400 hover:text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          {/* Etiquetas disponibles */}
          {allUniqueTags.length > 0 && (
            <div className="mb-3">
              <p className={`text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <TranslateText text="Etiquetas disponibles:" />
              </p>
              <div className="flex flex-wrap gap-1">
                {allUniqueTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      // Si ya está en batchTags, quitarlo, sino añadirlo a todas
                      if (batchTags.includes(tag)) {
                        removeTagFromAll(tag);
                      } else {
                        addTagToAll(tag);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                      batchTags.includes(tag)
                        ? theme === "dark"
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-700 border border-blue-300"
                        : theme === "dark"
                          ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                          : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={clearAll}
            disabled={uploadFiles.length === 0 || uploading}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              uploadFiles.length === 0 || uploading
                ? theme === "dark"
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                : theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <TranslateText text="Cancelar" />
          </button>
          
          <button
            onClick={handleUpload}
            disabled={uploadFiles.length === 0 || uploading}
            className={`px-6 py-3 rounded-xl font-medium transition-all relative overflow-hidden group ${
              uploadFiles.length === 0 || uploading
                ? theme === "dark"
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
            }`}
          >
            {uploading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span><TranslateText text="Subiendo..." /></span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                <span>
                  <TranslateText text="Subir" /> ({uploadFiles.length})
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  theme === "dark" ? "bg-blue-600/50" : "bg-white/20"
                }`}>
                  {formatFileSize(stats.compressedSize)}
                </span>
              </div>
            )}
            
            {/* Efecto de brillo */}
            {!uploading && uploadFiles.length > 0 && (
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            )}
          </button>
        </div>
      </div>
      
      {/* Información adicional */}
      <div className={`mt-4 pt-4 border-t ${
        theme === "dark" ? "border-gray-800" : "border-gray-200"
      }`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded ${
              theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
            }`}>
              <Check className={`w-3 h-3 ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`} />
            </div>
            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              <TranslateText text="Optimización automática" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded ${
              theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"
            }`}>
              <Filter className={`w-3 h-3 ${
                theme === "dark" ? "text-purple-400" : "text-purple-600"
              }`} />
            </div>
            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              <TranslateText text="Compresión inteligente" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded ${
              theme === "dark" ? "bg-emerald-900/30" : "bg-emerald-100"
            }`}>
              <HardDrive className={`w-3 h-3 ${
                theme === "dark" ? "text-emerald-400" : "text-emerald-600"
              }`} />
            </div>
            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              <TranslateText text="Ahorro de espacio" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded ${
              theme === "dark" ? "bg-amber-900/30" : "bg-amber-100"
            }`}>
              <Compass className={`w-3 h-3 ${
                theme === "dark" ? "text-amber-400" : "text-amber-600"
              }`} />
            </div>
            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              <TranslateText text="SEO mejorado" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}