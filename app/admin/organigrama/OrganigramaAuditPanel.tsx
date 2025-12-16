"use client";

import React, { useEffect, useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import { Trash2, RotateCcw } from "lucide-react";
import { saveOrganigrama } from "./OrganigramaAPI";

interface AuditLog {
  action: string;
  user?: string;
  ip?: string;
  timestamp?: string;
  before?: any[];
  after?: any[];
}

export default function OrganigramaAuditPanel({ onClose, onReverted }: { onClose: () => void; onReverted?: () => void }) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/admin/organigrama/audit', { credentials: 'include' });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err: any) {
      console.error(err);
      setError('No se pudo cargar el historial.');
    } finally {
      setLoading(false);
    }
  }

  async function handleRevert(log: AuditLog) {
    if (!log.before) return;
    if (!confirm('¿Revertir la estructura a este punto? Esta acción sobrescribirá la estructura actual.')) return;
    setProcessingId(log.timestamp || 'reverting');
    try {
      const res = await saveOrganigrama(log.before);
      // saveOrganigrama returns parsed server response even on error
      if ((res as any)?.ok === false || (res as any)?.errors) {
        alert('Error al revertir: ' + ((res as any).errors ? JSON.stringify((res as any).errors) : (res as any).message || ''))
      } else {
        alert('Revertido correctamente');
        if (onReverted) onReverted();
        onClose();
      }
    } catch (e) {
      console.error(e);
      alert('Error inesperado al revertir');
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold"><TranslateText text="Historial del Organigrama" /></h3>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Cerrar</button>
          </div>
        </div>

        {loading ? (
          <div className="p-6 text-center">Cargando...</div>
        ) : error ? (
          <div className="p-4 text-red-600">{error}</div>
        ) : logs.length === 0 ? (
          <div className="p-4 text-sm text-gray-600">No hay registros</div>
        ) : (
          <div className="max-h-96 overflow-auto space-y-3">
            {logs.map((l, idx) => (
              <div key={idx} className="p-3 rounded border bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700 dark:text-gray-200">{l.timestamp} — {l.user || 'Sistema'}</div>
                  <div className="flex items-center gap-2">
                    <button title="Revertir a antes" disabled={processingId !== null}
                      onClick={() => handleRevert(l)}
                      className="inline-flex items-center gap-2 px-2 py-1 rounded bg-red-600 text-white text-sm">
                      <RotateCcw className="w-4 h-4" /> <span>Revertir</span>
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <div><strong>Resumen:</strong> {l.before?.length || 0} nodos antes → {l.after?.length || 0} nodos después</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
