"use client";

import React, { useRef, useMemo, useCallback } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption, ECharts } from 'echarts';
import * as echarts from 'echarts';
import { ThemeMode, getEChartsTheme, ANIMATION_CONFIG } from './echartsTheme';

export interface EChartBaseProps {
  /**
   * ECharts option configuration
   */
  option: EChartsOption;
  /**
   * Theme mode - light or dark
   */
  theme?: ThemeMode;
  /**
   * Whether to use lazy loading (SSR compatible)
   */
  lazy?: boolean;
  /**
   * Height of the chart container
   */
  height?: string | number;
  /**
   * Width of the chart container
   */
  width?: string | number;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Whether the chart is in loading state
   */
  loading?: boolean;
  /**
   * Custom loading text
   */
  loadingText?: string;
  /**
   * Whether to enable data zoom
   */
  enableDataZoom?: boolean;
  /**
   * Custom animation configuration
   */
  animationConfig?: Partial<typeof ANIMATION_CONFIG.default>;
  /**
   * Callback when chart is ready
   */
  onChartReady?: (chart: ECharts) => void;
  /**
   * Custom style for the container
   */
  style?: React.CSSProperties;
}

interface DataZoomAxis {
  type: 'inside' | 'slider';
  start: number;
  end: number;
  zoomOnMouseWheel?: boolean;
  bottom?: number;
  height?: number;
  borderColor?: string;
  backgroundColor?: string;
  fillerColor?: string;
  handleStyle?: {
    color: string;
  };
  textStyle?: {
    color: string;
  };
}

/**
 * Base ECharts component with Bausen theme integration
 * 
 * Provides:
 * - Automatic theme switching (light/dark)
 * - Smooth animations
 * - Responsive resize
 * - Lazy loading support (SSR compatible)
 */
export function EChartBase({
  option,
  theme = 'light',
  lazy = false,
  height = 300,
  width = '100%',
  className,
  loading = false,
  loadingText = 'Cargando...',
  enableDataZoom = false,
  animationConfig: customAnimationConfig,
  onChartReady,
  style,
}: EChartBaseProps) {
  const chartRef = useRef<ReactECharts>(null);

  // Get base theme configuration
  const baseTheme = useMemo(() => getEChartsTheme(theme), [theme]);
  
  // Merge animation configuration
  const animationConfig = useMemo(() => {
    const defaults = ANIMATION_CONFIG.default;
    if (customAnimationConfig) {
      return {
        animation: true,
        ...defaults,
        ...customAnimationConfig,
      };
    }
    return {
      animation: true,
      ...defaults,
    };
  }, [customAnimationConfig]);

  // Build complete option with theme and animations
  const mergedOption = useMemo(() => {
    // Use type assertion to avoid strict type checking on theme
    const opts = {
      ...option,
      ...baseTheme,
      ...animationConfig,
    } as EChartsOption;

    // Add dataZoom if enabled
    if (enableDataZoom) {
      const dataZoom: DataZoomAxis[] = [
        {
          type: 'inside',
          start: 0,
          end: 100,
          zoomOnMouseWheel: true,
        },
        {
          type: 'slider',
          start: 0,
          end: 100,
          bottom: 10,
          height: 20,
          borderColor: 'transparent',
          backgroundColor: theme === 'dark' ? '#1e293b' : '#f1f3f5',
          fillerColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(0, 87, 217, 0.1)',
          handleStyle: {
            color: theme === 'dark' ? '#3b82f6' : '#0057D9',
          },
          textStyle: {
            color: theme === 'dark' ? '#94a3b8' : '#6b7280',
          },
        },
      ];
      (opts as Record<string, unknown>).dataZoom = dataZoom;
    }

    return opts;
  }, [option, baseTheme, animationConfig, enableDataZoom, theme]);

  // Handle chart ready callback
  const handleChartReady = useCallback((chart: ECharts) => {
    onChartReady?.(chart);
  }, [onChartReady]);

  // Loading configuration
  const loadingOption = useMemo(() => ({
    text: loadingText,
    color: theme === 'dark' ? '#3b82f6' : '#0057D9',
    textColor: theme === 'dark' ? '#f1f5f9' : '#171717',
    maskColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    zlevel: 1000,
  }), [loadingText, theme]);

  return (
    <div
      className={className}
      style={{
        height,
        width,
        position: 'relative',
        ...style,
      }}
    >
      <ReactECharts
        ref={chartRef}
        echarts={echarts}
        option={mergedOption}
        lazyUpdate={lazy}
        showLoading={loading}
        loadingOption={loadingOption}
        onChartReady={handleChartReady}
        style={{
          height: '100%',
          width: '100%',
        }}
        notMerge={false}
        theme={theme}
      />
    </div>
  );
}

// Re-export echarts for advanced configurations
export { echarts };

export default EChartBase;

