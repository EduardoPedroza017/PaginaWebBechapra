"use client";

import React, { useState } from "react";
import { Target, Eye, Heart, Save, X, Edit3, ChevronDown, ChevronUp } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface Essence {
  mision: string;
  vision: string;
  valores: string;
}

interface EssenceFormProps {
  essence: Essence;
  onSave: (essence: Essence) => Promise<void>;
  theme: 'light' | 'dark';
}

export default function EssenceForm({ essence, onSave, theme }: EssenceFormProps) {
  const [formData, setFormData] = useState<Essence>(essence);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);

  // Sync with parent essence when not editing
  React.useEffect(() => {
    if (!isEditing) {
      setFormData(essence);
    }
  }, [essence, isEditing]);

  const handleChange = (field: keyof Essence, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(formData);
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(essence);
    setIsEditing(false);
  };

  const fields = [
    { key: 'mision' as keyof Essence, label: 'Misión', icon: Target, placeholder: 'Define la misión de la organización...' },
    { key: 'vision' as keyof Essence, label: 'Visión', icon: Eye, placeholder: 'Define la visión de la organización...' },
    { key: 'valores' as keyof Essence, label: 'Valores', icon: Heart, placeholder: 'Define los valores de la organización...' },
  ];

  return (
    <div className={`rounded-2xl border overflow-hidden ${
      theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      {/* Header */}
      <div 
        className={`px-5 py-4 border-b flex items-center justify-between cursor-pointer ${
          theme === 'dark' ? 'border-gray-800 hover:bg-gray-800/50' : 'border-gray-100 hover:bg-gray-50'
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            theme === 'dark' ? 'bg-emerald-600/20' : 'bg-emerald-100'
          }`}>
            <Edit3 className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Editar Esencia Institucional" />
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Misión, visión y valores" />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
                setExpanded(true);
              }}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                theme === 'dark'
                  ? 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30'
                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              }`}
            >
              <TranslateText text="Editar" />
            </button>
          )}
          {expanded ? (
            <ChevronUp className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          ) : (
            <ChevronDown className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          )}
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {fields.map((field) => (
            <div key={field.key}>
              <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <field.icon className="w-4 h-4" />
                <TranslateText text={field.label} />
              </label>
              <textarea
                value={formData[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                disabled={!isEditing}
                rows={4}
                placeholder={field.placeholder}
                className={`w-full px-4 py-3 rounded-xl border transition-all resize-none ${
                  theme === 'dark'
                    ? `bg-gray-800 border-gray-700 text-white placeholder-gray-500 ${
                        isEditing ? 'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20' : 'opacity-80'
                      }`
                    : `bg-white border-gray-200 text-gray-900 placeholder-gray-400 ${
                        isEditing ? 'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20' : 'bg-gray-50'
                      }`
                }`}
              />
              {isEditing && (
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {formData[field.key].split(' ').filter(w => w).length} <TranslateText text="palabras" />
                </p>
              )}
            </div>
          ))}

          {/* Actions */}
          {isEditing && (
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <X className="w-4 h-4" />
                <TranslateText text="Cancelar" />
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 active:scale-[0.98]'
                } bg-emerald-600 text-white`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <TranslateText text="Guardando..." />
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <TranslateText text="Guardar Cambios" />
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
