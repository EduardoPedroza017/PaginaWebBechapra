"use client";
import React, { useEffect, useState } from "react";
import { Service } from "./components/ServiceForm";
import { ServiceEditModal } from "./components/ServiceEditModal";
import { DeleteServiceModal } from "./components/DeleteServiceModal";
import { ServiceCardList } from "./components/ServiceCardList";
import { SearchBar } from "./components/SearchBar";
import ServicePageForm from "./components/ServicePageForm";
import { Button } from "../components/shared/Button";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";

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
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const params = new URLSearchParams();
      if (query) params.set('search', query);
      if (onlyActive) params.set('active', 'true');
      const res = await fetch(`${API}/api/services/cards?${params.toString()}`, { credentials: 'include' });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setServices(data);
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
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('user_email') : null;
      const storedRole = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null;
      const storedAdmin = typeof window !== 'undefined' ? sessionStorage.getItem('admin') : null;
      const headers: Record<string, string> = {};
      if (storedUser) headers['X-User'] = storedUser;
      if (storedRole) headers['X-Role'] = storedRole;
      if (storedAdmin) headers['X-Admin'] = storedAdmin;
      const res = await fetch(`${API}/api/services/cards/${service.id}`, { credentials: 'include', headers });
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
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      await fetch(`${API}/api/services/cards/${data.id}`, {
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
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API}/api/services/cards`, {
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
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('user_email') : null;
      const storedRole = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null;
      const storedAdmin = typeof window !== 'undefined' ? sessionStorage.getItem('admin') : null;
      const headers: Record<string, string> = {};
      if (storedUser) headers['X-User'] = storedUser;
      if (storedRole) headers['X-Role'] = storedRole;
      if (storedAdmin) headers['X-Admin'] = storedAdmin;
      await fetch(`${API}/api/services/cards/${deleteData.id}`, { method: "DELETE", credentials: 'include', headers });
    }
    setDeleteOpen(false);
    fetchServices();
  }

  async function handleToggleActive(service: Service) {
    setToggleLoading(service.id || null);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('user_email') : null;
      const storedRole = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null;
      const storedAdmin = typeof window !== 'undefined' ? sessionStorage.getItem('admin') : null;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (storedUser) headers['X-User'] = storedUser;
      if (storedRole) headers['X-Role'] = storedRole;
      if (storedAdmin) headers['X-Admin'] = storedAdmin;

      const res = await fetch(`${API}/api/services/cards/${service.id}/activate`, {
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
      <Sidebar selected="/admin/servicios" theme="dark" />
      <div className="flex-1 flex flex-col">
        <Header theme="dark" onLogout={() => {}} onToggleTheme={() => {}} />
        <main className="max-w-4xl mx-auto py-10 px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              <TranslateText text="Servicios" />
            </h1>
            <div className="flex items-center gap-3">
                <div className="w-72">
                <SearchBar value={query} onChange={(q: string) => {
                  // update query and debounce the network call to avoid loops and excessive requests
                  setQuery(q);
                  if (searchDebounceTimer) window.clearTimeout(searchDebounceTimer);
                  const t = window.setTimeout(() => { fetchServices(); setSearchDebounceTimer(null); }, 300);
                  setSearchDebounceTimer(t as unknown as number);
                }} />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm mr-2">Activas</label>
                <input type="checkbox" checked={onlyActive} onChange={(e) => { setOnlyActive(e.target.checked); fetchServices(); }} />
              </div>
              <Button onClick={handleNew}>
                <TranslateText text="Nuevo Servicio" />
              </Button>
            </div>
          </div>
          <ServiceCardList
            services={services}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
            toggleLoading={toggleLoading}
          />
          {/* Toast */}
          {toast.visible && (
            <div className="fixed bottom-6 right-6 z-50">
              <div className="rounded-lg p-3 shadow-lg max-w-xs bg-red-600 text-white">
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
