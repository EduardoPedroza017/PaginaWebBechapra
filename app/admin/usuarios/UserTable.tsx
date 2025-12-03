"use client";

import { useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import { 
  Mail, Shield, Key, MoreVertical, Edit2, Trash2, Lock, Unlock, 
  Eye, ChevronLeft, ChevronRight, CheckCircle, XCircle, Crown 
} from "lucide-react";

interface Usuario {
  email: string;
  role: string | string[];
  roles?: string[];
  permissions?: string[];
  bloqueado?: boolean;
}

interface UserTableProps {
  users: Usuario[];
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onEdit: (user: Usuario) => void;
  onDelete: (user: Usuario) => void;
  onBlock: (user: Usuario) => void;
  onViewDetails: (user: Usuario) => void;
  theme?: 'light' | 'dark';
}

export default function UserTable({
  users,
  page,
  pageSize,
  onPageChange,
  onEdit,
  onDelete,
  onBlock,
  onViewDetails,
  theme = 'light'
}: UserTableProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const totalPages = Math.ceil(users.length / pageSize);
  const paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);

  const getRoleIcon = (roles: string[]) => {
    if (roles.includes('superadmin')) return <Crown className="w-3.5 h-3.5" />;
    if (roles.includes('admin')) return <Shield className="w-3.5 h-3.5" />;
    return <Eye className="w-3.5 h-3.5" />;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin': return theme === 'dark' ? 'bg-purple-600/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-200';
      case 'admin': return theme === 'dark' ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200';
      case 'editor': return theme === 'dark' ? 'bg-amber-600/20 text-amber-400 border-amber-500/30' : 'bg-amber-100 text-amber-700 border-amber-200';
      case 'moderator': return theme === 'dark' ? 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-200';
      default: return theme === 'dark' ? 'bg-gray-600/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getUserRoles = (user: Usuario): string[] => {
    if (Array.isArray(user.role)) return user.role;
    if (user.roles) return user.roles;
    if (typeof user.role === 'string') return [user.role];
    return [];
  };

  return (
    <div className="space-y-4">
      {/* Tabla */}
      <div className={`rounded-2xl border overflow-hidden ${
        theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
                <th className={`px-4 py-3.5 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <TranslateText text="Usuario" />
                  </div>
                </th>
                <th className={`px-4 py-3.5 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <TranslateText text="Roles" />
                  </div>
                </th>
                <th className={`px-4 py-3.5 text-left font-semibold hidden lg:table-cell ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    <TranslateText text="Permisos" />
                  </div>
                </th>
                <th className={`px-4 py-3.5 text-center font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <TranslateText text="Estado" />
                </th>
                <th className={`px-4 py-3.5 text-right font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <TranslateText text="Acciones" />
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-100'}`}>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <TranslateText text="No se encontraron usuarios" />
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => {
                  const roles = getUserRoles(user);
                  return (
                    <tr
                      key={user.email}
                      className={`transition-colors ${
                        theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                      }`}
                    >
                      {/* Email */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                            user.bloqueado
                              ? theme === 'dark' ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-600'
                              : theme === 'dark' ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {user.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Roles */}
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1.5">
                          {roles.map((role) => (
                            <span
                              key={role}
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${getRoleColor(role)}`}
                            >
                              {getRoleIcon([role])}
                              {role}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Permisos */}
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {user.permissions && user.permissions.length > 0 ? (
                            <>
                              {user.permissions.slice(0, 3).map((perm) => (
                                <span
                                  key={perm}
                                  className={`px-2 py-0.5 rounded text-xs ${
                                    theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {perm}
                                </span>
                              ))}
                              {user.permissions.length > 3 && (
                                <span className={`px-2 py-0.5 rounded text-xs ${
                                  theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                                }`}>
                                  +{user.permissions.length - 3}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                              -
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Estado */}
                      <td className="px-4 py-3.5 text-center">
                        {user.bloqueado ? (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            theme === 'dark' ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-700'
                          }`}>
                            <XCircle className="w-3.5 h-3.5" />
                            <TranslateText text="Bloqueado" />
                          </span>
                        ) : (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700'
                          }`}>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <TranslateText text="Activo" />
                          </span>
                        )}
                      </td>

                      {/* Acciones */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setOpenMenu(openMenu === user.email ? null : user.email)}
                            className={`p-2 rounded-lg transition-all ${
                              theme === 'dark'
                                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>

                          {openMenu === user.email && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setOpenMenu(null)}
                              />
                              <div className={`absolute right-0 top-full mt-1 w-48 rounded-xl border shadow-lg z-20 py-1 ${
                                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                              }`}>
                                <button
                                  onClick={() => { onViewDetails(user); setOpenMenu(null); }}
                                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                                    theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                                  }`}
                                >
                                  <Eye className="w-4 h-4" />
                                  <TranslateText text="Ver detalles" />
                                </button>
                                <button
                                  onClick={() => { onEdit(user); setOpenMenu(null); }}
                                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                                    theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                                  }`}
                                >
                                  <Edit2 className="w-4 h-4" />
                                  <TranslateText text="Editar" />
                                </button>
                                <button
                                  onClick={() => { onBlock(user); setOpenMenu(null); }}
                                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                                    user.bloqueado
                                      ? theme === 'dark' ? 'hover:bg-green-900/30 text-green-400' : 'hover:bg-green-50 text-green-600'
                                      : theme === 'dark' ? 'hover:bg-amber-900/30 text-amber-400' : 'hover:bg-amber-50 text-amber-600'
                                  }`}
                                >
                                  {user.bloqueado ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                  <TranslateText text={user.bloqueado ? "Desbloquear" : "Bloquear"} />
                                </button>
                                <div className={`my-1 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`} />
                                <button
                                  onClick={() => { onDelete(user); setOpenMenu(null); }}
                                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                                    theme === 'dark' ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'
                                  }`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <TranslateText text="Eliminar" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 0 && (
          <div className={`px-4 py-3 border-t flex items-center justify-between ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          }`}>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Mostrando" /> {Math.min((page - 1) * pageSize + 1, users.length)}-{Math.min(page * pageSize, users.length)} <TranslateText text="de" /> {users.length}
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onPageChange(Math.max(1, page - 1))} 
                disabled={page === 1}
                className={`p-2 rounded-lg transition-all disabled:opacity-40 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className={`px-3 text-sm font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {page} / {totalPages || 1}
              </span>
              <button 
                onClick={() => onPageChange(Math.min(totalPages, page + 1))} 
                disabled={page >= totalPages}
                className={`p-2 rounded-lg transition-all disabled:opacity-40 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
