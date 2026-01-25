/**
 * Responsive Design System v3.0
 * Sistema de diseño completo para el panel de administración
 * Incluye: breakpoints, grid system, spacing, typography, touch targets
 */

// ============================================================================
// BREAKPOINTS - Standard responsive design breakpoints
// ============================================================================

export const BREAKPOINTS = {
  sm: '640px',    // Mobile landscape
  md: '768px',    // Tablet portrait
  lg: '1024px',   // Tablet landscape / Small desktop
  xl: '1280px',   // Desktop
  '2xl': '1536px' // Large desktop
};

// Container max-widths per breakpoint
export const CONTAINER_MAX_WIDTH = {
  default: '100%',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// ============================================================================
// SPACING SYSTEM - 4px base scale
// ============================================================================

export const SPACING = {
  // 4px base
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
};

// Responsive spacing scale
export const SPACING_RESPONSIVE = {
  padding: {
    mobile: '1rem',      // 16px
    tablet: '1.5rem',    // 24px
    desktop: '2rem',     // 32px
  },
  gap: {
    mobile: '1rem',      // 16px
    tablet: '1.5rem',    // 24px
    desktop: '1.5rem',   // 24px
  },
  margin: {
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2rem',
  }
};

// ============================================================================
// TYPOGRAPHY SYSTEM - Responsive base sizes
// ============================================================================

export const TYPOGRAPHY = {
  mobile: {
    base: '14px',
    scale: 1.125, // Major third
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    baseSize: '0.875rem', // 14px
    lg: '1rem',       // 16px
    xl: '1.125rem',   // 18px
    '2xl': '1.25rem', // 20px
    '3xl': '1.5rem',  // 24px
    '4xl': '1.875rem', // 30px
    '5xl': '2.25rem', // 36px
  },
  desktop: {
    base: '16px',
    scale: 1.25, // Major third
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    baseSize: '1rem', // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  }
};

// ============================================================================
// TOUCH TARGETS - Minimum 44px for mobile accessibility
// ============================================================================

export const TOUCH_TARGETS = {
  minHeight: '44px',
  minWidth: '44px',
  iconButton: '44px',
  listItem: '48px',
  tableRow: '48px',
  formField: '48px',
};

// ============================================================================
// GRID SYSTEM - 12 column responsive grid
// ============================================================================

export const GRID_COLS = {
  // Responsive grid column utilities
  cols1: 'grid-cols-1',
  cols2: 'grid-cols-2',
  cols3: 'grid-cols-3',
  cols4: 'grid-cols-4',
  cols5: 'grid-cols-5',
  cols6: 'grid-cols-6',
  cols12: 'grid-cols-12',
  
  // Responsive breakpoints
  responsive: {
    // 1 column on mobile, 2 on sm, 3 on md, 4 on lg+
    auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    // 1 column on mobile, 2 on tablet, 3 on desktop
    cards: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    // 1 column on mobile, 2 on tablet, 3 on desktop, 4 on xl
    dashboard: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    // 2 columns on mobile, 3 on tablet, 4 on desktop
    stats: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    // Sidebar layouts
    withSidebar: 'grid-cols-1 lg:grid-cols-12',
    contentWithSidebar: 'lg:col-span-9 xl:col-span-10',
    sidebar: 'hidden lg:block lg:col-span-3 xl:col-span-2',
  },
  
  // Table-like responsive grids
  table: {
    mobile: 'grid-cols-1 gap-4',
    tablet: 'grid-cols-2 gap-4',
    desktop: 'grid-cols-3 lg:grid-cols-4 gap-4',
  }
};

// ============================================================================
// BORDER RADIUS CONSISTENT
// ============================================================================

export const BORDER_RADIUS = {
  none: 'rounded-none',
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
  // Responsive
  card: {
    mobile: 'rounded-xl',
    desktop: 'rounded-2xl',
  }
};

// ============================================================================
// SHADOW SYSTEM
// ============================================================================

export const SHADOWS = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  // Responsive shadows
  card: {
    light: 'shadow-lg shadow-slate-200/50',
    dark: 'shadow-lg shadow-slate-950/50',
  },
  hover: {
    light: 'hover:shadow-xl hover:-translate-y-0.5',
    dark: 'hover:shadow-2xl hover:-translate-y-0.5',
  }
};

// ============================================================================
// Z-INDEX LAYERS
// ============================================================================

export const Z_INDEX = {
  dropdown: 'z-50',
  sticky: 'z-40',
  fixed: 'z-50',
  modal: 'z-50',
  popover: 'z-50',
  tooltip: 'z-50',
  toast: 'z-50',
  drawer: 'z-40',
  overlay: 'z-30',
};

// ============================================================================
// PREVIOUS DESIGN SYSTEM (Preserved for backwards compatibility)
// ============================================================================

// Colors (from v2.0)
export const ADMIN_COLORS = {
  light: {
    background: 'bg-gradient-to-br from-white via-slate-50 to-slate-100',
    cardBg: 'bg-white shadow-xl shadow-slate-200/70',
    cardBorder: 'border-slate-200',
    text: {
      primary: 'text-slate-900',
      secondary: 'text-slate-600',
      tertiary: 'text-slate-400',
      muted: 'text-slate-500'
    },
    accent: {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-emerald-600',
      orange: 'text-orange-600',
      red: 'text-rose-600',
      yellow: 'text-amber-600'
    },
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
    background: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
    cardBg: 'bg-slate-900/90 backdrop-blur-xl',
    cardBorder: 'border-slate-700/50',
    text: {
      primary: 'text-slate-50',
      secondary: 'text-slate-300',
      tertiary: 'text-slate-500',
      muted: 'text-slate-400'
    },
    accent: {
      blue: 'text-blue-400',
      purple: 'text-purple-400',
      green: 'text-emerald-400',
      orange: 'text-orange-400',
      red: 'text-rose-400',
      yellow: 'text-amber-400'
    },
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

// Card styles (from v2.0)
export const CARD_STYLES = {
  light: 'bg-white border-slate-200 rounded-2xl shadow-xl shadow-slate-200/70 p-6 border transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300/70 hover:-translate-y-0.5',
  dark: 'bg-slate-900/90 backdrop-blur-xl border-slate-700/50 rounded-2xl shadow-xl shadow-slate-950/50 p-6 border transition-all duration-300 hover:shadow-2xl hover:shadow-slate-950/70'
};

// Stat card gradients (from v2.0)
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

// Button styles (from v2.0)
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

// Input styles (from v2.0)
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

// Table styles (from v2.0)
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
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Gets responsive container classes
 */
export function getContainerClasses(maxWidth: keyof typeof CONTAINER_MAX_WIDTH = 'xl'): string {
  return `mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-${maxWidth}`;
}

/**
 * Gets responsive padding classes
 */
export function getResponsivePadding(): string {
  return 'px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8';
}

/**
 * Gets touch-friendly button classes
 */
export function getTouchButtonClasses(baseClasses: string): string {
  return `${baseClasses} min-h-[44px] min-w-[44px]`;
}

/**
 * Gets responsive grid classes
 */
export function getResponsiveGrid(options: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  xl?: number;
} = {}): string {
  const { mobile = 1, tablet = 2, desktop = 3, xl = 4 } = options;
  
  const classes = ['grid', 'gap-4', 'md:gap-6'];
  
  if (mobile === tablet && tablet === desktop && desktop === xl) {
    classes.push(`grid-cols-${mobile}`);
  } else {
    classes.push(`grid-cols-${mobile}`);
    if (tablet !== mobile) classes.push(`sm:grid-cols-${tablet}`);
    if (desktop !== tablet) classes.push(`lg:grid-cols-${desktop}`);
    if (xl !== desktop) classes.push(`xl:grid-cols-${xl}`);
  }
  
  return classes.join(' ');
}

/**
 * Gets responsive typography classes
 */
export function getResponsiveTypography(options: {
  base?: string;
  mobile?: string;
  desktop?: string;
} = {}): string {
  const { base = 'text-sm', mobile = 'text-sm', desktop = 'text-base' } = options;
  return `${base} md:${desktop}`;
}

/**
 * Get saved theme from localStorage
 */
export function getSavedTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('theme');
  return (saved === 'dark' || saved === 'light') ? saved : 'light';
}

/**
 * Save theme to localStorage
 */
export function saveTheme(theme: 'light' | 'dark'): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
}

// ============================================================================
// THEME CLASSES HELPERS
// ============================================================================

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

export function getStatCardClasses(
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'yellow' | 'gray',
  theme: 'light' | 'dark'
): string {
  const gradient = STAT_CARD_GRADIENTS[color];
  return `rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] ${theme === 'dark' ? gradient.dark : gradient.light}`;
}

export function getButtonClasses(
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost',
  theme: 'light' | 'dark',
  size: 'sm' | 'md' | 'lg' = 'md'
): string {
  const baseStyle = BUTTON_STYLES[variant];
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg min-h-[36px]',
    md: 'px-4 py-2 text-sm rounded-xl min-h-[44px]',
    lg: 'px-6 py-3 text-base rounded-xl min-h-[52px]'
  };
  
  return `${theme === 'dark' ? baseStyle.dark : baseStyle.light} ${sizeClasses[size]} font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`;
}

export function getInputClasses(
  theme: 'light' | 'dark',
  hasError: boolean = false
): string {
  const baseStyle = INPUT_STYLES.base;
  const errorStyle = hasError ? INPUT_STYLES.error : null;
  
  const base = theme === 'dark' ? baseStyle.dark : baseStyle.light;
  const error = hasError ? (theme === 'dark' ? errorStyle?.dark : errorStyle?.light) : '';
  
  return `w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-200 outline-none min-h-[48px] ${base} ${error}`;
}

export function getTableClasses(theme: 'light' | 'dark') {
  return {
    wrapper: theme === 'dark' ? TABLE_STYLES.wrapper.dark : TABLE_STYLES.wrapper.light,
    header: theme === 'dark' ? TABLE_STYLES.header.dark : TABLE_STYLES.header.light,
    row: theme === 'dark' ? TABLE_STYLES.row.dark : TABLE_STYLES.row.light
  };
}

// ============================================================================
// PAGE COMPONENT CLASSES
// ============================================================================

export function getPageHeaderClasses(theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  return `rounded-xl md:rounded-2xl p-4 md:p-6 border transition-all duration-300 ${
    isDark
      ? 'bg-slate-900/50 to-slate-800 border-slate-700/50'
      : 'bg-white to-slate-50 border-slate-200'
  }`;
}

export function getPageTitleClasses(theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  return `text-lg md:text-xl lg:text-2xl font-bold ${
    isDark ? 'text-white' : 'text-slate-900'
  }`;
}

export function getPageSubtitleClasses(theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  return `text-xs md:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`;
}

export function getSectionClasses(theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  return `transition-all duration-300 ${
    isDark ? 'bg-slate-900/50' : 'bg-white'
  }`;
}

export function getSectionPadding(): string {
  return 'p-4 md:p-6 lg:p-8';
}

export function getTabsContainerClasses(theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  return `rounded-lg md:rounded-xl border overflow-hidden ${
    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
  }`;
}

export function getTabClasses(active: boolean, theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  if (active) {
    return `px-4 md:px-6 py-2 md:py-3 font-medium transition-colors ${
      isDark
        ? 'bg-blue-600 text-white border-b-2 border-blue-600'
        : 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
    }`;
  }
  return `px-4 md:px-6 py-2 md:py-3 font-medium transition-colors ${
    isDark
      ? 'text-slate-400 hover:text-slate-300'
      : 'text-slate-600 hover:text-slate-800'
  }`;
}

export function getTabListClass(): string {
  return 'flex flex-wrap md:flex-nowrap';
}

export function getFilterBarClasses(theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  return `flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 ${
    isDark ? 'text-slate-300' : 'text-slate-700'
  }`;
}

export function getFilterChipClasses(active: boolean, theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  if (active) {
    return 'bg-blue-600 text-white';
  }
  return isDark
    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200';
}

export function getActionButtonClasses(theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  return `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
    isDark
      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
  }`;
}

export function getRefreshButtonClasses(theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  return `p-2 md:p-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
    isDark
      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
      : 'bg-white hover:bg-slate-50 text-slate-700 shadow-sm'
  }`;
}

export function getLoadingSpinnerClasses(theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  return `inline-block animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-3 border-b-3 ${
    isDark ? 'border-blue-500' : 'border-blue-600'
  }`;
}

export function getLoadingContainerClasses(theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  return `flex min-h-screen items-center justify-center ${
    isDark ? 'bg-slate-950' : 'bg-slate-50'
  }`;
}

export function getErrorContainerClasses(theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  return `text-center p-6 md:p-8 max-w-md ${
    isDark ? 'text-slate-400' : 'text-slate-600'
  }`;
}

// ============================================================================
// BADGE UTILITIES
// ============================================================================

export function getBadgeClasses(variant: 'default' | 'success' | 'warning' | 'error' | 'info', theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark';
  const variants = {
    default: isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    error: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  };
  return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`;
}

// ============================================================================
// HOOK CUSTOMIZADO
// ============================================================================

export function useResponsiveDesign() {
  return {
    BREAKPOINTS,
    CONTAINER_MAX_WIDTH,
    SPACING,
    SPACING_RESPONSIVE,
    TYPOGRAPHY,
    TOUCH_TARGETS,
    GRID_COLS,
    BORDER_RADIUS,
    SHADOWS,
    Z_INDEX,
    getContainerClasses,
    getResponsivePadding,
    getTouchButtonClasses,
    getResponsiveGrid,
    getResponsiveTypography,
    getSavedTheme,
    saveTheme,
    getThemeClasses,
    getStatCardClasses,
    getButtonClasses,
    getInputClasses,
    getTableClasses,
    getPageHeaderClasses,
    getSectionClasses,
    getSectionPadding,
    getTabsContainerClasses,
    getTabClasses,
    getTabListClass,
    getFilterBarClasses,
    getFilterChipClasses,
    getActionButtonClasses,
    getRefreshButtonClasses,
    getLoadingSpinnerClasses,
    getLoadingContainerClasses,
    getErrorContainerClasses,
    getBadgeClasses,
  };
}

