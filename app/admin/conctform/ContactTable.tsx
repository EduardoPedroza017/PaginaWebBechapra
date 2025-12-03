"use client";

import { TranslateText } from "@/components/TranslateText";
import { Mail, User, Calendar, MessageSquare, Inbox } from "lucide-react";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface ContactTableProps {
  messages: ContactMessage[];
  loading: boolean;
  theme: 'light' | 'dark';
}

export function ContactTable({ messages, loading, theme }: ContactTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-blue-600 mb-3"></div>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <TranslateText text="Cargando mensajes..." />
          </p>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-16">
        <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}>
          <Inbox className={`w-10 h-10 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
        </div>
        <p className={`text-base font-medium mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <TranslateText text="Sin registros de contacto" />
        </p>
        <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
          <TranslateText text="Los mensajes del formulario aparecerán aquí" />
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className={`text-left text-xs uppercase tracking-wider ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <th className="px-4 py-3 font-semibold">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <TranslateText text="Fecha" />
              </div>
            </th>
            <th className="px-4 py-3 font-semibold">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <TranslateText text="Nombre" />
              </div>
            </th>
            <th className="px-4 py-3 font-semibold">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <TranslateText text="Email" />
              </div>
            </th>
            <th className="px-4 py-3 font-semibold">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <TranslateText text="Mensaje" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {messages.map((msg, i) => (
            <tr 
              key={i} 
              className={`transition-colors ${
                theme === 'dark' 
                  ? 'hover:bg-gray-800/50' 
                  : 'hover:bg-blue-50/50'
              }`}
            >
              <td className={`px-4 py-4 whitespace-nowrap ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <div className="text-sm">
                  {new Date(msg.timestamp).toLocaleDateString()}
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </td>
              <td className={`px-4 py-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="font-semibold">{msg.name}</span>
              </td>
              <td className={`px-4 py-4 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                <a href={`mailto:${msg.email}`} className="hover:underline">
                  {msg.email}
                </a>
              </td>
              <td className={`px-4 py-4 max-w-xs ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <p className="line-clamp-2 text-sm">{msg.message}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
