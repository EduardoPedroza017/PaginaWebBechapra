"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { TranslateText } from "@/components/TranslateText";
import { Users, Plus, RefreshCw, BarChart3, Search } from "lucide-react";

import UserStats from "./UserStats";
import { UserFilter } from "./UserFilter";
import UserCardList from "./UserCardList";
import { UserFormModal } from "./UserFormModal";
import { DeleteUserModal } from "./DeleteUserModal";
import UserDetailsModal from "./UserDetailsModal";

import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";
import { useTheme } from "../hooks";

export interface Usuario {
  email: string;
  role: string | string[];
  roles?: string[];
  bloqueado?: boolean;
}

type TabId = 'list' | 'stats';

export default function UsuariosPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();
  const themeStrict: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
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
  const [activeTab, setActiveTab] = useState<TabId>("list");
  
  const [loadingTabs, setLoadingTabs] = useState<Record<TabId, boolean>>({
    list: false,
    stats: false,
  });

  const handleTabChange = async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 300));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUsers(true);
  }, []);

  // Theme initialization and page size persistence
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPageSize = window.localStorage.getItem('usuarios_pageSize');
      if (savedPageSize) setPageSize(parseInt(savedPageSize));
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
      
      const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
      
      const headers: Record<string, string> = { 
        'X-Role': storedRole, 
        'X-Admin': storedAdmin.toString(),
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const res = await fetch(`${apiBase}/users`, {
        method: "GET",
        headers,
        credentials: 'include'
      });
      
      const data = await res.json();
      let userList = [];
      
      if (res.ok && data.items && Array.isArray(data.items)) {
        userList = data.items;
      } else if (res.ok && data.ok && Array.isArray(data.users)) {
        userList = data.users;
      } else if (res.ok && Array.isArray(data)) {
        userList = data;
      } else {
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
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const method = editUser ? "PUT" : "POST";
      const url = editUser
        ? `${apiBase}/api/admin/users/${encodeURIComponent(form.email)}`
        : `${apiBase}/api/admin/users/`;
      
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
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiBase}/api/admin/block_user`, {
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

  const tabs: TabItem[] = [
    { id: 'list', label: 'Usuarios', icon: <Users size={18} /> },
    { id: 'stats', label: 'Estadísticas', icon: <BarChart3 size={18} /> },
  ];

  if (!themeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminPageHeader
        title="Gestión de Usuarios"
        subtitle="Administra usuarios y permisos"
        icon={<Users className="w-6 h-6 text-white" />}
        iconColor="blue"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: refreshing },
          add: { onClick: handleAdd, label: 'Agregar Usuario', loading: processing }
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Usuarios" }]}
      />

      <AdminTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tabId) => handleTabChange(tabId as TabId)}
        loadingTabs={loadingTabs}
        theme={themeStrict}
        variant="pills"
      />

      <AdminSection theme={themeStrict}>
        {activeTab === 'stats' && (
          <UserStats users={users} theme={themeStrict} />
        )}

        {activeTab === 'list' && (
          <>
            {/* Error state */}
            {error && (
              <div className={`rounded-lg border p-6 mb-6 ${
                themeStrict === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <p className={themeStrict === 'dark' ? 'text-red-400' : 'text-red-600'}>
                  {error}
                </p>
              </div>
            )}

            {/* Loading state */}
            {loading ? (
              <div className="rounded-lg border p-12 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-600 mb-4"></div>
                <p className={themeStrict === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  <TranslateText text="Cargando usuarios..." />
                </p>
              </div>
            ) : (
              <>
                <UserFilter value={filter} onChange={setFilter} theme={themeStrict} />
                
                {/* Page Size Selector */}
                <div className="flex items-center justify-end gap-3 mb-4">
                  <label className={`text-sm ${
                    themeStrict === 'dark' ? 'text-gray-400' : 'text-gray-600'
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
                      themeStrict === 'dark' 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
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
                  theme={themeStrict}
                />
              </>
            )}
          </>
        )}
      </AdminSection>

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
        theme={themeStrict} 
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
        theme={themeStrict} 
      />
    </div>
  );
}

