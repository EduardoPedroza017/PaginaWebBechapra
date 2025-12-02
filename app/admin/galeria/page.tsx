"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import { Upload, Trash2, Images, AlertCircle, CheckCircle } from "lucide-react";

interface GalleryImage {
  filename: string;
  // Puedes agregar más propiedades si la API las devuelve
}

const GaleriaPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Tema con persistencia
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark" || savedTheme === "light") {
          setTheme(savedTheme);
        }
        setThemeReady(true);
      }, 0);
    } else {
      setTimeout(() => setThemeReady(true), 0);
    }
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }, []);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/list-images");
      const data = await res.json();
      // El backend devuelve un array de strings, adaptamos a objetos { filename }
      const imgs: GalleryImage[] = Array.isArray(data.images)
        ? data.images.map((filename: string) => ({ filename }))
        : [];
      setImages(imgs);
    } catch (error) {
      console.error("Error al cargar imágenes:", error);
      showMessage('error', 'Error al cargar las imágenes');
    }
  }, [showMessage]);

  // Modal de confirmación de eliminación
  const [deleteModal, setDeleteModal] = useState<{ open: boolean, filename: string | null }>({ open: false, filename: null });

  const handleDelete = async (filename: string) => {
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

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        showMessage('error', 'Por favor selecciona un archivo de imagen válido');
        return;
      }
      
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showMessage('error', 'La imagen no debe superar los 5MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      
      const res = await fetch("http://localhost:5000/admin/upload-image", {
        method: "POST",
        body: formData,
      });
      
      if (res.ok) {
        showMessage('success', 'Imagen subida exitosamente');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchImages();
      } else {
        showMessage('error', 'Error al subir la imagen');
      }
    } catch {
      showMessage('error', 'Error de conexión al subir');
    } finally {
      setUploading(false);
    }
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
        <main className="flex-1 p-8">
          {/* Header de la página */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-3 rounded-xl ${
                theme === "dark" ? "bg-blue-600 shadow-lg shadow-blue-500/50" : "bg-blue-600"
              }`}>
                <Images className="text-white" size={28} />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${
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
          </div>

          {/* Mensaje de notificación */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg border flex items-center gap-3 animate-in slide-in-from-top ${
              message.type === 'success'
                ? theme === 'dark'
                  ? 'bg-green-900/30 border-green-800 text-green-400'
                  : 'bg-green-100 border-green-300 text-green-800'
                : theme === 'dark'
                  ? 'bg-red-900/30 border-red-800 text-red-400'
                  : 'bg-red-100 border-red-300 text-red-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          )}

          {/* Sección de subida */}
          <div className={`rounded-xl shadow-lg p-6 border mb-8 ${
            theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <h2 className={`text-lg font-semibold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              <TranslateText text="Subir Nueva Imagen" />
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex-1">
                <label className={`block mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  <TranslateText text="Seleccionar archivo" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-600 text-white file:bg-gray-700 file:text-white" 
                      : "bg-gray-50 border-gray-300 text-gray-900 file:bg-gray-200 file:text-gray-800"
                  } file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-medium hover:file:bg-blue-600 hover:file:text-white file:transition-colors`}
                />
                {selectedFile && (
                  <p className={`mt-2 text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <TranslateText text="Archivo seleccionado:" /> <span className="font-medium">{selectedFile.name}</span>
                  </p>
                )}
              </div>
              
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg ${
                  !selectedFile || uploading
                    ? theme === "dark"
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <TranslateText text="Subiendo..." />
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    <TranslateText text="Subir Imagen" />
                  </>
                )}
              </button>
            </div>

            <div className={`mt-4 p-3 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-blue-50"
            }`}>
              <p className={`text-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <strong><TranslateText text="Nota:" /></strong> <TranslateText text="Las imágenes deben ser menores a 5MB y en formato JPG, PNG o WebP." />
              </p>
            </div>
          </div>

          {/* Grid de imágenes */}
          <div className={`rounded-xl shadow-lg p-6 border ${
            theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                <TranslateText text="Imágenes Cargadas" />
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                theme === "dark" 
                  ? "bg-blue-600/20 text-blue-400" 
                  : "bg-blue-100 text-blue-800"
              }`}>
                {images.length} {images.length === 1 ? <TranslateText text="imagen" /> : <TranslateText text="imágenes" />}
              </span>
            </div>

            {images.length === 0 ? (
              <div className="text-center py-12">
                <Images className={`mx-auto mb-4 ${
                  theme === "dark" ? "text-gray-600" : "text-gray-400"
                }`} size={64} />
                <p className={`text-lg font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  <TranslateText text="No hay imágenes en la galería" />
                </p>
                <p className={`text-sm ${
                  theme === "dark" ? "text-gray-500" : "text-gray-500"
                }`}>
                  <TranslateText text="Sube tu primera imagen para comenzar" />
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {images.map((img, idx) => (
                  <div 
                    key={img.filename || idx} 
                    className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                      theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                    }`}
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={`http://localhost:5000/uploads/galery/${img.filename}`}
                        alt={`Imagen de galería: ${img.filename}`}
                        fill
                        style={{ objectFit: "cover", backgroundColor: theme === 'dark' ? '#222' : '#f3f4f6' }}
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        loading="lazy"
                        unoptimized
                      />
                      {/* Overlay oscuro al hacer hover */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <button
                          onClick={() => handleDelete(img.filename)}
                          className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white rounded-lg p-3 transition-all duration-300 transform scale-90 group-hover:scale-100 flex items-center gap-2 font-medium shadow-lg"
                          title="Eliminar imagen"
                        >
                          <Trash2 size={18} />
                          <TranslateText text="Eliminar" />
                        </button>
                      </div>
                    </div>
                          {/* Modal de confirmación de eliminación */}
                          {deleteModal.open && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                              <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 max-w-sm w-full border dark:border-gray-700`}>
                                <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                  <TranslateText text="¿Eliminar imagen?" />
                                </h3>
                                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <TranslateText text="¿Estás seguro de que deseas eliminar esta imagen? Esta acción no se puede deshacer." />
                                </p>
                                <div className="flex justify-end gap-3">
                                  <button
                                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                                    onClick={() => setDeleteModal({ open: false, filename: null })}
                                  >
                                    <TranslateText text="Cancelar" />
                                  </button>
                                  <button
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all"
                                    onClick={confirmDelete}
                                  >
                                    <TranslateText text="Eliminar" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                    {/* Nombre del archivo */}
                    <div className={`p-2 ${
                      theme === "dark" ? "bg-gray-800" : "bg-white"
                    }`}>
                      <p className={`text-xs truncate ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`} title={img.filename}>
                        {img.filename}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GaleriaPage;