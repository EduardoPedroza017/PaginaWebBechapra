"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import type { OrganigramaNode } from "./OrganigramaAPI";
import { NIVEL_OPTIONS } from "./OrganigramaAPI";

interface Props {
  existing: OrganigramaNode[];
  onCancel: () => void;
  onCreate: (node: OrganigramaNode) => void | Promise<any>;
  onUploadImage?: (file: File) => Promise<string | null>;
  theme?: 'light' | 'dark';
  saving?: boolean;
  serverErrors?: any[] | null;
}

export default function CreateNodeModal({ existing, onCancel, onCreate, onUploadImage, theme = 'light', saving = false, serverErrors = null }: Props) {
  const [nombre, setNombre] = useState("");
  const [puesto, setPuesto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nivel, setNivel] = useState<string | undefined>(undefined);
  const [padreid, setPadreid] = useState<string | undefined>(undefined);
  const [imagen, setImagen] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => { setVisible(true); }, []);

  const closeWithAnim = () => {
    setVisible(false);
    setTimeout(() => onCancel(), 180);
  };

  const [errors, setErrors] = useState<{ nombre?: string; puesto?: string; nivel?: string }>({});

  const validate = () => {
    const e: { nombre?: string; puesto?: string; nivel?: string } = {};
    if (!nombre.trim()) e.nombre = 'Nombre es obligatorio';
    if (!puesto.trim()) e.puesto = 'Puesto es obligatorio';
    if (!nivel) e.nivel = 'Nivel es obligatorio';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    const node: OrganigramaNode = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      puesto: puesto.trim(),
      descripcion: descripcion.trim(),
      imagen: imagen,
      nivel: nivel,
      padreid: padreid,
      hijos: [],
    };
    onCreate(node);
  };

  const handleFile = async (f?: File) => {
    if (!f || !onUploadImage) return;
    setUploading(true);
    try {
      const url = await onUploadImage(f);
      if (url) setImagen(url);
    } finally {
      setUploading(false);
    }
  };

  // revalidate on change
  React.useEffect(() => { validate(); }, [nombre, puesto, nivel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className={`w-full max-w-xl rounded-2xl shadow-2xl border p-6 transform transition-all duration-180 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}><TranslateText text="Crear Directivo" /></h3>
          <button onClick={onCancel} className={`p-2 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}><X className="w-4 h-4" /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Nombre</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} className={`w-full px-3 py-2 rounded border text-sm ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'}`} />
            {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>}
          </div>
          <div>
            <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Puesto</label>
            <input value={puesto} onChange={e => setPuesto(e.target.value)} className={`w-full px-3 py-2 rounded border text-sm ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'}`} />
            {errors.puesto && <p className="text-xs text-red-500 mt-1">{errors.puesto}</p>}
          </div>
          <div>
            <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Nivel</label>
            <select value={nivel || ''} onChange={e => setNivel(e.target.value || undefined)} className={`w-full px-3 py-2 rounded border text-sm ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white focus:border-emerald-500' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'}`}>
              <option value="">-- Selecciona nivel --</option>
              {NIVEL_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            {errors.nivel && <p className="text-xs text-red-500 mt-1">{errors.nivel}</p>}
          </div>
          <div>
            <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Padre</label>
            <select value={padreid || ''} onChange={e => setPadreid(e.target.value || undefined)} className={`w-full px-3 py-2 rounded border text-sm ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white focus:border-emerald-500' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'}`}>
              <option value="">-- Sin padre --</option>
              {existing.map(n => <option key={n.id} value={n.id}>{n.nombre || n.id}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Descripción (opcional)</label>
          <input value={descripcion} onChange={e => setDescripcion(e.target.value)} className={`w-full px-3 py-2 rounded border text-sm ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'}`} />
          {serverErrors && serverErrors.length > 0 && (
            <div className="mt-2 text-sm text-red-500">
              <strong>Errores del servidor:</strong>
              <ul className="list-disc ml-5 mt-2">
                {serverErrors.map((e, i) => <li key={i}>{e.error || JSON.stringify(e)}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center gap-3">
          <label className={`flex items-center gap-2 cursor-pointer ${theme === 'dark' ? 'text-gray-300' : ''}`}>
            <span className={`px-3 py-2 rounded ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border'}`}>{uploading ? 'Subiendo...' : 'Subir foto'}</span>
            <input type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]); }} />
          </label>
          {imagen && <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Foto lista</div>}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onCancel} disabled={saving} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Cancelar</button>
          <button onClick={handleConfirm} disabled={Object.keys(errors).length > 0 || saving} className={`px-4 py-2 rounded font-semibold flex items-center gap-2 ${Object.keys(errors).length > 0 || saving ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 text-white'}`}>
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
