"use client";

import React, { useRef, useState } from "react";
import { X, Edit3, Calendar, FileText, Link2, Upload, ExternalLink, Save, File } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { PressItem } from "./page";

interface PressEditModalProps {
  item: PressItem;
  onClose: () => void;
  onUpdate: (id: string, formData: FormData) => void;
  theme: 'light' | 'dark';
}

export default function PressEditModal({ item, onClose, onUpdate, theme }: PressEditModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    setIsLoading(true);
    const formData = new FormData(form);
    await onUpdate(item.id, formData);
    setIsLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          theme === 'dark' ? 'border-gray-800 bg-gray-800/50' : 'border-gray-100 bg-gray-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              theme === 'dark' ? 'bg-amber-600/20' : 'bg-amber-100'
            }`}>
              <Edit3 className={`w-5 h-5 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
            <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Editar Comunicado" />
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Título */}
          <div>
            <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FileText className="w-4 h-4" />
              <TranslateText text="Título" />
            </label>
            <input 
              name="title" 
              defaultValue={item.title} 
              required 
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-emerald-500/30 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
              }`} 
            />
          </div>

          {/* Fecha */}
          <div>
            <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Calendar className="w-4 h-4" />
              <TranslateText text="Fecha" />
            </label>
            <input 
              name="date" 
              type="date" 
              defaultValue={item.date?.slice(0,10)} 
              required 
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-emerald-500/30 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-emerald-500' 
                  : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'
              }`} 
            />
          </div>

          {/* Resumen */}
          <div>
            <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FileText className="w-4 h-4" />
              <TranslateText text="Resumen" />
            </label>
            <textarea 
              name="excerpt" 
              defaultValue={item.excerpt} 
              required 
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-emerald-500/30 resize-none ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
              }`} 
            />
          </div>

          {/* Enlace */}
          <div>
            <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Link2 className="w-4 h-4" />
              <TranslateText text="Enlace (opcional)" />
            </label>
            <input 
              name="link" 
              defaultValue={item.link} 
              placeholder="https://..."
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-emerald-500/30 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
              }`} 
            />
          </div>

          {/* Archivo */}
          <div>
            <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Upload className="w-4 h-4" />
              <TranslateText text="Archivo (opcional)" />
            </label>
            
            {/* Current file */}
            {item.file_url && (
              <div className={`flex items-center gap-3 p-3 rounded-xl mb-3 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
                }`}>
                  <File className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <TranslateText text="Archivo actual" />
                  </p>
                  <a 
                    href={`http://localhost:5000${item.file_url}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`text-xs flex items-center gap-1 ${
                      theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <TranslateText text="Ver archivo" />
                  </a>
                </div>
              </div>
            )}

            {/* File input */}
            <div className={`relative rounded-xl border-2 border-dashed p-4 text-center transition-colors ${
              theme === 'dark' 
                ? 'border-gray-700 hover:border-gray-600 bg-gray-800/50' 
                : 'border-gray-200 hover:border-gray-300 bg-gray-50'
            }`}>
              <input 
                name="file" 
                type="file" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
              {selectedFile ? (
                <div className="flex items-center justify-center gap-2">
                  <File className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedFile.name}
                  </span>
                </div>
              ) : (
                <div>
                  <Upload className={`w-6 h-6 mx-auto mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    <TranslateText text="Nuevo archivo (reemplazará el actual)" />
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <TranslateText text="Cancelar" />
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                isLoading 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:opacity-90 active:scale-[0.98]'
              } bg-emerald-600 text-white`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <TranslateText text="Guardando..." />
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <TranslateText text="Guardar cambios" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
