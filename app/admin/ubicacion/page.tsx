"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import { LocationPreview } from "./components/LocationPreview";
import { companyLocation } from "@/lib/locationData";

export default function LocationAdminPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleLogout = () => {
    window.location.href = '/admin';
  };

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar selected="/admin/ubicacion" theme={theme} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <MapPin size={32} className="text-blue-600" />
                <TranslateText text="Ubicación de la Empresa" />
              </h1>
              <p className="text-gray-600 mt-2">
                <TranslateText
                  text="Esta sección muestra únicamente la tarjeta con el mapa oficial. Para actualizar la ubicación edita el valor en código."
                />
              </p>
            </div>

            <LocationPreview location={companyLocation} />
          </div>
        </main>
      </div>
    </div>
  );
}
