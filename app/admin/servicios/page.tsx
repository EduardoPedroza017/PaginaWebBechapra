﻿"use client";
import React, { useEffect, useState } from "react";
import type { Service } from "./components/ServiceForm";
import { ServiceEditModal } from "./components/ServiceEditModal";
import ServicesWizardForm from "./components/ServicesWizardForm";
import { DeleteServiceModal } from "./components/DeleteServiceModal";
import { ServiceCardList } from "./components/ServiceCardList";
import { SearchBar } from "./components/SearchBar";
import ServicePageForm from "./components/ServicePageForm";
import { Button } from "../components/shared/Button";

import { TranslateText } from "@/components/TranslateText";
import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";
import { useTheme } from "../hooks";
import { List, Plus, Settings, Briefcase } from "lucide-react";

// Define the API URL from the environment variable
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

type TabId = 'list' | 'create' | 'settings';

export default function ServiciosAdminPage() {
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();
  const themeStrict: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [onlyActive, setOnlyActive] = useState(false);
  const [searchDebounceTimer, setSearchDebounceTimer] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<Service | undefined>(undefined);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Service | undefined>(undefined);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);
  const [pageFormOpen, setPageFormOpen] = useState(false);
  const [pageInitialHandle, setPageInitialHandle] = useState<string | undefined>(undefined);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const toastTimerRef = { current: null as number | null };
  
  const [activeTab, setActiveTab] = useState<TabId>("list");
  const [loadingTabs, setLoadingTabs] = useState<Record<TabId, boolean>>({
    list: false,
    create: false,
    settings: false,
  });
  const [useWizardForm, setUseWizardForm] = useState(true); // Usar wizard por defecto
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleTabChange = async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 300));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  };

  const handleRefresh = () => {
    fetchServices();
  };

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (query) params.set('search', query);
      if (onlyActive) params.set('active', 'true');
      const res = await fetch(`${apiUrl}/api/services/cards?${params.toString()}`, { credentials: 'include' });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      // Normalize API response: could be array or paginated object { items, page, total }
      if (Array.isArray(data)) {
        setServices(data);
      } else if (data && Array.isArray((data as any).items)) {
        setServices((data as any).items);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error('Error fetching services', err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }

  function handleNew() {
    setEditData(undefined);
    setEditingService(null);
    setEditOpen(true);
  }

  const handleServiceSaved = (savedService: Service) => {
    fetchServices();
    // Optionally open page form for the handle
    const maybeHandle = (savedService as any).slug || (savedService as any).handle || savedService.name?.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    setPageInitialHandle(maybeHandle);
    setPageFormOpen(true);
  };

  async function handleEdit(service: Service) {
    // Obtener detalle completo antes de abrir el modal
    try {
      const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('user_email') : null;
      const storedRole = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null;
      const storedAdmin = typeof window !== 'undefined' ? sessionStorage.getItem('admin') : null;
      const headers: Record<string, string> = {};
      if (storedUser) headers['X-User'] = storedUser;
      if (storedRole) headers['X-Role'] = storedRole;
      if (storedAdmin) headers['X-Admin'] = storedAdmin;
      const res = await fetch(`${apiUrl}/api/services/cards/${service.id}`, { credentials: 'include', headers });
      if (res.ok) {
        const data = await res.json();
        setEditData(data);
        setEditingService(data);
      } else {
        // fallback al objeto reducido
        setEditData(service);
        setEditingService(service);
      }
    } catch (err) {
      console.error('Error fetching service detail', err);
      setEditData(service);
      setEditingService(service);
    }
    setEditOpen(true);
  }

  async function handleSave(data: Service) {
    const maybeSlug = (data as any).slug || (data as any).handle || (data.name || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const payload: any = {
      icon: data.icon,
      image: data.image,
      name: data.name,
      description: data.description,
      slug: maybeSlug,
    };
    // Attach admin headers stored in sessionStorage as fallback when server session isn't available
    const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('user_email') : null;
    const storedRole = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null;
    const storedAdmin = typeof window !== 'undefined' ? sessionStorage.getItem('admin') : null;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (storedUser) headers['X-User'] = storedUser;
    if (storedRole) headers['X-Role'] = storedRole;
    if (storedAdmin) headers['X-Admin'] = storedAdmin;

    if (data.id) {
      await fetch(`${apiUrl}/api/services/cards/${data.id}`, {
        method: "PUT",
        headers,
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      // Note: handle errors
      // (For now we optimistically continue; errors will be shown by toast below)
      // after updating an existing service, open the page form for this handle
      const maybeHandle = payload.slug;
      setPageInitialHandle(maybeHandle);
      setPageFormOpen(true);
    } else {
      const res = await fetch(`${apiUrl}/api/services/cards`, {
        method: "POST",
        headers,
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const created = await res.json();
        // Open page creation form prefilled with handle (slug) from created service or generated from name
        const maybeHandle = created.slug || created.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        setPageInitialHandle(maybeHandle);
        setPageFormOpen(true);
      } else {
        const body = await res.json().catch(() => ({}));
        setToast({ message: body.error || 'Error al crear servicio', visible: true });
        if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = window.setTimeout(() => setToast({ message: '', visible: false }), 4000) as unknown as number;
      }
    }
    setEditOpen(false);
    fetchServices();
  }

  // cleanup
  useEffect(() => {
    return () => { if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current); };
  }, []);

  function handleDelete(service: Service) {
    setDeleteData(service);
    setDeleteOpen(true);
  }

  async function handleDeleteConfirm() {
    if (deleteData?.id) {
      const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('user_email') : null;
      const storedRole = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null;
      const storedAdmin = typeof window !== 'undefined' ? sessionStorage.getItem('admin') : null;
      const headers: Record<string, string> = {};
      if (storedUser) headers['X-User'] = storedUser;
      if (storedRole) headers['X-Role'] = storedRole;
      if (storedAdmin) headers['X-Admin'] = storedAdmin;
      await fetch(`${apiUrl}/api/services/cards/${deleteData.id}`, { method: "DELETE", credentials: 'include', headers });
    }
    setDeleteOpen(false);
    fetchServices();
  }

  async function handleToggleActive(service: Service) {
    setToggleLoading(service.id || null);
    try {
      const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('user_email') : null;
      const storedRole = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null;
      const storedAdmin = typeof window !== 'undefined' ? sessionStorage.getItem('admin') : null;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (storedUser) headers['X-User'] = storedUser;
      if (storedRole) headers['X-Role'] = storedRole;
      if (storedAdmin) headers['X-Admin'] = storedAdmin;

      const res = await fetch(`${apiUrl}/api/services/cards/${service.id}/toggle`, {
        method: "PATCH",
        headers,
        credentials: 'include',
        body: JSON.stringify({ active: !service.active }),
      });
      await fetchServices();
    } catch (err) {
      console.error('Error toggling service active', err);
    } finally {
      setToggleLoading(null);
    }
  }

  const tabs: TabItem[] = [
    { id: 'list', label: 'Listado', icon: <List size={18} /> },
    { id: 'create', label: 'Crear', icon: <Plus size={18} /> },
    { id: 'settings', label: 'Configuración', icon: <Settings size={18} /> },
  ];

  // Note: Since we don't have access to Service and Button icons here, we'll use placeholder icons
  // In a real implementation, you'd import the correct icons from lucide-react

  if (!themeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  // Filter services
  const filteredServices = services.filter(s => {
    if (onlyActive && !s.active) return false;
    if (query && !s.name?.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <AdminPageHeader
        title="Gestión de Servicios"
        subtitle="Administra los servicios disponibles"
        icon={<Briefcase className="w-6 h-6 text-white" />}
        iconColor="blue"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh },
          add: { onClick: handleNew, label: 'Nuevo Servicio' }
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Servicios" }]}
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
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                La configuración global de servicios se gestiona desde el backend.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div>
            {/* Toggle entre formularios */}
            <div className="mb-4 flex items-center gap-4">
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
              <ServicesWizardForm
                isOpen={true}
                onClose={() => setActiveTab("list")}
                onSaved={handleServiceSaved}
                initialData={undefined}
                theme={themeStrict}
              />
            ) : (
              <ServicePageForm
                open={pageFormOpen}
                initialHandle={pageInitialHandle}
                onClose={() => setPageFormOpen(false)}
                onCreated={(p: any) => { console.log('page created', p); setPageFormOpen(false); }}
              />
            )}
          </div>
        )}

        {activeTab === 'list' && (
          <>
            {/* Filters */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative w-72">
                  <div className="rounded-lg border border-gray-600 bg-gray-800 text-white pl-10 pr-4 py-2">
                    <SearchBar
                      value={query}
                      onChange={(q: string) => {
                        setQuery(q);
                        if (searchDebounceTimer) window.clearTimeout(searchDebounceTimer);
                        const t = window.setTimeout(() => {
                          fetchServices();
                          setSearchDebounceTimer(null);
                        }, 300);
                        setSearchDebounceTimer(t as unknown as number);
                      }}
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">
                      {/* Search icon placeholder */}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm mr-2">Activas</label>
                  <input 
                    type="checkbox" 
                    checked={onlyActive} 
                    onChange={(e) => { setOnlyActive(e.target.checked); fetchServices(); }} 
                  />
                </div>
              </div>
            </div>

            {/* Services List */}
            {loading ? (
              <div className="flex justify-center items-center mt-10">
                <div className="loader"></div>
              </div>
            ) : (
              <ServiceCardList
                services={filteredServices}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleActive={handleToggleActive}
                toggleLoading={toggleLoading}
              />
            )}
            
            {/* Mensaje amigable cuando no hay servicios */}
            {!loading && filteredServices.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <p>No hay servicios disponibles. ¡Crea uno nuevo!</p>
              </div>
            )}
          </>
        )}
      </AdminSection>

      {/* Toast */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div className="rounded-lg p-3 shadow-lg max-w-xs bg-blue-600 text-white">
            <div className="text-sm font-medium">{toast.message}</div>
          </div>
        </div>
      )}

      <ServiceEditModal
        open={editOpen}
        initialData={editData}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
        onContinue={(h?: string) => { if (h) { setPageInitialHandle(h); setPageFormOpen(true); setEditOpen(false); } }}
      />
      <DeleteServiceModal
        open={deleteOpen}
        service={deleteData}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
      <ServicePageForm
        open={pageFormOpen}
        initialHandle={pageInitialHandle}
        onClose={() => setPageFormOpen(false)}
        onCreated={(p: any) => { console.log('page created', p); setPageFormOpen(false); }}
      />
      
      {/* Wizard Form for Editing */}
      <ServicesWizardForm
        isOpen={!!editingService}
        onClose={() => {
          setEditingService(null);
          setEditOpen(false);
        }}
        onSaved={(savedService: Service) => {
          handleServiceSaved(savedService);
          setEditingService(null);
        }}
        initialData={editingService || undefined}
        theme={themeStrict}
      />
    </div>
  );
}

