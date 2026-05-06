"use client";

import React, { useEffect, useState } from "react";
import { Users, ArrowRight } from "lucide-react";

import { TranslateText } from "@/components/TranslateText";

export default function AdminOrganigramaPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        requestAnimationFrame(() => setTheme(savedTheme as 'dark' | 'light'));
      }
    }
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      

      <div className="flex-1 flex flex-col">
        

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-xl w-full text-center bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              <TranslateText text="Organigrama Ejecutivo" />
            </h1>

            <p className="text-gray-600 mb-8">
              <TranslateText text="Gestiona la información completa de los ejecutivos de la organización." />
            </p>

            <div className="space-y-4">
              <a
                href="/web/admin/ejecutivos"
                className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                <Users className="w-5 h-5" />
                <TranslateText text="Ir a Gestión de Ejecutivos" />
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-sm text-gray-500">
                <TranslateText text="Accede al CRUD completo con fotos, filtros y estadísticas" />
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

