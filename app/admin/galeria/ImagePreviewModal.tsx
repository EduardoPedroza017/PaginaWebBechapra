"use client";

import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface ImagePreviewModalProps {
  isOpen: boolean;
  filename: string | null;
  images: { filename: string }[];
  theme: 'light' | 'dark';
  onClose: () => void;
}

export function ImagePreviewModal({ isOpen, filename, images, theme, onClose }: ImagePreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (filename && images.length > 0) {
      const index = images.findIndex(img => img.filename === filename);
      if (index !== -1) setCurrentIndex(index);
    }
    setZoom(1);
  }, [filename, images]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    setZoom(1);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    setZoom(1);
  }, [images.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  }, [isOpen, onClose, handlePrev, handleNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleDownload = async () => {
    if (images.length === 0) return;
    const currentFilename = images[currentIndex].filename;
    const url = `http://localhost:5000/uploads/galery/${currentFilename}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = currentFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent z-10">
        <div className="flex items-center gap-4">
          <span className="text-white/80 text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </span>
          <span className="text-white/60 text-sm truncate max-w-xs">
            {currentImage.filename}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); setZoom(z => Math.max(0.5, z - 0.25)); }}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            title="Zoom -"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-white/80 text-sm min-w-[50px] text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={(e) => { e.stopPropagation(); setZoom(z => Math.min(3, z + 0.25)); }}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            title="Zoom +"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDownload(); }}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            title="Descargar"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navegación izquierda */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
          title="Anterior"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Imagen */}
      <div 
        className="relative max-w-[85vw] max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={`http://localhost:5000/uploads/galery/${currentImage.filename}`}
          alt={currentImage.filename}
          width={1200}
          height={800}
          className="object-contain transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
          unoptimized
        />
      </div>

      {/* Navegación derecha */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
          title="Siguiente"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl bg-black/50 backdrop-blur-sm max-w-[80vw] overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={img.filename}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); setZoom(1); }}
              className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                idx === currentIndex ? 'ring-2 ring-blue-500 scale-105' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <Image
                src={`http://localhost:5000/uploads/galery/${img.filename}`}
                alt={img.filename}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
