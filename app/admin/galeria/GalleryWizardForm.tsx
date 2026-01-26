"use client";

import React, { useState, useCallback, useMemo } from "react";
import { 
  Image as ImageIcon, 
  Upload, 
  Tag, 
  Settings,
  CheckCircle,
  AlertCircle,
  CheckCircle as CheckCircleIcon,
  Layers
} from "lucide-react";
import { FormWizardModal } from "@/components/modals/FormWizardModal";
import { 
  StepInput, 
  StepTextarea, 
  StepSelect, 
  StepSection,
  StepToggle
} from "@/components/modals/WizardStep";
import type { WizardStep } from "@/components/modals/FormWizardModal";

// ============================================================================
// Types
// ============================================================================

export interface GalleryWizardData {
  compression: 'low' | 'medium' | 'high';
  maxDimension: number;
  autoResize: boolean;
  batchTags: string[];
  description: string;
}

interface GalleryWizardFormProps {
  /** Whether the form is open */
  isOpen: boolean;
  /** Callback to close the form */
  onClose: () => void;
  /** Callback when configuration is ready */
  onStartUpload: (config: GalleryWizardData) => void;
  /** Current theme */
  theme: "light" | "dark";
  /** Existing tags for suggestions */
  existingTags?: string[];
}

// ============================================================================
// Constants
// ============================================================================

const DIMENSION_OPTIONS = [
  { value: "800", label: "800px (Móvil)" },
  { value: "1024", label: "1024px (Tablet)" },
  { value: "1920", label: "1920px (HD)" },
  { value: "2560", label: "2560px (2K)" },
  { value: "0", label: "Mantener original" },
];

const MAX_TAG_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_TAGS_COUNT = 10;

// ============================================================================
// Toast Message Component (defined outside to avoid render issues)
// ============================================================================

function ToastMessage({ message, theme }: { message: { type: 'success' | 'error'; text: string } | null; theme: "light" | "dark" }) {
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
}

// ============================================================================
// Wizard Steps Definition
// ============================================================================

const GALLERY_WIZARD_STEPS: WizardStep[] = [
  {
    id: "settings",
    title: "Configuración",
    description: "Opciones de compresión y redimensionamiento",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: "tags",
    title: "Etiquetas",
    description: "Agrega etiquetas para organizar",
    icon: <Tag className="w-5 h-5" />,
  },
  {
    id: "upload",
    title: "Subir Imágenes",
    description: "Arrastra y suelta tus imágenes",
    icon: <Upload className="w-5 h-5" />,
  },
];

// ============================================================================
// GalleryWizardForm Component
// ============================================================================

export function GalleryWizardForm({ isOpen, onClose, onStartUpload, theme, existingTags = [] }: GalleryWizardFormProps) {
  const [data, setData] = useState<GalleryWizardData>({
    compression: 'medium',
    maxDimension: 1920,
    autoResize: true,
    batchTags: [],
    description: "",
  });

  const [newTag, setNewTag] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [currentStepId, setCurrentStepId] = useState("settings");

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const updateData = useCallback((updates: Partial<GalleryWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  // Tag management
  const addTag = useCallback((tag: string) => {
    const normalizedTag = tag.trim().toLowerCase();
    if (!normalizedTag) return;
    if (data.batchTags.includes(normalizedTag)) {
      showMessage('error', 'Esta etiqueta ya existe');
      return;
    }
    if (data.batchTags.length >= MAX_TAGS_COUNT) {
      showMessage('error', `Máximo ${MAX_TAGS_COUNT} etiquetas`);
      return;
    }
    if (normalizedTag.length > MAX_TAG_LENGTH) {
      showMessage('error', `La etiqueta no puede exceder ${MAX_TAG_LENGTH} caracteres`);
      return;
    }
    updateData({ batchTags: [...data.batchTags, normalizedTag] });
    setNewTag('');
  }, [data.batchTags, updateData, showMessage]);

  const removeTag = useCallback((tag: string) => {
    updateData({ batchTags: data.batchTags.filter(t => t !== tag) });
  }, [data.batchTags, updateData]);

  // Validation by step
  const validateStep = useCallback(async () => {
    switch (currentStepId) {
      case "settings":
        return { valid: true };
      
      case "tags":
        return { valid: true };
      
      case "upload":
        return { valid: true };
      
      default:
        return { valid: true };
    }
  }, [currentStepId]);

  // Handle form submission - actually starts the upload
  const handleSubmit = useCallback(async () => {
    onStartUpload(data);
    onClose();
  }, [data, onStartUpload, onClose]);

  // Render step content
  const renderStep = useCallback((step: WizardStep, _currentStep: number) => {
    setCurrentStepId(step.id);
    
    switch (step.id) {
      case "settings":
        return (
          <div className="space-y-4">
            <StepSelect
              label="Nivel de Compresión"
              value={data.compression}
              options={[
                { value: 'low', label: 'Baja - Mayor calidad' },
                { value: 'medium', label: 'Media - Balance' },
                { value: 'high', label: 'Alta - Menor tamaño' },
              ]}
              onChange={(v) => updateData({ compression: v as 'low' | 'medium' | 'high' })}
              theme={theme}
              helper={data.compression === 'low' ? 'Calidad máxima, archivo más grande' : data.compression === 'high' ? 'Mayor compresión, menor calidad' : 'Balance entre calidad y tamaño'}
            />
            
            <StepToggle
              label="Redimensionar automáticamente"
              checked={data.autoResize}
              onChange={(v) => updateData({ autoResize: v })}
              theme={theme}
            />
            
            {data.autoResize && (
              <StepSelect
                label="Dimensión máxima"
                value={String(data.maxDimension)}
                options={DIMENSION_OPTIONS}
                onChange={(v) => updateData({ maxDimension: Number(v) })}
                theme={theme}
                helper="Las imágenes más grandes serán redimensionadas"
              />
            )}
            
            <StepTextarea
              label="Descripción del lote (opcional)"
              value={data.description}
              onChange={(v) => updateData({ description: v })}
              placeholder="Describe brevemente este grupo de imágenes..."
              maxLength={MAX_DESCRIPTION_LENGTH}
              rows={3}
              theme={theme}
              helper={`${data.description.length}/${MAX_DESCRIPTION_LENGTH} caracteres`}
            />
          </div>
        );
      
      case "tags":
        return (
          <div className="space-y-4">
            <StepInput
              label="Nueva Etiqueta"
              value={newTag}
              onChange={(v) => setNewTag(v)}
              placeholder="Escribe una etiqueta..."
              maxLength={MAX_TAG_LENGTH}
              theme={theme}
              helper={`${data.batchTags.length}/${MAX_TAGS_COUNT} etiquetas agregadas`}
            />
            
            <div className="flex gap-2">
              <button
                onClick={() => addTag(newTag)}
                disabled={!newTag.trim()}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  newTag.trim()
                    ? theme === "dark"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                    : theme === "dark"
                      ? "bg-gray-800 text-gray-500"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                Agregar
              </button>
            </div>
            
            {/* Suggested tags */}
            {existingTags.length > 0 && (
              <div className="mt-4">
                <p className={`text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  Etiquetas existentes:
                </p>
                <div className="flex flex-wrap gap-2">
                  {existingTags.slice(0, 15).map(tag => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      disabled={data.batchTags.includes(tag)}
                      className={`px-2 py-1 rounded-full text-xs transition-all ${
                        data.batchTags.includes(tag)
                          ? theme === "dark"
                            ? "bg-blue-900/30 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                          : theme === "dark"
                            ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                            : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Current tags */}
            {data.batchTags.length > 0 && (
              <div className="mt-4">
                <p className={`text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  Etiquetas agregadas:
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.batchTags.map(tag => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                        theme === "dark"
                          ? "bg-blue-900/30 text-blue-400"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-400 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <p className={`text-xs mt-4 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
              Las etiquetas se aplicarán a todas las imágenes del lote
            </p>
          </div>
        );
      
      case "upload":
        return (
          <div className="space-y-4">
            <StepSection title="Resumen de Configuración" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Compresión</dt>
                  <dd className={`text-sm font-medium capitalize ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.compression === 'low' ? 'Baja' : data.compression === 'high' ? 'Alta' : 'Media'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Redimensionar</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.autoResize ? `Sí (max ${data.maxDimension}px)` : 'No'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Etiquetas</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.batchTags.length > 0 ? `${data.batchTags.length} etiquetas` : 'Ninguna'}
                  </dd>
                </div>
              </dl>
            </StepSection>
            
            <div 
              className={`
                border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
                ${theme === "dark" 
                  ? "border-slate-700 hover:border-blue-500 hover:bg-slate-800/30" 
                  : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
                }
              `}
            >
              <Upload className={`w-12 h-12 mx-auto mb-3 ${
                theme === "dark" ? "text-slate-600" : "text-slate-400"
              }`} />
              <p className={`text-lg font-medium mb-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                Arrastra imágenes aquí o haz clic para seleccionar
              </p>
              <p className={`text-sm ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                Formatos: JPG, PNG, WebP, GIF • Máximo 20MB por imagen
              </p>
            </div>
            
            <p className={`text-xs text-center ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
              Al hacer clic en "Continuar" se abrirá el selector de archivos
            </p>
          </div>
        );
      
      default:
        return null;
    }
  }, [data, theme, newTag, existingTags, addTag, removeTag, updateData]);

  return (
    <>
      <ToastMessage message={message} theme={theme} />
      
      <FormWizardModal
        isOpen={isOpen}
        onClose={onClose}
        title="Subir Imágenes a Galería"
        subtitle="Configura las opciones y selecciona tus imágenes"
        steps={GALLERY_WIZARD_STEPS}
        onSubmit={handleSubmit}
        renderStep={renderStep}
        loading={false}
        submitLabel="Continuar al Selector"
        size="lg"
        draftKey="gallery_wizard"
        theme={theme}
      />
    </>
  );
}

export default GalleryWizardForm;

