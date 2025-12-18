
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
  thumbnail?: string | null;
  webp?: string | null;
  avif?: string | null;
  width?: number | null;
  height?: number | null;
  upload_date?: string;
  size?: number;
}

export default function BrandingPage() {
  const [currentLogo, setCurrentLogo] = useState<Logo | null>(null);
  const [logoHistory, setLogoHistory] = useState<Logo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const toastTimerRef = { current: null as number | null };
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    fetchCurrentLogo();
    fetchLogoHistory();
    // Initialize theme from localStorage (avoid render mismatch)
    setTheme(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
    setMounted(true);
  }, []);

  async function fetchCurrentLogo() {
    const res = await fetch("http://localhost:5000/api/logo");
    const data = await res.json();
    if (!data || !data.filename) setCurrentLogo(null);
    else setCurrentLogo(data);
  }

  async function fetchLogoHistory() {
    const res = await fetch("http://localhost:5000/api/logo/history");
    const data = await res.json();
    setLogoHistory(data.logos || []);
  }

  // Called by child after a successful upload to refresh current logo and history
  async function handleUpload(file: File) {
    // show a quick uploading indicator
    setUploading(true);
    try {
      await fetchCurrentLogo();
      await fetchLogoHistory();
      setToast({ message: 'Logo subido correctamente', visible: true });
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = window.setTimeout(() => setToast({ message: '', visible: false }), 3500) as unknown as number;
    } finally {
      setUploading(false);
    }
  }

  // cleanup
  useEffect(() => {
    return () => { if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current); };
  }, []);

  async function handleSelectLogo(filename: string) {
    await fetch("http://localhost:5000/admin/select-logo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });
    fetchCurrentLogo();
  }

  async function updateLogoMeta(filename: string, alt: string) {
    await fetch(`http://localhost:5000/admin/logo/${filename}/meta`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alt }),
    });
    await fetchLogoHistory();
    await fetchCurrentLogo();
    setToast({ message: 'Texto alternativo actualizado', visible: true });
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast({ message: '', visible: false }), 3000) as unknown as number;
  }

  function handleToggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  function handleLogout() {
    // Implementa tu lógica de logout aquí
  }

  if (!mounted) return null;

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-linear-to-br from-blue-50 to-indigo-100'}`}>
      <Sidebar selected="/admin/branding" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="max-w-2xl mx-auto py-12 px-4">
          <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-blue-700'}`}>Gestión de Logo</h1>
          <CurrentLogo currentLogo={currentLogo} logoHistory={logoHistory} onSelect={handleSelectLogo} onUpdateMeta={updateLogoMeta} />
          <LogoUploadForm uploading={uploading} onUpload={handleUpload} />
          <LogoHistory logoHistory={logoHistory} onSelectLogo={handleSelectLogo} onUpdateMeta={updateLogoMeta} />

          {/* Toast */}
          {toast.visible && (
            <div className="fixed bottom-6 right-6 z-50">
              <div className="rounded-lg p-3 shadow-lg max-w-xs bg-emerald-600 text-white">
                <div className="text-sm font-medium">{toast.message}</div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
