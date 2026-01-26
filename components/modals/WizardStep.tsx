"use client";

import React, { useCallback, useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useTheme } from "@/app/admin/hooks";

// ============================================================================
// Types / Interfaces
// ============================================================================

export interface WizardStepData {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export interface WizardStepProps {
  /** Step data */
  step: WizardStepData;
  /** Current step index */
  stepIndex: number;
  /** Total steps count */
  totalSteps: number;
  /** Form data */
  data: Record<string, unknown>;
  /** Update form data */
  onUpdateData: (data: Record<string, unknown>) => void;
  /** Validation state for this step */
  validation?: { valid: boolean; error?: string };
  /** Whether this is the current active step */
  isActive: boolean;
  /** Theme */
  theme: "light" | "dark";
}

// ============================================================================
// Theme Classes Helper
// ============================================================================

function getStepThemeClasses(theme: "light" | "dark") {
  const isDark = theme === "dark";
  
  return {
    // Container
    container: isDark
      ? "bg-slate-900/50"
      : "bg-white",
    
    // Field labels
    label: isDark
      ? "text-slate-300"
      : "text-slate-700",
    
    // Input styles
    input: isDark
      ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
      : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
    
    // Helper text
    helper: isDark
      ? "text-slate-400"
      : "text-slate-500",
    
    // Error state
    error: isDark
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-400"
      : "border-red-500 focus:border-red-500 focus:ring-red-500/10 text-red-600",
    
    // Section backgrounds
    sectionBg: isDark
      ? "bg-slate-800/30"
      : "bg-slate-50",
    
    // Card styles
    card: isDark
      ? "bg-slate-800/50 border-slate-700"
      : "bg-slate-50 border-slate-200",
    
    // Text
    text: isDark
      ? "text-slate-100"
      : "text-slate-900",
    
    muted: isDark
      ? "text-slate-400"
      : "text-slate-600",
  };
}

// ============================================================================
// WizardStep Component
// ============================================================================

export function WizardStep({
  step,
  stepIndex,
  totalSteps,
  data,
  onUpdateData,
  validation,
  isActive,
  theme,
}: WizardStepProps) {
  const themeClasses = getStepThemeClasses(theme);
  
  // Only render if this step is active
  if (!isActive) {
    return null;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Step header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {step.icon && (
            <div className={`
              p-2 rounded-xl
              ${theme === "dark" 
                ? "bg-blue-900/30 text-blue-400" 
                : "bg-blue-50 text-blue-600"
              }
            `}>
              {step.icon}
            </div>
          )}
          <div>
            <h3 className={`text-lg font-semibold ${themeClasses.text}`}>
              {step.title}
            </h3>
            <p className={`text-sm ${themeClasses.muted}`}>
              {step.description || `Paso ${stepIndex + 1} de ${totalSteps}`}
            </p>
          </div>
        </div>
      </div>

      {/* Validation status */}
      {validation && !validation.valid && (
        <div className={`
          mb-4 p-3 rounded-lg border flex items-center gap-2
          ${theme === "dark"
            ? "bg-red-900/20 border-red-800/50 text-red-400"
            : "bg-red-50 border-red-200 text-red-600"
          }
        `}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{validation.error || "Por favor completa todos los campos requeridos"}</span>
        </div>
      )}

      {/* Content will be rendered by children or passed content */}
      <div className={themeClasses.container}>
        {/* This component serves as a wrapper - content should be passed as children */}
        {step.children}
      </div>
    </div>
  );
}

// ============================================================================
// WizardStepContent Components (for building form steps)
// ============================================================================

export interface StepFieldProps {
  label: React.ReactNode;
  required?: boolean;
  error?: string;
  helper?: string;
  children: React.ReactNode;
  theme: "light" | "dark";
}

export function StepField({ label, required, error, helper, children, theme }: StepFieldProps) {
  const themeClasses = getStepThemeClasses(theme);
  
  return (
    <div className="mb-5">
      <label className={`block text-sm font-medium mb-2 ${themeClasses.label}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className={`mt-1 text-sm ${theme === "dark" ? "text-red-400" : "text-red-600"}`}>
          {error}
        </p>
      )}
      {helper && !error && (
        <p className={`mt-1 text-xs ${themeClasses.helper}`}>
          {helper}
        </p>
      )}
    </div>
  );
}

export interface StepSectionProps {
  title: string;
  description?: string;
  theme: "light" | "dark";
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export function StepSection({ title, description, theme, children, collapsible, defaultOpen = true }: StepSectionProps) {
  const themeClasses = getStepThemeClasses(theme);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className={`
      rounded-xl border overflow-hidden
      ${theme === "dark" ? "border-slate-700" : "border-slate-200"}
    `}>
      <button
        onClick={() => collapsible && setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-3 flex items-center justify-between
          ${themeClasses.sectionBg}
          ${collapsible ? "cursor-pointer hover:opacity-90" : ""}
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center
            ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}
          `}>
            <CheckCircle className={`w-4 h-4 ${themeClasses.muted}`} />
          </div>
          <div className="text-left">
            <span className={`font-medium ${themeClasses.text}`}>
              {title}
            </span>
            {description && (
              <p className={`text-xs ${themeClasses.muted}`}>
                {description}
              </p>
            )}
          </div>
        </div>
        {collapsible && (
          <div className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
            <svg className={`w-4 h-4 ${themeClasses.muted}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </button>
      
      {(isOpen || !collapsible) && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
}

export interface StepGridProps {
  columns?: 1 | 2 | 3;
  children: React.ReactNode;
  theme: "light" | "dark";
}

export function StepGrid({ columns = 2, children, theme }: StepGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  };
  
  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {children}
    </div>
  );
}

export interface StepInputProps {
  label: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  maxLength?: number;
  theme: "light" | "dark";
  disabled?: boolean;
  helper?: string;
  list?: string;
  min?: string;
  minLength?: number;
}

export function StepInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  error,
  maxLength,
  theme,
  disabled,
  helper,
  list,
  min,
  minLength,
}: StepInputProps) {
  const themeClasses = getStepThemeClasses(theme);
  const inputClass = `
    w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-200 outline-none min-h-[48px]
    ${error ? themeClasses.error : themeClasses.input}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `.trim();
  
  return (
    <StepField label={label} required={!!required} error={error} helper={helper} theme={theme}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        min={min}
        disabled={disabled}
        list={list}
        className={inputClass}
      />
    </StepField>
  );
}

export interface StepTextareaProps {
  label: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  maxLength?: number;
  rows?: number;
  theme: "light" | "dark";
  disabled?: boolean;
  helper?: string;
}

export function StepTextarea({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  maxLength,
  rows = 4,
  theme,
  disabled,
  helper,
}: StepTextareaProps) {
  const themeClasses = getStepThemeClasses(theme);
  const inputClass = `
    w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-200 outline-none resize-none
    ${error ? themeClasses.error : themeClasses.input}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `.trim();
  
  return (
    <StepField label={label} required={required} error={error} helper={helper} theme={theme}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        disabled={disabled}
        className={inputClass}
      />
    </StepField>
  );
}

export interface StepSelectProps {
  label: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
  theme: "light" | "dark";
  disabled?: boolean;
  helper?: string;
}

export function StepSelect({
  label,
  value,
  onChange,
  options,
  required,
  error,
  theme,
  disabled,
  helper,
}: StepSelectProps) {
  const themeClasses = getStepThemeClasses(theme);
  const selectClass = `
    w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-200 outline-none min-h-[48px]
    ${error ? themeClasses.error : themeClasses.input}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `.trim();
  
  return (
    <StepField label={label} required={required} error={error} helper={helper} theme={theme}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={selectClass}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </StepField>
  );
}

export interface StepCheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  theme: "light" | "dark";
  disabled?: boolean;
}

export function StepCheckbox({
  label,
  checked,
  onChange,
  description,
  theme,
  disabled,
}: StepCheckboxProps) {
  const themeClasses = getStepThemeClasses(theme);
  
  return (
    <label className={`
      flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all
      ${themeClasses.sectionBg}
      ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}
    `}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={`
          w-5 h-5 rounded border-2 mt-0.5
          ${theme === "dark"
            ? "border-slate-600 bg-slate-800 checked:bg-blue-500 checked:border-blue-500"
            : "border-slate-300 bg-white checked:bg-blue-500 checked:border-blue-500"
          }
          focus:ring-2 focus:ring-blue-500/20
        `}
      />
      <div className="flex-1">
        <span className={`font-medium ${themeClasses.text}`}>
          {label}
        </span>
        {description && (
          <p className={`text-sm mt-1 ${themeClasses.muted}`}>
            {description}
          </p>
        )}
      </div>
    </label>
  );
}

export interface StepToggleProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  theme: "light" | "dark";
  disabled?: boolean;
}

export function StepToggle({
  label,
  checked,
  onChange,
  theme,
  disabled,
}: StepToggleProps) {
  const themeClasses = getStepThemeClasses(theme);
  
  return (
    <div className="flex items-center justify-between">
      <span className={`font-medium ${themeClasses.text}`}>
        {label}
      </span>
      <button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${checked 
            ? theme === "dark" ? "bg-blue-600" : "bg-blue-500"
            : theme === "dark" ? "bg-slate-700" : "bg-slate-300"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${checked ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
}

export default WizardStep;

