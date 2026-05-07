"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { 
  Calendar, 
  MapPin, 
  FileText, 
  Image as ImageIcon, 
  Clock,
  CheckCircle,
  AlertCircle,
  CheckCircle as CheckCircleIcon,
  Tag
} from "lucide-react";
import { FormWizardModal } from "@/components/modals/FormWizardModal";
import { 
  StepInput, 
  StepTextarea, 
  StepSelect, 
  StepGrid,
  StepSection,
  StepToggle
} from "@/components/modals/WizardStep";
import type { WizardStep } from "@/components/modals/FormWizardModal";

// ============================================================================
// Types
// ============================================================================

export interface EventoWizardData {
  titulo: string;
  descripcion: string;
  fecha_hora: string;
  ubicacion: string;
  categoria: string;
  estado: boolean;
  imagen: File | null;
  preview: string | null;
  capacidad: string;
  precio: string;
  organizador: string;
}

interface EventosWizardFormProps {
  /** Whether the form is open */
  isOpen: boolean;
  /** Callback to close the form */
  onClose: () => void;
  /** Callback when event is created/updated successfully */
  onSaved: (evento: Record<string, unknown>) => void;
  /** Initial data for editing */
  initialData?: {
    id?: string;
    titulo?: string;
    descripcion?: string;
    fecha_hora?: string;
    ubicacion?: string;
    categoria?: string;
    estado?: boolean;
    imagen?: string;
    capacidad?: string;
    precio?: string;
    organizador?: string;
  };
  /** Current theme */
  theme: "light" | "dark";
}

// ============================================================================
// Constants
// ============================================================================

const CATEGORIAS = [
  { value: "conferencia", label: "Conferencia" },
  { value: "taller", label: "Taller" },
  { value: "seminario", label: "Seminario" },
  { value: "webinar", label: "Webinar" },
  { value: "networking", label: "Networking" },
  { value: "otro", label: "Otro" },
];

const MAX_TITULO_LENGTH = 100;
const MAX_DESCRIPCION_LENGTH = 500;
const MAX_IMAGEN_SIZE = 2 * 1024 * 1024; // 2MB

// ============================================================================
// Wizard Steps Definition
// ============================================================================

const EVENTOS_WIZARD_STEPS: WizardStep[] = [
  {
    id: "basic",
    title: "Información Básica",
    description: "Datos generales del evento",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: "details",
    title: "Detalles",
    description: "Descripción y contenido",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "media",
    title: "Medios",
    description: "Imagen del evento",
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    id: "schedule",
    title: "Programación",
    description: "Fecha, hora y ubicación",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "review",
    title: "Revisión Final",
    description: "Confirma los datos antes de guardar",
    icon: <CheckCircle className="w-5 h-5" />,
  },
];

// ============================================================================
// EventosWizardForm Component
// ============================================================================

export function EventosWizardForm({ isOpen, onClose, onSaved, initialData, theme }: EventosWizardFormProps) {
  const [data, setData] = useState<EventoWizardData>({
    titulo: initialData?.titulo || "",
    descripcion: initialData?.descripcion || "",
    fecha_hora: initialData?.fecha_hora || "",
    ubicacion: initialData?.ubicacion || "",
    categoria: initialData?.categoria || CATEGORIAS[0].value,
    estado: initialData?.estado !== false,
    imagen: null,
    preview: initialData?.imagen || null,
    capacidad: initialData?.capacidad || "",
    precio: initialData?.precio || "",
    organizador: initialData?.organizador || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const isEditing = !!initialData?.id;

  useEffect(() => {
    if (!isOpen) return;

    setData({
      titulo: initialData?.titulo || "",
      descripcion: initialData?.descripcion || "",
      fecha_hora: initialData?.fecha_hora || "",
      ubicacion: initialData?.ubicacion || "",
      categoria: initialData?.categoria || CATEGORIAS[0].value,
      estado: initialData?.estado !== false,
      imagen: null,
      preview: initialData?.imagen || null,
      capacidad: initialData?.capacidad || "",
      precio: initialData?.precio || "",
      organizador: initialData?.organizador || "",
    });
  }, [isOpen, initialData]);

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const updateData = (updates: Partial<EventoWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  // Image handling
  const handleImageChange = (file: File | null) => {
    if (!file) {
      updateData({ imagen: null, preview: null });
      return;
    }

    if (file.size > MAX_IMAGEN_SIZE) {
      showMessage('error', `Imagen muy grande. Máximo ${MAX_IMAGEN_SIZE / 1024 / 1024}MB`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      showMessage('error', 'El archivo debe ser una imagen');
      return;
    }

    updateData({ imagen: file });
    const reader = new FileReader();
    reader.onload = (e) => updateData({ preview: e.target?.result as string });
    reader.readAsDataURL(file);
  };

  const validateStepById = useCallback(async (stepId: string) => {
    switch (stepId) {
      case "basic":
        if (!data.titulo.trim()) {
          return { valid: false, error: "El título es requerido" };
        }
        if (data.titulo.length > MAX_TITULO_LENGTH) {
          return { valid: false, error: `El título no puede exceder ${MAX_TITULO_LENGTH} caracteres` };
        }
        return { valid: true };
      
      case "details":
        if (data.descripcion.length > MAX_DESCRIPCION_LENGTH) {
          return { valid: false, error: `La descripción no puede exceder ${MAX_DESCRIPCION_LENGTH} caracteres` };
        }
        return { valid: true };
      
      case "media":
        return { valid: true };
      
      case "schedule":
        if (!data.fecha_hora) {
          return { valid: false, error: "La fecha y hora son requeridas" };
        }
        if (!data.ubicacion.trim()) {
          return { valid: false, error: "La ubicación es requerida" };
        }
        return { valid: true };
      
      case "review":
        return { valid: true };
      
      default:
        return { valid: true };
    }
  }, [data]);

  const wizardSteps = useMemo(
    () => EVENTOS_WIZARD_STEPS.map((step) => ({
      ...step,
      validation: () => validateStepById(step.id),
    })),
    [validateStepById]
  );

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    
    const form = new FormData();
    form.append("titulo", data.titulo);
    form.append("descripcion", data.descripcion);
    form.append("fecha_hora", data.fecha_hora);
    form.append("ubicacion", data.ubicacion);
    form.append("categoria", data.categoria);
    form.append("estado", String(data.estado));
    if (data.capacidad) form.append("capacidad", data.capacidad);
    if (data.precio) form.append("precio", data.precio);
    if (data.organizador) form.append("organizador", data.organizador);
    if (data.imagen) form.append("imagen", data.imagen);

    try {
      const { adminApi } = await import('../utils/admin-api');

      if (isEditing) {
        if (!initialData?.id) {
          throw new Error('Falta el identificador del evento.');
        }

        await adminApi.updateEvento(initialData.id, form);
        showMessage('success', isEditing ? 'Evento actualizado exitosamente' : 'Evento creado exitosamente');
        onSaved({ id: initialData.id });
        onClose();
      } else {
        const created = await adminApi.createEvento(form);
        showMessage('success', 'Evento creado exitosamente');
        onSaved((created as Record<string, unknown>) || {});
        onClose();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.message
          ? error.message
          : 'Error al guardar el evento';
      showMessage('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Render step content
  const renderStep = useCallback((step: WizardStep, _currentStep: number) => {
    switch (step.id) {
      case "basic":
        return (
          <div className="space-y-4">
            <StepInput
              label="Título del Evento"
              value={data.titulo}
              onChange={(v) => updateData({ titulo: v })}
              placeholder="Título del evento..."
              required
              maxLength={MAX_TITULO_LENGTH}
              theme={theme}
            />
            
            <StepSelect
              label="Categoría"
              value={data.categoria}
              options={CATEGORIAS}
              onChange={(v) => updateData({ categoria: v })}
              theme={theme}
            />
            
            <StepGrid columns={2} theme={theme}>
              <StepInput
                label="Organizador"
                value={data.organizador}
                onChange={(v) => updateData({ organizador: v })}
                placeholder="Nombre del organizador..."
                theme={theme}
              />
              <StepInput
                label="Capacidad"
                type="text"
                value={data.capacidad}
                onChange={(v) => updateData({ capacidad: v })}
                placeholder="Ej: 100 personas"
                theme={theme}
              />
            </StepGrid>
          </div>
        );
      
      case "details":
        return (
          <div className="space-y-4">
            <StepTextarea
              label="Descripción"
              value={data.descripcion}
              onChange={(v) => updateData({ descripcion: v })}
              placeholder="Describe el evento..."
              maxLength={MAX_DESCRIPCION_LENGTH}
              rows={4}
              theme={theme}
            />
            
            <StepInput
              label="Precio"
              value={data.precio}
              onChange={(v) => updateData({ precio: v })}
              placeholder="Ej: Gratis, $50, etc."
              theme={theme}
              helper="Dejar vacío si es gratuito"
            />
          </div>
        );
      
      case "media":
        return (
          <div className="space-y-4">
            <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
              Imagen del Evento
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
                  <ImageIcon className="w-4 h-4" />
                </button>
                {data.imagen && (
                  <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs ${
                    theme === "dark" ? "bg-slate-900/80 text-white" : "bg-white/80 text-slate-700"
                  }`}>
                    {data.imagen.name} • {(data.imagen.size / 1024).toFixed(2)} KB
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
                <ImageIcon className={`w-10 h-10 mx-auto mb-3 ${
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
        );
      
      case "schedule":
        return (
          <div className="space-y-4">
            <StepGrid columns={2} theme={theme}>
              <StepInput
                label="Fecha y Hora"
                type="datetime-local"
                value={data.fecha_hora}
                onChange={(v) => updateData({ fecha_hora: v })}
                required
                theme={theme}
              />
              <StepToggle
                label="Estado"
                checked={data.estado}
                onChange={(v) => updateData({ estado: v })}
                theme={theme}
              />
            </StepGrid>
            
            <StepInput
              label="Ubicación"
              value={data.ubicacion}
              onChange={(v) => updateData({ ubicacion: v })}
              placeholder="Dirección o enlace virtual..."
              required
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
                    {data.titulo || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Categoría</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {CATEGORIAS.find(c => c.value === data.categoria)?.label || data.categoria}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Organizador</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.organizador || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Capacidad</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.capacidad || "—"}
                  </dd>
                </div>
              </dl>
            </StepSection>
            
            <StepSection title="Programación" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Fecha y Hora</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.fecha_hora ? new Date(data.fecha_hora).toLocaleString() : "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Ubicación</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.ubicacion || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Estado</dt>
                  <dd className={`text-sm font-medium ${data.estado ? "text-emerald-500" : theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.estado ? "Publicado" : "No publicado"}
                  </dd>
                </div>
              </dl>
            </StepSection>
            
            <StepSection title="Detalles" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Precio</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.precio || "Gratuito"}
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
        title={isEditing ? "Editar Evento" : "Crear Nuevo Evento"}
        subtitle="Completa los pasos para guardar el evento"
        steps={wizardSteps}
        onSubmit={handleSubmit}
        renderStep={renderStep}
        loading={loading}
        submitLabel={isEditing ? "Guardar Cambios" : "Crear Evento"}
        size="lg"
        draftKey={`eventos_wizard_${isEditing ? initialData?.id : 'new'}`}
        theme={theme}
      />
    </>
  );
}

export default EventosWizardForm;

