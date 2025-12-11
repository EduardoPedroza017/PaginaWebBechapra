
"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { useLanguage } from '@/lib/LanguageContext';
import { CurrentLogo } from "./CurrentLogo";
import { LogoUploadForm } from "./LogoUploadForm";
import { LogoHistory } from "./LogoHistory";

interface Logo {
  filename: string;
  path?: string;
  upload_date?: string;
  size?: number;
}


export default function BrandingPage() {
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const [logoHistory, setLogoHistory] = useState<Logo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    fetchCurrentLogo();
    fetchLogoHistory();
    setTheme(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
  }, []);

  async function fetchCurrentLogo() {
    const res = await fetch("http://localhost:5000/api/logo");
    const data = await res.json();
    setCurrentLogo(data.url);
  }

  async function fetchLogoHistory() {
    const res = await fetch("http://localhost:5000/api/logo/history");
    const data = await res.json();
    setLogoHistory(data.logos || []);
  }

  async function handleUpload(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("logo", file);
    const res = await fetch("http://localhost:5000/admin/upload-logo", {
      method: "POST",
      body: formData,
    });
    setUploading(false);
    if (res.ok) {
      fetchCurrentLogo();
      fetchLogoHistory();
    }
  }

  async function handleSelectLogo(filename: string) {
    await fetch("http://localhost:5000/admin/select-logo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });
    fetchCurrentLogo();
  }

  function handleToggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  }

  function handleLogout() {
    // Implementa tu lógica de logout aquí
  }

  return (
    <div className={`flex min-h-screen bg-${theme === 'dark' ? 'slate-900' : 'white'}`}>
      <Sidebar selected="/admin/branding" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="max-w-2xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">Gestión de Logo</h1>
          <CurrentLogo currentLogo={currentLogo} />
          <LogoUploadForm uploading={uploading} onUpload={handleUpload} />
          <LogoHistory logoHistory={logoHistory} onSelectLogo={handleSelectLogo} />
        </main>
      </div>
    </div>
  );
}
