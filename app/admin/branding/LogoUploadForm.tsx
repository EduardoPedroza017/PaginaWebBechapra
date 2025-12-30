import React, { useRef, useState, useEffect } from "react";
import { TranslateText } from '@/components/TranslateText';
import { Upload, X, Image, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface LogoUploadFormProps {
  uploading?: boolean;
  onUpload: (file: File) => void;
}

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ['image/png','image/jpeg','image/webp','image/svg+xml'];

export const LogoUploadForm: React.FC<LogoUploadFormProps> = ({ uploading: uploadingProp = false, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  useEffect(() => {
    setUploading(uploadingProp);
  }, [uploadingProp]);

  function validateFile(file: File) {
    if (!ALLOWED.includes(file.type)) return 'Tipo de archivo no permitido. Usa PNG, JPEG, WebP o SVG.';
    if (file.size > MAX_SIZE) return `El archivo (${Math.round(file.size/1024/1024*100)/100} MB) supera el tamaño máximo de 5 MB.`;
    return null;
  }

  function handleFiles(file?: File) {
    setError(null);
    setUploadSuccess(false);
    if (!file) return;
    
    const err = validateFile(file);
    if (err) {
      setError(err);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFiles(f);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFiles(f);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function doUpload() {
    if (!selectedFile) return;
    setError(null);
    setUploadSuccess(false);
    setProgress(0);
    setUploading(true);

    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:5000/admin/upload-logo', true);
      xhr.withCredentials = true;

      xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
          const pct = Math.round((event.loaded / event.total) * 100);
          setProgress(pct);
        }
      };

      xhr.onload = function() {
        setUploading(false);
        if (xhr.status === 200) {
          const uploaded = selectedFile as File;
          setSelectedFile(null);
          setProgress(0);
          setUploadSuccess(true);
          setError(null);
          
          // Mostrar éxito temporalmente
          setTimeout(() => {
            onUpload(uploaded);
            setUploadSuccess(false);
          }, 1500);
          
          resolve();
        } else {
          try {
            const body = JSON.parse(xhr.responseText || '{}');
            setError(body.error || 'Error al subir el archivo. Por favor, inténtalo de nuevo.');
          } catch (e) {
            setError('Error al subir el archivo. Por favor, inténtalo de nuevo.');
          }
          reject();
        }
      };

      xhr.onerror = function() {
        setUploading(false);
        setError('Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.');
        reject();
      };

      const fd = new FormData();
      fd.append('logo', selectedFile as File);
      xhr.send(fd);
    });
  }

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
          <Upload size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          <TranslateText text="Subir Nuevo Logo" />
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 transition-all duration-300 hover:border-emerald-500 dark:hover:border-emerald-600 hover:shadow-lg">
        <div
          onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
          onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
          onDrop={handleDrop}
          className={`w-full rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
            dragActive 
              ? 'bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-2 border-emerald-500 dark:border-emerald-600' 
              : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900'
          }`}
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
        >
          <input 
            ref={fileInputRef} 
            type="file" 
            accept="image/png,image/jpeg,image/webp,image/svg+xml" 
            onChange={handleChange} 
            className="hidden" 
            aria-label="Seleccionar archivo de logo"
          />
          
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 flex items-center justify-center mb-4">
              {dragActive ? (
                <Upload size={32} className="text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Image size={32} className="text-gray-600 dark:text-gray-400" />
              )}
            </div>
            
            <div className="mb-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg mb-1">
                {selectedFile ? selectedFile.name : <TranslateText text="Arrastra y suelta tu logo aquí" />}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedFile ? 
                  <TranslateText text="Listo para subir" /> : 
                  <TranslateText text="o haz clic para seleccionar" />
                }
              </p>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-500 bg-white dark:bg-gray-800/50 px-3 py-1.5 rounded-full mt-2">
              <TranslateText text="PNG, JPG, WebP, SVG" /> • <TranslateText text="Máx. 5MB" />
            </div>
          </div>
        </div>

        {/* Mensajes de estado */}
        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3 animate-fadeIn">
            <AlertCircle size={20} className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-red-800 dark:text-red-300 font-medium">{error}</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                <TranslateText text="Por favor, selecciona un archivo válido y vuelve a intentarlo." />
              </p>
            </div>
          </div>
        )}

        {uploadSuccess && (
          <div className="mt-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 animate-fadeIn">
            <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                <TranslateText text="¡Logo subido exitosamente!" />
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                <TranslateText text="El logo se ha cargado correctamente y está disponible para su uso." />
              </p>
            </div>
          </div>
        )}

        {/* Vista previa */}
        {previewUrl && !uploadSuccess && (
          <div className="mt-6 p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                <TranslateText text="Vista previa" />
              </span>
              <button 
                onClick={() => { setSelectedFile(null); setError(null); }}
                className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150 text-gray-500 dark:text-gray-400"
                aria-label="Eliminar archivo"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Vista previa del logo" 
                  className="h-28 w-28 object-contain bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
                />
                <div className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
                  Nuevo
                </div>
              </div>
              
              <div className="flex-1">
                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-100 truncate">
                      {selectedFile?.name}
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {selectedFile && (
                        <span>{Math.round(selectedFile.size / 1024)} KB</span>
                      )}
                      <span>•</span>
                      <span>{selectedFile?.type.split('/')[1]?.toUpperCase() || 'Imagen'}</span>
                    </div>
                  </div>
                  
                  {/* Barra de progreso durante subida */}
                  {uploading && (
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${progress}%` }} 
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300 ease-out"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">
                          <TranslateText text="Subiendo..." />
                        </span>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          {progress}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            disabled={uploading || !selectedFile || uploadSuccess}
            onClick={doUpload}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              uploading
                ? 'bg-emerald-500 cursor-wait'
                : !selectedFile || uploadSuccess
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-sm hover:shadow'
            }`}
          >
            {uploading ? (
              <>
                <Loader size={18} className="animate-spin" />
                <TranslateText text="Subiendo..." />
              </>
            ) : uploadSuccess ? (
              <>
                <CheckCircle size={18} />
                <TranslateText text="¡Subido!" />
              </>
            ) : (
              <>
                <Upload size={18} />
                <TranslateText text="Subir Logo" />
              </>
            )}
          </button>
          
          {selectedFile && !uploadSuccess && (
            <button
              type="button"
              onClick={() => { 
                setSelectedFile(null); 
                setError(null); 
                setProgress(0); 
              }}
              disabled={uploading}
              className="px-6 py-3 rounded-xl font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150 flex items-center justify-center gap-2"
            >
              <X size={18} />
              <TranslateText text="Cancelar" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};