import React from "react";
import { Dialog } from "@headlessui/react";
import { X, Calendar, Edit, ArrowLeft } from "lucide-react";
import type { NewsItem } from "./types";
import { TranslateText } from "@/components/TranslateText";

interface NewsPreviewModalProps {
  open: boolean;
  onClose: () => void;
  onEdit?: (item: NewsItem) => void;
  news: NewsItem | null;
  theme: "light" | "dark";
}

export default function NewsPreviewModal({ open, onClose, onEdit, news, theme }: NewsPreviewModalProps) {
  if (!news) return null;
  
  const isDark = theme === "dark";

  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-0 sm:p-4">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
        
        <div className={`
          relative w-full max-w-4xl mx-auto 
          bg-white dark:bg-gray-900 
          sm:rounded-2xl shadow-2xl 
          flex flex-col overflow-hidden
          max-h-[90vh] z-10
        `}>
          
          {/* Header Actions */}
          <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
            <button
              onClick={onClose}
              className="pointer-events-auto p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-md"
              title="Cerrar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(news);
                }}
                className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg font-medium text-sm backdrop-blur-md"
              >
                <Edit className="w-4 h-4" />
                <TranslateText text="Editar Noticia" />
              </button>
            )}
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 custom-scrollbar">
            {/* Hero Image */}
            <div className="relative w-full aspect-[21/9] sm:aspect-[2/1] bg-gray-200 dark:bg-gray-800">
              {news.image_url ? (
                <img
                  src={news.image_url.startsWith('http') ? news.image_url : `${process.env.NEXT_PUBLIC_API_URL}${news.image_url}`}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="text-white text-4xl font-bold opacity-30">News Preview</span>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="max-w-3xl mx-auto">
                  {news.category && (
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-white uppercase bg-blue-600 rounded-full">
                      {news.category}
                    </span>
                  )}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                    {news.title}
                  </h1>
                  {news.subtitle && (
                    <p className="text-lg text-gray-200 font-medium leading-snug">
                      {news.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="p-6 sm:p-10 max-w-3xl mx-auto">
              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {news.date 
                      ? new Date(news.date).toLocaleDateString('es-ES', { 
                          year: 'numeric', month: 'long', day: 'numeric' 
                        }) 
                      : "Fecha no disponible"
                    }
                  </span>
                </div>
                {news.tags && news.tags.length > 0 && (
                  <div className="flex gap-2">
                    {news.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* HTML Content */}
              <div className={`
                prose prose-lg max-w-none
                ${isDark ? "prose-invert" : "prose-gray"}
                prose-headings:font-bold prose-headings:tracking-tight
                prose-p:leading-relaxed prose-p:text-gray-600 dark:prose-p:text-gray-300
                prose-a:text-blue-600 dark:prose-a:text-blue-400
                prose-img:rounded-xl prose-img:shadow-lg
              `}
                dangerouslySetInnerHTML={{ __html: news.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
