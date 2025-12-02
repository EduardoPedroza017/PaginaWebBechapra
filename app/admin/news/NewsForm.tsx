import { useState } from "react";
import { NewsItem } from "./NewsFilter";

interface Props {
  onCreated: (news: NewsItem) => void;
  theme: 'light' | 'dark';
}

export default function NewsForm({ onCreated, theme }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData();
    form.append("title", title);
    form.append("subtitle", subtitle);
    form.append("description", description);
    if (image) form.append("image", image);
    try {
      const res = await fetch("http://localhost:5000/api/news", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error("Error al crear noticia");
      const data = await res.json();
      onCreated(data.news);
      setTitle(""); setSubtitle(""); setDescription(""); setImage(null);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`mb-8 rounded-xl shadow p-6 ${theme === 'dark' ? 'bg-[#10192b]' : 'bg-white'}`}>
      <div className="font-bold mb-4 text-lg">Crear Noticia</div>
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
          <label className={`block mb-1 font-medium ${theme === 'dark' ? 'text-blue-200' : 'text-black'}`}>Imagen</label>
          <input type="file" accept="image/*" className="w-full" onChange={e => setImage(e.target.files?.[0] || null)} />
        </div>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button type="submit" disabled={loading} className="mt-4 px-6 py-2 rounded-lg font-semibold shadow bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60">{loading ? "Guardando..." : "Crear Noticia"}</button>
    </form>
  );
}
