import React, { useRef, useState, useEffect } from "react";
import { TranslateText } from '@/components/TranslateText';

interface LogoUploadFormProps {
  uploading?: boolean;
  onUpload: (file: File) => void; // called after successful upload
}

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ['image/png','image/jpeg','image/webp','image/svg+xml'];

export const LogoUploadForm: React.FC<LogoUploadFormProps> = ({ uploading: uploadingProp = false, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  useEffect(() => {
    setUploading(uploadingProp);
  }, [uploadingProp]);

  function validateFile(file: File) {
    if (!ALLOWED.includes(file.type)) return 'Tipo de archivo no permitido. Usa PNG/JPEG/WebP/SVG.';
    if (file.size > MAX_SIZE) return 'El archivo supera el tamaño máximo de 5 MB.';
    return null;
  }

  function handleFiles(file?: File) {
    setError(null);
    if (!file) return;
    const err = validateFile(file);
    if (err) {
      setError(err);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFiles(f);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFiles(f);
    // reset input for same file selection
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function doUpload() {
    if (!selectedFile) return;
    setError(null);
    setProgress(0);
    setUploading(true);

    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:5000/admin/upload-logo', true);
      xhr.withCredentials = true;

      xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
          const pct = Math.round((event.loaded / event.total) * 100);
          setProgress(pct);
        }
      };

      xhr.onload = function() {
        setUploading(false);
        if (xhr.status === 200) {
          const uploaded = selectedFile as File;
          setSelectedFile(null);
          setProgress(0);
          setError(null);
          // notify parent to refresh
          onUpload(uploaded);
          resolve();
        } else {
          try {
            const body = JSON.parse(xhr.responseText || '{}');
            setError(body.error || 'Error al subir');
          } catch (e) {
            setError('Error al subir');
          }
          reject();
        }
      };

      xhr.onerror = function() {
        setUploading(false);
        setError('Error de red durante la subida');
        reject();
      };

      const fd = new FormData();
      fd.append('logo', selectedFile as File);
      xhr.send(fd);
    });
  }

  return (
    <div className="mb-8">
      <label className="block mb-2 font-medium"><TranslateText text="Subir nuevo logo:" /></label>

      <div
        onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
        onDrop={handleDrop}
        className={`w-full rounded-lg border-2 p-6 text-center cursor-pointer ${dragActive ? 'border-blue-500 bg-blue-50/30' : 'border-dashed border-gray-300'} `}
        role="button"
        tabIndex={0}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
      >
        <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={handleChange} className="hidden" />
        <div className="mb-2 font-medium">{selectedFile ? selectedFile.name : <TranslateText text="Arrastra aquí o haz click para seleccionar un archivo" />}</div>
        <div className="text-sm text-gray-500">PNG, JPG, WebP, SVG — máximo 5MB</div>
      </div>

      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

      {previewUrl && (
        <div className="mt-4 flex items-center gap-4">
          <img src={previewUrl} alt="Preview" className="h-20 w-20 object-contain rounded-md border" />
          <div className="flex-1 text-sm text-gray-700">
            <div className="font-medium">{selectedFile?.name}</div>
            <div className="text-xs text-gray-500">{selectedFile && `${Math.round(selectedFile.size / 1024)} KB`}</div>
          </div>
        </div>
      )}

      {uploading && (
        <div className="mt-3">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div style={{ width: `${progress}%` }} className="h-full bg-emerald-600 transition-all" />
          </div>
          <div className="text-xs text-gray-500 mt-1">{progress}%</div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button disabled={uploading || !selectedFile} onClick={() => doUpload()} className={`px-4 py-2 rounded ${uploading || !selectedFile ? 'bg-gray-300 text-gray-600' : 'bg-emerald-600 text-white'}`}>
          <TranslateText text={uploading ? 'Subiendo...' : 'Subir logo'} />
        </button>
        <button type="button" onClick={() => { setSelectedFile(null); setError(null); setProgress(0); }} className="px-3 py-2 rounded bg-gray-100">
          <TranslateText text="Cancelar" />
        </button>
      </div>
    </div>
  );
};
