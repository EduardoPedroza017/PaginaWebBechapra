import React, { useState, useEffect } from "react";
import { TranslateText } from '@/components/TranslateText';
import { ExternalLink, Eye, Check, Edit2, X, Save, Info } from 'lucide-react';

interface LogoMeta {
  filename: string;
  path?: string;
  thumbnail?: string | null;
  webp?: string | null;
  avif?: string | null;
  width?: number | null;
  height?: number | null;
  alt?: string | null;
  upload_date?: string;
  size?: number;
}

interface CurrentLogoProps {
  currentLogo: LogoMeta | null;
  logoHistory?: LogoMeta[];
  onSelect?: (filename: string) => void;
  onUpdateMeta?: (filename: string, alt: string) => void;
}

export const CurrentLogo: React.FC<CurrentLogoProps> = ({ currentLogo, logoHistory = [], onSelect, onUpdateMeta }) => {
  const [open, setOpen] = useState(false);
  const [editingAlt, setEditingAlt] = useState(false);
  const [altValue, setAltValue] = useState('');

  useEffect(() => {
    setAltValue(currentLogo?.alt || '');
  }, [currentLogo]);

  if (!currentLogo) return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        <TranslateText text="Logo Actual" />
      </h2>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
          <span className="text-3xl">🎨</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          <TranslateText text="No hay logo cargado" />
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          <TranslateText text="Sube un logo para comenzar" />
        </p>
      </div>
    </div>
  );

  const filename = currentLogo.filename;
  const meta = currentLogo;
  const smallSrc = currentLogo.thumbnail ? `http://localhost:5000${currentLogo.thumbnail}` : (currentLogo.path ? `http://localhost:5000/${currentLogo.path}` : `http://localhost:5000/uploads/branding/${filename}`);
  const largeSrc = currentLogo.webp ? `http://localhost:5000${currentLogo.webp}` : (currentLogo.avif ? `http://localhost:5000${currentLogo.avif}` : (currentLogo.path ? `http://localhost:5000/${currentLogo.path}` : `http://localhost:5000/uploads/branding/${filename}`));

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          <TranslateText text="Logo Actual" />
        </h2>
        <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
          <Check size={14} />
          <span><TranslateText text="Activo" /></span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative group">
            <img 
              src={smallSrc} 
              alt="Logo actual" 
              className="h-28 w-28 object-contain bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-transform duration-200 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          
          <div className="flex-1">
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg truncate">{filename}</h3>
                  <Info size={14} className="text-gray-400" />
                </div>
                {meta && (
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {meta.size && (
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {Math.round(meta.size/1024)} KB
                      </span>
                    )}
                    {meta.upload_date && (
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        📅 {new Date(meta.upload_date).toLocaleDateString()}
                      </span>
                    )}
                    {meta.width && meta.height && (
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {meta.width}×{meta.height}px
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setOpen(true)}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150 flex items-center gap-2 text-sm font-medium"
                >
                  <Eye size={16} />
                  <TranslateText text="Ver en grande" />
                </button>
                
                {onSelect && (
                  <button 
                    onClick={() => onSelect(filename)}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-150 flex items-center gap-2 text-sm font-medium shadow-sm hover:shadow"
                  >
                    <Check size={16} />
                    <TranslateText text="Mantener activo" />
                  </button>
                )}
                
                <a 
                  href={largeSrc} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150 flex items-center gap-2 text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  <TranslateText text="Abrir original" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Texto Alternativo */}
        <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                <TranslateText text="Texto Alternativo (alt)" />
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                <TranslateText text="(SEO y accesibilidad)" />
              </span>
            </div>
            
            {onUpdateMeta && !editingAlt && (
              <button 
                onClick={() => { setAltValue(meta?.alt || ''); setEditingAlt(true); }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 transition-colors duration-150"
              >
                <Edit2 size={14} />
                <TranslateText text="Editar" />
              </button>
            )}
          </div>
          
          {!editingAlt ? (
            <div className="flex items-center gap-3">
              <div className={`px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-750 text-gray-700 dark:text-gray-300 text-sm flex-1 min-h-[44px] flex items-center ${!meta?.alt ? 'italic text-gray-400' : ''}`}>
                {meta?.alt || <TranslateText text="Sin texto alternativo definido" />}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <textarea 
                value={altValue}
                onChange={(e) => setAltValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm resize-none"
                rows={2}
                placeholder="Describe el logo para motores de búsqueda y accesibilidad..."
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button 
                  onClick={() => setEditingAlt(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150 flex items-center gap-2 text-sm font-medium"
                >
                  <X size={16} />
                  <TranslateText text="Cancelar" />
                </button>
                <button 
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-150 flex items-center gap-2 text-sm font-medium"
                  onClick={async () => { 
                    if (onUpdateMeta) await onUpdateMeta(filename, altValue); 
                    setEditingAlt(false); 
                  }}
                >
                  <Save size={16} />
                  <TranslateText text="Guardar cambios" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de vista previa */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{filename}</h3>
                {meta && (
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {meta.size && <span>{Math.round(meta.size/1024)} KB</span>}
                    {meta.upload_date && <span>• Subido: {new Date(meta.upload_date).toLocaleString()}</span>}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 text-gray-500 dark:text-gray-400"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-[400px]">
              <img 
                src={largeSrc} 
                alt="Vista previa del logo" 
                className="max-h-[60vh] max-w-full object-contain"
              />
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {meta?.width && meta?.height && (
                    <span className="mr-4">Dimensiones: {meta.width}×{meta.height}px</span>
                  )}
                </div>
                <a 
                  href={largeSrc} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-150 flex items-center gap-2 text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  <TranslateText text="Abrir en nueva pestaña" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};