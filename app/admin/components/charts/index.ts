/**
 * ECharts Charts - Bausen Admin Dashboard
 * 
 * Modern, animated, and professional charts powered by Apache ECharts.
 * 
 * Features:
 * - Automatic dark/light mode theming
 * - Smooth animations with elastic easing
 * - Responsive design
 * - Bausen brand color palette
 * - TypeScript support
 * 
 * @example
 * import { LineChart, BarChart, PieChart } from '@/app/admin/components/charts';
 */

// Base and Core
export { default as EChartBase, type EChartBaseProps } from './EChartBase';

// Main Chart Components
export { default as LineChart, type LineChartProps } from './LineChart';
export { default as BarChart, type BarChartProps } from './BarChart';
export { default as AreaChart, type AreaChartProps } from './AreaChart';
export { default as PieChart, type PieChartProps } from './PieChart';
export { default as RadarChart, type RadarChartProps } from './RadarChart';
export { default as GaugeChart, type GaugeChartProps } from './GaugeChart';

// Dashboard Integration
export { default as DashboardECharts } from './DashboardECharts';

// Theme exports
export { 
  lightTheme, 
  darkTheme, 
  getEChartsTheme, 
  getChartPalette, 
  getGradientArea,
  ANIMATION_CONFIG,
  CHART_PALETTE,
  type ThemeMode 
} from './echartsTheme';

// Re-export echarts for advanced configurations
export { echarts } from './EChartBase';

