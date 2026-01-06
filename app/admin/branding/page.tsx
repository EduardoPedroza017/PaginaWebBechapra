"use client";

import { useEffect, useState, useCallback } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { CurrentLogo } from "./CurrentLogo";
import { LogoUploadForm } from "./LogoUploadForm";
import { LogoHistory } from "./LogoHistory";
import { 
  CheckCircle, Loader2, Palette, RefreshCw, 
  Zap, Package, TrendingUp, Shield, 
  AlertCircle, X
} from 'lucide-react';
import { adminApi } from "../utils/admin-api";
import { TranslateText } from "@/components/TranslateText";

interface Logo {
  filename: string;
  path?: string;
  thumbnail?: string;
  webp?: string;
  avif?: string;
  width?: number;
  height?: number;
  alt?: string;
  upload_date?: string;
  size?: number;
  tags?: string[];
  is_active?: boolean;
}

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  visible: boolean;
}

interface BrandingStats {
  totalLogos: number;
  activeLogo: string | null;
  totalSize: number;
  optimizedCount: number;
  variantsGenerated: number;
}

export default function BrandingPage() {
  const [currentLogo, setCurrentLogo] = useState<Logo | null>(null);
  const [logoHistory, setLogoHistory] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<Toast>({ 
    message: '', 
    type: 'success', 
    visible: false 
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<BrandingStats>({
    totalLogos: 0,
    activeLogo: null,
    totalSize: 0,
    optimizedCount: 0,
    variantsGenerated: 0
  });

  // Inicializar página
  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchCurrentLogo(),
        fetchLogoHistory(),
        // fetchBrandingStats() - commented out since endpoint doesn't exist yet
      ]);
    } catch (error) {
      showToast('Error al cargar los datos', 'error');
    } finally {
      setLoading(false);
      const storedTheme = localStorage.getItem('theme');
      setTheme(storedTheme === 'dark' ? 'dark' : 'light');
      setMounted(true);
    }
  };

  // Obtener logo actual
  const fetchCurrentLogo = async () => {
    try {
      const data = await adminApi.getCurrentLogo();
      setCurrentLogo(data);
    } catch (error) {
      showToast('Error de conexión al cargar logo', 'error');
    }
  };

  // Obtener historial de logos
  const fetchLogoHistory = async () => {
    try {
      const data = await adminApi.getLogoHistory();
      setLogoHistory(data);
    } catch (error) {
      showToast('Error de conexión al cargar historial', 'error');
    }
  };

  // Obtener estadísticas
  // const fetchBrandingStats = async () => {
  //   try {
  //     const data = await adminApi.getBrandingStats();
  //     setStats(data);
  //   } catch (error) {
  //     // Stats endpoint not available, use default stats
  //     console.warn('Branding stats not available:', error);
  //   }
  // };

  // Refrescar todo
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchCurrentLogo(),
        fetchLogoHistory(),
        // fetchBrandingStats() - commented out since endpoint doesn't exist yet
      ]);
      showToast('Datos actualizados', 'success');
    } catch (error) {
      showToast('Error al actualizar', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  // Subir logos (múltiples)
  const handleUpload = async (files: File[]) => {
    setUploading(true);
    try {
      await adminApi.uploadMultipleLogos(files, {
        generateVariants: true,
        tags: ['uploaded']
      });

      showToast(`${files.length} logo(s) subido(s) exitosamente`, 'success');

      // Refrescar datos
      await Promise.all([
        fetchCurrentLogo(),
        fetchLogoHistory(),
        // fetchBrandingStats() - commented out since endpoint doesn't exist yet
      ]);
    } catch (error) {
      // Endpoint doesn't exist yet, show error but don't crash
      console.warn('Logo upload endpoint not available:', error);
      showToast('Función de subida no disponible aún', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Actualizar metadatos
  const updateLogoMeta = async (filename: string, alt: string) => {
    try {
      await adminApi.updateLogoMeta({ filename, alt });
      await Promise.all([fetchLogoHistory(), fetchCurrentLogo()]);
      showToast('Texto alternativo actualizado', 'success');
    } catch (error) {
      console.warn('Update logo meta endpoint not available:', error);
      showToast('Función no disponible aún', 'error');
    }
  };

  // Seleccionar logo activo
  const handleSelectLogo = async (filename: string) => {
    try {
      await adminApi.setActiveLogo(filename);
      await fetchCurrentLogo();
      showToast('Logo actualizado correctamente', 'success');
    } catch (error) {
      console.warn('Set active logo endpoint not available:', error);
      showToast('Función no disponible aún', 'error');
    }
  };

  // Optimizar todos los logos
  const handleOptimizeAll = async () => {
    try {
      await adminApi.optimizeAllLogos();
      showToast('Todos los logos optimizados', 'success');
      await Promise.all([fetchLogoHistory(), fetchCurrentLogo(), /* fetchBrandingStats() - commented out since endpoint doesn't exist yet */]);
    } catch (error) {
      console.warn('Optimize all logos endpoint not available:', error);
      showToast('Función no disponible aún', 'error');
    }
  };

  // Mostrar toast
  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  }, []);

  // Wrapper para LogoUploadForm
  const handleMessage = useCallback((type: 'success' | 'error' | 'info', text: string) => {
    showToast(text, type);
  }, [showToast]);

  // Toggle tema
  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    showToast(`Tema cambiado a ${newTheme === 'dark' ? 'oscuro' : 'claro'}`, 'info');
  };

  const handleLogout = () => {
    // Implementar lógica de logout
  };

  // Formatear tamaño
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-linear-to-r from-emerald-500 to-blue-500 animate-pulse mx-auto mb-4 flex items-center justify-center">
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
        ? 'bg-linear-to-br from-gray-900 via-gray-900 to-gray-950' 
        : 'bg-linear-to-br from-blue-50 via-indigo-50/50 to-white'
    }`}>
      <Sidebar selected="/admin/branding" theme={theme} />
      
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        
        <main className="flex-1 w-full py-8 px-4 sm:px-6 lg:px-8">
          {/* Header de página */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-linear-to-r from-emerald-500 to-blue-500 shadow-lg">
                  <Palette size={28} className="text-white" />
                </div>
                <div>
                  <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <TranslateText text="Gestión de Marca" />
                  </h1>
                  <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <TranslateText text="Administra logos, colores e identidad visual" />
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOptimizeAll}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                      : 'bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                  }`}
                >
                  <Zap size={16} />
                  <span className="text-sm font-medium">
                    <TranslateText text="Optimizar Todo" />
                  </span>
                </button>
                
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
                    {refreshing ? <TranslateText text="Actualizando..." /> : <TranslateText text="Actualizar" />}
                  </span>
                </button>
              </div>
            </div>
            
            {/* Estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      <TranslateText text="Logo Activo" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {currentLogo ? '✓ Activo' : '—'}
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
                    <CheckCircle className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} size={20} />
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      <TranslateText text="Logos Totales" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {logoHistory.length}
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                    <Package className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={20} />
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      <TranslateText text="Tamaño Total" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {formatFileSize(stats.totalSize)}
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                    <TrendingUp className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} size={20} />
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      <TranslateText text="Optimizados" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stats.optimizedCount}
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
                    <Shield className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-200 dark:border-emerald-900 border-t-emerald-600 dark:border-t-emerald-500 animate-spin mb-4"></div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Cargando gestión de logos..." />
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Layout horizontal para tablets y desktop */}
              <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {/* Logo actual - ocupa 1 columna */}
                <div className="xl:col-span-1">
                  <div className="h-full">
                    <CurrentLogo 
                      currentLogo={currentLogo} 
                      logoHistory={logoHistory} 
                      onSelect={handleSelectLogo} 
                      onUpdateMeta={updateLogoMeta} 
                    />
                  </div>
                </div>
                
                {/* Subida masiva - ocupa 1 columna */}
                <div className="xl:col-span-1">
                  <div className="h-full">
                    <LogoUploadForm 
                      uploading={uploading} 
                      onUpload={handleUpload}
                      onMessage={handleMessage}
                      theme={theme}
                    />
                  </div>
                </div>
                
                {/* Historial - ocupa 1 columna en xl, pero puede expandirse */}
                {logoHistory.length > 0 && (
                  <div className="xl:col-span-1 lg:col-span-2 xl:col-span-1">
                    <div className="h-full">
                      <LogoHistory 
                        logoHistory={logoHistory} 
                        onSelectLogo={handleSelectLogo} 
                        onUpdateMeta={updateLogoMeta} 
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Layout vertical para móviles y tablets pequeñas */}
              <div className="lg:hidden space-y-6">
                {/* Logo actual */}
                <CurrentLogo 
                  currentLogo={currentLogo} 
                  logoHistory={logoHistory} 
                  onSelect={handleSelectLogo} 
                  onUpdateMeta={updateLogoMeta} 
                />
                
                {/* Subida masiva */}
                <LogoUploadForm 
                  uploading={uploading} 
                  onUpload={handleUpload}
                  onMessage={handleMessage}
                  theme={theme}
                />
                
                {/* Historial */}
                {logoHistory.length > 0 && (
                  <LogoHistory 
                    logoHistory={logoHistory} 
                    onSelectLogo={handleSelectLogo} 
                    onUpdateMeta={updateLogoMeta} 
                  />
                )}
              </div>
            </div>
          )}

          {/* Toast mejorado */}
          {toast.visible && (
            <div className="fixed bottom-6 right-6 z-50 animate-slideInUp">
              <div className={`rounded-xl p-4 shadow-2xl max-w-sm border transform transition-all duration-300 flex items-start gap-3 ${
                toast.type === 'success' 
                  ? 'bg-linear-to-r from-emerald-600 to-emerald-700 border-emerald-800 text-white' 
                  : toast.type === 'error'
                  ? 'bg-linear-to-r from-red-600 to-red-700 border-red-800 text-white'
                  : toast.type === 'warning'
                  ? 'bg-linear-to-r from-amber-600 to-amber-700 border-amber-800 text-white'
                  : 'bg-linear-to-r from-blue-600 to-blue-700 border-blue-800 text-white'
              }`}>
                {toast.type === 'success' && <CheckCircle size={20} className="mt-0.5 shrink-0" />}
                {toast.type === 'error' && <AlertCircle size={20} className="mt-0.5 shrink-0" />}
                <div className="flex-1">
                  <div className="font-medium">{toast.message}</div>
                </div>
                <button 
                  onClick={() => setToast({ ...toast, visible: false })}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors duration-150 shrink-0"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </main>
        
        {/* Footer */}
        <footer className={`py-4 px-8 border-t ${theme === 'dark' ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/50'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Gestión de Marca" /> • {new Date().getFullYear()} • 
                <span className="mx-2">|</span>
                <TranslateText text="Subida masiva optimizada" />
              </p>
              <div className="flex items-center gap-4 text-xs">
                <span className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                  <TranslateText text="Máx. 20 logos/lote" />
                </span>
                <span className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                  <TranslateText text="5MB por archivo" />
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}