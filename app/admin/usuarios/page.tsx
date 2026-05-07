"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { TranslateText } from "@/components/TranslateText";
import { Users, Plus, RefreshCw, BarChart3, Search } from "lucide-react";

import UserStats from "./UserStats";
import { UserFilter } from "./UserFilter";
import UserCardList from "./UserCardList";
import { UserFormModal } from "./UserFormModal";
import UserWizardForm from "./UserWizardForm";
import { DeleteUserModal } from "./DeleteUserModal";
import UserDetailsModal from "./UserDetailsModal";
import { adminApi, AdminSessionUser } from "../utils/admin-api";

import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";
import { useTheme } from "../hooks";

export interface Usuario {
  email: string;
  role: string | string[];
  roles?: string[];
  permissions?: string[];
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
  const [currentAdmin, setCurrentAdmin] = useState<AdminSessionUser | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<Usuario | null>(null);
  const [processing, setProcessing] = useState(false);
  const [deleteUser, setDeleteUser] = useState<Usuario | null>(null);
  const [filter, setFilter] = useState("");
  const [detailsUser, setDetailsUser] = useState<Usuario | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("list");
  const [useWizardForm, setUseWizardForm] = useState(true); // Usar wizard por defecto
  const [editingWizardUser, setEditingWizardUser] = useState<Usuario | null>(null);
  
  const [loadingTabs, setLoadingTabs] = useState<Record<TabId, boolean>>({
    list: false,
    stats: false,
  });

  const currentAdminRoles = currentAdmin?.roles || (currentAdmin?.role ? [currentAdmin.role] : []);
  const currentAdminPermissions = currentAdmin?.permissions || [];
  const isSuperAdmin = currentAdminRoles.includes('superadmin');
  const canReadUsers = isSuperAdmin || currentAdminPermissions.includes('users:read');
  const canManageUsers = isSuperAdmin || currentAdminPermissions.includes('users:manage');
  const canBlockUsers = isSuperAdmin;

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
      const data = await adminApi.getUsers();
      const payload = data as { data?: { items?: Usuario[] }; items?: Usuario[]; users?: Usuario[] };
      const userList = payload.data?.items || payload.items || payload.users || [];
      
      setUsers(userList.slice().reverse());
    } catch (error) {
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message || "")
          : "";
      setError(message || "Error de conexión con el servidor.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch users on mount
  useEffect(() => {
    async function validateAndFetch() {
      try {
        const response = await adminApi.getCurrentAdmin();

        if (!response?.ok || !response.user) {
          router.push('/admin');
          return;
        }

        const user = response.user;
        const roles = user.roles || (user.role ? [user.role] : []);
        const permissions = user.permissions || [];
        const superadmin = roles.includes('superadmin');
        const canRead = superadmin || permissions.includes('users:read');
        const adminFlag = superadmin || roles.includes('admin');

        if (!canRead) {
          router.push('/admin');
          return;
        }

        setCurrentAdmin(user);
        sessionStorage.setItem('admin', String(adminFlag));
        sessionStorage.setItem('role', roles[0] || user.role || '');
        fetchUsers();
      } catch (err) {
        console.warn('Error verificando sesión en backend', err);
        router.push('/admin');
      }
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
    if (!canManageUsers) return;
    setEditUser(null); 
    setEditingWizardUser(null);
    setShowForm(true); 
  };

  const handleEdit = (user: Usuario) => { 
    if (!canManageUsers) return;
    setEditUser(user); 
    setEditingWizardUser(user);
    setShowForm(true); 
  };

  const handleUserSaved = (user: Record<string, unknown>) => {
    fetchUsers();
    setShowForm(false);
    setEditUser(null);
    setEditingWizardUser(null);
  };

  const handleDelete = (user: Usuario) => { 
    if (!canManageUsers) return;
    setDeleteUser(user); 
  };

  const confirmDeleteUser = async () => {
    if (!deleteUser) return;
    if (!canManageUsers) {
      alert("No tienes permisos para eliminar usuarios.");
      return;
    }
    setProcessing(true);
    try {
      await adminApi.deleteUser(deleteUser.email);
      setUsers((prev: Usuario[]) => prev.filter((u: Usuario) => u.email !== deleteUser.email));
      setDeleteUser(null);
    } catch (error) {
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message || "")
          : "";
      alert(message || "Error eliminando usuario");
    } finally {
      setProcessing(false);
    }
  };

  const handleFormSubmit = async (form: { email: string; password?: string; roles?: string[]; active?: boolean }) => {
    if (!canManageUsers) {
      alert("No tienes permisos para gestionar usuarios.");
      return;
    }
    setProcessing(true);
    try {
      const payload = {
        ...form,
        roles: form.roles?.filter((role) => canBlockUsers || role !== 'superadmin'),
      };

      if (!payload.roles?.length) { 
        delete payload.roles; 
      }

      if (editUser) {
        await adminApi.updateUser(form.email, payload);
      } else {
        await adminApi.createUser(payload);
      }

      setShowForm(false); 
      fetchUsers(); 
    } catch (error) { 
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message || "")
          : "";
      alert(message || "Error de conexión con el servidor."); 
    } finally { 
      setProcessing(false); 
    }
  };

  const handleBlock = async (user: Usuario, newState: boolean) => {
    if (!canBlockUsers) {
      alert("Solo un superadmin puede bloquear usuarios.");
      return;
    }
    setProcessing(true);
    try {
      const data = await adminApi.blockUser(user.email, newState);
      if ((data as { ok?: boolean }).ok) {
        setUsers((users: Usuario[]) => users.map((u: Usuario) => 
          u.email === user.email ? { ...u, bloqueado: newState } : u
        ));
      } else {
        alert((data as { error?: string }).error || "No se pudo actualizar el estado de bloqueo.");
      }
    } catch (error) { 
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message || "")
          : "";
      alert(message || "Error de conexión con el servidor."); 
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
          ...(canManageUsers ? { add: { onClick: handleAdd, label: 'Agregar Usuario', loading: processing } } : {})
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

            {!error && canReadUsers && !canManageUsers && (
              <div className={`rounded-lg border p-4 mb-6 ${
                themeStrict === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <p className={themeStrict === 'dark' ? 'text-blue-300' : 'text-blue-700'}>
                  Solo tienes acceso de lectura a usuarios. Puedes consultar el listado, pero no crear, editar, eliminar ni bloquear.
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
                  canManageUsers={canManageUsers}
                  canBlockUsers={canBlockUsers}
                />
              </>
            )}
          </>
        )}
      </AdminSection>

      {/* Modals */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Toggle entre formularios */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg shadow-lg">
            <span className={`text-sm font-medium ${themeStrict === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Formulario:
            </span>
            <button
              onClick={() => setUseWizardForm(true)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                useWizardForm
                  ? 'bg-blue-600 text-white'
                  : themeStrict === 'dark'
                    ? 'bg-gray-800 text-gray-300'
                    : 'bg-gray-200 text-gray-600'
              }`}
            >
              Wizard (Nuevo)
            </button>
            <button
              onClick={() => setUseWizardForm(false)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                !useWizardForm
                  ? 'bg-blue-600 text-white'
                  : themeStrict === 'dark'
                    ? 'bg-gray-800 text-gray-300'
                    : 'bg-gray-200 text-gray-600'
              }`}
            >
              Tradicional
            </button>
          </div>
          
          {useWizardForm ? (
            <UserWizardForm
              isOpen={true}
              onClose={() => {
                setShowForm(false);
                setEditUser(null);
                setEditingWizardUser(null);
              }}
              onSaved={handleUserSaved}
              initialData={editingWizardUser ? {
                email: editingWizardUser.email,
                roles: Array.isArray(editingWizardUser.role) ? editingWizardUser.role : (editingWizardUser.roles || []),
                active: !editingWizardUser.bloqueado,
              } : undefined}
              theme={themeStrict}
              canManageRoles={canManageUsers}
              canAssignSuperadmin={canBlockUsers}
            />
          ) : (
            <UserFormModal
              initial={editUser ? { 
                email: editUser.email, 
                roles: Array.isArray(editUser.role) ? editUser.role : (editUser.roles || []),
                active: !editUser.bloqueado,
              } : undefined}
              isEdit={!!editUser} 
              onSubmit={handleFormSubmit} 
              canManageRoles={canManageUsers}
              canAssignSuperadmin={canBlockUsers}
              onClose={() => setShowForm(false)} 
            />
          )}
        </div>
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

