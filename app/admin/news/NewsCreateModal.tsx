"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { NewsItem } from "./types";
import { NewsWizardForm } from "./NewsWizardForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (news: NewsItem) => void;
  theme: 'light' | 'dark';
}

export default function NewsCreateModal({ open, onClose, onCreated, theme }: Props) {
  useEffect(() => {
    // no-op
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-auto">
      <div className={`w-full max-w-5xl rounded-2xl shadow-2xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`}>
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Crear Noticia" />
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <span className="sr-only">Cerrar</span>
            ✕
          </button>
        </div>

        <div className="p-6">
          <NewsWizardForm
            isOpen={true}
            onClose={() => { onClose(); }}
            onCreated={(news) => { onCreated(news as NewsItem); onClose(); }}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}
