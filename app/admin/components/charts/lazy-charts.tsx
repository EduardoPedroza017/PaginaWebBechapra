"use client";

/**
 * Lazy Loading Configuration for ECharts Components
 * 
 * This module provides dynamic imports for ECharts components
 * to improve initial page load performance.
 * 
 * Usage:
 * import { LazyPressChart } from '@/app/admin/components/charts/lazy-charts';
 * 
 * <LazyPressChart data={data} theme={theme} />
 */

import dynamic from 'next/dynamic';

// ============================================================================
// Base Chart Components - Lazy Loaded
// ============================================================================

export const LazyBarChart = dynamic(
  () => import('./BarChart').then(mod => mod.BarChart),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={300} />
  }
);

export const LazyLineChart = dynamic(
  () => import('./LineChart').then(mod => mod.LineChart),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={300} />
  }
);

export const LazyAreaChart = dynamic(
  () => import('./AreaChart').then(mod => mod.AreaChart),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={300} />
  }
);

export const LazyPieChart = dynamic(
  () => import('./PieChart').then(mod => mod.PieChart),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={300} />
  }
);

export const LazyRadarChart = dynamic(
  () => import('./RadarChart').then(mod => mod.RadarChart),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={350} />
  }
);

export const LazyGaugeChart = dynamic(
  () => import('./GaugeChart').then(mod => mod.GaugeChart),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={250} />
  }
);

export const LazyEChartBase = dynamic(
  () => import('./EChartBase').then(mod => mod.EChartBase),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={300} />
  }
);

// ============================================================================
// Dashboard Components - Lazy Loaded
// ============================================================================

export const LazyDashboardECharts = dynamic(
  () => import('./DashboardECharts').then(mod => mod.DashboardECharts),
  {
    ssr: false,
    loading: () => <DashboardLoadingSkeleton />
  }
);

// ============================================================================
// Admin Page Chart Components - Lazy Loaded
// ============================================================================

// Press Charts
export const LazyPressChart = dynamic(
  () => import('../../press/PressChart').then(mod => mod.PressChart),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={280} />
  }
);

// News Charts  
export const LazyNewsChart = dynamic(
  () => import('../../news/NewsChart').then(mod => mod.NewsChart),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={320} />
  }
);

// Cookie Charts
export const LazyCookieCharts = dynamic(
  () => import('../../cookie/CookieCharts').then(mod => mod.CookieCharts),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={400} />
  }
);

// Audit Log Charts
export const LazyAuditLogCharts = dynamic(
  () => import('../../audit-log/AuditLogCharts').then(mod => mod.AuditLogCharts),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={500} />
  }
);

// DB Metrics Section
export const LazyDbMetricsSection = dynamic(
  () => import('../../audit-log/DbMetricsSection').then(mod => mod.DbMetricsSection),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={400} />
  }
);

// Config DB Charts
export const LazyDBCharts = dynamic(
  () => import('../../config/components/DBCharts').then(mod => mod.DBCharts),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={500} />
  }
);

// Contact Charts
export const LazyContactChart = dynamic(
  () => import('../../conctform/ContactChart').then(mod => mod.ContactChart),
  {
    ssr: false,
    loading: () => <ChartLoadingSkeleton height={350} />
  }
);

// ============================================================================
// Loading Skeleton Components
// ============================================================================

interface ChartLoadingSkeletonProps {
  height?: number | string;
  width?: string;
}

export function ChartLoadingSkeleton({ height = 300, width = '100%' }: ChartLoadingSkeletonProps) {
  return (
    <div 
      className="rounded-xl animate-pulse bg-gray-200 dark:bg-gray-800"
      style={{ height, width }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Cargando grafica...</span>
        </div>
      </div>
    </div>
  );
}

export function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-2xl animate-pulse bg-gray-200 dark:bg-gray-800 h-64" />
        ))}
      </div>
      <div className="rounded-2xl animate-pulse bg-gray-200 dark:bg-gray-800 h-80" />
    </div>
  );
}

// ============================================================================
// Re-export all charts for convenience
// ============================================================================

export {
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  RadarChart,
  GaugeChart,
  EChartBase,
  DashboardECharts,
} from './index';

// Re-export types
export type { BarChartProps } from './BarChart';
export type { LineChartProps } from './LineChart';
export type { AreaChartProps } from './AreaChart';
export type { PieChartProps } from './PieChart';
export type { RadarChartProps } from './RadarChart';
export type { GaugeChartProps } from './GaugeChart';
export type { EChartBaseProps } from './EChartBase';

export default {
  BarChart: LazyBarChart,
  LineChart: LazyLineChart,
  AreaChart: LazyAreaChart,
  PieChart: LazyPieChart,
  RadarChart: LazyRadarChart,
  GaugeChart: LazyGaugeChart,
  DashboardECharts: LazyDashboardECharts,
};

