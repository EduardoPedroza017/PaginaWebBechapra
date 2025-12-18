"use client";

import React from "react";
import { FileText, Calendar, Eye, Pencil, Trash2 } from "lucide-react";
import { PressItem } from "./page";
import { TranslateText } from "@/components/TranslateText";

interface PressCardListProps {
  data: PressItem[];
  theme: "light" | "dark";
  onEdit: (item: PressItem) => void;
  onDelete: (item: PressItem) => void;
  onPreview: (item: PressItem) => void;
}

export function PressCardList({ data, theme, onEdit, onDelete, onPreview }: PressCardListProps) {
  if (!data.length) {
    return (
      <div className="text-center py-12">
        <FileText className="w-10 h-10 mx-auto mb-3 text-gray-400" />
        <p className="text-lg font-medium text-gray-500">
          <TranslateText text="No hay comunicados de prensa" />
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <div
          key={item.id}
          className={`relative rounded-2xl shadow-lg border transition-all flex flex-col h-full ${
            theme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-100"
          }`}
        >
          {/* Imagen destacada si es imagen, ícono si es PDF/otro */}
          {item.file_url && (
            <a
              href={`http://localhost:5000${item.file_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full aspect-video rounded-t-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >
              {/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(item.file_url) ? (
                <img
                  src={`http://localhost:5000${item.file_url}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FileText className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              )}
            </a>
          )}
          <div className="flex-1 flex flex-col p-5">
            <h3 className={`font-bold text-lg mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
            <div className={`flex items-center gap-2 text-xs mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              <Calendar className="w-4 h-4" />
              {new Date(item.date).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
            </div>
            <p className={`text-sm mb-4 line-clamp-3 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{item.excerpt}</p>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => onPreview(item)}
                className={`p-2 rounded-lg flex items-center gap-1 text-xs font-medium transition-all active:scale-95 ${
                  theme === "dark"
                    ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
                title="Ver"
              >
                <Eye className="w-4 h-4" /> <TranslateText text="Ver" />
              </button>
              <button
                onClick={() => onEdit(item)}
                className={`p-2 rounded-lg flex items-center gap-1 text-xs font-medium transition-all active:scale-95 ${
                  theme === "dark"
                    ? "bg-amber-600/20 text-amber-400 hover:bg-amber-600/30"
                    : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                }`}
                title="Editar"
              >
                <Pencil className="w-4 h-4" /> <TranslateText text="Editar" />
              </button>
              <button
                onClick={() => onDelete(item)}
                className={`p-2 rounded-lg flex items-center gap-1 text-xs font-medium transition-all active:scale-95 ${
                  theme === "dark"
                    ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" /> <TranslateText text="Eliminar" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
