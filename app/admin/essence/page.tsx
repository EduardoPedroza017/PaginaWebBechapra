"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

import { TranslateText } from "@/components/TranslateText";
import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";
import { useTheme } from "../hooks";
import EssenceStats from "./EssenceStats";
import EssenceForm from "./EssenceForm";
import EssenceHistory from "./EssenceHistory";
import EssencePreview from "./EssencePreview";
import ConfirmModal from "@/components/ConfirmModal";
import { adminApi } from "../utils/admin-api";
interface Essence {
  id?: string;
  mision: string;
  vision: string;
  valores: string;
}

interface EssenceHistoryItem {
  id: string;
  date?: string;
  user?: string;
  old: { mision: string; vision: string; valores: string };
  new: { mision: string; vision: string; valores: string };
}

export default function EssenceAdminPage() {
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();
  const themeStrict: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  const [mounted, setMounted] = useState(false);
  const [essence, setEssence] = useState<Essence>({ mision: "", vision: "", valores: "" });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [history, setHistory] = useState<EssenceHistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string | undefined>();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<Essence | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'history'>('edit');

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchEssence = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const res = await fetch('/web/api/backend/admin/essence', { credentials: 'include' });
      if (!res.ok) throw new Error('No se pudo cargar la esencia');
      const data = await res.json();
      setEssence(data);
      setError('');
    } catch {
      setError('No se pudo cargar la esencia');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch('/web/api/backend/admin/essence/history', { credentials: 'include' });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
      // Get last update date
      if (Array.isArray(data) && data.length > 0 && data[0].date) {
        setLastUpdate(new Date(data[0].date).toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }));
      }
    } catch {
      setHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const res = await fetch(`/web/api/backend/admin/essence/history/${id}/restore`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Error al restaurar');
      const data = await res.json();
      setEssence(data);
      // Refresh history list
      await fetchHistory();
      setSuccess('Restaurado correctamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError('No se pudo restaurar la versión');
      setTimeout(() => setError(''), 3000);
      throw err;
    }
  };

  // Confirm modal state for restores
  const [restorePendingId, setRestorePendingId] = useState<string | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [undoRestoreId, setUndoRestoreId] = useState<string | null>(null);
  const [undoTimer, setUndoTimer] = useState<number | null>(null);

  const requestRestore = (id: string) => {
    setRestorePendingId(id);
  };

  const confirmRestore = async () => {
    if (!restorePendingId) return;
    setConfirmLoading(true);
    try {
      const res = await fetch(`/web/api/backend/admin/essence/history/${restorePendingId}/restore`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Error al restaurar');
      const data = await res.json();
      setEssence(data);
      // store created history id for undo
      if (data.restored_history_id) {
        setUndoRestoreId(data.restored_history_id);
        // show undo for 8 seconds
        if (undoTimer) window.clearTimeout(undoTimer);
        const t = window.setTimeout(() => setUndoRestoreId(null), 8000);
        setUndoTimer(t as unknown as number);
      }
      await fetchHistory();
      setSuccess('Restaurado correctamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError('No se pudo restaurar la versión');
      setTimeout(() => setError(''), 3000);
    } finally {
      setConfirmLoading(false);
      setRestorePendingId(null);
    }
  };

  const undoRestore = async () => {
    if (!undoRestoreId) return;
    try {
      const res = await fetch(`/web/api/backend/admin/essence/history/${undoRestoreId}/restore`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Error al deshacer');
      const data = await res.json();
      setEssence(data);
      setSuccess('Deshacer realizado');
      setTimeout(() => setSuccess(''), 3000);
      await fetchHistory();
    } catch (err) {
      console.error(err);
      setError('No se pudo deshacer');
      setTimeout(() => setError(''), 3000);
    } finally {
      if (undoTimer) window.clearTimeout(undoTimer);
      setUndoRestoreId(null);
      setUndoTimer(null);
    }
  };

  useEffect(() => {
    fetchEssence();
    fetchHistory();
  }, []);

  const handleSave = async (newEssence: Essence) => {
    setSuccess("");
    setError("");
    try {
      const res = await fetch('/web/api/backend/admin/essence', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          mision: newEssence.mision,
          vision: newEssence.vision,
          valores: newEssence.valores,
        }),
      });
      if (!res.ok) throw new Error("Error al guardar");
      const data = await res.json();
      setEssence(data);
      setDraft(null);
      setIsEditing(false);
      setSuccess("Guardado correctamente");
      fetchHistory();
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Error al guardar los datos");
      throw new Error("Error al guardar");
    }
  };

  const handleRefresh = () => {
    fetchEssence(true);
    fetchHistory();
  };

  const handleEdit = () => {
    setActiveTab('edit');
  };

  if (!mounted || !themeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-emerald-600"></div>
      </div>
    );
  }

  const tabs: TabItem[] = [
    { id: 'edit', label: 'Editar', icon: <Sparkles size={18} /> },
    { id: 'preview', label: 'Vista Previa', icon: <Sparkles size={18} /> },
    { id: 'history', label: 'Historial', icon: <Sparkles size={18} /> },
  ];

  return (
    <div className="min-h-screen">
      <AdminPageHeader
        title="Misión, Visión y Valores"
        subtitle="Administra la esencia institucional"
        icon={<Sparkles className="w-6 h-6 text-white" />}
        iconColor="emerald"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: refreshing },
          add: { onClick: handleEdit, label: 'Editar Contenido' }
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Esencia" }]}
      />

      <AdminTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tabId) => setActiveTab(tabId as typeof activeTab)}
        theme={themeStrict}
        variant="pills"
      />

      <AdminSection theme={themeStrict}>
        {/* Success/Error Messages */}
        {success && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
            themeStrict === 'dark' ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-200'
          }`}>
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className={`text-sm font-medium ${themeStrict === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
              {success}
            </span>
          </div>
        )}
        {error && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
            themeStrict === 'dark' ? 'bg-red-900/30 border border-red-800' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className={`text-sm font-medium ${themeStrict === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
              {error}
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8">
          <EssenceStats essence={essence} lastUpdate={lastUpdate} theme={themeStrict} />
        </div>

        {/* Main Content */}
        {loading ? (
          <div className={`rounded-2xl border p-12 text-center ${
            themeStrict === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-emerald-600 mb-3"></div>
            <p className={`text-sm ${themeStrict === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              <TranslateText text="Cargando datos..." />
            </p>
          </div>
        ) : (
          <div className={`rounded-2xl border overflow-hidden ${
            themeStrict === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <div className="p-6">
              {activeTab === 'edit' && (
                <EssenceForm essence={essence} onSave={handleSave} theme={themeStrict} onDraftChange={(d) => setDraft(d)} onEditingChange={(e) => setIsEditing(e)} />
              )}
              {activeTab === 'preview' && (
                <EssencePreview essence={isEditing && draft ? draft : essence} theme={themeStrict} />
              )}
              {activeTab === 'history' && (
                <EssenceHistory history={history} loading={loadingHistory} theme={themeStrict} onRestore={handleRestore} onRequestRestore={requestRestore} />
              )}
            </div>
          </div>
        )}
      </AdminSection>

      {/* Confirm restore modal */}
      <ConfirmModal
        open={!!restorePendingId}
        title="Restaurar versión"
        description="¿Estás seguro de que quieres restaurar esta versión anterior? Esto reemplazará el contenido actual."
        confirmLabel="Restaurar"
        cancelLabel="Cancelar"
        loading={confirmLoading}
        onClose={() => setRestorePendingId(null)}
        onConfirm={confirmRestore}
      />

      {/* Undo banner */}
      {undoRestoreId && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`rounded-lg p-3 shadow-lg flex items-center gap-3 ${themeStrict === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
            <div className="text-sm">Restaurado —</div>
            <button onClick={undoRestore} className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm">Deshacer</button>
          </div>
        </div>
      )}
    </div>
  );
}

