"use client";

import { useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import { 
  Mail, 
  User, 
  Calendar, 
  MessageSquare, 
  Inbox, 
  ChevronRight, 
  ExternalLink,
  Eye,
  Copy,
  Check,
  Clock
} from "lucide-react";

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
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-b-blue-400 border-l-blue-400 animate-spin animation-delay-500"></div>
        </div>
        <div className="text-center">
          <p className={`font-medium mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            <TranslateText text="Cargando mensajes" />
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            <TranslateText text="Recuperando los últimos contactos..." />
          </p>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center ${
          theme === "dark" 
            ? "bg-gradient-to-br from-gray-800 to-gray-900" 
            : "bg-gradient-to-br from-blue-50 to-indigo-50"
        }`}>
          <Inbox className={`w-12 h-12 ${
            theme === "dark" ? "text-gray-600" : "text-blue-400"
          }`} />
        </div>
        <h3 className={`text-xl font-bold mb-2 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          <TranslateText text="Bandeja vacía" />
        </h3>
        <p className={`text-sm max-w-md mx-auto mb-6 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>
          <TranslateText text="Aún no hay mensajes de contacto. Los formularios enviados aparecerán aquí automáticamente." />
        </p>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
          theme === "dark" 
            ? "bg-gray-800 text-gray-300" 
            : "bg-blue-100 text-blue-700"
        }`}>
          <Clock className="w-4 h-4" />
          <TranslateText text="Los mensajes se actualizan automáticamente" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className={`text-left ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-b border-gray-800' 
                : 'bg-blue-50/50 border-b border-blue-100'
            }`}>
              <th className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <Calendar className={`w-4 h-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-400' : 'text-blue-600'
                    }`}>
                      <TranslateText text="Fecha" />
                    </div>
                    <div className={`text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-blue-400'
                    }`}>
                      <TranslateText text="y hora" />
                    </div>
                  </div>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <User className={`w-4 h-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-400' : 'text-blue-600'
                    }`}>
                      <TranslateText text="Contacto" />
                    </div>
                    <div className={`text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-blue-400'
                    }`}>
                      <TranslateText text="Nombre y email" />
                    </div>
                  </div>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <MessageSquare className={`w-4 h-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-400' : 'text-blue-600'
                    }`}>
                      <TranslateText text="Mensaje" />
                    </div>
                    <div className={`text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-blue-400'
                    }`}>
                      <TranslateText text="Vista previa" />
                    </div>
                  </div>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className={`text-xs font-semibold uppercase tracking-wider text-center ${
                  theme === 'dark' ? 'text-gray-400' : 'text-blue-600'
                }`}>
                  <TranslateText text="Acciones" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {messages.map((msg, i) => (
              <tr 
                key={i} 
                className={`group transition-all duration-200 ${
                  selectedMessage === i
                    ? theme === 'dark' 
                      ? 'bg-blue-900/20' 
                      : 'bg-blue-50'
                    : theme === 'dark' 
                      ? 'hover:bg-gray-800/30' 
                      : 'hover:bg-blue-50/30'
                }`}
                onClick={() => setSelectedMessage(selectedMessage === i ? null : i)}
              >
                <td className={`px-6 py-4 whitespace-nowrap ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {new Date(msg.timestamp).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <div className={`text-xs flex items-center gap-1.5 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {new Date(msg.timestamp).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      <span className="mx-1">•</span>
                      <span className={`px-2 py-0.5 rounded-full ${
                        theme === 'dark' 
                          ? 'bg-gray-800 text-gray-400' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {formatTimeAgo(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className={`px-6 py-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-md ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                      }`}>
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-sm">{msg.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-md ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                      }`}>
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <a 
                          href={`mailto:${msg.email}`}
                          className="text-sm hover:underline"
                          style={{
                            color: theme === 'dark' ? '#60a5fa' : '#2563eb'
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {msg.email}
                        </a>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyEmail(msg.email);
                          }}
                          className={`p-1 rounded hover:opacity-80 transition-opacity ${
                            theme === 'dark' 
                              ? 'hover:bg-gray-700' 
                              : 'hover:bg-gray-200'
                          }`}
                          title="Copiar email"
                        >
                          {copiedEmail === msg.email ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`px-6 py-4 max-w-xs ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <div className="space-y-1">
                    <p className="text-sm line-clamp-2 group-hover:line-clamp-3 transition-all">
                      {msg.message}
                    </p>
                    <div className={`text-xs flex items-center gap-1 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <MessageSquare className="w-3 h-3" />
                      {msg.message.length > 100 ? `${Math.ceil(msg.message.length / 100)} párrafos` : 'Mensaje corto'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMessage(selectedMessage === i ? null : i);
                      }}
                      className={`p-2 rounded-lg transition-all ${
                        selectedMessage === i
                          ? theme === 'dark'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-500 text-white'
                          : theme === 'dark'
                            ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                      title={selectedMessage === i ? "Cerrar detalles" : "Ver detalles"}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyEmail(msg.email);
                      }}
                      className={`p-2 rounded-lg transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                      title="Copiar email"
                    >
                      {copiedEmail === msg.email ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={`mailto:${msg.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className={`p-2 rounded-lg transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                      title="Responder"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer de tabla */}
      <div className={`px-6 py-4 border-t ${
        theme === 'dark' ? 'border-gray-800 bg-gray-900/30' : 'border-gray-100 bg-blue-50/30'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Mostrando <span className="font-semibold">{messages.length}</span> de{" "}
            <span className="font-semibold">{messages.length}</span> mensajes
          </div>
          <div className="flex items-center gap-4">
            <div className={`text-xs px-3 py-1.5 rounded-full ${
              theme === 'dark' 
                ? 'bg-gray-800 text-gray-300' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              Haga clic en una fila para expandir
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight className={`w-4 h-4 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Ordenado por fecha más reciente
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}