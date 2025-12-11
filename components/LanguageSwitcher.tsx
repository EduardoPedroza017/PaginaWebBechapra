"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Globe } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { code: "es", name: "Español", flag: "/flags/mx.svg", country: "México" },
  { code: "en", name: "English", flag: "/flags/gb.svg", country: "UK" },
  { code: "fr", name: "Français", flag: "/flags/fr.svg", country: "France" },
  { code: "de", name: "Deutsch", flag: "/flags/de.svg", country: "Deutschland" },
  { code: "it", name: "Italiano", flag: "/flags/it.svg", country: "Italia" },
  { code: "pt", name: "Português", flag: "/flags/pt.svg", country: "Portugal" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  const selected = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-1.5 sm:gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 cursor-pointer font-medium text-xs sm:text-sm shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
          <Image
            src={selected.flag}
            alt={selected.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-slate-700 dark:text-slate-200 font-semibold">{selected.code.toUpperCase()}</span>
        <ChevronDown
          size={16}
          className={`text-slate-500 dark:text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-[calc(100%+8px)] md:bottom-auto md:top-[calc(100%+8px)] right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl min-w-[180px] sm:min-w-[200px] max-w-[calc(100vw-2rem)] z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Globe size={14} />
                <span className="text-xs font-medium uppercase tracking-wider">Idioma / Language</span>
              </div>
            </div>

            {/* Language List */}
            <ul className="py-2" role="listbox">
              {LANGUAGES.map((language, index) => (
                <motion.li
                  key={language.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-150 ${selected.code === language.code
                    ? 'bg-blue-50 dark:bg-blue-900/30'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  onClick={() => {
                    setLang(language.code);
                    setOpen(false);
                  }}
                  role="option"
                  aria-selected={selected.code === language.code}
                >
                  {/* Flag */}
                  <div className={`relative w-8 h-8 rounded-lg overflow-hidden border-2 shadow-sm transition-all ${selected.code === language.code
                    ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-800'
                    : 'border-slate-200 dark:border-slate-600'
                    }`}>
                    <Image
                      src={language.flag}
                      alt={language.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${selected.code === language.code
                      ? 'text-blue-700 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-200'
                      }`}>
                      {language.name}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {language.country}
                    </p>
                  </div>

                  {/* Check Mark */}
                  {selected.code === language.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <Check size={12} className="text-white" />
                    </motion.div>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
