"use client";

import React, { useState, useCallback, useRef } from "react";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  FileText, 
  Image as ImageIcon,
  Upload,
  CheckCircle,
  AlertCircle,
  CheckCircle as CheckCircleIcon
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

export interface JobsWizardData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  modality: string;
  salary: string;
  image_url: string;
  imageFile: File | null;
  imagePreview: string | null;
  isActive: boolean;
}

interface JobsWizardFormProps {
  /** Whether the form is open */
  isOpen: boolean;
  /** Callback to close the form */
  onClose: () => void;
  /** Callback when job is created successfully */
  onCreated: (job: Record<string, unknown>) => void;
  /** Current theme */
  theme: "light" | "dark";
}

// ============================================================================
// Constants
// ============================================================================

const MODALITIES = [
  { value: "", label: "Seleccionar modalidad" },
  { value: "presencial", label: "Presencial" },
  { value: "remoto", label: "Remoto" },
  { value: "hibrido", label: "Híbrido" },
];

const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_REQUIREMENTS_LENGTH = 2000;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

// ============================================================================
// Wizard Steps Definition
// ============================================================================

const JOBS_WIZARD_STEPS: WizardStep[] = [
  {
    id: "basic",
    title: "Información Básica",
    description: "Título, ubicación y modalidad",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "details",
    title: "Detalles del Puesto",
    description: "Descripción y requisitos",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "media",
    title: "Imagen y Salario",
    description: "Imagen representativa y rango salarial",
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    id: "review",
    title: "Revisión Final",
    description: "Confirma los datos antes de guardar",
    icon: <CheckCircle className="w-5 h-5" />,
  },
];

// ============================================================================
// JobsWizardForm Component
// ============================================================================

export function JobsWizardForm({ isOpen, onClose, onCreated, theme }: JobsWizardFormProps) {
  const [data, setData] = useState<JobsWizardData>({
    title: "",
    description: "",
    requirements: "",
    location: "",
    modality: "",
    salary: "",
    image_url: "",
    imageFile: null,
    imagePreview: null,
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [currentStepId, setCurrentStepId] = useState("basic");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const updateData = (updates: Partial<JobsWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  // Image handling
  const handleImageChange = (file: File | null) => {
    if (!file) {
      updateData({ imageFile: null, imagePreview: null });
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

    updateData({ imageFile: file, image_url: '' });
    const reader = new FileReader();
    reader.onload = (e) => updateData({ imagePreview: e.target?.result as string });
    reader.readAsDataURL(file);
  };

  // URL handling
  const handleUrlChange = (url: string) => {
    updateData({ image_url: url, imageFile: null, imagePreview: url || null });
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
        if (!data.location.trim()) {
          return { valid: false, error: "La ubicación es requerida" };
        }
        if (!data.modality.trim()) {
          return { valid: false, error: "La modalidad es requerida" };
        }
        return { valid: true };
      
      case "details":
        if (!data.description.trim()) {
          return { valid: false, error: "La descripción es requerida" };
        }
        if (data.description.length > MAX_DESCRIPTION_LENGTH) {
          return { valid: false, error: `La descripción no puede exceder ${MAX_DESCRIPTION_LENGTH} caracteres` };
        }
        if (!data.requirements.trim()) {
          return { valid: false, error: "Los requisitos son requeridos" };
        }
        if (data.requirements.length > MAX_REQUIREMENTS_LENGTH) {
          return { valid: false, error: `Los requisitos no pueden exceder ${MAX_REQUIREMENTS_LENGTH} caracteres` };
        }
        return { valid: true };
      
      case "media":
        if (!data.salary.trim()) {
          return { valid: false, error: "El salario es requerido" };
        }
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
      const payload = {
        title: data.title,
        description: data.description,
        requirements: data.requirements,
        location: data.location,
        employment_type: data.modality,
        posted_date: new Date().toISOString().split("T")[0],
        is_active: data.isActive,
        salary_range: data.salary ? { label: data.salary } : {},
        image_url: data.image_url,
      };
      const res = await fetch(`/web/api/backend/admin/jobs`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json", ...baseHeaders, ...bypassHeaders },
        credentials: 'include',
      });

      const body = await res.json();

      if (res.ok) {
        showMessage('success', 'Vacante creada exitosamente');
        onCreated(body);
        onClose();
      } else {
        const errorMsg = body.error || body.message || 'Error desconocido';
        showMessage('error', `Error al crear vacante: ${errorMsg}`);
      }
    } catch {
      showMessage('error', 'Error al crear la vacante');
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
              label="Título de la Vacante"
              value={data.title}
              onChange={(v) => updateData({ title: v })}
              placeholder="Ej: Desarrollador Frontend Senior"
              required
              maxLength={MAX_TITLE_LENGTH}
              theme={theme}
            />
            
            <StepGrid columns={2} theme={theme}>
              <StepInput
                label="Ubicación"
                value={data.location}
                onChange={(v) => updateData({ location: v })}
                placeholder="Ej: Ciudad de México"
                required
                theme={theme}
              />
              <StepInput
                label="Modalidad"
                value={data.modality}
                onChange={(v) => updateData({ modality: v })}
                placeholder="Ej: Remoto, Híbrido, Presencial"
                required
                theme={theme}
              />
            </StepGrid>
          </div>
        );
      
      case "details":
        return (
          <div className="space-y-4">
            <StepTextarea
              label="Descripción del Puesto"
              value={data.description}
              onChange={(v) => updateData({ description: v })}
              placeholder="Describe las responsabilidades, actividades y objetivos del puesto..."
              required
              maxLength={MAX_DESCRIPTION_LENGTH}
              rows={5}
              theme={theme}
              helper={`${data.description.length}/${MAX_DESCRIPTION_LENGTH} caracteres`}
            />
            
            <StepTextarea
              label="Requisitos y Cualificaciones"
              value={data.requirements}
              onChange={(v) => updateData({ requirements: v })}
              placeholder="Lista los requisitos educativos, experiencia previa, habilidades..."
              required
              maxLength={MAX_REQUIREMENTS_LENGTH}
              rows={5}
              theme={theme}
              helper={`${data.requirements.length}/${MAX_REQUIREMENTS_LENGTH} caracteres`}
            />
          </div>
        );
      
      case "media":
        return (
          <div className="space-y-4">
            <StepInput
              label="Salario (rango o cantidad)"
              value={data.salary}
              onChange={(v) => updateData({ salary: v })}
              placeholder="Ej: $30,000 - $45,000 MXN mensuales"
              required
              theme={theme}
            />
            
            {/* Image Section */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                Imagen Representativa (opcional)
              </label>
              
              {data.imagePreview ? (
                <div className="flex items-center gap-4">
                  <img 
                    src={data.imagePreview} 
                    alt="Previsualización" 
                    className="h-20 w-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <input
                      type="url"
                      value={data.image_url}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className={`w-full px-3 py-2 rounded-lg text-sm border ${
                        theme === "dark"
                          ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                          : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                      }`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleImageChange(null)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      theme === "dark"
                        ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                    }`}
                  >
                    Eliminar
                  </button>
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
              
              <p className={`text-xs mt-2 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                También puedes pegar una URL directamente en el campo de imagen
              </p>
            </div>
            
            <StepToggle
              label="Publicar inmediatamente"
              checked={data.isActive}
              onChange={(v) => updateData({ isActive: v })}
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
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Ubicación</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.location || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Modalidad</dt>
                  <dd className={`text-sm font-medium capitalize ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.modality || "—"}
                  </dd>
                </div>
              </dl>
            </StepSection>
            
            <StepSection title="Detalles del Puesto" theme={theme}>
              <div className="space-y-4">
                <div>
                  <p className={`text-xs mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>Descripción</p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    {data.description.length > 200 
                      ? `${data.description.substring(0, 200)}...` 
                      : data.description || "—"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>Requisitos</p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    {data.requirements.length > 200 
                      ? `${data.requirements.substring(0, 200)}...` 
                      : data.requirements || "—"}
                  </p>
                </div>
              </div>
            </StepSection>
            
            <StepSection title="Imagen y Salario" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Salario</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.salary || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Imagen</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.imagePreview ? "Sí" : "No"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Estado</dt>
                  <dd className={`text-sm font-medium ${data.isActive ? "text-emerald-500" : theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.isActive ? "Publicado" : "Borrador"}
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
        title="Crear Nueva Vacante"
        subtitle="Completa los pasos para publicar la vacante"
        steps={JOBS_WIZARD_STEPS}
        onSubmit={handleSubmit}
        renderStep={renderStep}
        loading={loading}
        submitLabel="Publicar Vacante"
        size="lg"
        draftKey="jobs_wizard"
        theme={theme}
      />
    </>
  );
}

export default JobsWizardForm;

