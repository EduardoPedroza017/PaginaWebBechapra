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
  X,
  Bell,
  Home,
  BarChart3,
  MessageSquare,
  Zap,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Globe,
  CreditCard,
  Users,
  FileText,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { TranslateText } from '@/components/TranslateText';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/admin/ui/ThemeToggle';

interface HeaderProps {
  onLogout: () => void;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
  role?: string;
  admin?: boolean;
  userName?: string;
  userEmail?: string;
  notifications?: Array<{
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
  }>;
}

export function Header({ 
  onLogout, 
  onToggleTheme, 
  theme, 
  role, 
  admin,
  userName = "Usuario",
  userEmail = "usuario@bausen.com",
  notifications = []
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const isDark = theme === 'dark';
  const pathname = usePathname();

  // Refs para manejar clicks fuera de los dropdowns
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const { lang } = useLanguage();

  // Manejar clicks fuera de los dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target as Node)) {
        setNotificationMenuOpen(false);
      }
      if (quickActionsRef.current && !quickActionsRef.current.contains(event.target as Node)) {
        setQuickActionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Theme-based classes
  const headerClasses = isDark
    ? 'bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700/50 text-white'
    : 'bg-gradient-to-r from-white to-gray-50 border-gray-200 text-gray-900 shadow-sm';

  const buttonBase = 'flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]';

  const themeButtonClasses = isDark
    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white shadow-md'
    : 'bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 shadow-sm border border-gray-200';

  const primaryButtonClasses = isDark
    ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg'
    : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg';

  const logoutButtonClasses = 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg';

  const roleColors: Record<string, { bg: string, text: string }> = {
    superadmin: { bg: 'bg-gradient-to-r from-purple-600 to-purple-500', text: 'text-white' },
    admin: { bg: 'bg-gradient-to-r from-blue-600 to-blue-500', text: 'text-white' },
    editor: { bg: 'bg-gradient-to-r from-emerald-600 to-emerald-500', text: 'text-white' },
    viewer: { bg: 'bg-gradient-to-r from-gray-600 to-gray-500', text: 'text-white' }
  };

  const roleText = role === 'superadmin' ? 'Super Admin' : 
                   role === 'admin' ? 'Administrador' : 
                   role === 'editor' ? 'Editor' : 'Visualizador';

  const notificationColors = {
    info: 'text-blue-500',
    success: 'text-emerald-500',
    warning: 'text-amber-500',
    error: 'text-red-500'
  };

  const notificationBgColors = {
    info: 'bg-blue-500/10',
    success: 'bg-emerald-500/10',
    warning: 'bg-amber-500/10',
    error: 'bg-red-500/10'
  };

  // Quick actions
  const quickActions = [
    { icon: <BarChart3 size={18} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <FileText size={18} />, label: 'Nuevo Reporte', path: '/admin/reports/new' },
    { icon: <Users size={18} />, label: 'Agregar Usuario', path: '/admin/usuarios/new' },
    { icon: <Upload size={18} />, label: 'Importar Datos', path: '/admin/import' },
    { icon: <Download size={18} />, label: 'Exportar Datos', path: '/admin/export' },
    { icon: <RefreshCw size={18} />, label: 'Sincronizar', action: () => console.log('Sync') },
  ];

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, height: 0 },
    visible: { opacity: 1, y: 0, height: 'auto' },
    exit: { opacity: 0, y: -20, height: 0 }
  };

  const markAllAsRead = () => {
    // Implementar lógica para marcar todas como leídas
  };

  return (
    <>
      <header className={`sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 border-b backdrop-blur-sm ${headerClasses}`}>
        {/* Left Section: Logo & Breadcrumb */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-all ${isDark ? 'hover:bg-gray-800 active:scale-95' : 'hover:bg-gray-100 active:scale-95'}`}
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <h1 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Panel de Admnistracion | Bausen 
                </h1>
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {pathname.split('/').pop() || 'Dashboard'}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Center (minimal) */}
        <div className="hidden lg:flex items-center gap-4 flex-1 justify-center">
          {/* Intentionally minimal: removed placeholder stats to keep header unified with sidebar */}
        </div>

        {/* Desktop Navigation - Right */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle (centralized) */}
          <div className="hidden lg:flex">
            <ThemeToggle className={`${buttonBase} ${themeButtonClasses}`} />
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              onLogout();
              setUserMenuOpen(false);
            }}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm ${logoutButtonClasses} hover:shadow-lg transition-all`}
          >
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Mobile Menu Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50"
            >
              {/* Add your mobile menu content here */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}