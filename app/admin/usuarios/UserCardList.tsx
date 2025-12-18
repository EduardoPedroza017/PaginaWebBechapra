"use client";

import { Mail, Shield, Crown, Edit2, Trash2, MoreVertical } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface Usuario {
  email: string;
  role: string | string[];
  roles?: string[];
  permissions?: string[];
  bloqueado?: boolean;
}

interface UserCardListProps {
  users: Usuario[];
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onEdit: (user: Usuario) => void;
  onDelete: (user: Usuario) => void;
  onBlock: (user: Usuario, newState: boolean) => void;
  onViewDetails: (user: Usuario) => void;
  theme?: 'light' | 'dark';
}

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

export default function UserCardList({
  users,
  page,
  pageSize,
  onPageChange,
  onEdit,
  onDelete,
  onBlock,
  onViewDetails,
  theme = 'light'
}: UserCardListProps) {
  let paginatedUsers = users;
  let totalPages = 1;
  if (page !== undefined && pageSize !== undefined) {
    totalPages = Math.ceil(users.length / pageSize);
    paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-2 md:px-0">
      {paginatedUsers.length === 0 ? (
        <div className="col-span-full text-center py-12 text-gray-400">
          <TranslateText text="No se encontraron usuarios" />
        </div>
      ) : (
        paginatedUsers.map((user) => {
          const roles = Array.isArray(user.role) ? user.role : (user.roles || [user.role as string]);
          // Si no tiene permisos explícitos, mostrar los permisos por defecto del rol principal
          let displayPerms = user.permissions && user.permissions.length > 0 ? user.permissions : [];
          if (displayPerms.length === 0 && roles.length > 0) {
            // Mostrar permisos por defecto del primer rol
            const defaultPerms: Record<string, string[]> = {
              superadmin: ['read','write','delete','export','manage_users','manage_roles','view_audit','block_user'],
              admin: ['read','write','manage_users','view_audit','block_user'],
              editor: ['read','write'],
              viewer: ['read'],
              moderator: ['read','block_user']
            };
            displayPerms = defaultPerms[roles[0]] || [];
          }
          return (
            <div
              key={user.email}
              className={`min-w-[220px] max-w-full sm:max-w-[340px] rounded-2xl border shadow-xl p-7 flex flex-col gap-5 transition-all
                ${user.bloqueado ? 'opacity-60 scale-[0.97]' : 'opacity-100'}
                hover:scale-[1.025]
                ${theme === 'dark' ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 border-blue-900' : 'bg-linear-to-br from-white via-blue-50 to-white border-blue-200'}`}
              style={{ minHeight: 260 }}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-3 shadow-md ${theme === 'dark' ? 'bg-blue-700/40' : 'bg-blue-100'}`}> <Mail className="w-6 h-6 text-blue-500" /> </div>
                <div className="min-w-0">
                  <div className={`font-bold text-lg truncate max-w-[180px] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user.email}</div>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {roles.map(r => (
                      <span key={r} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border shadow-sm ${theme === 'dark' ? 'bg-gray-900/80 text-blue-200 border-blue-700' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                        {r === 'superadmin' ? <Crown className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />} {roleLabels[r] || r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span className={`text-xs font-semibold ${user.bloqueado ? 'text-red-600' : 'text-green-600'}`}>{user.bloqueado ? 'Bloqueado' : 'Activo'}</span>
                  <span className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                    <input
                      type="checkbox"
                      checked={!user.bloqueado}
                      onChange={e => onBlock(user, !e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer left-0 top-0 shadow"
                      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}
                    />
                    <span className={`toggle-label block overflow-hidden h-6 rounded-full ${user.bloqueado ? 'bg-red-400' : 'bg-green-400'}`}></span>
                  </span>
                </label>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                <button onClick={() => onEdit(user)} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all"><Edit2 className="w-4 h-4 inline" /> Editar</button>
                <button onClick={() => onDelete(user)} className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-all"><Trash2 className="w-4 h-4 inline" /> Eliminar</button>
                <button onClick={() => onViewDetails(user)} className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-800 text-xs font-semibold hover:bg-gray-300 transition-all"><MoreVertical className="w-4 h-4 inline" /> Detalles</button>
              </div>
            </div>
          );
        })
      )}
      {/* Paginación */}
      {page !== undefined && pageSize !== undefined && onPageChange && totalPages > 1 && (
        <div className="col-span-full flex justify-center mt-6 gap-2">
          <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-800 text-xs font-semibold disabled:opacity-50">Anterior</button>
          <span className="px-2 py-1 text-xs">Página {page} de {totalPages}</span>
          <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-800 text-xs font-semibold disabled:opacity-50">Siguiente</button>
        </div>
      )}
    </div>
  );
}
