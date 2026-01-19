"use client";

import { useEffect, useState, useCallback } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import { Building2, RefreshCw, Plus, MapPin, Phone, Mail, Edit2, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import BranchForm from "./components/BranchForm";
import BranchEditModal from "./components/BranchEditModal";
import DeleteBranchModal from "./components/DeleteBranchModal";
import type { Branch } from "./types";
import { getStateName } from "./data/mexicoLocations";

export default function SucursalesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [deleting, setDeleting] = useState<Branch | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive'>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null; visible: boolean }>({ message: '', type: null, visible: false });
  const toastTimerRef = { current: null as number | null };

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      }
    }
  }, []);

  const fetchBranches = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/branches`, { credentials: 'include' });

      if (!res.ok) {
        if (res.status === 404) {
          console.warn('Branches API not available, using empty data');
          setBranches([]);
          return;
        }
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.items && Array.isArray(data.items)) {
        setBranches(data.items);
      } else if (Array.isArray(data)) {
        setBranches(data);
      } else {
        console.warn('Unexpected response format, using empty data:', data);
        setBranches([]);
      }
    } catch (error) {
      console.warn('Error fetching branches, using empty data:', error);
      setBranches([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const handleCreated = (newBranch: Branch) => {
    setBranches(prev => [newBranch, ...prev]);
    setShowForm(false);
    setToast({ message: 'Sucursal creada correctamente', type: 'success', visible: true });
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast({ message: '', type: null, visible: false }), 4000) as unknown as number;
  };

  const handleUpdated = (updated: Branch) => {
    setBranches(prev => prev.map(b => b.id === updated.id ? updated : b));
    setEditing(null);
    setToast({ message: 'Sucursal actualizada', type: 'success', visible: true });
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast({ message: '', type: null, visible: false }), 4000) as unknown as number;
  };

  const handleToggleActive = async (branch: Branch) => {
    setToggleLoading(branch.id);
    try {
      const adminHeaders: Record<string, string> = {};
      try {
        const userEmail = sessionStorage.getItem('user_email');
        const adminFlag = sessionStorage.getItem('admin');
        const role = sessionStorage.getItem('role');
        if (userEmail) adminHeaders['X-User'] = userEmail;
        if (adminFlag) adminHeaders['X-Admin'] = adminFlag;
        if (role) adminHeaders['X-Role'] = role;
      } catch (e) {}

      const res = await fetch(`http://localhost:5000/api/admin/branches/${branch.id}/activate`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...adminHeaders },
        credentials: 'include',
        body: JSON.stringify({ isActive: !branch.isActive })
      });
      if (res.ok) {
        const data = await res.json();
        // El backend devuelve el branch directamente
        const updatedBranch = data.data || data;
        setBranches(prev => prev.map(b => b.id === branch.id ? { ...b, isActive: updatedBranch.isActive } : b));
        setToast({ message: updatedBranch.isActive ? 'Sucursal activada' : 'Sucursal desactivada', type: 'success', visible: true });
        if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = window.setTimeout(() => setToast({ message: '', type: null, visible: false }), 4000) as unknown as number;
      }
    } catch (error) {
      console.error("Error toggling branch:", error);
    } finally {
      setToggleLoading(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      const adminHeaders: Record<string, string> = {};
      try {
        const userEmail = sessionStorage.getItem('user_email');
        const adminFlag = sessionStorage.getItem('admin');
        const role = sessionStorage.getItem('role');
        if (userEmail) adminHeaders['X-User'] = userEmail;
        if (adminFlag) adminHeaders['X-Admin'] = adminFlag;
        if (role) adminHeaders['X-Role'] = role;
      } catch (e) {}

      const res = await fetch(`http://localhost:5000/api/admin/branches/${deleting.id}`, {
        method: 'DELETE',
        headers: { ...adminHeaders },
        credentials: 'include'
      });
      if (res.ok) {
        setBranches(prev => prev.filter(b => b.id !== deleting.id));
        setToast({ message: 'Sucursal eliminada', type: 'success', visible: true });
        if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = window.setTimeout(() => setToast({ message: '', type: null, visible: false }), 4000) as unknown as number;
      }
    } catch (error) {
      console.error("Error deleting branch:", error);
    } finally {
      setDeleteLoading(false);
      setDeleting(null);
    }
  };

  // cleanup toast timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("role");
    window.location.href = "/admin";
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  if (!mounted) return null;

  const activeCount = branches.filter(b => b.isActive).length;
  const inactiveCount = branches.filter(b => !b.isActive).length;

  const getFilteredBranches = () => {
    switch (activeTab) {
      case 'active':
        return branches.filter(b => b.isActive);
      case 'inactive':
        return branches.filter(b => !b.isActive);
      default:
        return branches;
    }
  };

  const filteredBranches = getFilteredBranches();

  return (
    <div className={`flex min-h-screen ${
      theme === 'dark' ? 'bg-gray-950' : 'bg-linear-to-br from-blue-50 to-indigo-100'
    }`}>
      <Sidebar selected="/admin/sucursales" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header theme={theme} onToggleTheme={handleToggleTheme} onLogout={handleLogout} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${
                  theme === "dark" ? "bg-emerald-600 shadow-lg shadow-emerald-500/30" : "bg-emerald-600 shadow-lg shadow-emerald-500/20"
                }`}>
                  <Building2 className="text-white" size={28} />
                </div>
                <div>
                  <h1 className={`text-2xl md:text-3xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    <TranslateText text="Gestión de Sucursales" />
                  </h1>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <TranslateText text="Administra las ubicaciones de la empresa" />
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                    theme === "dark"
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  }`}
                >
                  <Plus size={20} />
                  <TranslateText text="Nueva Sucursal" />
                </button>

                <button
                  onClick={() => fetchBranches(true)}
                  disabled={refreshing}
                  className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      : "bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
                  }`}
                  title="Refrescar"
                >
                  <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className={`p-4 rounded-xl ${
              theme === "dark" ? "bg-gray-800/50 border border-gray-700" : "bg-white shadow-sm"
            }`}>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                <TranslateText text="Total" />
              </p>
              <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {branches.length}
              </p>
            </div>
            <div className={`p-4 rounded-xl ${
              theme === "dark" ? "bg-gray-800/50 border border-gray-700" : "bg-white shadow-sm"
            }`}>
              <p className={`text-sm ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}>
                <TranslateText text="Activas" />
              </p>
              <p className={`text-2xl font-bold ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}>
                {activeCount}
              </p>
            </div>
            <div className={`p-4 rounded-xl ${
              theme === "dark" ? "bg-gray-800/50 border border-gray-700" : "bg-white shadow-sm"
            }`}>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                <TranslateText text="Inactivas" />
              </p>
              <p className={`text-2xl font-bold ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {inactiveCount}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className={`flex gap-1 p-1 rounded-xl mb-6 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'all'
                ? theme === 'dark'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-900 shadow-sm'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <TranslateText text="Todas" /> ({branches.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'active'
                ? theme === 'dark'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-900 shadow-sm'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <TranslateText text="Activas" /> ({activeCount})
            </button>
            <button
              onClick={() => setActiveTab('inactive')}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'inactive'
                ? theme === 'dark'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-900 shadow-sm'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <TranslateText text="Desactivadas" /> ({inactiveCount})
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="mb-6">
              <BranchForm 
                onCreated={handleCreated} 
                onCancel={() => setShowForm(false)}
                theme={theme} 
              />
            </div>
          )}

          {/* Toast */}
          {toast.visible && (
            <div className="fixed bottom-6 right-6 z-50">
              <div className={`rounded-lg p-3 shadow-lg max-w-xs ${toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                <div className="text-sm font-medium">{toast.message}</div>
              </div>
            </div>
          )}

          {/* Branches List */}
          {loading ? (
            <div className="flex justify-center py-12">
              <RefreshCw className={`w-8 h-8 animate-spin ${
                theme === "dark" ? "text-emerald-400" : "text-emerald-600"
              }`} />
            </div>
          ) : branches.length === 0 ? (
            <div className={`text-center py-12 rounded-xl ${
              theme === "dark" ? "bg-gray-800/50 border border-gray-700" : "bg-white shadow-sm"
            }`}>
              <Building2 className={`w-16 h-16 mx-auto mb-4 ${
                theme === "dark" ? "text-gray-600" : "text-gray-300"
              }`} />
              <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                <TranslateText text="No hay sucursales registradas" />
              </p>
              <button
                onClick={() => setShowForm(true)}
                className={`mt-4 px-4 py-2 rounded-lg ${
                  theme === "dark" 
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white" 
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                <TranslateText text="Agregar primera sucursal" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredBranches.length === 0 ? (
                <div className={`col-span-full text-center py-12 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-sm'}`}>
                  <Building2 className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {activeTab === 'active' ? 'No hay sucursales activas' : activeTab === 'inactive' ? 'No hay sucursales desactivadas' : 'No hay sucursales'}
                  </p>
                </div>
              ) : filteredBranches.map((branch) => (
                <div
                  key={branch.id}
                  className={`rounded-xl overflow-hidden transition-all duration-300 ${
                    theme === "dark" 
                      ? "bg-gray-800/50 border border-gray-700 hover:border-gray-600" 
                      : "bg-white shadow-sm hover:shadow-md"
                  } ${!branch.isActive ? 'opacity-60' : ''}`}
                >
                  {/* Active badge */}
                  {branch.isActive && (
                    <div className="absolute mt-3 mr-3 right-0 z-20">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${theme === 'dark' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                        Activa
                      </span>
                    </div>
                  )}
                  {/* Map Preview */}
                  {branch.locationUrl && (
                    <div className="h-40 bg-gray-200 relative">
                      <iframe
                        src={branch.locationUrl.includes('embed') ? branch.locationUrl : `https://maps.google.com/maps?q=${branch.coordinates?.lat || 0},${branch.coordinates?.lng || 0}&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                      />
                      {!branch.isActive && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
                          }`}>
                            <TranslateText text="Inactiva" />
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-semibold text-lg ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        {branch.name}
                      </h3>
                      <button
                        onClick={() => handleToggleActive(branch)}
                        disabled={toggleLoading === branch.id}
                        className={`p-1 rounded transition-colors ${
                          branch.isActive 
                            ? "text-emerald-500 hover:text-emerald-400" 
                            : "text-gray-400 hover:text-gray-300"
                        }`}
                        title={branch.isActive ? "Desactivar" : "Activar"}
                      >
                        {toggleLoading === branch.id ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : branch.isActive ? (
                          <ToggleRight className="w-6 h-6" />
                        ) : (
                          <ToggleLeft className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                    
                    {branch.description && (
                      <p className={`text-sm mb-3 line-clamp-2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {branch.description}
                      </p>
                    )}
                    
                    <div className="space-y-1.5 mb-4">
                      {(branch.city || branch.state) && (
                        <p className={`text-sm font-medium ${
                          theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                        }`}>
                          {[branch.city, getStateName(branch.state)].filter(Boolean).join(', ')}
                        </p>
                      )}
                      <p className={`text-sm flex items-center gap-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        <MapPin size={14} className="text-red-500 shrink-0" />
                        <span className="truncate">{branch.address}</span>
                      </p>
                      {branch.contact?.phone && (
                        <p className={`text-sm flex items-center gap-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}>
                          <Phone size={14} className="shrink-0" />
                          {branch.contact.phone}
                        </p>
                      )}
                      {branch.contact?.email && (
                        <p className={`text-sm flex items-center gap-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}>
                          <Mail size={14} className="shrink-0" />
                          {branch.contact.email}
                        </p>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setEditing(branch)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                          theme === "dark"
                            ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        <Edit2 size={14} />
                        <TranslateText text="Editar" />
                      </button>
                      <button
                        onClick={() => setDeleting(branch)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                          theme === "dark"
                            ? "bg-red-900/30 hover:bg-red-900/50 text-red-400"
                            : "bg-red-50 hover:bg-red-100 text-red-600"
                        }`}
                      >
                        <Trash2 size={14} />
                        <TranslateText text="Eliminar" />
                      </button>
                    </div>
                  </div>
                </div>
              ))})
            </div>
          )}

          {/* Modals */}
          <BranchEditModal
            open={!!editing}
            branch={editing}
            onClose={() => setEditing(null)}
            onUpdated={handleUpdated}
            theme={theme}
          />
          
          <DeleteBranchModal
            isOpen={!!deleting}
            branchName={deleting?.name || null}
            theme={theme}
            loading={deleteLoading}
            onClose={() => setDeleting(null)}
            onConfirm={confirmDelete}
          />
        </main>
      </div>
    </div>
  );
}
