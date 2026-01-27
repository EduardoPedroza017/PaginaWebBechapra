"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, Tag, Check } from 'lucide-react';
import { FormField, FormData, UseFormReturn } from '@/hooks/useForm';

interface WidersarFormProps {
  form: UseFormReturn;
  onSubmit: (data: FormData) => Promise<void>;
  fields: FormField[];
  theme: 'light' | 'dark';
  submitLabel: string;
}

export function WidersarForm({ form, onSubmit, fields, theme, submitLabel }: WidersarFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const isDark = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(form.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field: FormField, value: unknown) => {
    form.updateField(field.name, value);
  };

  const handleTagAdd = (field: FormField) => {
    const inputValue = tagInputs[field.name] || '';
    if (!inputValue.trim()) return;
    const existing = Array.isArray(form.data[field.name]) ? (form.data[field.name] as string[]) : [];
    if (existing.includes(inputValue.trim())) return;
    if (existing.length < (field.maxTags || 8)) {
      handleFieldChange(field, [...existing, inputValue.trim()]);
      setTagInputs(prev => ({ ...prev, [field.name]: '' }));
    }
  };

  const handleTagRemove = (field: FormField, tagToRemove: string) => {
    const currentTags = Array.isArray(form.data[field.name]) ? (form.data[field.name] as string[]) : [];
    handleFieldChange(field, currentTags.filter((tag) => tag !== tagToRemove));
  };

  const handleFileChange = (field: FormField, file: File | null) => {
    if (!file) {
      handleFieldChange(field, null);
      return;
    }

    if (field.maxSize && file.size > field.maxSize) {
      // Handle error - could add error state
      return;
    }

    if (field.accept && !file.type.match(field.accept.replace('*', '.*'))) {
      // Handle error - could add error state
      return;
    }

    handleFieldChange(field, file);
  };

  const renderField = (field: FormField) => {
    const value = form.data[field.name];
    const error = form.errors[field.name];

    const baseInputClasses = `
      w-full px-4 py-3 rounded-xl border-2 outline-none transition-all
      ${isDark
        ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500'
        : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500'
      }
    `;

    const labelClasses = `block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`;

    switch (field.type) {
      case 'text':
      case 'date':
      case 'time':
        return (
          <div key={field.name} className="mb-4">
            <label className={labelClasses}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              value={typeof value === 'string' ? value : ''}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              className={baseInputClasses}
            />
            {field.helper && (
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {field.helper}
              </p>
            )}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="mb-4">
            <label className={labelClasses}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              value={typeof value === 'string' ? value : ''}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              rows={4}
              className={baseInputClasses}
            />
            {field.helper && (
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {field.helper}
              </p>
            )}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className="mb-4">
            <label className={labelClasses}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={typeof value === 'string' ? value : ''}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              className={baseInputClasses}
            >
              <option value="">Seleccionar...</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => handleFieldChange(field, e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {field.label}
              </span>
            </label>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        );

      case 'file':
        return (
          <div key={field.name} className="mb-4">
            <label className={labelClasses}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {value ? (
              (() => {
                const fileValue = (value && typeof (value as File).name === 'string') ? (value as File) : null;
                return (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    {fileValue && fileValue.type.startsWith('image/') && (
                      <img
                        src={URL.createObjectURL(fileValue)}
                        alt="Preview"
                        className="w-full h-auto max-h-32 object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => handleFileChange(field, null)}
                      className={`absolute top-2 right-2 p-1 rounded-full ${
                        isDark ? 'bg-red-900/80 text-white hover:bg-red-900' : 'bg-red-500 text-white hover:bg-red-600'
                      } transition-colors`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs ${
                      isDark ? 'bg-slate-900/80 text-white' : 'bg-white/80 text-slate-700'
                    }`}>
                      {fileValue?.name} • {(fileValue ? (fileValue.size / 1024).toFixed(2) : '0')} KB
                    </div>
                  </div>
                );
              })()
            ) : (
              <div
                onClick={() => fileInputRefs.current[field.name]?.click()}
                className={`
                  border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                  ${isDark
                    ? 'border-slate-700 hover:border-blue-500 hover:bg-slate-800/30'
                    : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/50'
                  }
                `}
              >
                <Upload className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Click para seleccionar archivo
                </p>
                <input
                  ref={(el) => { fileInputRefs.current[field.name] = el; }}
                  type="file"
                  accept={field.accept}
                  className="hidden"
                  onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
                />
              </div>
            )}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        );

      case 'tags':
        const currentTags = Array.isArray(value) ? (value as string[]) : [];
        return (
          <div key={field.name} className="mb-4">
            <label className={labelClasses}>
              {field.label}
              <span className="float-right text-xs text-slate-500">
                ({currentTags.length}/{field.maxTags || 8})
              </span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                className={`${baseInputClasses} flex-1`}
                value={tagInputs[field.name] || ''}
                onChange={(e) => setTagInputs(prev => ({ ...prev, [field.name]: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd(field))}
                placeholder="Agregar etiqueta..."
                disabled={currentTags.length >= (field.maxTags || 8)}
              />
              <button
                type="button"
                onClick={() => handleTagAdd(field)}
                disabled={currentTags.length >= (field.maxTags || 8) || !tagInputs[field.name]?.trim()}
                className={`px-4 py-3 rounded-xl font-medium text-sm text-white transition-all ${
                  isDark
                    ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800'
                    : 'bg-blue-500 hover:bg-blue-600 disabled:bg-slate-200'
                }`}
              >
                <Tag className="w-4 h-4" />
              </button>
            </div>
            {currentTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentTags.map((tag: string) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                      isDark
                        ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(field, tag)}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        );

      case 'richtext':
        // For now, use textarea - could be enhanced with a rich text editor
        return (
          <div key={field.name} className="mb-4">
            <label className={labelClasses}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              value={typeof value === 'string' ? value : ''}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              minLength={field.minLength}
              rows={6}
              className={baseInputClasses}
            />
            <div className="flex justify-between mt-1">
              {field.helper && (
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {field.helper}
                </p>
              )}
              <p className={`text-xs ${
                (typeof value === 'string' ? value.length : 0) < (field.minLength || 0)
                  ? 'text-amber-500'
                  : (isDark ? 'text-slate-500' : 'text-slate-500')
              }`}>
                {typeof value === 'string' ? value.length : 0}/{field.maxLength || '∞'}
              </p>
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map(renderField)}

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting || !form.isValid}
          className={`
            px-6 py-3 rounded-xl font-medium text-sm text-white transition-all
            flex items-center gap-2
            ${isDark
              ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800'
              : 'bg-blue-500 hover:bg-blue-600 disabled:bg-slate-200'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:scale-105 active:scale-95
          `}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
