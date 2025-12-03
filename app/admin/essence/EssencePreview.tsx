"use client";

import React from "react";
import { Target, Eye, Heart, ExternalLink } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface Essence {
  mision: string;
  vision: string;
  valores: string;
}

interface EssencePreviewProps {
  essence: Essence;
  theme: 'light' | 'dark';
}

export default function EssencePreview({ essence, theme }: EssencePreviewProps) {
  const sections = [
    {
      key: 'mision',
      label: 'Misión',
      icon: Target,
      content: essence.mision,
      color: theme === 'dark' ? 'from-emerald-600/20 to-emerald-600/5' : 'from-emerald-50 to-emerald-100/50',
      iconBg: theme === 'dark' ? 'bg-emerald-600/30' : 'bg-emerald-100',
      iconColor: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
      borderColor: theme === 'dark' ? 'border-emerald-600/30' : 'border-emerald-200',
    },
    {
      key: 'vision',
      label: 'Visión',
      icon: Eye,
      content: essence.vision,
      color: theme === 'dark' ? 'from-blue-600/20 to-blue-600/5' : 'from-blue-50 to-blue-100/50',
      iconBg: theme === 'dark' ? 'bg-blue-600/30' : 'bg-blue-100',
      iconColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      borderColor: theme === 'dark' ? 'border-blue-600/30' : 'border-blue-200',
    },
    {
      key: 'valores',
      label: 'Valores',
      icon: Heart,
      content: essence.valores,
      color: theme === 'dark' ? 'from-purple-600/20 to-purple-600/5' : 'from-purple-50 to-purple-100/50',
      iconBg: theme === 'dark' ? 'bg-purple-600/30' : 'bg-purple-100',
      iconColor: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
      borderColor: theme === 'dark' ? 'border-purple-600/30' : 'border-purple-200',
    },
  ];

  return (
    <div className={`rounded-2xl border overflow-hidden ${
      theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      {/* Header */}
      <div className={`px-5 py-4 border-b flex items-center justify-between ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
          }`}>
            <ExternalLink className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Vista Previa" />
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Así se verá en la web pública" />
            </p>
          </div>
        </div>
      </div>

      {/* Preview Cards */}
      <div className="p-5 space-y-4">
        {sections.map((section) => (
          <div 
            key={section.key}
            className={`rounded-xl p-4 border bg-gradient-to-br ${section.color} ${section.borderColor}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${section.iconBg}`}>
                <section.icon className={`w-4 h-4 ${section.iconColor}`} />
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text={section.label} />
                </h4>
                {section.content ? (
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {section.content}
                  </p>
                ) : (
                  <p className={`text-sm italic ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    <TranslateText text="Sin contenido definido" />
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
