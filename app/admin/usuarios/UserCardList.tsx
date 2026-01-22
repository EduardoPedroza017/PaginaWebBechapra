"use client";

import { Mail, Shield, Crown, Edit2, Trash2, MoreVertical, Lock, Unlock } from "lucide-react";
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

const roleLabels: Record<string, string> = {
  superadmin: "Super Admin",
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
  const isDark = theme === 'dark';
  
  let paginatedUsers = users;
  let totalPages = 1;
  
  if (page !== undefined && pageSize !== undefined) {
    totalPages = Math.ceil(users.length / pageSize);
    paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);
  }

  const getRoleDisplay = (role: string) => {
    return roleLabels[role] || role;
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {paginatedUsers.length === 0 ? (
        <div className={`col-span-full text-center py-12 rounded-lg ${
          isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-500'
        }`}>
          <TranslateText text="No se encontraron usuarios" />
        </div>
      ) : (
        paginatedUsers.map((user) => {
          const roles = Array.isArray(user.role) ? user.role : (user.roles || [user.role as string]);
          const isBlocked = user.bloqueado || false;

          return (
            <div
              key={user.email}
              className={`rounded-lg border p-4 grid grid-cols-1 gap-3 transition-colors ${
                isBlocked ? 'opacity-70' : ''
              } ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 hover:bg-slate-700/50' 
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              {/* Header with Email */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-slate-700' : 'bg-slate-100'
                  }`}>
                    <Mail className={`w-5 h-5 ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Roles */}
              <div className="flex flex-wrap gap-1.5">
                {roles.map(role => (
                  <span 
                    key={role}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      role === 'superadmin' 
                        ? isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'
                        : role === 'admin'
                        ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                        : isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {role === 'superadmin' ? <Crown className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                    {getRoleDisplay(role)}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => onEdit(user)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium ${
                    isDark 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Edit2 className="w-4 h-4" />
                  <span><TranslateText text="Editar" /></span>
                </button>
                
                <button 
                  onClick={() => onDelete(user)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium ${
                    isDark 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span><TranslateText text="Eliminar" /></span>
                </button>
                
                <button 
                  onClick={() => onViewDetails(user)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium ${
                    isDark 
                      ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  }`}
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Block Toggle */}
              <div className="mt-3 pt-3 border-t border-slate-700/30">
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <span className={`text-sm ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {isBlocked ? 'Desbloquear usuario' : 'Bloquear usuario'}
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={!isBlocked}
                      onChange={e => onBlock(user, !e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-5 rounded-full transition-colors ${
                      isBlocked 
                        ? isDark ? 'bg-red-600/50' : 'bg-red-300'
                        : isDark ? 'bg-green-600/50' : 'bg-green-300'
                    }`}>
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                        isBlocked ? 'translate-x-0' : 'translate-x-5'
                      }`} />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          );
        })
      )}

      {/* Pagination */}
      {page !== undefined && pageSize !== undefined && onPageChange && totalPages > 1 && (
        <div className="col-span-full flex justify-center mt-6 gap-2">
          <button 
            onClick={() => onPageChange(page - 1)} 
            disabled={page === 1}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              isDark 
                ? 'bg-slate-700 text-slate-300 disabled:opacity-50' 
                : 'bg-slate-100 text-slate-700 disabled:opacity-50'
            }`}
          >
            <TranslateText text="Anterior" />
          </button>
          <div className={`px-3 py-1.5 text-sm ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Página {page} de {totalPages}
          </div>
          <button 
            onClick={() => onPageChange(page + 1)} 
            disabled={page === totalPages}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              isDark 
                ? 'bg-slate-700 text-slate-300 disabled:opacity-50' 
                : 'bg-slate-100 text-slate-700 disabled:opacity-50'
            }`}
          >
            <TranslateText text="Siguiente" />
          </button>
        </div>
      )}
    </div>
  );
}