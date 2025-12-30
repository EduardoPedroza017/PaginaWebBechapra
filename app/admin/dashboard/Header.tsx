"use client";
import { 
  Moon, 
  Sun, 
  LogOut, 
  Menu,  
  ChevronDown, 
  Settings, 
  User, 
  Globe, 
  Bell, 
  HelpCircle, 
  Search,
  Shield,
  X,
  Check
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { TranslateText } from '@/components/TranslateText';
import { useLanguage } from '@/lib/LanguageContext';
import { Palette } from '../../../src/theme/palettes';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onLogout: () => void;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
  palette?: Palette;
  role?: string;
  admin?: boolean;
  userName?: string;
  userEmail?: string;
  accentColor?: string; // Added to resolve the missing property error
}

export function Header({ 
  onLogout, 
  onToggleTheme, 
  theme, 
  role, 
  admin,
  userName = "Administrador",
  userEmail = "admin@bechapra.com"
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  // Refs para manejar clicks fuera de los dropdowns
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const languageSelectorRef = useRef<HTMLDivElement>(null);

  // Notifications mock data
  const [notifications] = useState([
    { id: 1, title: "Nuevo postulante", message: "Juan Pérez se postuló a Becario Frontend", time: "5 min", read: false },
    { id: 2, title: "Programa por finalizar", message: "Becario Backend finaliza en 3 días", time: "2 horas", read: false },
    { id: 3, title: "Sistema actualizado", message: "Versión 2.1.0 desplegada exitosamente", time: "1 día", read: true },
    { id: 4, title: "Nueva funcionalidad", message: "Exportación de datos disponible", time: "2 días", read: true },
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const { lang, setLang } = useLanguage();

  // Manejar clicks fuera de los dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      const target = event.target as HTMLElement | null;
      if (languageSelectorRef.current && target && !languageSelectorRef.current.contains(target)) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Theme-based classes
  const headerClasses = isDark
    ? 'bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95 backdrop-blur-xl border-slate-800/80 text-white shadow-2xl shadow-slate-900/50'
    : 'bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-xl border-slate-200/80 text-slate-900 shadow-2xl shadow-slate-200/30';

  const buttonBase = 'flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95';

  const themeButtonClasses = isDark
    ? 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white border border-slate-700 shadow-lg shadow-slate-900/30'
    : 'bg-gradient-to-r from-slate-100 to-white hover:from-slate-200 hover:to-slate-100 text-slate-900 border border-slate-300 shadow-lg shadow-slate-200/30';

  const logoutButtonClasses = 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white shadow-lg shadow-rose-600/30';

  const primaryButtonClasses = isDark
    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/30'
    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30';

  const roleColors: Record<string, string> = {
    superadmin: 'bg-gradient-to-r from-purple-600 to-pink-600',
    admin: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    editor: 'bg-gradient-to-r from-emerald-600 to-green-600',
    viewer: 'bg-gradient-to-r from-slate-600 to-gray-600'
  };

  const roleText = role === 'superadmin' ? 'Super Admin' : 
                   role === 'admin' ? 'Administrador' : 
                   role === 'editor' ? 'Editor' : 'Visualizador';

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 }
  };

  // Opciones de idioma
  const languageOptions = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'zh-cn', name: '中文', flag: '🇨🇳' },
  ];

  const currentLanguage = languageOptions.find(l => l.code === lang) || languageOptions[0];

  const handleLanguageSelect = (languageCode: string) => {
    setLang(languageCode);
    setLanguageMenuOpen(false); // Close the dropdown
  };

  return (
    <header className={`sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 border-b ${headerClasses}`}>
      {/* Left Section: Logo & Title */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2.5 rounded-xl transition-colors shadow-lg ${
            isDark
              ? 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white'
              : 'bg-gradient-to-r from-slate-100 to-white hover:from-slate-200 hover:to-slate-100 text-slate-900'
          }`}
          aria-label="Menú"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className={`font-bold text-lg md:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <TranslateText text="Bechapra" />
            </h1>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
            }`}>
              PRO
            </span>
          </div>
          <p className={`text-xs md:text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <TranslateText text="Panel de Administración" />
          </p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-3">
        {/* Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className={`p-2.5 rounded-xl transition-colors ${
            isDark
              ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
              : 'bg-slate-100/80 hover:bg-slate-200 text-slate-600'
          }`}
          aria-label="Buscar"
        >
          <Search size={18} />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={`p-2.5 rounded-xl transition-colors relative ${
              isDark
                ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                : 'bg-slate-100/80 hover:bg-slate-200 text-slate-600'
            }`}
            aria-label="Notificaciones"
          >
            <Bell size={18} />
            {unreadNotifications > 0 && (
              <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                isDark 
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white' 
                  : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
              }`}>
                {unreadNotifications}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`absolute right-0 top-12 w-80 rounded-xl shadow-2xl border z-50 ${
                  isDark
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700'
                    : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
                }`}
              >
                <div className="p-4 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Notificaciones
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {unreadNotifications} nuevas
                    </span>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b cursor-pointer transition-colors ${
                        isDark 
                          ? 'border-slate-700/50 hover:bg-slate-800/50' 
                          : 'border-slate-200 hover:bg-slate-100'
                      } ${!notification.read ? (isDark ? 'bg-slate-800/30' : 'bg-blue-50/50') : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {notification.title}
                          </h4>
                          <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <span className={`w-2 h-2 rounded-full ${
                            isDark ? 'bg-blue-400' : 'bg-blue-500'
                          }`} />
                        )}
                      </div>
                      <div className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        {notification.time}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-slate-700/50">
                  <button className={`w-full text-center py-2 rounded-lg text-sm font-medium ${
                    isDark 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-700'
                  }`}>
                    Ver todas las notificaciones
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Language Selector - Siempre visible */}
        {/* <div className="relative" ref={languageSelectorRef}>
          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl ${
            isDark
              ? 'bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 shadow-lg shadow-slate-900/30'
              : 'bg-gradient-to-r from-slate-100 to-white border border-slate-300 shadow-lg shadow-slate-200/30'
          }`}>
            <Globe size={16} className={isDark ? 'text-slate-300' : 'text-slate-600'} />
            <span className="flex items-center gap-2 text-sm">
              <span className="text-lg">{currentLanguage.flag}</span>
              <span className={isDark ? 'text-white' : 'text-slate-900'}>
                {currentLanguage.code.toUpperCase()}
              </span>
            </span>
          </div>
          
          {/* Dropdown de idiomas - Siempre visible */}
          {/* <div className={`absolute top-12 right-0 w-56 rounded-xl shadow-2xl border z-40 ${
            isDark
              ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700'
              : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
          }`}>
            <div className="p-2">
              <div className="px-3 py-2 mb-2">
                <h4 className={`text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Seleccionar idioma
                </h4>
              </div>
              {languageOptions.map((language) => (
                <button
                  key={language.code}
                  onClick={() => setLang(language.code)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isDark
                      ? 'hover:bg-slate-800 text-slate-300'
                      : 'hover:bg-slate-100 text-slate-700'
                  } ${lang === language.code ? (isDark ? 'bg-slate-800' : 'bg-slate-100') : ''}`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="flex-1 text-left">{language.name}</span>
                  {lang === language.code && (
                    <Check size={14} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                  )}
                </button>
              ))}
            </div>
            <div className={`p-3 border-t ${
              isDark ? 'border-slate-700' : 'border-slate-200'
            }`}>
              <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                El sistema se traducirá automáticamente
              </div>
            </div>
          </div>
        </div> */}

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`${buttonBase} ${themeButtonClasses}`}
          aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
          title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          <span className="hidden lg:inline text-sm">
            <TranslateText text={isDark ? 'Claro' : 'Oscuro'} />
          </span>
        </button>

        {/* Role Badge */}
        {role && (
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm ${
            roleColors[role] || 'bg-gradient-to-r from-slate-600 to-gray-600'
          } text-white shadow-lg`}>
            <Shield size={14} />
            <span className="font-bold">{roleText}</span>
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
              <div className="text-xs opacity-90 truncate max-w-[120px]">{userEmail}</div>
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
                className={`absolute right-0 top-12 w-64 rounded-xl shadow-2xl border z-50 ${
                  isDark
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700'
                    : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
                }`}
              >
                {/* User Info */}
                <div className="p-4 border-b border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isDark 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    }`}>
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
                        <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-bold ${
                          roleColors[role] || 'bg-gradient-to-r from-slate-600 to-gray-600'
                        } text-white`}>
                          {roleText}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <Link
                    href="/admin/profile"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isDark
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>Mi Perfil</span>
                  </Link>
                  
                  {admin && (
                    <Link
                      href="/admin/settings"
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        isDark
                          ? 'hover:bg-slate-800 text-slate-300'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings size={16} />
                      <span>Configuración</span>
                    </Link>
                  )}

                  <Link
                    href="/admin/help"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isDark
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <HelpCircle size={16} />
                    <span>Ayuda & Soporte</span>
                  </Link>
                </div>

                {/* Logout Button */}
                <div className="p-3 border-t border-slate-700/50">
                  <button
                    onClick={() => {
                      onLogout();
                      setUserMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${logoutButtonClasses}`}
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
            className={`absolute top-full left-0 right-0 md:hidden shadow-2xl border-t z-50 backdrop-blur-xl ${
              isDark
                ? 'bg-gradient-to-b from-slate-900/95 to-slate-950 border-slate-800'
                : 'bg-gradient-to-b from-white/95 to-slate-50 border-slate-200'
            }`}
          >
            <div className="p-4 space-y-2">
              {/* User Info Mobile */}
              <div className={`p-4 rounded-xl mb-4 ${
                isDark 
                  ? 'bg-gradient-to-r from-slate-800 to-slate-900' 
                  : 'bg-gradient-to-r from-slate-100 to-white'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDark 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  }`}>
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
                      <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-bold ${
                        roleColors[role] || 'bg-gradient-to-r from-slate-600 to-gray-600'
                      } text-white`}>
                        {roleText}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Language Selector */}
              {/* <div className={`p-3 rounded-xl mb-3 ${
                isDark
                  ? 'bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700'
                  : 'bg-gradient-to-r from-slate-100 to-white border border-slate-300'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Idioma
                  </span>
                  <Globe size={16} className={isDark ? 'text-slate-400' : 'text-slate-500'} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {languageOptions.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLang(language.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                        isDark
                          ? 'hover:bg-slate-800 text-slate-300'
                          : 'hover:bg-slate-100 text-slate-700'
                      } ${lang === language.code ? (isDark ? 'bg-slate-800' : 'bg-slate-100') : ''}`}
                    >
                      <span className="text-2xl mb-1">{language.flag}</span>
                      <span className="text-xs">{language.code.toUpperCase()}</span>
                      {lang === language.code && (
                        <Check size={12} className={`mt-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Mobile Menu Items */}
              <button
                onClick={() => {
                  onToggleTheme();
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium justify-start ${themeButtonClasses}`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                <span>
                  <TranslateText text={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} />
                </span>
              </button>

              <Link
                href="/admin/profile"
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium justify-start ${
                  isDark
                    ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                    : 'bg-slate-100/80 hover:bg-slate-200 text-slate-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={18} />
                <span>Mi Perfil</span>
              </Link>

              {admin && (
                <Link
                  href="/admin/settings"
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium justify-start ${
                    isDark
                      ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                      : 'bg-slate-100/80 hover:bg-slate-200 text-slate-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings size={18} />
                  <span>Configuración</span>
                </Link>
              )}

              <Link
                href="/admin/help"
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium justify-start ${
                  isDark
                    ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                    : 'bg-slate-100/80 hover:bg-slate-200 text-slate-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <HelpCircle size={18} />
                <span>Ayuda & Soporte</span>
              </Link>

              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium justify-start ${logoutButtonClasses}`}
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.95 }}
              className={`w-full max-w-2xl mx-4 rounded-2xl shadow-2xl border ${
                isDark
                  ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700'
                  : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="relative">
                  <Search className={`absolute left-4 top-3.5 w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar en el panel de administración..."
                    className={`w-full pl-12 pr-4 py-3 rounded-xl text-lg border transition-all ${
                      isDark
                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className={`absolute right-4 top-3.5 p-1 rounded-lg ${
                      isDark 
                        ? 'hover:bg-slate-700 text-slate-400' 
                        : 'hover:bg-slate-200 text-slate-600'
                    }`}
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