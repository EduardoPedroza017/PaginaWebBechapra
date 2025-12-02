
"use client";
import { Moon, Sun, LogOut, Menu, ShieldCheck } from 'lucide-react';
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
  const headerClasses = palette
    ? `${palette.background} border ${palette.border}`
    : isDark
      ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-gray-700'
      : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white border-blue-800';

  const themeButtonClasses = palette
    ? `bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30`
    : isDark
      ? 'bg-white/10 text-white hover:bg-white/20 border border-white/30'
      : 'bg-white/10 text-white hover:bg-white/20 border border-white/30';

  const logoutButtonClasses = palette
    ? `bg-red-500 hover:bg-red-600 shadow-lg`
    : 'bg-red-500 hover:bg-red-600 shadow-lg';

  return (
    <header className={`sticky top-0 z-50 flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 shadow-2xl border-b backdrop-blur-sm ${headerClasses}`}>
      {/* Logo y Título */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="font-bold text-xl tracking-tight hidden md:block text-white">
            <TranslateText text="Plataforma de Página Web de Bechapra" />
          </h1>
          <h1 className="font-bold text-lg tracking-tight md:hidden text-white">
            <TranslateText text="Bechapra" />
          </h1>
          <p className="text-xs hidden md:block text-blue-100">
            <TranslateText text="Panel de Administración" />
          </p>
        </div>
      </div>


      {/* Desktop Navigation + Traducción */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto md:justify-end">
        <nav className="flex items-center gap-3" role="navigation" aria-label="Navegación principal">
          <button
            onClick={onToggleTheme}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold uppercase tracking-wide transition-all duration-300 ${themeButtonClasses}`}
            aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            <span className="text-xs">
              <TranslateText text={isDark ? 'Modo Claro' : 'Modo Oscuro'} />
            </span>
          </button>

          <button
            onClick={onLogout}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold uppercase tracking-wide transition-all duration-300 text-white ${logoutButtonClasses}`}
            aria-label="Cerrar sesión"
          >
            <LogOut size={16} />
            <span className="text-xs"><TranslateText text="Cerrar sesión" /></span>
          </button>
        </nav>

        {/* Selector de idioma global */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
          <span className="font-medium text-white"><TranslateText text="Traducir:" /></span>
          <select
            value={lang}
            onChange={e => setLang(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
            <option value="it">Italiano</option>
            <option value="pt">Portugués</option>
            <option value="ru">Ruso</option>
            <option value="zh-cn">Chino</option>
            <option value="ja">Japonés</option>
            <option value="ar">Árabe</option>
          </select>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Menú"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`absolute top-full left-0 right-0 md:hidden shadow-xl border-b ${
          isDark ? 'bg-gray-900 border-gray-700' : 'bg-blue-600 border-blue-700'
        }`}>
          <div className="flex flex-col gap-2 p-4">
            <button
              onClick={() => {
                onToggleTheme();
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${themeButtonClasses}`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              <span>{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>

            <button
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-white transition-all ${logoutButtonClasses}`}
            >
              <LogOut size={18} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}