"use client";

import React, { useEffect, useState } from "react";
import { Construction } from "lucide-react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";

export default function AdminPageProximamente() {
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
      <Sidebar selected="dashboard" theme={theme} />

      <div className="flex-1 flex flex-col">
        <Header onLogout={() => {}} onToggleTheme={handleToggleTheme} theme={theme} />

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-xl w-full text-center bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Construction className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              <TranslateText text="Próximamente" />
            </h1>

            <p className="text-gray-600 mb-6">
              <TranslateText text="Este módulo se encuentra actualmente en desarrollo." />
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <TranslateText text="En desarrollo" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
