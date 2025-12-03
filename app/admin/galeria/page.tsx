"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import { Images, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

// Componentes modulares
import { ImageUploader } from "./ImageUploader";
import { ImageGrid } from "./ImageGrid";
import { DeleteImageModal } from "./DeleteImageModal";
import { ImagePreviewModal } from "./ImagePreviewModal";

interface GalleryImage {
  filename: string;
}

const GaleriaPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Tema con persistencia
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [themeReady, setThemeReady] = useState(false);

  // Modal de eliminación
  const [deleteModal, setDeleteModal] = useState<{ open: boolean, filename: string | null }>({ open: false, filename: null });
  
  // Modal de previsualización
  const [previewModal, setPreviewModal] = useState<{ open: boolean, filename: string | null }>({ open: false, filename: null });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
      }
      setThemeReady(true);
    } else {
      setThemeReady(true);
    }
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const fetchImages = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const res = await fetch("http://localhost:5000/admin/list-images");
      const data = await res.json();
      const imgs: GalleryImage[] = Array.isArray(data.images)
        ? data.images.map((filename: string) => ({ filename }))
        : [];
      setImages(imgs);
    } catch (error) {
      console.error("Error al cargar imágenes:", error);
      showMessage('error', 'Error al cargar las imágenes');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [showMessage]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleDelete = (filename: string) => {
    setDeleteModal({ open: true, filename });
  };

  const confirmDelete = async () => {
    if (!deleteModal.filename) return;
    try {
      const res = await fetch("http://localhost:5000/admin/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: deleteModal.filename }),
      });
      if (res.ok) {
        showMessage('success', 'Imagen eliminada exitosamente');
        fetchImages();
      } else {
        showMessage('error', 'Error al eliminar la imagen');
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
    fetchImages();
  };

  if (!themeReady) {
    return (
      <div className={`flex min-h-screen ${theme === "dark" ? "bg-gray-950" : "bg-gradient-to-br from-blue-50 to-indigo-100"}`}>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
            <p className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              <TranslateText text="Cargando galería..." />
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen ${
      theme === "dark" ? "bg-gray-950" : "bg-gradient-to-br from-blue-50 to-indigo-100"
    }`}>
      <Sidebar selected="/admin/galeria" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header 
          onLogout={() => { 
            sessionStorage.removeItem("admin"); 
            sessionStorage.removeItem("role"); 
            window.location.href = "/admin"; 
          }} 
          onToggleTheme={handleToggleTheme} 
          theme={theme} 
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header de la página */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${
                  theme === "dark" ? "bg-blue-600 shadow-lg shadow-blue-500/30" : "bg-blue-600 shadow-lg shadow-blue-500/20"
                }`}>
                  <Images className="text-white" size={28} />
                </div>
                <div>
                  <h1 className={`text-2xl md:text-3xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    <TranslateText text="Galería de Imágenes" />
                  </h1>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <TranslateText text="Gestiona las imágenes de tu sitio web" />
                  </p>
                </div>
              </div>
              
              {/* Botón de refrescar y contador */}
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                  theme === "dark" 
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" 
                    : "bg-blue-100 text-blue-700 border border-blue-200"
                }`}>
                  {images.length} {images.length === 1 ? 'imagen' : 'imágenes'}
                </span>
                <button
                  onClick={() => fetchImages(true)}
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
          </div>

          {/* Mensaje de notificación */}
          {message && (
            <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 animate-in slide-in-from-top shadow-lg ${
              message.type === 'success'
                ? theme === 'dark'
                  ? 'bg-green-900/40 border-green-700 text-green-400'
                  : 'bg-green-50 border-green-200 text-green-800'
                : theme === 'dark'
                  ? 'bg-red-900/40 border-red-700 text-red-400'
                  : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          )}

          {/* Sección de subida */}
          <div className={`rounded-2xl shadow-lg p-6 border mb-6 ${
            theme === "dark" ? "bg-gray-900/80 border-gray-800" : "bg-white border-gray-100"
          }`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              <TranslateText text="Subir Nueva Imagen" />
            </h2>
            <ImageUploader 
              theme={theme} 
              onUploadSuccess={handleUploadSuccess}
              onMessage={showMessage}
            />
          </div>

          {/* Grid de imágenes */}
          <div className={`rounded-2xl shadow-lg p-6 border ${
            theme === "dark" ? "bg-gray-900/80 border-gray-800" : "bg-white border-gray-100"
          }`}>
            <h2 className={`text-lg font-semibold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              <TranslateText text="Imágenes Cargadas" />
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-blue-600 mb-3"></div>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    <TranslateText text="Cargando imágenes..." />
                  </p>
                </div>
              </div>
            ) : (
              <ImageGrid 
                images={images}
                theme={theme}
                onDelete={handleDelete}
                onPreview={handlePreview}
              />
            )}
          </div>
        </main>
      </div>

      {/* Modal de eliminación */}
      <DeleteImageModal
        isOpen={deleteModal.open}
        filename={deleteModal.filename}
        theme={theme}
        onClose={() => setDeleteModal({ open: false, filename: null })}
        onConfirm={confirmDelete}
      />

      {/* Modal de previsualización */}
      <ImagePreviewModal
        isOpen={previewModal.open}
        filename={previewModal.filename}
        images={images}
        theme={theme}
        onClose={() => setPreviewModal({ open: false, filename: null })}
      />
    </div>
  );
};

export default GaleriaPage;