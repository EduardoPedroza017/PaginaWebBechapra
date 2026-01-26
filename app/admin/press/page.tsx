﻿"use client";

import React, { useEffect, useState } from "react";
import { FileText, RefreshCw, Plus, BarChart3 } from "lucide-react";
import PressTable from "./PressTable";
import { PressCardList } from "./PressCardList";
import PressPreviewModal from "./PressPreviewModal";
import PressForm from "./PressForm";
import PressEditModal from "./PressEditModal";
import PressChart from "./PressChart";
import PressStats from "./PressStats";
import DeletePressModal from "./DeletePressModal";

import { TranslateText } from "@/components/TranslateText";
import { PressSearchBar } from "./PressSearchBar";
import { adminApi } from "../utils/admin-api";
import AdminPageShell from '@/app/admin/components/layout/AdminPageShell';
import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";
import { useTheme } from "../hooks";

export interface PressItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
  file_url?: string;
}

type TabId = 'list' | 'create' | 'stats';

export default function PressAdminApp() {
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();
  const themeStrict: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  const [mounted, setMounted] = useState(false);
  const [press, setPress] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editItem, setEditItem] = useState<PressItem | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteItem, setDeleteItem] = useState<PressItem | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [previewItem, setPreviewItem] = useState<PressItem | null>(null);
  const [search, setSearch] = useState("");
  
  const [activeTab, setActiveTab] = useState<TabId>("list");
  const [loadingTabs, setLoadingTabs] = useState<Record<TabId, boolean>>({
    list: false,
    create: false,
    stats: false,
  });

  const handleTabChange = async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 300));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  };

  const handleRefresh = () => {
    fetchPress(true);
  };

  const openCreateTab = () => {
    setActiveTab("create");
  };

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  // Fetch press releases
  const fetchPress = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const data = await adminApi.getPress();
      // API may return a paginated object { items, page, total, ... }
      // Normalize to an array for the UI
      if (Array.isArray(data)) {
        setPress(data);
      } else if (data && Array.isArray((data as any).items)) {
        setPress((data as any).items);
      } else {
        setPress([]);
      }
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    await fetch(`${apiUrl}/api/press`, {
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    await fetch(`${apiUrl}/api/press/${id}`, {
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
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/press/${deleteItem.id}`, {
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

  const tabs: TabItem[] = [
    { id: 'list', label: 'Listado', icon: <FileText size={18} /> },
    { id: 'create', label: 'Crear', icon: <Plus size={18} /> },
    { id: 'stats', label: 'Estadísticas', icon: <BarChart3 size={18} /> },
  ];

  if (!mounted || !themeReady) return null;

  const filteredPress = press.filter(item => {
    const q = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      (item.date && new Date(item.date).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" }).toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen">
      <AdminPageHeader
        title="Gestión de Prensa"
        subtitle="Administra los comunicados de prensa"
        icon={<FileText className="w-6 h-6 text-white" />}
        iconColor="emerald"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: refreshing },
          add: { onClick: openCreateTab, label: 'Crear Comunicado' }
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Prensa" }]}
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
          <div className="space-y-6">
            <PressStats data={press} theme={themeStrict} />
            <PressChart data={press} theme={themeStrict} />
          </div>
        )}

        {activeTab === 'create' && (
          <PressForm onCreate={handleCreate} theme={themeStrict} />
        )}

        {activeTab === 'list' && (
          <>
            {/* Barra de búsqueda */}
            <PressSearchBar value={search} onChange={setSearch} theme={themeStrict} />

            {/* Cards visuales filtradas */}
            <PressCardList
              data={filteredPress}
              theme={themeStrict}
              onEdit={(item) => { setEditItem(item); setShowEdit(true); }}
              onDelete={openDeleteModal}
              onPreview={setPreviewItem}
            />
          </>
        )}
      </AdminSection>

      {/* Modal de previsualización */}
      <PressPreviewModal
        open={!!previewItem}
        onClose={() => setPreviewItem(null)}
        press={previewItem}
        theme={themeStrict}
      />

      {/* Edit Modal */}
      {showEdit && editItem && (
        <PressEditModal
          item={editItem}
          onClose={() => setShowEdit(false)}
          onUpdate={handleUpdate}
          theme={themeStrict}
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
          theme={themeStrict}
        />
      )}
    </div>
  );
}

