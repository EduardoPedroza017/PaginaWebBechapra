"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Newspaper, Mic2, Info, UserCheck } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { TranslateText } from "@/components/TranslateText";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [logoUrl, setLogoUrl] = useState<string>("/image/logo/bausen-logo.png");
  const defaultLogo = "/image/logo/bausen-logo.png";

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setLogoUrl("/image/logo/bausen-logo.png");
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 bg-white/95 backdrop-blur-md border-gray-100 dark:bg-slate-950/95 dark:border-slate-800`}>
        <div className="max-w-[1400px] mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 2xl:max-w-[1600px] 2xl:h-20">
          <Link href="/" className="flex items-center z-40">
            <Image
              src={logoUrl}
              alt="BAUSEN"
              width={100}
              height={28}
              priority
              className="h-7 w-auto block 2xl:h-9 object-contain"
              onError={() => setLogoUrl(defaultLogo)}
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="font-medium text-sm relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-500">
              <TranslateText text="Inicio" />
            </Link>
            
            <Link href="/eventos" className="font-medium text-sm relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-500">
              <TranslateText text="Eventos" />
            </Link>
            
            <Link href="/training-center" className="font-medium text-sm relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
              <TranslateText text="Centro de Formación" />
            </Link>
            
            <Link href="/servicios" className="font-medium text-sm relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-500">
              <TranslateText text="Servicios" />
            </Link>
            
            <Link href="/noticias" className="font-medium text-sm relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
              <TranslateText text="Noticias" />
            </Link>
            <Link href="/prensa" className="font-medium text-sm relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
              <TranslateText text="Prensa" />
            </Link>
            <Link href="/acerca-de" className="font-medium text-sm relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
              <TranslateText text="Acerca de" />
            </Link>
            <a href="https://bausen.mx" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-white font-semibold text-sm shadow transition-all hover:bg-blue-700 hover:-translate-y-0.5 active:bg-blue-800 whitespace-nowrap">
              <TranslateText text="¿Eres colaborador?" />
            </a>
            <div className="flex items-center gap-2 ml-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Theme toggle - always visible on mobile */}
          <div className="md:hidden mr-2">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="flex items-center justify-center p-2 rounded-lg transition-colors z-40 md:hidden text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-60 overflow-y-auto md:hidden bg-white dark:bg-slate-950"
        >
          <div className="flex items-center justify-between p-4 border-b sticky top-0 z-10 border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
            <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <Image src={logoUrl} alt="BAUSEN" width={100} height={28} className="h-7 w-auto block" onError={() => setLogoUrl(defaultLogo)} />
            </Link>
            <button
              className="bg-slate-100 p-2 rounded-full transition-colors text-slate-500 hover:bg-slate-200 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col p-4 pb-20 space-y-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Link href="/" className="flex items-center gap-4 p-4 rounded-2xl transition-all bg-slate-50 text-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
                  <Home className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg"><TranslateText text="Inicio" /></span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <Link href="/eventos" className="flex items-center gap-4 p-4 rounded-2xl transition-all bg-slate-50 text-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
                  <Image src="/image/icon/ServiciosEspecializados_Icon_Color@2x.png" width={24} height={24} alt="" className="w-5 h-5 object-contain" />
                </div>
                <span className="font-bold text-lg"><TranslateText text="Eventos" /></span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Link href="/training-center" className="flex items-center gap-4 p-4 rounded-2xl transition-all bg-slate-50 text-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
                  <Mic2 className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg"><TranslateText text="Centro de Formación" /></span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <Link href="/servicios" className="flex items-center gap-4 p-4 rounded-2xl transition-all bg-slate-50 text-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
                  <Newspaper className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg"><TranslateText text="Servicios" /></span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Link href="/noticias" className="flex items-center gap-4 p-4 rounded-2xl transition-all bg-slate-50 text-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
                  <Newspaper className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg"><TranslateText text="Noticias" /></span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
              <Link href="/prensa" className="flex items-center gap-4 p-4 rounded-2xl transition-all bg-slate-50 text-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
                  <Mic2 className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg"><TranslateText text="Prensa" /></span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Link href="/acerca-de" className="flex items-center gap-4 p-4 rounded-2xl transition-all bg-slate-50 text-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
                  <Info className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg"><TranslateText text="Acerca de" /></span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="pt-4">
              <a href="https://bausen.com.mx" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30 active:scale-95 transition-all">
                <UserCheck className="w-5 h-5" />
                <TranslateText text="¿Eres colaborador?" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-center gap-6 pt-6">
              <ThemeToggle />
              <LanguageSwitcher />
            </motion.div>
          </nav>
        </motion.div>
      )}
    </>
  );
}