import React, { useState, useEffect } from "react";
import { Button } from "../../components/shared/Button";
import { FormInput } from "../../components/shared/FormInput";
import { TranslateText } from "@/components/TranslateText";

export interface Service {
  id?: string;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  handle?: string;
  active?: boolean;
}

interface ServiceFormProps {
  initialData?: Service;
  onSubmit: (data: Service) => void;
  onCancel: () => void;
  onContinue?: (handle?: string) => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ initialData, onSubmit, onCancel, onContinue }) => {
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
      description: "",
      icon: "",
      image: "",
    }
  );
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [pages, setPages] = useState<Array<{handle:string, heroTitle?:string}>>([]);

  // Define the API URL with localhost fallback
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  // Cargar imágenes de galería al abrir el modal
  useEffect(() => {
    if (galleryOpen) {
      // Use adminApi.listImages which hits the correct gallery admin endpoint
      import('../../utils/admin-api').then(({ adminApi }) => {
        adminApi.listImages().then(result => {
          if (result.success && result.data) setGalleryImages(result.data);
        }).catch(() => {});
      }).catch(() => {});
    }
  }, [galleryOpen]);

  // Cargar service_pages para permitir asociación por handle
  useEffect(() => {
    const API = (process.env.NEXT_PUBLIC_API_URL as string);
    fetch(`${API}/api/service_pages`)
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          type RawPage = Record<string, unknown>;
          setPages(data.map((p: RawPage) => ({
            handle: String(p.handle || ''),
            heroTitle: typeof p.heroTitle === 'string' ? p.heroTitle : undefined,
          })));
        }
      })
      .catch(() => {});
  }, []);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  // Detect whether form fields were changed compared to initialData
  const isChanged = (() => {
    if (!initialData) return true; // creating new -> treat as changed
    const keys: (keyof Service)[] = ["name", "description", "icon", "image", "handle"];
    for (const k of keys) {
      const a = (initialData as Service)[k] ?? "";
      const b = (form as Service)[k] ?? "";
      if (String(a) !== String(b)) return true;
    }
    return false;
  })();

  function handleContinue() {
    // prefer explicit handle, fallback to slug from name
    const maybeHandle = form.handle || (form.name || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    if (typeof onContinue === 'function') onContinue(maybeHandle);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <FormInput label="Nombre" name="name" value={form.name} onChange={handleChange} required theme={theme} />
        <FormInput label="Descripción corta" name="description" value={form.description} onChange={handleChange} theme={theme} />
        <FormInput label="Handle (clave única)" name="handle" value={form.handle ?? ''} onChange={handleChange} theme={theme} />
        <div className="text-xs text-slate-400 mb-2">Selecciona una página existente o deja el handle para crear/usar una nueva página.</div>
        {pages.length > 0 && (
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Páginas existentes</label>
            <select className="w-full rounded border px-2 py-1" onChange={e => setForm(prev => ({ ...prev, handle: e.target.value }))} value={form.handle ?? ''}>
              <option value="">-- (no asociada) --</option>
              {pages.map(p => (
                <option key={p.handle} value={p.handle}>{p.heroTitle || p.handle} — {p.handle}</option>
              ))}
            </select>
          </div>
        )}
        
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
                      src={`${API}/gallery/image/${encodeURIComponent(img)}`}
                      alt={img}
                      className="w-20 h-16 object-cover border rounded cursor-pointer hover:ring-2 hover:ring-blue-400 bg-slate-100 dark:bg-slate-700"
                      onClick={() => {
                        setForm(prev => ({ ...prev, image: `${API}/gallery/image/${encodeURIComponent(img)}` }));
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
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            {/* No 'active' checkbox - simplified form */}
          </label>
        </div>
        
        <div className="flex gap-2 justify-end border-t pt-4 mt-4">
          <Button type="button" variant="secondary" onClick={onCancel}><TranslateText text="Cancelar" /></Button>
          {!isChanged ? (
            <Button type="button" onClick={handleContinue}><TranslateText text="Continuar" /></Button>
          ) : (
            <Button type="submit"><TranslateText text="Guardar" /></Button>
          )}
        </div>
      </form>

      {/* Previsualización en tiempo real */}
      <div className="flex-1 w-full max-w-md lg:max-w-md mx-auto mt-8 lg:mt-0 min-w-[330px]">
        <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>Vista Previa</h3>
        <div className={`rounded-2xl shadow-xl overflow-hidden flex flex-col h-full ${theme === 'dark' ? 'bg-[#071123] border border-[#243149]' : 'bg-white border border-gray-200'}`}>
          <div className="relative h-48 overflow-hidden">
            {form.image ? (
              <img src={form.image} alt="imagen" className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900' : 'bg-gray-100'}`}>
                <span className={`${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'} text-sm`}>Sin imagen</span>
              </div>
            )}
            {/* Overlay gradiente en la parte inferior de la imagen */}
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-[#071123]/70 via-transparent to-transparent' : 'bg-gradient-to-t from-white/40 via-transparent to-transparent'}`} />

            {/* Icon overlay top-left */}
            {form.icon && (
              <div className={`${theme === 'dark' ? 'absolute top-5 left-5 bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-xl shadow-2xl' : 'absolute top-5 left-5 bg-white p-2 rounded-md shadow-md border'}`}>
                <img src={form.icon} alt="icono" className="w-8 h-8 object-contain" />
              </div>
            )}
          </div>
          <div className={`${theme === 'dark' ? 'p-6 bg-gradient-to-b from-[#0d1d35] to-[#0a1628] text-white' : 'p-6 bg-white text-gray-900'}`}>
            <div className="mb-4">
              <h4 className={`text-2xl font-bold leading-tight mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {form.name || <span className={`${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>Nombre del servicio</span>}
              </h4>
              <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'} text-sm leading-relaxed min-h-[2.5em]`}>
                {form.description || <span className={`${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'}`}>Aumenta la eficiencia y resultados de tu negocio.</span>}
              </p>
            </div>
            <div className="pt-4">
              <a className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all text-sm`}>
                Conocer más <span className="text-lg">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};