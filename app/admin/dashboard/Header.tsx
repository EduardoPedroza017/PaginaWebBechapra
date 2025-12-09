
"use client";
import { Moon, Sun, LogOut, Menu,  ChevronDown } from 'lucide-react';
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
export function Header({ onLogout, onToggleTheme, theme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';


  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const { lang, setLang } = useLanguage();

  // Diseño moderno y limpio
  const headerClasses = isDark
    ? 'bg-slate-900/95 backdrop-blur-xl border-slate-800 text-white'
    : 'bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900';

  const buttonBase = 'flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-md';

  const themeButtonClasses = isDark
    ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
    : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200';

  const logoutButtonClasses = 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white border border-rose-400/30';

  return (
    <header className={`sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 shadow-lg border-b ${headerClasses}`}>
      {/* Título y breadcrumb */}
      <div className="flex flex-col">
        <h1 className={`font-bold text-lg md:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <TranslateText text="Bechapra" />
        </h1>
        <p className={`text-xs md:text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <TranslateText text="Panel de Administración" />
        </p>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-3">
        {/* Botón de tema */}
        <button
          onClick={onToggleTheme}
          className={`${buttonBase} ${themeButtonClasses} text-sm`}
          aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
          title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          <span className="hidden lg:inline">
            <TranslateText text={isDark ? 'Claro' : 'Oscuro'} />
          </span>
        </button>

        {/* Selector de idioma mejorado */}
        <div className="relative">
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 shadow-md ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 border border-slate-200'
          }`}>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <TranslateText text="Idioma" />
            </span>
            <ChevronDown size={16} className={isDark ? 'text-slate-400' : 'text-slate-600'} />
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

        {/* Botón de logout */}
        <button
          onClick={onLogout}
          className={`${buttonBase} ${logoutButtonClasses} text-sm`}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          <LogOut size={18} />
          <span className="hidden lg:inline">
            <TranslateText text="Salir" />
          </span>
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden p-2.5 rounded-xl transition-colors shadow-md ${
          isDark
            ? 'bg-slate-800 hover:bg-slate-700 text-white'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
        }`}
        aria-label="Menú"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Menu mejorado */}
      {mobileMenuOpen && (
        <div className={`absolute top-full left-0 right-0 md:hidden shadow-2xl border-t z-50 backdrop-blur-xl ${
          isDark
            ? 'bg-slate-900/95 border-slate-800'
            : 'bg-white/95 border-slate-200'
        }`}>
          <div className="flex flex-col gap-2 p-4">
            <button
              onClick={() => {
                onToggleTheme();
                setMobileMenuOpen(false);
              }}
              className={`${buttonBase} ${themeButtonClasses} text-sm justify-start`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              <span><TranslateText text={isDark ? 'Modo Claro' : 'Modo Oscuro'} /></span>
            </button>

            <div className="relative">
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${
                isDark
                  ? 'bg-slate-800 border border-slate-700'
                  : 'bg-slate-100 border border-slate-200'
              }`}>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <TranslateText text="Idioma" />
                </span>
                <ChevronDown size={16} className={`ml-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
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
              className={`${buttonBase} ${logoutButtonClasses} text-sm justify-start`}
            >
              <LogOut size={18} />
              <span><TranslateText text="Cerrar sesión" /></span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}