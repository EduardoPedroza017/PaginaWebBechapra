"use client";

import React from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  Save, 
  Loader2,
  Sparkles,
  RotateCcw,
  Eye,
  EyeOff
} from "lucide-react";
import { useTheme } from "@/app/admin/hooks";

// ============================================================================
// Types / Interfaces
// ============================================================================

export interface WizardControlsProps {
  /** Current step index */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Whether we're on the first step */
  isFirstStep: boolean;
  /** Whether we're on the last step */
  isLastStep: boolean;
  /** Whether validation is in progress */
  isValidating: boolean;
  /** Whether form is submitting */
  isSubmitting: boolean;
  /** Whether there's a draft saved */
  hasDraft: boolean;
  /** Loading state */
  loading: boolean;
  /** Callback for going to previous step */
  onPrevious: () => void;
  /** Callback for going to next step */
  onNext: () => void;
  /** Callback for submitting the form */
  onSubmit: () => void;
  /** Callback for closing the modal */
  onClose: () => void;
  /** Callback for clearing the draft */
  onClearDraft: () => void;
  /** Submit button label */
  submitLabel?: string;
  /** Show preview toggle */
  showPreviewToggle?: boolean;
  /** Preview mode state */
  previewMode?: boolean;
  /** Toggle preview mode */
  onTogglePreview?: () => void;
  /** Theme */
  theme: "light" | "dark";
}

// ============================================================================
// Theme Classes Helper
// ============================================================================

function getControlsThemeClasses(theme: "light" | "dark") {
  const isDark = theme === "dark";
  
  return {
    // Container
    container: isDark
      ? "border-t border-slate-700/50 bg-slate-900/50"
      : "border-t border-slate-200 bg-slate-50/50",
    
    // Primary button
    primary: isDark
      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30"
      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30",
    
    // Secondary button
    secondary: isDark
      ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
      : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300",
    
    // Ghost button
    ghost: isDark
      ? "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
      : "hover:bg-slate-100 text-slate-500 hover:text-slate-700",
    
    // Danger button
    danger: isDark
      ? "bg-rose-700 hover:bg-rose-600 text-white"
      : "bg-rose-600 hover:bg-rose-700 text-white",
    
    // Text
    text: isDark
      ? "text-slate-100"
      : "text-slate-900",
    
    muted: isDark
      ? "text-slate-400"
      : "text-slate-600",
    
    // Draft indicator
    draft: isDark
      ? "bg-amber-900/20 text-amber-400 border-amber-800/30"
      : "bg-amber-50 text-amber-700 border-amber-200",
  };
}

// ============================================================================
// WizardControls Component
// ============================================================================

export function WizardControls({
  currentStep,
  totalSteps,
  isFirstStep,
  isLastStep,
  isValidating,
  isSubmitting,
  hasDraft,
  loading,
  onPrevious,
  onNext,
  onSubmit,
  onClose,
  onClearDraft,
  submitLabel = "Guardar",
  showPreviewToggle = false,
  previewMode = false,
  onTogglePreview,
  theme,
}: WizardControlsProps) {
  const themeClasses = getControlsThemeClasses(theme);
  
  // Disable all buttons during loading, validating, or submitting
  const isDisabled = loading || isValidating || isSubmitting;
  
  return (
    <div className={`px-6 py-4 ${themeClasses.container}`}>
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Draft indicator and progress */}
        <div className="flex items-center gap-3">
          {/* Draft indicator */}
          {hasDraft && (
            <button
              onClick={onClearDraft}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                border transition-all duration-200
                ${themeClasses.draft}
                hover:opacity-80
              `}
              title="Borrar borrador guardado"
            >
              <Sparkles className="w-3 h-3" />
              <span>Borrador</span>
              <RotateCcw className="w-3 h-3 ml-0.5" />
            </button>
          )}
          
          {/* Progress indicator */}
          <div className={`text-sm ${themeClasses.muted}`}>
            <span className="font-medium">
              Paso {currentStep + 1} de {totalSteps}
            </span>
          </div>
        </div>
        
        {/* Center - Preview toggle (if enabled) */}
        {showPreviewToggle && (
          <div className="flex items-center gap-2">
            <button
              onClick={onTogglePreview}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${previewMode
                  ? themeClasses.primary
                  : themeClasses.secondary
                }
              `}
            >
              {previewMode ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span>Ocultar vista previa</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Vista previa</span>
                </>
              )}
            </button>
          </div>
        )}
        
        {/* Right side - Navigation buttons */}
        <div className="flex items-center gap-3">
          {/* Previous button */}
          {!isFirstStep && (
            <button
              onClick={onPrevious}
              disabled={isDisabled}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl
                font-medium text-sm transition-all duration-200
                ${themeClasses.secondary}
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:scale-105 active:scale-95
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
          )}
          
          {/* Cancel button */}
          <button
            onClick={onClose}
            disabled={isDisabled}
            className={`
              px-4 py-2.5 rounded-xl
              font-medium text-sm transition-all duration-200
              ${themeClasses.ghost}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <span>Cancelar</span>
          </button>
          
          {/* Next or Submit button */}
          {isLastStep ? (
            <button
              onClick={onSubmit}
              disabled={isDisabled}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-xl
                font-medium text-sm transition-all duration-200
                ${themeClasses.primary}
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:scale-105 active:scale-95
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{submitLabel}</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={onNext}
              disabled={isDisabled}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-xl
                font-medium text-sm transition-all duration-200
                ${themeClasses.primary}
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:scale-105 active:scale-95
              `}
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Compact Wizard Controls (for smaller screens)
// ============================================================================

export function CompactWizardControls({
  currentStep,
  totalSteps,
  isFirstStep,
  isLastStep,
  isValidating,
  isSubmitting,
  hasDraft,
  loading,
  onPrevious,
  onNext,
  onSubmit,
  onClose,
  onClearDraft,
  submitLabel = "Guardar",
  theme,
}: WizardControlsProps) {
  const themeClasses = getControlsThemeClasses(theme);
  
  const isDisabled = loading || isValidating || isSubmitting;
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 ${themeClasses.container} px-4 py-3 shadow-lg z-10`}>
      <div className="flex items-center justify-between gap-3 max-w-4xl mx-auto">
        {/* Cancel */}
        <button
          onClick={onClose}
          disabled={isDisabled}
          className={`
            px-3 py-2 rounded-lg text-xs
            ${themeClasses.ghost}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          Cancelar
        </button>
        
        {/* Progress */}
        <div className="flex items-center gap-2">
          {hasDraft && (
            <button
              onClick={onClearDraft}
              className={`
                w-2 h-2 rounded-full
                ${theme === "dark" ? "bg-amber-400" : "bg-amber-500"}
              `}
              title="Borrador guardado"
            />
          )}
          <span className={`text-xs ${themeClasses.muted}`}>
            {currentStep + 1}/{totalSteps}
          </span>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center gap-2">
          {!isFirstStep && (
            <button
              onClick={onPrevious}
              disabled={isDisabled}
              className={`
                p-2 rounded-lg
                ${themeClasses.secondary}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          
          {isLastStep ? (
            <button
              onClick={onSubmit}
              disabled={isDisabled}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium
                ${themeClasses.primary}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isSubmitting ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Check className="w-3 h-3" />
              )}
              <span>{submitLabel}</span>
            </button>
          ) : (
            <button
              onClick={onNext}
              disabled={isDisabled}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium
                ${themeClasses.primary}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <span>Siguiente</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Review Summary Component
// ============================================================================

export interface ReviewItemProps {
  label: string;
  value: React.ReactNode;
  editable?: boolean;
  onEdit?: () => void;
  theme: "light" | "dark";
}

export function ReviewItem({ label, value, editable, onEdit, theme }: ReviewItemProps) {
  const themeClasses = getControlsThemeClasses(theme);
  
  return (
    <div className={`
      flex items-start justify-between p-4 rounded-xl
      ${theme === "dark" ? "bg-slate-800/30" : "bg-slate-50"}
    `}>
      <div className="flex-1">
        <dt className={`text-sm font-medium ${themeClasses.muted}`}>
          {label}
        </dt>
        <dd className={`mt-1 ${themeClasses.text}`}>
          {value || <span className="italic opacity-50">No especificado</span>}
        </dd>
      </div>
      {editable && (
        <button
          onClick={onEdit}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-medium
            ${themeClasses.secondary}
            hover:scale-105 active:scale-95
          `}
        >
          Editar
        </button>
      )}
    </div>
  );
}

export interface ReviewSectionProps {
  title: string;
  theme: "light" | "dark";
  children: React.ReactNode;
}

export function ReviewSection({ title, theme, children }: ReviewSectionProps) {
  const themeClasses = getControlsThemeClasses(theme);
  
  return (
    <div className="mb-6">
      <h4 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${themeClasses.muted}`}>
        {title}
      </h4>
      <dl className="space-y-2">
        {children}
      </dl>
    </div>
  );
}

// ============================================================================
// Step Navigation Dots (for quick jumping between steps)
// ============================================================================

export interface StepDotsProps {
  currentStep: number;
  totalSteps: number;
  validationStatus: Record<string, { valid: boolean }>;
  onJumpToStep: (step: number) => void;
  theme: "light" | "dark";
}

export function StepDots({
  currentStep,
  totalSteps,
  validationStatus,
  onJumpToStep,
  theme,
}: StepDotsProps) {
  const themeClasses = getControlsThemeClasses(theme);
  
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepId = `step-${index}`;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const hasError = validationStatus[stepId]?.valid === false;
        
        let dotClass = theme === "dark" ? "bg-slate-700" : "bg-slate-300";
        if (isActive) {
          dotClass = theme === "dark" ? "bg-blue-500" : "bg-blue-500";
        } else if (isCompleted) {
          dotClass = theme === "dark" ? "bg-emerald-500" : "bg-emerald-500";
        } else if (hasError) {
          dotClass = "bg-red-500";
        }
        
        return (
          <button
            key={index}
            onClick={() => onJumpToStep(index)}
            className={`
              group relative flex items-center justify-center
              w-3 h-3 rounded-full transition-all duration-200
              ${dotClass}
              ${isActive ? "scale-125 ring-2 ring-offset-2 ring-blue-500" : ""}
              ${!isActive && !isCompleted ? "hover:scale-110" : ""}
            `}
          >
            {/* Tooltip */}
            <div className={`
              absolute bottom-full mb-2 px-2 py-1 rounded text-xs
              whitespace-nowrap opacity-0 group-hover:opacity-100
              transition-opacity pointer-events-none
              ${theme === "dark" ? "bg-slate-800 text-white" : "bg-slate-900 text-white"}
            `}>
              Paso {index + 1}
            </div>
            
            {/* Completed checkmark */}
            {isCompleted && (
              <Check className={`w-3 h-3 text-white ${hasError ? "hidden" : ""}`} />
            )}
            
            {/* Error indicator */}
            {hasError && (
              <span className="text-white text-xs">!</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default WizardControls;

