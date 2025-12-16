"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Network, RefreshCw, Save, Eye, Edit3, LayoutTemplate } from "lucide-react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import { fetchOrganigrama, saveOrganigrama, OrganigramaNode } from "./OrganigramaAPI";
import Toast from "../../components/Toast";
import { getValidationSummary } from "./validation";
import { OrganigramaTree } from "./OrganigramaTree";
import { OrganigramaEditor } from "./OrganigramaEditor";
import OrganigramaStats from "./OrganigramaStats";
import { TemplateSelector } from "./TemplateSelector";
import OrganigramaAuditPanel from "./OrganigramaAuditPanel";

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
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [insertedCount, setInsertedCount] = useState<number | null>(null);
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success'|'error'|'info'; message: string }>>([]);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const PENDING_KEY = 'organigrama_pending';

  const addToast = (type: 'success'|'error'|'info', message: string) => {
    const id = `${Date.now().toString()}-${Math.random().toString(36).slice(2)}`;
    setToasts((s) => [...s, { id, type, message }]);
    // auto remove in 4.2s as fallback (Toast component also auto-hides)
    setTimeout(() => setToasts((s) => s.filter(t => t.id !== id)), 4200);
  };

  const removeToast = (id?: string) => {
    if (!id) return;
    setToasts((s) => s.filter(t => t.id !== id));
  };

  // Pending local storage helpers: store nodes that couldn't be saved to server
  const getPending = (): OrganigramaNode[] => {
    try { const raw = localStorage.getItem(PENDING_KEY); if (!raw) return []; return JSON.parse(raw) as OrganigramaNode[]; } catch { return []; }
  };
  const savePending = (nodes: OrganigramaNode[]) => {
    try {
      const prev = getPending();
      const merged = [...prev];
      nodes.forEach(n => { if (!merged.some(m => m.id === n.id)) merged.push(n); });
      localStorage.setItem(PENDING_KEY, JSON.stringify(merged));
      setPendingCount(merged.length);
    } catch (e) { /* ignore */ }
  };
  const clearPending = () => { try { localStorage.removeItem(PENDING_KEY); setPendingCount(0); } catch (e) {} };
  const loadAndMergePending = () => {
    const pending = getPending();
    if (pending.length) {
      setOrganigrama(prev => {
        const merged = [...prev];
        pending.forEach(n => { if (!merged.some(m => m.id === n.id)) merged.push(n); });
        return merged;
      });
      setPendingCount(pending.length);
      addToast('info', `Hay ${pending.length} cambios locales pendientes (no sincronizados)`);
    }
    return pending;
  };
  const retryPendingSave = async () => {
    const pending = getPending();
    if (!pending.length) { addToast('info', 'No hay cambios pendientes para sincronizar'); return; }
    const merged = [...organigrama];
    pending.forEach(n => { if (!merged.some(m => m.id === n.id)) merged.push(n); });
    addToast('info', 'Reintentando sincronizar cambios pendientes...');
    try {
      const res = await saveOrganigrama(merged);
      if (res && (res as any).estructura) {
        setOrganigrama((res as any).estructura || []);
        clearPending();
        addToast('success', 'Cambios pendientes sincronizados');
      } else {
        addToast('error', 'No se pudo sincronizar cambios pendientes');
      }
    } catch {
      addToast('error', 'Error al intentar sincronizar cambios pendientes');
    }
  };

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
      // restore any locally pending nodes that couldn't be synced
      if (typeof window !== "undefined") loadAndMergePending();
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

  const validationSummary = useMemo(() => getValidationSummary(organigrama), [organigrama]);

  const handleSave = async () => {
    setSuccess("");
    setError("");
    setSaving(true);
    setValidationErrors([]);
    // Client-side pre-validation to avoid unnecessary roundtrips
    const summary = getValidationSummary(organigrama);
    if (!summary.isValid) {
      setValidationErrors(summary.errors);
      setError('Hay errores en la estructura. Corrígelos antes de guardar.');
      setSaving(false);
      return;
    }
    try {
      const res = await saveOrganigrama(organigrama);
      if (res && (res as any).errors) {
        setValidationErrors((res as any).errors || []);
        setError('El servidor rechazó la estructura. Revisa los errores.');
      } else if (res) {
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

  const handleApplyTemplate = (structure: OrganigramaNode[]) => {
    // Append template nodes to the existing structure (insert behavior)
    const firstNewId = structure.length > 0 ? structure[0].id : null;
    setOrganigrama(prev => [...prev, ...structure]);
    setEdit(false); // switch to view so relationships are visible
    setSuccess("Plantilla aplicada - Vista previa (edita si lo deseas)");
    setInsertedCount(structure.length);
    setTimeout(() => setSuccess(""), 4000);

    // Clear the inserted banner after a few seconds
    setTimeout(() => setInsertedCount(null), 4000);

    // Scroll to the first new node after render
    if (firstNewId) {
      setTimeout(() => {
        try {
          const el = document.querySelector(`[data-node-id="${firstNewId}"]`);
          if (el && typeof (el as any).scrollIntoView === 'function') {
            (el as any).scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } catch (err) {
          // ignore
        }
      }, 150);
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
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-purple-600/40 to-pink-600/40 shadow-purple-900/40' 
                  : 'bg-gradient-to-br from-purple-100 to-pink-100 shadow-purple-200/50'
              }`}>
                <Network className={`w-7 h-7 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`} />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Organigrama Empresarial" />
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Administra la estructura jerárquica de tu organización" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!edit && (
                <button
                  onClick={() => setTemplateOpen(true)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all backdrop-blur-sm hover:shadow-lg active:scale-95 ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-r from-amber-600/30 to-orange-600/30 text-amber-300 border border-amber-500/30 hover:bg-amber-600/40 shadow-lg shadow-amber-500/20' 
                      : 'bg-gradient-to-r from-amber-100/60 to-orange-100/60 text-amber-700 border border-amber-200/60 hover:bg-amber-200/80 shadow-md shadow-amber-200/40'
                  }`}
                >
                  <LayoutTemplate className="w-4 h-4" />
                  <TranslateText text="Plantilla" />
                </button>
              )}
              <button
                onClick={() => loadOrganigrama(true)}
                disabled={refreshing}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all backdrop-blur-sm ${
                  refreshing ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg active:scale-95'
                } ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 border border-blue-500/30 hover:bg-blue-600/40 shadow-lg shadow-blue-500/20' 
                    : 'bg-gradient-to-r from-blue-100/60 to-purple-100/60 text-blue-700 border border-blue-200/60 hover:bg-blue-200/80 shadow-md shadow-blue-200/40'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <TranslateText text="Actualizar" />
              </button>
              {typeof window !== 'undefined' && sessionStorage.getItem('role') === 'superadmin' && sessionStorage.getItem('admin') === 'true' && (
                <button onClick={() => setAuditOpen(true)} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl font-medium ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
                  <TranslateText text="Historial" />
                </button>
              )}
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
          {auditOpen && (
            <OrganigramaAuditPanel onClose={() => setAuditOpen(false)} onReverted={() => loadOrganigrama(true)} />
          )}
          {error && (
            <div className={`mb-6 p-4 rounded-xl flex flex-col gap-3 ${
              theme === 'dark' ? 'bg-red-900/30 border border-red-800' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                  {error}
                </span>
              </div>
            </div>
          )}

          {/* Inserted nodes banner */}
          {insertedCount !== null && (
            <div className={`mb-6 p-3 rounded-xl flex items-center gap-3 ${theme === 'dark' ? 'bg-emerald-900/30 border border-emerald-800' : 'bg-emerald-50 border border-emerald-200'}`}>
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-800'}`}>
                {`Se insertaron ${insertedCount} nodos`}
              </span>
            </div>
          )}

          {/* Pending local changes banner */}
          {pendingCount > 0 && (
            <div className={`mb-6 p-3 rounded-xl flex items-center gap-3 ${theme === 'dark' ? 'bg-yellow-900/30 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'}`}>
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="flex-1 text-sm font-medium">
                {`Hay ${pendingCount} cambios locales pendientes (no sincronizados)`}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => retryPendingSave()} className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-yellow-700 text-white' : 'bg-yellow-100 text-yellow-800'}`}>Reintentar</button>
                <button onClick={() => { clearPending(); addToast('info', 'Cambios pendientes descartados'); }} className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border'}`}>Descartar</button>
              </div>
            </div>
          )} 
          {validationErrors && validationErrors.length > 0 && (
            <div className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-600'}`}>
              <strong><TranslateText text="Errores de validación:" /></strong>
              <ul className="list-disc ml-5 mt-2">
                {validationErrors.map((e, i) => (
                  <li key={i}>{e.error || JSON.stringify(e)}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Toast area */}
          {toasts.length > 0 && (
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
              {toasts.map(t => (
                <Toast key={t.id} id={t.id} type={t.type} message={t.message} onClose={removeToast} />
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="mb-8">
            <OrganigramaStats nodes={organigrama} theme={theme} />
          </div>

          {/* Action Buttons */}
          <div className={`mb-6 p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl ${
            theme === 'dark' 
              ? 'bg-gray-900/80 border-gray-700/50 shadow-2xl shadow-purple-900/20' 
              : 'bg-white/95 border-white/20 shadow-xl shadow-blue-200/30'
          }`}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEdit(!edit)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all backdrop-blur-sm active:scale-95 ${
                  edit
                    ? theme === 'dark' 
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30 hover:bg-blue-600/40' 
                      : 'bg-blue-100/60 text-blue-700 border border-blue-200/60 hover:bg-blue-200/80'
                    : theme === 'dark'
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30 hover:bg-purple-600/40'
                      : 'bg-purple-100/60 text-purple-700 border border-purple-200/60 hover:bg-purple-200/80'
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
                  disabled={saving || !validationSummary.isValid}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all backdrop-blur-sm ${
                  saving ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg active:scale-95'
                } bg-gradient-to-r from-emerald-600/40 to-green-600/40 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/50 shadow-lg shadow-emerald-500/20`}
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-emerald-300/30 border-t-emerald-300 rounded-full animate-spin" />
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
            <OrganigramaEditor
              nodes={organigrama}
              onChange={setOrganigrama}
              theme={theme}
              onCreateNode={async (node) => {
                // Append node locally and save immediately
                const updated = [...organigrama, node];
                setOrganigrama(updated);
                setEdit(true);
                setSuccess('Guardando nodo...');
                addToast('info', 'Guardando nodo...');
                try {
                  const res = await saveOrganigrama(updated);
                  if (res && (res as any).errors) {
                    setValidationErrors((res as any).errors || []);
                    setError('El servidor rechazó el nodo. Revisa los errores.');
                    addToast('error', 'El servidor rechazó el nodo');
                    return { errors: (res as any).errors || [] };
                  } else if (res) {
                    setSuccess('Nodo guardado');
                    addToast('success', 'Nodo guardado correctamente');
                    setTimeout(() => setSuccess(''), 3000);
                    return { ok: true };
                  } else {
                    setError('Error al guardar el nodo');
                    addToast('error', 'Error al guardar nodo');
                    return { errors: [{ error: 'Error al guardar' }] };
                  }
                } catch (err) {
                  setError('Error al guardar el nodo');
                  // Save node locally as pending so it is not lost
                  try { savePending([node]); } catch (e) {}
                  addToast('info', 'Nodo guardado localmente (pendiente)');
                  return { ok: true };
                }
              }}
            />
          ) : (
            <OrganigramaTree nodes={organigrama} theme={theme} />
          )}
        </main>
      </div>

      {/* Template Selector Modal */}
      <TemplateSelector
        isOpen={templateOpen}
        onClose={() => setTemplateOpen(false)}
        onSelectTemplate={handleApplyTemplate}
        onApplyAndSave={async (structure) => {
          // structure here is FLAT (for backend). Convert to nested for UI append.
          const { buildNestedFromFlat } = await import('./OrganigramaAPI');
          const nestedToAppend = buildNestedFromFlat ? buildNestedFromFlat(structure as any) : [];
          const updated = [...organigrama, ...nestedToAppend];
          setOrganigrama(updated);
          setEdit(false); // switch to view so relationships are visible
          addToast('info', 'Guardando plantilla...');
          setInsertedCount(structure.length);
          try {
            // For saving, saveOrganigrama will flatten nested structure before sending
            console.debug('Saving organigrama payload (nested):', updated);
            const res = await saveOrganigrama(updated);
            console.debug('Save response:', res);
            if (res && (res as any).errors) {
              setValidationErrors((res as any).errors || []);
              setError('El servidor rechazó la estructura. Revisa los errores.');
              addToast('error', 'El servidor rechazó la plantilla');
              // Save locally as pending so user doesn't lose work
              savePending(structure as any[]);
            } else if (res && (res as any).estructura) {
              // Update local state from server returned estructura (nested)
              setOrganigrama((res as any).estructura || []);
              setSuccess('Guardado correctamente');
              clearPending();
              addToast('success', 'Plantilla guardada correctamente');
              setTimeout(() => setSuccess(''), 3000);
            } else if (res && (res as any).ok === false) {
              setError('Error al guardar');
              addToast('error', 'Error al guardar plantilla');
              savePending(structure as any[]);
            } else {
              // Fallback: if res is null or unexpected, perform a fresh load
              await loadOrganigrama(true);
              setSuccess('Guardado (actualizado)');
              addToast('success', 'Plantilla aplicada');
            }
          } catch (err) {
            console.error('Save organigrama error:', err);
            // Store locally pending nodes so they remain visible to the user until sync
            savePending(structure as any[]);
            if ((err as any)?.status === 403) {
              addToast('error', 'Acceso denegado (403). Se guardó localmente y está pendiente. Revisa tus permisos.');
            } else {
              setError('Error al guardar');
              addToast('error', 'Error al guardar plantilla. Guardado local (pendiente)');
            }
          }
          setTimeout(() => setInsertedCount(null), 4000);
        }}
        theme={theme}
      />
    </div>
  );
}
