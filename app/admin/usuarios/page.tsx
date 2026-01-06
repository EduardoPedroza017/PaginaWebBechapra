"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import { Users, Plus, RefreshCw } from "lucide-react";

import UserStats from "./UserStats";
import { UserFilter } from "./UserFilter";
import UserCardList from "./UserCardList";
import { UserFormModal } from "./UserFormModal";
import { DeleteUserModal } from "./DeleteUserModal";
import UserDetailsModal from "./UserDetailsModal";

export interface Usuario {
  email: string;
  role: string | string[];
  roles?: string[];
  bloqueado?: boolean;
}

export default function UsuariosPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [themeReady, setThemeReady] = useState(false);
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

  // Theme initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPageSize = window.localStorage.getItem('usuarios_pageSize');
      if (savedPageSize) setPageSize(parseInt(savedPageSize));
      
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      }
      
      setThemeReady(true);

      const handleStorage = (e: StorageEvent) => {
        if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
          setTheme(e.newValue);
        }
      };
      
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    } else {
      setThemeReady(true);
    }
  }, []);

  const fetchUsers = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");
    
    try {
      const apiBase = "/api/admin";
      const storedRole = sessionStorage.getItem("role") || "";
      const storedAdmin = sessionStorage.getItem("admin") === "true";
      
      // Obtener token de autenticación si existe
      const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
      
      const headers: Record<string, string> = { 
        'X-Role': storedRole, 
        'X-Admin': storedAdmin.toString(),
        'Content-Type': 'application/json'
      };
      
      // Agregar token si existe
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const res = await fetch(`${apiBase}/users`, {
        method: "GET",
        headers,
        credentials: 'include'
      });
      
      const data = await res.json();
      // console.log('API Response:', res.status, res.ok, data);
      let userList = [];
      
      if (res.ok && data.items && Array.isArray(data.items)) {
        userList = data.items;
        // console.log('Using data.items (paginated response):', userList.length, 'users');
      } else if (res.ok && data.ok && Array.isArray(data.users)) {
        userList = data.users;
        // console.log('Using data.users:', userList.length, 'users');
      } else if (res.ok && Array.isArray(data)) {
        userList = data;
        // console.log('Using data as array:', userList.length, 'users');
      } else {
        // console.error('Unexpected response structure:', data);
        setError(data.message || data.error || "No se pudieron obtener los usuarios.");
        return;
      }
      
      setUsers(userList.slice().reverse());
    } catch {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch users on mount
  useEffect(() => {
    async function validateAndFetch() {
      const storedRoleRaw = sessionStorage.getItem("role") || "";
      const storedAdminRaw = sessionStorage.getItem("admin") || "false";
      const storedAdmin = String(storedAdminRaw).toLowerCase() === "true";
      const roleLower = String(storedRoleRaw).toLowerCase();
      const isSuperLocal = roleLower === 'superadmin' || roleLower.includes('superadmin');

      if (isSuperLocal && storedAdmin) {
        fetchUsers();
        return;
      }

      try {
        const res = await fetch(`/api/admin/check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ admin: storedAdmin, role: storedRoleRaw })
        });
        
        if (res.ok) {
          const data = await res.json();
          const backendAdmin = Boolean(data.admin);
          const backendRole = data.role || '';
          const backendIsSuper = String(backendRole).toLowerCase().includes('superadmin');
          
          if (backendAdmin && backendIsSuper) {
            sessionStorage.setItem('admin', String(backendAdmin));
            sessionStorage.setItem('role', backendRole);
            fetchUsers();
            return;
          }
        }
      } catch (err) {
        console.warn('Error verificando sesión en backend', err);
      }

      router.push('/admin');
    }

    validateAndFetch();
  }, [router]);

  // Filter users
  const filteredUsers = users.filter((u: Usuario) => {
    const [campo, valor] = filter.split(":");
    if (!valor) return true;
    
    if (campo === 'role') {
      const rolesArr = Array.isArray(u.role) ? u.role : (u.roles || [u.role as string]);
      return rolesArr.join(", ").toLowerCase().includes(valor.toLowerCase());
    }
    
    if (campo === 'bloqueado') {
      if (valor === 'true') return u.bloqueado === true;
      if (valor === 'false') return u.bloqueado === false;
      return true;
    }
    
    return u.email.toLowerCase().includes(valor.toLowerCase());
  });

  const handleAdd = () => { 
    setEditUser(null); 
    setShowForm(true); 
  };

  const handleEdit = (user: Usuario) => { 
    setEditUser(user); 
    setShowForm(true); 
  };

  const handleDelete = (user: Usuario) => { 
    setDeleteUser(user); 
  };

  const confirmDeleteUser = async () => {
    if (!deleteUser) return;
    setProcessing(true);
    try {
      const apiBase = "/api/admin";
      const res = await fetch(`${apiBase}/users-mutations?id=${encodeURIComponent(deleteUser.email)}`, {
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
        setUsers((prev: Usuario[]) => prev.filter((u: Usuario) => u.email !== deleteUser.email));
        setDeleteUser(null);
      } else {
        alert(data.message || "Error eliminando usuario");
      }
    } catch { 
      alert("Error eliminando usuario"); 
    } finally { 
      setProcessing(false); 
    }
  };

  const handleFormSubmit = async (form: { email: string; password?: string; roles?: string[]; active?: boolean }) => {
    setProcessing(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const method = editUser ? "PUT" : "POST";
      const url = editUser
        ? `${apiBase}/admin/users/${encodeURIComponent(form.email)}`
        : `${apiBase}/admin/users/`;
      
      const payload = { ...form };
      const isSuperLocal = (sessionStorage.getItem('role') === 'superadmin' && sessionStorage.getItem('admin') === 'true');
      
      if (!isSuperLocal) { 
        delete payload.roles; 
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Role': sessionStorage.getItem("role") || "",
          'X-Admin': (sessionStorage.getItem("admin") === "true").toString()
        },
        credentials: 'include',
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

  const handleBlock = async (user: Usuario, newState: boolean) => {
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
        credentials: 'include',
        body: JSON.stringify({ email: user.email, block: newState })
      });
      
      const data = await res.json();
      if (res.status === 403) {
        alert(data.error || 'No autorizado. Se requiere superadmin para bloquear usuarios.');
      } else if (res.ok && data.ok) {
        setUsers((users: Usuario[]) => users.map((u: Usuario) => 
          u.email === user.email ? { ...u, bloqueado: newState } : u
        ));
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
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      // No necesitamos dispatchEvent aquí ya que el cambio es local
      return newTheme;
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('role');
    router.push('/admin');
  };

  if (!themeReady) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
      }`}>
        <div className="text-center">
          <div className={`inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mb-4 ${
            theme === 'dark' ? 'border-blue-500' : 'border-blue-600'
          }`}></div>
          <p className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`}>
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen ${
      theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      <Sidebar selected="/admin/usuarios" theme={theme} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onLogout={handleLogout} 
          onToggleTheme={handleToggleTheme} 
          theme={theme} 
        />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${
                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <Users className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <h1 className={`text-xl md:text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  <TranslateText text="Gestión de Usuarios" />
                </h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <TranslateText text="Administra usuarios y permisos" />
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => fetchUsers(true)} 
                disabled={refreshing}
                className={`p-2.5 rounded-lg transition-colors ${
                  refreshing ? 'opacity-50' : ''
                } ${
                  theme === 'dark' 
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <RefreshCw className={`w-5 h-5 ${
                  refreshing ? 'animate-spin' : ''
                }`} />
              </button>
              
              <button 
                onClick={handleAdd} 
                disabled={processing}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <TranslateText text="Agregar Usuario" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className={`rounded-lg border p-12 ${
              theme === 'dark' ? 'bg-slate-900/50 border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <div className="flex flex-col items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-600 mb-4"></div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <TranslateText text="Cargando usuarios..." />
                </p>
              </div>
            </div>
          ) : error ? (
            <div className={`rounded-lg border p-6 ${
              theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
            }`}>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-red-400' : 'text-red-600'
              }`}>
                {error}
              </p>
            </div>
          ) : (
            <>
              <UserStats users={users} theme={theme} />
              
              <UserFilter value={filter} onChange={setFilter} theme={theme} />
              
              {/* Page Size Selector */}
              <div className="flex items-center justify-end gap-3 mb-4">
                <label className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <TranslateText text="Mostrar:" />
                </label>
                <select 
                  value={pageSize} 
                  onChange={e => { 
                    setPageSize(Number(e.target.value)); 
                    localStorage.setItem('usuarios_pageSize', e.target.value); 
                    setPage(1); 
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-sm ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <UserCardList
                users={filteredUsers}
                page={page}
                pageSize={pageSize}
                onPageChange={setPage}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onBlock={handleBlock}
                onViewDetails={setDetailsUser}
                theme={theme}
              />
            </>
          )}

          {/* Modals */}
          {showForm && (
            <UserFormModal
              initial={editUser ? { 
                email: editUser.email, 
                roles: Array.isArray(editUser.role) ? editUser.role : (editUser.roles || []),
              } : undefined}
              isEdit={!!editUser} 
              onSubmit={handleFormSubmit} 
              onClose={() => setShowForm(false)} 
            />
          )}
          
          <UserDetailsModal 
            user={detailsUser} 
            onClose={() => setDetailsUser(null)} 
            theme={theme} 
          />
          
          <DeleteUserModal 
            userEmail={deleteUser?.email || ""} 
            open={!!deleteUser} 
            onConfirm={confirmDeleteUser}
            onCancel={() => { 
              setDeleteUser(null); 
              setProcessing(false); 
            }} 
            processing={processing} 
            theme={theme} 
          />
        </main>
      </div>
    </div>
  );
}