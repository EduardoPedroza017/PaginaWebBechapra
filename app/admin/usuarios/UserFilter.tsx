"use client";

import React, { useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import { Search, X } from "lucide-react";

interface UserFilterProps {
  value: string;
  onChange: (value: string) => void;
  theme?: 'light' | 'dark';
}

type FilterField = 'email' | 'role' | 'bloqueado';

export function UserFilter({ value, onChange, theme = 'light' }: UserFilterProps) {
  const [field, setField] = useState<FilterField>('email');
  const currentValue = value.split(':')[1] || '';

  const isDark = theme === 'dark';

  const handleInput = (val: string) => {
    onChange(`${field}:${val}`);
  };

  const handleField = (f: FilterField) => {
    setField(f);
    onChange(`${f}:${currentValue}`);
  };

  const clearFilter = () => {
    onChange('');
  };

  const fields = [
    { id: 'email' as const, label: 'Correo' },
    { id: 'role' as const, label: 'Rol' },
    { id: 'bloqueado' as const, label: 'Estado' },
  ];

  return (
    <div className={`mb-6 p-4 rounded-lg border ${
      isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
    }`}>
      <div className="flex flex-col md:flex-row gap-3">
        {/* Selector de campo */}
        <div className={`flex rounded-lg p-1 ${
          isDark ? 'bg-slate-900' : 'bg-slate-100'
        }`}>
          {fields.map((f) => (
            <button
              key={f.id}
              onClick={() => handleField(f.id)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                field === f.id
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 border border-slate-300'
                  : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TranslateText text={f.label} />
            </button>
          ))}
        </div>

        {/* Input de búsqueda */}
        <div className="flex-1 flex items-center gap-2">
          {field === 'bloqueado' ? (
            <div className="flex gap-2 flex-1">
              <button
                onClick={() => handleInput('')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium ${
                  currentValue === ''
                    ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                    : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <TranslateText text="Todos" />
              </button>
              <button
                onClick={() => handleInput('false')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium ${
                  currentValue === 'false'
                    ? isDark ? 'bg-green-600 text-white' : 'bg-green-600 text-white'
                    : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <TranslateText text="Activos" />
              </button>
              <button
                onClick={() => handleInput('true')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium ${
                  currentValue === 'true'
                    ? isDark ? 'bg-red-600 text-white' : 'bg-red-600 text-white'
                    : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <TranslateText text="Bloqueados" />
              </button>
            </div>
          ) : (
            <div className="relative flex-1">
              {field === 'role' ? (
                <select
                  className={`w-full pl-3 pr-10 py-2.5 rounded-lg border text-sm ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                  value={currentValue}
                  onChange={e => handleInput(e.target.value)}
                >
                  <option value="">Todos los roles</option>
                  <option value="superadmin">Super Admin</option>
                  <option value="admin">Administrador</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Lector</option>
                  <option value="moderator">Moderador</option>
                </select>
              ) : (
                <>
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`} />
                  <input
                    type="text"
                    placeholder={`Buscar por ${field === 'email' ? 'correo' : 'rol'}...`}
                    value={currentValue}
                    onChange={(e) => handleInput(e.target.value)}
                    className={`w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                    }`}
                  />
                  {currentValue && (
                    <button
                      onClick={clearFilter}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded ${
                        isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}