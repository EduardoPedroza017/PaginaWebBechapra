import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import type { NewsItem } from "./NewsFilter";

interface NewsPreviewModalProps {
  open: boolean;
  onClose: () => void;
  news: NewsItem | null;
  theme: "light" | "dark";
}

export default function NewsPreviewModal({ open, onClose, news, theme }: NewsPreviewModalProps) {
  if (!news) return null;
  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-2xl w-full mx-auto p-6 sm:p-10 z-10`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
          {news.image_url && (
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-4">
              <img
                src={news.image_url.startsWith('http') ? news.image_url : `http://localhost:5000${news.image_url}`}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h2 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{news.title}</h2>
          <p className={`text-lg font-medium mb-2 ${theme === "dark" ? "text-blue-400" : "text-blue-700"}`}>{news.subtitle}</p>
          <p className={`text-xs mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{news.date ? new Date(news.date).toLocaleString() : ""}</p>
          <div className={`prose max-w-none ${theme === "dark" ? "prose-invert" : ""}`}
            dangerouslySetInnerHTML={{ __html: news.description }}
          />
        </div>
      </div>
    </Dialog>
  );
}
