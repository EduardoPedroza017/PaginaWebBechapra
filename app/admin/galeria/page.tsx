﻿"use client";

import React, { useState, useEffect, useCallback } from "react";

import { TranslateText } from "@/components/TranslateText";
import { Images, AlertCircle, CheckCircle, RefreshCw, AlertTriangle } from "lucide-react";

// Componentes modulares
import { ImageUploader } from "./ImageUploader";
import { ImageGrid } from "./ImageGrid";
import { DeleteImageModal } from "./DeleteImageModal";
import { ImagePreviewModal } from "./ImagePreviewModal";
import { adminApi } from "../utils/admin-api";
import AdminPageShell from '@/app/admin/components/layout/AdminPageShell';
import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";
import { useTheme } from "../hooks";

interface GalleryImage {
  filename: string;
  size?: number;
  uploadedAt?: string;
  tags?: string[];
}

type TabId = 'list' | 'upload' | 'albums';

const GaleriaPage = () => {
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();
  const themeStrict: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info' | 'warning', text: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  
  // Modal de eliminación
  const [deleteModal, setDeleteModal] = useState<{ open: boolean, filename: string | null }>({ open: false, filename: null });
  
  // Modal de previsualización
  const [previewModal, setPreviewModal] = useState<{ open: boolean, filename: string | null }>({ open: false, filename: null });

  const [activeTab, setActiveTab] = useState<TabId>("list");
  const [loadingTabs, setLoadingTabs] = useState<Record<TabId, boolean>>({
    list: false,
    upload: false,
    albums: false,
  });

  const handleTabChange = async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 300));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  };

  const handleRefresh = () => {
    fetchImages(true);
  };

  const handleUpload = () => {
    setActiveTab("upload");
  };

  useEffect(() => {
    if (themeReady) {
      fetchImages();
    }
  }, [themeReady]);

  const showMessage = useCallback((type: 'success' | 'error' | 'info' | 'warning', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const extractTagsFromImages = useCallback((imgs: GalleryImage[]) => {
    const tags = new Set<string>();
    imgs.forEach(img => {
      if (img.tags && Array.isArray(img.tags)) {
        img.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, []);

  const fetchImages = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const result = await adminApi.listImages();
      
      if (result.success && result.data) {
        const imgs: GalleryImage[] = result.data.map((filename: string) => ({ 
          filename 
        }));
        setImages(imgs);
        
        // Extraer tags de todas las imágenes
        const tags = extractTagsFromImages(imgs);
        setAllTags(tags);
        
        if (showRefresh) {
          showMessage('success', 'Galería actualizada');
        }
      } else {
        showMessage('error', result.error || 'Error al cargar las imágenes');
      }
    } catch (error) {
      console.error("Error al cargar imágenes:", error);
      showMessage('error', 'Error de conexión al cargar imágenes');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [showMessage, extractTagsFromImages]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleDelete = (filename: string) => {
    setDeleteModal({ open: true, filename });
  };

  const confirmDelete = async () => {
    if (!deleteModal.filename) return;
    
    try {
      const result = await adminApi.deleteImage(deleteModal.filename);
      
      if (result.success) {
        showMessage('success', 'Imagen eliminada exitosamente');
        // Actualizar lista localmente sin hacer fetch
        setImages(prev => prev.filter(img => img.filename !== deleteModal.filename));
      } else {
        showMessage('error', result.error || 'Error al eliminar la imagen');
      }
    } catch {
      showMessage('error', 'Error de conexión al eliminar');
    } finally {
      setDeleteModal({ open: false, filename: null });
    }
  };

  const handlePreview = (filename: string) => {
    setPreviewModal({ open: true, filename });
  };

  const handleUploadSuccess = () => {
    // Refrescar la lista de imágenes
    fetchImages(true);
  };

  const handleAddTags = (newTags: string[]) => {
    setAllTags(prev => {
      const updated = new Set([...prev, ...newTags]);
      return Array.from(updated).sort();
    });
  };

  const tabs: TabItem[] = [
    { id: 'list', label: 'Imágenes', icon: <Images size={18} /> },
    { id: 'upload', label: 'Subir', icon: <RefreshCw size={18} /> },
    { id: 'albums', label: 'Álbumes', icon: <AlertCircle size={18} /> },
  ];

  if (!themeReady) {
    return (
      <div className={`flex min-h-screen ${themeStrict === "dark" ? "bg-gray-950" : "bg-gradient-to-br from-blue-50 to-indigo-100"}`}>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
            <p className={`text-lg font-medium ${themeStrict === "dark" ? "text-white" : "text-gray-800"}`}>
              <TranslateText text="Cargando galería..." />
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminPageHeader
        title="Galería de Imágenes"
        subtitle="Gestión avanzada de imágenes con subida masiva"
        icon={<Images className="w-6 h-6 text-white" />}
        iconColor="blue"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: refreshing },
          add: { onClick: handleUpload, label: 'Subir Imágenes' }
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Galería" }]}
      />

      <AdminTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tabId) => handleTabChange(tabId as TabId)}
        loadingTabs={loadingTabs}
        theme={themeStrict}
        variant="pills"
      />

      <AdminSection theme={themeStrict}>
        {activeTab === 'albums' && (
          <div className="space-y-6">
            <div className={`rounded-xl border p-8 text-center ${
              themeStrict === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={themeStrict === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                La gestión de álbumes estará disponible próximamente.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className={`rounded-2xl shadow-lg p-6 border ${
            themeStrict === "dark" ? "bg-gray-900/80 border-gray-800" : "bg-white border-gray-100"
          }`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              themeStrict === "dark" ? "text-white" : "text-gray-900"
            }`}>
              <TranslateText text="Subida Masiva de Imágenes" />
            </h2>
            <ImageUploader 
              theme={themeStrict} 
              onUploadSuccess={handleUploadSuccess}
              onMessage={showMessage}
              onAddTags={handleAddTags}
              existingTags={allTags}
            />
          </div>
        )}

        {activeTab === 'list' && (
          <>
            {/* Mensaje de notificación */}
            {message && (
              <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 animate-in slide-in-from-top shadow-lg ${
                message.type === 'success'
                  ? themeStrict === 'dark'
                    ? 'bg-green-900/40 border-green-700 text-green-400'
                    : 'bg-green-50 border-green-200 text-green-800'
                  : message.type === 'error'
                  ? themeStrict === 'dark'
                    ? 'bg-red-900/40 border-red-700 text-red-400'
                    : 'bg-red-50 border-red-200 text-red-800'
                  : message.type === 'warning'
                  ? themeStrict === 'dark'
                    ? 'bg-amber-900/40 border-amber-700 text-amber-400'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                  : themeStrict === 'dark'
                    ? 'bg-blue-900/40 border-blue-700 text-blue-400'
                    : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : message.type === 'error' ? (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                ) : message.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <RefreshCw className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="font-medium">{message.text}</span>
              </div>
            )}

            {/* Advertencia si hay muchas imágenes */}
            {images.length > 50 && (
              <div className={`mb-6 p-4 rounded-2xl border flex items-start gap-3 ${
                themeStrict === 'dark'
                  ? 'bg-amber-900/20 border-amber-700/30 text-amber-300'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium mb-1">Galería grande detectada</p>
                  <p className="text-sm">
                    Tienes {images.length} imágenes en la galería. Para un mejor rendimiento, 
                    considera organizarlas en carpetas o usar la paginación.
                  </p>
                </div>
              </div>
            )}

            {/* Contador de imágenes */}
            <div className={`mb-6 px-4 py-2 rounded-xl text-sm font-semibold ${
              themeStrict === "dark" 
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" 
                : "bg-blue-100 text-blue-700 border border-blue-200"
            }`}>
              {images.length} {images.length === 1 ? 'imagen' : 'imágenes'} • {allTags.length} etiquetas
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-blue-600 mb-3"></div>
                  <p className={`text-sm ${themeStrict === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    <TranslateText text="Cargando imágenes..." />
                  </p>
                </div>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-16">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  themeStrict === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}>
                  <Images className={`w-10 h-10 ${themeStrict === "dark" ? "text-gray-600" : "text-gray-400"}`} />
                </div>
                <p className={`text-base font-medium mb-1 ${themeStrict === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  <TranslateText text="No hay imágenes en la galería" />
                </p>
                <p className={`text-sm ${themeStrict === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                  <TranslateText text="Sube tu primera imagen para comenzar" />
                </p>
              </div>
            ) : (
              <ImageGrid 
                images={images}
                theme={themeStrict}
                onDelete={handleDelete}
                onPreview={handlePreview}
              />
            )}
          </>
        )}
      </AdminSection>

      {/* Modal de eliminación */}
      <DeleteImageModal
        isOpen={deleteModal.open}
        filename={deleteModal.filename}
        theme={themeStrict}
        onClose={() => setDeleteModal({ open: false, filename: null })}
        onConfirm={confirmDelete}
      />

      {/* Modal de previsualización */}
      <ImagePreviewModal
        isOpen={previewModal.open}
        filename={previewModal.filename}
        images={images}
        theme={themeStrict}
        onClose={() => setPreviewModal({ open: false, filename: null })}
      />
    </div>
  );
};

export default GaleriaPage;
