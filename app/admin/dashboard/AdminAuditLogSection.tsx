"use client";

import { useEffect, useState } from "react";
import { Globe, User, Clock, Shield, MapPin } from "lucide-react";

interface AdminAuditLog {
  action?: string;
  by?: string;
  target?: string;
  ip?: string;
  geo?: { country?: string; city?: string };
  timestamp?: string;
  details?: any;
}

export default function AdminAuditLogSection() {
  const [logs, setLogs] = useState<AdminAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/admin/audit-admin");
        const data = await res.json();
        setLogs(data.logs || []);
        setError("");
      } catch {
        setError("No autorizado o error de servidor");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-bold">Registro de Acciones Administrativas</h2>
      </div>
      {loading ? (
        <div className="py-8 text-center text-gray-400">Cargando...</div>
      ) : error ? (
        <div className="py-8 text-center text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-800/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900">
                <th className="px-4 py-3 text-left font-semibold text-gray-300"><User className="inline w-4 h-4 mr-1" />Usuario</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-300">Acción</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-300">Afectado</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-300"><Clock className="inline w-4 h-4 mr-1" />Fecha/Hora</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-300"><Globe className="inline w-4 h-4 mr-1" />IP</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-300"><MapPin className="inline w-4 h-4 mr-1" />Ubicación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {logs.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-6 text-gray-400">Sin registros</td></tr>
              ) : logs.map((log, i) => (
                <tr key={i} className="hover:bg-gray-900/40 transition-colors">
                  <td className="px-4 py-3 text-gray-100">{log.by || '-'}</td>
                  <td className="px-4 py-3 text-gray-100">{log.action || '-'}</td>
                  <td className="px-4 py-3 text-gray-100">{log.target || '-'}</td>
                  <td className="px-4 py-3 text-gray-400">{log.timestamp ? new Date(log.timestamp).toLocaleString('es-ES') : '-'}</td>
                  <td className="px-4 py-3 text-gray-400 font-mono">{log.ip || '-'}</td>
                  <td className="px-4 py-3 text-gray-400">{log.geo && (log.geo.city || log.geo.country) ? `${log.geo.city || ''}${log.geo.city && log.geo.country ? ', ' : ''}${log.geo.country || ''}` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
