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
    const availablePermissions = [
      "read",
      "write",
      "delete",
      "export",
      "manage_users",
      "manage_roles",
      "view_audit",
      "block_user"
    ];
  const [email, setEmail] = useState(initial?.email || "");
  const [password, setPassword] = useState("");
  // Removed unused setRole
  const [role] = useState(initial?.role || "admin");
  const [roles, setRoles] = useState<string[]>(initial?.roles || (initial?.role ? [initial.role] : []));
  const [permissions, setPermissions] = useState<string[]>(initial?.permissions || []);
  const [permInput, setPermInput] = useState("");
  const [error, setError] = useState("");

  // Lista de roles disponibles (puedes modificar según tu sistema)
  const availableRoles = [
    "superadmin",
    "admin",
    "editor",
    "viewer",
    "moderator",
    "user"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || (!isEdit && !password) || (roles.length === 0 && !role)) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    // Si solo hay un rol y no hay roles múltiples, envía como string para compatibilidad
    onSubmit({
      email,
      password: password || undefined,
      role: roles.length === 1 ? roles[0] : undefined,
      roles: roles.length > 1 ? roles : undefined,
      permissions: permissions.length > 0 ? permissions : undefined,
    });
  };

  const handleAddRole = (val: string) => {
    if (val && !roles.includes(val)) setRoles([...roles, val]);
  };
  const handleRemoveRole = (r: string) => setRoles(roles.filter(x => x !== r));

  const handleAddPerm = (val?: string) => {
    const value = (val !== undefined ? val : permInput).trim();
    if (value && !permissions.includes(value)) setPermissions([...permissions, value]);
    setPermInput("");
  };
  const handleRemovePerm = (p: string) => setPermissions(permissions.filter(x => x !== p));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative"
        onSubmit={handleSubmit}
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
                {r}
                <button type="button" className="ml-1 text-red-500 hover:text-red-700" onClick={() => handleRemoveRole(r)} title={undefined} aria-label="Quitar">
                  <span className="sr-only"><TranslateText text="Quitar" /></span>×
                </button>
              </span>
            ))}
            <select
              className="border px-1 py-0.5 rounded text-xs w-32"
              value=""
              onChange={e => {
                handleAddRole(e.target.value);
              }}
            >
              <option value="" disabled><TranslateText text="Seleccionar rol" /></option>
              {availableRoles.filter(r => !roles.includes(r)).map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium"><TranslateText text="Permisos" /></label>
          <div className="flex flex-wrap gap-1 mb-2">
            {permissions.map(p => (
              <span key={p} className="inline-flex items-center bg-green-100 text-green-800 rounded px-2 py-0.5 text-xs mr-1">
                {p}
                <button type="button" className="ml-1 text-red-500 hover:text-red-700" onClick={() => handleRemovePerm(p)} title={undefined} aria-label="Quitar">
                  <span className="sr-only"><TranslateText text="Quitar" /></span>×
                </button>
              </span>
            ))}
            <select
              className="border px-1 py-0.5 rounded text-xs w-32"
              value=""
              onChange={e => {
                handleAddPerm(e.target.value);
              }}
            >
              <option value="" disabled><TranslateText text="Seleccionar permiso" /></option>
              {availablePermissions.filter(p => !permissions.includes(p)).map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <input
              className="border px-1 py-0.5 rounded text-xs w-24"
              value={permInput}
              onChange={e => setPermInput(e.target.value)}
              onBlur={() => handleAddPerm()}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAddPerm(); } }}
              placeholder="Agregar permiso"
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
