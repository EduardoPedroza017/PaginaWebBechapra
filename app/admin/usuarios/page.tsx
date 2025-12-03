"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import { Users, Plus, RefreshCw } from "lucide-react";

import UserStats from "./UserStats";
import { UserFilter } from "./UserFilterNew";
import UserTable from "./UserTable";
import { UserFormModal } from "./UserFormModal";
import { DeleteUserModal } from "./DeleteUserModalNew";
import UserDetailsModal from "./UserDetailsModal";

export interface Usuario {
  email: string;
  role: string | string[];
  roles?: string[];
  permissions?: string[];
  bloqueado?: boolean;
}

export default function UsuariosPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [users, setUsers] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<Usuario | null>(null);
  const [processing, setProcessing] = useState(false);
  const [deleteUser, setDeleteUser] = useState<Usuario | null>(null);
  const [filter, setFilter] = useState("");
  const [detailsUser, setDetailsUser] = useState<Usuario | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPageSize = window.localStorage.getItem('usuarios_pageSize');
      if (savedPageSize) setPageSize(parseInt(savedPageSize));
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') setTheme(savedTheme);
    }
  }, []);

  const fetchUsers = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");
    
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const storedRole = sessionStorage.getItem("role") || "";
      const storedAdmin = sessionStorage.getItem("admin") === "true";
      const res = await fetch(`${apiBase}/admin/users/`, {
        method: "GET",
        headers: { 'X-Role': storedRole, 'X-Admin': storedAdmin.toString() }
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
      setUsers(userList.slice().reverse());
    } catch {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    const storedAdmin = sessionStorage.getItem("admin") === "true";
    if (storedRole !== "superadmin" || !storedAdmin) {
      router.push("/admin/dashboard");
      return;
    }
    fetchUsers();
  }, [router]);

  const filteredUsers = users.filter(u => {
    const [campo, valor] = filter.split(":");
    if (!valor) return true;
    if (campo === 'role') {
      const rolesArr = Array.isArray(u.role) ? u.role : (u.roles || [u.role as string]);
      return rolesArr.join(", ").toLowerCase().includes(valor.toLowerCase());
    }
    if (campo === 'permission') {
      return u.permissions?.join(", ").toLowerCase().includes(valor.toLowerCase()) || false;
    }
    if (campo === 'bloqueado') {
      if (valor === 'true') return u.bloqueado === true;
      if (valor === 'false') return u.bloqueado === false;
      return true;
    }
    return u.email.toLowerCase().includes(valor.toLowerCase());
  });

  const handleAdd = () => { setEditUser(null); setShowForm(true); };
  const handleEdit = (user: Usuario) => { setEditUser(user); setShowForm(true); };
  const handleDelete = (user: Usuario) => { setDeleteUser(user); };

  const confirmDeleteUser = async () => {
    if (!deleteUser) return;
    setProcessing(true);
    try {
      const apiBase = "http://localhost:5000";
      const res = await fetch(`${apiBase}/admin/users/${encodeURIComponent(deleteUser.email)}`, {
        method: "DELETE",
        headers: {
          'X-Role': sessionStorage.getItem("role") || "",
          'X-Admin': (sessionStorage.getItem("admin") === "true").toString(),
          'X-User': sessionStorage.getItem("user_email") || ""
        },
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => prev.filter(u => u.email !== deleteUser.email));
        setDeleteUser(null);
      } else {
        alert(data.message || "Error eliminando usuario");
      }
    } catch { alert("Error eliminando usuario"); }
    finally { setProcessing(false); }
  };

  const handleFormSubmit = async (form: { email: string; password?: string; role?: string; roles?: string[]; permissions?: string[] }) => {
    setProcessing(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const method = editUser ? "PUT" : "POST";
      const url = editUser ? `${apiBase}/admin/users/${encodeURIComponent(form.email)}` : `${apiBase}/admin/users/`;
      const payload = { ...form };
      if (form.roles?.length === 1) { payload.role = form.roles[0]; delete payload.roles; }
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Role': sessionStorage.getItem("role") || "",
          'X-Admin': (sessionStorage.getItem("admin") === "true").toString()
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.ok) { setShowForm(false); fetchUsers(); }
      else { alert(data.message || "No se pudo guardar el usuario."); }
    } catch { alert("Error de conexión con el servidor."); }
    finally { setProcessing(false); }
  };

  const handleBlock = async (user: Usuario) => {
    setProcessing(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiBase}/admin/block_user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-Role': sessionStorage.getItem("role") || "",
          'X-Admin': (sessionStorage.getItem("admin") === "true").toString()
        },
        body: JSON.stringify({ email: user.email, block: !user.bloqueado })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setUsers(users.map(u => u.email === user.email ? { ...u, bloqueado: !user.bloqueado } : u));
      } else { alert(data.error || "No se pudo actualizar el estado de bloqueo."); }
    } catch { alert("Error de conexión con el servidor."); }
    finally { setProcessing(false); }
  };

  const handleToggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('role');
    router.push('/admin');
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-linear-to-br from-gray-50 to-blue-50'}`}>
      <Sidebar selected="/admin/usuarios" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'}`}>
                <Users className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h1 className={`text-xl md:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Gestión de Usuarios" />
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <TranslateText text="Administra roles, permisos y accesos" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => fetchUsers(true)} disabled={refreshing}
                className={`p-2.5 rounded-xl transition-all ${refreshing ? 'opacity-50' : ''} ${theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-200'}`}>
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              <button onClick={handleAdd} disabled={processing}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/25">
                <Plus className="w-4 h-4" />
                <TranslateText text="Agregar Usuario" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className={`rounded-2xl border p-12 ${theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="flex flex-col items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-600 mb-4"></div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Cargando usuarios..." />
                </p>
              </div>
            </div>
          ) : error ? (
            <div className={`rounded-2xl border p-6 ${theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
            </div>
          ) : (
            <>
              <UserStats users={users} theme={theme} />
              <UserFilter value={filter} onChange={setFilter} theme={theme} />
              <div className="flex items-center justify-end gap-3 mb-4">
                <label className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Mostrar:" />
                </label>
                <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); localStorage.setItem('usuarios_pageSize', e.target.value); setPage(1); }}
                  className={`px-3 py-1.5 rounded-lg border text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <UserTable users={filteredUsers} page={page} pageSize={pageSize} onPageChange={setPage}
                onEdit={handleEdit} onDelete={handleDelete} onBlock={handleBlock} onViewDetails={setDetailsUser} theme={theme} />
            </>
          )}

          {showForm && (
            <UserFormModal
              initial={editUser ? { email: editUser.email, role: typeof editUser.role === 'string' ? editUser.role : (Array.isArray(editUser.role) ? editUser.role[0] : ''), roles: Array.isArray(editUser.role) ? editUser.role : (editUser.roles || []), permissions: editUser.permissions } : undefined}
              isEdit={!!editUser} onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />
          )}
          <UserDetailsModal user={detailsUser} onClose={() => setDetailsUser(null)} theme={theme} />
          <DeleteUserModal userEmail={deleteUser?.email || ""} open={!!deleteUser} onConfirm={confirmDeleteUser}
            onCancel={() => { setDeleteUser(null); setProcessing(false); }} processing={processing} theme={theme} />
        </main>
      </div>
    </div>
  );
}
