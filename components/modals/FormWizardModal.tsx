"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  AlertCircle,
  Sparkles,
  Loader2
} from "lucide-react";
import { useTheme } from "@/app/admin/hooks";

// ============================================================================
// Types / Interfaces
// ============================================================================

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  validation?: () => Promise<{ valid: boolean; error?: string }> | { valid: boolean; error?: string };
}

export interface FormWizardModalProps {
  /** Control visibility of the modal */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Array of wizard steps */
  steps: WizardStep[];
  /** Current step index (0-based) */
  initialStep?: number;
  /** Title displayed in the modal header */
  title: string;
  /** Subtitle or description for the form */
  subtitle?: string;
  /** Function to render the current step content */
  renderStep: (step: WizardStep, currentStep: number) => React.ReactNode;
  /** Function called when form is submitted at final step */
  onSubmit: (data: Record<string, unknown>) => Promise<void> | void;
  /** Function called when user navigates between steps */
  onStepChange?: (stepIndex: number, data: Record<string, unknown>) => void;
  /** Whether the modal is in loading state */
  loading?: boolean;
  /** Submit button label */
  submitLabel?: string;
  /** Width of the modal */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Enable/disable draft auto-save */
  enableDraftSave?: boolean;
  /** Unique key for draft storage */
  draftKey?: string;
  /** Theme */
  theme?: "light" | "dark";
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get theme-aware classes for wizard components
 */
function getWizardThemeClasses(theme: "light" | "dark") {
  const isDark = theme === "dark";
  
  return {
    // Backdrop
    backdrop: isDark 
      ? "bg-slate-950/80 backdrop-blur-sm" 
      : "bg-black/50 backdrop-blur-sm",
    
    // Modal container
    modal: isDark
      ? "bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-700/50 shadow-2xl shadow-slate-950/50"
      : "bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200 shadow-2xl shadow-slate-200/50",
    
    // Header
    header: isDark
      ? "border-b border-slate-700/50"
      : "border-b border-slate-200",
    
    title: isDark
      ? "text-white"
      : "text-slate-900",
    
    subtitle: isDark
      ? "text-slate-400"
      : "text-slate-600",
    
    // Step indicator
    stepActive: isDark
      ? "bg-blue-600 text-white border-blue-500"
      : "bg-blue-500 text-white border-blue-500",
    
    stepInactive: isDark
      ? "bg-slate-800 border-slate-700 text-slate-400"
      : "bg-slate-100 border-slate-200 text-slate-500",
    
    stepCompleted: isDark
      ? "bg-emerald-600 border-emerald-500 text-white"
      : "bg-emerald-500 border-emerald-400 text-white",
    
    // Progress bar
    progressBar: isDark
      ? "bg-gradient-to-r from-blue-600 to-blue-500"
      : "bg-gradient-to-r from-blue-600 to-blue-500",
    
    progressBg: isDark
      ? "bg-slate-800"
      : "bg-slate-200",
    
    // Content area
    content: isDark
      ? "text-slate-100"
      : "text-slate-900",
    
    // Footer
    footer: isDark
      ? "border-t border-slate-700/50 bg-slate-900/50"
      : "border-t border-slate-200 bg-slate-50/50",
    
    // Buttons
    buttonPrimary: isDark
      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30"
      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30",
    
    buttonSecondary: isDark
      ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
      : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300",
    
    buttonGhost: isDark
      ? "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
      : "hover:bg-slate-100 text-slate-500 hover:text-slate-700",
    
    // Close button
    closeButton: isDark
      ? "hover:bg-slate-800 text-slate-400 hover:text-white"
      : "hover:bg-slate-100 text-slate-500 hover:text-slate-700",
  };
}

/**
 * Get size classes for modal
 */
function getSizeClasses(size: FormWizardModalProps["size"]) {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-[95vw] mx-4",
  };
  return sizes[size || "lg"];
}

/**
 * Draft storage utilities
 */
function saveDraft(key: string, data: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(`wizard_draft_${key}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn("Failed to save draft:", e);
    }
  }
}

function loadDraft(key: string): Record<string, unknown> | null {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(`wizard_draft_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check if draft is less than 24 hours old
        if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          return parsed.data;
        }
      }
    } catch (e) {
      console.warn("Failed to load draft:", e);
    }
  }
  return null;
}

function clearDraft(key: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(`wizard_draft_${key}`);
  }
}

// ============================================================================
// FormWizardModal Component
// ============================================================================

export function FormWizardModal({
  isOpen,
  onClose,
  steps,
  initialStep = 0,
  title,
  subtitle,
  renderStep,
  onSubmit,
  onStepChange,
  loading = false,
  submitLabel = "Guardar",
  size = "lg",
  enableDraftSave = true,
  draftKey = "form",
  theme: themeProp,
}: FormWizardModalProps) {
  // Get theme from context or use prop
  const { resolvedTheme } = useTheme();
  const theme = themeProp || (resolvedTheme === "dark" ? "dark" : "light");
  const themeClasses = getWizardThemeClasses(theme);
  
  // State
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [stepValidation, setStepValidation] = useState<Record<string, { valid: boolean; error?: string }>>({});
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for focus management
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Load draft on mount
  useEffect(() => {
    if (isOpen && enableDraftSave && draftKey) {
      const savedDraft = loadDraft(draftKey);
      if (savedDraft) {
        setFormData(savedDraft);
      }
    }
  }, [isOpen, enableDraftSave, draftKey]);

  // Save draft on data change
  useEffect(() => {
    if (enableDraftSave && draftKey && Object.keys(formData).length > 0) {
      const timeoutId = setTimeout(() => {
        saveDraft(draftKey, formData);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [formData, enableDraftSave, draftKey]);

  // Handle modal open/close for focus management
  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      // Focus title for accessibility
      setTimeout(() => titleRef.current?.focus(), 100);
    } else {
      // Reset state when closed
      setCurrentStep(initialStep);
      setError(null);
    }
  }, [isOpen, initialStep]);

  // Calculate progress
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const allStepsCompleted = currentStep >= steps.length - 1;

  // Validate current step
  const validateStep = useCallback(async () => {
    const step = steps[currentStep];
    if (!step.validation) {
      setStepValidation(prev => ({ ...prev, [step.id]: { valid: true } }));
      return true;
    }

    setIsValidating(true);
    setError(null);
    
    try {
      const result = await step.validation();
      setStepValidation(prev => ({ ...prev, [step.id]: result }));
      if (!result.valid && result.error) {
        setError(result.error);
      }
      return result.valid;
    } catch (err) {
      setStepValidation(prev => ({ ...prev, [step.id]: { valid: false, error: "Error de validación" } }));
      setError("Error de validación");
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [steps, currentStep]);

  // Handle step navigation
  const handleNext = useCallback(async () => {
    if (isValidating || loading || isSubmitting) return;
    
    const isValid = await validateStep();
    if (!isValid) return;
    
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep, formData);
    }
  }, [currentStep, steps.length, formData, validateStep, isValidating, loading, isSubmitting, onStepChange]);

  const handlePrevious = useCallback(() => {
    if (isFirstStep || loading || isSubmitting) return;
    
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    onStepChange?.(prevStep, formData);
  }, [currentStep, formData, isFirstStep, loading, isSubmitting, onStepChange]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    const isValid = await validateStep();
    if (!isValid) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSubmit(formData);
      // Clear draft on successful submit
      if (draftKey) {
        clearDraft(draftKey);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al guardar";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateStep, onSubmit, draftKey]);

  // Handle close
  const handleClose = useCallback(() => {
    if (!loading && !isSubmitting) {
      onClose();
    }
  }, [loading, isSubmitting, onClose]);

  // Update form data
  const updateFormData = useCallback((data: Record<string, unknown> | ((prev: Record<string, unknown>) => Record<string, unknown>)) => {
    setFormData(prev => {
      const newData = typeof data === "function" ? data(prev) : { ...prev, ...data };
      return newData;
    });
  }, []);

  // Get current step info
  const currentStepInfo = steps[currentStep];

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
    
    // Ctrl+Enter to submit on last step
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && isLastStep) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleClose, handleSubmit, isLastStep]);

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={handleClose}
      >
        {/* Backdrop */}
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`fixed inset-0 ${themeClasses.backdrop}`} />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel 
                className={`
                  w-full ${getSizeClasses(size)} 
                  transform overflow-hidden rounded-2xl 
                  transition-all duration-300 ease-out
                  border ${themeClasses.modal}
                `}
              >
                {/* Header */}
                <div className={`px-6 py-5 ${themeClasses.header}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <Dialog.Title
                        ref={titleRef}
                        className={`text-xl font-bold flex items-center gap-3 ${themeClasses.title}`}
                        tabIndex={-1}
                      >
                        {currentStepInfo?.icon && (
                          <span className="flex-shrink-0">
                            {currentStepInfo.icon}
                          </span>
                        )}
                        <span>
                          {title}
                          {subtitle && (
                            <span className={`block text-sm font-normal mt-1 ${themeClasses.subtitle}`}>
                              {subtitle}
                            </span>
                          )}
                        </span>
                      </Dialog.Title>
                    </div>
                    
                    <button
                      onClick={handleClose}
                      className={`p-2 rounded-xl transition-all ${themeClasses.closeButton}`}
                      aria-label="Cerrar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Step Progress */}
                  <div className="mt-5">
                    {/* Step Indicators */}
                    <div className="flex items-center justify-between mb-3">
                      {steps.map((step, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep || (loading && index === currentStep);
                        
                        let stepClass = themeClasses.stepInactive;
                        if (isActive) stepClass = themeClasses.stepActive;
                        else if (isCompleted) stepClass = themeClasses.stepCompleted;
                        
                        return (
                          <React.Fragment key={step.id}>
                            {/* Step circle */}
                            <button
                              onClick={() => {
                                if (index < currentStep) {
                                  setCurrentStep(index);
                                }
                              }}
                              disabled={index >= currentStep}
                              className={`
                                group relative flex items-center justify-center
                                w-8 h-8 rounded-full border-2 transition-all duration-300
                                ${stepClass}
                                ${index < currentStep ? "cursor-pointer hover:scale-110" : "cursor-default"}
                              `}
                              title={step.title}
                            >
                              {index < currentStep ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <span className="text-sm font-medium">{index + 1}</span>
                              )}
                              
                              {/* Tooltip */}
                              <div className={`
                                absolute bottom-full mb-2 px-2 py-1 rounded text-xs
                                whitespace-nowrap opacity-0 group-hover:opacity-100
                                transition-opacity pointer-events-none
                                ${theme === "dark" ? "bg-slate-800 text-white" : "bg-slate-900 text-white"}
                              `}>
                                {step.title}
                              </div>
                            </button>
                            
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                              <div 
                                className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${
                                  index < currentStep 
                                    ? themeClasses.progressBar 
                                    : themeClasses.progressBg
                                }`}
                              />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                    
                    {/* Current step title */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-semibold ${themeClasses.title}`}>
                          Paso {currentStep + 1} de {steps.length}: {currentStepInfo?.title}
                        </p>
                        {currentStepInfo?.description && (
                          <p className={`text-xs mt-0.5 ${themeClasses.subtitle}`}>
                            {currentStepInfo.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Completion percentage */}
                      <div className={`text-sm font-medium ${themeClasses.title}`}>
                        {Math.round(progress)}% completado
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${themeClasses.progressBg}`}>
                      <div 
                        className={`h-full ${themeClasses.progressBar} transition-all duration-500 ease-out`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className={`
                    mx-6 mt-4 px-4 py-3 rounded-xl border
                    flex items-center gap-2
                    ${theme === "dark" 
                      ? "bg-red-900/20 border-red-800/50 text-red-400" 
                      : "bg-red-50 border-red-200 text-red-600"
                    }
                  `}>
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm flex-1">{error}</span>
                    <button
                      onClick={() => setError(null)}
                      className="ml-auto hover:opacity-70"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Content Area */}
                <div className={`
                  px-6 py-6 max-h-[60vh] overflow-y-auto
                  ${theme === "dark" ? "scrollbar-thin scrollbar-thumb-slate-700" : "scrollbar-thin scrollbar-thumb-slate-300"}
                `}>
                  {isValidating ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className={`w-8 h-8 animate-spin mb-3 ${themeClasses.title}`} />
                      <p className={`text-sm ${themeClasses.subtitle}`}>
                        Validando información...
                      </p>
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      {renderStep(currentStepInfo, currentStep)}
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className={`px-6 py-4 ${themeClasses.footer}`}>
                  <div className="flex items-center justify-between gap-4">
                    {/* Left side - Draft indicator */}
                    <div className="flex items-center gap-2 text-xs">
                      {Object.keys(formData).length > 0 && enableDraftSave && (
                        <span className={`flex items-center gap-1 ${themeClasses.subtitle}`}>
                          <Sparkles className="w-3 h-3" />
                          Guardado automático
                        </span>
                      )}
                    </div>
                    
                    {/* Center - Navigation */}
                    <div className="flex items-center gap-3">
                      {/* Previous button */}
                      {!isFirstStep && (
                        <button
                          onClick={handlePrevious}
                          disabled={loading || isSubmitting}
                          className={`
                            flex items-center gap-2 px-4 py-2.5 rounded-xl
                            font-medium text-sm transition-all duration-200
                            ${themeClasses.buttonSecondary}
                            disabled:opacity-50 disabled:cursor-not-allowed
                            hover:scale-105 active:scale-95
                          `}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Anterior
                        </button>
                      )}
                      
                      {/* Cancel button */}
                      <button
                        onClick={handleClose}
                        disabled={loading || isSubmitting}
                        className={`
                          px-4 py-2.5 rounded-xl
                          font-medium text-sm transition-all duration-200
                          ${themeClasses.buttonGhost}
                          disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                      >
                        Cancelar
                      </button>
                      
                      {/* Next or Submit button */}
                      {isLastStep ? (
                        <button
                          onClick={handleSubmit}
                          disabled={loading || isSubmitting || isValidating}
                          className={`
                            flex items-center gap-2 px-6 py-2.5 rounded-xl
                            font-medium text-sm transition-all duration-200
                            ${themeClasses.buttonPrimary}
                            disabled:opacity-50 disabled:cursor-not-allowed
                            hover:scale-105 active:scale-95
                          `}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Guardando...
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4" />
                              {submitLabel}
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          disabled={loading || isSubmitting || isValidating}
                          className={`
                            flex items-center gap-2 px-6 py-2.5 rounded-xl
                            font-medium text-sm transition-all duration-200
                            ${themeClasses.buttonPrimary}
                            disabled:opacity-50 disabled:cursor-not-allowed
                            hover:scale-105 active:scale-95
                          `}
                        >
                          Siguiente
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// ============================================================================
// Export utility function for creating wizard forms
// ============================================================================

export interface UseWizardFormOptions<T> {
  initialData?: T;
  onSubmit: (data: T) => Promise<void> | void;
  draftKey?: string;
}

/**
 * Hook for managing wizard form state
 */
export function useWizardForm<T extends Record<string, unknown>>({
  initialData,
  onSubmit,
  draftKey,
}: UseWizardFormOptions<T>) {
  const [data, setData] = useState<T>((initialData || {}) as T);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load draft
  useEffect(() => {
    if (draftKey) {
      const saved = loadDraft(draftKey);
      if (saved) {
        setData(saved as T);
      }
    }
  }, [draftKey]);

  // Update data
  const updateData = useCallback((updates: Partial<T> | ((prev: T) => Partial<T>)) => {
    setData(prev => {
      const newData = typeof updates === "function" 
        ? { ...prev, ...updates(prev) } 
        : { ...prev, ...updates };
      
      if (draftKey) {
        saveDraft(draftKey, newData);
      }
      
      return newData;
    });
  }, [draftKey]);

  // Submit
  const submit = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSubmit(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al guardar";
      setError(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [data, onSubmit]);

  // Clear draft
  const clearData = useCallback(() => {
    setData((initialData || {}) as T);
    if (draftKey) {
      clearDraft(draftKey);
    }
  }, [draftKey, initialData]);

  return {
    data,
    updateData,
    setData,
    submit,
    clearData,
    isSubmitting,
    error,
    setError,
  };
}

export default FormWizardModal;

