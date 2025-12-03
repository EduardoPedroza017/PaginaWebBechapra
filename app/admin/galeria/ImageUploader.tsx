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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      onMessage('error', 'Por favor selecciona un archivo de imagen válido');
      return;
    }
    
    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onMessage('error', 'La imagen no debe superar los 5MB');
      return;
    }
    
    setSelectedFile(file);
    
    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
        onMessage('success', 'Imagen subida exitosamente');
        clearSelection();
        onUploadSuccess();
      } else {
        onMessage('error', 'Error al subir la imagen');
      }
    } catch {
      onMessage('error', 'Error de conexión al subir');
    } finally {
      setUploading(false);
    }
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
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          
          {!selectedFile ? (
            <div className="py-4">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              }`}>
                <Upload className={`w-6 h-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
              </div>
              <p className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                <TranslateText text="Arrastra una imagen aquí" />
              </p>
              <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                <TranslateText text="o haz clic para seleccionar" />
              </p>
              <p className={`text-xs mt-2 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                JPG, PNG, WebP • Max 5MB
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {preview && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 text-left">
                <p className={`text-sm font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {selectedFile.name}
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); clearSelection(); }}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark" 
                    ? "hover:bg-gray-700 text-gray-400 hover:text-white" 
                    : "hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                }`}
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
            disabled={!selectedFile || uploading}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              !selectedFile || uploading
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
