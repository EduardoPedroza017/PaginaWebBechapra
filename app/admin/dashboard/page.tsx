"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { WelcomeCard } from "./WelcomeCard";
import { TranslateText } from "@/components/TranslateText";
import dynamic from "next/dynamic";
import { Shield, AlertCircle } from "lucide-react";
import CookieConsentAdmin from "../cookie/CookieConsentAdmin";

const AuditLog = dynamic(() => import("./AuditLog"), { ssr: false });

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [themeReady, setThemeReady] = useState(false);

  // Sincronizar theme con localStorage SOLO en cliente, y mostrar loader hasta que esté listo
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
          setTheme(savedTheme);
        }
        setThemeReady(true);
      }, 0);
    } else {
      setTimeout(() => setThemeReady(true), 0);
    }
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    // Obtener datos de sessionStorage
    const adminVal = sessionStorage.getItem('admin') === 'true';
    const roleVal = sessionStorage.getItem('role') || '';
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin: adminVal, role: roleVal }),
    })
      .then(async (res) => {
        const data = await res.json();
        setAdmin(data.admin);
        setRole(data.role);
        setLoading(false);
      })
      .catch(() => {
        setAdmin(false);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('role');
    router.push('/admin');
  };

  if (loading || !themeReady) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            <TranslateText text="Cargando panel de administración..." />
          </p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}>
        <div className={`max-w-md w-full mx-4 rounded-2xl shadow-2xl p-8 text-center ${
          theme === 'dark' ? 'bg-gray-900 border border-red-900/50' : 'bg-white border border-red-200'
        }`}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
            <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <TranslateText text="Acceso Denegado" />
          </h1>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <TranslateText text="No tienes permisos de administrador. Por favor, inicia sesión con una cuenta autorizada." />
          </p>
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            <TranslateText text="Ir al Login" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen ${
      theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <Sidebar selected="/admin/dashboard" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="flex-1 p-8">
          <WelcomeCard role={role} theme={theme} />
          
          {/* <TranslateText text="Estadísticas rápidas" /> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`rounded-xl shadow-lg p-6 border ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-blue-900/30 to-gray-900 border-blue-800/30' 
                : 'bg-white border-blue-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <TranslateText text="Estado del Sistema" />
                  </p>
                  <p className="text-2xl font-bold text-green-500 mt-1">
                    <TranslateText text="Operativo" />
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-500/20">
                  <div className="w-8 h-8 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-lg p-6 border ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-purple-900/30 to-gray-900 border-purple-800/30' 
                : 'bg-white border-purple-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <TranslateText text="Tu Rol" />
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    {role === 'superadmin' ? <TranslateText text="Super Admin" /> : <TranslateText text="Administrador" />}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                }`}>
                  <Shield className={`w-8 h-8 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-lg p-6 border ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-orange-900/30 to-gray-900 border-orange-800/30' 
                : 'bg-white border-orange-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <TranslateText text="Última Sesión" />
                  </p>
                  <p className={`text-lg font-bold mt-1 ${
                    theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                  }`}>
                    {new Date().toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  theme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-100'
                }`}>
                  <svg className={`w-8 h-8 ${
                    theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* <TranslateText text="Auditoría solo visible para superadmin" /> */}
          {role === 'superadmin' && (
            <div className={`rounded-xl shadow-lg p-6 border mb-8 ${
              theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <TranslateText text="Acceso Exclusivo de Super Admin" />
                  </h2>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <TranslateText text="Vista detallada de auditoría del sistema" />
                  </p>
                </div>
              </div>
              <AuditLog />
            </div>
          )}

          <CookieConsentAdmin />
        </main>
      </div>
    </div>
  );
}