
import React from "react";
import { Mail, Shield, Crown, Lock, Unlock } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

const permissionLabels: Record<string, string> = {
  read: "Leer",
  write: "Escribir",
  delete: "Eliminar",
  export: "Exportar",
  manage_users: "Gestionar usuarios",
  manage_roles: "Gestionar roles",
  view_audit: "Ver auditoría",
  block_user: "Bloquear usuario"
};

const roleLabels: Record<string, string> = {
  superadmin: "Super Administrador",
  admin: "Administrador",
  editor: "Editor",
  viewer: "Lector",
  moderator: "Moderador"
};

export default function UserDetailsModal({ user, onClose, theme = 'light' }: { user: any, onClose: () => void, theme?: 'light' | 'dark' }) {
  if (!user) return null;
  const roles = Array.isArray(user.role) ? user.role : (user.roles || [user.role as string]);
  let displayPerms = user.permissions && user.permissions.length > 0 ? user.permissions : [];
  if (displayPerms.length === 0 && roles.length > 0) {
    const defaultPerms: Record<string, string[]> = {
      superadmin: ['read','write','delete','export','manage_users','manage_roles','view_audit','block_user'],
      admin: ['read','write','manage_users','view_audit','block_user'],
      editor: ['read','write'],
      viewer: ['read'],
      moderator: ['read','block_user']
    };
    displayPerms = defaultPerms[roles[0]] || [];
  }

  // Historial de sesiones (logs)
  const [logs, setLogs] = React.useState<any[]>(user.logs || []);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const [page, setPage] = React.useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(logs.length / pageSize);
  const paginatedLogs = logs.slice((page - 1) * pageSize, page * pageSize);
  const successCount = logs.filter((l: any) => l.success).length;
  const failCount = logs.filter((l: any) => !l.success).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Cerrar fondo modal"
        tabIndex={-1}
        style={{ cursor: 'pointer' }}
      />
      <div className={`rounded-2xl p-8 max-w-md w-full shadow-2xl relative z-10 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl">×</button>
        <div className="flex items-center gap-3 mb-4">
          <div className={`rounded-full p-3 ${theme === 'dark' ? 'bg-blue-700/40' : 'bg-blue-100'}`}> <Mail className="w-6 h-6 text-blue-500" /> </div>
          <div>
            <div className="font-bold text-lg">{user.email}</div>
            <div className="flex gap-2 mt-1 flex-wrap">
              {roles.map((r: string) => (
                <span key={r} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${theme === 'dark' ? 'bg-gray-900/80 text-blue-200 border-blue-700' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                  {r === 'superadmin' ? <Crown className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />} {roleLabels[r] || r}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-1">Permisos:</div>
          <div className="flex flex-wrap gap-2">
            {displayPerms.length > 0 ? displayPerms.map((p: string) => (
              <span key={p} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${theme === 'dark' ? 'bg-green-900/60 text-green-200 border-green-700' : 'bg-green-50 text-green-700 border-green-200'}`}>{permissionLabels[p] || p}</span>
            )) : <span className="text-xs text-gray-400">Sin permisos</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-1">Estado:</div>
          {user.bloqueado ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700"><Lock className="w-3.5 h-3.5" /> Bloqueado</span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700"><Unlock className="w-3.5 h-3.5" /> Activo</span>
          )}
        </div>
      </div>
    </div>
  );
}
