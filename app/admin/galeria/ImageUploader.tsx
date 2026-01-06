"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { 
  Upload, Image as ImageIcon, X, Check, 
  AlertCircle, Compass, Zap, Settings, 
  Filter, Clock, HardDrive, CloudUpload,
  Sparkles, Tag, PauseCircle, PlayCircle,
  AlertTriangle, Loader2, RefreshCw
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
  id: string;
  file: File;
  preview: string;
  size: number;
  dimensions: { width: number; height: number };
  estimatedCompression: number;
  status: 'pending' | 'uploading' | 'success' | 'error' | 'paused';
  progress: number;
  tags: string[];
  errorMessage?: string;
}

interface CompressionStats {
  originalSize: number;
  compressedSize: number;
  savings: number;
  percentage: number;
}

// Configuración optimizada para upload masivo
const UPLOAD_CONFIG = {
  MAX_CONCURRENT_UPLOADS: 5, // Aumentado de 3 a 5
  MAX_BATCH_SIZE: 100,
  MAX_FILE_SIZE: 20 * 1024 * 1024,
  MAX_TOTAL_SIZE: 500 * 1024 * 1024,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1500, // Reducido de 2000ms a 1500ms
  CHUNK_SIZE: 1024 * 1024, // Aumentado de 512KB a 1MB
  UPLOAD_TIMEOUT: 15000, // Reducido a 15s para una imagen
} as const;

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
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [autoResize, setAutoResize] = useState(true);
  const [maxDimension, setMaxDimension] = useState(1920);
  const [newTag, setNewTag] = useState('');
  const [batchTags, setBatchTags] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<string[]>([]);
  const [activeUploads, setActiveUploads] = useState<Set<string>>(new Set());
  const [uploadStats, setUploadStats] = useState({
    total: 0,
    success: 0,
    failed: 0,
    pending: 0,
    speed: 0,
    remainingTime: 0,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllers = useRef<Map<string, AbortController>>(new Map());
  const uploadStartTime = useRef<number>(0);
  const uploadBytes = useRef<number>(0);
  const uploadingRef = useRef(false);
  const uploadQueueRef = useRef<string[]>([]);
  const completedUploadsRef = useRef<Set<string>>(new Set());
  const uploadFilesRef = useRef<UploadFile[]>([]);

  // Limpiar memoria al desmontar
  useEffect(() => {
    return () => {
      uploadFiles.forEach(file => {
        if (file.preview.startsWith('blob:')) {
          URL.revokeObjectURL(file.preview);
        }
      });
      abortControllers.current.forEach(controller => controller.abort());
      abortControllers.current.clear();
    };
  }, []);

  // Generar ID único
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Optimizar obtención de dimensiones
  const getImageDimensions = useCallback((file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      console.time(`Dimensiones ${file.name}`);
      
      // Para TODOS los archivos, usar valores por defecto primero para velocidad máxima
      // Solo obtener dimensiones reales si es necesario para compresión
      if (file.size > 10 * 1024 * 1024) { // Solo para archivos muy grandes >10MB
        console.timeEnd(`Dimensiones ${file.name}`);
        resolve({ width: 1920, height: 1080 });
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);

      const timeout = setTimeout(() => {
        console.warn(`Timeout obteniendo dimensiones de ${file.name}`);
        URL.revokeObjectURL(url);
        console.timeEnd(`Dimensiones ${file.name}`);
        resolve({ width: 1920, height: 1080 });
      }, 1000); // Reducido a 1 segundo

      img.onload = () => {
        clearTimeout(timeout);
        console.timeEnd(`Dimensiones ${file.name}`);
        resolve({
          width: img.width,
          height: img.height
        });
        URL.revokeObjectURL(url);
      };

      img.onerror = () => {
        clearTimeout(timeout);
        console.warn(`Error obteniendo dimensiones de ${file.name}`);
        URL.revokeObjectURL(url);
        console.timeEnd(`Dimensiones ${file.name}`);
        resolve({ width: 1920, height: 1080 });
      };

      img.src = url;
    });
  }, []);

  const estimateCompression = useCallback((file: File, dimensions?: { width: number; height: number }): number => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    
    let savings = 0.3; // Valor por defecto
    
    if (ext === 'png') savings = 0.4;
    else if (ext === 'jpg' || ext === 'jpeg') savings = 0.2;
    else if (ext === 'webp') savings = 0.1; // WebP ya es eficiente
    
    if (compressionLevel === 'low') savings *= 0.5;
    if (compressionLevel === 'high') savings *= 1.5;
    
    if (dimensions && autoResize && maxDimension > 0) {
      const maxPixels = maxDimension * maxDimension;
      const currentPixels = dimensions.width * dimensions.height;
      if (currentPixels > maxPixels) {
        savings += 0.15;
      }
    }
    
    return Math.min(savings, 0.8);
  }, [compressionLevel, autoResize, maxDimension]);

  const validateFiles = useCallback((files: File[]): { valid: File[], errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];
    let totalSize = 0;

    for (const file of files) {
      // Validar tipo
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name}: No es una imagen válida`);
        continue;
      }
      
      // Validar tamaño individual
      if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
        errors.push(`${file.name}: Supera los 20MB límite`);
        continue;
      }
      
      // Validar tamaño total del batch
      totalSize += file.size;
      if (totalSize > UPLOAD_CONFIG.MAX_TOTAL_SIZE) {
        errors.push(`Batch supera los 500MB totales`);
        break;
      }
      
      // Validar extensión
      const ext = file.name.split('.').pop()?.toLowerCase();
      const allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
      if (!ext || !allowedExts.includes(ext)) {
        errors.push(`${file.name}: Formato no soportado`);
        continue;
      }
      
      valid.push(file);
    }
    
    return { valid, errors };
  }, []);

  const handleFileSelect = async (files: FileList | File[]) => {
    console.log('🚀 handleFileSelect called with:', files.length, 'files');
    const fileArray = Array.from(files);
    const newFiles: UploadFile[] = [];
    
    // Validar cantidad máxima
    if (fileArray.length > UPLOAD_CONFIG.MAX_BATCH_SIZE) {
      console.log('❌ Too many files:', fileArray.length, '>', UPLOAD_CONFIG.MAX_BATCH_SIZE);
      onMessage('error', `Máximo ${UPLOAD_CONFIG.MAX_BATCH_SIZE} imágenes por lote`);
      return;
    }
    
    // Validar archivos
    const { valid, errors } = validateFiles(fileArray);
    console.log('📋 Validation result:', { valid: valid.length, errors: errors.length });
    
    // Mostrar errores
    if (errors.length > 0) {
      console.log('⚠️ Validation errors:', errors);
      errors.slice(0, 3).forEach(error => onMessage('error', error));
      if (errors.length > 3) {
        onMessage('error', `Y ${errors.length - 3} errores más...`);
      }
    }
    
    if (valid.length === 0) {
      console.log('❌ No valid files to process');
      return;
    }
    
    console.log('✅ Processing', valid.length, 'valid files');
    
    // Procesar archivos validados en paralelo con límite optimizado
    const batchSize = Math.min(10, valid.length); // Procesar hasta 10 imágenes a la vez, o todas si son menos
    const batches = [];
    
    for (let i = 0; i < valid.length; i += batchSize) {
      batches.push(valid.slice(i, i + batchSize));
    }
    
    // Si solo hay un lote pequeño, procesarlo directamente sin esperar
    if (batches.length === 1 && batches[0].length <= 5) {
      const batchPromises = batches[0].map(async (file) => {
        try {
          console.time(`Procesando ${file.name}`);
          const preview = URL.createObjectURL(file);
          
          // Usar dimensiones por defecto para velocidad máxima
          // Solo obtener reales si se necesita para compresión avanzada
          const dimensions = { width: 1920, height: 1080 };
          
          const estimatedCompression = estimateCompression(file, dimensions);
          
          console.timeEnd(`Procesando ${file.name}`);
          return {
            id: generateId(),
            file,
            preview,
            size: file.size,
            dimensions,
            estimatedCompression,
            status: 'pending' as const,
            progress: 0,
            tags: [...batchTags]
          };
        } catch (error) {
          console.error(`Error procesando ${file.name}:`, error);
          return null;
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      const validResults = batchResults.filter(f => f !== null) as UploadFile[];
      newFiles.push(...validResults);
      
      // Actualizar UI inmediatamente
      setUploadFiles(prev => {
        const newFiles = [...prev, ...validResults];
        uploadFilesRef.current = newFiles;
        return newFiles;
      });
    } else {
      // Para lotes múltiples, procesar secuencialmente
      
      for (const batch of batches) {
        const batchPromises = batch.map(async (file) => {
          try {
            console.time(`Procesando ${file.name}`);
            const preview = URL.createObjectURL(file);
            
            // Usar dimensiones por defecto para velocidad máxima
            const dimensions = { width: 1920, height: 1080 };
            
            const estimatedCompression = estimateCompression(file, dimensions);
            
            console.timeEnd(`Procesando ${file.name}`);
            return {
              id: generateId(),
              file,
              preview,
              size: file.size,
              dimensions,
              estimatedCompression,
              status: 'pending' as const,
              progress: 0,
              tags: [...batchTags]
            };
          } catch (error) {
            console.error(`Error procesando ${file.name}:`, error);
            return null;
          }
        });
        
        const batchResults = await Promise.all(batchPromises);
        const validResults = batchResults.filter(f => f !== null) as UploadFile[];
        newFiles.push(...validResults);
        
        // Actualizar UI progresivamente
        setUploadFiles(prev => {
          const newFiles = [...prev, ...validResults];
          uploadFilesRef.current = newFiles;
          return newFiles;
        });
      }
    }
    
    // Mostrar mensaje de éxito
    if (newFiles.length === 1) {
      onMessage('success', `1 imagen añadida para subir`);
    } else {
      onMessage('success', `${newFiles.length} imágenes añadidas para subir`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files);
      e.target.value = ''; // Reset input
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

  const removeFile = (id: string) => {
    setUploadFiles(prev => {
      const newFiles = prev.filter(f => f.id !== id);
      uploadFilesRef.current = newFiles;
      const fileToRemove = prev.find(f => f.id === id);
      
      if (fileToRemove && fileToRemove.preview.startsWith('blob:')) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      
      // Cancelar upload si está activo
      const controller = abortControllers.current.get(id);
      if (controller) {
        controller.abort();
        abortControllers.current.delete(id);
      }
      
      return newFiles;
    });
    
    // Actualizar cola y uploads activos
    setUploadQueue(prev => prev.filter(fileId => fileId !== id));
    uploadQueueRef.current = uploadQueueRef.current.filter(fileId => fileId !== id);
    setActiveUploads(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    
    // Actualizar estadísticas
    updateUploadStats();
  };

  const clearAll = () => {
    // Cancelar todas las subidas activas
    abortControllers.current.forEach(controller => controller.abort());
    abortControllers.current.clear();
    
    // Liberar memoria de todas las previews
    uploadFiles.forEach(file => {
      if (file.preview.startsWith('blob:')) {
        URL.revokeObjectURL(file.preview);
      }
    });
    
    // Resetear estado
    setUploadFiles([]);
    uploadFilesRef.current = [];
    setUploadQueue([]);
    setActiveUploads(new Set());
    uploadingRef.current = false;
    setUploading(false);
    setIsPaused(false);
    completedUploadsRef.current.clear();
    setUploadStats({
      total: 0,
      success: 0,
      failed: 0,
      pending: 0,
      speed: 0,
      remainingTime: 0,
    });
    
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleUploadPause = () => {
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);
    
    if (newPausedState) {
      // Pausar: cancelar todos los uploads activos
      abortControllers.current.forEach(controller => controller.abort());
      abortControllers.current.clear();
      setActiveUploads(new Set());
      
      // Cambiar estado de uploads activos a pausados
      setUploadFiles(prev => {
        const newFiles = prev.map(file => 
          file.status === 'uploading' ? { ...file, status: 'paused' as const } : file
        );
        uploadFilesRef.current = newFiles;
        return newFiles;
      });
      
      onMessage('success', 'Upload pausado');
    } else {
      // Reanudar
      onMessage('success', 'Upload reanudado');
      processUploadQueue();
    }
  };

  const updateUploadStats = useCallback(() => {
    const total = uploadFiles.length;
    const success = uploadFiles.filter(f => f.status === 'success').length;
    const failed = uploadFiles.filter(f => f.status === 'error').length;
    const pending = uploadFiles.filter(f => 
      f.status === 'pending' || f.status === 'uploading' || f.status === 'paused'
    ).length;
    
    // Calcular velocidad si hay upload en progreso
    let speed = 0;
    let remainingTime = 0;
    
    if (uploadStartTime.current > 0 && uploadBytes.current > 0) {
      const elapsedSeconds = (Date.now() - uploadStartTime.current) / 1000;
      if (elapsedSeconds > 0) {
        speed = uploadBytes.current / elapsedSeconds; // bytes por segundo
        
        const remainingBytes = uploadFiles
          .filter(f => f.status === 'pending' || f.status === 'paused')
          .reduce((sum, f) => sum + f.size, 0);
        
        remainingTime = remainingBytes / speed;
      }
    }
    
    setUploadStats({
      total,
      success,
      failed,
      pending,
      speed,
      remainingTime,
    });
  }, [uploadFiles]);

  useEffect(() => {
    updateUploadStats();
  }, [uploadFiles, updateUploadStats]);

  const processUploadQueue = useCallback(async () => {
    console.log('🔄 processUploadQueue called', { isPaused, uploading: uploadingRef.current, activeUploadsSize: activeUploads.size, queueLength: uploadQueueRef.current.length });
    if (isPaused || !uploadingRef.current) {
      console.log('⏸️ Queue processing paused or not uploading');
      return;
    }
    
    const availableSlots = UPLOAD_CONFIG.MAX_CONCURRENT_UPLOADS - activeUploads.size;
    console.log(`📊 Available slots: ${availableSlots}`);
    
    if (availableSlots <= 0 || uploadQueueRef.current.length === 0) {
      console.log('⏳ No available slots or empty queue');
      // Verificar si terminó todo
      if (activeUploads.size === 0 && uploadQueueRef.current.length === 0) {
        console.log(`🏁 Checking completion: completed=${completedUploadsRef.current.size}, total=${uploadFiles.length}`);
        
        if (completedUploadsRef.current.size === uploadFilesRef.current.length) {
          console.log('🎊 All uploads completed!');
          finishUpload();
        }
      }
      return;
    }
    
    // Tomar los próximos archivos disponibles
    const nextBatch = uploadQueueRef.current.slice(0, availableSlots);
    console.log(`📦 Processing next batch:`, nextBatch);
    uploadQueueRef.current = uploadQueueRef.current.slice(availableSlots);
    setUploadQueue(uploadQueueRef.current);
    
    for (const fileId of nextBatch) {
      console.log(`▶️ Starting upload for fileId: ${fileId}`);
      setActiveUploads(prev => new Set([...prev, fileId]));
      await uploadSingleFile(fileId);
    }
  }, [isPaused, activeUploads.size, uploadFiles]);

  const uploadSingleFile = async (fileId: string, retryCount = 0): Promise<void> => {
    console.log(`📤 Starting upload for fileId: ${fileId}, retry: ${retryCount}`);
    const fileIndex = uploadFiles.findIndex(f => f.id === fileId);
    if (fileIndex === -1) {
      console.log(`❌ File not found in uploadFiles: ${fileId}`);
      setActiveUploads(prev => {
        const next = new Set(prev);
        next.delete(fileId);
        return next;
      });
      return;
    }
    
    const uploadFile = uploadFiles[fileIndex];
    console.log(`📄 Uploading file: ${uploadFile.file.name} (${formatFileSize(uploadFile.file.size)})`);
    
    if (!uploadFile || uploadFile.status === 'success' || (isPaused && uploadFile.status !== 'uploading')) {
      console.log(`⏭️ Skipping file ${fileId} - status: ${uploadFile?.status}, paused: ${isPaused}`);
      setActiveUploads(prev => {
        const next = new Set(prev);
        next.delete(fileId);
        return next;
      });
      return;
    }
    
    console.time(`Upload ${uploadFile.file.name}`);
    
    try {
      // Crear abort controller
      const controller = new AbortController();
      abortControllers.current.set(fileId, controller);
      
      // Iniciar timeout
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, UPLOAD_CONFIG.UPLOAD_TIMEOUT);
      
      // Actualizar estado a uploading
      setUploadFiles(prev => {
        const newFiles = prev.map(f => 
          f.id === fileId ? { ...f, status: 'uploading' as const, progress: 0 } : f
        );
        uploadFilesRef.current = newFiles;
        return newFiles;
      });
      
      const formData = new FormData();
      formData.append("image", uploadFile.file);
      formData.append("compression", compressionLevel);
      formData.append("maxDimension", autoResize ? maxDimension.toString() : "0");
      formData.append("tags", JSON.stringify(uploadFile.tags));
      
      console.log(`📋 FormData prepared for ${uploadFile.file.name}:`, {
        fileName: uploadFile.file.name,
        fileSize: uploadFile.file.size,
        compression: compressionLevel,
        maxDimension: autoResize ? maxDimension : 0,
        tags: uploadFile.tags
      });
      
      // Configurar progress tracking
      let uploadedBytes = 0;
      const xhr = new XMLHttpRequest();
      
      const uploadPromise = new Promise<void>((resolve, reject) => {
        xhr.open("POST", "http://localhost:5000/admin/upload-image");
        
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            uploadedBytes = event.loaded;
            const progress = Math.round((event.loaded / event.total) * 100);
            
            setUploadFiles(prev => {
              const newFiles = prev.map(f => 
                f.id === fileId ? { ...f, progress } : f
              );
              uploadFilesRef.current = newFiles;
              return newFiles;
            });
            
            // Actualizar estadísticas de velocidad
            uploadBytes.current += event.loaded - uploadedBytes;
          }
        };
        
        xhr.onload = () => {
          clearTimeout(timeoutId);
          console.log(`✅ XHR onload for ${uploadFile.file.name}: status ${xhr.status}`);
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log(`🎉 Upload successful for ${uploadFile.file.name}`);
            resolve();
          } else {
            console.error(`❌ XHR error for ${uploadFile.file.name}: HTTP ${xhr.status} - ${xhr.statusText}`);
            reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
          }
        };
        
        xhr.onerror = () => {
          clearTimeout(timeoutId);
          console.error(`🔥 XHR network error for ${uploadFile.file.name}`);
          reject(new Error('Network error'));
        };
        
        xhr.onabort = () => {
          clearTimeout(timeoutId);
          console.log(`🛑 XHR aborted for ${uploadFile.file.name}`);
          reject(new Error('Upload aborted'));
        };
        
        console.time(`XHR ${uploadFile.file.name}`);
        xhr.send(formData);
      });
      
      await uploadPromise;
      console.timeEnd(`XHR ${uploadFile.file.name}`);
      
      // Éxito
      console.timeEnd(`Upload ${uploadFile.file.name}`);
      setUploadFiles(prev => {
        const newFiles = prev.map(f => 
          f.id === fileId ? { ...f, status: 'success' as const, progress: 100 } : f
        );
        uploadFilesRef.current = newFiles;
        return newFiles;
      });
      completedUploadsRef.current.add(fileId);
      
      onMessage('success', `${uploadFile.file.name} subida exitosamente`);
      
    } catch (error: any) {
      console.error(`💥 Upload failed for ${uploadFile.file.name}:`, error);
      // Cancelar el abort controller si existe
      const controller = abortControllers.current.get(fileId);
      if (controller) {
        controller.abort();
      }
      
      if (error.name === 'AbortError' || error.message === 'Upload aborted') {
        // Upload cancelado por pausa o timeout
        console.log(`⏸️ Upload paused/aborted for ${uploadFile.file.name}`);
        setUploadFiles(prev => {
          const newFiles = prev.map(f => 
            f.id === fileId ? { ...f, status: 'paused' as const } : f
          );
          uploadFilesRef.current = newFiles;
          return newFiles;
        });
      } else if (retryCount < UPLOAD_CONFIG.RETRY_ATTEMPTS) {
        // Reintentar
        console.log(`🔄 Retrying upload for ${uploadFile.file.name} (attempt ${retryCount + 1}/${UPLOAD_CONFIG.RETRY_ATTEMPTS})`);
        await new Promise(resolve => 
          setTimeout(resolve, UPLOAD_CONFIG.RETRY_DELAY * (retryCount + 1))
        );
        return uploadSingleFile(fileId, retryCount + 1);
      } else {
        // Error definitivo
        const errorMsg = error.message || 'Error desconocido';
        console.error(`💀 Final upload failure for ${uploadFile.file.name}: ${errorMsg}`);
        setUploadFiles(prev => {
          const newFiles = prev.map(f => 
            f.id === fileId ? { 
              ...f, 
              status: 'error' as const, 
              errorMessage: errorMsg 
            } : f
          );
          uploadFilesRef.current = newFiles;
          return newFiles;
        });
        onMessage('error', `Falló ${uploadFile.file.name}: ${errorMsg}`);
      }
    } finally {
      // Limpiar
      abortControllers.current.delete(fileId);
      setActiveUploads(prev => {
        const next = new Set(prev);
        next.delete(fileId);
        return next;
      });
      
      // Procesar siguiente en la cola
      setTimeout(() => processUploadQueue(), 100);
    }
  };

  const finishUpload = () => {
    uploadingRef.current = false;
    setUploading(false);
    setIsPaused(false);
    
    const successCount = uploadFiles.filter(f => f.status === 'success').length;
    const errorCount = uploadFiles.filter(f => f.status === 'error').length;
    const totalTime = uploadStartTime.current > 0 
      ? (Date.now() - uploadStartTime.current) / 1000 
      : 0;
    
    if (successCount > 0) {
      onMessage('success', 
        `${successCount} imágenes subidas exitosamente en ${Math.round(totalTime)} segundos`
      );
      
      if (errorCount > 0) {
        onMessage('error', 
          `${errorCount} imágenes fallaron. Puedes reintentarlas.`
        );
      }
      
      // Refrescar galería
      setTimeout(() => {
        if (successCount > 0) {
          onUploadSuccess();
        }
        
        // Mantener solo las que fallaron
        setUploadFiles(prev => prev.filter(f => f.status === 'error'));
      }, 3000);
    } else {
      onMessage('error', 'Todas las imágenes fallaron al subir');
    }
    
    // Resetear estadísticas
    uploadStartTime.current = 0;
    uploadBytes.current = 0;
  };

  const handleUpload = async () => {
    console.log('🚀 handleUpload called');
    if (uploadFiles.length === 0) {
      console.log('❌ No files to upload');
      return;
    }
    
    console.log(`📤 Starting upload process for ${uploadFilesRef.current.length} files`);
    uploadingRef.current = true;
    setUploading(true);
    setIsPaused(false);
    
    // Inicializar estadísticas
    uploadStartTime.current = Date.now();
    uploadBytes.current = 0;
    
    // Crear cola con archivos pendientes
    const pendingFiles = uploadFilesRef.current
      .filter(f => f.status === 'pending' || f.status === 'error')
      .map(f => f.id);
    
    console.log(`📋 Pending files queue:`, pendingFiles);
    uploadQueueRef.current = pendingFiles;
    setUploadQueue(pendingFiles);
    setActiveUploads(new Set());
    completedUploadsRef.current.clear();
    
    // Iniciar procesamiento
    processUploadQueue();
  };

  const retryFailed = () => {
    const failedFiles = uploadFiles.filter(f => f.status === 'error');
    if (failedFiles.length === 0) return;
    
    // Resetear archivos fallidos
    setUploadFiles(prev => {
      const newFiles = prev.map(f => 
        f.status === 'error' ? { ...f, status: 'pending' as const, progress: 0 } : f
      );
      uploadFilesRef.current = newFiles;
      return newFiles;
    });
    
    // Agregar a la cola si ya está subiendo
    if (uploading) {
      const failedIds = failedFiles.map(f => f.id);
      failedIds.forEach(id => completedUploadsRef.current.delete(id)); // Remove from completed if retrying
      setUploadQueue(prev => [...prev, ...failedIds]);
      uploadQueueRef.current = [...uploadQueueRef.current, ...failedIds];
      processUploadQueue();
    }
  };

  const addTagToAll = (tag: string) => {
    if (!tag.trim() || batchTags.includes(tag)) return;
    
    const newTags = [...batchTags, tag.trim()];
    setBatchTags(newTags);
    
    setUploadFiles(prev => 
      prev.map(file => ({
        ...file,
        tags: [...new Set([...file.tags, tag.trim()])]
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

  const calculateStats = (): CompressionStats => {
    const filesToUpload = uploadFiles.filter(f => 
      f.status === 'pending' || f.status === 'error'
    );
    
    const originalSize = filesToUpload.reduce((sum, file) => sum + file.size, 0);
    const compressedSize = filesToUpload.reduce((sum, file) => 
      sum + file.size * (1 - file.estimatedCompression), 0
    );
    
    const savings = originalSize - compressedSize;
    const percentage = originalSize > 0 ? (savings / originalSize) * 100 : 0;
    
    return { originalSize, compressedSize, savings, percentage };
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${Math.round(seconds / 3600)}h`;
  };

  const stats = calculateStats();
  const allUniqueTags = Array.from(new Set([
    ...existingTags,
    ...batchTags,
    ...uploadFiles.flatMap(f => f.tags)
  ])).sort();

  const uploadingCount = uploadFiles.filter(f => f.status === 'uploading').length;
  const pendingCount = uploadFiles.filter(f => f.status === 'pending' || f.status === 'paused').length;

  return (
    <div className={`rounded-2xl p-6 border ${
      theme === "dark" 
        ? "bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-800" 
        : "bg-gradient-to-br from-white to-blue-50/30 border-blue-100"
    }`}>
      {/* Encabezado con controles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className={`text-lg font-semibold mb-1 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <TranslateText text="Subida Masiva de Imágenes" />
          </h2>
          <p className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            <TranslateText text="Gestión inteligente con control de concurrencia" />
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {uploading && (
            <>
              <button
                onClick={toggleUploadPause}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isPaused
                    ? theme === "dark"
                      ? "bg-emerald-800 hover:bg-emerald-700 text-emerald-200"
                      : "bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
                    : theme === "dark"
                      ? "bg-amber-800 hover:bg-amber-700 text-amber-200"
                      : "bg-amber-100 hover:bg-amber-200 text-amber-700"
                }`}
              >
                {isPaused ? (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    <span>Reanudar</span>
                  </>
                ) : (
                  <>
                    <PauseCircle className="w-4 h-4" />
                    <span>Pausar</span>
                  </>
                )}
              </button>
              
              {uploadStats.failed > 0 && (
                <button
                  onClick={retryFailed}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    theme === "dark"
                      ? "bg-red-800 hover:bg-red-700 text-red-200"
                      : "bg-red-100 hover:bg-red-200 text-red-700"
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reintentar ({uploadStats.failed})</span>
                </button>
              )}
            </>
          )}
          
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
      </div>

      {/* Panel de control de uploads */}
      {uploading && (
        <div className={`mb-6 p-4 rounded-xl ${
          theme === "dark" 
            ? "bg-gray-800/60 border border-gray-700" 
            : "bg-blue-50/60 border border-blue-200"
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                theme === "dark" ? "bg-blue-800/40 text-blue-300" : "bg-blue-100 text-blue-700"
              }`}>
                {UPLOAD_CONFIG.MAX_CONCURRENT_UPLOADS} simultáneos
              </div>
              
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                    {uploadStats.success} exitosas
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                    {uploadingCount} activas
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                    {pendingCount} pendientes
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                    {uploadStats.failed} fallidas
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-sm">
              {uploadStats.speed > 0 && (
                <div className="flex items-center gap-2">
                  <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                    Velocidad: {formatFileSize(uploadStats.speed)}/s
                  </span>
                  <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                    | Tiempo restante: {formatTime(uploadStats.remainingTime)}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Barra de progreso general */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                Progreso general
              </span>
              <span className="font-medium">
                {uploadStats.success + uploadStats.failed} / {uploadStats.total}
              </span>
            </div>
            <div className={`h-2.5 rounded-full overflow-hidden ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`}>
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 transition-all duration-500"
                style={{ 
                  width: `${((uploadStats.success + uploadStats.failed) / uploadStats.total) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Estadísticas de compresión */}
      {uploadFiles.length > 0 && (
        <div className={`mb-6 p-4 rounded-xl ${
          theme === "dark" 
            ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30" 
            : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                theme === "dark" ? "bg-blue-800/30" : "bg-blue-100"
              }`}>
                <Zap className={`w-5 h-5 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-sm font-medium ${
                    theme === "dark" ? "text-blue-300" : "text-blue-700"
                  }`}>
                    {uploadFiles.length} imágenes seleccionadas
                  </span>
                  {stats.percentage > 0 && (
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                      theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
                    }`}>
                      <Sparkles className="w-3 h-3" />
                      <span>Compresión: {stats.percentage.toFixed(0)}%</span>
                    </div>
                  )}
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
            
            <div className="flex gap-2">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
              <div className="space-y-2">
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
                    <TranslateText text="Redimensionar automáticamente" />
                  </span>
                </label>
                
                {autoResize && (
                  <select
                    value={maxDimension}
                    onChange={(e) => setMaxDimension(Number(e.target.value))}
                    className={`w-full px-3 py-2 rounded-lg text-sm border ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value={800}>800px (Móvil)</option>
                    <option value={1024}>1024px (Tablet)</option>
                    <option value={1920}>1920px (HD)</option>
                    <option value={2560}>2560px (2K)</option>
                    <option value={0}>Mantener original</option>
                  </select>
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
                        className="hover:text-red-400 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Información de límites */}
          <div className={`mt-4 pt-4 border-t ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-3 h-3 ${
                  theme === "dark" ? "text-amber-500" : "text-amber-600"
                }`} />
                <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                  Máx. {UPLOAD_CONFIG.MAX_BATCH_SIZE} imágenes/lote
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-3 h-3 ${
                  theme === "dark" ? "text-amber-500" : "text-amber-600"
                }`} />
                <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                  Máx. {UPLOAD_CONFIG.MAX_CONCURRENT_UPLOADS} simultáneas
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Área de subida */}
      <div className={`border-2 border-dashed rounded-xl p-6 transition-all mb-6 ${
        dragActive 
          ? theme === "dark"
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-blue-500 bg-blue-50'
          : theme === "dark"
            ? 'border-gray-700 hover:border-gray-600'
            : 'border-gray-300 hover:border-blue-400'
      } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
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
              <TranslateText text={`Soporta JPG, PNG, WebP, GIF • Máx. ${UPLOAD_CONFIG.MAX_FILE_SIZE / (1024*1024)}MB c/u • Hasta ${UPLOAD_CONFIG.MAX_BATCH_SIZE} imágenes`} />
            </p>
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
                    !uploading && fileInputRef.current?.click();
                  }}
                  disabled={uploading}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    uploading
                      ? theme === "dark"
                        ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : theme === "dark"
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                  }`}
                >
                  <TranslateText text="Añadir más" />
                </button>
              </div>
            </div>
            
            {/* Lista de imágenes con scroll virtualizado */}
            <div className="max-h-80 overflow-y-auto space-y-2 pr-2">
              {uploadFiles.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    file.status === 'success'
                      ? theme === "dark" ? "bg-emerald-900/20" : "bg-emerald-50"
                      : file.status === 'error'
                      ? theme === "dark" ? "bg-red-900/20" : "bg-red-50"
                      : file.status === 'uploading'
                      ? theme === "dark" ? "bg-blue-900/20" : "bg-blue-50"
                      : file.status === 'paused'
                      ? theme === "dark" ? "bg-amber-900/20" : "bg-amber-50"
                      : theme === "dark" ? "bg-gray-800/30" : "bg-gray-50"
                  }`}
                >
                  {/* Miniatura */}
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-full object-cover"
                      onLoad={() => {
                        // Liberar memoria después de cargar
                        if (file.status === 'success' || file.status === 'error') {
                          setTimeout(() => {
                            if (file.preview.startsWith('blob:')) {
                              URL.revokeObjectURL(file.preview);
                            }
                          }, 1000);
                        }
                      }}
                    />
                    
                    {/* Indicador de estado */}
                    {file.status === 'uploading' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                    {file.status === 'paused' && (
                      <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                        <PauseCircle className="w-4 h-4 text-amber-500" />
                      </div>
                    )}
                  </div>
                  
                  {/* Información */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <p className={`text-sm font-medium truncate ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`} title={file.file.name}>
                        {file.file.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
                        }`}>
                          {formatFileSize(file.size)}
                        </span>
                        {file.errorMessage && (
                          <span className="text-xs text-red-500" title={file.errorMessage}>
                            Error
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Detalles y progreso */}
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
                            removeFile(file.id);
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
              <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto p-1">
                {allUniqueTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
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
            disabled={uploading && !isPaused}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              uploading && !isPaused
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
            disabled={uploadFiles.length === 0 || (uploading && !isPaused)}
            className={`px-6 py-3 rounded-xl font-medium transition-all relative overflow-hidden group ${
              uploadFiles.length === 0 || (uploading && !isPaused)
                ? theme === "dark"
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
            }`}
          >
            {uploading && !isPaused ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span><TranslateText text="Subiendo..." /></span>
              </div>
            ) : isPaused ? (
              <div className="flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                <span><TranslateText text="Continuar Subida" /></span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                <span>
                  <TranslateText text="Iniciar Subida" /> ({uploadFiles.length})
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
              <TranslateText text="Upload optimizado" />
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