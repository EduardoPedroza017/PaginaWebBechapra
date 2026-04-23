"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Newspaper, Mic2, Info, UserCheck, Menu, X, ArrowRight } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { TranslateText } from "@/components/TranslateText";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>("/web/image/logo/bausen-logo.png");
  const defaultLogo = "/web/image/logo/bausen-logo.png";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-white dark:bg-slate-950/80 backdrop-blur-xl shadow-xl shadow-blue-900/5 border-b border-slate-200/50 dark:border-slate-800/50"
            : "py-5 bg-white dark:bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px] mx-auto flex items-center justify-between px-6 lg:px-8">
          <Link href="/" className="relative z-50 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="transition-transform duration-300"
            >
              <Image
                src={logoUrl}
                alt="BAUSEN"
                width={120}
                height={32}
                priority
                className={`h-8 w-auto transition-all duration-500 ${scrolled ? "scale-90" : "scale-100"}`}
                onError={() => setLogoUrl(defaultLogo)}
              />
            </motion.div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1 lg:gap-2">
            {[
              { name: "Inicio", href: "/" },
              { name: "Eventos", href: "/eventos" },
              { name: "Centro de Formación", href: "/training-center" },
              { name: "Servicios", href: "/servicios" },
              { name: "Noticias", href: "/noticias" },
              { name: "Prensa", href: "/prensa" },
              { name: "Acerca de", href: "/acerca-de" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300 relative group"
              >
                <TranslateText text={link.name} />
                <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-4" />

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              
              <motion.a 
                href="https://bausen.mx" 
                target="_blank" 
                rel="noreferrer" 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-700 hover:bg-blue-600 text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-2xl shadow-lg shadow-blue-700/20 transition-all"
              >
                <TranslateText text="Colaboradores" />
              </motion.a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              className={`p-3 rounded-2xl transition-all duration-300 ${
                mobileMenuOpen 
                  ? "bg-blue-700 text-white" 
                  : "bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-white dark:bg-slate-950 pt-24 px-6"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            
            <nav className="flex flex-col gap-3">
              {[
                { name: "Inicio", icon: <Home size={20} />, href: "/" },
                { name: "Eventos", icon: <ArrowRight size={20} />, href: "/eventos" },
                { name: "Centro de Formación", icon: <Mic2 size={20} />, href: "/training-center" },
                { name: "Servicios", icon: <Newspaper size={20} />, href: "/servicios" },
                { name: "Noticias", icon: <Newspaper size={20} />, href: "/noticias" },
                { name: "Prensa", icon: <Mic2 size={20} />, href: "/prensa" },
                { name: "Acerca de", icon: <Info size={20} />, href: "/acerca-de" },
              ].map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                      {link.icon}
                    </div>
                    <span className="font-black text-lg tracking-tight"><TranslateText text={link.name} /></span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-6"
              >
                <a 
                  href="https://bausen.mx" 
                  className="flex items-center justify-center gap-3 w-full p-6 rounded-[2rem] bg-blue-700 text-white font-black text-lg shadow-2xl shadow-blue-700/30 active:scale-95 transition-all"
                >
                  <UserCheck size={24} />
                  <TranslateText text="Acceso Colaboradores" />
                </a>
              </motion.div>

              <div className="flex justify-center gap-6 pt-10">
                <LanguageSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}