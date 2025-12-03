"use client";

import { useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import { Search, Filter, X } from "lucide-react";

interface UserFilterProps {
  value: string;
  onChange: (value: string) => void;
  theme?: 'light' | 'dark';
}

type FilterField = 'email' | 'role' | 'permission' | 'bloqueado';

export function UserFilter({ value, onChange, theme = 'light' }: UserFilterProps) {
  const [field, setField] = useState<FilterField>('email');
  const currentValue = value.split(':')[1] || '';

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
    { id: 'permission' as const, label: 'Permiso' },
    { id: 'bloqueado' as const, label: 'Estado' },
  ];

  return (
    <div className={`mb-6 p-4 rounded-2xl border ${
      theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Selector de campo */}
        <div className={`flex rounded-xl p-1 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
        }`}>
          {fields.map((f) => (
            <button
              key={f.id}
              onClick={() => handleField(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                field === f.id
                  ? theme === 'dark'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 shadow-sm'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
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
                className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  currentValue === ''
                    ? 'bg-blue-600 text-white'
                    : theme === 'dark' ? 'bg-gray-900 text-gray-300 hover:bg-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <TranslateText text="Todos" />
              </button>
              <button
                onClick={() => handleInput('false')}
                className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  currentValue === 'false'
                    ? 'bg-green-600 text-white'
                    : theme === 'dark' ? 'bg-gray-900 text-gray-300 hover:bg-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <TranslateText text="Activos" />
              </button>
              <button
                onClick={() => handleInput('true')}
                className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  currentValue === 'true'
                    ? 'bg-red-600 text-white'
                    : theme === 'dark' ? 'bg-gray-900 text-gray-300 hover:bg-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <TranslateText text="Bloqueados" />
              </button>
            </div>
          ) : (
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder={`Buscar por ${field}...`}
                value={currentValue}
                onChange={(e) => handleInput(e.target.value)}
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              {currentValue && (
                <button
                  onClick={clearFilter}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
