"use client";

import { useState, useRef } from "react";
import { Plus, Upload, X, Image as ImageIcon, AlertCircle, CheckCircle } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { NewsItem } from "./NewsFilter";

interface Props {
  onCreated: (news: NewsItem) => void;
  theme: 'light' | 'dark';
}

export default function NewsForm({ onCreated, theme }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | null) => {
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    const form = new FormData();
    form.append("title", title);
    form.append("subtitle", subtitle);
    form.append("description", description);
    if (image) form.append("image", image);
    
    try {
      const userEmail = typeof window !== "undefined" ? sessionStorage.getItem("user_email") : null;
      const res = await fetch("http://localhost:5000/api/news", {
        method: "POST",
        body: form,
        headers: {
          ...(userEmail ? { "X-User": userEmail } : {})
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error("Error al crear noticia");
      const data = await res.json();
      onCreated(data.news);
      setTitle(""); setSubtitle(""); setDescription(""); setImage(null); setPreview(null);
      setIsExpanded(false);
      showMessage('success', 'Noticia creada exitosamente');
    } catch {
      showMessage('error', 'Error al crear la noticia');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `w-full rounded-xl border px-4 py-2.5 text-sm transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
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
          <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`}>
            <Plus className="w-5 h-5 text-white" />
          </div>
          <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <TranslateText text="Crear Nueva Noticia" />
          </span>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-45' : ''}`}>
          <Plus className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
      </button>

      {/* Formulario expandible */}
      {isExpanded && (
        <form onSubmit={handleSubmit} className={`px-5 pb-5 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <div>
              <label className={labelClass}><TranslateText text="Título" /></label>
              <input 
                className={inputClass} 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="Título de la noticia..."
                required 
              />
            </div>
            <div>
              <label className={labelClass}><TranslateText text="Subtítulo" /></label>
              <input 
                className={inputClass} 
                value={subtitle} 
                onChange={e => setSubtitle(e.target.value)} 
                placeholder="Subtítulo..."
                required 
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}><TranslateText text="Descripción" /></label>
              <textarea 
                className={`${inputClass} resize-none`}
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="Contenido de la noticia..."
                required 
                rows={4} 
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}><TranslateText text="Imagen" /></label>
              <div className="flex gap-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex-1 border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all ${
                    theme === 'dark' 
                      ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-800/50' 
                      : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Upload className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {image ? image.name : <TranslateText text="Seleccionar imagen..." />}
                    </span>
                  </div>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={e => handleImageChange(e.target.files?.[0] || null)} 
                  />
                </div>
                {preview && (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setImage(null); setPreview(null); }}
                      className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
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
              className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <TranslateText text="Creando..." />
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <TranslateText text="Crear Noticia" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
