"use client";

import { useEffect, useState, useCallback } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import ContactFilter from "./ContactFilter";
import ContactChart from "./ContactChart";
import { ContactTable } from "./ContactTable";
import { ContactStats } from "./ContactStats";
import { TranslateText } from "@/components/TranslateText";
import { MessageSquareText, RefreshCw } from "lucide-react";

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

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      }
    }
  }, []);

  const fetchMessages = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const res = await fetch("http://localhost:5000/api/contact");
      const data = await res.json();
      setMessages(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
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
  };

  if (!mounted) return null;

  return (
    <div className={`flex min-h-screen ${
      theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <Sidebar selected="/admin/conctform" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header theme={theme} onLogout={handleLogout} onToggleTheme={handleToggleTheme} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${
                  theme === "dark" ? "bg-blue-600 shadow-lg shadow-blue-500/30" : "bg-blue-600 shadow-lg shadow-blue-500/20"
                }`}>
                  <MessageSquareText className="text-white" size={28} />
                </div>
                <div>
                  <h1 className={`text-2xl md:text-3xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    <TranslateText text="Registros de Contacto" />
                  </h1>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <TranslateText text="Mensajes recibidos del formulario" />
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => fetchMessages(true)}
                disabled={refreshing}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    : "bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
                }`}
                title="Refrescar"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <ContactStats messages={messages} filtered={filtered} theme={theme} />
          </div>

          {/* Filtros y Gráfico */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ContactFilter messages={messages} onFilter={handleFilter} theme={theme} />
            <ContactChart data={filtered} theme={theme} />
          </div>

          {/* Tabla */}
          <div className={`rounded-2xl border overflow-hidden ${
            theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <div className={`px-5 py-4 border-b ${
              theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
            }`}>
              <div className="flex items-center justify-between">
                <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Mensajes" />
                </h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  theme === 'dark' 
                    ? 'bg-blue-600/20 text-blue-400' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {filtered.length} <TranslateText text="de" /> {messages.length}
                </span>
              </div>
            </div>
            <ContactTable messages={filtered} loading={loading} theme={theme} />
          </div>
        </main>
      </div>
    </div>
  );
}
