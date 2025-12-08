"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { serviceGroups } from "../lib/servicesData";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { TranslateText } from "@/components/TranslateText";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 bg-white/95 backdrop-blur-md border-gray-100 dark:bg-slate-950/95 dark:border-slate-800` + (mobileMenuOpen ? ' pointer-events-none' : '')}>
      <div className="max-w-[1400px] mx-auto flex h-[clamp(4rem,5vw,5.5rem)] items-center justify-between px-[clamp(1rem,2vw,2rem)] sm:px-[clamp(1.5rem,2.5vw,2.5rem)] 2xl:max-w-[1600px] 2xl:h-[clamp(5rem,5.5vw,6rem)] 2xl:px-12">
        <Link href="/" className="flex items-center z-40">
          <Image
            src="/image/bechapra-logo.png"
            alt="Bechapra"
            width={140}
            height={37}
            priority
            className="h-[clamp(2.25rem,3.5vw,4.5rem)] w-auto block 2xl:h-[clamp(4rem,4.5vw,5rem)]"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-[clamp(1rem,1.5vw,2rem)] 2xl:gap-[clamp(1.5rem,2vw,2.5rem)]">
          <Link href="/" className="font-medium text-[clamp(0.875rem,1vw,1rem)] relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-500"><TranslateText text="Inicio" /></Link>
          <div className="relative flex items-center h-full group">
            <Link href="/servicios" className="font-medium text-[clamp(0.875rem,1vw,1rem)] relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-500"><TranslateText text="Servicios" /></Link>
            <div className="absolute top-full left-1/2 -translate-x-1/2 translate-y-2 grid grid-cols-3 p-10 pt-10 pb-9 rounded-xl border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all z-20 w-max max-w-[90vw] gap-10 bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800">
              {serviceGroups.map(group => (
                <div key={group.slug} className="flex flex-col gap-4 min-w-[280px]">
                  <div className="flex gap-4 items-start mb-2">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 dark:bg-blue-900/40">
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
                    {group.subServices.slice(0,2).map(sub => (
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
        
        {/* Theme toggle - always visible on mobile */}
        <div className="md:hidden ml-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 animate-[slideIn_0.25s_ease-out] overflow-y-auto md:hidden bg-white dark:bg-slate-950">
          <div className="flex items-center justify-between p-4 border-b sticky top-0 z-10 border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
            <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <Image src="/image/bechapra-logo.png" alt="Bechapra" width={120} height={32} className="h-9 w-auto block" />
            </Link>
            <button className="bg-transparent border-none p-2 flex items-center justify-center rounded-md transition-colors text-slate-400 hover:bg-slate-100 hover:text-blue-600 active:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)} aria-label="Cerrar menú">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col py-4">
            <Link href="/" className="flex items-center px-6 py-4 text-base font-medium border-b transition-colors text-slate-800 border-slate-50 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-200 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}><TranslateText text="Inicio" /></Link>
            <Link href="/servicios" className="flex items-center px-6 py-4 text-base font-medium border-b transition-colors text-slate-800 border-slate-50 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-200 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}><TranslateText text="Servicios" /></Link>
            <Link href="/acerca-de" className="flex items-center px-6 py-4 text-base font-medium border-b transition-colors text-slate-800 border-slate-50 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-200 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}><TranslateText text="Acerca de" /></Link>
            <Link href="/noticias" className="flex items-center px-6 py-4 text-base font-medium border-b transition-colors text-slate-800 border-slate-50 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-200 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}><TranslateText text="Noticias" /></Link>
            <Link href="/prensa" className="flex items-center px-6 py-4 text-base font-medium border-b transition-colors text-slate-800 border-slate-50 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-200 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}><TranslateText text="Prensa" /></Link>
            <a href="https://bechapra.com.mx" target="_blank" rel="noreferrer" className="block mx-5 my-6 rounded-full bg-blue-600 px-6 py-3 text-white font-semibold text-base text-center shadow transition-all hover:bg-blue-700 hover:-translate-y-0.5 active:bg-blue-800"><TranslateText text="¿Eres colaborador?" /></a>
            <div className="mt-6 flex justify-center gap-4">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
