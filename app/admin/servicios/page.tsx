"use client";
import React, { useEffect, useState } from "react";
import { Service } from "./components/ServiceForm";
import { ServiceEditModal } from "./components/ServiceEditModal";
import { DeleteServiceModal } from "./components/DeleteServiceModal";
import { ServiceCardList } from "./components/ServiceCardList";
import { SearchBar } from "./components/SearchBar";
import ServicePageForm from "./components/ServicePageForm";
import { Button } from "../components/shared/Button";

import { TranslateText } from "@/components/TranslateText";

// Define the API URL from the environment variable
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

// Define the headers variable
const headers: Record<string, string> = { "Content-Type": "application/json" };
if (typeof window !== "undefined") {
  const storedUser = sessionStorage.getItem("user_email");
  const storedRole = sessionStorage.getItem("role");
  const storedAdmin = sessionStorage.getItem("admin");
  if (storedUser) headers["X-User"] = storedUser;
  if (storedRole) headers["X-Role"] = storedRole;
  if (storedAdmin) headers["X-Admin"] = storedAdmin;
}

export default function ServiciosAdminPage() {
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
    setEditOpen(true);
  }

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
      } else {
        // fallback al objeto reducido
        setEditData(service);
      }
    } catch (err) {
      console.error('Error fetching service detail', err);
      setEditData(service);
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

      const res = await fetch(`${apiUrl}/api/services/cards/${service.id}/activate`, {
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

  return (
    <div className="flex min-h-screen bg-slate-900">
      
      <div className="flex-1 flex flex-col">
        
        <main className="max-w-4xl mx-auto py-10 px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gradient bg-linear-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                <TranslateText text="Servicios" />
              </h1>
              <p className="text-sm text-gray-400">Administra los servicios disponibles en tu plataforma</p>
            </div>
            <div className="flex items-center gap-3">
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
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm mr-2">Activas</label>
                <input type="checkbox" checked={onlyActive} onChange={(e) => { setOnlyActive(e.target.checked); fetchServices(); }} />
              </div>
              <Button
                onClick={handleNew}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
              >
                <TranslateText text="Nuevo Servicio" />
              </Button>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center items-center mt-10">
              <div className="loader"></div>
            </div>
          )}
          <ServiceCardList
            services={services}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
            toggleLoading={toggleLoading}
          />
          {/* Mensaje amigable cuando no hay servicios */}
          {!loading && services.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              <p>No hay servicios disponibles. ¡Crea uno nuevo!</p>
            </div>
          )}
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
        </main>
      </div>
    </div>
  );
}

