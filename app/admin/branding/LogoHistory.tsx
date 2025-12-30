import React, { useState } from "react";
import { TranslateText } from '@/components/TranslateText';
import { ExternalLink, Eye, Check, Clock, Calendar, Image, Edit2, Save, X, History } from 'lucide-react';

interface Logo {
  filename: string;
  path?: string;
  thumbnail?: string | null;
  webp?: string | null;
  avif?: string | null;
  alt?: string | null;
  upload_date?: string;
  size?: number;
}

interface LogoHistoryProps {
  logoHistory: Logo[];
  onSelectLogo: (filename: string) => void;
  onUpdateMeta?: (filename: string, alt: string) => void;
}

export const LogoHistory: React.FC<LogoHistoryProps> = ({ logoHistory, onSelectLogo, onUpdateMeta }) => {
  const [viewing, setViewing] = useState<Logo | null>(null);
  const [editingAlt, setEditingAlt] = useState(false);
  const [altValue, setAltValue] = useState('');

  if (logoHistory.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <History size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          <TranslateText text="Historial de Logos" />
        </h2>
        <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full">
          {logoHistory.length} {logoHistory.length === 1 ? 'logo' : 'logos'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {logoHistory.map((logo) => (
          <div 
            key={logo.filename} 
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
          >
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                <img 
                  src={logo.thumbnail ? `http://localhost:5000${logo.thumbnail}` : `http://localhost:5000/uploads/branding/${logo.filename}`} 
                  alt={logo.alt || logo.filename}
                  className="h-24 object-contain p-3 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate" title={logo.filename}>
                    {logo.filename}
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setViewing(logo)}
                      className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 text-gray-600 dark:text-gray-400"
                      aria-label="Ver logo"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => onSelectLogo(logo.filename)}
                      className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 transition-colors duration-150"
                      aria-label="Usar este logo"
                    >
                      <Check size={16} />
                    </button>
                  </div>
                </div>
                
                {logo.upload_date && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar size={12} />
                    <span>{new Date(logo.upload_date).toLocaleDateString()}</span>
                  </div>
                )}
                
                {logo.size && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {Math.round(logo.size/1024)} KB
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de vista detallada */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => { setViewing(null); setEditingAlt(false); }}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Image size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate max-w-md">
                      {viewing.filename}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {viewing.upload_date && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(viewing.upload_date).toLocaleString()}
                        </span>
                      )}
                      {viewing.size && (
                        <span>• {Math.round(viewing.size/1024)} KB</span>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => { setViewing(null); setEditingAlt(false); }}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 text-gray-500 dark:text-gray-400"
                  aria-label="Cerrar"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-[400px]">
              <img 
                src={viewing.webp ? `http://localhost:5000${viewing.webp}` : (viewing.avif ? `http://localhost:5000${viewing.avif}` : `http://localhost:5000/uploads/branding/${viewing.filename}`)} 
                alt={viewing.alt || viewing.filename}
                className="max-h-[60vh] max-w-full object-contain"
              />
            </div>
            
            <div className="p-6 space-y-6">
              {/* Texto alternativo */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <TranslateText text="Texto Alternativo" />
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      <TranslateText text="(SEO y accesibilidad)" />
                    </span>
                  </div>
                  
                  {!editingAlt && onUpdateMeta && (
                    <button 
                      onClick={() => { setAltValue(viewing.alt || ''); setEditingAlt(true); }}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 transition-colors duration-150"
                    >
                      <Edit2 size={14} />
                      <TranslateText text="Editar" />
                    </button>
                  )}
                </div>
                
                {!editingAlt ? (
                  <div className={`px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ${!viewing.alt ? 'italic text-gray-400' : ''}`}>
                    {viewing.alt || <TranslateText text="Sin texto alternativo definido" />}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <textarea 
                      value={altValue}
                      onChange={(e) => setAltValue(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      rows={3}
                      placeholder="Describe este logo para motores de búsqueda y accesibilidad..."
                      autoFocus
                    />
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => setEditingAlt(false)}
                        className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150 flex items-center gap-2"
                      >
                        <X size={16} />
                        <TranslateText text="Cancelar" />
                      </button>
                      <button 
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-150 flex items-center gap-2"
                        onClick={async () => { 
                          if (onUpdateMeta) await onUpdateMeta(viewing.filename, altValue); 
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
              
              {/* Acciones */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <a 
                  href={`http://localhost:5000/uploads/branding/${viewing.filename}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150 flex items-center justify-center gap-2 font-medium"
                >
                  <ExternalLink size={18} />
                  <TranslateText text="Abrir original" />
                </a>
                <button 
                  className="flex-1 px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-150 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow"
                  onClick={() => { 
                    onSelectLogo(viewing.filename); 
                    setViewing(null); 
                    setEditingAlt(false);
                  }}
                >
                  <Check size={18} />
                  <TranslateText text="Usar este logo" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};