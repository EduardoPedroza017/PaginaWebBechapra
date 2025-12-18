import React, { useState } from "react";
import { TranslateText } from '@/components/TranslateText';
import { ExternalLink } from 'lucide-react';

interface Logo {
  filename: string;
  path?: string;
  thumbnail?: string | null;
  webp?: string | null;
  avif?: string | null;
  alt?: string | null;
  upload_date?: string;
  size?: number;
}

interface LogoHistoryProps {
  logoHistory: Logo[];
  onSelectLogo: (filename: string) => void;
  onUpdateMeta?: (filename: string, alt: string) => void;
}

export const LogoHistory: React.FC<LogoHistoryProps> = ({ logoHistory, onSelectLogo, onUpdateMeta }) => {
  const [viewing, setViewing] = useState<Logo | null>(null);
  const [editingAlt, setEditingAlt] = useState(false);
  const [altValue, setAltValue] = useState('');

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2"><TranslateText text="Historial de logos:" /></h2>
      <div className="grid grid-cols-2 gap-4">
        {logoHistory.map((logo) => (
          <div key={logo.filename} className="border rounded p-2 flex flex-col items-center">
            <img src={logo.thumbnail ? `http://localhost:5000${logo.thumbnail}` : `http://localhost:5000/uploads/branding/${logo.filename}`} alt={logo.filename} className="h-16 mb-1" />
            <div className="text-xs text-slate-500 mb-1">{logo.filename}</div>
            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs" onClick={() => setViewing(logo)}>
                <TranslateText text="Ver" />
              </button>
              <button className="bg-emerald-600 text-white px-2 py-1 rounded text-xs" onClick={() => onSelectLogo(logo.filename)}>
                <TranslateText text="Usar este logo" />
              </button>
            </div>
          </div>
        ))}
      </div>

        {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setViewing(null)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 max-w-3xl w-full">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">{viewing.filename}</h3>
              <button onClick={() => setViewing(null)} className="text-sm text-gray-500">Cerrar</button>
            </div>
              <div className="flex gap-4">
              <img src={viewing.webp ? `http://localhost:5000${viewing.webp}` : (viewing.avif ? `http://localhost:5000${viewing.avif}` : `http://localhost:5000/uploads/branding/${viewing.filename}`)} alt={viewing.filename} className="max-h-[480px] object-contain w-full" />
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-500">Tamaño: {viewing.size ? `${Math.round(viewing.size/1024)} KB` : '—'} — Subido: {viewing.upload_date ? new Date(viewing.upload_date).toLocaleString() : '—'}</div>
              <div className="flex gap-2">
                <a href={`http://localhost:5000/uploads/branding/${viewing.filename}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded bg-white border flex items-center gap-2"><ExternalLink size={14} /> <span className="text-sm">Abrir</span></a>
                <button className="px-3 py-1 rounded bg-emerald-600 text-white" onClick={() => { onSelectLogo(viewing.filename); setViewing(null); }}><TranslateText text="Seleccionar" /></button>
              </div>
            </div>
              <div className="mt-3">
                <div className="text-sm font-medium mb-1">Texto alternativo</div>
                {!editingAlt ? (
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-600">{viewing.alt || '—'}</div>
                    {onUpdateMeta && <button onClick={() => { setAltValue(viewing.alt || ''); setEditingAlt(true); }} className="text-xs text-blue-600">Editar</button>}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input value={altValue} onChange={(e) => setAltValue(e.target.value)} className="border px-2 py-1 rounded" />
                    <button className="px-3 py-1 rounded bg-emerald-600 text-white" onClick={async () => { if (onUpdateMeta) await onUpdateMeta(viewing.filename, altValue); setEditingAlt(false); setViewing(null); }}>Guardar</button>
                    <button className="px-3 py-1 rounded bg-gray-100" onClick={() => setEditingAlt(false)}>Cancelar</button>
                  </div>
                )}
              </div>
          </div>
        </div>
      )}
    </div>
  );
};
