
"use client";
import React, { useEffect, useState } from "react";
import { Service, ServiceTable, ServiceEditModal, DeleteServiceModal } from "./components";
import ServicePageForm from "./components/ServicePageForm";
import { Button } from "../components/shared/Button";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";

export default function ServiciosAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<Service | undefined>(undefined);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Service | undefined>(undefined);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);
  const [pageFormOpen, setPageFormOpen] = useState(false);
  const [pageInitialHandle, setPageInitialHandle] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const res = await fetch(`${API}/api/services/cards`, { credentials: 'include' });
    const data = await res.json();
    setServices(data);
    setLoading(false);
  }

  function handleNew() {
    setEditData(undefined);
    setEditOpen(true);
  }

  async function handleEdit(service: Service) {
    // Obtener detalle completo antes de abrir el modal
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API}/api/services/cards/${service.id}`, { credentials: 'include' });
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
    if (data.id) {
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      await fetch(`${API}/api/services/cards/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      // after updating an existing service, open the page form for this handle
      const maybeHandle = payload.slug;
      setPageInitialHandle(maybeHandle);
      setPageFormOpen(true);
    } else {
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API}/api/services/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const created = await res.json();
        // Open page creation form prefilled with handle (slug) from created service or generated from name
        const maybeHandle = created.slug || created.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        setPageInitialHandle(maybeHandle);
        setPageFormOpen(true);
      }
    }
    setEditOpen(false);
    fetchServices();
  }

  function handleDelete(service: Service) {
    setDeleteData(service);
    setDeleteOpen(true);
  }

  async function handleDeleteConfirm() {
    if (deleteData?.id) {
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      await fetch(`${API}/api/services/cards/${deleteData.id}`, {
        method: "DELETE", credentials: 'include' });
    }
    setDeleteOpen(false);
    fetchServices();
  }

  async function handleToggleActive(service: Service) {
    setToggleLoading(service.id || null);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      await fetch(`${API}/api/services/cards/${service.id}/activate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
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
            <Button onClick={handleNew}>
              <TranslateText text="Nuevo Servicio" />
            </Button>
          </div>
          {loading ? (
            <div><TranslateText text="Cargando..." /></div>
          ) : (
            <ServiceTable
              services={services}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
              toggleLoading={toggleLoading}
            />
          )}
          <ServiceEditModal
            open={editOpen}
            initialData={editData}
            onClose={() => setEditOpen(false)}
            onSave={handleSave}
            onContinue={(h) => { setPageInitialHandle(h); setPageFormOpen(true); setEditOpen(false); }}
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
            onCreated={(p) => { console.log('page created', p); setPageFormOpen(false); }}
          />
        </main>
      </div>
    </div>
  );
}
