"use client";

import React, { useEffect, useState } from "react";
import { UserFilter } from "./UserFilter";
import { UserTableActions } from "./UserTableActions";
import { UserFormModal } from "./UserFormModal";
import { useRouter } from "next/navigation";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";

export interface Usuario {
  email: string;
  role: string | string[];
  roles?: string[]; // compatibilidad
  permissions?: string[];
  bloqueado?: boolean;
  // Puedes agregar aquí los campos adicionales esperados, por ejemplo:
  nombre?: string;
  apellido?: string;
  telefono?: string;
  // ...otros campos específicos

}
import { RolePermissionEditor, updateUserRoles, updateUserPermissions } from "./RolePermissionEditor";

interface AuditLogEntry {
  user_id: string;
  timestamp?: string;
  ip?: string;
  user_agent?: string;
  success: boolean;
  reason?: string;
}

function UserDetailsModal({ user, onClose }: { user: Usuario | null; onClose: () => void }) {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    const admin = sessionStorage.getItem("admin") === "true";
    const role = sessionStorage.getItem("role") || "";
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/audit`, {
      headers: {
        "Content-Type": "application/json",
        "X-Admin": String(admin),
        "X-Role": role,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        setLogs((data.logs || []).filter((l: AuditLogEntry) => l.user_id === user.email));
        setLoading(false);
      })
      .catch(() => {
        setError("No autorizado o error de servidor");
        setLoading(false);
      });
  }, [user]);

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2"><TranslateText text="Detalles del usuario" /></h2>
        <div className="mb-4">
          <div><b><TranslateText text="Email:" /></b> {user.email}</div>
          <div><b><TranslateText text="Rol:" /></b> {user.role}</div>
          <div><b><TranslateText text="Bloqueado:" /></b> {user.bloqueado ? <TranslateText text="Sí" /> : <TranslateText text="No" />}</div>
          {Object.entries(user).map(([k, v]) => (
            ["email", "role", "bloqueado", "password", "_id"].includes(k) ? null : (
              <div key={k}><b><TranslateText text={`${k}:`} /></b> {String(v)}</div>
            )
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2"><TranslateText text="Historial de inicios de sesión" /></h3>
        {loading ? (
          <div><TranslateText text="Cargando historial..." /></div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : logs.length === 0 ? (
          <div><TranslateText text="No hay registros de inicio de sesión." /></div>
        ) : (
          <div className="overflow-x-auto max-h-64">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 border"><TranslateText text="Fecha/Hora" /></th>
                  <th className="px-2 py-1 border">IP</th>
                  <th className="px-2 py-1 border"><TranslateText text="User Agent" /></th>
                  <th className="px-2 py-1 border"><TranslateText text="Éxito" /></th>
                  <th className="px-2 py-1 border"><TranslateText text="Motivo" /></th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i} className={log.success ? "bg-green-50" : "bg-red-50"}>
                    <td className="px-2 py-1 border">{log.timestamp ? new Date(log.timestamp).toLocaleString() : ""}</td>
                    <td className="px-2 py-1 border">{log.ip}</td>
                    <td className="px-2 py-1 border max-w-xs truncate">{log.user_agent}</td>
                    <td className="px-2 py-1 border text-center">{log.success ? "✔️" : "❌"}</td>
                    <td className="px-2 py-1 border">{log.reason || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UsuariosPage() {
  // Paginación
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const router = useRouter();
  // Eliminados estados no usados: role, admin
  const [users, setUsers] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<Usuario | null>(null);
  const [processing, setProcessing] = useState(false);
  const [filter, setFilter] = useState("");
  const [detailsUser, setDetailsUser] = useState<Usuario | null>(null);

  // Sincronizar pageSize y theme con localStorage SOLO en cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPageSize = window.localStorage.getItem('usuarios_pageSize');
      if (savedPageSize) setPageSize(parseInt(savedPageSize));
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') setTheme(savedTheme);
    }
  }, []);

  // CRUD handlers
  const handleAdd = () => {
    setEditUser(null);
    setShowForm(true);
  };

  const handleEdit = (user: Usuario) => {
    setEditUser(user);
    setShowForm(true);
  };

  const handleDelete = async (user: Usuario) => {
    if (!window.confirm(`¿Eliminar usuario ${user.email}?`)) return;
    setProcessing(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
      const storedRole = sessionStorage.getItem("role") || "";
      const storedAdmin = sessionStorage.getItem("admin") === "true";
      const res = await fetch(`${apiBase}/admin/users/${encodeURIComponent(user.email)}`, {
        method: "DELETE",
        headers: {
          'X-Role': storedRole,
          'X-Admin': storedAdmin.toString()
        }
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setUsers(users.filter(u => u.email !== user.email));
      } else {
        alert(data.message || "No se pudo eliminar el usuario.");
      }
    } catch {
      alert("Error de conexión con el servidor.");
    } finally {
      setProcessing(false);
    }
  };

  const handleFormSubmit = async (form: { email: string; password?: string; role?: string; roles?: string[]; permissions?: string[] }) => {
    setProcessing(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
      const storedRole = sessionStorage.getItem("role") || "";
      const storedAdmin = sessionStorage.getItem("admin") === "true";
      const method = editUser ? "PUT" : "POST";
      const url = editUser ? `${apiBase}/admin/users/${encodeURIComponent(form.email)}` : `${apiBase}/admin/users/`;
      // Para compatibilidad con backend legacy, si solo hay un rol, pásalo como string
      const payload: {
        email: string;
        password?: string;
        role?: string;
        roles?: string[];
        permissions?: string[];
      } = { ...form };
      if (form.roles && form.roles.length === 1) {
        payload.role = form.roles[0];
        delete payload.roles;
      }
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Role': storedRole,
          'X-Admin': storedAdmin.toString()
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setShowForm(false);
        fetchUsers();
      } else {
        alert(data.message || "No se pudo guardar el usuario.");
      }
    } catch {
      alert("Error de conexión con el servidor.");
    } finally {
      setProcessing(false);
    }
  };

  // Bloquear/desbloquear usuario
  const handleBlock = async (user: Usuario) => {
    setProcessing(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
      const storedRole = sessionStorage.getItem("role") || "";
      const storedAdmin = sessionStorage.getItem("admin") === "true";
      const res = await fetch(`${apiBase}/admin/block_user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-Role': storedRole,
          'X-Admin': storedAdmin.toString()
        },
        body: JSON.stringify({ email: user.email, block: !user.bloqueado })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setUsers(users.map(u => u.email === user.email ? { ...u, bloqueado: !user.bloqueado } : u));
      } else {
        alert(data.error || "No se pudo actualizar el estado de bloqueo.");
      }
    } catch {
      alert("Error de conexión con el servidor.");
    } finally {
      setProcessing(false);
    }
  };

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const handleLogout = async () => {
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('role');
    router.push('/admin');
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
      const storedRole = sessionStorage.getItem("role") || "";
      const storedAdmin = sessionStorage.getItem("admin") === "true";
      const res = await fetch(`${apiBase}/admin/users/`, {
        method: "GET",
        headers: {
          'X-Role': storedRole,
          'X-Admin': storedAdmin.toString()
        }
      });
      const data = await res.json();
      let userList = [];
      if (res.ok && data.ok && Array.isArray(data.users)) {
        userList = data.users;
      } else if (res.ok && Array.isArray(data)) {
        userList = data;
      } else {
        setError(data.message || "No se pudieron obtener los usuarios.");
      }
      // Ordena por más reciente (asume que el último agregado está al final)
      userList = userList.slice().reverse();
      setUsers(userList);
    } catch {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Verificar permisos
    const storedRole = sessionStorage.getItem("role");
    const storedAdmin = sessionStorage.getItem("admin") === "true";
    // Solo verificamos permisos, no guardamos en estado
    if (storedRole !== "superadmin" || !storedAdmin) {
      router.push("/admin/dashboard");
      return;
    }
    // Obtener usuarios
    fetchUsers();
  }, [router]);

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <Sidebar selected="/admin/usuarios" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}><TranslateText text="Gestión de Usuarios" /></h1>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors shadow flex items-center gap-2"
              disabled={processing}
            >
              <span>+ <TranslateText text="Agregar usuario" /></span>
            </button>
          </div>
          {loading ? (
            <div><TranslateText text="Cargando usuarios..." /></div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : users.length === 0 ? (
            <div className="text-center text-gray-400"><TranslateText text="No hay usuarios registrados." /></div>
          ) : (
            <>
              <UserFilter value={filter} onChange={setFilter} />
              {/* Selector de paginación se mueve abajo */}
              <div className={`overflow-x-auto rounded-xl shadow-lg border ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                <table className={`min-w-full border-separate border-spacing-0 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  <thead className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                    <tr>
                      <th className={`py-2 px-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} text-left font-semibold`}><TranslateText text="Usuario" /></th>
                      <th className={`py-2 px-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} text-left font-semibold`}><TranslateText text="Roles" /></th>
                      <th className={`py-2 px-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} text-left font-semibold`}><TranslateText text="Permisos" /></th>
                      <th className={`py-2 px-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} text-right font-semibold`}><TranslateText text="Acciones" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter(u => {
                        // Formato: 'campo:valor'
                        const [campo, valor] = filter.split(":");
                        if (!valor) return true;
                        if (campo === 'role') {
                          let rolesArr: string[] = [];
                          if (Array.isArray(u.role)) rolesArr = u.role;
                          else if (typeof u.role === 'string') rolesArr = [u.role];
                          else if (Array.isArray(u.roles)) rolesArr = u.roles;
                          return rolesArr.join(", ").toLowerCase().includes(valor.toLowerCase());
                        }
                        if (campo === 'permission') {
                          if (!u.permissions) return false;
                          return u.permissions.join(", ").toLowerCase().includes(valor.toLowerCase());
                        }
                        if (campo === 'bloqueado') {
                          if (valor === 'true') return u.bloqueado === true;
                          if (valor === 'false') return u.bloqueado === false;
                          return true;
                        }
                        // Por defecto filtra por email
                        return u.email.toLowerCase().includes(valor.toLowerCase());
                      })
                      .slice((page - 1) * pageSize, page * pageSize)
                      .map((user) => (
                        <tr key={user.email} className={theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}>
                          <td className={`py-2 px-4 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>{user.email}</td>
                          <td className={`py-2 px-4 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                            <RolePermissionEditor
                              type="role"
                              user={user}
                              onChange={async (newRoles: string[]) => {
                                await updateUserRoles(user.email, newRoles);
                              }}
                            />
                          </td>
                          <td className={`py-2 px-4 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                            <RolePermissionEditor
                              type="permission"
                              user={user}
                              onChange={async (newPerms: string[]) => {
                                await updateUserPermissions(user.email, newPerms);
                              }}
                            />
                          </td>
                          <td className={`py-2 px-4 border-b text-right ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                            <UserTableActions
                              onEdit={() => handleEdit(user)}
                              onDelete={() => handleDelete(user)}
                              onBlock={() => handleBlock(user)}
                              bloqueado={user.bloqueado}
                            />
                            <button
                              className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                              title="Ver detalles"
                              onClick={() => setDetailsUser(user)}
                            >
                              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className={`flex flex-col md:flex-row justify-between items-center gap-2 mt-4 rounded-xl shadow-lg p-4 border ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-2">
                  <label className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}><TranslateText text="Mostrar:" /></label>
                  <select
                    value={pageSize}
                    onChange={e => {
                      setPageSize(Number(e.target.value));
                      localStorage.setItem('usuarios_pageSize', e.target.value);
                    }}
                    className={`px-2 py-1 rounded border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-300 focus:bg-blue-50'}`}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className={`px-2 py-1 rounded border flex items-center gap-1 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100 focus:bg-blue-50'}`}
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                    <span className="hidden md:inline"><TranslateText text="Anterior" /></span>
                  </button>
                  <span className={theme === 'dark' ? 'text-white' : 'text-black'}><TranslateText text="Página" /> {page} <TranslateText text="de" /> {Math.ceil(
                    users.filter(u => {
                      const emailMatch = u.email.toLowerCase().includes(filter.toLowerCase());
                      let rolesArr: string[] = [];
                      if (Array.isArray(u.role)) rolesArr = u.role;
                      else if (typeof u.role === 'string') rolesArr = [u.role];
                      else if (Array.isArray(u.roles)) rolesArr = u.roles;
                      const rolesMatch = rolesArr.join(", ").toLowerCase().includes(filter.toLowerCase());
                      return emailMatch || rolesMatch;
                    }).length / pageSize
                  )}</span>
                  <button
                    className={`px-2 py-1 rounded border flex items-center gap-1 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100 focus:bg-blue-50'}`}
                    disabled={page === Math.ceil(users.filter(u => {
                      const emailMatch = u.email.toLowerCase().includes(filter.toLowerCase());
                      let rolesArr: string[] = [];
                      if (Array.isArray(u.role)) rolesArr = u.role;
                      else if (typeof u.role === 'string') rolesArr = [u.role];
                      else if (Array.isArray(u.roles)) rolesArr = u.roles;
                      const rolesMatch = rolesArr.join(", ").toLowerCase().includes(filter.toLowerCase());
                      return emailMatch || rolesMatch;
                    }).length / pageSize) || users.length === 0}
                    onClick={() => setPage(page + 1)}
                  >
                    <span className="hidden md:inline"><TranslateText text="Siguiente" /></span>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </>
          )}
          {showForm && (
            <UserFormModal
              initial={editUser ? { email: editUser.email, role: typeof editUser.role === 'string' ? editUser.role : (Array.isArray(editUser.role) ? editUser.role[0] : '') } : undefined}
              isEdit={!!editUser}
              onSubmit={handleFormSubmit}
              onClose={() => setShowForm(false)}
            />
          )}
          {detailsUser && (
            <UserDetailsModal user={detailsUser} onClose={() => setDetailsUser(null)} />
          )}
        </main>
      </div>
    </div>
  );
}
