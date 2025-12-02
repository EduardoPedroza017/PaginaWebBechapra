import { useState, useEffect } from "react";
import { NewsItem } from "./NewsFilter";

interface Props {
  open: boolean;
  item: NewsItem | null;
  onClose: () => void;
  onUpdated: (news: NewsItem) => void;
  theme: 'light' | 'dark';
}

export default function NewsEditModal({ open, item, onClose, onUpdated, theme }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setSubtitle(item.subtitle);
      setDescription(item.description);
      setImage(null);
    }
  }, [item]);

  if (!open || !item) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!item) return;
    setLoading(true);
    setError("");
    const form = new FormData();
    form.append("title", title);
    form.append("subtitle", subtitle);
    form.append("description", description);
    if (image) form.append("image", image);
    try {
      const res = await fetch(`http://localhost:5000/api/news/${encodeURIComponent(item!.title)}`, {
        method: "PUT",
        body: form,
      });
      if (!res.ok) throw new Error("Error al actualizar noticia");
      const data = await res.json();
      onUpdated(data.news);
      onClose();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={handleSubmit} className={`w-full max-w-lg rounded-xl shadow p-6 ${theme === 'dark' ? 'bg-[#10192b]' : 'bg-white'}`}>
        <div className="font-bold mb-4 text-lg">Editar Noticia</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block mb-1 font-medium ${theme === 'dark' ? 'text-blue-200' : 'text-black'}`}>Título</label>
            <input className={`w-full rounded-lg border px-3 py-2 text-sm shadow focus:border-blue-400 ${theme === 'dark' ? 'bg-[#10192b] text-white border-[#22304a]' : 'bg-white text-black border-blue-200'}`} value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className={`block mb-1 font-medium ${theme === 'dark' ? 'text-blue-200' : 'text-black'}`}>Subtítulo</label>
            <input className={`w-full rounded-lg border px-3 py-2 text-sm shadow focus:border-blue-400 ${theme === 'dark' ? 'bg-[#10192b] text-white border-[#22304a]' : 'bg-white text-black border-blue-200'}`} value={subtitle} onChange={e => setSubtitle(e.target.value)} required />
          </div>
          <div className="md:col-span-2">
            <label className={`block mb-1 font-medium ${theme === 'dark' ? 'text-blue-200' : 'text-black'}`}>Descripción</label>
            <textarea className={`w-full rounded-lg border px-3 py-2 text-sm shadow focus:border-blue-400 ${theme === 'dark' ? 'bg-[#10192b] text-white border-[#22304a]' : 'bg-white text-black border-blue-200'}`} value={description} onChange={e => setDescription(e.target.value)} required rows={3} />
          </div>
          <div className="md:col-span-2">
            <label className={`block mb-1 font-medium ${theme === 'dark' ? 'text-blue-200' : 'text-black'}`}>Imagen (opcional)</label>
            <input type="file" accept="image/*" className="w-full" onChange={e => setImage(e.target.files?.[0] || null)} />
          </div>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg font-semibold bg-gray-300 text-black hover:bg-gray-400">Cancelar</button>
          <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg font-semibold shadow bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60">{loading ? "Guardando..." : "Guardar Cambios"}</button>
        </div>
      </form>
    </div>
  );
}
