"use client";

import React, { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChartBase } from './EChartBase';
import { ThemeMode, getChartPalette } from './echartsTheme';

export interface AreaChartProps {
  /**
   * Data for the x-axis (labels)
   */
  categories: string[];
  /**
   * Series data
   */
  data: number[] | { name: string; data: number[] }[];
  /**
   * Chart title
   */
  title?: string;
  /**
   * Theme mode
   */
  theme?: ThemeMode;
  /**
   * Chart height
   */
  height?: number | string;
  /**
   * Whether to use smooth curves
   */
  smooth?: boolean;
  /**
   * Whether to enable zoom
   */
  enableZoom?: boolean;
  /**
   * Custom colors (overrides theme)
   */
  colors?: string[];
  /**
   * Value formatter
   */
  valueFormatter?: (value: number) => string;
  /**
   * Whether chart is loading
   */
  loading?: boolean;
  /**
   * Fill opacity (0-1)
   */
  fillOpacity?: number;
  /**
   * Stack series
   */
  stack?: boolean;
  /**
   * Gradient colors for area
   */
  gradientColors?: [string, string];
}

/**
 * Animated Area Chart with gradient fill
 */
export function AreaChart({
  categories,
  data,
  title,
  theme = 'light',
  height = 300,
  smooth = true,
  enableZoom = false,
  colors: customColors,
  valueFormatter = (v) => v.toLocaleString(),
  loading = false,
  fillOpacity = 0.4,
  stack = false,
  gradientColors,
}: AreaChartProps) {
  const palette = customColors || getChartPalette(theme);
  
  const option = useMemo(() => {
    const isMultiSeries = !Array.isArray(data[0]);
    const isDark = theme === 'dark';
    
    const baseColor = gradientColors ? gradientColors[0] : palette[0];
    
    // Create gradient for area
    const areaStyle = {
      opacity: fillOpacity,
    };

    const seriesData = isMultiSeries 
      ? (data as { name: string; data: number[] }[]).map((s, i) => ({
          name: s.name,
          type: 'line' as const,
          data: s.data,
          smooth,
          symbol: 'none',
          areaStyle,
          lineStyle: {
            width: 2,
          },
          emphasis: {
            focus: 'series' as const,
          },
        }))
      : [{
          type: 'line' as const,
          data: data as number[],
          smooth,
          symbol: 'none',
          areaStyle,
          lineStyle: {
            width: 2,
          },
        }];

    return {
      title: title ? {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: isDark ? '#f1f5f9' : '#171717',
        },
      } : undefined,
      tooltip: {
        trigger: 'axis',
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
        borderColor: isDark ? '#334155' : '#e5e7eb',
        borderWidth: 1,
        textStyle: {
          color: isDark ? '#f1f5f9' : '#171717',
        },
        padding: [12, 16],
        extraCssText: 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border-radius: 12px;',
        formatter: (params: unknown) => {
          const paramsArray = Array.isArray(params) ? params : [params];
          if (paramsArray.length === 0) return '';
          
          const axisValue = (paramsArray[0] as Record<string, string>).axisValue || '';
          let content = `<div style="font-weight: 600; margin-bottom: 8px;">${axisValue}</div>`;
          
          paramsArray.forEach((item) => {
            const p = item as Record<string, unknown>;
            const color = p.color as string || '#000';
            const value = p.value as number;
            const seriesName = p.seriesName as string || '';
            content += `<div style="display: flex; align-items: center; gap: 8px; margin: 4px 0;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${color};"></span>
              <span>${seriesName}: ${valueFormatter(value)}</span>
            </div>`;
          });
          
          return content;
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: enableZoom ? '15%' : '3%',
        top: title ? '12%' : '8%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: categories,
        axisLine: {
          lineStyle: {
            color: isDark ? '#334155' : '#e5e7eb',
          },
        },
        axisLabel: {
          color: isDark ? '#94a3b8' : '#6b7280',
          fontSize: 11,
          rotate: categories.length > 10 ? 30 : 0,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: isDark ? '#94a3b8' : '#6b7280',
          fontSize: 11,
          formatter: (value: string | number) => valueFormatter(Number(value)),
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#1e293b' : '#f1f3f5',
            type: 'dashed',
          },
        },
      },
      series: stack 
        ? (seriesData as Array<{ stack?: string }>).map(s => ({ ...s, stack: 'Total' }))
        : seriesData,
    } as EChartsOption;
  }, [categories, data, title, theme, smooth, enableZoom, palette, valueFormatter, fillOpacity, stack, gradientColors]);

  return (
    <EChartBase
      option={option}
      theme={theme}
      height={height}
      loading={loading}
      enableDataZoom={enableZoom}
    />
  );
}

export default AreaChart;

