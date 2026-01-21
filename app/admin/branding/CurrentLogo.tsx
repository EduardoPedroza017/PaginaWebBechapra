"use client";

import React, { useState, useEffect } from "react";
import { TranslateText } from '@/components/TranslateText';
import { ExternalLink, Eye, Check, Edit2, X, Save, Info, Download, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

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
  is_active?: boolean;
  tags?: string[];
}

interface CurrentLogoProps {
  currentLogo: LogoMeta | null;
  logoHistory?: LogoMeta[];
  onSelect?: (filename: string) => void;
  onUpdateMeta?: (filename: string, alt: string) => void;
  onDelete?: (filename: string) => void;
  onRefresh?: () => void;
  theme?: 'light' | 'dark';
  loading?: boolean;
}

export const CurrentLogo: React.FC<CurrentLogoProps> = ({ 
  currentLogo, 
  logoHistory = [], 
  onSelect, 
  onUpdateMeta,
  onDelete,
  onRefresh,
  theme = 'light',
  loading = false
}) => {
  const [open, setOpen] = useState(false);
  const [editingAlt, setEditingAlt] = useState(false);
  const [altValue, setAltValue] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setAltValue(currentLogo?.alt || '');
  }, [currentLogo]);

  const handleDownload = async (filename: string) => {
    try {
      setIsDownloading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
      }
      const url = `${apiUrl}/uploads/branding/${filename}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 100);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!currentLogo) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            <TranslateText text="Logo Actual" />
          </h2>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className={`p-2 rounded-lg transition-all ${loading ? 'cursor-wait' : ''} ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Refrescar"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
        
        <div className={`bg-gradient-to-r ${theme === 'dark' ? 'from-gray-800/50 to-gray-900/50 border-gray-700' : 'from-gray-50 to-blue-50/30 border-gray-300'} border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg`}>
          <div className={`mx-auto w-20 h-20 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-blue-100'} flex items-center justify-center mb-4`}>
            <span className="text-4xl">🎨</span>
          </div>
          <p className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            <TranslateText text="No hay logo activo" />
          </p>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <TranslateText text="Sube o selecciona un logo para establecerlo como activo" />
          </p>
        </div>
      </div>
    );
  }

  const filename = currentLogo.filename;
  const meta = currentLogo;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
  }
  const smallSrc = currentLogo.thumbnail 
    ? `${apiUrl}${currentLogo.thumbnail}` 
    : (currentLogo.path 
      ? `${apiUrl}/${currentLogo.path}` 
      : `${apiUrl}/uploads/branding/${filename}`);

  const largeSrc = currentLogo.webp 
    ? `${apiUrl}${currentLogo.webp}` 
    : (currentLogo.avif 
      ? `${apiUrl}${currentLogo.avif}` 
      : (currentLogo.path 
        ? `${apiUrl}/${currentLogo.path}` 
        : `${apiUrl}/uploads/branding/${filename}`));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          <TranslateText text="Logo Actual" />
        </h2>
        
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-emerald-400 bg-emerald-900/20' : 'text-emerald-600 bg-emerald-50'} px-3 py-1.5 rounded-full border ${theme === 'dark' ? 'border-emerald-800/30' : 'border-emerald-200'}`}>
            <Check size={14} />
            <span className="font-medium"><TranslateText text="Activo" /></span>
          </div>
          
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className={`p-2 rounded-lg transition-all ${loading ? 'cursor-wait' : ''} ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Refrescar"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-5 shadow-lg hover:shadow-xl transition-all duration-300`}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* Thumbnail */}
          <div className="relative group">
            <div className={`relative h-32 w-32 rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} p-3`}>
              <img 
                src={smallSrc} 
                alt={meta.alt || filename}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
              <TranslateText text="Actual" />
            </div>
          </div>
          
          {/* Información */}
          <div className="flex-1 min-w-0">
            <div className="space-y-4">
              {/* Header con nombre y acciones */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 max-w-[70%]">
                    <h3 className={`font-bold text-lg truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} title={filename}>
                      {filename}
                    </h3>
                    <Info size={14} className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} flex-shrink-0`} />
                  </div>
                  
                  {onDelete && (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'text-gray-500 hover:text-red-400 hover:bg-gray-700'
                          : 'text-gray-400 hover:text-red-600 hover:bg-gray-100'
                      }`}
                      title="Eliminar logo"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                
                {/* Metadata */}
                <div className="flex flex-wrap gap-2">
                  {meta.size && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      📦 {formatFileSize(meta.size)}
                    </span>
                  )}
                  {meta.upload_date && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      📅 {formatDate(meta.upload_date)}
                    </span>
                  )}
                  {meta.width && meta.height && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      ⚡ {meta.width}×{meta.height}px
                    </span>
                  )}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setOpen(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <Eye size={16} />
                  <TranslateText text="Vista previa" />
                </button>
                
                {onSelect && (
                  <button 
                    onClick={() => onSelect(filename)}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl flex items-center gap-2 text-sm"
                  >
                    <Check size={16} />
                    <TranslateText text="Mantener activo" />
                  </button>
                )}
                
                <button 
                  onClick={() => handleDownload(filename)}
                  disabled={isDownloading}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm ${
                    isDownloading
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-gray-500 cursor-wait'
                        : 'bg-gray-200 text-gray-400 cursor-wait'
                      : theme === 'dark'
                        ? 'bg-blue-900/30 hover:bg-blue-800/30 text-blue-400 hover:text-blue-300 border border-blue-800/30'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 border border-blue-200'
                  }`}
                >
                  {isDownloading ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <Download size={16} />
                  )}
                  <TranslateText text={isDownloading ? "Descargando..." : "Descargar"} />
                </button>
                
                <a 
                  href={largeSrc} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border border-gray-600'
                      : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-300'
                  }`}
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
              <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <TranslateText text="Texto Alternativo (SEO)" />
              </span>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                <TranslateText text="(Accesibilidad y motores de búsqueda)" />
              </span>
            </div>
            
            {onUpdateMeta && !editingAlt && (
              <button 
                onClick={() => { setAltValue(meta?.alt || ''); setEditingAlt(true); }}
                className={`text-sm flex items-center gap-1 transition-colors duration-150 ${
                  theme === 'dark'
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                <Edit2 size={14} />
                <TranslateText text="Editar" />
              </button>
            )}
          </div>
          
          {!editingAlt ? (
            <div className={`px-4 py-3 rounded-lg text-sm flex items-center min-h-[44px] ${
              theme === 'dark' 
                ? 'bg-gray-900/50 text-gray-300' 
                : 'bg-gray-50 text-gray-700'
            } ${!meta?.alt ? 'italic text-gray-400' : ''}`}>
              {meta?.alt || <TranslateText text="Sin texto alternativo definido" />}
            </div>
          ) : (
            <div className="space-y-3">
              <textarea 
                value={altValue}
                onChange={(e) => setAltValue(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                } border`}
                rows={3}
                placeholder="Ejemplo: Logo de la empresa XYZ - Diseño moderno con colores corporativos..."
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button 
                  onClick={() => setEditingAlt(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-150 flex items-center gap-2 text-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <X size={16} />
                  <TranslateText text="Cancelar" />
                </button>
                <button 
                  className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-150 flex items-center gap-2 text-sm shadow-lg hover:shadow-xl"
                  onClick={async () => { 
                    if (onUpdateMeta) {
                      await onUpdateMeta(filename, altValue); 
                    }
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

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className={`relative ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scaleIn`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'}`}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="¿Eliminar logo?" />
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Esta acción no se puede deshacer" />
                </p>
              </div>
            </div>
            
            <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <TranslateText text="Estás a punto de eliminar el logo:" />
              </p>
              <p className={`font-medium mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {filename}
              </p>
              <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                <TranslateText text="Si es el logo activo, será removido del sitio web." />
              </p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <TranslateText text="Cancelar" />
              </button>
              <button 
                onClick={() => {
                  if (onDelete) onDelete(filename);
                  setShowDeleteConfirm(false);
                }}
                className="flex-1 px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all shadow-lg hover:shadow-xl"
              >
                <TranslateText text="Eliminar" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de vista previa */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setOpen(false)}
          />
          <div className={`relative ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-scaleIn`}>
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b bg-gradient-to-r from-transparent via-black/5 to-transparent backdrop-blur-sm border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
                  <Eye className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} size={20} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold truncate max-w-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {filename}
                  </h3>
                  {meta && (
                    <div className="flex items-center gap-4 mt-1 text-sm">
                      {meta.size && (
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                          {formatFileSize(meta.size)}
                        </span>
                      )}
                      {meta.upload_date && (
                        <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
                          • Subido: {formatDate(meta.upload_date)}
                        </span>
                      )}
                      {meta.width && meta.height && (
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                          • {meta.width}×{meta.height}px
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)}
                className={`p-2 rounded-full transition-colors duration-150 ${
                  theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Imagen */}
            <div className="p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-[500px]">
              <div className="relative max-w-full max-h-[60vh]">
                <img 
                  src={largeSrc} 
                  alt={meta?.alt || filename}
                  className="max-h-[60vh] max-w-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
            
            {/* Footer con acciones */}
            <div className="sticky bottom-0 p-6 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-gray-900/80 dark:to-gray-900">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {meta?.alt && (
                    <div className="text-sm">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <TranslateText text="Alt:" />
                      </span>
                      <span className={`ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {meta.alt}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownload(filename)}
                    disabled={isDownloading}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                      isDownloading
                        ? theme === 'dark'
                          ? 'bg-gray-700 text-gray-500 cursor-wait'
                          : 'bg-gray-200 text-gray-400 cursor-wait'
                        : theme === 'dark'
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                          : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                    }`}
                  >
                    {isDownloading ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : (
                      <Download size={18} />
                    )}
                    <TranslateText text={isDownloading ? "Descargando..." : "Descargar"} />
                  </button>
                  
                  <a 
                    href={largeSrc} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-2.5 rounded-lg font-medium bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink size={18} />
                    <TranslateText text="Abrir en nueva pestaña" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};