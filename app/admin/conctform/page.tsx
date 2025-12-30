"use client";

import { useEffect, useState, useCallback } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import ContactFilter from "./ContactFilter";
import ContactChart from "./ContactChart";
import { ContactTable } from "./ContactTable";
import { ContactStats } from "./ContactStats";
import { TranslateText } from "@/components/TranslateText";
import { 
  MessageSquareText, 
  RefreshCw, 
  Download, 
  Mail, 
  Bell,
  Activity,
  ChevronRight
} from "lucide-react";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export default function AdminContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filtered, setFiltered] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const fetchMessages = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const res = await fetch("http://localhost:5000/api/contact");
      const data = await res.json();
      setMessages(data);
      setFiltered(data);
      
      // Simular mensajes no leídos (en un caso real, vendría del backend)
      const unread = data.filter((msg: ContactMessage) => {
        const msgDate = new Date(msg.timestamp);
        const now = new Date();
        return (now.getTime() - msgDate.getTime()) < 3600000; // Última hora
      }).length;
      setUnreadCount(unread);
      
      if (unread > 0 && !showNotification) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    
    // Polling para nuevos mensajes cada 30 segundos
    const interval = setInterval(() => {
      fetchMessages();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [fetchMessages]);

  function handleFilter(filtered: ContactMessage[]) {
    setFiltered(filtered);
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("role");
    window.location.href = "/admin";
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const exportAllToCSV = () => {
    const headers = ["Nombre", "Email", "Mensaje", "Fecha"];
    const csvContent = [
      headers.join(","),
      ...messages.map(msg => [
        `"${msg.name.replace(/"/g, '""')}"`,
        msg.email,
        `"${msg.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        new Date(msg.timestamp).toISOString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `contactos_completo_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse mx-auto mb-4 flex items-center justify-center">
            <Mail size={32} className="text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Cargando panel de contacto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white'
    }`}>
      <Sidebar selected="/admin/conctform" theme={theme} />
      
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header principal */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20">
                  <MessageSquareText className="text-white" size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className={`text-3xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      <TranslateText text="Gestión de Contactos" />
                    </h1>
                    {unreadCount > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
                        {unreadCount} nuevo{unreadCount !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm flex items-center gap-2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <Activity className="w-4 h-4" />
                    <TranslateText text="Mensajes recibidos del formulario de contacto" />
                    <ChevronRight className="w-3 h-3" />
                    <span className="font-medium">
                      {messages.length} registro{messages.length !== 1 ? 's' : ''}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={exportAllToCSV}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
                  style={{
                    backgroundColor: theme === 'dark' ? '#05966920' : '#10b98110',
                    color: theme === 'dark' ? '#34d399' : '#059669'
                  }}
                >
                  <Download className="w-4 h-4" />
                  <TranslateText text="Exportar Todo" />
                </button>
                <button
                  onClick={() => fetchMessages(true)}
                  disabled={refreshing}
                  className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300 disabled:opacity-50"
                      : "bg-white hover:bg-gray-50 text-gray-700 shadow-sm disabled:opacity-50"
                  }`}
                  title="Actualizar datos"
                >
                  <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Notificación de nuevos mensajes */}
            {showNotification && unreadCount > 0 && (
              <div className="animate-slideInDown mb-6">
                <div className={`rounded-xl p-4 border ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-900/30 to-blue-800/20 border-blue-800' 
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'
                    }`}>
                      <Bell className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {unreadCount} nuevo{unreadCount !== 1 ? 's' : ''} mensaje{unreadCount !== 1 ? 's' : ''}
                      </p>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Recibido{unreadCount !== 1 ? 's' : ''} en la última hora
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNotification(false)}
                      className={`p-1 rounded-lg ${
                        theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                      }`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tarjetas de resumen rápido */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white/80 border-gray-200'
              }`}>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Estado</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {loading ? 'Cargando...' : 'Activo'}
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white/80 border-gray-200'
              }`}>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Actualizado</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white/80 border-gray-200'
              }`}>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Filtrados</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {filtered.length} / {messages.length}
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white/80 border-gray-200'
              }`}>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Última actualización</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {refreshing ? 'Actualizando...' : 'Listo'}
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className={`text-xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                <TranslateText text="Resumen Estadístico" />
              </h2>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                theme === 'dark' 
                  ? 'bg-blue-600/20 text-blue-400' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                Actualizado automáticamente
              </div>
            </div>
            <ContactStats messages={messages} filtered={filtered} theme={theme} />
          </div>

          {/* Filtros y Gráfico */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ContactFilter messages={messages} onFilter={handleFilter} theme={theme} />
            <ContactChart data={filtered} theme={theme} />
          </div>

          {/* Tabla de mensajes */}
          <div className={`rounded-2xl overflow-hidden transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800' 
              : 'bg-gradient-to-br from-white to-blue-50/50 border-gray-100 shadow-lg'
          } border`}>
            <div className={`px-6 py-5 border-b ${
              theme === 'dark' ? 'border-gray-800' : 'border-blue-100'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className={`font-bold text-xl mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <TranslateText text="Registros de Contacto" />
                  </h2>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <TranslateText text="Lista completa de mensajes recibidos" />
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${
                    theme === 'dark' 
                      ? 'bg-blue-600/20 text-blue-400' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    <Mail className="w-4 h-4" />
                    <span>{filtered.length} mensaje{filtered.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className={`hidden md:block text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <TranslateText text="Haga clic para expandir detalles" />
                  </div>
                </div>
              </div>
            </div>
            <ContactTable messages={filtered} loading={loading} theme={theme} />
          </div>

          {/* Footer informativo */}
          <div className={`mt-8 p-5 rounded-xl ${
            theme === 'dark' 
              ? 'bg-gray-800/30 border border-gray-700' 
              : 'bg-blue-50/50 border border-blue-100'
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm">
                <p className={`font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <TranslateText text="Panel de Contacto" />
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  <TranslateText text="Los datos se actualizan automáticamente cada 30 segundos" />
                  • <TranslateText text="Exporta los datos cuando necesites" />
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                  v2.1 • Dashboard de Contacto
                </span>
                <span className={`px-2 py-1 rounded ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-gray-300' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}