/**
 * Sistema de Diseño Unificado para el Panel de Administración
 * 
 * Este archivo contiene todas las constantes de diseño y utilidades
 * para mantener consistencia visual en todo el panel admin.
 */

// ============================================================================
// PALETA DE COLORES UNIFICADA
// ============================================================================

export const ADMIN_COLORS = {
  light: {
    background: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    cardBg: 'bg-white',
    cardBorder: 'border-gray-200',
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      tertiary: 'text-gray-400'
    },
    accent: {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600',
      orange: 'text-orange-600',
      red: 'text-red-600'
    }
  },
  dark: {
    background: 'bg-gray-950',
    cardBg: 'bg-gray-900',
    cardBorder: 'border-gray-700',
    text: {
      primary: 'text-white',
      secondary: 'text-gray-400',
      tertiary: 'text-gray-600'
    },
    accent: {
      blue: 'text-blue-400',
      purple: 'text-purple-400',
      green: 'text-green-400',
      orange: 'text-orange-400',
      red: 'text-red-400'
    }
  }
};

// ============================================================================
// ESTILOS DE COMPONENTES REUTILIZABLES
// ============================================================================

export const CARD_STYLES = {
  light: 'bg-white border-gray-200 rounded-xl shadow-lg p-6 border',
  dark: 'bg-gray-900 border-gray-700 rounded-xl shadow-lg p-6 border'
};

export const STAT_CARD_GRADIENTS = {
  blue: {
    light: 'bg-white border-blue-200',
    dark: 'bg-gradient-to-br from-blue-900/30 to-gray-900 border-blue-800/30'
  },
  purple: {
    light: 'bg-white border-purple-200',
    dark: 'bg-gradient-to-br from-purple-900/30 to-gray-900 border-purple-800/30'
  },
  green: {
    light: 'bg-white border-green-200',
    dark: 'bg-gradient-to-br from-green-900/30 to-gray-900 border-green-800/30'
  },
  orange: {
    light: 'bg-white border-orange-200',
    dark: 'bg-gradient-to-br from-orange-900/30 to-gray-900 border-orange-800/30'
  },
  red: {
    light: 'bg-white border-red-200',
    dark: 'bg-gradient-to-br from-red-900/30 to-gray-900 border-red-800/30'
  },
  gray: {
    light: 'bg-white border-gray-200',
    dark: 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
  }
};

// ============================================================================
// UTILIDADES DE TEMA
// ============================================================================

/**
 * Obtiene el tema guardado en localStorage o retorna 'light' por defecto
 */
export function getSavedTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('theme');
  return (saved === 'dark' || saved === 'light') ? saved : 'light';
}

/**
 * Guarda el tema en localStorage
 */
export function saveTheme(theme: 'light' | 'dark'): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
}

/**
 * Retorna las clases CSS apropiadas según el tema
 */
export function getThemeClasses(theme: 'light' | 'dark') {
  return {
    background: theme === 'dark' ? ADMIN_COLORS.dark.background : ADMIN_COLORS.light.background,
    card: theme === 'dark' ? CARD_STYLES.dark : CARD_STYLES.light,
    textPrimary: theme === 'dark' ? ADMIN_COLORS.dark.text.primary : ADMIN_COLORS.light.text.primary,
    textSecondary: theme === 'dark' ? ADMIN_COLORS.dark.text.secondary : ADMIN_COLORS.light.text.secondary,
    textTertiary: theme === 'dark' ? ADMIN_COLORS.dark.text.tertiary : ADMIN_COLORS.light.text.tertiary
  };
}

/**
 * Retorna las clases para tarjetas de estadísticas
 */
export function getStatCardClasses(
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'gray',
  theme: 'light' | 'dark'
): string {
  const gradient = STAT_CARD_GRADIENTS[color];
  return `rounded-xl shadow-lg p-6 border ${theme === 'dark' ? gradient.dark : gradient.light}`;
}

/**
 * Hook personalizado para manejar el tema con persistencia
 */
export function useAdminTheme() {
  // Esta función se puede usar en un custom hook de React si se necesita
  return {
    getSavedTheme,
    saveTheme,
    getThemeClasses,
    getStatCardClasses
  };
}
