"use client";

import { useEffect, useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import { X, User, Mail, Shield, Clock, Globe, Monitor, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface Usuario {
  email: string;
  role: string | string[];
  roles?: string[];
  permissions?: string[];
  bloqueado?: boolean;
}

interface AuditLogEntry {
  user_id: string;
  timestamp?: string;
  ip?: string;
  user_agent?: string;
  success: boolean;
  reason?: string;
}

interface UserDetailsModalProps {
  user: Usuario | null;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

export default function UserDetailsModal({ user, onClose, theme = 'light' }: UserDetailsModalProps) {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    if (!user) return;
    const admin = sessionStorage.getItem("admin") === "true";
    const role = sessionStorage.getItem("role") || "";
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/admin/audit`, {
      headers: {
        "Content-Type": "application/json",
        "X-Admin": String(admin),
        "X-Role": role,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        setLogs((data.logs || []).filter((l: AuditLogEntry) => l.user_id === user.email));
        setLoading(false);
      })
      .catch(() => {
        setError("No autorizado o error de servidor");
        setLoading(false);
      });
  }, [user]);

  if (!user) return null;

  const roles = Array.isArray(user.role) ? user.role : (user.roles || [user.role]);
  const totalPages = Math.ceil(logs.length / pageSize);
  const paginatedLogs = logs.slice((page - 1) * pageSize, page * pageSize);
  const successCount = logs.filter(l => l.success).length;
  const failCount = logs.filter(l => !l.success).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
        theme === 'dark' ? 'bg-gray-900 border border-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`p-5 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${
                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <User className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <h2 className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <TranslateText text="Detalles del Usuario" />
                </h2>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* User Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <TranslateText text="Email" />
                </span>
              </div>
              <p className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {user.email}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <Shield className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <TranslateText text="Roles" />
                </span>
              </div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {roles.join(', ')}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {user.bloqueado ? (
                  <XCircle className={`w-4 h-4 text-red-500`} />
                ) : (
                  <CheckCircle className={`w-4 h-4 text-green-500`} />
                )}
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <TranslateText text="Estado" />
                </span>
              </div>
              <p className={`text-sm font-medium ${
                user.bloqueado
                  ? 'text-red-500'
                  : 'text-green-500'
              }`}>
                <TranslateText text={user.bloqueado ? "Bloqueado" : "Activo"} />
              </p>
            </div>
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <TranslateText text="Inicios" />
                </span>
              </div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {logs.length} <span className="text-green-500">({successCount}✓)</span> <span className="text-red-500">({failCount}✗)</span>
              </p>
            </div>
          </div>

          {/* Permisos */}
          {user.permissions && user.permissions.length > 0 && (
            <div className={`mb-6 p-4 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <h3 className={`text-sm font-semibold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <TranslateText text="Permisos Asignados" />
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.permissions.map((perm) => (
                  <span
                    key={perm}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Historial de Sesiones */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <TranslateText text="Historial de Inicios de Sesión" />
            </h3>

            {loading ? (
              <div className={`p-8 text-center rounded-xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-2"></div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <TranslateText text="Cargando historial..." />
                </p>
              </div>
            ) : error ? (
              <div className={`p-4 rounded-xl ${
                theme === 'dark' ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
              }`}>
                {error}
              </div>
            ) : logs.length === 0 ? (
              <div className={`p-8 text-center rounded-xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <TranslateText text="No hay registros de inicio de sesión." />
                </p>
              </div>
            ) : (
              <div className={`rounded-xl border overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
                      <th className={`px-3 py-2 text-left font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <TranslateText text="Fecha" />
                        </div>
                      </th>
                      <th className={`px-3 py-2 text-left font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <div className="flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5" />
                          IP
                        </div>
                      </th>
                      <th className={`px-3 py-2 text-left font-medium hidden md:table-cell ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <div className="flex items-center gap-1">
                          <Monitor className="w-3.5 h-3.5" />
                          <TranslateText text="Dispositivo" />
                        </div>
                      </th>
                      <th className={`px-3 py-2 text-center font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <TranslateText text="Estado" />
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-100'}`}>
                    {paginatedLogs.map((log, i) => (
                      <tr key={i} className={theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}>
                        <td className={`px-3 py-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {log.timestamp ? new Date(log.timestamp).toLocaleString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : '-'}
                        </td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {log.ip || '-'}
                          </span>
                        </td>
                        <td className={`px-3 py-2 hidden md:table-cell max-w-[150px] truncate ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {log.user_agent || '-'}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {log.success ? (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                              theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700'
                            }`}>
                              <CheckCircle className="w-3 h-3" />
                              <TranslateText text="OK" />
                            </span>
                          ) : (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                              theme === 'dark' ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-700'
                            }`}>
                              <XCircle className="w-3 h-3" />
                              <TranslateText text="Fallo" />
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className={`px-3 py-2 border-t flex items-center justify-between ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                  }`}>
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {page} / {totalPages}
                    </span>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setPage(p => Math.max(1, p - 1))} 
                        disabled={page === 1}
                        className={`p-1 rounded transition-all disabled:opacity-40 ${
                          theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                        disabled={page === totalPages}
                        className={`p-1 rounded transition-all disabled:opacity-40 ${
                          theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
