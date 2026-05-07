"use client";

import React, { useState, useCallback, useRef } from "react";
import { 
  User, 
  Clock, 
  Gift, 
  CheckCircle,
  AlertCircle,
  CheckCircle as CheckCircleIcon,
  Calendar,
  MapPin,
  BookOpen,
  Target,
  Heart
} from "lucide-react";
import { FormWizardModal } from "@/components/modals/FormWizardModal";
import { 
  StepInput, 
  StepTextarea, 
  StepSelect, 
  StepGrid,
  StepSection
} from "@/components/modals/WizardStep";
import type { WizardStep } from "@/components/modals/FormWizardModal";

// ============================================================================
// Types
// ============================================================================

export interface InternshipsWizardData {
  title: string;
  area: string;
  description: string;
  modalidad: string;
  duracion: string;
  horario: string;
  ubicacion: string;
  requisitos: string;
  beneficios: string;
  fechaCierre: string;
  hacer: string;
  aprender: string;
  buscar: string;
  isActive: boolean;
}

interface InternshipsWizardFormProps {
  /** Whether the form is open */
  isOpen: boolean;
  /** Callback to close the form */
  onClose: () => void;
  /** Callback when internship is created successfully */
  onCreated: (internship: Record<string, unknown>) => void;
  /** Current theme */
  theme: "light" | "dark";
}

// ============================================================================
// Constants
// ============================================================================

const MODALIDADES = [
  { value: "", label: "Seleccionar modalidad" },
  { value: "presencial", label: "Presencial" },
  { value: "remoto", label: "Remoto" },
  { value: "hibrido", label: "Híbrido" },
];

const AREAS = [
  "Desarrollo",
  "Diseño",
  "Marketing",
  "Finanzas",
  "Recursos Humanos",
  "Operaciones",
  "Ventas",
  "Soporte Técnico",
];

const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_REQUISITOS_LENGTH = 1000;
const MAX_BENEFICIOS_LENGTH = 1000;
const MAX_HACER_LENGTH = 1000;
const MAX_APRENDER_LENGTH = 1000;
const MAX_BUSCAR_LENGTH = 1000;

// ============================================================================
// Wizard Steps Definition
// ============================================================================

const INTERNSHIPS_WIZARD_STEPS: WizardStep[] = [
  {
    id: "basic",
    title: "Información Básica",
    description: "Datos generales del programa",
    icon: <User className="w-5 h-5" />,
  },
  {
    id: "details",
    title: "Detalles del Programa",
    description: "Modalidad, duración y ubicación",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "content",
    title: "Contenido y Beneficios",
    description: "Requisitos, beneficios y actividades",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    id: "review",
    title: "Revisión Final",
    description: "Confirma los datos antes de guardar",
    icon: <CheckCircle className="w-5 h-5" />,
  },
];

// ============================================================================
// InternshipsWizardForm Component
// ============================================================================

export function InternshipsWizardForm({ isOpen, onClose, onCreated, theme }: InternshipsWizardFormProps) {
  const [data, setData] = useState<InternshipsWizardData>({
    title: "",
    area: "",
    description: "",
    modalidad: "",
    duracion: "",
    horario: "",
    ubicacion: "",
    requisitos: "",
    beneficios: "",
    fechaCierre: new Date().toISOString().split("T")[0],
    hacer: "",
    aprender: "",
    buscar: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [currentStepId, setCurrentStepId] = useState("basic");

  const today = new Date().toISOString().split("T")[0];

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const updateData = (updates: Partial<InternshipsWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
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
        if (!data.area.trim()) {
          return { valid: false, error: "El área es requerida" };
        }
        if (!data.description.trim()) {
          return { valid: false, error: "La descripción es requerida" };
        }
        if (data.description.length < 100) {
          return { valid: false, error: "La descripción debe tener al menos 100 caracteres" };
        }
        return { valid: true };
      
      case "details":
        if (!data.modalidad.trim()) {
          return { valid: false, error: "La modalidad es requerida" };
        }
        if (!data.duracion.trim()) {
          return { valid: false, error: "La duración es requerida" };
        }
        if (!data.horario.trim()) {
          return { valid: false, error: "El horario es requerido" };
        }
        if (!data.ubicacion.trim()) {
          return { valid: false, error: "La ubicación es requerida" };
        }
        if (!data.requisitos.trim()) {
          return { valid: false, error: "Los requisitos son requeridos" };
        }
        return { valid: true };
      
      case "content":
        if (!data.beneficios.trim()) {
          return { valid: false, error: "Los beneficios son requeridos" };
        }
        if (!data.fechaCierre) {
          return { valid: false, error: "La fecha de cierre es requerida" };
        }
        if (!data.hacer.trim()) {
          return { valid: false, error: "Las actividades son requeridas" };
        }
        if (!data.aprender.trim()) {
          return { valid: false, error: "Lo que aprenderá es requerido" };
        }
        if (!data.buscar.trim()) {
          return { valid: false, error: "El perfil buscado es requerido" };
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
    
    const form = new FormData();
    form.append("title", data.title);
    form.append("area", data.area);
    form.append("description", data.description);
    form.append("modalidad", data.modalidad);
    form.append("duracion", data.duracion);
    form.append("horario", data.horario);
    form.append("ubicacion", data.ubicacion);
    form.append("requisitos", data.requisitos);
    form.append("beneficios", data.beneficios);
    form.append("startDate", today);
    form.append("endDate", data.fechaCierre);
    form.append("whatYouWillDo", data.hacer);
    form.append("whatYouWillLearn", data.aprender);
    form.append("whatWeAreLookingFor", data.buscar);
    form.append("isActive", String(data.isActive));

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
      const res = await fetch(`/web/api/backend/admin/internships`, {
        method: "POST",
        body: form,
        headers: { ...baseHeaders, ...bypassHeaders },
        credentials: 'include',
      });

      const body = await res.json();

      if (res.ok) {
        showMessage('success', 'Programa de becarios creado exitosamente');
        onCreated(body);
        onClose();
      } else {
        const errorMsg = body.error || body.message || 'Error desconocido';
        showMessage('error', `Error al crear programa: ${errorMsg}`);
      }
    } catch {
      showMessage('error', 'Error al crear el programa');
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
              label="Título del Programa"
              value={data.title}
              onChange={(v) => updateData({ title: v })}
              placeholder="Ej: Becario en Desarrollo Frontend"
              required
              maxLength={MAX_TITLE_LENGTH}
              theme={theme}
            />
            
            <StepInput
              label="Área / Departamento"
              value={data.area}
              onChange={(v) => updateData({ area: v })}
              placeholder="Escribe o selecciona un área"
              required
              theme={theme}
              helper={`${data.area.length}/50 caracteres`}
              list="areas-list"
            />
            <datalist id="areas-list">
              {AREAS.map(area => (
                <option key={area} value={area} />
              ))}
            </datalist>
            
            <StepTextarea
              label="Descripción del Programa"
              value={data.description}
              onChange={(v) => updateData({ description: v })}
              placeholder="Describe el propósito y objetivos del programa..."
              required
              maxLength={MAX_DESCRIPTION_LENGTH}
              rows={4}
              theme={theme}
              helper={`${data.description.length}/${MAX_DESCRIPTION_LENGTH} caracteres (mínimo 100)`}
            />
          </div>
        );
      
      case "details":
        return (
          <div className="space-y-4">
            <StepGrid columns={2} theme={theme}>
              <StepSelect
                label="Modalidad"
                value={data.modalidad}
                options={MODALIDADES}
                onChange={(v) => updateData({ modalidad: v })}
                required
                theme={theme}
              />
              <StepInput
                label="Duración"
                value={data.duracion}
                onChange={(v) => updateData({ duracion: v })}
                placeholder="Ej: 6 meses, 1 año"
                required
                theme={theme}
              />
            </StepGrid>
            
            <StepGrid columns={2} theme={theme}>
              <StepInput
                label="Horario"
                value={data.horario}
                onChange={(v) => updateData({ horario: v })}
                placeholder="Ej: Lunes a Viernes, 9:00 - 18:00"
                required
                theme={theme}
              />
              <StepInput
                label="Ubicación"
                value={data.ubicacion}
                onChange={(v) => updateData({ ubicacion: v })}
                placeholder="Ciudad o dirección"
                required
                theme={theme}
              />
            </StepGrid>
            
            <StepTextarea
              label="Requisitos"
              value={data.requisitos}
              onChange={(v) => updateData({ requisitos: v })}
              placeholder="Lista los requisitos para los candidatos..."
              required
              maxLength={MAX_REQUISITOS_LENGTH}
              rows={4}
              theme={theme}
              helper={`${data.requisitos.length}/${MAX_REQUISITOS_LENGTH} caracteres`}
            />
          </div>
        );
      
      case "content":
        return (
          <div className="space-y-4">
            <StepTextarea
              label="Beneficios"
              value={data.beneficios}
              onChange={(v) => updateData({ beneficios: v })}
              placeholder="Describe los beneficios que ofrece el programa..."
              required
              maxLength={MAX_BENEFICIOS_LENGTH}
              rows={3}
              theme={theme}
              helper={`${data.beneficios.length}/${MAX_BENEFICIOS_LENGTH} caracteres`}
            />
            
            <StepInput
              label="Fecha de Cierre"
              type="date"
              value={data.fechaCierre}
              onChange={(v) => updateData({ fechaCierre: v })}
              min={today}
              required
              theme={theme}
            />
            
            <StepTextarea
              label="¿Qué hará el becario?"
              value={data.hacer}
              onChange={(v) => updateData({ hacer: v })}
              placeholder="Describe las responsabilidades y actividades..."
              required
              maxLength={MAX_HACER_LENGTH}
              rows={3}
              theme={theme}
              helper={`${data.hacer.length}/${MAX_HACER_LENGTH} caracteres`}
            />
            
            <StepTextarea
              label="¿Qué aprenderá?"
              value={data.aprender}
              onChange={(v) => updateData({ aprender: v })}
              placeholder="Habilidades y conocimientos que adquirirá..."
              required
              maxLength={MAX_APRENDER_LENGTH}
              rows={3}
              theme={theme}
              helper={`${data.aprender.length}/${MAX_APRENDER_LENGTH} caracteres`}
            />
            
            <StepTextarea
              label="¿Qué buscamos?"
              value={data.buscar}
              onChange={(v) => updateData({ buscar: v })}
              placeholder="Perfil ideal del candidato..."
              required
              maxLength={MAX_BUSCAR_LENGTH}
              rows={3}
              theme={theme}
              helper={`${data.buscar.length}/${MAX_BUSCAR_LENGTH} caracteres`}
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
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Área</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.area || "—"}
                  </dd>
                </div>
              </dl>
            </StepSection>
            
            <StepSection title="Detalles del Programa" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Modalidad</dt>
                  <dd className={`text-sm font-medium capitalize ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.modalidad || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Duración</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.duracion || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Horario</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.horario || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Ubicación</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.ubicacion || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Fecha de Cierre</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.fechaCierre ? new Date(data.fechaCierre).toLocaleDateString() : "—"}
                  </dd>
                </div>
              </dl>
            </StepSection>
            
            <StepSection title="Contenido y Beneficios" theme={theme}>
              <div className="space-y-3">
                <div>
                  <p className={`text-xs mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>Beneficios</p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    {data.beneficios || "—"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>Actividades</p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    {data.hacer || "—"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>Lo que aprenderá</p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    {data.aprender || "—"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>Perfil buscado</p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    {data.buscar || "—"}
                  </p>
                </div>
              </div>
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
        title="Crear Programa de Becarios"
        subtitle="Completa los pasos para crear el programa"
        steps={INTERNSHIPS_WIZARD_STEPS}
        onSubmit={handleSubmit}
        renderStep={renderStep}
        loading={loading}
        submitLabel="Crear Programa"
        size="lg"
        draftKey="internships_wizard"
        theme={theme}
      />
    </>
  );
}

export default InternshipsWizardForm;

