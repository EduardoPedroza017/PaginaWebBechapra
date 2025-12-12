"use client";
import { useState, useEffect } from "react";
import { Card } from "../components/shared/Card";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TerminosForm } from "./TerminosForm";
import { TerminosTable } from "./TerminosTable";
import { useTerminosApi } from "./useTerminosApi";
import { TermSection } from "./types";
import { DeleteTermModal } from "./DeleteTermModal";

export default function TerminosAdminPage() {
  const [editing, setEditing] = useState<TermSection | null>(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string | null; title: string }>({ open: false, id: null, title: "" });
  const {
    sections,
    loading,
    error,
    success,
    addSection,
    updateSection,
    deleteSection,
    setError,
    setSuccess,
  } = useTerminosApi();

  // --- TEMA OSCURO/CLARO igual que dashboard ---
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });
  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', next);
        document.documentElement.classList.remove(prev);
        document.documentElement.classList.add(next);
      }
      return next;
    });
  };
  // Sync theme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }, [theme]);
  const handleLogout = () => {};

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function startEdit(section: TermSection) {
    setEditing(section);
    setForm({ title: section.title, content: section.content });
    setSuccess("");
    setError("");
  }

  function cancelEdit() {
    setEditing(null);
    setForm({ title: "", content: "" });
    setSuccess("");
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.title.trim() || !form.content.trim()) {
      setError("Título y contenido requeridos");
      return;
    }
    if (editing) {
      updateSection(editing.id, form);
    } else {
      addSection(form);
    }
    setForm({ title: "", content: "" });
    setEditing(null);
  }

  function handleDelete(id: string, title: string) {
    setDeleteModal({ open: true, id, title });
  }

  function handleConfirmDelete() {
    if (deleteModal.id) {
      deleteSection(deleteModal.id);
    }
    setDeleteModal({ open: false, id: null, title: "" });
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar selected="terminos" theme={theme} />
      <main className="flex-1 bg-slate-50 dark:bg-slate-900">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <div className="max-w-5xl mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6">Términos y Condiciones (Admin)</h1>
          <Card className="mb-8 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
            <TerminosForm
              form={form}
              editing={!!editing}
              error={error}
              success={success}
              onChange={handleInput}
              onSubmit={handleSubmit}
              onCancel={cancelEdit}
            />
          </Card>
          <Card className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
            <TerminosTable
              sections={sections}
              loading={loading}
              onEdit={startEdit}
              onDelete={(id, title) => handleDelete(id, title)}
            />
            <DeleteTermModal
              open={deleteModal.open}
              onClose={() => setDeleteModal({ open: false, id: null, title: "" })}
              onConfirm={handleConfirmDelete}
              title={deleteModal.title}
            />
          </Card>
        </div>
      </main>
    </div>
  );
}
