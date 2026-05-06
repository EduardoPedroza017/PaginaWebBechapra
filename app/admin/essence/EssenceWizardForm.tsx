"use client";

import React, { useState, useCallback } from "react";
import { 
  Target, 
  Eye, 
  Heart, 
  CheckCircle,
  AlertCircle,
  CheckCircle as CheckCircleIcon,
  Edit3
} from "lucide-react";
import { FormWizardModal } from "@/components/modals/FormWizardModal";
import { 
  StepTextarea, 
  StepSection
} from "@/components/modals/WizardStep";
import type { WizardStep } from "@/components/modals/FormWizardModal";

// ============================================================================
// Types
// ============================================================================

export interface EssenceWizardData {
  mision: string;
  vision: string;
  valores: string;
}

interface EssenceWizardFormProps {
  /** Whether the form is open */
  isOpen: boolean;
  /** Callback to close the form */
  onClose: () => void;
  /** Callback when essence is saved successfully */
  onSaved: (essence: EssenceWizardData) => void;
  /** Current essence data */
  initialData: EssenceWizardData;
  /** Current theme */
  theme: "light" | "dark";
}

// ============================================================================
// Constants
// ============================================================================

const MAX_MISION_LENGTH = 500;
const MAX_VISION_LENGTH = 500;
const MAX_VALORES_LENGTH = 500;

// ============================================================================
// Wizard Steps Definition
// ============================================================================

const ESSENCE_WIZARD_STEPS: WizardStep[] = [
  {
    id: "mision",
    title: "Misión",
    description: "Define el propósito de la organización",
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: "vision",
    title: "Visión",
    description: "Define la aspiración futura",
    icon: <Eye className="w-5 h-5" />,
  },
  {
    id: "valores",
    title: "Valores",
    description: "Define los principios guía",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    id: "review",
    title: "Revisión Final",
    description: "Confirma los cambios antes de guardar",
    icon: <CheckCircle className="w-5 h-5" />,
  },
];

// ============================================================================
// EssenceWizardForm Component
// ============================================================================

export function EssenceWizardForm({ isOpen, onClose, onSaved, initialData, theme }: EssenceWizardFormProps) {
  const [data, setData] = useState<EssenceWizardData>({
    mision: initialData.mision || "",
    vision: initialData.vision || "",
    valores: initialData.valores || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [currentStepId, setCurrentStepId] = useState("mision");

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const updateData = (updates: Partial<EssenceWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  // Validation by step
  const validateStep = useCallback(async () => {
    switch (currentStepId) {
      case "mision":
        if (!data.mision.trim()) {
          return { valid: false, error: "La misión es requerida" };
        }
        if (data.mision.length > MAX_MISION_LENGTH) {
          return { valid: false, error: `La misión no puede exceder ${MAX_MISION_LENGTH} caracteres` };
        }
        return { valid: true };
      
      case "vision":
        if (!data.vision.trim()) {
          return { valid: false, error: "La visión es requerida" };
        }
        if (data.vision.length > MAX_VISION_LENGTH) {
          return { valid: false, error: `La visión no puede exceder ${MAX_VISION_LENGTH} caracteres` };
        }
        return { valid: true };
      
      case "valores":
        if (!data.valores.trim()) {
          return { valid: false, error: "Los valores son requeridos" };
        }
        if (data.valores.length > MAX_VALORES_LENGTH) {
          return { valid: false, error: `Los valores no pueden exceder ${MAX_VALORES_LENGTH} caracteres` };
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
    form.append("mision", data.mision);
    form.append("vision", data.vision);
    form.append("valores", data.valores);

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
      const res = await fetch('/web/api/backend/admin/essence', {
        method: "PUT",
        body: JSON.stringify({
          mision: data.mision,
          vision: data.vision,
          valores: data.valores,
        }),
        headers: {
          "Content-Type": "application/json",
          ...baseHeaders,
          ...bypassHeaders,
        },
        credentials: 'include',
      });

      const body = await res.json();

      if (res.ok) {
        showMessage('success', 'Esencia institucional actualizada exitosamente');
        onSaved(data);
        onClose();
      } else {
        const errorMsg = body.error || body.message || 'Error desconocido';
        showMessage('error', `Error al guardar: ${errorMsg}`);
      }
    } catch {
      showMessage('error', 'Error al guardar la esencia');
    } finally {
      setLoading(false);
    }
  };

  // Render step content
  const renderStep = useCallback((step: WizardStep, _currentStep: number) => {
    setCurrentStepId(step.id);
    
    switch (step.id) {
      case "mision":
        return (
          <div className="space-y-4">
            <StepTextarea
              label="Misión"
              value={data.mision}
              onChange={(v) => updateData({ mision: v })}
              placeholder="Describe el propósito fundamental de la organización..."
              required
              maxLength={MAX_MISION_LENGTH}
              rows={6}
              theme={theme}
              helper={`${data.mision.length}/${MAX_MISION_LENGTH} caracteres`}
            />
          </div>
        );
      
      case "vision":
        return (
          <div className="space-y-4">
            <StepTextarea
              label="Visión"
              value={data.vision}
              onChange={(v) => updateData({ vision: v })}
              placeholder="Describe la aspiración futura de la organización..."
              required
              maxLength={MAX_VISION_LENGTH}
              rows={6}
              theme={theme}
              helper={`${data.vision.length}/${MAX_VISION_LENGTH} caracteres`}
            />
          </div>
        );
      
      case "valores":
        return (
          <div className="space-y-4">
            <StepTextarea
              label="Valores"
              value={data.valores}
              onChange={(v) => updateData({ valores: v })}
              placeholder="Describe los principios y valores que guían a la organización..."
              required
              maxLength={MAX_VALORES_LENGTH}
              rows={6}
              theme={theme}
              helper={`${data.valores.length}/${MAX_VALORES_LENGTH} caracteres`}
            />
          </div>
        );
      
      case "review":
        return (
          <div className="space-y-6">
            <StepSection title="Misión" theme={theme}>
              <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                {data.mision || "—"}
              </p>
              <p className={`text-xs mt-2 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                {data.mision.split(' ').filter(w => w).length} palabras
              </p>
            </StepSection>
            
            <StepSection title="Visión" theme={theme}>
              <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                {data.vision || "—"}
              </p>
              <p className={`text-xs mt-2 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                {data.vision.split(' ').filter(w => w).length} palabras
              </p>
            </StepSection>
            
            <StepSection title="Valores" theme={theme}>
              <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                {data.valores || "—"}
              </p>
              <p className={`text-xs mt-2 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                {data.valores.split(' ').filter(w => w).length} palabras
              </p>
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
        title="Editar Esencia Institucional"
        subtitle="Define la misión, visión y valores de la organización"
        steps={ESSENCE_WIZARD_STEPS}
        onSubmit={handleSubmit}
        renderStep={renderStep}
        loading={loading}
        submitLabel="Guardar Cambios"
        size="lg"
        draftKey="essence_wizard"
        theme={theme}
      />
    </>
  );
}

export default EssenceWizardForm;

