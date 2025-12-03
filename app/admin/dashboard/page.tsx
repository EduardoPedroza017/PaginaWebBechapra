"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { WelcomeCard } from "./WelcomeCard";
import { TranslateText } from "@/components/TranslateText";
import dynamic from "next/dynamic";
import { LayoutDashboard, AlertCircle, RefreshCw } from "lucide-react";
import CookieConsentAdmin from "../cookie/CookieConsentAdminNew";
import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";

const AuditLog = dynamic(() => import("./AuditLog"), { ssr: false });

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [themeReady, setThemeReady] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

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
    fetch('http://localhost:5000/admin/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin: adminVal, role: roleVal }),
      credentials: 'include',
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

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
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
      theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      <Sidebar selected="/admin/dashboard" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${
                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <LayoutDashboard className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <h1 className={`text-xl md:text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <TranslateText text="Panel de Control" />
                </h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <TranslateText text="Resumen general del sistema" />
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all hover:scale-105 active:scale-95 ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <TranslateText text="Actualizar" />
            </button>
          </div>

          {/* Welcome Card */}
          <WelcomeCard role={role} theme={theme} />
          
          {/* Dashboard Stats */}
          <DashboardStats key={`stats-${refreshKey}`} theme={theme} role={role} />

          {/* Quick Actions */}
          <div className="mb-6">
            <QuickActions theme={theme} role={role} />
          </div>

          {/* Audit Log - Solo visible para superadmin */}
          {role === 'superadmin' && (
            <div className={`rounded-2xl border p-5 md:p-6 mb-6 ${
              theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <AuditLog key={`audit-${refreshKey}`} theme={theme} />
            </div>
          )}

          {/* Cookie Consent Section */}
          <CookieConsentAdmin key={`cookies-${refreshKey}`} theme={theme} />
        </main>
      </div>
    </div>
  );
}