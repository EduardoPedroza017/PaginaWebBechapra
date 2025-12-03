"use client";

import { useState, useEffect, useRef } from "react";
import { X, Save, Upload, Pencil } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { NewsItem } from "./NewsFilter";

interface Props {
  open: boolean;
  item: NewsItem | null;
  onClose: () => void;
  onUpdated: (news: NewsItem) => void;
  theme: 'light' | 'dark';
}

export default function NewsEditModal({ open, item, onClose, onUpdated, theme }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setSubtitle(item.subtitle);
      setDescription(item.description);
      setImage(null);
      setPreview(item.image_url ? `http://localhost:5000${item.image_url}` : null);
    }
  }, [item]);

  const handleImageChange = (file: File | null) => {
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (!open || !item) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!item) return;
    setLoading(true);
    setError("");
    
    const form = new FormData();
    form.append("title", title);
    form.append("subtitle", subtitle);
    form.append("description", description);
    if (image) form.append("image", image);
    
    try {
      const userEmail = typeof window !== "undefined" ? sessionStorage.getItem("user_email") : null;
      const res = await fetch(`http://localhost:5000/api/news/${encodeURIComponent(item!.title)}`, {
        method: "PUT",
        body: form,
        headers: {
          ...(userEmail ? { "X-User": userEmail } : {})
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error("Error al actualizar noticia");
      const data = await res.json();
      onUpdated(data.news);
      onClose();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-lg rounded-2xl shadow-2xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-amber-600' : 'bg-amber-500'}`}>
              <Pencil className="w-5 h-5 text-white" />
            </div>
            <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Editar Noticia" />
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}><TranslateText text="Título" /></label>
              <input className={inputClass} value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}><TranslateText text="Subtítulo" /></label>
              <input className={inputClass} value={subtitle} onChange={e => setSubtitle(e.target.value)} required />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}><TranslateText text="Descripción" /></label>
              <textarea className={`${inputClass} resize-none`} value={description} onChange={e => setDescription(e.target.value)} required rows={4} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}><TranslateText text="Imagen" /></label>
              <div className="flex gap-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex-1 border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all ${
                    theme === 'dark' 
                      ? 'border-gray-700 hover:border-amber-500 hover:bg-gray-800/50' 
                      : 'border-gray-200 hover:border-amber-400 hover:bg-amber-50/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Upload className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {image ? image.name : <TranslateText text="Cambiar imagen..." />}
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
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className={`mt-4 p-3 rounded-xl text-sm ${
              theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'
            }`}>
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className={`flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
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
              className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm bg-amber-600 text-white hover:bg-amber-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <TranslateText text="Guardando..." />
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <TranslateText text="Guardar Cambios" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
