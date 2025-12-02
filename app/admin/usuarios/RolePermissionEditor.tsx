
import React, { useEffect, useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import type { Usuario } from "./page";

export interface RolePermissionEditorProps {
  type: 'role' | 'permission';
  user: Usuario;
  onChange: (values: string[]) => void;
}

export function RolePermissionEditor({ type, user, onChange }: RolePermissionEditorProps) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    let newVals: string[] = [];
    if (type === "role") {
      if (Array.isArray(user.roles)) newVals = user.roles;
      else if (Array.isArray(user.role)) newVals = user.role;
      else if (typeof user.role === "string") newVals = [user.role];
    } else {
      newVals = Array.isArray(user.permissions) ? user.permissions : [];
    }
    // Solo actualiza si realmente cambió
    if (values.length !== newVals.length || values.some((v, i) => v !== newVals[i])) {
      setValues(newVals);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, type]);

  const handleAdd = () => {
    const val = input.trim();
    if (val && !values.includes(val)) {
      const newVals = [...values, val];
      setValues(newVals);
      onChange(newVals);
    }
    setInput("");
    setEditing(false);
  };
  const handleRemove = (v: string) => {
    const newVals = values.filter(x => x !== v);
    setValues(newVals);
    onChange(newVals);
  };
  return (
    <div className="flex flex-wrap gap-1 items-center min-w-[120px]">
      {values.map(v => (
        <span key={v} className="inline-flex items-center bg-blue-100 text-blue-800 rounded px-2 py-0.5 text-xs mr-1">
          {v}
          <button type="button" className="ml-1 text-red-500 hover:text-red-700" onClick={() => handleRemove(v)} title={undefined} aria-label="Quitar">
            <span className="sr-only"><TranslateText text="Quitar" /></span>×
          </button>
        </span>
      ))}
      {editing ? (
        <input
          className="border px-1 py-0.5 rounded text-xs w-20"
          value={input}
          onChange={e => setInput(e.target.value)}
          onBlur={handleAdd}
          onKeyDown={e => { if (e.key === "Enter") handleAdd(); }}
          autoFocus
        />
      ) : (
        <button
          type="button"
          className="text-blue-500 hover:text-blue-700 text-xs px-1"
          onClick={() => setEditing(true)}
          title={undefined}
          aria-label={type === 'role' ? 'Agregar rol' : 'Agregar permiso'}
        >
          <span className="sr-only">
            <TranslateText text={type === 'role' ? 'Agregar rol' : 'Agregar permiso'} />
          </span>
          +
        </button>
      )}
    </div>
  );
}

// Llamadas a la API para actualizar roles/permisos
export async function updateUserRoles(email: string, roles: string[]) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const storedRole = sessionStorage.getItem("role") || "";
  const storedAdmin = sessionStorage.getItem("admin") === "true";
  const res = await fetch(`${apiBase}/admin/users/${encodeURIComponent(email)}/roles`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'X-Role': storedRole,
      'X-Admin': storedAdmin.toString()
    },
    body: JSON.stringify({ roles })
  });
  if (!res.ok) {
    alert("No se pudo actualizar los roles");
  }
}

export async function updateUserPermissions(email: string, permissions: string[]) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const storedRole = sessionStorage.getItem("role") || "";
  const storedAdmin = sessionStorage.getItem("admin") === "true";
  const res = await fetch(`${apiBase}/admin/users/${encodeURIComponent(email)}/permissions`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'X-Role': storedRole,
      'X-Admin': storedAdmin.toString()
    },
    body: JSON.stringify({ permissions })
  });
  if (!res.ok) {
    alert("No se pudo actualizar los permisos");
  }
}
