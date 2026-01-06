"use client";

import React from "react";
import { Mail, Shield, Crown, Lock, Unlock, X } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

const roleLabels: Record<string, string> = {
  superadmin: "Super Administrador",
  admin: "Administrador",
  editor: "Editor",
  viewer: "Lector",
  moderator: "Moderador"
};

interface UserDetailsModalProps {
  user: {
    email: string;
    role: string | string[];
    roles?: string[];
    bloqueado?: boolean;
  } | null;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

export default function UserDetailsModal({ user, onClose, theme = 'light' }: UserDetailsModalProps) {
  if (!user) return null;

  const isDark = theme === 'dark';
  const roles = Array.isArray(user.role) ? user.role : (user.roles || [user.role as string]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative rounded-lg p-6 w-full max-w-md ${
          isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-200'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1 rounded ${
            isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 rounded-lg ${
            isDark ? 'bg-slate-800' : 'bg-slate-100'
          }`}>
            <Mail className={`w-6 h-6 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </div>
          <div className="min-w-0">
            <h3 className={`font-bold text-lg ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Detalles del Usuario
            </h3>
            <p className={`text-sm mt-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {user.email}
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Correo electrónico
            </label>
            <div className={`px-3 py-2 rounded ${
              isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
            }`}>
              {user.email}
            </div>
          </div>

          {/* Roles */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Roles
            </label>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <span
                  key={role}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                    role === 'superadmin'
                      ? isDark ? 'bg-purple-900/30 text-purple-400 border border-purple-800/50' : 'bg-purple-100 text-purple-700 border border-purple-200'
                      : role === 'admin'
                      ? isDark ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' : 'bg-blue-100 text-blue-700 border border-blue-200'
                      : isDark ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-100 text-slate-700 border border-slate-300'
                  }`}
                >
                  {role === 'superadmin' ? (
                    <Crown className="w-4 h-4" />
                  ) : (
                    <Shield className="w-4 h-4" />
                  )}
                  {roleLabels[role] || role}
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Estado
            </label>
            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${
              user.bloqueado
                ? isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
                : isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
            }`}>
              {user.bloqueado ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span className="font-medium">Bloqueado</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span className="font-medium">Activo</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-slate-700/30">
          <button
            onClick={onClose}
            className={`w-full py-2.5 rounded-lg font-medium ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}