"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
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

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') setTheme(saved);
    }
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') localStorage.setItem('theme', next);
      return next;
    });
  };

  const fetchEssence = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/essence`);
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/essence/history`);
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/essence/history/${id}/restore`, {
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
      const res = await fetch(`http://localhost:5000/api/essence/history/${restorePendingId}/restore`, {
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
      const res = await fetch(`http://localhost:5000/api/essence/history/${undoRestoreId}/restore`, {
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/essence`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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

  if (!mounted) return null;

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#0a1627]' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      <Sidebar selected="/admin/essence" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={() => {}} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                theme === 'dark' ? 'bg-emerald-600/20' : 'bg-emerald-100'
              }`}>
                <Sparkles className={`w-7 h-7 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Misión, Visión y Valores" />
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Administra la esencia institucional" />
                </p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
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

          {/* Success/Error Messages */}
          {success && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              theme === 'dark' ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-200'
            }`}>
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                {success}
              </span>
            </div>
          )}
          {error && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              theme === 'dark' ? 'bg-red-900/30 border border-red-800' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                {error}
              </span>
            </div>
          )}

          {/* Stats */}
          <div className="mb-8">
            <EssenceStats essence={essence} lastUpdate={lastUpdate} theme={theme} />
          </div>

          {/* Main Content Grid */}
          {loading ? (
            <div className={`rounded-2xl border p-12 text-center ${
              theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-emerald-600 mb-3"></div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                <TranslateText text="Cargando datos..." />
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <EssenceForm essence={essence} onSave={handleSave} theme={theme} onDraftChange={(d) => setDraft(d)} onEditingChange={(e) => setIsEditing(e)} />
              <EssencePreview essence={isEditing && draft ? draft : essence} theme={theme} />
            </div>
          )}

          {/* History */}
          <EssenceHistory history={history} loading={loadingHistory} theme={theme} onRestore={handleRestore} onRequestRestore={requestRestore} />

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
              <div className={`rounded-lg p-3 shadow-lg flex items-center gap-3 ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
                <div className="text-sm">Restaurado —</div>
                <button onClick={undoRestore} className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm">Deshacer</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
