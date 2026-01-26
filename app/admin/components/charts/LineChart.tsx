"use client";

import React, { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChartBase } from './EChartBase';
import { ThemeMode, getChartPalette } from './echartsTheme';

export interface LineChartProps {
  /**
   * Data for the x-axis (labels)
   */
  categories: string[];
  /**
   * Series data - can be a single array or array of series
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
   * Whether to show data points
   */
  showSymbol?: boolean;
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
   * Area fill configuration
   */
  areaStyle?: boolean;
  /**
   * Stack series
   */
  stack?: boolean;
}

/**
 * Animated Line Chart with Bausen styling
 */
export function LineChart({
  categories,
  data,
  title,
  theme = 'light',
  height = 300,
  smooth = true,
  showSymbol = false,
  enableZoom = false,
  colors: customColors,
  valueFormatter = (v) => v.toLocaleString(),
  loading = false,
  areaStyle = false,
  stack = false,
}: LineChartProps) {
  const palette = customColors || getChartPalette(theme);
  
  const option = useMemo(() => {
    const isMultiSeries = !Array.isArray(data[0]);
    
    const seriesData = isMultiSeries 
      ? (data as { name: string; data: number[] }[]).map((s, i) => ({
          name: s.name,
          type: 'line' as const,
          data: s.data,
          smooth,
          symbol: showSymbol ? 'circle' : 'none',
          symbolSize: 6,
          emphasis: {
            focus: 'series' as const,
          },
          areaStyle: areaStyle ? {
            opacity: 0.3,
            color: palette[i % palette.length],
          } : undefined,
          lineStyle: {
            width: 3,
          },
        }))
      : [{
          type: 'line' as const,
          data: data as number[],
          smooth,
          symbol: showSymbol ? 'circle' : 'none',
          symbolSize: 6,
          areaStyle: areaStyle ? {
            opacity: 0.3,
            color: palette[0],
          } : undefined,
          lineStyle: {
            width: 3,
          },
        }];

    return {
      title: title ? {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
        },
      } : undefined,
      tooltip: {
        trigger: 'axis',
        backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
        borderColor: theme === 'dark' ? '#334155' : '#e5e7eb',
        borderWidth: 1,
        textStyle: {
          color: theme === 'dark' ? '#f1f5f9' : '#171717',
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
      legend: isMultiSeries ? {
        bottom: 0,
        textStyle: {
          color: theme === 'dark' ? '#94a3b8' : '#6b7280',
        },
      } : undefined,
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
            color: theme === 'dark' ? '#334155' : '#e5e7eb',
          },
        },
        axisLabel: {
          color: theme === 'dark' ? '#94a3b8' : '#6b7280',
          fontSize: 11,
          rotate: categories.length > 10 ? 30 : 0,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: theme === 'dark' ? '#94a3b8' : '#6b7280',
          fontSize: 11,
          formatter: (value: string | number) => valueFormatter(Number(value)),
        },
        splitLine: {
          lineStyle: {
            color: theme === 'dark' ? '#1e293b' : '#f1f3f5',
            type: 'dashed',
          },
        },
      },
      series: stack 
        ? (seriesData as Array<{ stack?: string }>).map(s => ({ ...s, stack: 'Total' }))
        : seriesData,
    } as EChartsOption;
  }, [categories, data, title, theme, smooth, showSymbol, enableZoom, palette, valueFormatter, areaStyle, stack]);

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

export default LineChart;

