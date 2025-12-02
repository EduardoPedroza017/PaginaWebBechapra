"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";

interface Essence {
  id?: string;
  mision: string;
  vision: string;
  valores: string;
}

interface EssenceHistory {
  id: string;
  date?: string;
  user?: string;
  old: { mision: string; vision: string; valores: string };
  new: { mision: string; vision: string; valores: string };
}

export default function EssenceAdminPage() {
      // Soporte de tema (light/dark) con persistencia
      const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('theme');
          return saved === 'dark' || saved === 'light' ? saved : 'light';
        }
        return 'light';
      });
      const [mounted, setMounted] = useState(false);
      useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('theme');
          if (saved === 'dark' || saved === 'light') setTheme(saved);
        }
      }, []);
      const handleToggleTheme = () => {
        setTheme((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          if (typeof window !== 'undefined') localStorage.setItem('theme', next);
          return next;
        });
      };
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const name = e.target.name as keyof Essence;
      setEssence({ ...essence, [name]: e.target.value });
    };

    const handleSave = async () => {
      setSuccess("");
      setError("");
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/essence", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mision: essence.mision,
            vision: essence.vision,
            valores: essence.valores,
          }),
        });
        if (!res.ok) throw new Error("Error al guardar");
        const data = await res.json();
        setEssence(data);
        setSuccess("Guardado correctamente");
        setEdit(false);
      } catch {
        setError("Error al guardar los datos");
      } finally {
        setLoading(false);
      }
    };
  const [essence, setEssence] = useState<Essence>({ mision: "", vision: "", valores: "" });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [history, setHistory] = useState<EssenceHistory[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Cargar datos de esencia y de historial al montar
  useEffect(() => {
    const fetchEssence = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/essence");
        if (!res.ok) throw new Error("No se pudo cargar la esencia");
        const data = await res.json();
        setEssence(data);
      } catch {
        setError("No se pudo cargar la esencia");
      } finally {
        setLoading(false);
      }
    };
    const fetchHistory = async () => {
      setLoadingHistory(true);
      try {
        const res = await fetch("http://localhost:5000/api/essence/history");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setHistory(Array.isArray(data) ? data : []);
      } catch {
        setHistory([]);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchEssence();
    fetchHistory();
  }, []);
  const filteredEssence: Essence = filter.trim()
    ? (["mision", "vision", "valores"] as (keyof Essence)[]).reduce((acc, key) => {
        const value = essence[key] ?? "";
        acc[key] = value.toLowerCase().includes(filter.toLowerCase()) ? value : "";
        return acc;
      }, { mision: "", vision: "", valores: "" } as Essence)
    : essence;

  if (!mounted) return null;
  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <Sidebar selected="essence" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={() => {}} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="max-w-3xl mx-auto w-full py-10 px-4">
          <h1 className={`text-3xl font-black mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#003d8f]'}`}>Misión, Visión y Valores</h1>
          <TranslateText text="Administra la misión, visión y valores institucionales que se muestran en la web pública." />

          <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Filtrar por palabra clave..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className={`w-full md:w-80 px-4 py-2 rounded-lg border outline-none text-base transition-colors
                ${theme === 'dark'
                  ? 'bg-gray-900 border-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                  : 'bg-white border-[#003d8f33] text-black focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f22]'}
              `}
            />
            <button
              className={`px-5 py-2 rounded-lg font-bold transition
                ${theme === 'dark'
                  ? 'bg-blue-800 text-white hover:bg-blue-600'
                  : 'bg-[#003d8f] text-white hover:bg-[#2563eb]'}
              `}
              onClick={() => setEdit(true)}
              disabled={edit}
            >
              Editar
            </button>
          </div>

          {loading ? (
            <div className={`text-center py-10 text-lg ${theme === 'dark' ? 'text-blue-200' : 'text-[#003d8f]'}`}>Cargando...</div>
          ) : (
            <form
              className={`space-y-8 rounded-2xl shadow p-8 border transition-colors
                ${theme === 'dark'
                  ? 'bg-gray-900 border-gray-700'
                  : 'bg-white border-[#e3eaf6]'}
              `}
              onSubmit={e => { e.preventDefault(); handleSave(); }}
            >
              <div>
                <label className={`block font-bold mb-2 ${theme === 'dark' ? 'text-blue-200' : 'text-[#003d8f]'}`}>Misión</label>
                <textarea
                  name="mision"
                  value={filteredEssence.mision || ""}
                  onChange={handleChange}
                  disabled={!edit}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border outline-none text-base resize-none transition-colors
                    ${theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-900 disabled:bg-gray-800'
                      : 'bg-[#f6f8fb] border-[#003d8f33] text-black focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f22] disabled:bg-[#f6f8fb]'}
                  `}
                />
              </div>
              <div>
                <label className={`block font-bold mb-2 ${theme === 'dark' ? 'text-blue-200' : 'text-[#003d8f]'}`}>Visión</label>
                <textarea
                  name="vision"
                  value={filteredEssence.vision || ""}
                  onChange={handleChange}
                  disabled={!edit}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border outline-none text-base resize-none transition-colors
                    ${theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-900 disabled:bg-gray-800'
                      : 'bg-[#f6f8fb] border-[#003d8f33] text-black focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f22] disabled:bg-[#f6f8fb]'}
                  `}
                />
              </div>
              <div>
                <label className={`block font-bold mb-2 ${theme === 'dark' ? 'text-blue-200' : 'text-[#003d8f]'}`}>Valores</label>
                <textarea
                  name="valores"
                  value={filteredEssence.valores || ""}
                  onChange={handleChange}
                  disabled={!edit}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border outline-none text-base resize-none transition-colors
                    ${theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-900 disabled:bg-gray-800'
                      : 'bg-[#f6f8fb] border-[#003d8f33] text-black focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f22] disabled:bg-[#f6f8fb]'}
                  `}
                />
              </div>
              {edit && (
                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    className={`px-6 py-2 rounded-lg font-bold transition
                      ${theme === 'dark'
                        ? 'bg-blue-800 text-white hover:bg-blue-600'
                        : 'bg-[#003d8f] text-white hover:bg-[#2563eb]'}
                    `}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className={`px-6 py-2 rounded-lg font-bold transition
                      ${theme === 'dark'
                        ? 'bg-gray-700 text-blue-200 hover:bg-gray-600'
                        : 'bg-[#e3eaf6] text-[#003d8f] hover:bg-[#b6c6e6]'}
                    `}
                    onClick={() => { setEdit(false); setFilter(""); }}
                  >
                    Cancelar
                  </button>
                </div>
              )}
              {success && <div className="text-green-600 font-bold mt-4">{success}</div>}
              {error && <div className="text-red-600 font-bold mt-4">{error}</div>}
            </form>
          )}

          {/* Historial de cambios */}
          <section className="mt-12">
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#003d8f]'}`}>Historial de cambios</h2>
            {loadingHistory ? (
              <div className={`text-center py-6 ${theme === 'dark' ? 'text-blue-200' : 'text-[#003d8f]'}`}>Cargando historial...</div>
            ) : history.length === 0 ? (
              <div className={`text-center py-6 ${theme === 'dark' ? 'text-gray-400' : 'text-[#666]'}`}>Sin cambios registrados.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className={`min-w-full rounded-xl transition-colors
                  ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-[#e3eaf6]'}
                `}>
                  <thead>
                    <tr className={`${theme === 'dark' ? 'bg-gray-800 text-blue-200' : 'bg-[#f6f8fb] text-[#003d8f]'}`}>
                      <th className="px-4 py-2 text-left">Fecha</th>
                      <th className="px-4 py-2 text-left">Usuario</th>
                      <th className="px-4 py-2 text-left">Campo</th>
                      <th className="px-4 py-2 text-left">Valor anterior</th>
                      <th className="px-4 py-2 text-left">Valor nuevo</th>
                    </tr>
                  </thead>
                  {/* Only keep the correct, type-safe history table block */}
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
