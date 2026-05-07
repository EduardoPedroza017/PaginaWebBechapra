"use client";

import React, { useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import { X } from "lucide-react";

interface UserFormProps {
  initial?: { email?: string; role?: string; roles?: string[]; active?: boolean };
  onSubmit: (data: { email: string; password?: string; roles?: string[]; active?: boolean }) => void;
  onClose: () => void;
  isEdit?: boolean;
  canManageRoles?: boolean;
  canAssignSuperadmin?: boolean;
}

export function UserFormModal({
  initial,
  onSubmit,
  onClose,
  isEdit,
  canManageRoles = false,
  canAssignSuperadmin = false,
}: UserFormProps) {
  const [email, setEmail] = useState(initial?.email || "");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState<string[]>(initial?.roles || (initial?.role ? [initial.role] : []));
  const [active, setActive] = useState<boolean>(initial?.active !== false);
  const [error, setError] = useState("");

  // Lista de roles disponibles
  const availableRoles = ["superadmin", "admin", "editor", "viewer", "moderator"];

  // Obtener rol del admin actual para limitar opciones
  const filteredRoles = availableRoles.filter(r => canAssignSuperadmin ? true : r !== 'superadmin');

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'superadmin': return 'Super Administrador';
      case 'admin': return 'Administrador';
      case 'editor': return 'Editor';
      case 'viewer': return 'Lector';
      case 'moderator': return 'Moderador';
      default: return role;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || (!isEdit && !password) || (roles.length === 0)) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    onSubmit({
      email,
      password: password || undefined,
      roles: roles,
      active,
    });
  };

  const handleAddRole = (val: string) => {
    if (!val) return;
    if (!roles.includes(val)) {
      if (val === 'superadmin' && !canAssignSuperadmin) return;
      setRoles([...roles, val]);
    }
  };

  const handleRemoveRole = (r: string) => {
    setRoles(roles.filter(x => x !== r));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <form
        className={`relative w-full max-w-md rounded-lg p-6 ${
          isEdit ? 'bg-white dark:bg-slate-900' : 'bg-white dark:bg-slate-900'
        }`}
        onSubmit={handleSubmit}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-4 right-4 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
          <TranslateText text={isEdit ? "Editar usuario" : "Agregar usuario"} />
        </h2>
        
        {error && (
          <div className="mb-4 p-2 rounded bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
            <TranslateText text={error} />
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            <TranslateText text="Correo electrónico" />
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isEdit}
            required
            placeholder="usuario@ejemplo.com"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            <TranslateText text="Contraseña" />
            {isEdit ? <span className="text-slate-500 dark:text-slate-400 text-xs"> (dejar vacío para no cambiar)</span> : ""}
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required={!isEdit}
            placeholder={isEdit ? "Nueva contraseña (opcional)" : "Contraseña"}
          />
        </div>

        {/* Active Status */}
        <div className="mb-6">
          <label className="inline-flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={active} 
              onChange={e => setActive(e.target.checked)} 
              className="w-4 h-4 text-blue-600 dark:text-blue-500"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              <TranslateText text="Usuario activo" />
            </span>
          </label>
        </div>

        {/* Roles */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <TranslateText text="Roles" />
          </label>
          
          {/* Selected Roles */}
          <div className="flex flex-wrap gap-2 mb-3">
            {roles.map(r => (
              <div 
                key={r}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm"
              >
                {getRoleDisplay(r)}
                <button 
                  type="button" 
                  className="ml-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
                  onClick={() => handleRemoveRole(r)}
                  disabled={!canManageRoles}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Role Selector */}
          <select
            className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            value=""
            onChange={e => {
              handleAddRole(e.target.value);
              e.target.value = "";
            }}
            disabled={!canManageRoles}
          >
            <option value="" disabled>
              <TranslateText text="Seleccionar rol" asOption={true} />
            </option>
            {filteredRoles
              .filter(r => !roles.includes(r))
              .map(r => (
                <option key={r} value={r}>
                  {getRoleDisplay(r)}
                </option>
              ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          <TranslateText text={isEdit ? "Guardar cambios" : "Agregar usuario"} />
        </button>
      </form>
    </div>
  );
}
