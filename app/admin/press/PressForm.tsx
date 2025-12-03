"use client";

import React, { useRef, useState } from "react";
import { Plus, Upload, X, FileText, Link, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface PressFormProps {
  onCreate: (formData: FormData) => void;
  theme: 'light' | 'dark';
}

export default function PressForm({ onCreate, theme }: PressFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    
    setLoading(true);
    try {
      const formData = new FormData(form);
      await onCreate(formData);
      form.reset();
      setSelectedFile(null);
      setIsExpanded(false);
      showMessage('success', 'Comunicado creado exitosamente');
    } catch {
      showMessage('error', 'Error al crear el comunicado');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full rounded-xl border px-4 py-2.5 text-sm transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
    theme === 'dark' 
      ? 'bg-gray-800 text-white border-gray-700 placeholder:text-gray-500' 
      : 'bg-gray-50 text-gray-900 border-gray-200 placeholder:text-gray-400'
  }`;

  const labelClass = `block text-xs font-semibold mb-1.5 ${
    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
  }`;

  return (
    <div className={`rounded-2xl border overflow-hidden ${
      theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      {/* Mensaje */}
      {message && (
        <div className={`px-5 py-3 flex items-center gap-2 ${
          message.type === 'success'
            ? theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'
            : theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {/* Header colapsable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${
          theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500'}`}>
            <Plus className="w-5 h-5 text-white" />
          </div>
          <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <TranslateText text="Crear Nuevo Comunicado" />
          </span>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-45' : ''}`}>
          <Plus className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
      </button>

      {/* Formulario expandible */}
      {isExpanded && (
        <form ref={formRef} onSubmit={handleSubmit} className={`px-5 pb-5 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <div>
              <label className={labelClass}>
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <TranslateText text="Título" />
                </div>
              </label>
              <input 
                name="title"
                className={inputClass} 
                placeholder="Título del comunicado..."
                required 
              />
            </div>
            <div>
              <label className={labelClass}>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <TranslateText text="Fecha" />
                </div>
              </label>
              <input 
                name="date"
                type="date"
                className={inputClass} 
                required 
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}><TranslateText text="Resumen" /></label>
              <textarea 
                name="excerpt"
                className={`${inputClass} resize-none`}
                placeholder="Breve descripción del comunicado..."
                required 
                rows={3} 
              />
            </div>
            <div>
              <label className={labelClass}>
                <div className="flex items-center gap-1.5">
                  <Link className="w-3.5 h-3.5" />
                  <TranslateText text="Enlace (opcional)" />
                </div>
              </label>
              <input 
                name="link"
                type="url"
                className={inputClass} 
                placeholder="https://..."
              />
            </div>
            <div>
              <label className={labelClass}>
                <div className="flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <TranslateText text="Archivo (opcional)" />
                </div>
              </label>
              <div className="relative">
                <input 
                  name="file"
                  type="file"
                  className="hidden"
                  id="press-file-input"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                <label 
                  htmlFor="press-file-input"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                    theme === 'dark' 
                      ? 'border-gray-700 hover:border-emerald-500 hover:bg-gray-800/50' 
                      : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                  }`}
                >
                  <Upload className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                  <span className={`text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedFile ? selectedFile.name : 'Seleccionar archivo...'}
                  </span>
                  {selectedFile && (
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); setSelectedFile(null); }}
                      className="ml-auto p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30"
                    >
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  )}
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-5">
            <button 
              type="button" 
              onClick={() => setIsExpanded(false)}
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <TranslateText text="Cancelar" />
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <TranslateText text="Creando..." />
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <TranslateText text="Crear Comunicado" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
