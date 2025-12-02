"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import { fetchOrganigrama, saveOrganigrama, OrganigramaNode } from "./OrganigramaAPI";
import { OrganigramaTree } from "./OrganigramaTree";
import { OrganigramaEditor } from "./OrganigramaEditor";

export default function OrganigramaAdminPage() {
  // Soporte de tema (light/dark) con persistencia
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || saved === 'light' ? saved : 'light';
    }
    return 'light';
  });
  // Eliminar efecto innecesario: el valor inicial de theme ya se obtiene de localStorage
  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') localStorage.setItem('theme', next);
      return next;
    });
  };

  const [organigrama, setOrganigrama] = useState<OrganigramaNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrganigrama().then((data) => {
      setOrganigrama(data?.estructura || []);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSuccess("");
    setError("");
    setLoading(true);
    const res = await saveOrganigrama(organigrama);
    if (res) {
      setSuccess("Guardado correctamente");
      setEdit(false);
    } else {
      setError("Error al guardar");
    }
    setLoading(false);
  };

  // Eliminar el branch condicional para evitar errores de hidratación SSR/CSR
  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <Sidebar selected="organigrama" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={() => {}} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="max-w-4xl mx-auto w-full py-10 px-4">
          <h1 className={`text-3xl font-black mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#003d8f]'}`}>Organigrama Empresarial</h1>
          <TranslateText text="Administra la estructura jerárquica y los directivos de la empresa. Lo que edites aquí se mostrará en la web pública." />

          <div className="mb-6 flex gap-4 items-center">
            <button
              className={`px-5 py-2 rounded-lg font-bold transition ${theme === 'dark' ? 'bg-blue-800 text-white hover:bg-blue-600' : 'bg-[#003d8f] text-white hover:bg-[#2563eb]'}`}
              onClick={() => setEdit((e) => !e)}
            >
              {edit ? "Ver organigrama" : "Editar organigrama"}
            </button>
            {edit && (
              <button
                className="px-5 py-2 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800 transition"
                onClick={handleSave}
              >
                Guardar cambios
              </button>
            )}
          </div>

          {loading ? (
            <div className={`text-center py-10 text-lg ${theme === 'dark' ? 'text-blue-200' : 'text-[#003d8f]'}`}>Cargando...</div>
          ) : edit ? (
            <OrganigramaEditor nodes={organigrama} onChange={setOrganigrama} theme={theme} />
          ) : (
            <OrganigramaTree nodes={organigrama} theme={theme} />
          )}

          {success && <div className="text-green-600 font-bold mt-4">{success}</div>}
          {error && <div className="text-red-600 font-bold mt-4">{error}</div>}
        </main>
      </div>
    </div>
  );
}
