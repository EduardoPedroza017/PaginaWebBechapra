"use client";

import React, { useState, useCallback, useRef } from "react";
import { 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  FileText, 
  GraduationCap,
  Camera,
  CheckCircle,
  AlertCircle,
  CheckCircle as CheckCircleIcon,
  Calendar
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

export interface EjecutivoWizardData {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  puesto: string;
  carrera_estudiada: string;
  email: string;
  telefono: string;
  biografia: string;
  activo: boolean;
  photo: File | null;
  photoPreview: string | null;
}

interface EjecutivosWizardFormProps {
  /** Whether the form is open */
  isOpen: boolean;
  /** Callback to close the form */
  onClose: () => void;
  /** Callback when ejecutivo is created/updated successfully */
  onSaved: (ejecutivo: Record<string, unknown>) => void;
  /** Initial data for editing */
  initialData?: {
    id?: string;
    nombre?: string;
    apellido_paterno?: string;
    apellido_materno?: string;
    fecha_nacimiento?: string;
    puesto?: string;
    carrera_estudiada?: string;
    email?: string;
    telefono?: string;
    biografia?: string;
    activo?: boolean;
    descripcion?: string;
    foto?: string;
  };
  /** Current theme */
  theme: "light" | "dark";
}

// ============================================================================
// Constants
// ============================================================================

const PUESTOS = [
  { value: "", label: "Seleccionar puesto" },
  { value: "Director General", label: "Director General" },
  { value: "Director", label: "Director" },
  { value: "Gerente", label: "Gerente" },
  { value: "Supervisor", label: "Supervisor" },
  { value: "Coordinador", label: "Coordinador" },
  { value: "Analista", label: "Analista" },
  { value: "Asistente", label: "Asistente" },
  { value: "Consultor", label: "Consultor" },
  { value: "Especialista", label: "Especialista" },
];

const MAX_NOMBRE_LENGTH = 50;
const MAX_APELLIDO_LENGTH = 50;
const MAX_BIOGRAFIA_LENGTH = 2000;
const MAX_FOTO_SIZE = 2 * 1024 * 1024; // 2MB

// ============================================================================
// Wizard Steps Definition
// ============================================================================

const EJECUTIVOS_WIZARD_STEPS: WizardStep[] = [
  {
    id: "personal",
    title: "Información Personal",
    description: "Datos personales del ejecutivo",
    icon: <User className="w-5 h-5" />,
  },
  {
    id: "professional",
    title: "Información Profesional",
    description: "Cargo y formación",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "contact",
    title: "Información de Contacto",
    description: "Email y teléfono",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    id: "bio",
    title: "Biografía",
    description: "Trayectoria profesional",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "review",
    title: "Revisión Final",
    description: "Confirma los datos antes de guardar",
    icon: <CheckCircle className="w-5 h-5" />,
  },
];

// ============================================================================
// EjecutivosWizardForm Component
// ============================================================================

export function EjecutivosWizardForm({ isOpen, onClose, onSaved, initialData, theme }: EjecutivosWizardFormProps) {
  const [data, setData] = useState<EjecutivoWizardData>({
    nombre: initialData?.nombre || "",
    apellido_paterno: initialData?.apellido_paterno || "",
    apellido_materno: initialData?.apellido_materno || "",
    fecha_nacimiento: initialData?.fecha_nacimiento || "",
    puesto: initialData?.puesto || "",
    carrera_estudiada: initialData?.carrera_estudiada || "",
    email: initialData?.email || "",
    telefono: initialData?.telefono || "",
    biografia: initialData?.biografia || "",
    activo: initialData?.activo !== false,
    photo: null,
    photoPreview: initialData?.foto || null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [currentStepId, setCurrentStepId] = useState("personal");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!initialData?.id;

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const updateData = (updates: Partial<EjecutivoWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  // Photo handling
  const handlePhotoChange = (file: File | null) => {
    if (!file) {
      updateData({ photo: null, photoPreview: null });
      return;
    }

    if (file.size > MAX_FOTO_SIZE) {
      showMessage('error', `Foto muy grande. Máximo ${MAX_FOTO_SIZE / 1024 / 1024}MB`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      showMessage('error', 'El archivo debe ser una imagen');
      return;
    }

    updateData({ photo: file });
    const reader = new FileReader();
    reader.onload = (e) => updateData({ photoPreview: e.target?.result as string });
    reader.readAsDataURL(file);
  };

  // Validation by step
  const validateStep = useCallback(async () => {
    switch (currentStepId) {
      case "personal":
        if (!data.nombre.trim()) {
          return { valid: false, error: "El nombre es requerido" };
        }
        if (data.nombre.length > MAX_NOMBRE_LENGTH) {
          return { valid: false, error: `El nombre no puede exceder ${MAX_NOMBRE_LENGTH} caracteres` };
        }
        if (!data.apellido_paterno.trim()) {
          return { valid: false, error: "El apellido paterno es requerido" };
        }
        if (data.apellido_paterno.length > MAX_APELLIDO_LENGTH) {
          return { valid: false, error: `El apellido no puede exceder ${MAX_APELLIDO_LENGTH} caracteres` };
        }
        return { valid: true };
      
      case "professional":
        return { valid: true };
      
      case "contact":
        if (!data.email.trim()) {
          return { valid: false, error: "El email es requerido" };
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          return { valid: false, error: "El email no es válido" };
        }
        return { valid: true };
      
      case "bio":
        if (data.biografia.length > MAX_BIOGRAFIA_LENGTH) {
          return { valid: false, error: `La biografía no puede exceder ${MAX_BIOGRAFIA_LENGTH} caracteres` };
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
    const API = '/web/api/backend';
    const payload = {
      nombre: data.nombre,
      apellido_paterno: data.apellido_paterno,
      apellido_materno: data.apellido_materno,
      fecha_nacimiento: data.fecha_nacimiento,
      puesto: data.puesto,
      carrera_estudiada: data.carrera_estudiada,
      email: data.email,
      telefono: data.telefono,
      biografia: data.biografia,
      activo: data.activo,
      descripcion: initialData?.descripcion || '',
    };
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
    const uploadHeaders = { ...baseHeaders, ...bypassHeaders };

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `${API}/admin/team/${initialData?.id}`
        : `${API}/admin/team`;

      const res = await fetch(url, {
        method,
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json", ...baseHeaders, ...bypassHeaders },
        credentials: 'include',
      });

      const body = await res.json();

      if (res.ok) {
        let savedBody = body;
        if (data.photo) {
          const photoForm = new FormData();
          photoForm.append('file', data.photo);
          const uploadRes = await fetch(`${API}/admin/team/${body.id || body._id}/upload-foto`, {
            method: 'POST',
            body: photoForm,
            headers: uploadHeaders,
            credentials: 'include',
          });
          if (!uploadRes.ok) {
            const uploadError = await uploadRes.json().catch(() => ({}));
            const uploadErrorMsg = uploadError.error || uploadError.message || 'Error al subir foto';
            showMessage('error', uploadErrorMsg);
            return;
          }
          const uploadBody = await uploadRes.json();
          savedBody = { ...body, ...uploadBody };
        }
        showMessage('success', isEditing ? 'Ejecutivo actualizado exitosamente' : 'Ejecutivo creado exitosamente');
        onSaved(savedBody);
        onClose();
      } else {
        const errorMsg = body.error || body.message || 'Error desconocido';
        showMessage('error', `Error al guardar ejecutivo: ${errorMsg}`);
      }
    } catch {
      showMessage('error', 'Error al guardar el ejecutivo');
    } finally {
      setLoading(false);
    }
  };

  // Render step content
  const renderStep = useCallback((step: WizardStep, _currentStep: number) => {
    setCurrentStepId(step.id);
    
    switch (step.id) {
      case "personal":
        return (
          <div className="space-y-4">
            {/* Photo Upload */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                Foto del Ejecutivo
              </label>
              
              <div className="flex items-center gap-4">
                {data.photoPreview ? (
                  <div className="relative">
                    <img 
                      src={data.photoPreview} 
                      alt="Foto" 
                      className="w-24 h-24 rounded-full object-cover border-2 border-slate-300 dark:border-slate-600"
                    />
                    <button
                      type="button"
                      onClick={() => handlePhotoChange(null)}
                      className={`absolute -top-2 -right-2 p-1 rounded-full ${
                        theme === "dark" ? "bg-red-900/80 text-white hover:bg-red-900" : "bg-red-500 text-white hover:bg-red-600"
                      } transition-colors`}
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      theme === "dark" 
                        ? "bg-slate-800 border-2 border-slate-700 hover:border-blue-500" 
                        : "bg-slate-100 border-2 border-slate-300 hover:border-blue-400"
                    }`}
                  >
                    <Camera className={`w-8 h-8 ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`} />
                  </div>
                )}
                
                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      theme === "dark"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {data.photoPreview ? "Cambiar foto" : "Subir foto"}
                  </button>
                  <p className={`text-xs mt-1 ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                    JPG, PNG hasta 2MB
                  </p>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhotoChange(e.target.files?.[0] || null)}
              />
            </div>
            
            <StepGrid columns={2} theme={theme}>
              <StepInput
                label="Nombre"
                value={data.nombre}
                onChange={(v) => updateData({ nombre: v })}
                placeholder="Ej: Juan"
                required
                maxLength={MAX_NOMBRE_LENGTH}
                theme={theme}
              />
              <StepInput
                label="Apellido Paterno"
                value={data.apellido_paterno}
                onChange={(v) => updateData({ apellido_paterno: v })}
                placeholder="Ej: Pérez"
                required
                maxLength={MAX_APELLIDO_LENGTH}
                theme={theme}
              />
            </StepGrid>
            
            <StepGrid columns={2} theme={theme}>
              <StepInput
                label="Apellido Materno"
                value={data.apellido_materno}
                onChange={(v) => updateData({ apellido_materno: v })}
                placeholder="Ej: García"
                maxLength={MAX_APELLIDO_LENGTH}
                theme={theme}
              />
              <StepInput
                label="Fecha de Nacimiento"
                type="date"
                value={data.fecha_nacimiento}
                onChange={(v) => updateData({ fecha_nacimiento: v })}
                theme={theme}
              />
            </StepGrid>
          </div>
        );
      
      case "professional":
        return (
          <div className="space-y-4">
            <StepSelect
              label="Puesto / Cargo"
              value={data.puesto}
              options={PUESTOS}
              onChange={(v) => updateData({ puesto: v })}
              theme={theme}
            />
            
            <StepInput
              label="Carrera Estudiada"
              value={data.carrera_estudiada}
              onChange={(v) => updateData({ carrera_estudiada: v })}
              placeholder="Ej: Administración de Empresas"
              theme={theme}
            />
            
            <StepToggle
              label="Activo"
              checked={data.activo}
              onChange={(v) => updateData({ activo: v })}
              theme={theme}
            />
          </div>
        );
      
      case "contact":
        return (
          <div className="space-y-4">
            <StepGrid columns={2} theme={theme}>
              <StepInput
                label="Email Corporativo"
                type="email"
                value={data.email}
                onChange={(v) => updateData({ email: v })}
                placeholder="ejemplo@empresa.com"
                required
                theme={theme}
              />
              <StepInput
                label="Teléfono"
                type="tel"
                value={data.telefono}
                onChange={(v) => updateData({ telefono: v })}
                placeholder="(555) 123-4567"
                theme={theme}
              />
            </StepGrid>
          </div>
        );
      
      case "bio":
        return (
          <div className="space-y-4">
            <StepTextarea
              label="Biografía Profesional"
              value={data.biografia}
              onChange={(v) => updateData({ biografia: v })}
              placeholder="Describe la trayectoria profesional..."
              maxLength={MAX_BIOGRAFIA_LENGTH}
              rows={6}
              theme={theme}
              helper={`${data.biografia.length}/${MAX_BIOGRAFIA_LENGTH} caracteres`}
            />
          </div>
        );
      
      case "review":
        return (
          <div className="space-y-6">
            <StepSection title="Información Personal" theme={theme}>
              <div className="flex items-center gap-4 mb-4">
                {data.photoPreview ? (
                  <img 
                    src={data.photoPreview} 
                    alt="Foto" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                  }`}>
                    <User className={`w-8 h-8 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`} />
                  </div>
                )}
                <div>
                  <p className={`font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.nombre} {data.apellido_paterno} {data.apellido_materno}
                  </p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    {data.fecha_nacimiento 
                      ? `Nacido/a: ${new Date(data.fecha_nacimiento).toLocaleDateString()}`
                      : "Sin fecha de nacimiento"}
                  </p>
                </div>
              </div>
            </StepSection>
            
            <StepSection title="Información Profesional" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Puesto</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.puesto || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Carrera</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.carrera_estudiada || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Estado</dt>
                  <dd className={`text-sm font-medium ${data.activo ? "text-emerald-500" : theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.activo ? "Activo" : "Inactivo"}
                  </dd>
                </div>
              </dl>
            </StepSection>
            
            <StepSection title="Información de Contacto" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Email</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.email || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Teléfono</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.telefono || "—"}
                  </dd>
                </div>
              </dl>
            </StepSection>
            
            {data.biografia && (
              <StepSection title="Biografía" theme={theme}>
                <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  {data.biografia.length > 200 
                    ? `${data.biografia.substring(0, 200)}...` 
                    : data.biografia || "—"}
                </p>
              </StepSection>
            )}
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
        title={isEditing ? "Editar Ejecutivo" : "Crear Nuevo Ejecutivo"}
        subtitle="Completa los pasos para guardar el ejecutivo"
        steps={EJECUTIVOS_WIZARD_STEPS}
        onSubmit={handleSubmit}
        renderStep={renderStep}
        loading={loading}
        submitLabel={isEditing ? "Guardar Cambios" : "Crear Ejecutivo"}
        size="lg"
        draftKey={`ejecutivos_wizard_${isEditing ? initialData?.id : 'new'}`}
        theme={theme}
      />
    </>
  );
}

export default EjecutivosWizardForm;

