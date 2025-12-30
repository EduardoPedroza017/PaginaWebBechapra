"use client";

import { useState, useEffect } from "react";
import { Search, X, Filter, Download, FilterX, ChevronDown } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface Props {
  messages: ContactMessage[];
  onFilter: (filtered: ContactMessage[]) => void;
  theme: 'light' | 'dark';
}

export default function ContactFilter({ messages, onFilter, theme }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    let count = 0;
    if (name.trim()) count++;
    if (email.trim()) count++;
    if (date) count++;
    setFilterCount(count);
  }, [name, email, date]);

  function handleFilter() {
    let filtered = messages;
    if (name.trim()) filtered = filtered.filter(m => m.name.toLowerCase().includes(name.toLowerCase()));
    if (email.trim()) filtered = filtered.filter(m => m.email.toLowerCase().includes(email.toLowerCase()));
    if (date) filtered = filtered.filter(m => m.timestamp.startsWith(date));
    onFilter(filtered);
  }

  function clearFilters() {
    setName("");
    setEmail("");
    setDate("");
    onFilter(messages);
  }

  function exportToCSV() {
    const headers = ["Nombre", "Email", "Mensaje", "Fecha"];
    const csvContent = [
      headers.join(","),
      ...messages.map(msg => [
        `"${msg.name.replace(/"/g, '""')}"`,
        msg.email,
        `"${msg.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        new Date(msg.timestamp).toISOString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `contactos_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const inputClass = `w-full rounded-xl border px-4 py-3 text-sm transition-all focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 ${
    theme === 'dark' 
      ? 'bg-gray-800 text-white border-gray-700 placeholder:text-gray-500 hover:border-gray-600' 
      : 'bg-white text-gray-900 border-gray-200 placeholder:text-gray-400 hover:border-gray-300'
  }`;

  const labelClass = `block text-xs font-semibold mb-2 ${
    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <div className={`rounded-2xl overflow-hidden transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800' 
        : 'bg-gradient-to-br from-white to-blue-50/50 border-gray-100 shadow-sm'
    } border`}>
      {/* Header */}
      <div className={`p-5 border-b ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              theme === 'dark' 
                ? 'bg-purple-600/20 text-purple-400' 
                : 'bg-purple-100 text-purple-600'
            }`}>
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-bold text-lg ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <TranslateText text="Filtrar Mensajes" />
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <TranslateText text="Busca y filtra contactos específicos" />
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {filterCount > 0 && (
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                theme === 'dark' 
                  ? 'bg-blue-600/20 text-blue-400' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {filterCount} filtro{filterCount !== 1 ? 's' : ''}
              </span>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'hover:bg-gray-800 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className={`p-5 transition-all duration-300 ${showFilters ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="space-y-2">
            <label className={labelClass}>
              <TranslateText text="Buscar por Nombre" />
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  setTimeout(handleFilter, 100);
                }}
                className={`${inputClass} pl-11`}
                placeholder="Ej: Juan Pérez"
              />
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                <Search className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className={labelClass}>
              <TranslateText text="Buscar por Email" />
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setTimeout(handleFilter, 100);
                }}
                className={`${inputClass} pl-11`}
                placeholder="ejemplo@email.com"
              />
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className={labelClass}>
              <TranslateText text="Filtrar por Fecha" />
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={e => {
                  setDate(e.target.value);
                  setTimeout(handleFilter, 0);
                }}
                className={`${inputClass} pl-11`}
              />
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className={`${labelClass} opacity-0`}>Acciones</label>
            <div className="flex items-end gap-2 h-full">
              <button
                type="button"
                onClick={handleFilter}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 active:scale-95 shadow-sm hover:shadow"
              >
                <Search className="w-4 h-4" />
                <TranslateText text="Aplicar Filtros" />
              </button>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className={`mt-6 pt-5 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {filterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6',
                    color: theme === 'dark' ? '#9ca3af' : '#6b7280'
                  }}
                >
                  <FilterX className="w-4 h-4" />
                  <TranslateText text="Limpiar Filtros" />
                </button>
              )}
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <TranslateText text="Filtro en tiempo real" /> • {messages.length} mensajes
              </div>
            </div>
            
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
              style={{
                backgroundColor: theme === 'dark' ? '#05966920' : '#10b98110',
                color: theme === 'dark' ? '#34d399' : '#059669'
              }}
            >
              <Download className="w-4 h-4" />
              <TranslateText text="Exportar CSV" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}