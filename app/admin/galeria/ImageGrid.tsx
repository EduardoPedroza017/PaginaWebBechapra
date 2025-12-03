"use client";

import Image from "next/image";
import { Trash2, Images, Eye, Download } from "lucide-react";
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

export function ImageGrid({ images, theme, onDelete, onPreview }: ImageGridProps) {
  const handleDownload = async (filename: string) => {
    const url = `http://localhost:5000/uploads/galery/${filename}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  };

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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {images.map((img, idx) => (
        <div 
          key={img.filename || idx} 
          className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
            theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"
          }`}
        >
          {/* Imagen */}
          <div className="aspect-square relative">
            <Image
              src={`http://localhost:5000/uploads/galery/${img.filename}`}
              alt={`Imagen: ${img.filename}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              loading="lazy"
              unoptimized
            />
            
            {/* Overlay con acciones */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex items-center justify-center gap-2">
                  {onPreview && (
                    <button
                      onClick={() => onPreview(img.filename)}
                      className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
                      title="Ver"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDownload(img.filename)}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
                    title="Descargar"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(img.filename)}
                    className="p-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white backdrop-blur-sm transition-all"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Nombre del archivo */}
          <div className={`px-3 py-2 ${theme === "dark" ? "bg-gray-800/80" : "bg-white"}`}>
            <p className={`text-xs truncate ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} title={img.filename}>
              {img.filename}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
