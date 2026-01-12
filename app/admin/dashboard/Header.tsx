"use client";
import { 
  Moon, 
  Sun, 
  LogOut, 
  Menu,  
  ChevronDown, 
  Settings, 
  User, 
  HelpCircle, 
  Search,
  Shield,
  X
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { TranslateText } from '@/components/TranslateText';
import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onLogout: () => void;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
  role?: string;
  admin?: boolean;
  userName?: string;
  userEmail?: string;
}

export function Header({ 
  onLogout, 
  onToggleTheme, 
  theme, 
  role, 
  admin,
  userName = "Usuario",
  userEmail = "usuario@bausen.com"
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isDark = theme === 'dark';

  // Refs para manejar clicks fuera de los dropdowns
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const { lang } = useLanguage();

  // Manejar clicks fuera de los dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Theme-based classes
  const headerClasses = isDark
    ? 'bg-slate-900 border-slate-700 text-white'
    : 'bg-white border-slate-200 text-slate-900';

  const buttonBase = 'flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors';

  const themeButtonClasses = isDark
    ? 'bg-slate-800 hover:bg-slate-700 text-white'
    : 'bg-slate-100 hover:bg-slate-200 text-slate-700';

  const logoutButtonClasses = 'bg-red-500 hover:bg-red-600 text-white';

  const primaryButtonClasses = isDark
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : 'bg-blue-600 hover:bg-blue-700 text-white';

  const roleColors: Record<string, string> = {
    superadmin: 'bg-purple-600',
    admin: 'bg-blue-600',
    editor: 'bg-green-600',
    viewer: 'bg-slate-600'
  };

  const roleText = role === 'superadmin' ? 'Super Admin' : 
                   role === 'admin' ? 'Administrador' : 
                   role === 'editor' ? 'Editor' : 'Visualizador';

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <header className={`sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 border-b ${headerClasses} shadow-sm`}>
      {/* Left Section: Logo & Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          aria-label="Menú"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <TranslateText text="Panel de Administración" />
            </h1>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Sistema de Gestión BAUSEN
          </p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2">
        {/* Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className={`p-2.5 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          aria-label="Buscar"
        >
          <Search size={18} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`${buttonBase} ${themeButtonClasses}`}
          aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          <span className="hidden lg:inline text-sm">
            <TranslateText text={isDark ? 'Claro' : 'Oscuro'} />
          </span>
        </button>

        {/* Role Badge */}
        {role && (
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm ${roleColors[role]} text-white`}>
            <Shield size={14} />
            <span className="font-semibold">{roleText}</span>
          </div>
        )}

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={`${buttonBase} ${primaryButtonClasses}`}
          >
            <User size={18} />
            <div className="text-left hidden lg:block">
              <div className="text-sm font-semibold truncate max-w-[120px]">{userName}</div>
            </div>
            <ChevronDown size={14} className={userMenuOpen ? 'rotate-180 transition-transform' : ''} />
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`absolute right-0 top-12 w-56 rounded-lg shadow-lg border z-50 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
              >
                {/* User Info */}
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-600' : 'bg-blue-600'} text-white`}>
                      <User size={20} />
                    </div>
                    <div className="min-w-0">
                      <h4 className={`font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {userName}
                      </h4>
                      <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {userEmail}
                      </p>
                      {role && (
                        <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-bold ${roleColors[role]} text-white`}>
                          {roleText}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-1">
                  <Link
                    href="/admin/profile"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm ${isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>Mi Perfil</span>
                  </Link>
                  
                  {admin && (
                    <Link
                      href="/admin/settings"
                      className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm ${isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings size={16} />
                      <span>Configuración</span>
                    </Link>
                  )}

                  <Link
                    href="/admin/help"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm ${isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <HelpCircle size={16} />
                    <span>Ayuda</span>
                  </Link>
                </div>

                {/* Logout Button */}
                <div className="p-3 border-t">
                  <button
                    onClick={() => {
                      onLogout();
                      setUserMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded font-medium text-sm ${logoutButtonClasses}`}
                  >
                    <LogOut size={16} />
                    Cerrar Sesión
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-full left-0 right-0 md:hidden shadow-lg border-t z-50 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
          >
            <div className="p-4 space-y-2">
              {/* User Info Mobile */}
              <div className={`p-4 rounded-lg mb-3 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-600' : 'bg-blue-600'} text-white`}>
                    <User size={24} />
                  </div>
                  <div className="min-w-0">
                    <h4 className={`font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {userName}
                    </h4>
                    <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {userEmail}
                    </p>
                    {role && (
                      <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-bold ${roleColors[role]} text-white`}>
                        {roleText}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Menu Items */}
              <button
                onClick={() => {
                  onToggleTheme();
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium justify-start ${themeButtonClasses}`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                <span>
                  <TranslateText text={isDark ? 'Modo claro' : 'Modo oscuro'} />
                </span>
              </button>

              <Link
                href="/admin/profile"
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium justify-start ${isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={18} />
                <span>Mi Perfil</span>
              </Link>

              {admin && (
                <Link
                  href="/admin/settings"
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium justify-start ${isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings size={18} />
                  <span>Configuración</span>
                </Link>
              )}

              <Link
                href="/admin/help"
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium justify-start ${isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <HelpCircle size={18} />
                <span>Ayuda</span>
              </Link>

              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium justify-start ${logoutButtonClasses}`}
              >
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className={`w-full max-w-md mx-4 rounded-lg shadow-lg border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="relative">
                  <Search className={`absolute left-3 top-3 w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar..."
                    className={`w-full pl-10 pr-10 py-2.5 rounded text-sm border ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'}`}
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className={`absolute right-3 top-2.5 p-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}