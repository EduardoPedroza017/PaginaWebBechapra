"use client";

import React from "react";

interface PressItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
}

interface Props {
  press: PressItem[];
  onFilter: (filtered: PressItem[]) => void;
}

export default function PressFilter({ press, onFilter }: Props) {
  const [search, setSearch] = React.useState("");
  const [year, setYear] = React.useState("");

  // Obtener años únicos
  const years = Array.from(new Set(press.map(p => new Date(p.date).getFullYear().toString()))).sort((a, b) => b.localeCompare(a));

  React.useEffect(() => {
    let filtered = press;
    if (search.trim()) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (year) {
      filtered = filtered.filter(p => new Date(p.date).getFullYear().toString() === year);
    }
    onFilter(filtered);
  }, [search, year, press, onFilter]);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 px-2 max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Buscar comunicado..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full md:w-72 px-4 py-2 rounded-lg border border-[#003d8f33] focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f22] outline-none text-base"
      />
      <select
        value={year}
        onChange={e => setYear(e.target.value)}
        className="w-full md:w-48 px-4 py-2 rounded-lg border border-[#003d8f33] focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f22] outline-none text-base bg-white"
      >
        <option value="">Todos los años</option>
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}
