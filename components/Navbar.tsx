"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Home, Newspaper, Mic2, Info, UserCheck } from "lucide-react";
import { serviceGroups } from "../lib/servicesData";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { TranslateText } from "@/components/TranslateText";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(true);
  const [logoUrl, setLogoUrl] = useState<string>("/image/bechapra-logo.png");
  const defaultLogo = "/image/bechapra-logo.png";

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    async function fetchLogo() {
      try {
        const res = await fetch("http://localhost:5000/api/logo");
        const data = await res.json();
        if (data.url) {
          setLogoUrl(data.url);
        }
      } catch (e) {
        setLogoUrl("/image/bechapra-logo.png");
      }
    }
    fetchLogo();
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 bg-white/95 backdrop-blur-md border-gray-100 dark:bg-slate-950/95 dark:border-slate-800`}>
        <div className="max-w-[1400px] mx-auto flex h-[clamp(4rem,5vw,5.5rem)] items-center justify-between px-[clamp(1rem,2vw,2rem)] sm:px-[clamp(1.5rem,2.5vw,2.5rem)] 2xl:max-w-[1600px] 2xl:h-[clamp(5rem,5.5vw,6rem)] 2xl:px-12">
          <Link href="/" className="flex items-center z-40">
            <Image
              src={logoUrl}
              alt="Bechapra"
              width={140}
              height={37}
              priority
              className="h-[clamp(2.25rem,3.5vw,4.5rem)] w-auto block 2xl:h-[clamp(4rem,4.5vw,5rem)]"
              onError={() => setLogoUrl(defaultLogo)}
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-[clamp(1rem,1.5vw,2rem)] 2xl:gap-[clamp(1.5rem,2vw,2.5rem)]">
            <Link href="/" className="font-medium text-[clamp(0.875rem,1vw,1rem)] relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-500"><TranslateText text="Inicio" /></Link>
            <div className="relative flex items-center h-full group">
              <Link href="/servicios" className="font-medium text-[clamp(0.875rem,1vw,1rem)] relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-500"><TranslateText text="Servicios" /></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 translate-y-2 grid grid-cols-1 lg:grid-cols-3 p-6 lg:p-10 pt-6 lg:pt-10 pb-5 lg:pb-9 rounded-xl border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all z-20 w-max max-w-[95vw] lg:max-w-[90vw] gap-6 lg:gap-10 bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                {serviceGroups.map(group => (
                  <div key={group.slug} className="flex flex-col gap-3 lg:gap-4 min-w-[200px] lg:min-w-[280px]">
                    <div className="flex gap-4 items-start mb-2">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0 bg-blue-50 dark:bg-blue-900/40">
                        <Image
                          src={group.icon}
                          alt=""
                          width={32}
                          height={32}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <div>
                        <Link href={group.slug} className="text-base font-bold block mb-1 transition-colors hover:text-blue-600 text-slate-800 dark:text-slate-100">{group.name}</Link>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 border-t pt-4 border-slate-100 dark:border-slate-800">
                      {group.subServices.slice(0, 2).map(sub => (
                        <Link key={sub.slug} href={sub.slug} className="block px-3 py-2 text-[0.94rem] rounded-md font-medium transition-all hover:translate-x-1 text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-500 dark:hover:bg-slate-800">{sub.name}</Link>
                      ))}
                      <Link href={group.slug} className="block px-3 py-2 font-semibold text-[0.94rem] rounded-md transition-all hover:translate-x-1 text-blue-700 hover:bg-blue-50 dark:text-blue-500 dark:hover:bg-slate-800"><TranslateText text="Ver todos" /></Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/noticias" className="font-medium text-[clamp(0.875rem,1vw,1rem)] relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"><TranslateText text="Noticias" /></Link>
            <Link href="/prensa" className="font-medium text-[clamp(0.875rem,1vw,1rem)] relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"><TranslateText text="Prensa" /></Link>
            <Link href="/acerca-de" className="font-medium text-[clamp(0.875rem,1vw,1rem)] relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"><TranslateText text="Acerca de" /></Link>
            <a href="https://bechapra.com.mx" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-white font-semibold text-[clamp(0.875rem,1vw,1rem)] shadow transition-all hover:bg-blue-700 hover:-translate-y-0.5 active:bg-blue-800 whitespace-nowrap"><TranslateText text="¿Eres colaborador?" /></a>
            <div className="flex items-center gap-3 ml-4">
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
              <Image src={logoUrl} alt="Bechapra" width={120} height={32} className="h-9 w-auto block" onError={() => setLogoUrl(defaultLogo)} />
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
            {/* Inicio */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href="/"
                className="flex items-center gap-4 p-4 rounded-2xl transition-all bg-slate-50 text-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
                  <Home className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg"><TranslateText text="Inicio" /></span>
              </Link>
            </motion.div>

            {/* Servicios Accordion */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900"
            >
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between p-4 text-slate-900 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
                    <Image
                      src="/image/icon/ServiciosEspecializados_Icon_Color@2x.png"
                      width={24}
                      height={24}
                      alt=""
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="font-bold text-lg"><TranslateText text="Servicios" /></span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${servicesOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-4">
                      {serviceGroups.map((group) => (
                        <div key={group.slug} className="bg-white rounded-xl p-4 shadow-sm dark:bg-slate-800">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center dark:bg-blue-900/30">
                              <Image src={group.icon} alt="" width={20} height={20} className="w-5 h-5 object-contain" />
                            </div>
                            <Link
                              href={group.slug}
                              onClick={() => setMobileMenuOpen(false)}
                              className="font-bold text-slate-900 dark:text-white"
                            >
                              {group.name}
                            </Link>
                          </div>
                          <div className="pl-11 space-y-2 border-l-2 border-slate-100 dark:border-slate-700">
                            {group.subServices.map(sub => (
                              <Link
                                key={sub.slug}
                                href={sub.slug}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block pl-4 py-1 text-sm font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all dark:text-slate-400 dark:hover:text-blue-400"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Noticias */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/noticias"
                className="flex items-center gap-4 p-4 rounded-2xl transition-all bg-slate-50 text-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
                  <Newspaper className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg"><TranslateText text="Noticias" /></span>
              </Link>
            </motion.div>

            {/* Prensa */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Link
                href="/prensa"
                className="flex items-center gap-4 p-4 rounded-2xl transition-all bg-slate-50 text-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
                  <Mic2 className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg"><TranslateText text="Prensa" /></span>
              </Link>
            </motion.div>

            {/* Acerca de */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/acerca-de"
                className="flex items-center gap-4 p-4 rounded-2xl transition-all bg-slate-50 text-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
                  <Info className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg"><TranslateText text="Acerca de" /></span>
              </Link>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="pt-4"
            >
              <a
                href="https://bechapra.com.mx"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
              >
                <UserCheck className="w-5 h-5" />
                <TranslateText text="¿Eres colaborador?" />
              </a>
            </motion.div>

            {/* Toggles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-6 pt-6"
            >
              <ThemeToggle />
              <LanguageSwitcher />
            </motion.div>
          </nav>
        </motion.div>
      )}

    </>
  );
}
