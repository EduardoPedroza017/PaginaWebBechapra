"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import { useLocation } from "./hooks/useLocation";
import { LocationForm } from "./components/LocationForm";
import { LocationPreview } from "./components/LocationPreview";
import { ActionButtons } from "./components/ActionButtons";

export default function LocationAdminPage() {
  const { location, setLocation, loading, saving, message, handleSave, handleReset } = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleLogout = () => {
    window.location.href = '/admin';
  };

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar selected="/admin/ubicacion" theme={theme} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
          <main className="flex-1 overflow-y-auto p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                  text="Gestiona la ubicación y datos de contacto que se mostrarán en el sitio web"
                />
              </p>
            </div>

            {/* Message Alert */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Location Form */}
            <LocationForm location={location} onChange={setLocation} />

            {/* Action Buttons */}
            <div className="mt-6">
              <ActionButtons onSave={handleSave} onReset={handleReset} saving={saving} />
            </div>

            {/* Preview */}
            <LocationPreview location={location} />
          </div>
        </main>
      </div>
    </div>
  );
}
