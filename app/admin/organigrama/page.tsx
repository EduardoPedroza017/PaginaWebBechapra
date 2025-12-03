"use client";

import React, { useEffect, useState } from "react";
import { Network, RefreshCw, Save, Eye, Edit3 } from "lucide-react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import { fetchOrganigrama, saveOrganigrama, OrganigramaNode } from "./OrganigramaAPI";
import { OrganigramaTree } from "./OrganigramaTree";
import { OrganigramaEditor } from "./OrganigramaEditor";
import OrganigramaStats from "./OrganigramaStats";

export default function OrganigramaAdminPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [organigrama, setOrganigrama] = useState<OrganigramaNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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

  const loadOrganigrama = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const data = await fetchOrganigrama();
      setOrganigrama(data?.estructura || []);
    } catch {
      setError("Error al cargar el organigrama");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadOrganigrama();
  }, []);

  const handleSave = async () => {
    setSuccess("");
    setError("");
    setSaving(true);
    try {
      const res = await saveOrganigrama(organigrama);
      if (res) {
        setSuccess("Guardado correctamente");
        setEdit(false);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Error al guardar");
      }
    } finally {
      setSaving(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#0a1627]' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      <Sidebar selected="organigrama" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={() => {}} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-100'
              }`}>
                <Network className={`w-7 h-7 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Organigrama Empresarial" />
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Administra la estructura jerárquica" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => loadOrganigrama(true)}
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
            <OrganigramaStats nodes={organigrama} theme={theme} />
          </div>

          {/* Action Buttons */}
          <div className={`mb-6 p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
            theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEdit(!edit)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all active:scale-95 ${
                  edit
                    ? theme === 'dark' 
                      ? 'bg-blue-600/20 text-blue-400' 
                      : 'bg-blue-100 text-blue-700'
                    : theme === 'dark'
                      ? 'bg-amber-600/20 text-amber-400 hover:bg-amber-600/30'
                      : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                {edit ? (
                  <>
                    <Eye className="w-4 h-4" />
                    <TranslateText text="Ver Organigrama" />
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    <TranslateText text="Editar Organigrama" />
                  </>
                )}
              </button>
            </div>

            {edit && (
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
                  saving ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 active:scale-95'
                } bg-emerald-600 text-white`}
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <TranslateText text="Guardando..." />
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <TranslateText text="Guardar Cambios" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <div className={`rounded-2xl border p-12 text-center ${
              theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-purple-600 mb-3"></div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                <TranslateText text="Cargando organigrama..." />
              </p>
            </div>
          ) : edit ? (
            <OrganigramaEditor nodes={organigrama} onChange={setOrganigrama} theme={theme} />
          ) : (
            <OrganigramaTree nodes={organigrama} theme={theme} />
          )}
        </main>
      </div>
    </div>
  );
}
