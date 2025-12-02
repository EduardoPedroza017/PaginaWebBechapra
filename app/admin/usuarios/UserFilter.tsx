import React, { useState } from "react";
import { Search } from "lucide-react";

interface UserFilterProps {
  value: string;
  onChange: (value: string) => void;
}

type FilterField = 'email' | 'role' | 'permission' | 'bloqueado';

export function UserFilter({ value, onChange }: UserFilterProps) {
  // Detectar modo oscuro
  const isDark = typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false;
  const [field, setField] = useState<FilterField>('email');

  // Notifica el filtro combinado en tiempo real
  const handleInput = (val: string) => {
    onChange(`${field}:${val}`);
  };

  const handleField = (f: FilterField) => {
    setField(f);
    onChange(`${f}:${value.split(':')[1] || ''}`);
  };

  return (
    <div
      className={`mb-4 flex items-center gap-2 rounded-lg px-3 py-2 shadow border transition-colors duration-150
        ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}
        ${value ? 'ring-2 ring-blue-400' : ''}`}
    >
      <Search className={isDark ? 'text-blue-300' : 'text-blue-600'} size={20} />
      <select
        value={field}
        onChange={e => handleField(e.target.value as FilterField)}
        className={`px-2 py-2 rounded border-none font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 ${isDark ? 'bg-gray-800 text-white' : 'bg-blue-50 text-gray-900'}`}
      >
        <option value="email">Correo</option>
        <option value="role">Rol</option>
        <option value="permission">Permiso</option>
        <option value="bloqueado">Bloqueado</option>
      </select>
      {field === 'bloqueado' ? (
        <select
          value={value.split(':')[1] || ''}
          onChange={e => handleInput(e.target.value)}
          className={`flex-1 px-3 py-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-400
            ${isDark ? 'bg-gray-800 text-white' : 'bg-blue-50 text-gray-900'}`}
        >
          <option value="">Todos</option>
          <option value="true">Bloqueado</option>
          <option value="false">No bloqueado</option>
        </select>
      ) : (
        <input
          type="text"
          className={`flex-1 px-3 py-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-400
            ${isDark ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-blue-50 text-gray-900 placeholder-gray-500'}`}
          placeholder={
            field === 'email' ? 'Buscar por correo...'
            : field === 'role' ? 'Buscar por rol...'
            : field === 'permission' ? 'Buscar por permiso...'
            : ''
          }
          value={value.split(':')[1] || ''}
          onChange={e => handleInput(e.target.value)}
        />
      )}
    </div>
  );
}
