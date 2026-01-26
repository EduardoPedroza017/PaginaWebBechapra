"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { 
  Briefcase, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  CheckCircle,
  Upload,
  X,
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

export interface Service {
  id?: string;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  handle?: string;
  active?: boolean;
}

interface ServiceWizardData {
  name: string;
  description: string;
  icon: string;
  iconFile: File | null;
  image: string;
  imageFile: File | null;
  handle: string;
  active: boolean;
  galleryOpen: boolean;
}

interface ServicesWizardFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (service: Service) => void;
  initialData?: Service;
  theme: "light" | "dark";
}

// ============================================================================
// Constants
// ============================================================================

const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 300;
const MAX_ICON_SIZE = 512 * 1024; // 512KB
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

// ============================================================================
// Wizard Steps Definition
// ============================================================================

const SERVICES_WIZARD_STEPS: WizardStep[] = [
  {
    id: "basic",
    title: "Información Básica",
    description: "Nombre y datos principales del servicio",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "description",
    title: "Descripción",
    description: "Detalles y contenido del servicio",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "media",
    title: "Medios",
    description: "Icono e imagen del servicio",
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    id: "settings",
    title: "Configuración",
    description: "Handle y opciones adicionales",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: "review",
    title: "Revisión Final",
    description: "Confirma los datos antes de guardar",
    icon: <CheckCircle className="w-5 h-5" />,
  },
];

// ============================================================================
// ServicesWizardForm Component
// ============================================================================

export function ServicesWizardForm({ 
  isOpen, 
  onClose, 
  onSaved, 
  initialData, 
  theme 
}: ServicesWizardFormProps) {
  const [data, setData] = useState<ServiceWizardData>({
    name: "",
    description: "",
    icon: "",
    iconFile: null,
    image: "",
    imageFile: null,
    handle: "",
    active: true,
    galleryOpen: false,
  });

  const [pages, setPages] = useState<Array<{handle: string, heroTitle?: string}>>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [currentStepId, setCurrentStepId] = useState("basic");
  
  const iconInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const API = process.env.NEXT_PUBLIC_API_URL || '';

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const updateData = (updates: Partial<ServiceWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  // Load service pages for handle selection
  useEffect(() => {
    fetch(`${API}/api/service_pages`)
      .then(res => res.json())
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setPages(data.map((p: Record<string, unknown>) => ({ 
            handle: String(p.handle || ''), 
            heroTitle: p.heroTitle as string | undefined 
          })));
        }
      })
      .catch(() => {});
  }, [API]);

  // Load gallery images
  useEffect(() => {
    if (data.galleryOpen) {
      import('../../utils/admin-api').then(({ adminApi }) => {
        adminApi.listImages().then(result => {
          if (result.success && result.data) setGalleryImages(result.data);
        }).catch(() => {});
      }).catch(() => {});
    }
  }, [data.galleryOpen, API]);

  // Initialize with existing data
  useEffect(() => {
    if (initialData) {
      setData({
        name: initialData.name || "",
        description: initialData.description || "",
        icon: initialData.icon || "",
        iconFile: null,
        image: initialData.image || "",
        imageFile: null,
        handle: initialData.handle || "",
        active: initialData.active ?? true,
        galleryOpen: false,
      });
    }
  }, [initialData]);

  // Icon handling
  const handleIconChange = (file: File | null) => {
    if (!file) {
      updateData({ icon: "", iconFile: null });
      return;
    }

    if (file.size > MAX_ICON_SIZE) {
      showMessage('error', `Icono muy grande. Máximo ${MAX_ICON_SIZE / 1024}KB`);
      return;
    }

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'ico' && ext !== 'png') {
      showMessage('error', 'Solo se permiten archivos .ico o .png');
      return;
    }

    updateData({ iconFile: file });
    const url = URL.createObjectURL(file);
    updateData({ icon: url });
  };

  // Image handling
  const handleImageChange = (file: File | null) => {
    if (!file) {
      updateData({ image: "", imageFile: null });
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      showMessage('error', `Imagen muy grande. Máximo ${MAX_IMAGE_SIZE / 1024 / 1024}MB`);
      return;
    }

    updateData({ imageFile: file });
    const url = URL.createObjectURL(file);
    updateData({ image: url });
  };

  // Generate handle from name
  const generateHandle = (name: string) => {
    return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  // Validation by step
  const validateStep = useCallback(async () => {
    switch (currentStepId) {
      case "basic":
        if (!data.name.trim()) {
          return { valid: false, error: "El nombre es requerido" };
        }
        if (data.name.length > MAX_NAME_LENGTH) {
          return { valid: false, error: `El nombre no puede exceder ${MAX_NAME_LENGTH} caracteres` };
        }
        return { valid: true };
      
      case "description":
        if (data.description.length > MAX_DESCRIPTION_LENGTH) {
          return { valid: false, error: `La descripción no puede exceder ${MAX_DESCRIPTION_LENGTH} caracteres` };
        }
        return { valid: true };
      
      case "media":
        if (!data.icon) {
          return { valid: false, error: "El icono es requerido" };
        }
        if (!data.image) {
          return { valid: false, error: "La imagen es requerida" };
        }
        return { valid: true };
      
      case "settings":
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
    
    const maybeHandle = data.handle || generateHandle(data.name);
    
    const payload: Record<string, unknown> = {
      name: data.name,
      description: data.description,
      icon: data.icon,
      image: data.image,
      slug: maybeHandle,
      active: data.active,
    };

    const userEmail = typeof window !== "undefined" ? sessionStorage.getItem("user_email") : null;
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
      if (initialData?.id) {
        // Update existing service
        const res = await fetch(`${API}/api/services/cards/${initialData.id}`, {
          method: "PUT",
          headers: { ...baseHeaders, ...bypassHeaders, "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          showMessage('success', 'Servicio actualizado exitosamente');
          const created = await res.json();
          onSaved(created);
          onClose();
        } else {
          const body = await res.json().catch(() => ({}));
          showMessage('error', body.error || 'Error al actualizar servicio');
        }
      } else {
        // Create new service
        const res = await fetch(`${API}/api/services/cards`, {
          method: "POST",
          headers: { ...baseHeaders, ...bypassHeaders, "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          showMessage('success', 'Servicio creado exitosamente');
          const created = await res.json();
          onSaved(created);
          onClose();
        } else {
          const body = await res.json().catch(() => ({}));
          showMessage('error', body.error || 'Error al crear servicio');
        }
      }
    } catch {
      showMessage('error', 'Error al guardar el servicio');
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
              label="Nombre del Servicio"
              value={data.name}
              onChange={(v) => {
                updateData({ name: v });
                if (!data.handle || data.handle === generateHandle(data.name)) {
                  updateData({ handle: generateHandle(v) });
                }
              }}
              placeholder="Ej: Consultoría Empresarial"
              required
              maxLength={MAX_NAME_LENGTH}
              theme={theme}
            />
            <StepTextarea
              label="Descripción Corta"
              value={data.description}
              onChange={(v) => updateData({ description: v })}
              placeholder="Breve descripción del servicio..."
              maxLength={MAX_DESCRIPTION_LENGTH}
              rows={3}
              theme={theme}
            />
          </div>
        );
      
      case "description":
        return (
          <div className="space-y-4">
            <StepSection 
              title="Detalles del Servicio" 
              description="Proporciona información detallada"
              theme={theme}
            >
              <StepTextarea
                label="Descripción Completa"
                value={data.description}
                onChange={(v) => updateData({ description: v })}
                placeholder="Describe detalladamente qué incluye este servicio..."
                rows={6}
                theme={theme}
              />
            </StepSection>
          </div>
        );
      
      case "media":
        return (
          <div className="space-y-6">
            {/* Icon Upload */}
            <StepSection title="Icono" description="Archivo .ico o .png (64x64px recomendado)" theme={theme}>
              {data.icon ? (
                <div className="flex items-center gap-4">
                  <div className={`relative w-16 h-16 rounded-xl border-2 overflow-hidden ${
                    theme === "dark" ? "border-slate-600" : "border-slate-200"
                  }`}>
                    <img src={data.icon} alt="Icono" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      {data.iconFile?.name || "Icono cargado"}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleIconChange(null)}
                      className={`mt-2 text-sm text-red-500 hover:text-red-600`}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => iconInputRef.current?.click()}
                  className={`
                    border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                    ${theme === "dark" 
                      ? "border-slate-700 hover:border-blue-500 hover:bg-slate-800/30" 
                      : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
                    }
                  `}
                >
                  <Briefcase className={`w-8 h-8 mx-auto mb-2 ${
                    theme === "dark" ? "text-slate-600" : "text-slate-400"
                  }`} />
                  <p className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    Haz clic para seleccionar el icono
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                    Solo .ico o .png, máximo 512KB
                  </p>
                  <input
                    ref={iconInputRef}
                    type="file"
                    accept=".ico,.png"
                    className="hidden"
                    onChange={(e) => handleIconChange(e.target.files?.[0] || null)}
                  />
                </div>
              )}
            </StepSection>
            
            {/* Image Upload */}
            <StepSection title="Imagen Principal" description="Foto representativa del servicio (jpg, png, webp)" theme={theme}>
              {data.image ? (
                <div className="flex items-center gap-4">
                  <div className={`relative w-32 h-20 rounded-xl overflow-hidden border-2 ${
                    theme === "dark" ? "border-slate-600" : "border-slate-200"
                  }`}>
                    <img src={data.image} alt="Imagen" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      {data.imageFile?.name || "Imagen cargada"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          theme === "dark"
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        Cambiar
                      </button>
                      <button
                        type="button"
                        onClick={() => updateData({ galleryOpen: true })}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          theme === "dark"
                            ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        }`}
                      >
                        Galería
                      </button>
                      <button
                        type="button"
                        onClick={() => handleImageChange(null)}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div 
                    onClick={() => imageInputRef.current?.click()}
                    className={`
                      border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                      ${theme === "dark" 
                        ? "border-slate-700 hover:border-blue-500 hover:bg-slate-800/30" 
                        : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
                      }
                    `}
                  >
                    <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${
                      theme === "dark" ? "text-slate-600" : "text-slate-400"
                    }`} />
                    <p className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Arrastra una imagen o haz clic para seleccionar
                    </p>
                    <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
                      PNG, JPG, WEBP hasta 2MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateData({ galleryOpen: true })}
                    className={`w-full px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      theme === "dark"
                        ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Seleccionar de la Galería
                  </button>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                  />
                </div>
              )}
            </StepSection>
          </div>
        );
      
      case "settings":
        return (
          <div className="space-y-4">
            <StepInput
              label="Handle (URL amigable)"
              value={data.handle}
              onChange={(v) => updateData({ handle: v })}
              placeholder="ej-consultoria-empresarial"
              helper="Identificador único para la URL. Se genera automáticamente si se deja vacío."
              theme={theme}
            />
            
            {pages.length > 0 && (
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                  Asociar a página existente
                </label>
                <select
                  className={`
                    w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-200 outline-none min-h-[48px]
                    ${theme === "dark"
                      ? "bg-slate-800 border-slate-700 text-white focus:border-blue-500"
                      : "bg-white border-slate-300 text-slate-900 focus:border-blue-500"
                    }
                  `}
                  value={data.handle}
                  onChange={(e) => updateData({ handle: e.target.value })}
                >
                  <option value="">-- Sin asociación --</option>
                  {pages.map(p => (
                    <option key={p.handle} value={p.handle}>
                      {p.heroTitle || p.handle} — /{p.handle}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <StepToggle
              label="Servicio activo"
              checked={data.active}
              onChange={(v) => updateData({ active: v })}
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
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Nombre</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.name || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Descripción</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.description || "—"}
                  </dd>
                </div>
              </dl>
            </StepSection>
            
            {/* Media */}
            <StepSection title="Medios" theme={theme}>
              <div className="flex items-center gap-4">
                {data.icon ? (
                  <img src={data.icon} alt="Icono" className="w-12 h-12 object-contain" />
                ) : (
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                  }`}>
                    <Briefcase className={`w-6 h-6 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`} />
                  </div>
                )}
                {data.image ? (
                  <img src={data.image} alt="Imagen" className="w-24 h-16 object-cover rounded-lg" />
                ) : (
                  <div className={`w-24 h-16 rounded-lg flex items-center justify-center ${
                    theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                  }`}>
                    <ImageIcon className={`w-6 h-6 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`} />
                  </div>
                )}
              </div>
            </StepSection>
            
            {/* Settings */}
            <StepSection title="Configuración" theme={theme}>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Handle</dt>
                  <dd className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.handle || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Estado</dt>
                  <dd className={`text-sm font-medium ${data.active ? "text-emerald-500" : theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {data.active ? "Activo" : "Inactivo"}
                  </dd>
                </div>
              </dl>
            </StepSection>
          </div>
        );
      
      default:
        return null;
    }
  }, [data, theme, pages, showMessage]);

  // Gallery Modal
  const GalleryModal = () => {
    if (!data.galleryOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className={`
          rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-auto
          ${theme === "dark" ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"}
        `}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Seleccionar imagen de galería</h3>
            <button
              onClick={() => updateData({ galleryOpen: false })}
              className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {galleryImages.length === 0 ? (
            <div className="text-center py-8">
              <p className={theme === "dark" ? "text-slate-500" : "text-slate-400"}>
                No hay imágenes en la galería
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {galleryImages.map(img => (
                <button
                  key={img}
                  onClick={() => {
                    updateData({ 
                      image: `${API}/gallery/image/${encodeURIComponent(img)}`,
                      galleryOpen: false 
                    });
                  }}
                  className="relative group"
                >
                  <img
                    src={`${API}/gallery/image/${encodeURIComponent(img)}`}
                    alt={img}
                    className={`
                      w-full h-20 object-cover rounded-lg border-2 transition-all
                      group-hover:ring-2 group-hover:ring-blue-400
                      ${theme === "dark" ? "border-slate-700" : "border-slate-200"}
                    `}
                  />
                </button>
              ))}
            </div>
          )}
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => updateData({ galleryOpen: false })}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === "dark"
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Toast Message Component
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
      <GalleryModal />
      
      <FormWizardModal
        isOpen={isOpen}
        onClose={onClose}
        title={initialData?.id ? "Editar Servicio" : "Crear Nuevo Servicio"}
        subtitle="Completa los pasos para guardar el servicio"
        steps={SERVICES_WIZARD_STEPS}
        onSubmit={handleSubmit}
        renderStep={renderStep}
        loading={loading}
        submitLabel={initialData?.id ? "Actualizar" : "Crear Servicio"}
        size="lg"
        draftKey={`service_wizard_${initialData?.id || 'new'}`}
        theme={theme}
      />
    </>
  );
}

export default ServicesWizardForm;

