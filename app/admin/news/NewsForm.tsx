"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { Plus, Upload, X, AlertCircle, CheckCircle, Eye, Tag, ImagePlus, Sparkles, Type } from "lucide-react";
import { NewsItem } from "./NewsFilter";

interface Props {
  onCreated: (news: NewsItem) => void;
  theme: 'light' | 'dark';
}

const CATEGORIES = ["Empresarial", "Recursos Humanos", "Capacitación", "Legal", "Tecnología", "Noticias Generales"];
const MAX_TITLE_LENGTH = 100;
const MAX_SUBTITLE_LENGTH = 150;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

export default function NewsForm({ onCreated, theme }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTab, setCurrentTab] = useState<'content' | 'image' | 'meta'>('content');
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [altText, setAltText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const handleImageChange = useCallback((file: File | null) => {
    if (!file) {
      setImage(null);
      setPreview(null);
      return;
    }

    // Validación de tamaño
    if (file.size > MAX_IMAGE_SIZE) {
      showMessage('error', `La imagen es muy grande. Máximo ${MAX_IMAGE_SIZE / 1024 / 1024}MB`);
      return;
    }

    // Validación de tipo
    if (!file.type.startsWith('image/')) {
      showMessage('error', 'El archivo debe ser una imagen');
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, [showMessage]);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  }, [handleImageChange]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setDescription("");
    setCategory(CATEGORIES[0]);
    setTags([]);
    setTagInput("");
    setFeatured(false);
    setImage(null);
    setPreview(null);
    setAltText("");
    setCurrentTab('content');
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    const total = 6;
    if (title) completed++;
    if (subtitle) completed++;
    if (description.length >= 50) completed++;
    if (image) completed++;
    if (category) completed++;
    if (tags.length > 0) completed++;
    return Math.round((completed / total) * 100);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validaciones
    if (title.length > MAX_TITLE_LENGTH) {
      showMessage('error', `El título no puede exceder ${MAX_TITLE_LENGTH} caracteres`);
      return;
    }
    if (subtitle.length > MAX_SUBTITLE_LENGTH) {
      showMessage('error', `El subtítulo no puede exceder ${MAX_SUBTITLE_LENGTH} caracteres`);
      return;
    }
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      showMessage('error', `La descripción no puede exceder ${MAX_DESCRIPTION_LENGTH} caracteres`);
      return;
    }

    setLoading(true);
    
    const form = new FormData();
    form.append("title", title);
    form.append("subtitle", subtitle);
    form.append("description", description);
    form.append("category", category);
    form.append("tags", JSON.stringify(tags));
    form.append("featured", String(featured));
    form.append("altText", altText);
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
      resetForm();
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

  const completionPercentage = getCompletionPercentage();

  return (
    <>
      <div className={`rounded-2xl border overflow-hidden backdrop-blur-xl transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-700/50 shadow-lg shadow-blue-500/10' : 'bg-white/80 border-gray-200/60 shadow-lg shadow-blue-500/10'
      }`}>
        {/* Mensaje */}
        {message && (
          <div className={`px-5 py-3 flex items-center gap-2 border-b ${
            message.type === 'success'
              ? theme === 'dark' ? 'bg-green-900/30 text-green-400 border-green-800/50' : 'bg-green-50 text-green-700 border-green-200'
              : theme === 'dark' ? 'bg-red-900/30 text-red-400 border-red-800/50' : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* Header colapsable con progreso */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${
            theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-4 flex-1">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${
              theme === 'dark' ? 'from-blue-600 to-purple-600' : 'from-blue-500 to-purple-500'
            } shadow-lg`}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className={`font-bold text-base block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Crear Nueva Noticia
              </span>
              {isExpanded && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-gray-700 rounded-full w-32 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {completionPercentage}%
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isExpanded && completionPercentage > 0 && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                theme === 'dark' ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-700'
              }`}>
                Borrador {completionPercentage}%
              </span>
            )}
            <div className={`transform transition-transform ${isExpanded ? 'rotate-45' : ''}`}>
              <Plus className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </div>
        </button>

        {/* Formulario expandible con tabs */}
        {isExpanded && (
          <form onSubmit={handleSubmit} className={`border-t ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
          }`}>
            {/* Tabs Navigation */}
            <div className={`flex gap-1 p-2 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <button
                type="button"
                onClick={() => setCurrentTab('content')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  currentTab === 'content'
                    ? theme === 'dark' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-500 text-white shadow-lg'
                    : theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                <Type className="w-4 h-4" />
                Contenido
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('image')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  currentTab === 'image'
                    ? theme === 'dark' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-500 text-white shadow-lg'
                    : theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                <ImagePlus className="w-4 h-4" />
                Imagen
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('meta')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  currentTab === 'meta'
                    ? theme === 'dark' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-500 text-white shadow-lg'
                    : theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                <Tag className="w-4 h-4" />
                Meta
              </button>
            </div>

            <div className="p-5">{/* Tab Content */}
              {currentTab === 'content' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <label className={labelClass}>
                      Título <span className="text-red-500">*</span>
                      <span className={`float-right ${title.length > MAX_TITLE_LENGTH ? 'text-red-500' : ''}`}>
                        {title.length}/{MAX_TITLE_LENGTH}
                      </span>
                    </label>
                    <input 
                      className={inputClass} 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                      placeholder="Título impactante de la noticia..."
                      required
                      maxLength={MAX_TITLE_LENGTH}
                    />
                  </div>
                  
                  <div>
                    <label className={labelClass}>
                      Subtítulo <span className="text-red-500">*</span>
                      <span className={`float-right ${subtitle.length > MAX_SUBTITLE_LENGTH ? 'text-red-500' : ''}`}>
                        {subtitle.length}/{MAX_SUBTITLE_LENGTH}
                      </span>
                    </label>
                    <input 
                      className={inputClass} 
                      value={subtitle} 
                      onChange={e => setSubtitle(e.target.value)} 
                      placeholder="Subtítulo descriptivo..."
                      required
                      maxLength={MAX_SUBTITLE_LENGTH}
                    />
                  </div>
                  
                  <div>
                    <label className={labelClass}>
                      Descripción <span className="text-red-500">*</span>
                      <span className={`float-right ${description.length > MAX_DESCRIPTION_LENGTH ? 'text-red-500' : description.length < 50 ? 'text-amber-500' : 'text-green-500'}`}>
                        {description.length}/{MAX_DESCRIPTION_LENGTH} {description.length < 50 && '(mínimo 50)'}
                      </span>
                    </label>
                    <textarea 
                      className={`${inputClass} resize-none`}
                      value={description} 
                      onChange={e => setDescription(e.target.value)} 
                      placeholder="Contenido completo de la noticia. Mínimo 50 caracteres..."
                      required 
                      rows={8}
                      maxLength={MAX_DESCRIPTION_LENGTH}
                    />
                    {description.length < 50 && description.length > 0 && (
                      <p className="text-xs text-amber-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Escribe al menos {50 - description.length} caracteres más
                      </p>
                    )}
                  </div>
                </div>
              )}

              {currentTab === 'image' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <label className={labelClass}>Imagen de la noticia <span className="text-red-500">*</span></label>
                    <div 
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all ${
                        dragActive
                          ? theme === 'dark' ? 'border-blue-500 bg-blue-900/20' : 'border-blue-400 bg-blue-50'
                          : theme === 'dark' 
                            ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-800/50' 
                            : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50'
                      }`}
                    >
                      {preview ? (
                        <div className="relative">
                          <Image src={preview} alt="Preview" width={400} height={256} className="w-full h-64 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={(e) => { 
                              e.stopPropagation();
                              setImage(null); 
                              setPreview(null); 
                            }}
                            className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className={`mt-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {image?.name} • {(image!.size / 1024).toFixed(2)} KB
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                          <p className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Arrastra una imagen o haz clic para seleccionar
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                            PNG, JPG, WEBP hasta 2MB
                          </p>
                        </div>
                      )}
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={e => handleImageChange(e.target.files?.[0] || null)} 
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Texto alternativo (Alt Text)</label>
                    <input 
                      className={inputClass} 
                      value={altText} 
                      onChange={e => setAltText(e.target.value)} 
                      placeholder="Descripción de la imagen para accesibilidad..."
                    />
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      Ayuda a motores de búsqueda y usuarios con discapacidades visuales
                    </p>
                  </div>
                </div>
              )}

              {currentTab === 'meta' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <label className={labelClass}>Categoría</label>
                    <select 
                      className={inputClass}
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Etiquetas (Tags)</label>
                    <div className="flex gap-2 mb-2">
                      <input 
                        className={`${inputClass} flex-1`}
                        value={tagInput} 
                        onChange={e => setTagInput(e.target.value)} 
                        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        placeholder="Agregar etiqueta..."
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                          theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                      >
                        Agregar
                      </button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <span 
                            key={tag}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                              theme === 'dark' ? 'bg-purple-900/40 text-purple-300 border border-purple-700/50' : 'bg-purple-100 text-purple-700 border border-purple-200'
                            }`}
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="hover:text-red-500 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={featured}
                        onChange={e => setFeatured(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <div>
                        <span className={`font-semibold block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Marcar como destacada
                        </span>
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Aparecerá en la sección principal
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>
          
            <div className={`flex justify-between items-center gap-3 px-5 py-4 border-t ${
              theme === 'dark' ? 'bg-gray-800/30 border-gray-800' : 'bg-gray-50 border-gray-200'
            }`}>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Eye className="w-4 h-4" />
                Vista Previa
              </button>
              
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsExpanded(false)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancelar
                </button>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-lg flex items-center gap-2 ${
                    loading
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  } text-white`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creando...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Crear Noticia
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {showPreview && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowPreview(false)}
        >
          <div 
            className={`max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {category && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {category}
                    </span>
                  )}
                  <h3 className={`text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {title || 'Título de la noticia'}
                  </h3>
                  <p className={`text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {subtitle || 'Subtítulo de la noticia'}
                  </p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className={`ml-4 p-2 rounded-lg transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {preview && (
                <div className="mb-6">
                  <Image 
                    src={preview} 
                    alt={altText || 'Vista previa'} 
                    width={600}
                    height={320}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                  {altText && (
                    <p className={`text-xs mt-2 italic ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      Alt: {altText}
                    </p>
                  )}
                </div>
              )}
              
              <p className={`text-base leading-relaxed whitespace-pre-wrap mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {description || 'Contenido de la noticia aparecerá aquí...'}
              </p>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t ${
                  theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                }">
                  {tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        theme === 'dark' ? 'bg-purple-900/40 text-purple-300' : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {featured && (
                <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                  theme === 'dark' ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-700'
                }`}>
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Noticia destacada</span>
                </div>
              )}
            </div>

            <div className={`px-6 py-4 border-t ${theme === 'dark' ? 'bg-gray-800/30 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
              <button
                onClick={() => setShowPreview(false)}
                className={`w-full px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                Cerrar Vista Previa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
