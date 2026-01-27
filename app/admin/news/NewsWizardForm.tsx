"use client";

import React, { useState, useCallback, useRef } from "react";
import { 
  Type, 
  FileText, 
  Image as ImageIcon, 
  Tag, 
  Zap, 
  CheckCircle,
  Clock,
  Upload,
  X,
  AlertCircle,
  CheckCircle as CheckCircleIcon
} from "lucide-react";
import { FormWizardModal, WizardStep } from "@/components/modals/FormWizardModal";
import { 
  StepInput, 
  StepTextarea, 
  StepSelect, 
  StepGrid,
  StepSection,
  StepToggle
} from "@/components/modals/WizardStep";
import RichTextEditor from "./RichTextEditor";
import { NewsItem } from './types';

// ============================================================================
// Types
// ============================================================================

// (removed unused NewsApiResponse)

interface NewsWizardData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: File | null;
  preview: string | null;
  altText: string;
  seoDescription: string;
  seoKeywords: string;
  publishDate: string;
  publishTime: string;
}

interface NewsWizardFormProps {
  /** Whether the form is open */
  isOpen: boolean;
  /** Callback to close the form */
  onClose: () => void;
  /** Callback when news is created successfully */
  onCreated?: (news: NewsItem) => void;
  /** Callback when news is updated successfully */
  onUpdated?: (news: NewsItem) => void;
  /** Optional initial data for editing */
  initialData?: Partial<NewsWizardData> | NewsItem | null;
  /** Optional editing identifier (slug or _id) */
  editingId?: string | null;
  /** Current theme */
  theme: "light" | "dark";
}

// ============================================================================
// Constants
// ============================================================================

const CATEGORIES = [
  { value: "Empresarial", label: "Empresarial" },
  { value: "Recursos Humanos", label: "Recursos Humanos" },
  { value: "Capacitación", label: "Capacitación" },
  { value: "Legal", label: "Legal" },
  { value: "Tecnología", label: "Tecnología" },
  { value: "Noticias Generales", label: "Noticias Generales" },
];

const MAX_TITLE_LENGTH = 100;
const MAX_SUBTITLE_LENGTH = 150;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_SEO_DESCRIPTION = 160;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

// ============================================================================
// Wizard Steps Definition
// ============================================================================

const NEWS_WIZARD_STEPS = [
  {
    id: "basic",
    title: "Información Básica",
    description: "Datos generales de la noticia",
    icon: <Type className="w-5 h-5" />,
  },
  {
    id: "content",
    title: "Contenido",
    description: "Descripción y cuerpo de la noticia",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "media",
    title: "Medios",
    description: "Imagen principal y multimedia",
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    id: "meta",
    title: "Meta Información",
    description: "Categorías y configuración",
    icon: <Tag className="w-5 h-5" />,
  },
  {
    id: "seo",
    title: "SEO",
    description: "Optimización para motores de búsqueda",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: "review",
    title: "Revisión Final",
    description: "Confirma los datos antes de publicar",
    icon: <CheckCircle className="w-5 h-5" />,
  },
];

// ============================================================================
// NewsWizardForm Component
// ============================================================================

export function NewsWizardForm({ isOpen, onClose, onCreated, onUpdated, initialData, editingId, theme }: NewsWizardFormProps) {
  const [data, setData] = useState<NewsWizardData>({
    title: "",
    subtitle: "",
    description: "",
    category: CATEGORIES[0].value,
    tags: [],
    featured: false,
    image: null,
    preview: null,
    altText: "",
    seoDescription: "",
    seoKeywords: "",
    publishDate: new Date().toISOString().split("T")[0],
    publishTime: "09:00",
  });

  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [currentStepId, setCurrentStepId] = useState("basic");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Type guard for NewsItem
  const isNewsItem = (obj: unknown): obj is NewsItem => {
    return !!obj && typeof obj === 'object' && ("_id" in (obj as object) || "slug" in (obj as object));
  };

  // Support initialData when editing - populate fields
  const isEditing = Boolean(editingId || (initialData && isNewsItem(initialData)));

  React.useEffect(() => {
    if (!initialData) return;
    const idata = initialData as Partial<NewsWizardData> & Partial<NewsItem>;
    setData(prev => {
      const title = idata.title ?? (idata as Partial<NewsItem>).title ?? prev.title;
      const subtitle = idata.subtitle ?? (idata as Partial<NewsItem>).subtitle ?? prev.subtitle;
      const description = idata.description ?? ((idata as Partial<NewsItem>).content as string) ?? prev.description;
      const category = idata.category ?? (idata as Partial<NewsItem>).category ?? prev.category;
      const tags = idata.tags ?? (idata as Partial<NewsItem>).tags ?? prev.tags;
      const featured = typeof idata.featured === 'boolean' ? idata.featured : (typeof (idata as Partial<NewsItem>).featured === 'boolean' ? (idata as Partial<NewsItem>).featured! : prev.featured);
      const altText = idata.altText ?? (idata as Partial<NewsItem>).altText ?? prev.altText;
      const seoDescription = idata.seoDescription ?? (idata as Partial<NewsItem>).seoDescription ?? prev.seoDescription;
      const seoKeywords = idata.seoKeywords ?? (idata as Partial<NewsItem>).seoKeywords ?? prev.seoKeywords;
      const publishDate = idata.publishDate ?? ((idata as Partial<NewsItem>).publishDate ? String((idata as Partial<NewsItem>).publishDate).split(' ')[0] : prev.publishDate);
      const publishTime = idata.publishTime ?? (idata as Partial<NewsItem>).publishTime ?? prev.publishTime;
      const preview: string | null = (idata as Partial<NewsItem>).image_url ? (((idata as Partial<NewsItem>).image_url as string).startsWith('http') ? (idata as Partial<NewsItem>).image_url as string : `${process.env.NEXT_PUBLIC_API_URL}${(idata as Partial<NewsItem>).image_url as string}`) : prev.preview;

      return {
        ...prev,
        title,
        subtitle,
        description,
        category,
        tags,
        featured,
        altText,
        seoDescription,
        seoKeywords,
        publishDate,
        publishTime,
        preview,
      };
    });
  }, [initialData]);

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const updateData = useCallback((updates: Partial<NewsWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  // Tag management
  const addTag = useCallback(() => {
    if (tagInput.trim() && !data.tags.includes(tagInput.trim()) && data.tags.length < 8) {
      updateData({ tags: [...data.tags, tagInput.trim()] });
      setTagInput("");
    }
  }, [tagInput, data.tags, updateData]);

  const removeTag = useCallback((tag: string) => {
    updateData({ tags: data.tags.filter(t => t !== tag) });
  }, [data.tags, updateData]);

  // Image handling
  const handleImageChange = useCallback((file: File | null) => {
    if (!file) {
      updateData({ image: null, preview: null });
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

    updateData({ image: file });
    const reader = new FileReader();
    reader.onload = (e) => updateData({ preview: (e.target?.result as string) ?? null });
    reader.readAsDataURL(file);
  }, [showMessage, updateData]);

  // Calculate reading time
  const getReadingTime = useCallback(() => {
    const wordsPerMinute = 200;
    const plainText = data.description.replace(/<[^>]*>/g, '');
    const wordCount = plainText.split(/\s+/).filter(w => w.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }, [data.description]);

  // Validation logic is performed in `handleSubmit`; removed unused validateStep to satisfy linter

  // Map frontend category to backend category
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

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    
    const form = new FormData();
    form.append("title", data.title);
    form.append("subtitle", data.subtitle);
    form.append("description", data.description);
    form.append("category", mapCategoryToBackend(data.category));
    form.append("tags", JSON.stringify(data.tags));
    form.append("featured", String(data.featured));
    form.append("altText", data.altText);
    form.append("seoDescription", data.seoDescription);
    form.append("seoKeywords", data.seoKeywords);
    form.append("publishDate", `${data.publishDate} ${data.publishTime}`);
    if (data.image) form.append("image", data.image);

    try {
      // Use centralized admin API client
      const { adminApi } = await import('../utils/admin-api');
      if (isEditing) {
        let id = editingId || '';
        if (!id && initialData && isNewsItem(initialData)) {
          id = initialData._id || initialData.slug || '';
        }

        const res = await adminApi.updateNews(String(id), form as FormData);
        const resp = res as { news?: NewsItem } | undefined;
        if (resp && resp.news) {
          showMessage('success', 'Noticia actualizada exitosamente');
          if (typeof onUpdated === 'function') onUpdated(resp.news);
        } else {
          showMessage('success', 'Noticia actualizada exitosamente');
          if (typeof onUpdated === 'function' && initialData && isNewsItem(initialData)) onUpdated(initialData);
        }
        onClose();
      } else {
        const res = await adminApi.createNews(form as FormData);
        const resp = res as { news?: NewsItem } | undefined;
        if (resp && resp.news) {
          showMessage('success', `Noticia creada exitosamente`);
          if (typeof onCreated === 'function') onCreated(resp.news);
        } else {
          showMessage('success', 'Noticia creada exitosamente');
        }
        onClose();
      }
    } catch {
      showMessage('error', 'Error al crear la noticia');
    } finally {
      setLoading(false);
    }
  };

  // Render step content
  const renderStep = useCallback((step: WizardStep) => {
    setCurrentStepId(step.id);
    
    switch (step.id) {
      case "basic":
        return (
          <div className="space-y-4">
            <StepInput
              label="Título"
              value={data.title}
              onChange={(v) => updateData({ title: v })}
              placeholder="Título impactante de la noticia..."
              required
              maxLength={MAX_TITLE_LENGTH}
              theme={theme}
            />
            <StepInput
              label="Subtítulo"
              value={data.subtitle}
              onChange={(v) => updateData({ subtitle: v })}
              placeholder="Subtítulo descriptivo..."
              required
              maxLength={MAX_SUBTITLE_LENGTH}
              theme={theme}
            />
          </div>
        );
      
      case "content":
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                Descripción
                <span className="text-red-500 ml-1">*</span>
              </label>
              <RichTextEditor 
                value={data.description}
                onChange={(v) => updateData({ description: v })}
                theme={theme}
                placeholder="Contenido completo de la noticia..."
                maxLength={MAX_DESCRIPTION_LENGTH}
              />
              <div className="flex justify-between mt-1">
                <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                  Mínimo 50 caracteres
                </p>
                <p className={`text-xs ${
                  data.description.replace(/<[^>]*>/g, '').length < 50 
                    ? 'text-amber-500' 
                    : theme === "dark" ? "text-slate-500" : "text-slate-500"
                }`}>
                  {data.description.replace(/<[^>]*>/g, '').length}/{MAX_DESCRIPTION_LENGTH}
                </p>
              </div>
            </div>
            
            <div className={`p-3 rounded-lg border ${
              theme === "dark" ? "bg-slate-800/30 border-slate-700" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  Tiempo de lectura: <strong>{getReadingTime()} minuto{getReadingTime() > 1 ? 's' : ''}</strong>
                </span>
              </div>
            </div>
          </div>
        );
      
      case "media":
        return (
          <div className="space-y-4">
            {/* Image upload area */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                Imagen Principal
                <span className="text-red-500 ml-1">*</span>
              </label>
              
              {data.preview ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img 
                    src={data.preview} 
                    alt="Preview" 
                    className="w-full h-auto max-h-64 object-cover" 
                  />
                  <button
                    type="button"
                    onClick={() => handleImageChange(null)}
                    className={`absolute top-2 right-2 p-2 rounded-full ${
                      theme === "dark" ? "bg-red-900/80 text-white hover:bg-red-900" : "bg-red-500 text-white hover:bg-red-600"
                    } transition-colors`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {data.image && (
                    <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs ${
                      theme === "dark" ? "bg-slate-900/80 text-white" : "bg-white/80 text-slate-700"
                    }`}>
                      {data.image.name} • {(data.image.size / 1024).toFixed(2)} KB
                    </div>
                  )}
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
                    ${theme === "dark" 
                      ? "border-slate-700 hover:border-blue-500 hover:bg-slate-800/30" 
                      : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
                    }
                  `}
                >
                  <Upload className={`w-10 h-10 mx-auto mb-3 ${
                    theme === "dark" ? "text-slate-600" : "text-slate-400"
                  }`} />
                  <p className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    Arrastra una imagen o haz clic para seleccionar
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                    PNG, JPG, WEBP hasta 2MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                  />
                </div>
              )}
            </div>
            
            <StepInput
              label="Texto Alternativo (Alt Text)"
              value={data.altText}
              onChange={(v) => updateData({ altText: v })}
              placeholder="Descripción de la imagen para accesibilidad..."
              theme={theme}
              helper="Ayuda a motores de búsqueda y usuarios con discapacidades visuales"
            />
          </div>
        );
      
      case "meta":
        return (
          <div className="space-y-4">
            <StepSelect
              label="Categoría"
              value={data.category}
              options={CATEGORIES}
              onChange={(v) => updateData({ category: v })}
              theme={theme}
            />
            
            {/* Tags input */}
            <div className="mb-5">
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                Etiquetas
                <span className="float-right text-xs text-slate-500">({data.tags.length}/8)</span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  className={`flex-1 px-4 py-2.5 rounded-xl border-2 outline-none min-h-[48px] ${
                    theme === "dark"
                      ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                      : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
                  }`}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Agregar etiqueta..."
                  disabled={data.tags.length >= 8}
                />
                <button
                  type="button"
                  onClick={addTag}
                  disabled={data.tags.length >= 8 || !tagInput.trim()}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm text-white transition-all ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800"
                      : "bg-blue-500 hover:bg-blue-600 disabled:bg-slate-200"
                  }`}
                >
                  Agregar
                </button>
              </div>
              
              {data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                        theme === "dark"
                          ? "bg-blue-900/30 text-blue-300 border border-blue-800/50"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:opacity-70">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <StepToggle
              label="Marcar como destacada"
              checked={data.featured}
              onChange={(v) => updateData({ featured: v })}
              theme={theme}
            />
          </div>
        );
      
      case "seo":
        return (
          <div className="space-y-4">
            <StepGrid columns={2} theme={theme}>
              <StepInput
                label="Fecha de Publicación"
                type="date"
                value={data.publishDate}
                onChange={(v) => updateData({ publishDate: v })}
                theme={theme}
              />
              <StepInput
                label="Hora de Publicación"
                type="time"
                value={data.publishTime}
                onChange={(v) => updateData({ publishTime: v })}
                theme={theme}
              />
            </StepGrid>
            
            <StepTextarea
              label="Meta Descripción"
              value={data.seoDescription}
              onChange={(v) => updateData({ seoDescription: v })}
              placeholder="Descripción que aparecerá en los resultados de búsqueda..."
              maxLength={MAX_SEO_DESCRIPTION}
              rows={3}
              helper="Idealmente entre 150-160 caracteres"
              theme={theme}
            />
            
            <StepInput
              label="Palabras Clave"
              value={data.seoKeywords}
              onChange={(v) => updateData({ seoKeywords: v })}
              placeholder="Ej: empresa, tecnología, innovación"
              helper="Separa con comas"
              theme={theme}
            />
          </div>
        );
      
      case "review":
        return (
          <div className="space-y-6">
            {/* Basic Info */}
            <StepSection title="Información Básica" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Título</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.title || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Subtítulo</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.subtitle || "—"}
                  </dd>
                </div>
              </dl>
            </StepSection>
            
            {/* Content & Media */}
            <StepSection title="Contenido y Media" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Tiempo de lectura</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {getReadingTime()} minutos
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Imagen</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.image ? data.image.name : "No seleccionada"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Texto alternativo</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.altText || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Destacada</dt>
                  <dd className={`text-sm font-medium ${data.featured ? "text-blue-500" : theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.featured ? "Sí" : "No"}
                  </dd>
                </div>
              </dl>
            </StepSection>
            
            {/* Metadata */}
            <StepSection title="Metadatos" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Fecha de publicación</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.publishDate} a las {data.publishTime}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Categoría</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.category}
                  </dd>
                </div>
                {data.tags.length > 0 && (
                  <div className="flex justify-between">
                    <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Etiquetas</dt>
                    <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {data.tags.join(", ")}
                    </dd>
                  </div>
                )}
              </dl>
            </StepSection>
            
            {/* SEO */}
            <StepSection title="SEO" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Meta descripción</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.seoDescription || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Palabras clave</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.seoKeywords || "—"}
                  </dd>
                </div>
              </dl>
            </StepSection>
          </div>
        );
      
      default:
        return null;
    }
  }, [data, theme, tagInput, addTag, getReadingTime, handleImageChange, removeTag, updateData]);

  // Show toast message
  const ToastMessage = () => {
    if (!message) return null;
    
    return (
      <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border shadow-lg flex items-center gap-2 ${
        message.type === 'success'
          ? theme === "dark" ? "bg-emerald-900/20 border-emerald-800/50 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-700"
          : theme === "dark" ? "bg-red-900/20 border-red-800/50 text-red-400" : "bg-red-50 border-red-200 text-red-700"
      }`}>
        {message.type === 'success' ? <CheckCircleIcon className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
        <span className="text-sm font-medium">{message.text}</span>
      </div>
    );
  };

  return (
    <>
      <ToastMessage />
      
      <FormWizardModal
        isOpen={isOpen}
        onClose={onClose}
        title="Crear Nueva Noticia"
        subtitle="Completa los pasos para publicar una noticia"
        steps={NEWS_WIZARD_STEPS}
        onSubmit={handleSubmit}
        renderStep={renderStep}
        loading={loading}
        submitLabel="Publicar Noticia"
        size="lg"
        draftKey="news_wizard"
        theme={theme}
      />
    </>
  );
}

export default NewsWizardForm;

