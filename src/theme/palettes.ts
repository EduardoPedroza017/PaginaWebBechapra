// src/theme/palettes.ts

export type PaletteName = 'azul' | 'verde' | 'morado' | 'naranja' | 'rosa' | 'cyan';
export type ThemeMode = 'light' | 'dark';

export interface Palette {
  // Colores principales
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;
  
  // Fondos
  background: string;
  backgroundGradient: string;
  card: string;
  cardHover: string;
  
  // Bordes y divisores
  border: string;
  borderLight: string;
  borderDark: string;
  
  // Texto
  text: string;
  textSecondary: string;
  textMuted: string;
  
  // Estados
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Efectos
  shadow: string;
  shadowColor: string;
  ring: string;
}

export interface ThemeConfig {
  light: Palette;
  dark: Palette;
}

export const colorPalettes: Record<PaletteName, ThemeConfig> = {
  azul: {
    light: {
      // Colores principales
      primary: '#2563eb',
      primaryDark: '#1d4ed8',
      primaryLight: '#60a5fa',
      secondary: '#3b82f6',
      secondaryDark: '#2563eb',
      secondaryLight: '#93c5fd',
      
      // Fondos
      background: '#f0f9ff',
      backgroundGradient: 'from-blue-50 via-indigo-50 to-blue-100',
      card: '#ffffff',
      cardHover: '#f8fafc',
      
      // Bordes
      border: '#bfdbfe',
      borderLight: '#dbeafe',
      borderDark: '#93c5fd',
      
      // Texto
      text: '#1e293b',
      textSecondary: '#475569',
      textMuted: '#64748b',
      
      // Estados
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      // Efectos
      shadow: 'rgba(37, 99, 235, 0.15)',
      shadowColor: 'shadow-blue-500/20',
      ring: 'ring-blue-500',
    },
    dark: {
      // Colores principales
      primary: '#3b82f6',
      primaryDark: '#1e40af',
      primaryLight: '#60a5fa',
      secondary: '#2563eb',
      secondaryDark: '#1e3a8a',
      secondaryLight: '#60a5fa',
      
      // Fondos
      background: '#0f172a',
      backgroundGradient: 'from-gray-950 via-blue-950 to-gray-950',
      card: '#1e293b',
      cardHover: '#334155',
      
      // Bordes
      border: '#334155',
      borderLight: '#475569',
      borderDark: '#1e293b',
      
      // Texto
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      
      // Estados
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      // Efectos
      shadow: 'rgba(59, 130, 246, 0.3)',
      shadowColor: 'shadow-blue-500/50',
      ring: 'ring-blue-500',
    },
  },
  
  verde: {
    light: {
      primary: '#22c55e',
      primaryDark: '#16a34a',
      primaryLight: '#4ade80',
      secondary: '#10b981',
      secondaryDark: '#059669',
      secondaryLight: '#6ee7b7',
      
      background: '#f0fdf4',
      backgroundGradient: 'from-green-50 via-emerald-50 to-green-100',
      card: '#ffffff',
      cardHover: '#f8fafc',
      
      border: '#bbf7d0',
      borderLight: '#dcfce7',
      borderDark: '#86efac',
      
      text: '#1e293b',
      textSecondary: '#475569',
      textMuted: '#64748b',
      
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      shadow: 'rgba(34, 197, 94, 0.15)',
      shadowColor: 'shadow-green-500/20',
      ring: 'ring-green-500',
    },
    dark: {
      primary: '#22c55e',
      primaryDark: '#15803d',
      primaryLight: '#4ade80',
      secondary: '#10b981',
      secondaryDark: '#047857',
      secondaryLight: '#6ee7b7',
      
      background: '#0f172a',
      backgroundGradient: 'from-gray-950 via-green-950 to-gray-950',
      card: '#1e293b',
      cardHover: '#334155',
      
      border: '#334155',
      borderLight: '#475569',
      borderDark: '#1e293b',
      
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      shadow: 'rgba(34, 197, 94, 0.3)',
      shadowColor: 'shadow-green-500/50',
      ring: 'ring-green-500',
    },
  },
  
  morado: {
    light: {
      primary: '#8b5cf6',
      primaryDark: '#7c3aed',
      primaryLight: '#a78bfa',
      secondary: '#a855f7',
      secondaryDark: '#9333ea',
      secondaryLight: '#c084fc',
      
      background: '#faf5ff',
      backgroundGradient: 'from-purple-50 via-violet-50 to-purple-100',
      card: '#ffffff',
      cardHover: '#f8fafc',
      
      border: '#d8b4fe',
      borderLight: '#e9d5ff',
      borderDark: '#c084fc',
      
      text: '#1e293b',
      textSecondary: '#475569',
      textMuted: '#64748b',
      
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      shadow: 'rgba(139, 92, 246, 0.15)',
      shadowColor: 'shadow-purple-500/20',
      ring: 'ring-purple-500',
    },
    dark: {
      primary: '#a78bfa',
      primaryDark: '#6d28d9',
      primaryLight: '#c4b5fd',
      secondary: '#8b5cf6',
      secondaryDark: '#5b21b6',
      secondaryLight: '#a78bfa',
      
      background: '#0f172a',
      backgroundGradient: 'from-gray-950 via-purple-950 to-gray-950',
      card: '#1e293b',
      cardHover: '#334155',
      
      border: '#334155',
      borderLight: '#475569',
      borderDark: '#1e293b',
      
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      shadow: 'rgba(139, 92, 246, 0.3)',
      shadowColor: 'shadow-purple-500/50',
      ring: 'ring-purple-500',
    },
  },
  
  naranja: {
    light: {
      primary: '#f97316',
      primaryDark: '#ea580c',
      primaryLight: '#fb923c',
      secondary: '#ff6b35',
      secondaryDark: '#ea580c',
      secondaryLight: '#fdba74',
      
      background: '#fff7ed',
      backgroundGradient: 'from-orange-50 via-amber-50 to-orange-100',
      card: '#ffffff',
      cardHover: '#f8fafc',
      
      border: '#fed7aa',
      borderLight: '#ffedd5',
      borderDark: '#fdba74',
      
      text: '#1e293b',
      textSecondary: '#475569',
      textMuted: '#64748b',
      
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      shadow: 'rgba(249, 115, 22, 0.15)',
      shadowColor: 'shadow-orange-500/20',
      ring: 'ring-orange-500',
    },
    dark: {
      primary: '#fb923c',
      primaryDark: '#c2410c',
      primaryLight: '#fdba74',
      secondary: '#f97316',
      secondaryDark: '#9a3412',
      secondaryLight: '#fed7aa',
      
      background: '#0f172a',
      backgroundGradient: 'from-gray-950 via-orange-950 to-gray-950',
      card: '#1e293b',
      cardHover: '#334155',
      
      border: '#334155',
      borderLight: '#475569',
      borderDark: '#1e293b',
      
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      shadow: 'rgba(249, 115, 22, 0.3)',
      shadowColor: 'shadow-orange-500/50',
      ring: 'ring-orange-500',
    },
  },
  
  rosa: {
    light: {
      primary: '#ec4899',
      primaryDark: '#db2777',
      primaryLight: '#f472b6',
      secondary: '#f43f5e',
      secondaryDark: '#e11d48',
      secondaryLight: '#fb7185',
      
      background: '#fdf2f8',
      backgroundGradient: 'from-pink-50 via-rose-50 to-pink-100',
      card: '#ffffff',
      cardHover: '#f8fafc',
      
      border: '#fbcfe8',
      borderLight: '#fce7f3',
      borderDark: '#f9a8d4',
      
      text: '#1e293b',
      textSecondary: '#475569',
      textMuted: '#64748b',
      
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      shadow: 'rgba(236, 72, 153, 0.15)',
      shadowColor: 'shadow-pink-500/20',
      ring: 'ring-pink-500',
    },
    dark: {
      primary: '#f472b6',
      primaryDark: '#be185d',
      primaryLight: '#f9a8d4',
      secondary: '#ec4899',
      secondaryDark: '#9f1239',
      secondaryLight: '#fbcfe8',
      
      background: '#0f172a',
      backgroundGradient: 'from-gray-950 via-pink-950 to-gray-950',
      card: '#1e293b',
      cardHover: '#334155',
      
      border: '#334155',
      borderLight: '#475569',
      borderDark: '#1e293b',
      
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      shadow: 'rgba(236, 72, 153, 0.3)',
      shadowColor: 'shadow-pink-500/50',
      ring: 'ring-pink-500',
    },
  },
  
  cyan: {
    light: {
      primary: '#06b6d4',
      primaryDark: '#0891b2',
      primaryLight: '#22d3ee',
      secondary: '#0ea5e9',
      secondaryDark: '#0284c7',
      secondaryLight: '#38bdf8',
      
      background: '#ecfeff',
      backgroundGradient: 'from-cyan-50 via-sky-50 to-cyan-100',
      card: '#ffffff',
      cardHover: '#f8fafc',
      
      border: '#a5f3fc',
      borderLight: '#cffafe',
      borderDark: '#67e8f9',
      
      text: '#1e293b',
      textSecondary: '#475569',
      textMuted: '#64748b',
      
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      shadow: 'rgba(6, 182, 212, 0.15)',
      shadowColor: 'shadow-cyan-500/20',
      ring: 'ring-cyan-500',
    },
    dark: {
      primary: '#22d3ee',
      primaryDark: '#0e7490',
      primaryLight: '#67e8f9',
      secondary: '#06b6d4',
      secondaryDark: '#155e75',
      secondaryLight: '#a5f3fc',
      
      background: '#0f172a',
      backgroundGradient: 'from-gray-950 via-cyan-950 to-gray-950',
      card: '#1e293b',
      cardHover: '#334155',
      
      border: '#334155',
      borderLight: '#475569',
      borderDark: '#1e293b',
      
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      shadow: 'rgba(6, 182, 212, 0.3)',
      shadowColor: 'shadow-cyan-500/50',
      ring: 'ring-cyan-500',
    },
  },
};

// Hook personalizado para usar las paletas
export function usePalette(paletteName: PaletteName, mode: ThemeMode): Palette {
  return colorPalettes[paletteName][mode];
}

// Función auxiliar para obtener clases de Tailwind según la paleta y modo
export function getPaletteClasses(paletteName: PaletteName, mode: ThemeMode) {
  const palette = colorPalettes[paletteName][mode];
  
  return {
    // Clases de fondo
    bg: mode === 'dark' ? 'bg-gray-950' : palette.background,
    bgGradient: `bg-gradient-to-br ${palette.backgroundGradient}`,
    card: mode === 'dark' ? 'bg-gray-900' : palette.card,
    cardHover: mode === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50',
    
    // Clases de texto
    text: mode === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: mode === 'dark' ? 'text-gray-300' : 'text-gray-600',
    textMuted: mode === 'dark' ? 'text-gray-400' : 'text-gray-500',
    
    // Clases de borde
    border: mode === 'dark' ? 'border-gray-700' : `border-${paletteName}-200`,
    
    // Clases de botones
    btnPrimary: mode === 'dark' 
      ? `bg-${paletteName}-600 hover:bg-${paletteName}-700 text-white`
      : `bg-${paletteName}-600 hover:bg-${paletteName}-700 text-white`,
    
    btnSecondary: mode === 'dark'
      ? 'bg-gray-700 hover:bg-gray-600 text-white'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    
    // Clases de sombra
    shadow: palette.shadowColor,
    
    // Clases de ring
    ring: palette.ring,
  };
}