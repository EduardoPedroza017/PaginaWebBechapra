/**
 * ECharts Theme Configuration for Bausen Admin Dashboard
 * 
 * Provides light and dark themes with Bausen brand colors.
 * Optimized for professional dashboards with smooth animations.
 */

export type ThemeMode = 'light' | 'dark';

// Bausen brand palette - matching globals.css
const BAUSEN_PALETTE = {
  // Brand primary blues
  blue: { light: '#0057D9', dark: '#3b82f6' },
  blueLight: { light: '#5A8ADB', dark: '#60a5fa' },
  cyan: { light: '#0099CC', dark: '#22d3ee' },
  
  // Brand secondary
  purple: { light: '#6B21A8', dark: '#a78bfa' },
  
  // Semantic colors
  green: { light: '#059669', dark: '#34d399' },
  amber: { light: '#d97706', dark: '#fbbf24' },
  red: { light: '#dc2626', dark: '#f87171' },
  
  // Neutrals
  gray: { light: '#6b7280', dark: '#9ca3af' },
  slate: { light: '#475569', dark: '#94a3b8' },
};

// Full color array for charts - uses brand colors first
export const CHART_PALETTE: Record<ThemeMode, string[]> = {
  light: [
    '#0057D9', // Blue (brand primary)
    '#059669', // Green
    '#6B21A8', // Purple
    '#d97706', // Amber
    '#0099CC', // Cyan
    '#dc2626', // Red
    '#0891b2', // Teal
    '#7c3aed', // Violet
  ],
  dark: [
    '#3b82f6', // Blue (brand primary)
    '#34d399', // Green
    '#a78bfa', // Purple
    '#fbbf24', // Amber
    '#22d3ee', // Cyan
    '#f87171', // Red
    '#2dd4bf', // Teal
    '#818cf8', // Violet
  ],
};

// Light theme configuration
export const lightTheme = {
  color: CHART_PALETTE.light,
  backgroundColor: '#ffffff',
  textStyle: {
    color: '#171717',
  },
  title: {
    textStyle: {
      color: '#171717',
      fontWeight: 600,
    },
    subtextStyle: {
      color: '#6b7280',
    },
  },
  legend: {
    textStyle: {
      color: '#6b7280',
    },
    right: 10,
    top: 'center',
  },
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    textStyle: {
      color: '#171717',
      fontSize: 13,
    },
    padding: [12, 16],
    extraCssText: 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border-radius: 12px;',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '15%',
    containLabel: true,
  },
  xAxis: {
    axisLine: {
      lineStyle: {
        color: '#e5e7eb',
        width: 1,
      },
    },
    axisTick: {
      lineStyle: {
        color: '#e5e7eb',
      },
    },
    axisLabel: {
      color: '#6b7280',
      fontSize: 12,
      margin: 12,
    },
    splitLine: {
      lineStyle: {
        color: '#f1f3f5',
        type: 'dashed',
      },
    },
  },
  yAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#e5e7eb',
        width: 1,
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#6b7280',
      fontSize: 12,
    },
    splitLine: {
      lineStyle: {
        color: '#f1f3f5',
        type: 'dashed',
      },
    },
  },
  dataZoom: {
    backgroundColor: '#f1f3f5',
    fillerColor: 'rgba(0, 87, 217, 0.1)',
    handleStyle: {
      color: '#0057D9',
    },
    textStyle: {
      color: '#6b7280',
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: '#6b7280',
    },
  },
  brush: {
    borderColor: '#0057D9',
  },
  timeline: {
    axisLine: {
      lineStyle: {
        color: '#e5e7eb',
      },
    },
    axisLabel: {
      color: '#6b7280',
    },
    controlStyle: {
      color: '#0057D9',
      borderColor: '#0057D9',
    },
  },
  graph: {
    color: CHART_PALETTE.light,
  },
};

// Dark theme configuration
export const darkTheme = {
  color: CHART_PALETTE.dark,
  backgroundColor: '#0f172a',
  textStyle: {
    color: '#f1f5f9',
  },
  title: {
    textStyle: {
      color: '#f1f5f9',
      fontWeight: 600,
    },
    subtextStyle: {
      color: '#94a3b8',
    },
  },
  legend: {
    textStyle: {
      color: '#94a3b8',
    },
    right: 10,
    top: 'center',
  },
  tooltip: {
    backgroundColor: 'rgba(15, 23, 42, 0.98)',
    borderColor: '#334155',
    borderWidth: 1,
    textStyle: {
      color: '#f1f5f9',
      fontSize: 13,
    },
    padding: [12, 16],
    extraCssText: 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3); border-radius: 12px;',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '15%',
    containLabel: true,
  },
  xAxis: {
    axisLine: {
      lineStyle: {
        color: '#334155',
        width: 1,
      },
    },
    axisTick: {
      lineStyle: {
        color: '#334155',
      },
    },
    axisLabel: {
      color: '#94a3b8',
      fontSize: 12,
      margin: 12,
    },
    splitLine: {
      lineStyle: {
        color: '#1e293b',
        type: 'dashed',
      },
    },
  },
  yAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#334155',
        width: 1,
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#94a3b8',
      fontSize: 12,
    },
    splitLine: {
      lineStyle: {
        color: '#1e293b',
        type: 'dashed',
      },
    },
  },
  dataZoom: {
    backgroundColor: '#1e293b',
    fillerColor: 'rgba(59, 130, 246, 0.15)',
    handleStyle: {
      color: '#3b82f6',
    },
    textStyle: {
      color: '#94a3b8',
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: '#94a3b8',
    },
  },
  brush: {
    borderColor: '#3b82f6',
  },
  timeline: {
    axisLine: {
      lineStyle: {
        color: '#334155',
      },
    },
    axisLabel: {
      color: '#94a3b8',
    },
    controlStyle: {
      color: '#3b82f6',
      borderColor: '#3b82f6',
    },
  },
  graph: {
    color: CHART_PALETTE.dark,
  },
};

/**
 * Get theme configuration based on mode
 */
export function getEChartsTheme(mode: ThemeMode) {
  return mode === 'dark' ? darkTheme : lightTheme;
}

/**
 * Get color palette based on theme mode
 */
export function getChartPalette(mode: ThemeMode): string[] {
  return CHART_PALETTE[mode];
}

/**
 * Get gradient definition for area charts
 */
export function getGradientArea(
  mode: ThemeMode,
  colorIndex: number = 0
): [string, string] {
  const colors = CHART_PALETTE[mode];
  const color = colors[colorIndex % colors.length];
  
  if (mode === 'dark') {
    return [
      color,
      'rgba(0, 0, 0, 0)',
    ];
  }
  return [
    color,
    'rgba(255, 255, 255, 0)',
  ];
}

/**
 * Common animation configurations
 */
export const ANIMATION_CONFIG = {
  default: {
    animationDuration: 1200,
    animationDurationUpdate: 500,
    animationEasing: 'elasticOut',
    animationEasingUpdate: 'quinticOut',
  },
  smooth: {
    animationDuration: 1500,
    animationDurationUpdate: 800,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
  },
  fast: {
    animationDuration: 600,
    animationDurationUpdate: 300,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
  },
  none: {
    animationDuration: 0,
    animationDurationUpdate: 0,
  },
};

export default {
  lightTheme,
  darkTheme,
  getEChartsTheme,
  getChartPalette,
  getGradientArea,
  ANIMATION_CONFIG,
};

