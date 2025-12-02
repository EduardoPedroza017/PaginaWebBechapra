"use client";

"use client";
import React, { useEffect, useState } from "react";
import PressTable from "./PressTable";
import PressForm from "./PressForm";
import PressEditModal from "./PressEditModal";
import PressChart from "./PressChart";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";

export interface PressItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
  file_url?: string;
}

export default function PressAdminApp() {
  const [theme, setTheme] = useState<'light'|'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        requestAnimationFrame(() => setTheme(savedTheme));
      }
    }
  }, []);

  const handleToggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const [press, setPress] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<PressItem | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  // Fetch press releases
  const fetchPress = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/press");
    const data = await res.json();
    setPress(data);
    setLoading(false);
  };

  useEffect(() => {
    // Evitar setState directo en el cuerpo del effect
    (async () => {
      await fetchPress();
    })();
  }, []);

  // Create
  const handleCreate = async (formData: FormData) => {
    await fetch("http://localhost:5000/api/press", {
      method: "POST",
      body: formData,
    });
    fetchPress();
  };

  // Update
  const handleUpdate = async (id: string, formData: FormData) => {
    await fetch(`http://localhost:5000/api/press/${id}`, {
      method: "PUT",
      body: formData,
    });
    setShowEdit(false);
    fetchPress();
  };

  // Delete
  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/api/press/${id}`, {
      method: "DELETE",
    });
    fetchPress();
  };

  if (!mounted) return null;

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#0a1627]' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <Sidebar selected="press" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header theme={theme} onLogout={() => {}} onToggleTheme={handleToggleTheme} />
        <main className="flex-1 p-8">
          <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}><TranslateText text="Gestión de Prensa" /></h1>
          <div className="mb-8">
            <div className="bg-white dark:bg-[#232733] rounded-2xl shadow p-6">
              <PressForm onCreate={handleCreate} />
            </div>
          </div>
          <div className="mb-8">
            <div className="bg-white dark:bg-[#232733] rounded-2xl shadow p-6">
              <PressChart data={press} />
            </div>
          </div>
          <div className="bg-white dark:bg-[#232733] rounded-2xl shadow p-6">
            <PressTable
              data={press}
              loading={loading}
              onEdit={(item: PressItem) => {
                setEditItem(item);
                setShowEdit(true);
              }}
              onDelete={handleDelete}
            />
          </div>
          {showEdit && editItem && (
            <PressEditModal
              item={editItem}
              onClose={() => setShowEdit(false)}
              onUpdate={handleUpdate}
            />
          )}
        </main>
      </div>
    </div>
  );
}
