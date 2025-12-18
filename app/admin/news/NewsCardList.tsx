import React from "react";
// import Link from "next/link";
import { Newspaper, Edit, Trash2 } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

import type { NewsItem } from "./NewsFilter";

interface NewsCardListProps {
  news: NewsItem[];
  theme: "light" | "dark";
  onEdit: (item: NewsItem) => void;
  onDelete: (item: NewsItem) => void;
  onPreview: (item: NewsItem) => void;
}

export function NewsCardList({ news, theme, onEdit, onDelete, onPreview }: NewsCardListProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-16">
        <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
          <Newspaper className={`w-10 h-10 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
        </div>
        <p className={`text-base font-medium mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <TranslateText text="No hay noticias" />
        </p>
        <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
          <TranslateText text="Agrega tu primera noticia para comenzar" />
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {news.map((item, idx) => (
        <div
          key={item.title + idx}
          className={`rounded-2xl shadow-lg border flex flex-col transition-all duration-300 hover:scale-[1.02] ${
            theme === "dark" ? "bg-gray-900/80 border-gray-800" : "bg-white border-gray-100"
          }`}
        >
          {item.image_url && (
            <div className="aspect-[16/9] w-full relative rounded-t-2xl overflow-hidden">
              <img
                src={item.image_url.startsWith('http') ? item.image_url : `http://localhost:5000${item.image_url}`}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex-1 flex flex-col p-4 gap-2">
            <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{item.title}</h2>
            <p className={`text-sm font-medium ${theme === "dark" ? "text-blue-400" : "text-blue-700"}`}>{item.subtitle}</p>
            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{item.date ? new Date(item.date).toLocaleString() : ""}</p>
            <div className="flex-1">
              <p className={`text-sm line-clamp-3 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{item.description}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onPreview(item)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 transition-all"
                title="Previsualizar"
              >
                <Newspaper className="w-4 h-4" /> <span>Ver</span>
              </button>
              <button
                onClick={() => onEdit(item)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-all"
                title="Editar"
              >
                <Edit className="w-4 h-4" /> <span>Editar</span>
              </button>
              <button
                onClick={() => onDelete(item)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-all"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" /> <span>Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
