
"use client";
import { useEffect, useState } from "react";

interface Image {
  filename: string;
  path: string;
}

export default function GaleriaPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [selected, setSelected] = useState<Image | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("http://localhost:5000/api/gallery");
        const data = await res.json();
        if (Array.isArray(data.images)) {
          setImages(data.images.map((filename: string) => ({ filename, path: `http://localhost:5000/gallery/image/${filename}` })));
        } else if (Array.isArray(data)) {
          setImages(data.map((img: any) => ({ filename: img.filename, path: `http://localhost:5000/gallery/image/${img.filename}` })));
        }
      } catch (e) {
        setImages([]);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-700 dark:text-blue-400">Galería de Imágenes</h1>
      <p className="text-center text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
        Explora nuestra colección de imágenes de eventos, sucursales y momentos destacados de Bechapra. Haz clic en cualquier imagen para ampliarla.
      </p>
      {loading ? (
        <div className="text-center text-slate-500">Cargando imágenes...</div>
      ) : images.length === 0 ? (
        <div className="text-center text-slate-500">No hay imágenes disponibles.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <button
              key={img.filename}
              className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 shadow hover:shadow-lg"
              onClick={() => setSelected(img)}
              aria-label={`Ver imagen ${img.filename}`}
              style={{
                animation: `fadeIn 0.7s ease ${idx * 0.07}s both`
              }}
            >
              <img
                src={img.path}
                alt={img.filename}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <span className="absolute bottom-2 left-2 bg-white/80 text-xs px-2 py-1 rounded shadow text-slate-700">
                {img.filename}
              </span>
            </button>
          ))}
        </div>
      )}
      {/* Modal para ampliar imagen */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setSelected(null)}
        >
          <div className="bg-white rounded-xl p-4 max-w-lg w-full relative animate-fadeIn" onClick={e => e.stopPropagation()}>
            <img src={selected.path} alt={selected.filename} className="w-full h-auto rounded" />
            <button
              className="absolute top-2 right-2 bg-slate-800 text-white rounded-full px-3 py-1 text-sm"
              onClick={() => setSelected(null)}
            >Cerrar</button>
            <div className="mt-2 text-center text-xs text-slate-500">{selected.filename}</div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease both;
        }
      `}</style>
    </main>
  );
}
