"use client";

import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

export interface NewsItem {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image_url?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  altText?: string;
  author?: string;
}

interface Props {
  news: NewsItem[];
  onFilter: (filtered: NewsItem[]) => void;
  theme: 'light' | 'dark';
}

export default function NewsFilter({ news, onFilter, theme }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const hasFilters = title || date;

  function handleFilter() {
    let filtered = news;
    if (title.trim()) filtered = filtered.filter(n => n.title.toLowerCase().includes(title.toLowerCase()));
    if (date) filtered = filtered.filter(n => n.date.startsWith(date));
    onFilter(filtered);
  }

  function clearFilters() {
    setTitle("");
    setDate("");
    onFilter(news);
  }

  const inputClass = `w-full rounded-xl border px-4 py-2.5 text-sm transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
    theme === 'dark' 
      ? 'bg-gray-800 text-white border-gray-700 placeholder:text-gray-500' 
      : 'bg-white text-gray-900 border-gray-200 placeholder:text-gray-400'
  }`;

  const labelClass = `block text-xs font-semibold mb-1.5 ${
    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
  }`;

  return (
    <div className={`rounded-2xl p-4 border ${
      theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <Filter className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <TranslateText text="Filtros" />
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}><TranslateText text="Título" /></label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyUp={handleFilter}
            className={inputClass}
            placeholder="Buscar título..."
          />
        </div>
        <div>
          <label className={labelClass}><TranslateText text="Fecha" /></label>
          <input
            type="date"
            value={date}
            onChange={e => { setDate(e.target.value); setTimeout(handleFilter, 0); }}
            className={inputClass}
          />
        </div>
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={handleFilter}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
          >
            <Search className="w-4 h-4" />
            <TranslateText text="Buscar" />
          </button>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className={`p-2.5 rounded-xl transition-all active:scale-95 ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Limpiar filtros"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
