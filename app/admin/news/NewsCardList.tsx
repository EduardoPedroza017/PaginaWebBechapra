import React from "react";
import { Eye, Edit, Trash2, Newspaper, Check, X } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import type { NewsItem } from "./types";
import { Switch } from "@headlessui/react";

interface NewsCardListProps {
  news: NewsItem[];
  theme: "light" | "dark";
  onEdit: (item: NewsItem) => void;
  onDelete: (item: NewsItem) => void;
  onPreview: (item: NewsItem) => void;
  onToggleStatus: (item: NewsItem) => void;
  togglingId?: string | null;
}

// Utility function for status badge styles
const getStatusBadgeStyles = (status: 'active' | 'inactive', theme: 'light' | 'dark') => {
  if (status === 'active') {
    return theme === 'dark'
      ? 'bg-green-500/90 text-white border-green-400'
      : 'bg-green-500 text-white border-green-600';
  }
  return theme === 'dark'
    ? 'bg-red-500/90 text-white border-red-400'
    : 'bg-red-500 text-white border-red-600';
};

// Action button component for consistency
const ActionButton = ({
  icon: Icon,
  label,
  onClick,
  variant = 'primary',
  theme
}: {
  icon: any;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'success' | 'danger';
  theme: 'light' | 'dark';
}) => {
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700',
    success: 'bg-green-500 hover:bg-green-600 active:bg-green-700',
    danger: 'bg-red-500 hover:bg-red-600 active:bg-red-700'
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-1.5 
        px-3 py-2 rounded-lg 
        text-white text-xs font-medium 
        transition-all duration-200
        ${variantStyles[variant]}
        hover:shadow-md active:scale-95
        md:flex-1
      `}
      title={label}
      aria-label={label}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export function NewsCardList({ news, theme, onEdit, onDelete, onPreview, onToggleStatus, togglingId }: NewsCardListProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-16">
        <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {news.map((item, idx) => (
        <div
          key={item._id || item.slug || `${item.title}-${idx}`}
          className={`
            group relative
            rounded-2xl shadow-lg border 
            flex flex-col overflow-hidden
            transition-all duration-300 
            hover:shadow-xl hover:-translate-y-1
            ${theme === "dark"
              ? "bg-gray-900/90 border-gray-800 hover:border-gray-700"
              : "bg-white border-gray-200 hover:border-gray-300"
            }
          `}
        >
          {/* Image with status badge overlay */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
            {item.image_url ? (
              <img
                src={item.image_url.startsWith('http')
                  ? item.image_url
                  : `${process.env.NEXT_PUBLIC_API_URL}${item.image_url}`
                }
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Newspaper className={`w-12 h-12 ${theme === "dark" ? "text-gray-700" : "text-gray-300"}`} />
              </div>
            )}

            {/* Status Switch */}
            <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
              <Switch
                checked={item.status === 'active'}
                onChange={() => onToggleStatus(item)}
                disabled={togglingId === (item._id || item.slug || item.title)}
                className={`${item.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  } relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="sr-only">Activar noticia</span>
                <span
                  className={`${item.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-5 w-5 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-4 gap-2">
            {/* Title */}
            <h2 className={`
              text-lg font-bold leading-tight line-clamp-2
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}>
              {item.title}
            </h2>

            {/* Subtitle */}
            {item.subtitle && (
              <p className={`
                text-sm font-medium line-clamp-1
                ${theme === "dark" ? "text-blue-400" : "text-blue-600"}
              `}>
                {item.subtitle}
              </p>
            )}

            {/* Date */}
            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {item.date ? new Date(item.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }) : ""}
            </p>

            {/* Description */}
            <div className="flex-1 min-h-[3rem]">
              <p className={`
                text-sm line-clamp-3 leading-relaxed
                ${theme === "dark" ? "text-gray-300" : "text-gray-600"}
              `}>
                {item.description}
              </p>
            </div>
          </div>

          {/* Actions footer */}
          <div className={`
            flex gap-2 p-4 pt-0
            border-t ${theme === "dark" ? "border-gray-800" : "border-gray-100"}
          `}>
            <ActionButton
              icon={Eye}
              label="Ver"
              onClick={() => onPreview(item)}
              variant="success"
              theme={theme}
            />
            <ActionButton
              icon={Edit}
              label="Editar"
              onClick={() => onEdit(item)}
              variant="primary"
              theme={theme}
            />
            <ActionButton
              icon={Trash2}
              label="Eliminar"
              onClick={() => onDelete(item)}
              variant="danger"
              theme={theme}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
