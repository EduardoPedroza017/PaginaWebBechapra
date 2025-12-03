
"use client";
import { Moon, Sun, LogOut, Menu, ShieldCheck, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TranslateText } from '@/components/TranslateText';
import { useLanguage } from '@/lib/LanguageContext';
import { Palette } from '../../../src/theme/palettes';

interface HeaderProps {
  onLogout: () => void;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
  palette?: Palette;
}
export function Header({ onLogout, onToggleTheme, theme, palette }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);


  const { lang, setLang } = useLanguage();

  // Usar colores de la paleta si está definida
  // Unificar azul con Sidebar y mejorar contraste
  const headerClasses = palette
    ? `${palette.background} border ${palette.border}`
    : isDark
      ? 'bg-gradient-to-r from-[#0b1b3f] via-[#1b3f9c] to-[#0b1b3f] text-white border-[#1b3f9c]'
      : 'bg-gradient-to-r from-[#1f82ff] via-[#3b8dff] to-[#1f82ff] text-white border-[#1f82ff]';

  // Modernizar botones
  const themeButtonClasses = palette
    ? `bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 shadow-md`
    : isDark
      ? 'bg-gradient-to-r from-[#1e293b] to-[#153e90] text-white hover:from-[#153e90] hover:to-[#1e293b] border border-white/20 shadow-md'
      : 'bg-gradient-to-r from-[#e3f0ff] to-[#b3d1ff] text-[#153e90] hover:from-[#b3d1ff] hover:to-[#e3f0ff] border border-[#1769e0]/20 shadow-md';

  const logoutButtonClasses = palette
    ? `bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md border border-red-400/30`
    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md border border-red-400/30';

  return (
    <header className={`sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 shadow-lg border-b backdrop-blur-md ${headerClasses}`}>
      {/* Título sin logo */}
      <div className="flex flex-col">
        <h1 className="font-semibold text-base md:text-lg text-white">
          <TranslateText text="Bechapra" />
        </h1>
        <p className="text-[10px] md:text-[11px] text-white/60 font-medium">
          <TranslateText text="Panel de Administración" />
        </p>
      </div>


      {/* Desktop Navigation + Traducción */}
      <div className="hidden md:flex items-center gap-2.5">
        <button
          onClick={onToggleTheme}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${themeButtonClasses}`}
          aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          <span className="hidden lg:inline">
            <TranslateText text={isDark ? 'Claro' : 'Oscuro'} />
          </span>
        </button>

        {/* Selector de idioma */}
        <div className="relative">
          <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 transition-all rounded-lg px-3 py-2 cursor-pointer">
            <span className="text-[11px] font-medium text-white/90"><TranslateText text="Idioma" /></span>
            <ChevronDown size={14} className="text-white/70" />
            <select
              value={lang}
              onChange={e => setLang(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Cambiar idioma"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="pt">Português</option>
              <option value="ru">Русский</option>
              <option value="zh-cn">中文</option>
              <option value="ja">日本語</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>

        <button
          onClick={onLogout}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:scale-105 active:scale-95 ${logoutButtonClasses}`}
          aria-label="Cerrar sesión"
        >
          <LogOut size={16} />
          <span className="hidden lg:inline"><TranslateText text="Salir" /></span>
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Menú"
      >
        <Menu size={22} className="text-white" />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`absolute top-full left-0 right-0 md:hidden shadow-xl border-t border-white/10 z-50 backdrop-blur-md ${
          isDark ? 'bg-[#0b1b3f]/95' : 'bg-[#1f82ff]/95'
        }`}>
          <div className="flex flex-col gap-2 p-3">
            <button
              onClick={() => {
                onToggleTheme();
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${themeButtonClasses}`}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
              <span><TranslateText text={isDark ? 'Modo Claro' : 'Modo Oscuro'} /></span>
            </button>

            <div className="relative">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3.5 py-2.5">
                <span className="text-sm font-medium text-white"><TranslateText text="Idioma" /></span>
                <ChevronDown size={15} className="text-white/70 ml-auto" />
                <select
                  value={lang}
                  onChange={e => setLang(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="it">Italiano</option>
                  <option value="pt">Português</option>
                  <option value="ru">Русский</option>
                  <option value="zh-cn">中文</option>
                  <option value="ja">日本語</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-white transition-all ${logoutButtonClasses}`}
            >
              <LogOut size={17} />
              <span><TranslateText text="Cerrar sesión" /></span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}