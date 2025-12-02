"use client";

import { useEffect, useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import { CheckCircle, XCircle } from "lucide-react";

type AuditLogEntry = {
  user_id?: string | Record<string, unknown>;
  timestamp?: string;
  ip?: string | Record<string, unknown>;
  user_agent?: string | Record<string, unknown>;
  success: boolean;
  reason?: string | Record<string, unknown>;
};

export default function AuditLog() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const admin = sessionStorage.getItem("admin") === "true";
    const role = sessionStorage.getItem("role") || "";
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/audit`, {
      headers: {
        "Content-Type": "application/json",
        "X-Admin": String(admin),
        "X-Role": role,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch(() => {
        setError("No autorizado o error de servidor");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4"><TranslateText text="Cargando auditoría..." /></div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  // Detectar modo oscuro
  const isDark = typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false;

  const formatCell = (value?: string | Record<string, unknown>) => {
    if (value === undefined || value === null) return "-";
    if (typeof value === "object") {
      try {
        return JSON.stringify(value);
      } catch (err) {
        return "{";
      }
    }
    return value;
  };

  return (
    <div className="mt-8">
      <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}><TranslateText text="Auditoría de inicios de sesión" /></h2>
      <div className="overflow-x-auto">
        <table className={`min-w-full text-sm border rounded-xl overflow-hidden ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
          <thead>
            <tr className={isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'}>
              <th className={`px-3 py-2 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}><TranslateText text="Usuario" /></th>
              <th className={`px-3 py-2 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}><TranslateText text="Fecha/Hora" /></th>
              <th className={`px-3 py-2 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}><TranslateText text="IP" /></th>
              <th className={`px-3 py-2 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}><TranslateText text="User Agent" /></th>
              <th className={`px-3 py-2 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}><TranslateText text="Éxito" /></th>
              <th className={`px-3 py-2 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}><TranslateText text="Motivo" /></th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr
                key={i}
                className={
                  log.success
                    ? isDark
                      ? 'bg-green-900/20 text-green-200'
                      : 'bg-green-50 text-green-900'
                    : isDark
                      ? 'bg-red-900/20 text-red-200'
                      : 'bg-red-50 text-red-900'
                }
              >
                <td className={`px-3 py-2 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>{formatCell(log.user_id)}</td>
                <td className={`px-3 py-2 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>{log.timestamp ? new Date(log.timestamp).toLocaleString() : "-"}</td>
                <td className={`px-3 py-2 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>{formatCell(log.ip)}</td>
                <td className={`px-3 py-2 border max-w-xs truncate ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>{formatCell(log.user_agent)}</td>
                <td className={`px-3 py-2 border text-center ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  {log.success ? (
                    <span className="inline-flex items-center justify-center">
                      <CheckCircle className="inline w-5 h-5 text-green-500" />
                      <span className="sr-only"><TranslateText text="Exitoso" /></span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center">
                      <XCircle className="inline w-5 h-5 text-red-500" />
                      <span className="sr-only"><TranslateText text="Fallido" /></span>
                    </span>
                  )}
                </td>
                <td className={`px-3 py-2 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>{formatCell(log.reason)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
