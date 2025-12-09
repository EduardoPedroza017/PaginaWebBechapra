
"use client";

import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import React, { useState } from "react";
import { colorPalettes, PaletteName } from "../../../src/theme/palettes";
import { PaletteSelector } from "../../../src/components/PaletteSelector";

export default function PaletaPage() {
  const [palette, setPalette] = useState<PaletteName>(() => {
    if (typeof window !== "undefined") {
      const savedPalette = localStorage.getItem("palette") as PaletteName;
      if (savedPalette && colorPalettes[savedPalette]) {
        return savedPalette;
      }
    }
    return "azul";
  });
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Leer el tema guardado en localStorage al iniciar
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'light';
    }
    return 'light';
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handlePaletteChange = (p: PaletteName) => {
    setPalette(p);
    localStorage.setItem("palette", p);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  if (!mounted) {
    // Render a static background to avoid hydration mismatch
    return <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" />;
  }

  const activePalette = colorPalettes[palette][theme];

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <Sidebar selected="/admin/paleta" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header
          onLogout={() => {
            sessionStorage.removeItem("admin");
            sessionStorage.removeItem("role");
            window.location.href = "/admin";
          }}
          onToggleTheme={handleToggleTheme}
          theme={theme}
          palette={activePalette}
        />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className={`rounded-xl shadow-lg p-8 max-w-md w-full border ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            }`}>
            <h1 className={`text-2xl font-bold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              <TranslateText text="Selecciona una paleta de colores" />
            </h1>
            <PaletteSelector palette={palette} setPalette={handlePaletteChange} theme={theme} />
            <div className="mt-8 text-center">
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <TranslateText text="Paleta actual:" />{' '}
              </span>
              <span className="inline-block px-3 py-1 rounded-full border" style={{ background: activePalette.primary, color: '#fff', borderColor: activePalette.secondary }}>
                {palette}
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
