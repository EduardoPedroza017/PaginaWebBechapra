"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import ContactFilter from "./ContactFilter";
import ContactChart from "./ContactChart";
import { TranslateText } from "@/components/TranslateText";

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
  const [theme, setTheme] = useState<'light'|'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Sincronizar theme solo en cliente para evitar hydration mismatch
  useEffect(() => {
    // Usar requestAnimationFrame para evitar warning de setState
    requestAnimationFrame(() => setMounted(true));
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        requestAnimationFrame(() => setTheme(savedTheme));
      }
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/contact")
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleFilter(filtered: ContactMessage[]) {
    setFiltered(filtered);
  }

  // Dummy handlers para Header
  const handleLogout = () => {};
  const handleToggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  if (!mounted) return null;

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#0a1627]' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <Sidebar selected="/admin/conctform" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header theme={theme} onLogout={handleLogout} onToggleTheme={handleToggleTheme} />
        <main className="flex-1 p-8">
          <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}><TranslateText text="Registros de Contacto" /></h1>
          <div className="mb-6">
            <ContactFilter messages={messages} onFilter={handleFilter} theme={theme} />
          </div>
          <ContactChart data={filtered} />
          <div className={`overflow-x-auto mt-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-[#10192b]' : 'bg-white'}`}>
            <table className="min-w-full">
              <thead>
                <tr className={theme === 'dark' ? 'bg-[#1e293b] text-blue-200' : 'bg-blue-100 text-black'}>
                  <th className="px-4 py-2"><TranslateText text="Fecha" /></th>
                  <th className="px-4 py-2"><TranslateText text="Nombre" /></th>
                  <th className="px-4 py-2"><TranslateText text="Email" /></th>
                  <th className="px-4 py-2"><TranslateText text="Mensaje" /></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="text-center py-8 text-blue-400"><TranslateText text="Cargando..." /></td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-8 text-blue-400"><TranslateText text="Sin registros" /></td></tr>
                ) : filtered.map((msg, i) => (
                  <tr key={i} className={theme === 'dark' ? 'border-b border-[#22304a] last:border-none hover:bg-blue-900/20' : 'border-b last:border-none hover:bg-blue-50/60'}>
                    <td className={theme === 'dark' ? 'px-4 py-2 whitespace-nowrap text-blue-100' : 'px-4 py-2 whitespace-nowrap text-black'}>{new Date(msg.timestamp).toLocaleString()}</td>
                    <td className={theme === 'dark' ? 'px-4 py-2 font-semibold text-white' : 'px-4 py-2 font-semibold text-black'}>{msg.name}</td>
                    <td className={theme === 'dark' ? 'px-4 py-2 text-blue-200' : 'px-4 py-2 text-black'}>{msg.email}</td>
                    <td className={theme === 'dark' ? 'px-4 py-2 max-w-xs break-words text-blue-100' : 'px-4 py-2 max-w-xs break-words text-black'}>{msg.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
