"use client";

import React, { useState, useCallback, useRef } from "react";
import { 
  FileText, 
  Calendar, 
  Link as LinkIcon, 
  Upload, 
  CheckCircle,
  AlertCircle,
  CheckCircle as CheckCircleIcon,
  Eye
} from "lucide-react";
import { FormWizardModal } from "@/components/modals/FormWizardModal";
import { 
  StepInput, 
  StepTextarea, 
  StepGrid,
  StepSection,
  StepToggle
} from "@/components/modals/WizardStep";
import type { WizardStep } from "@/components/modals/FormWizardModal";

// ============================================================================
// Types
// ============================================================================

export interface PressWizardData {
  title: string;
  date: string;
  excerpt: string;
  link: string;
  file: File | null;
  preview: string | null;
  published: boolean;
}

interface PressWizardFormProps {
  /** Whether the form is open */
  isOpen: boolean;
  /** Callback to close the form */
  onClose: () => void;
  /** Callback when press release is created successfully */
  onCreated: (press: Record<string, unknown>) => void;
  /** Current theme */
  theme: "light" | "dark";
}

// ============================================================================
// Constants
// ============================================================================

const MAX_TITLE_LENGTH = 150;
const MAX_EXCERPT_LENGTH = 500;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// ============================================================================
// Wizard Steps Definition
// ============================================================================

const PRESS_WIZARD_STEPS: WizardStep[] = [
  {
    id: "basic",
    title: "Información Básica",
    description: "Título y fecha del comunicado",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "content",
    title: "Contenido",
    description: "Resumen del comunicado",
    icon: <Eye className="w-5 h-5" />,
  },
  {
    id: "media",
    title: "Medios",
    description: "Archivo y enlace",
    icon: <Upload className="w-5 h-5" />,
  },
  {
    id: "review",
    title: "Revisión Final",
    description: "Confirma los datos antes de guardar",
    icon: <CheckCircle className="w-5 h-5" />,
  },
];

// ============================================================================
// PressWizardForm Component
// ============================================================================

export function PressWizardForm({ isOpen, onClose, onCreated, theme }: PressWizardFormProps) {
  const [data, setData] = useState<PressWizardData>({
    title: "",
    date: new Date().toISOString().split("T")[0],
    excerpt: "",
    link: "",
    file: null,
    preview: null,
    published: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [currentStepId, setCurrentStepId] = useState("basic");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const updateData = (updates: Partial<PressWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  // File handling
  const handleFileChange = (file: File | null) => {
    if (!file) {
      updateData({ file: null, preview: null });
      return;
    }

    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 
      'image/bmp', 'image/svg+xml', 'application/pdf'
    ];

    if (!allowedTypes.includes(file.type)) {
      showMessage('error', 'Solo se permiten imágenes o PDF');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      showMessage('error', `Archivo muy grande. Máximo ${MAX_FILE_SIZE / 1024 / 1024}MB`);
      return;
    }

    updateData({ file });
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => updateData({ preview: e.target?.result as string });
      reader.readAsDataURL(file);
    } else {
      updateData({ preview: null });
    }
  };

  // Validation by step
  const validateStep = useCallback(async () => {
    switch (currentStepId) {
      case "basic":
        if (!data.title.trim()) {
          return { valid: false, error: "El título es requerido" };
        }
        if (data.title.length > MAX_TITLE_LENGTH) {
          return { valid: false, error: `El título no puede exceder ${MAX_TITLE_LENGTH} caracteres` };
        }
        if (!data.date) {
          return { valid: false, error: "La fecha es requerida" };
        }
        return { valid: true };
      
      case "content":
        if (!data.excerpt.trim()) {
          return { valid: false, error: "El resumen es requerido" };
        }
        if (data.excerpt.length > MAX_EXCERPT_LENGTH) {
          return { valid: false, error: `El resumen no puede exceder ${MAX_EXCERPT_LENGTH} caracteres` };
        }
        return { valid: true };
      
      case "media":
        return { valid: true };
      
      case "review":
        return { valid: true };
      
      default:
        return { valid: true };
    }
  }, [data, currentStepId]);

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    
    const form = new FormData();
    form.append("title", data.title);
    form.append("date", data.date);
    form.append("excerpt", data.excerpt);
    if (data.link) form.append("link", data.link);
    form.append("published", String(data.published));
    if (data.file) form.append("file", data.file);

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

    try {
      const res = await fetch(`${API}/api/press`, {
        method: "POST",
        body: form,
        headers: { ...baseHeaders, ...bypassHeaders },
        credentials: 'include',
      });

      const body = await res.json();

      if (res.ok) {
        showMessage('success', 'Comunicado creado exitosamente');
        onCreated(body);
        onClose();
      } else {
        const errorMsg = body.error || body.message || 'Error desconocido';
        showMessage('error', `Error al crear comunicado: ${errorMsg}`);
      }
    } catch {
      showMessage('error', 'Error al crear el comunicado');
    } finally {
      setLoading(false);
    }
  };

  // Render step content
  const renderStep = useCallback((step: WizardStep, _currentStep: number) => {
    setCurrentStepId(step.id);
    
    switch (step.id) {
      case "basic":
        return (
          <div className="space-y-4">
            <StepInput
              label="Título del Comunicado"
              value={data.title}
              onChange={(v) => updateData({ title: v })}
              placeholder="Título del comunicado..."
              required
              maxLength={MAX_TITLE_LENGTH}
              theme={theme}
            />
            
            <StepInput
              label="Fecha"
              type="date"
              value={data.date}
              onChange={(v) => updateData({ date: v })}
              required
              theme={theme}
            />
          </div>
        );
      
      case "content":
        return (
          <div className="space-y-4">
            <StepTextarea
              label="Resumen"
              value={data.excerpt}
              onChange={(v) => updateData({ excerpt: v })}
              placeholder="Breve descripción del comunicado..."
              required
              maxLength={MAX_EXCERPT_LENGTH}
              rows={4}
              theme={theme}
              helper={`${data.excerpt.length}/${MAX_EXCERPT_LENGTH} caracteres`}
            />
          </div>
        );
      
      case "media":
        return (
          <div className="space-y-4">
            <StepInput
              label="Enlace (opcional)"
              type="url"
              value={data.link}
              onChange={(v) => updateData({ link: v })}
              placeholder="https://..."
              theme={theme}
            />
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                Archivo (opcional)
              </label>
              
              {data.preview ? (
                <div className="flex items-center gap-4">
                  <img 
                    src={data.preview} 
                    alt="Previsualización" 
                    className="h-20 w-20 object-cover rounded-lg border"
                  />
                  <div>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      {data.file?.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleFileChange(null)}
                      className="mt-2 text-sm text-red-500 hover:text-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                    ${theme === "dark" 
                      ? "border-slate-700 hover:border-blue-500 hover:bg-slate-800/30" 
                      : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
                    }
                  `}
                >
                  <Upload className={`w-8 h-8 mx-auto mb-2 ${
                    theme === "dark" ? "text-slate-600" : "text-slate-400"
                  }`} />
                  <p className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    Haz clic para seleccionar archivo
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                    Imágenes o PDF hasta 5MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  />
                </div>
              )}
            </div>
            
            <StepToggle
              label="Publicado"
              checked={data.published}
              onChange={(v) => updateData({ published: v })}
              theme={theme}
            />
          </div>
        );
      
      case "review":
        return (
          <div className="space-y-6">
            <StepSection title="Información Básica" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Título</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.title || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Fecha</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.date ? new Date(data.date).toLocaleDateString() : "—"}
                  </dd>
                </div>
              </dl>
            </StepSection>
            
            <StepSection title="Contenido" theme={theme}>
              <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                {data.excerpt || "—"}
              </p>
            </StepSection>
            
            <StepSection title="Medios" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Enlace</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.link ? <a href={data.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{data.link}</a> : "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Archivo</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.file ? data.file.name : "No seleccionado"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Estado</dt>
                  <dd className={`text-sm font-medium ${data.published ? "text-emerald-500" : theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.published ? "Publicado" : "Borrador"}
                  </dd>
                </div>
              </dl>
            </StepSection>
          </div>
        );
      
      default:
        return null;
    }
  }, [data, theme]);

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
        title="Crear Nuevo Comunicado"
        subtitle="Completa los pasos para publicar el comunicado"
        steps={PRESS_WIZARD_STEPS}
        onSubmit={handleSubmit}
        renderStep={renderStep}
        loading={loading}
        submitLabel="Crear Comunicado"
        size="lg"
        draftKey="press_wizard"
        theme={theme}
      />
    </>
  );
}

export default PressWizardForm;

