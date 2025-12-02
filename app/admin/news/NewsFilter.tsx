import { useState } from "react";

export interface NewsItem {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image_url?: string;
}

interface Props {
  news: NewsItem[];
  onFilter: (filtered: NewsItem[]) => void;
  theme: 'light' | 'dark';
}

export default function NewsFilter({ news, onFilter, theme }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  function handleFilter() {
    let filtered = news;
    if (title.trim()) filtered = filtered.filter(n => n.title.toLowerCase().includes(title.toLowerCase()));
    if (date) filtered = filtered.filter(n => n.date.startsWith(date));
    onFilter(filtered);
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end">
      <div>
        <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-blue-200' : 'text-black'}`}>Título</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={handleFilter}
          className={`rounded-lg border px-3 py-2 text-sm shadow focus:border-blue-400 ${theme === 'dark' ? 'bg-[#10192b] text-white border-[#22304a] placeholder:text-blue-200/60' : 'bg-white text-black border-blue-200 placeholder:text-gray-400'}`}
          placeholder="Filtrar por título"
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-blue-200' : 'text-black'}`}>Fecha</label>
        <input
          type="date"
          value={date}
          onChange={e => { setDate(e.target.value); setTimeout(handleFilter, 0); }}
          className={`rounded-lg border px-3 py-2 text-sm shadow focus:border-blue-400 ${theme === 'dark' ? 'bg-[#10192b] text-white border-[#22304a] placeholder:text-blue-200/60' : 'bg-white text-black border-blue-200 placeholder:text-gray-400'}`}
        />
      </div>
      <button
        type="button"
        onClick={handleFilter}
        className={`px-4 py-2 rounded-lg font-semibold shadow transition ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
      >
        Filtrar
      </button>
    </div>
  );
}
