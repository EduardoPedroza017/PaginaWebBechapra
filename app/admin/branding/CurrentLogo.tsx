import React, { useState, useEffect } from "react";
import { TranslateText } from '@/components/TranslateText';
import { ExternalLink } from 'lucide-react';

interface LogoMeta {
  filename: string;
  path?: string;
  thumbnail?: string | null;
  webp?: string | null;
  avif?: string | null;
  width?: number | null;
  height?: number | null;
  alt?: string | null;
  upload_date?: string;
  size?: number;
}

interface CurrentLogoProps {
  currentLogo: LogoMeta | null;
  logoHistory?: LogoMeta[];
  onSelect?: (filename: string) => void;
  onUpdateMeta?: (filename: string, alt: string) => void;
}

export const CurrentLogo: React.FC<CurrentLogoProps> = ({ currentLogo, logoHistory = [], onSelect, onUpdateMeta }) => {
  const [open, setOpen] = useState(false);
  // Keep hooks stable regardless of whether currentLogo is present
  const [editingAlt, setEditingAlt] = useState(false);
  const [altValue, setAltValue] = useState('');

  useEffect(() => {
    // When currentLogo changes, initialize altValue
    setAltValue(currentLogo?.alt || '');
  }, [currentLogo]);

  if (!currentLogo) return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2"><TranslateText text="Logo actual:" /></h2>
      <div className="text-slate-500"><TranslateText text="No hay logo cargado." /></div>
    </div>
  );

  const filename = currentLogo.filename;
  const meta = currentLogo;
  const smallSrc = currentLogo.thumbnail ? `http://localhost:5000${currentLogo.thumbnail}` : (currentLogo.path ? `http://localhost:5000/${currentLogo.path}` : `http://localhost:5000/uploads/branding/${filename}`);
  const largeSrc = currentLogo.webp ? `http://localhost:5000${currentLogo.webp}` : (currentLogo.avif ? `http://localhost:5000${currentLogo.avif}` : (currentLogo.path ? `http://localhost:5000/${currentLogo.path}` : `http://localhost:5000/uploads/branding/${filename}`));

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2"><TranslateText text="Logo actual:" /></h2>
      <>
        <div className="flex items-center gap-4">
          <img src={smallSrc} alt="Logo actual" className="h-20 mb-2 object-contain" />
          <div className="text-sm">
            <div className="font-medium">{filename}</div>
            {meta && <div className="text-xs text-gray-500">{meta.size ? `${Math.round(meta.size/1024)} KB` : ''} {meta.upload_date ? ` — ${new Date(meta.upload_date).toLocaleString()}` : ''}</div>}
            <div className="mt-2 flex gap-2">
              <button onClick={() => setOpen(true)} className="px-3 py-1 rounded bg-gray-100">Ver</button>
              {onSelect && <button onClick={() => onSelect(filename)} className="px-3 py-1 rounded bg-emerald-600 text-white">Seleccionar</button>}
              <a href={largeSrc} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded bg-white border flex items-center gap-2"><ExternalLink size={14} /> <span className="text-sm">Abrir</span></a>
            </div>
          </div>
        </div>
              <div className="mt-3">
                <div className="text-sm font-medium mb-1">Texto alternativo</div>
                {!editingAlt ? (
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-600">{meta?.alt || '—'}</div>
                    {onUpdateMeta && <button onClick={() => { setAltValue(meta?.alt || ''); setEditingAlt(true); }} className="text-xs text-blue-600">Editar</button>}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input value={altValue} onChange={(e) => setAltValue(e.target.value)} className="border px-2 py-1 rounded" />
                    <button className="px-3 py-1 rounded bg-emerald-600 text-white" onClick={async () => { if (onUpdateMeta) await onUpdateMeta(filename, altValue); setEditingAlt(false); }}>Guardar</button>
                    <button className="px-3 py-1 rounded bg-gray-100" onClick={() => setEditingAlt(false)}>Cancelar</button>
                  </div>
                )}
              </div>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
            <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 max-w-3xl w-full">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">{filename}</h3>
                <button onClick={() => setOpen(false)} className="text-sm text-gray-500">Cerrar</button>
              </div>
              <div className="flex gap-4">
                <img src={largeSrc} alt="Preview" className="max-h-[480px] object-contain w-full" />
              </div>
              {meta && <div className="mt-4 text-xs text-gray-500">Tamaño: {meta.size ? `${Math.round(meta.size/1024)} KB` : '—'} — Subido: {meta.upload_date ? new Date(meta.upload_date).toLocaleString() : '—'}</div>}
            </div>
          </div>
        )}
      </>
    </div>
  );
};
