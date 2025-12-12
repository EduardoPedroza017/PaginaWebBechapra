import React, { useState, useEffect } from "react";
import { Button } from "../../components/shared/Button";
import { FormInput } from "../../components/shared/FormInput";
import { TranslateText } from "@/components/TranslateText";

export interface Service {
  id?: string;
  name: string;
  slug: string;
  category?: string;
  description?: string;
  longDescription?: string;
  icon?: string;
  image?: string;
  features?: string[];
  cta?: { text?: string; link?: string };
  active?: boolean;
  order?: number;
}

interface ServiceFormProps {
  initialData?: Service;
  onSubmit: (data: Service) => void;
  onCancel: () => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ initialData, onSubmit, onCancel }) => {
  // Detectar tema (oscuro o claro) usando prefers-color-scheme o document.documentElement.classList
  const [theme, setTheme] = useState<'dark' | 'light'>(
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  useEffect(() => {
    const observer = () => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    window.addEventListener('themechange', observer);
    observer();
    return () => window.removeEventListener('themechange', observer);
  }, []);

  const [form, setForm] = useState<Service>(
    initialData || {
      name: "",
      slug: "",
      category: "",
      description: "",
      longDescription: "",
      icon: "",
      image: "",
      features: [],
      cta: { text: "", link: "" },
      active: true,
      order: 0,
    }
  );
  const [featureInput, setFeatureInput] = useState("");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // Cargar imágenes de galería al abrir el modal
  useEffect(() => {
    if (galleryOpen) {
      fetch("http://localhost:5000/api/gallery")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data.images)) {
            setGalleryImages(data.images);
          }
        });
    }
  }, [galleryOpen]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleFeatureAdd() {
    if (featureInput.trim()) {
      setForm((prev) => ({ ...prev, features: [...(prev.features || []), featureInput.trim()] }));
      setFeatureInput("");
    }
  }

  function handleFeatureRemove(idx: number) {
    setForm((prev) => ({ ...prev, features: (prev.features || []).filter((_, i) => i !== idx) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
      <FormInput label="Nombre" name="name" value={form.name} onChange={handleChange} required />
      <FormInput label="Slug" name="slug" value={form.slug} onChange={handleChange} required />
      <FormInput label="Categoría" name="category" value={form.category} onChange={handleChange} />
      <FormInput label="Descripción corta" name="description" value={form.description} onChange={handleChange} />
      <FormInput label="Descripción larga" name="longDescription" value={form.longDescription} onChange={handleChange} />
      {/* Icono: solo .ico o .png */}
      <div className={`mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
        <label className="block font-medium mb-1">Icono (.ico o .png)
          <span className="block text-xs mt-1 text-slate-400">Solo se permiten archivos .ico o .png. Tamaño recomendado: 64x64px.</span>
        </label>
        <input
          type="file"
          accept=".ico,.png"
          className={`border rounded px-2 py-1 w-full ${theme === 'dark' ? 'bg-slate-800 border-slate-600 text-slate-100' : 'bg-white border-slate-300 text-slate-900'}`}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              const ext = file.name.split('.').pop()?.toLowerCase();
              if (ext === 'ico' || ext === 'png') {
                const url = URL.createObjectURL(file);
                setForm(prev => ({ ...prev, icon: url }));
              } else {
                alert('Solo se permiten archivos .ico o .png');
              }
            }
          }}
        />
        {form.icon && (
          <div className="mt-2 flex items-center gap-2">
            <img src={form.icon} alt="icono" className="w-10 h-10 object-contain border rounded bg-slate-100 dark:bg-slate-700" />
            <span className="text-xs break-all max-w-[60%]">{form.icon}</span>
          </div>
        )}
      </div>

      {/* Imagen: subir o galería */}
      <div className={`mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
        <label className="block font-medium mb-1">Imagen (subir o galería)
          <span className="block text-xs mt-1 text-slate-400">Puedes subir una imagen desde tu ordenador o elegir una de la galería. Formatos: jpg, png, webp. Tamaño recomendado: 400x300px.</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="file"
            accept="image/*"
            className={`border rounded px-2 py-1 flex-1 ${theme === 'dark' ? 'bg-slate-800 border-slate-600 text-slate-100' : 'bg-white border-slate-300 text-slate-900'}`}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setForm(prev => ({ ...prev, image: url }));
              }
            }}
          />
          <button
            type="button"
            className={`px-3 py-1 rounded border font-semibold ${theme === 'dark' ? 'bg-slate-700 text-slate-100 border-slate-500 hover:bg-slate-600' : 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200'}`}
            onClick={() => setGalleryOpen(true)}
          >
            Seleccionar de galería
          </button>
        </div>
        {form.image && (
          <div className="mt-2 flex items-center gap-2">
            <img src={form.image} alt="imagen" className="w-24 h-16 object-cover border rounded bg-slate-100 dark:bg-slate-700" />
            <span className="text-xs break-all max-w-[60%]">{form.image}</span>
          </div>
        )}
        {/* Modal galería dinámico */}
        {galleryOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className={`rounded-lg shadow-lg p-6 w-full max-w-lg ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'}`}>
              <h3 className="text-lg font-bold mb-4">Seleccionar imagen de galería</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {galleryImages.length === 0 && (
                  <span className="col-span-4 text-center text-slate-400">No hay imágenes en galería</span>
                )}
                {galleryImages.map(img => (
                  <img
                    key={img}
                    src={`http://localhost:5000/gallery/image/${encodeURIComponent(img)}`}
                    alt={img}
                    className="w-20 h-16 object-cover border rounded cursor-pointer hover:ring-2 hover:ring-blue-400 bg-slate-100 dark:bg-slate-700"
                    onClick={() => {
                      setForm(prev => ({ ...prev, image: `http://localhost:5000/gallery/image/${encodeURIComponent(img)}` }));
                      setGalleryOpen(false);
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                className={`px-4 py-2 rounded font-semibold ${theme === 'dark' ? 'bg-slate-700 text-slate-100 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'}`}
                onClick={() => setGalleryOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <label className="block font-medium mb-1"><TranslateText text="Características" /></label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={featureInput}
            onChange={e => setFeatureInput(e.target.value)}
            className="border rounded px-2 py-1 flex-1"
            placeholder="Agregar característica"
            aria-label="Agregar característica"
          />
          <Button type="button" onClick={handleFeatureAdd}><TranslateText text="Agregar" /></Button>
        </div>
        <ul className="flex flex-wrap gap-2">
          {(form.features || []).map((f, i) => (
            <li key={i} className="bg-blue-100 px-2 py-1 rounded flex items-center gap-1">
              {f}
              <button type="button" onClick={() => handleFeatureRemove(i)} className="text-red-500 ml-1" aria-label="Quitar característica">×</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        <FormInput label="CTA Texto" name="cta.text" value={form.cta?.text || ""} onChange={e => setForm(prev => ({ ...prev, cta: { ...prev.cta, text: e.target.value } }))} />
        <FormInput label="CTA Link" name="cta.link" value={form.cta?.link || ""} onChange={e => setForm(prev => ({ ...prev, cta: { ...prev.cta, link: e.target.value } }))} />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="active" checked={form.active} onChange={handleChange} /> <TranslateText text="Activo" />
        </label>
        <FormInput label="Orden" name="order" type="number" value={form.order} onChange={handleChange} />
      </div>
      <div className="flex gap-2 justify-end border-t pt-4 mt-4">
        <Button type="button" variant="secondary" onClick={onCancel}><TranslateText text="Cancelar" /></Button>
        <Button type="submit"><TranslateText text="Guardar" /></Button>
      </div>
    </form>

    {/* Previsualización en tiempo real */}
    <div className="flex-1 w-full max-w-md mx-auto mt-8 lg:mt-0">
      <div className="rounded-2xl shadow-xl bg-gradient-to-br from-blue-50/90 via-white/95 to-cyan-50/90 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 border border-blue-100 dark:border-slate-700 p-0 overflow-hidden flex flex-col h-full">
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-blue-700 to-cyan-600 dark:from-blue-900 dark:to-cyan-900">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">Previsualización</h3>
        </div>
        <div className="flex flex-col gap-5 p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            {form.icon && (
              <img src={form.icon} alt="icono" className="w-12 h-12 sm:w-14 sm:h-14 object-contain border-2 border-blue-200 dark:border-blue-900 rounded-xl bg-slate-100 dark:bg-slate-800 shadow" />
            )}
            <div>
              <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">{form.name || <span className="text-slate-400">Nombre del servicio</span>}</div>
              <div className="text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider">{form.category}</div>
            </div>
          </div>
          <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base mb-2 min-h-[2.5em]">{form.description || <span className="text-slate-400">Descripción corta...</span>}</div>
          {form.image && (
            <img src={form.image} alt="imagen" className="w-full h-28 sm:h-36 object-cover rounded-lg border-2 border-blue-100 dark:border-blue-900 bg-slate-100 dark:bg-slate-800 shadow" />
          )}
          <div>
            <div className="font-semibold text-xs text-slate-500 dark:text-slate-400 mb-1">Características:</div>
            <ul className="flex flex-wrap gap-2">
              {Array.isArray(form.features) && form.features.length > 0 ? (
                form.features.map((f: any, i: number) => (
                  <li key={i} className="bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full text-xs text-blue-800 dark:text-blue-200 font-semibold shadow-sm">{typeof f === 'string' ? f : (f && typeof f === 'object' && 'name' in f ? f.name : '')}</li>
                ))
              ) : (
                <li className="text-slate-400">Sin características</li>
              )}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <div className="flex-1">
              <div className="font-semibold text-xs text-slate-500 dark:text-slate-400 mb-1">CTA Texto:</div>
              <div className="text-slate-700 dark:text-slate-200 text-sm">{form.cta?.text || <span className="text-slate-400">Sin CTA</span>}</div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-xs text-slate-500 dark:text-slate-400 mb-1">CTA Link:</div>
              <div className="text-slate-700 dark:text-slate-200 text-sm break-all">{form.cta?.link || <span className="text-slate-400">Sin link</span>}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`inline-block w-3 h-3 rounded-full ${form.active ? 'bg-green-500' : 'bg-red-400'}`}></span>
            <span className="text-xs font-semibold">{form.active ? 'Activo' : 'Inactivo'}</span>
            <span className="ml-auto text-xs text-slate-400">Orden: {form.order}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
