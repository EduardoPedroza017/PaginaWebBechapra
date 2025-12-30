"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { useLanguage } from '@/lib/LanguageContext';
import { CurrentLogo } from "./CurrentLogo";
import { LogoUploadForm } from "./LogoUploadForm";
import { LogoHistory } from "./LogoHistory";
import { CheckCircle, Loader, Palette, RefreshCw } from 'lucide-react';

interface Logo {
  filename: string;
  path?: string;
  thumbnail?: string | null;
  webp?: string | null;
  avif?: string | null;
  width?: number | null;
  height?: number | null;
  upload_date?: string;
  size?: number;
}

export default function BrandingPage() {
  const [currentLogo, setCurrentLogo] = useState<Logo | null>(null);
  const [logoHistory, setLogoHistory] = useState<Logo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; visible: boolean }>({ 
    message: '', 
    type: 'success', 
    visible: false 
  });
  const toastTimerRef = { current: null as number | null };
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    initializePage();
  }, []);

  async function initializePage() {
    setLoading(true);
    try {
      await Promise.all([fetchCurrentLogo(), fetchLogoHistory()]);
    } catch (error) {
      showToast('Error al cargar los logos', 'error');
    } finally {
      setLoading(false);
      const storedTheme = localStorage.getItem('theme');
      setTheme(storedTheme === 'dark' ? 'dark' : 'light');
      setMounted(true);
    }
  }

  async function fetchCurrentLogo() {
    const res = await fetch("http://localhost:5000/api/logo");
    if (!res.ok) throw new Error('Failed to fetch current logo');
    const data = await res.json();
    setCurrentLogo(data?.filename ? data : null);
  }

  async function fetchLogoHistory() {
    const res = await fetch("http://localhost:5000/api/logo/history");
    if (!res.ok) throw new Error('Failed to fetch logo history');
    const data = await res.json();
    setLogoHistory(data.logos || []);
  }

  async function handleRefresh() {
    setRefreshing(true);
    try {
      await Promise.all([fetchCurrentLogo(), fetchLogoHistory()]);
      showToast('Datos actualizados', 'success');
    } catch (error) {
      showToast('Error al actualizar', 'error');
    } finally {
      setRefreshing(false);
    }
  }

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      await Promise.all([fetchCurrentLogo(), fetchLogoHistory()]);
      showToast('Logo subido correctamente', 'success');
    } catch (error) {
      showToast('Error al actualizar después de subir', 'error');
    } finally {
      setUploading(false);
    }
  }

  function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
    setToast({ message, type, visible: true });
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToast({ message: '', type: 'success', visible: false });
    }, 4000) as unknown as number;
  }

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  async function handleSelectLogo(filename: string) {
    try {
      await fetch("http://localhost:5000/admin/select-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });
      await fetchCurrentLogo();
      showToast('Logo actualizado correctamente', 'success');
    } catch (error) {
      showToast('Error al seleccionar el logo', 'error');
    }
  }

  async function updateLogoMeta(filename: string, alt: string) {
    try {
      await fetch(`http://localhost:5000/admin/logo/${filename}/meta`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alt }),
      });
      await Promise.all([fetchLogoHistory(), fetchCurrentLogo()]);
      showToast('Texto alternativo actualizado', 'success');
    } catch (error) {
      showToast('Error al actualizar el texto alternativo', 'error');
    }
  }

  function handleToggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    showToast(`Tema cambiado a ${newTheme === 'dark' ? 'oscuro' : 'claro'}`, 'info');
  }

  function handleLogout() {
    // Implementa tu lógica de logout aquí
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 animate-pulse mx-auto mb-4 flex items-center justify-center">
            <Palette size={32} className="text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Cargando gestión de logos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white'
    }`}>
      <Sidebar selected="/admin/branding" theme={theme} />
      
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        
        <main className="flex-1 max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header de página */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 shadow-lg">
                  <Palette size={28} className="text-white" />
                </div>
                <div>
                  <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Gestión de Logo
                  </h1>
                  <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Administra y personaliza el logo de tu marca
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                    refreshing
                      ? 'bg-gray-300 dark:bg-gray-700 cursor-wait'
                      : theme === 'dark'
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                  }`}
                >
                  <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                  <span className="text-sm font-medium">
                    {refreshing ? 'Actualizando...' : 'Actualizar'}
                  </span>
                </button>
              </div>
            </div>
            
            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Logo Actual</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {currentLogo ? '✓ Activo' : 'No hay logo'}
                </div>
              </div>
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">En Historial</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {logoHistory.length} logos
                </div>
              </div>
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Tamaño Máx.</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  5 MB
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-200 dark:border-emerald-900 border-t-emerald-600 dark:border-t-emerald-500 animate-spin mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Cargando gestión de logos...</p>
            </div>
          ) : (
            <div className="space-y-10">
              <CurrentLogo 
                currentLogo={currentLogo} 
                logoHistory={logoHistory} 
                onSelect={handleSelectLogo} 
                onUpdateMeta={updateLogoMeta} 
              />
              
              <LogoUploadForm 
                uploading={uploading} 
                onUpload={handleUpload} 
              />
              
              {logoHistory.length > 0 && (
                <LogoHistory 
                  logoHistory={logoHistory} 
                  onSelectLogo={handleSelectLogo} 
                  onUpdateMeta={updateLogoMeta} 
                />
              )}
            </div>
          )}

          {/* Toast mejorado */}
          {toast.visible && (
            <div className="fixed bottom-6 right-6 z-50 animate-slideInUp">
              <div className={`rounded-xl p-4 shadow-2xl max-w-sm border transform transition-all duration-300 ${
                toast.type === 'success' 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 border-emerald-800 text-white' 
                  : toast.type === 'error'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 border-red-800 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-800 text-white'
              }`}>
                <div className="flex items-center gap-3">
                  {toast.type === 'success' && <CheckCircle size={20} className="text-emerald-100" />}
                  {toast.type === 'error' && <Loader size={20} className="animate-spin text-red-100" />}
                  <div className="flex-1">
                    <div className="font-medium">{toast.message}</div>
                  </div>
                  <button 
                    onClick={() => setToast({ ...toast, visible: false })}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors duration-150"
                  >
                    <span className="sr-only">Cerrar</span>
                    <span className="text-sm font-bold opacity-80">×</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
        
        {/* Footer */}
        <footer className={`py-4 px-8 border-t ${theme === 'dark' ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/50'}`}>
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Gestión de Logos • {new Date().getFullYear()} • Todos los formatos son optimizados automáticamente
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}