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
        theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-white via-slate-50 to-slate-100'
      }`}>
        <div className="text-center">
          <div className={`inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mb-4 ${
            theme === 'dark' ? 'border-blue-500' : 'border-blue-600'
          }`}></div>
          <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
            <TranslateText text="Cargando panel de administración..." />
          </p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-white via-slate-50 to-slate-100'
      }`}>
        <div className={`max-w-md w-full mx-4 rounded-2xl shadow-2xl p-8 text-center ${
          theme === 'dark' ? 'bg-slate-900/90 backdrop-blur-xl border border-slate-700/50' : 'bg-white/80 backdrop-blur-xl border border-slate-200/60'
        }`}>
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            theme === 'dark' ? 'bg-rose-500/20' : 'bg-rose-100'
          }`}>
            <AlertCircle className={`w-8 h-8 ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`} />
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            <TranslateText text="Acceso Denegado" />
          </h2>
          <p className={`mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            <TranslateText text="No tienes permisos para acceder a esta página." />
          </p>
          <button
            onClick={() => router.push('/admin')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
              theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
            }`}
          >
            <TranslateText text="Volver al Login" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen ${
      theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-white via-slate-50 to-slate-100'
    }`}>
      <Sidebar selected="/admin/dashboard" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          {/* Page Header con diseño mejorado */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl shadow-lg ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-blue-500/30' 
                  : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30'
              }`}>
                <LayoutDashboard className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  <TranslateText text="Panel de Control" />
                </h1>
                <p className={`text-sm font-medium mt-0.5 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <TranslateText text="Resumen general del sistema" />
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-md ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200'
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