"use client";

import React, { useState } from "react";
import { LayoutTemplate, X, Check } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { getTemplateList, getTemplate } from "./templates";
import type { OrganigramaNode } from "./OrganigramaAPI";

interface Props {
  onSelectTemplate: (structure: OrganigramaNode[]) => void;
  theme?: 'light' | 'dark';
  isOpen: boolean;
  onClose: () => void;
}

export function TemplateSelector({ onSelectTemplate, theme = 'light', isOpen, onClose }: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const templates = getTemplateList();

  const handleApply = () => {
    if (selectedTemplate) {
      const structure = getTemplate(selectedTemplate);
      if (structure) {
        onSelectTemplate(structure);
        setSelectedTemplate(null);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative rounded-2xl border overflow-hidden shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto transition-all ${
          theme === 'dark'
            ? 'bg-gray-900/95 border-gray-700/50'
            : 'bg-white/95 border-white/20'
        }`}
      >
        {/* Header */}
        <div
          className={`sticky top-0 px-6 py-4 border-b flex items-center justify-between backdrop-blur-xl ${
            theme === 'dark'
              ? 'border-gray-700/50 bg-gradient-to-r from-blue-600/10 to-purple-600/10'
              : 'border-blue-100/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-blue-600/40 to-purple-600/40 shadow-lg shadow-blue-500/20'
                  : 'bg-gradient-to-br from-blue-100 to-purple-100 shadow-md shadow-blue-200/50'
              }`}
            >
              <LayoutTemplate className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} />
            </div>
            <div>
              <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Plantillas de Organigrama" />
              </h2>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Elige una estructura predefinida para comenzar" />
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'hover:bg-gray-800'
                : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedTemplate === template.id
                  ? theme === 'dark'
                    ? 'border-emerald-500/60 bg-emerald-900/20'
                    : 'border-emerald-400 bg-emerald-50'
                  : theme === 'dark'
                  ? 'border-gray-700/50 bg-gray-800/50 hover:border-gray-600'
                  : 'border-gray-200/50 bg-gray-50/50 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {template.name}
                  </h3>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {template.description}
                  </p>
                </div>
                {selectedTemplate === template.id && (
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    theme === 'dark'
                      ? 'bg-emerald-600/40'
                      : 'bg-emerald-100'
                  }`}>
                    <Check className={`w-4 h-4 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`sticky bottom-0 px-6 py-4 border-t flex items-center justify-end gap-3 backdrop-blur-xl ${
            theme === 'dark'
              ? 'border-gray-700/50 bg-gray-900/80'
              : 'bg-white/80'
          }`}
        >
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <TranslateText text="Cancelar" />
          </button>
          <button
            onClick={handleApply}
            disabled={!selectedTemplate}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedTemplate
                ? theme === 'dark'
                  ? 'bg-emerald-600/40 text-emerald-300 hover:bg-emerald-600/50'
                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Check className="w-4 h-4" />
            <TranslateText text="Aplicar" />
          </button>
        </div>
      </div>
    </div>
  );
}
