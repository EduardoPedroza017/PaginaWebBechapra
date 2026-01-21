"use client";
import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { Trash2, Images, Eye, Download, Loader2 } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface GalleryImage {
  filename: string;
}

interface ImageGridProps {
  images: GalleryImage[];
  theme: 'light' | 'dark';
  onDelete: (filename: string) => void;
  onPreview?: (filename: string) => void;
}

export function OptimizedImageGrid({ images, theme, onDelete, onPreview }: ImageGridProps) {
  const [page, setPage] = useState(1);
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const pageSize = 12; // Reducido para mejor rendimiento
  const totalPages = Math.ceil(images.length / pageSize);
  
  // Memoizar imágenes paginadas
  const paginatedImages = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return images.slice(start, end);
  }, [images, page, pageSize]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL no está definido");
  }

  const handleDownload = async (filename: string) => {
    try {
      const url = `${apiUrl}/gallery/image/${filename}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Liberar memoria
      setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 100);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const handleImageLoad = (filename: string) => {
    setLoadingImages(prev => {
      const next = new Set(prev);
      next.delete(filename);
      return next;
    });
  };

  const handleImageStartLoad = (filename: string) => {
    setLoadingImages(prev => new Set(prev.add(filename)));
  };

  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  }, [totalPages]);

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}>
          <Images className={`w-10 h-10 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
        </div>
        <p className={`text-base font-medium mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <TranslateText text="No hay imágenes en la galería" />
        </p>
        <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
          <TranslateText text="Sube tu primera imagen para comenzar" />
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {paginatedImages.map((img) => (
          <div 
            key={img.filename} 
            className={`group relative rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg ${
              theme === "dark" ? "bg-gray-800/30" : "bg-gray-50"
            }`}
          >
            {/* Contenedor de imagen con loader */}
            <div className="aspect-square relative">
              {loadingImages.has(img.filename) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              )}
              
              <Image
                src={`${apiUrl}/gallery/image/${img.filename}`}
                alt={`Imagen: ${img.filename}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                loading="lazy"
                unoptimized
                onLoadingComplete={() => handleImageLoad(img.filename)}
                onLoadStart={() => handleImageStartLoad(img.filename)}
              />
              
              {/* Overlay con acciones */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <div className="flex items-center justify-center gap-1">
                    {onPreview && (
                      <button
                        onClick={() => onPreview(img.filename)}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
                        title="Ver"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDownload(img.filename)}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
                      title="Descargar"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(img.filename)}
                      className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white backdrop-blur-sm transition-all"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Nombre del archivo */}
            <div className={`px-2 py-1.5 ${theme === "dark" ? "bg-gray-800/80" : "bg-white"}`}>
              <p className={`text-xs truncate ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} title={img.filename}>
                {img.filename}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Paginador mejorado */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Mostrando {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, images.length)} de {images.length} imágenes
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(1)}
              disabled={page === 1}
              className={`p-2 rounded-lg ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${
                theme === "dark" 
                  ? "text-gray-400 hover:text-white" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Primera página"
            >
              «
            </button>
            
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Anterior
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium ${
                      page === pageNum
                        ? theme === "dark"
                          ? "bg-blue-600 text-white"
                          : "bg-blue-600 text-white"
                        : theme === "dark"
                          ? "bg-gray-800 hover:bg-gray-700 text-gray-400"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && page < totalPages - 2 && (
                <>
                  <span className="px-1 text-gray-400">...</span>
                  <button
                    onClick={() => goToPage(totalPages)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium ${
                      theme === "dark"
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-400"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''} ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Siguiente
            </button>
            
            <button
              onClick={() => goToPage(totalPages)}
              disabled={page === totalPages}
              className={`p-2 rounded-lg ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''} ${
                theme === "dark" 
                  ? "text-gray-400 hover:text-white" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Última página"
            >
              »
            </button>
          </div>
        </div>
      )}
    </>
  );
}