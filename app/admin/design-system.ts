/**
 * Sistema de Diseño Unificado para el Panel de Administración v2.0
 * 
 * UI/UX completamente renovado con enfoque moderno y profesional
 */

// ============================================================================
// PALETA DE COLORES MODERNA Y PROFESIONAL
// ============================================================================

export const ADMIN_COLORS = {
  light: {
    // Backgrounds más limpios y profesionales
    background: 'bg-gradient-to-br from-white via-slate-50 to-slate-100',
    cardBg: 'bg-white shadow-xl shadow-slate-200/70',
    cardBorder: 'border-slate-200',
    // Textos con mejor contraste
    text: {
      primary: 'text-slate-900',
      secondary: 'text-slate-600',
      tertiary: 'text-slate-400',
      muted: 'text-slate-500'
    },
    // Acentos más vibrantes y modernos
    accent: {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-emerald-600',
      orange: 'text-orange-600',
      red: 'text-rose-600',
      yellow: 'text-amber-600'
    },
    // Backgrounds para acentos
    accentBg: {
      blue: 'bg-blue-50',
      purple: 'bg-purple-50',
      green: 'bg-emerald-50',
      orange: 'bg-orange-50',
      red: 'bg-rose-50',
      yellow: 'bg-amber-50'
    }
  },
  dark: {
    // Dark mode más suave y elegante
    background: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
    cardBg: 'bg-slate-900/90 backdrop-blur-xl',
    cardBorder: 'border-slate-700/50',
    // Textos optimizados para dark mode
    text: {
      primary: 'text-slate-50',
      secondary: 'text-slate-300',
      tertiary: 'text-slate-500',
      muted: 'text-slate-400'
    },
    // Acentos más brillantes en dark mode
    accent: {
      blue: 'text-blue-400',
      purple: 'text-purple-400',
      green: 'text-emerald-400',
      orange: 'text-orange-400',
      red: 'text-rose-400',
      yellow: 'text-amber-400'
    },
    // Backgrounds sutiles para dark mode
    accentBg: {
      blue: 'bg-blue-950/40',
      purple: 'bg-purple-950/40',
      green: 'bg-emerald-950/40',
      orange: 'bg-orange-950/40',
      red: 'bg-rose-950/40',
      yellow: 'bg-amber-950/40'
    }
  }
};

// ============================================================================
// ESTILOS DE COMPONENTES MODERNOS Y REUTILIZABLES
// ============================================================================

export const CARD_STYLES = {
  light: 'bg-white border-slate-200 rounded-2xl shadow-xl shadow-slate-200/70 p-6 border transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300/70 hover:-translate-y-0.5',
  dark: 'bg-slate-900/90 backdrop-blur-xl border-slate-700/50 rounded-2xl shadow-xl shadow-slate-950/50 p-6 border transition-all duration-300 hover:shadow-2xl hover:shadow-slate-950/70'
};

export const STAT_CARD_GRADIENTS = {
  blue: {
    light: 'bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30 border-blue-200/60 shadow-lg shadow-blue-100/50',
    dark: 'bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900 border-blue-900/40 shadow-lg shadow-blue-950/30'
  },
  purple: {
    light: 'bg-gradient-to-br from-white via-purple-50/50 to-purple-100/30 border-purple-200/60 shadow-lg shadow-purple-100/50',
    dark: 'bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 border-purple-900/40 shadow-lg shadow-purple-950/30'
  },
  green: {
    light: 'bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/30 border-emerald-200/60 shadow-lg shadow-emerald-100/50',
    dark: 'bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 border-emerald-900/40 shadow-lg shadow-emerald-950/30'
  },
  orange: {
    light: 'bg-gradient-to-br from-white via-orange-50/50 to-orange-100/30 border-orange-200/60 shadow-lg shadow-orange-100/50',
    dark: 'bg-gradient-to-br from-slate-900 via-orange-950/30 to-slate-900 border-orange-900/40 shadow-lg shadow-orange-950/30'
  },
  red: {
    light: 'bg-gradient-to-br from-white via-rose-50/50 to-rose-100/30 border-rose-200/60 shadow-lg shadow-rose-100/50',
    dark: 'bg-gradient-to-br from-slate-900 via-rose-950/30 to-slate-900 border-rose-900/40 shadow-lg shadow-rose-950/30'
  },
  yellow: {
    light: 'bg-gradient-to-br from-white via-amber-50/50 to-amber-100/30 border-amber-200/60 shadow-lg shadow-amber-100/50',
    dark: 'bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900 border-amber-900/40 shadow-lg shadow-amber-950/30'
  },
  gray: {
    light: 'bg-gradient-to-br from-white via-slate-50/50 to-slate-100/30 border-slate-200/60 shadow-lg shadow-slate-100/50',
    dark: 'bg-gradient-to-br from-slate-900 via-slate-800/30 to-slate-900 border-slate-700/40 shadow-lg shadow-slate-950/30'
  }
};

// ============================================================================
// BOTONES CON ESTADOS MODERNOS
// ============================================================================

export const BUTTON_STYLES = {
  primary: {
    light: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-600/40 border border-blue-700/50',
    dark: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-600/30 border border-blue-600/50'
  },
  secondary: {
    light: 'bg-white hover:bg-slate-50 text-slate-700 shadow-md hover:shadow-lg border border-slate-200',
    dark: 'bg-slate-800 hover:bg-slate-700 text-slate-100 shadow-md hover:shadow-lg border border-slate-700'
  },
  success: {
    light: 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-600/40 border border-emerald-700/50',
    dark: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-600/30 border border-emerald-600/50'
  },
  danger: {
    light: 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-600/40 border border-rose-700/50',
    dark: 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg shadow-rose-500/20 hover:shadow-xl hover:shadow-rose-600/30 border border-rose-600/50'
  },
  ghost: {
    light: 'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-transparent hover:border-slate-200',
    dark: 'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-slate-100 border border-transparent hover:border-slate-700'
  }
};

// ============================================================================
// INPUTS Y FORMULARIOS
// ============================================================================

export const INPUT_STYLES = {
  base: {
    light: 'bg-white border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400',
    dark: 'bg-slate-900 border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-slate-100 placeholder-slate-500'
  },
  error: {
    light: 'border-rose-500 focus:border-rose-600 focus:ring-rose-500/10',
    dark: 'border-rose-500 focus:border-rose-400 focus:ring-rose-500/20'
  }
};

// ============================================================================
// TABLAS MODERNAS
// ============================================================================

export const TABLE_STYLES = {
  wrapper: {
    light: 'bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/70 overflow-hidden',
    dark: 'bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden'
  },
  header: {
    light: 'bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200',
    dark: 'bg-gradient-to-r from-slate-800 to-slate-800/50 border-b border-slate-700'
  },
  row: {
    light: 'border-b border-slate-100 hover:bg-slate-50/50 transition-colors',
    dark: 'border-b border-slate-800 hover:bg-slate-800/50 transition-colors'
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
    textTertiary: theme === 'dark' ? ADMIN_COLORS.dark.text.tertiary : ADMIN_COLORS.light.text.tertiary,
    textMuted: theme === 'dark' ? ADMIN_COLORS.dark.text.muted : ADMIN_COLORS.light.text.muted
  };
}

/**
 * Retorna las clases para tarjetas de estadísticas con mejor UX
 */
export function getStatCardClasses(
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'yellow' | 'gray',
  theme: 'light' | 'dark'
): string {
  const gradient = STAT_CARD_GRADIENTS[color];
  return `rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] ${theme === 'dark' ? gradient.dark : gradient.light}`;
}

/**
 * Retorna las clases para botones según tipo y tema
 */
export function getButtonClasses(
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost',
  theme: 'light' | 'dark',
  size: 'sm' | 'md' | 'lg' = 'md'
): string {
  const baseStyle = BUTTON_STYLES[variant];
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl'
  };
  
  return `${theme === 'dark' ? baseStyle.dark : baseStyle.light} ${sizeClasses[size]} font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`;
}

/**
 * Retorna las clases para inputs según estado y tema
 */
export function getInputClasses(
  theme: 'light' | 'dark',
  hasError: boolean = false
): string {
  const baseStyle = INPUT_STYLES.base;
  const errorStyle = hasError ? INPUT_STYLES.error : null;
  
  const base = theme === 'dark' ? baseStyle.dark : baseStyle.light;
  const error = hasError ? (theme === 'dark' ? errorStyle?.dark : errorStyle?.light) : '';
  
  return `w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-200 outline-none ${base} ${error}`;
}

/**
 * Retorna las clases para tablas según el tema
 */
export function getTableClasses(theme: 'light' | 'dark') {
  return {
    wrapper: theme === 'dark' ? TABLE_STYLES.wrapper.dark : TABLE_STYLES.wrapper.light,
    header: theme === 'dark' ? TABLE_STYLES.header.dark : TABLE_STYLES.header.light,
    row: theme === 'dark' ? TABLE_STYLES.row.dark : TABLE_STYLES.row.light
  };
}

/**
 * Hook personalizado para manejar el tema con persistencia
 */
export function useAdminTheme() {
  return {
    getSavedTheme,
    saveTheme,
    getThemeClasses,
    getStatCardClasses,
    getButtonClasses,
    getInputClasses,
    getTableClasses,
    ADMIN_COLORS,
    CARD_STYLES,
    BUTTON_STYLES
  };
}
