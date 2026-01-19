"use client";

import Image from "next/image";
import { useState, useRef, useCallback, memo } from "react";
import { Plus, Upload, X, AlertCircle, CheckCircle, Eye, Tag, ImagePlus, Sparkles, Type, Clock, FileText, Zap, Calendar } from "lucide-react";
import { NewsItem } from "./NewsFilter";
import RichTextEditor from "./RichTextEditor";

interface Props {
  onCreated: (news: NewsItem) => void;
  theme: 'light' | 'dark';
}

const CATEGORIES = ["Empresarial", "Recursos Humanos", "Capacitación", "Legal", "Tecnología", "Noticias Generales"];
const MAX_TITLE_LENGTH = 100;
const MAX_SUBTITLE_LENGTH = 150;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_SEO_DESCRIPTION = 160;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

function NewsFormComponent({ onCreated, theme }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTab, setCurrentTab] = useState<'content' | 'image' | 'meta' | 'seo'>('content');
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
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [publishTime, setPublishTime] = useState("09:00");
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

    if (file.size > MAX_IMAGE_SIZE) {
      showMessage('error', `Imagen muy grande. Máximo ${MAX_IMAGE_SIZE / 1024 / 1024}MB`);
      return;
    }

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
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 8) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const getReadingTime = () => {
    const wordsPerMinute = 200;
    // Remover tags HTML antes de contar palabras
    const plainText = description.replace(/<[^>]*>/g, '');
    const wordCount = plainText.split(/\s+/).filter(w => w.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
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
    setSeoDescription("");
    setSeoKeywords("");
    setPublishDate(new Date().toISOString().split('T')[0]);
    setPublishTime("09:00");
    setCurrentTab('content');
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    const total = 8;
    if (title) completed++;
    if (subtitle) completed++;
    const descriptionText = description.replace(/<[^>]*>/g, '');
    if (descriptionText.length >= 50) completed++;
    if (image) completed++;
    if (category) completed++;
    if (tags.length > 0) completed++;
    if (seoDescription) completed++;
    if (publishDate) completed++;
    return Math.round((completed / total) * 100);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (title.length > MAX_TITLE_LENGTH) {
      showMessage('error', `El título no puede exceder ${MAX_TITLE_LENGTH} caracteres`);
      return;
    }
    if (subtitle.length > MAX_SUBTITLE_LENGTH) {
      showMessage('error', `El subtítulo no puede exceder ${MAX_SUBTITLE_LENGTH} caracteres`);
      return;
    }
    const descriptionText = description.replace(/<[^>]*>/g, '');
    if (descriptionText.length > MAX_DESCRIPTION_LENGTH) {
      showMessage('error', `La descripción no puede exceder ${MAX_DESCRIPTION_LENGTH} caracteres`);
      return;
    }
    if (descriptionText.length < 50) {
      showMessage('error', 'La descripción debe tener al menos 50 caracteres');
      return;
    }

    setLoading(true);
    
    const form = new FormData();
    form.append("title", title);
    form.append("subtitle", subtitle);
    form.append("description", description);
    const mapCategoryToBackend = (label: string) => {
      const map: Record<string, string> = {
        'Empresarial': 'general',
        'Noticias Generales': 'general',
        'Recursos Humanos': 'anuncios',
        'Capacitación': 'eventos',
        'Legal': 'anuncios',
        'Tecnología': 'general'
      };
      return map[label] || 'general';
    };
    const backendCategory = mapCategoryToBackend(category);
    form.append("category", backendCategory);
    form.append("tags", JSON.stringify(tags));
    form.append("featured", String(featured));
    form.append("altText", altText);
    form.append("seoDescription", seoDescription);
    form.append("seoKeywords", seoKeywords);
    form.append("publishDate", `${publishDate} ${publishTime}`);
    if (image) form.append("image", image);

    try {
      const userEmail = typeof window !== "undefined" ? sessionStorage.getItem("user_email") : null;
      const API = process.env.NEXT_PUBLIC_API_URL || '';
      const isLocal = API.includes('localhost') || API.includes('127.0.0.1');
      const baseHeaders: Record<string, string> = {
        ...(userEmail ? { "X-User": userEmail } : {}),
        "Authorization": `Bearer ${sessionStorage.getItem("auth_token") || ""}`
      };
      const bypassHeaders: Record<string, string> = {};
      if (isLocal) {
        bypassHeaders["X-Bypass-Login"] = 'true';
        bypassHeaders["X-Role"] = 'superadmin';
        bypassHeaders["X-Admin"] = 'true';
      }

      const res = await fetch(`${API}/api/news`, {
        method: "POST",
        body: form,
        headers: {
          ...baseHeaders,
          ...bypassHeaders
        },
        credentials: 'include',
      });

      const status = res.status;
      let body: any = null;
      try {
        body = await res.json();
      } catch {
        const text = await res.text();
        console.log('Server response:', text);
      }

      if (res.ok) {
        if (body && body.news) {
          showMessage('success', `Noticia creada exitosamente`);
          onCreated(body.news);
        } else {
          showMessage('success', 'Noticia creada exitosamente');
        }
        resetForm();
        setIsExpanded(false);
      } else {
        const errorMsg = body?.error || (body?.errors ? JSON.stringify(body.errors) : 'Error desconocido');
        if (errorMsg === 'Se requiere permiso: news.create') {
          showMessage('error', 'No tienes permisos para crear noticias.');
        } else {
          showMessage('error', `Error al crear noticia: ${errorMsg}`);
        }
      }
    } catch {
      showMessage('error', 'Error al crear la noticia');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `w-full rounded-xl border px-4 py-2.5 text-sm transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
    theme === 'dark' 
      ? 'bg-gray-900/50 text-white border-gray-700 placeholder:text-gray-500' 
      : 'bg-white text-gray-900 border-gray-200 placeholder:text-gray-400'
  }`;

  const labelClass = `block text-xs font-semibold mb-1.5 ${
    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
  }`;

  const completionPercentage = getCompletionPercentage();

  return (
    <>
      <div className={`rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900/70 border-gray-800' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        {/* Mensaje */}
        {message && (
          <div className={`px-5 py-3 flex items-center gap-2 border-b ${
            message.type === 'success'
              ? theme === 'dark' ? 'bg-green-900/20 text-green-400 border-green-800/30' : 'bg-green-50 text-green-700 border-green-200'
              : theme === 'dark' ? 'bg-red-900/20 text-red-400 border-red-800/30' : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* Header colapsable */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${
            theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-50'
            }`}>
              <Sparkles className={`w-5 h-5 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div className="text-left">
              <span className={`font-bold text-base block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Crear Nueva Noticia
              </span>
              {isExpanded && (
                <div className="flex items-center gap-2 mt-1">
                  <div className={`h-1.5 rounded-full w-32 overflow-hidden ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {completionPercentage}%
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isExpanded && completionPercentage > 0 && (
              <span className={`text-xs px-2.5 py-1 rounded-full ${
                theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
              }`}>
                {completionPercentage}% completado
              </span>
            )}
            <div className={`transform transition-transform ${isExpanded ? 'rotate-45' : ''}`}>
              <Plus className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </div>
        </button>

        {/* Formulario expandible */}
        {isExpanded && (
          <form onSubmit={handleSubmit} className={`border-t ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}>
            {/* Tabs Navigation */}
            <div className={`flex gap-1 p-2 ${
              theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50/50'
            }`}>
              {[
                { id: 'content', label: 'Contenido', icon: Type },
                { id: 'image', label: 'Imagen', icon: ImagePlus },
                { id: 'meta', label: 'Meta', icon: Tag },
                { id: 'seo', label: 'SEO', icon: Zap }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCurrentTab(id as any)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                    currentTab === id
                      ? theme === 'dark' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-500 text-white'
                      : theme === 'dark' 
                        ? 'text-gray-400 hover:text-white hover:bg-gray-800/50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            <div className="p-5">
              {/* Tab Content */}
              {currentTab === 'content' && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>
                      Título
                      <span className={`float-right text-xs ${
                        title.length > MAX_TITLE_LENGTH ? 'text-red-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
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
                      Subtítulo
                      <span className={`float-right text-xs ${
                        subtitle.length > MAX_SUBTITLE_LENGTH ? 'text-red-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
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
                      Descripción
                    </label>
                    <RichTextEditor 
                      value={description}
                      onChange={setDescription}
                      theme={theme}
                      placeholder="Contenido completo de la noticia..."
                      maxLength={MAX_DESCRIPTION_LENGTH}
                    />
                    <div className="flex justify-between mt-1">
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Mínimo 50 caracteres
                      </p>
                      <p className={`text-xs ${
                        description.replace(/<[^>]*>/g, '').length < 50 ? 'text-amber-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {description.replace(/<[^>]*>/g, '').length}/{MAX_DESCRIPTION_LENGTH}
                      </p>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border ${
                    theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Tiempo de lectura aproximado: <strong>{getReadingTime()} minuto{getReadingTime() > 1 ? 's' : ''}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {currentTab === 'image' && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Imagen principal</label>
                    <div 
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all ${
                        dragActive
                          ? theme === 'dark' ? 'border-blue-500 bg-blue-900/10' : 'border-blue-400 bg-blue-50'
                          : theme === 'dark' 
                            ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-800/30' 
                            : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50'
                      }`}
                    >
                      {preview ? (
                        <div className="relative">
                          <Image 
                            src={preview} 
                            alt="Preview" 
                            width={400} 
                            height={225} 
                            className="w-full h-auto max-h-48 object-cover rounded-lg" 
                          />
                          <button
                            type="button"
                            onClick={(e) => { 
                              e.stopPropagation();
                              setImage(null); 
                              setPreview(null); 
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <div className={`mt-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {image?.name} • {(image!.size / 1024).toFixed(2)} KB
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className={`w-10 h-10 mx-auto mb-3 ${
                            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                          }`} />
                          <p className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
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
                    <textarea 
                      className={inputClass}
                      rows={2}
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
                <div className="space-y-4">
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
                    <label className={labelClass}>
                      Etiquetas
                      <span className="float-right text-xs text-gray-500">({tags.length}/8)</span>
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input 
                        className={`${inputClass} flex-1`}
                        value={tagInput} 
                        onChange={e => setTagInput(e.target.value)} 
                        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        placeholder="Agregar etiqueta..."
                        disabled={tags.length >= 8}
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        disabled={tags.length >= 8 || !tagInput.trim()}
                        className={`px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                          theme === 'dark' 
                            ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-600' 
                            : 'bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400'
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
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                              theme === 'dark' 
                                ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' 
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className={`hover:opacity-70 transition-opacity ${
                                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                              }`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={`p-3 rounded-lg border ${
                    theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={featured}
                        onChange={e => setFeatured(e.target.checked)}
                        className={`w-4 h-4 rounded border ${
                          theme === 'dark' 
                            ? 'border-gray-600 bg-gray-700 checked:bg-blue-500' 
                            : 'border-gray-300 bg-white checked:bg-blue-500'
                        } focus:ring-2 focus:ring-blue-500/20`}
                      />
                      <div>
                        <span className={`text-sm font-medium block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
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

              {currentTab === 'seo' && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Fecha de Publicación</label>
                    <input
                      type="date"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Hora de Publicación</label>
                    <input
                      type="time"
                      value={publishTime}
                      onChange={(e) => setPublishTime(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Meta Descripción
                      <span className={`float-right text-xs ${
                        seoDescription.length > MAX_SEO_DESCRIPTION
                          ? 'text-red-500'
                          : theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {seoDescription.length}/{MAX_SEO_DESCRIPTION}
                      </span>
                    </label>
                    <textarea
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value.slice(0, MAX_SEO_DESCRIPTION))}
                      placeholder="Descripción que aparecerá en los resultados de búsqueda..."
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      Idealmente entre 150-160 caracteres
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>Palabras Clave</label>
                    <input
                      type="text"
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                      placeholder="Ej: empresa, tecnología, innovación"
                      className={inputClass}
                    />
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      Separa con comas
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800/30 border-gray-700'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className={`w-4 h-4 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Vista previa en Google
                      </span>
                    </div>
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <div className="text-blue-500 hover:underline cursor-pointer font-medium">
                        {title || 'Título de la noticia'}
                      </div>
                      <div className="text-xs text-green-600">
                        www.bausen.com/noticias/{generateSlug(title || 'nueva-noticia')}
                      </div>
                      <div className="text-xs mt-1 line-clamp-2">
                        {seoDescription || 'Meta descripción de la noticia...'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          
            <div className={`flex justify-between items-center gap-3 px-5 py-4 border-t ${
              theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50/50 border-gray-200'
            }`}>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className={`px-3 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                <Eye className="w-4 h-4" />
                Vista Previa
              </button>
              
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsExpanded(false)}
                  className={`px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
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
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                    loading
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white shadow-sm`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Publicar Noticia
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
            className={`max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xl ${
              theme === 'dark' ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
            } shadow-xl`}
            onClick={e => e.stopPropagation()}
          >
            <div className={`p-4 border-b sticky top-0 ${
              theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className={`font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Vista Previa
                </h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h2 className={`text-2xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {title || 'Sin título'}
                </h2>
                <p className={`text-lg mb-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {subtitle || 'Sin subtítulo'}
                </p>

                {preview && (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={preview}
                      alt="Preview"
                      width={800}
                      height={450}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <div className={`prose prose-sm max-w-none ${
                  theme === 'dark' ? 'prose-invert' : ''
                }`} dangerouslySetInnerHTML={{ __html: description || '<p class="text-gray-500">Sin descripción</p>' }} />

                <div className={`mt-6 pt-6 border-t ${
                  theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                }`}>
                  <div className="flex flex-wrap gap-4 text-sm mb-4">
                    <div>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        Categoría
                      </p>
                      <p className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {category}
                      </p>
                    </div>
                    <div>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        Tiempo de lectura
                      </p>
                      <p className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {getReadingTime()} minuto{getReadingTime() > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        Publicación
                      </p>
                      <p className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {publishDate} a las {publishTime}
                      </p>
                    </div>
                    {featured && (
                      <div>
                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                          Estado
                        </p>
                        <p className="font-medium text-blue-500">Destacada</p>
                      </div>
                    )}
                  </div>

                  {tags.length > 0 && (
                    <div>
                      <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Etiquetas
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                              theme === 'dark'
                                ? 'bg-blue-900/30 text-blue-300'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const NewsForm = memo(NewsFormComponent);
NewsForm.displayName = 'NewsForm';

export default NewsForm;