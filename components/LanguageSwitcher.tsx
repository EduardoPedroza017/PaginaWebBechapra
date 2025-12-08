"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiGlobe } from "react-icons/fi";
import { FaFlagUsa, FaFlag } from "react-icons/fa6";
import { useLanguage } from "@/lib/LanguageContext";

const LANGUAGES = [
  { code: "es", name: "Español", icon: <FaFlag /> },
  { code: "en", name: "English", icon: <FaFlagUsa /> },
  { code: "fr", name: "Français", icon: <FaFlag /> },
  { code: "de", name: "Deutsch", icon: <FaFlag /> },
  { code: "it", name: "Italiano", icon: <FaFlag /> },
  { code: "pt", name: "Português", icon: <FaFlag /> },
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
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-transparent border rounded-md px-3 py-1 cursor-pointer font-medium text-sm min-w-[60px] transition-colors border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <FiGlobe className="text-lg mr-1" />
        {selected.icon}
        <span className="ml-1">{selected.code.toUpperCase()}</span>
      </button>
      {open && (
        <ul
          className="absolute top-[110%] left-0 bg-white border rounded-md shadow-lg min-w-[120px] z-[100] p-0 m-0 border-slate-200 dark:bg-slate-900 dark:border-slate-700"
          role="listbox"
        >
          {LANGUAGES.map((language) => (
            <li
              key={language.code}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors ${
                selected.code === language.code
                  ? 'bg-slate-100 font-semibold text-blue-600 dark:bg-slate-800 dark:text-blue-500'
                  : 'bg-white font-normal text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
              onClick={() => {
                setLang(language.code);
                setOpen(false);
              }}
              role="option"
              aria-selected={selected.code === language.code}
            >
              <span className={`text-[22px] transition-all ${
                selected.code === language.code
                  ? 'text-blue-600 dark:text-blue-500'
                  : 'text-slate-700 brightness-75 dark:text-slate-400'
              }`}>{language.icon}</span>
              <span className="text-sm">{language.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
