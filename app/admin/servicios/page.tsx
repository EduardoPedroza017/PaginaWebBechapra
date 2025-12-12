
"use client";
import React, { useEffect, useState } from "react";
import { Service, ServiceTable, ServiceEditModal, DeleteServiceModal } from "./components";
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

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/services");
    const data = await res.json();
    setServices(data);
    setLoading(false);
  }

  function handleNew() {
    setEditData(undefined);
    setEditOpen(true);
  }

  function handleEdit(service: Service) {
    setEditData(service);
    setEditOpen(true);
  }

  async function handleSave(data: Service) {
    if (data.id) {
      await fetch(`http://localhost:5000/admin/services/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("http://localhost:5000/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
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
      await fetch(`http://localhost:5000/admin/services/${deleteData.id}`, {
        method: "DELETE" });
    }
    setDeleteOpen(false);
    fetchServices();
  }

  async function handleToggleActive(service: Service) {
    await fetch(`http://localhost:5000/admin/services/${service.id}/activate`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !service.active }),
    });
    fetchServices();
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
            />
          )}
          <ServiceEditModal
            open={editOpen}
            initialData={editData}
            onClose={() => setEditOpen(false)}
            onSave={handleSave}
          />
          <DeleteServiceModal
            open={deleteOpen}
            service={deleteData}
            onClose={() => setDeleteOpen(false)}
            onConfirm={handleDeleteConfirm}
          />
        </main>
      </div>
    </div>
  );
}
