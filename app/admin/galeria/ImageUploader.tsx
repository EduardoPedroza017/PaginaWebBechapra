"use client";

import React, { useRef, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface ImageUploaderProps {
  theme: 'light' | 'dark';
  onUploadSuccess: () => void;
  onMessage: (type: 'success' | 'error', text: string) => void;
}

export function ImageUploader({ theme, onUploadSuccess, onMessage }: ImageUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | File[]) => {
    const validFiles: File[] = [];
    const previewsArr: string[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        onMessage('error', `Archivo no válido: ${file.name}`);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        onMessage('error', `La imagen ${file.name} supera los 5MB`);
        return;
      }
      validFiles.push(file);
    });
    if (validFiles.length === 0) return;
    setSelectedFiles(validFiles);
    // Previews
    Promise.all(validFiles.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    })).then(setPreviews);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const clearSelection = () => {
    setSelectedFiles([]);
    setPreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return;
    setUploading(true);
    let successCount = 0;
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await fetch("http://localhost:5000/admin/upload-image", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          successCount++;
        } else {
          onMessage('error', `Error al subir: ${file.name}`);
        }
      } catch {
        onMessage('error', `Error de conexión al subir: ${file.name}`);
      }
    }
    if (successCount > 0) {
      onMessage('success', `Se subieron ${successCount} imagen(es) correctamente`);
      clearSelection();
      onUploadSuccess();
    }
    setUploading(false);
  };

  return (
    <div className={`rounded-2xl p-5 border ${
      theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"
    }`}>
      <h2 className={`text-sm font-medium mb-4 ${
        theme === "dark" ? "text-gray-300" : "text-gray-700"
      }`}>
        <TranslateText text="Subir Nueva Imagen" />
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Zona de arrastrar y soltar */}
        <div 
          className={`flex-1 relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
            dragActive 
              ? 'border-blue-500 bg-blue-500/10' 
              : theme === "dark"
                ? 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          
          {selectedFiles.length === 0 ? (
            <div className="py-4">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              }`}>
                <Upload className={`w-6 h-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
              </div>
              <p className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                <TranslateText text="Arrastra una o varias imágenes aquí" />
              </p>
              <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                <TranslateText text="o haz clic para seleccionar" />
              </p>
              <p className={`text-xs mt-2 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                JPG, PNG, WebP • Max 5MB c/u
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 items-center">
              {previews.map((preview, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={preview} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`text-xs font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{selectedFiles[idx]?.name}</p>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{((selectedFiles[idx]?.size || 0) / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
              ))}
              <button
                onClick={(e) => { e.stopPropagation(); clearSelection(); }}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark" 
                    ? "hover:bg-gray-700 text-gray-400 hover:text-white" 
                    : "hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                }`}
                style={{ alignSelf: 'flex-start' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Botón de subir */}
        <div className="flex flex-col justify-center">
          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || uploading}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              selectedFiles.length === 0 || uploading
                ? theme === "dark"
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25"
            }`}
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <TranslateText text="Subiendo..." />
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5" />
                <TranslateText text="Subir" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
