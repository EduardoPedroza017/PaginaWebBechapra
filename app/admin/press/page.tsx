"use client";

import React, { useEffect, useState } from "react";
import { FileText, RefreshCw } from "lucide-react";
import PressTable from "./PressTable";
import PressForm from "./PressForm";
import PressEditModal from "./PressEditModal";
import PressChart from "./PressChart";
import PressStats from "./PressStats";
import DeletePressModal from "./DeletePressModal";
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
  const [press, setPress] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editItem, setEditItem] = useState<PressItem | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteItem, setDeleteItem] = useState<PressItem | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  // Fetch press releases
  const fetchPress = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/press", {
        credentials: 'include',
      });
      const data = await res.json();
      setPress(data);
    } catch (error) {
      console.error("Error fetching press:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPress();
  }, []);

  // Create
  const handleCreate = async (formData: FormData) => {
    const userEmail = typeof window !== "undefined" ? sessionStorage.getItem("user_email") : null;
    await fetch("http://localhost:5000/api/press", {
      method: "POST",
      body: formData,
      headers: {
        ...(userEmail ? { "X-User": userEmail } : {})
      },
      credentials: 'include',
    });
    fetchPress();
  };

  // Update
  const handleUpdate = async (id: string, formData: FormData) => {
    const userEmail = typeof window !== "undefined" ? sessionStorage.getItem("user_email") : null;
    await fetch(`http://localhost:5000/api/press/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        ...(userEmail ? { "X-User": userEmail } : {})
      },
      credentials: 'include',
    });
    setShowEdit(false);
    fetchPress();
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteItem) return;
    setDeleteLoading(true);
    const userEmail = typeof window !== "undefined" ? sessionStorage.getItem("user_email") : null;
    try {
      await fetch(`http://localhost:5000/api/press/${deleteItem.id}`, {
        method: "DELETE",
        headers: {
          ...(userEmail ? { "X-User": userEmail } : {})
        },
        credentials: 'include',
      });
      setShowDelete(false);
      setDeleteItem(null);
      fetchPress();
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDeleteModal = (item: PressItem) => {
    setDeleteItem(item);
    setShowDelete(true);
  };

  if (!mounted) return null;

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#0a1627]' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      <Sidebar selected="press" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header theme={theme} onLogout={() => {}} onToggleTheme={handleToggleTheme} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                theme === 'dark' ? 'bg-emerald-600/20' : 'bg-emerald-100'
              }`}>
                <FileText className={`w-7 h-7 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Gestión de Prensa" />
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Administra los comunicados de prensa" />
                </p>
              </div>
            </div>
            <button
              onClick={() => fetchPress(true)}
              disabled={refreshing}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                refreshing ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 active:scale-95'
              } ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <TranslateText text="Actualizar" />
            </button>
          </div>

          {/* Stats */}
          <div className="mb-8">
            <PressStats data={press} theme={theme} />
          </div>

          {/* Form & Chart Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PressForm onCreate={handleCreate} theme={theme} />
            <PressChart data={press} theme={theme} />
          </div>

          {/* Table */}
          <PressTable
            data={press}
            loading={loading}
            onEdit={(item: PressItem) => {
              setEditItem(item);
              setShowEdit(true);
            }}
            onDelete={openDeleteModal}
            theme={theme}
          />

          {/* Edit Modal */}
          {showEdit && editItem && (
            <PressEditModal
              item={editItem}
              onClose={() => setShowEdit(false)}
              onUpdate={handleUpdate}
              theme={theme}
            />
          )}

          {/* Delete Modal */}
          {showDelete && deleteItem && (
            <DeletePressModal
              title={deleteItem.title}
              onCancel={() => {
                setShowDelete(false);
                setDeleteItem(null);
              }}
              onConfirm={handleDelete}
              loading={deleteLoading}
              theme={theme}
            />
          )}
        </main>
      </div>
    </div>
  );
}
