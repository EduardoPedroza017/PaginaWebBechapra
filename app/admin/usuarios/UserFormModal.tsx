import React, { useState } from "react";
import { TranslateText } from "@/components/TranslateText";

interface UserFormProps {
  initial?: { email?: string; role?: string; roles?: string[]; permissions?: string[] };
  onSubmit: (data: { email: string; password?: string; role?: string; roles?: string[]; permissions?: string[] }) => void;
  onClose: () => void;
  isEdit?: boolean;
}


export function UserFormModal({ initial, onSubmit, onClose, isEdit }: UserFormProps) {
    // Lista de permisos sugeridos (modifica según tu sistema)
    // Permisos con traducción para mostrar en español
    const permissionLabels: Record<string, string> = {
      read: "Leer",
      write: "Escribir",
      delete: "Eliminar",
      export: "Exportar",
      manage_users: "Gestionar usuarios",
      manage_roles: "Gestionar roles",
      view_audit: "Ver auditoría",
      block_user: "Bloquear usuario"
    };
    const availablePermissions = Object.keys(permissionLabels);
  const [email, setEmail] = useState(initial?.email || "");
  const [password, setPassword] = useState("");
  // Removed unused setRole
  const [role] = useState(initial?.role || "admin");
  const [roles, setRoles] = useState<string[]>(initial?.roles || (initial?.role ? [initial.role] : []));
  const [permissions, setPermissions] = useState<string[]>(initial?.permissions || []);
  const [active, setActive] = useState<boolean>(initial?.active !== false);
  const [permInput, setPermInput] = useState("");
  const [error, setError] = useState("");

  // Lista de roles disponibles (puedes modificar según tu sistema)
  const availableRoles = [
    "superadmin",
    "admin",
    "editor",
    "viewer",
    "moderator"
  ];

  // obtener rol del admin actual para limitar opciones
  const currentAdminRole = (typeof window !== 'undefined') ? (sessionStorage.getItem('role') || '') : '';
  const isSuperAdmin = currentAdminRole === 'superadmin';
  const filteredRoles = availableRoles.filter(r => isSuperAdmin ? true : r !== 'superadmin');

  // Map default permissions per role (frontend mirror)
  const ROLE_PERMISSIONS: Record<string, string[]> = {
    superadmin: ['read','write','delete','export','manage_users','manage_roles','view_audit','block_user'],
    admin: ['read','write','manage_users','view_audit','block_user'],
    editor: ['read','write'],
    viewer: ['read'],
    moderator: ['read','block_user']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || (!isEdit && !password) || (roles.length === 0)) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    // Si solo hay un rol y no hay roles múltiples, envía como string para compatibilidad
    onSubmit({
      email,
      password: password || undefined,
      roles: roles,
      permissions: permissions.length > 0 ? permissions : undefined,
      active,
    });
  };

  const handleAddRole = (val: string) => {
    if (!val) return;
    if (!roles.includes(val)) {
      // only allow adding superadmin if current user is superadmin
      if (val === 'superadmin' && !isSuperAdmin) return;
      const next = [...roles, val];
      setRoles(next);
      // Asignar permisos automáticamente según el rol
      const perms = new Set<string>();
      next.forEach(r => ROLE_PERMISSIONS[r]?.forEach(p => perms.add(p)));
      setPermissions(Array.from(perms));
    }
  };
  const handleRemoveRole = (r: string) => {
    const next = roles.filter(x => x !== r);
    setRoles(next);
    // Actualizar permisos automáticamente
    const perms = new Set<string>();
    next.forEach(role => ROLE_PERMISSIONS[role]?.forEach(p => perms.add(p)));
    setPermissions(Array.from(perms));
  };

  const handleAddPerm = (val?: string) => {
    const value = (val !== undefined ? val : permInput).trim();
    if (!value) return;
    // Si hay roles seleccionados, al elegir un permiso, asignar todos los permisos por defecto de ese rol
    if (roles.length === 1 && availableRoles.includes(roles[0])) {
      setPermissions(ROLE_PERMISSIONS[roles[0]]);
    } else if (!permissions.includes(value)) {
      setPermissions([...permissions, value]);
    }
    setPermInput("");
  };
  const handleRemovePerm = (p: string) => setPermissions(permissions.filter(x => x !== p));

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Cerrar fondo modal"
        tabIndex={-1}
        style={{ cursor: 'pointer' }}
      />
      <form
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative z-10"
        onSubmit={handleSubmit}
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">
          <TranslateText text={isEdit ? "Editar usuario" : "Agregar usuario"} />
        </h2>
        {error && <div className="text-red-500 mb-2"><TranslateText text={error} /></div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium"><TranslateText text="Correo electrónico" /></label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-700"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isEdit}
            required
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm"><TranslateText text="Activo" /></span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            <TranslateText text="Contraseña" />
            {isEdit ? <TranslateText text=" (dejar vacío para no cambiar)" /> : ""}
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-700"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required={!isEdit}
            placeholder={isEdit ? "Nueva contraseña (opcional)" : "Contraseña"}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium"><TranslateText text="Roles" /></label>
          <div className="flex flex-wrap gap-1 mb-2">
            {roles.map(r => (
              <span key={r} className="inline-flex items-center bg-blue-100 text-blue-800 rounded px-2 py-0.5 text-xs mr-1">
                {r === 'superadmin' ? 'Super Administrador' :
                 r === 'admin' ? 'Administrador' :
                 r === 'editor' ? 'Editor' :
                 r === 'viewer' ? 'Lector' :
                 r === 'moderator' ? 'Moderador' : r}
                <button type="button" className="ml-1 text-red-500 hover:text-red-700" onClick={() => handleRemoveRole(r)} title={undefined} aria-label="Quitar" disabled={!isSuperAdmin}>
                  <span className="sr-only"><TranslateText text="Quitar" /></span>×
                </button>
              </span>
            ))}
            <select
              className="border px-1 py-0.5 rounded text-xs w-32 bg-white text-gray-900 dark:bg-gray-900 dark:text-white focus:outline-none"
              value=""
              onChange={e => {
                handleAddRole(e.target.value);
              }}
              disabled={!isSuperAdmin}
            >
              <option value="" disabled className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white"><TranslateText text="Seleccionar rol" asOption={true} /></option>
                {availableRoles.filter(r => !roles.includes(r)).map(r => (
                  <option key={r} value={r} className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
                    {r === 'superadmin' ? 'Super Administrador' :
                     r === 'admin' ? 'Administrador' :
                     r === 'editor' ? 'Editor' :
                     r === 'viewer' ? 'Lector' :
                     r === 'moderator' ? 'Moderador' : r}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium"><TranslateText text="Permisos" /></label>
          <div className="flex flex-wrap gap-1 mb-2">
            {permissions.map(p => (
              <span key={p} className="inline-flex items-center bg-green-600/90 text-white rounded px-2 py-0.5 text-xs mr-1 shadow">
                {permissionLabels[p] || p}
                <button type="button" className="ml-1 text-red-200 hover:text-red-400" onClick={() => handleRemovePerm(p)} title={undefined} aria-label="Quitar">
                  <span className="sr-only"><TranslateText text="Quitar" /></span>×
                </button>
              </span>
            ))}
            <select
              className="border px-1 py-0.5 rounded text-xs w-32 bg-white text-gray-900 dark:bg-gray-900 dark:text-white focus:outline-none"
              value=""
              onChange={e => {
                handleAddPerm(e.target.value);
              }}
              disabled={roles.length > 0 && !isSuperAdmin}
            >
                <option value="" disabled className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white"><TranslateText text="Seleccionar permiso" asOption={true} /></option>
                {availablePermissions.filter(p => !permissions.includes(p)).map(p => (
                  <option key={p} value={p} className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">{permissionLabels[p] || p}</option>
                ))}
            </select>
            <input
              className="border px-1 py-0.5 rounded text-xs w-24 bg-white dark:bg-gray-800"
              value={permInput}
              onChange={e => setPermInput(e.target.value)}
              onBlur={() => handleAddPerm()}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAddPerm(); } }}
              placeholder="Agregar permiso"
              disabled={roles.length > 0 && !isSuperAdmin}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors"
        >
          <TranslateText text={isEdit ? "Guardar cambios" : "Agregar usuario"} />
        </button>
      </form>
    </div>
  );
}
