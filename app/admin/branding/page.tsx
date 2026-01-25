"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { CurrentLogo } from "./CurrentLogo";
import { LogoUploadForm } from "./LogoUploadForm";
import { LogoHistory } from "./LogoHistory";
import { 
  CheckCircle, Loader2, Palette, RefreshCw, 
  Zap, Package, TrendingUp, Shield, 
  AlertCircle, X, Image, Upload, History
} from 'lucide-react';
import { adminApi } from "../utils/admin-api";
import { TranslateText } from "@/components/TranslateText";

import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";
import { useTheme } from "../hooks";

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

type TabId = 'current' | 'upload' | 'history';

export default function BrandingPage() {
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();
  const themeStrict: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
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
  const [stats, setStats] = useState({
    totalLogos: 0,
    activeLogo: null as string | null,
    totalSize: 0,
    optimizedCount: 0,
    variantsGenerated: 0
  });

  const [activeTab, setActiveTab] = useState<TabId>("current");
  const [loadingTabs, setLoadingTabs] = useState<Record<TabId, boolean>>({
    current: false,
    upload: false,
    history: false,
  });

  const handleTabChange = async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 150));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  };

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
      ]);
    } catch (error) {
      showToast('Error al cargar los datos', 'error');
    } finally {
      setLoading(false);
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
      // Normalizar respuesta: algunos endpoints devuelven { success, data: [] }
      const list: Logo[] = Array.isArray(data)
        ? data
        : Array.isArray((data as any)?.data)
        ? (data as any).data
        : [];

      setLogoHistory(list);
      setStats(prev => ({
        ...prev,
        totalLogos: list.length,
        activeLogo: list.find((l: Logo) => l.is_active)?.filename || null,
      }));
    } catch (error) {
      showToast('Error de conexión al cargar historial', 'error');
    }
  };

  // Refrescar todo
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchCurrentLogo(),
        fetchLogoHistory(),
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
      ]);
    } catch (error) {
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
      await Promise.all([fetchLogoHistory(), fetchCurrentLogo()]);
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

  // Formatear tamaño
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const tabs: TabItem[] = [
    { id: 'current', label: 'Logo Actual', icon: <Image size={18} /> },
    { id: 'upload', label: 'Subir', icon: <Upload size={18} /> },
    { id: 'history', label: 'Historial', icon: <History size={18} /> },
  ];

  if (!themeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <AdminPageHeader
        title="Gestión de Marca"
        subtitle="Administra logos, colores e identidad visual"
        icon={<Palette className="w-6 h-6 text-white" />}
        iconColor="emerald"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: loading || refreshing },
          custom: (
            <button
              onClick={handleOptimizeAll}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                themeStrict === 'dark'
                  ? 'bg-purple-600 hover:bg-purple-500 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              <Zap size={16} />
              <span className="text-sm font-medium">
                <TranslateText text="Optimizar Todo" />
              </span>
            </button>
          )
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Branding" }]}
      />

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-xl ${themeStrict === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${themeStrict === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                <TranslateText text="Logo Activo" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {currentLogo ? '✓ Activo' : '—'}
              </div>
            </div>
            <div className={`p-2 rounded-lg ${themeStrict === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
              <CheckCircle className={themeStrict === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} size={20} />
            </div>
          </div>
        </div>
        
        <div className={`p-4 rounded-xl ${themeStrict === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${themeStrict === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                <TranslateText text="Logos Totales" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {logoHistory.length}
              </div>
            </div>
            <div className={`p-2 rounded-lg ${themeStrict === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <Package className={themeStrict === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={20} />
            </div>
          </div>
        </div>
        
        <div className={`p-4 rounded-xl ${themeStrict === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${themeStrict === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                <TranslateText text="Tamaño Total" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatFileSize(stats.totalSize)}
              </div>
            </div>
            <div className={`p-2 rounded-lg ${themeStrict === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
              <TrendingUp className={themeStrict === 'dark' ? 'text-purple-400' : 'text-purple-600'} size={20} />
            </div>
          </div>
        </div>
        
        <div className={`p-4 rounded-xl ${themeStrict === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${themeStrict === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                <TranslateText text="Optimizados" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.optimizedCount}
              </div>
            </div>
            <div className={`p-2 rounded-lg ${themeStrict === 'dark' ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
              <Shield className={themeStrict === 'dark' ? 'text-amber-400' : 'text-amber-600'} size={20} />
            </div>
          </div>
        </div>
      </div>

      <AdminTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tabId) => handleTabChange(tabId as TabId)}
        loadingTabs={loadingTabs}
        theme={themeStrict}
        variant="pills"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-4"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-200 dark:border-emerald-900 border-t-emerald-600 dark:border-t-emerald-500 animate-spin mb-4"></div>
              <p className={`${themeStrict === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <TranslateText text="Cargando gestión de logos..." />
              </p>
            </div>
          ) : (
            <>
              {activeTab === 'current' && (
                <AdminSection theme={themeStrict}>
                  <CurrentLogo 
                    currentLogo={currentLogo} 
                    logoHistory={logoHistory} 
                    onSelect={handleSelectLogo} 
                    onUpdateMeta={updateLogoMeta} 
                  />
                </AdminSection>
              )}

              {activeTab === 'upload' && (
                <AdminSection theme={themeStrict}>
                  <LogoUploadForm 
                    uploading={uploading} 
                    onUpload={handleUpload}
                    onMessage={handleMessage}
                    theme={themeStrict}
                  />
                </AdminSection>
              )}

              {activeTab === 'history' && (
                <AdminSection theme={themeStrict}>
                  <LogoHistory 
                    logoHistory={logoHistory} 
                    onSelectLogo={handleSelectLogo} 
                    onUpdateMeta={updateLogoMeta} 
                  />
                </AdminSection>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Toast */}
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
    </div>
  );
}

