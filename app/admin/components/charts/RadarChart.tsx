"use client";

import React, { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChartBase } from './EChartBase';
import { ThemeMode, getChartPalette } from './echartsTheme';

export interface RadarChartProps {
  /**
   * Radar indicators (dimensions)
   */
  indicators: { name: string; max: number }[];
  /**
   * Series data - array of series with values
   */
  data: { name: string; values: number[] }[];
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
   * Custom colors (overrides theme)
   */
  colors?: string[];
  /**
   * Whether chart is loading
   */
  loading?: boolean;
  /**
   * Shape of radar (polygon or circle)
   */
  shape?: 'polygon' | 'circle';
  /**
   * Split number of radar grid
   */
  splitNumber?: number;
  /**
   * Fill opacity (0-1)
   */
  fillOpacity?: number;
  /**
   * Show area fill
   */
  areaStyle?: boolean;
}

interface RadarIndicator {
  name: string;
  max: number;
}

/**
 * Animated Radar Chart for multi-dimensional comparisons
 */
export function RadarChart({
  indicators,
  data,
  title,
  theme = 'light',
  height = 350,
  colors: customColors,
  loading = false,
  shape = 'polygon',
  splitNumber = 5,
  fillOpacity = 0.2,
  areaStyle = true,
}: RadarChartProps) {
  const palette = customColors || getChartPalette(theme);
  const isDark = theme === 'dark';
  
  const option = useMemo(() => {
    const radarIndicators: RadarIndicator[] = indicators.map(ind => ({
      name: ind.name,
      max: ind.max,
    }));

    const seriesData = data.map((series, index) => ({
      name: series.name,
      type: 'radar' as const,
      data: series.values.map((value, i) => ({
        value,
        name: indicators[i]?.name || '',
      })),
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        width: 2,
        color: palette[index % palette.length],
      },
      areaStyle: areaStyle ? {
        color: palette[index % palette.length],
        opacity: fillOpacity,
      } : undefined,
      itemStyle: {
        color: palette[index % palette.length],
      },
      emphasis: {
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          opacity: fillOpacity + 0.2,
        },
      },
    }));

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
      legend: {
        data: data.map(d => d.name),
        bottom: 0,
        left: 'center',
        textStyle: {
          color: isDark ? '#94a3b8' : '#6b7280',
          fontSize: 11,
        },
        itemWidth: 12,
        itemHeight: 12,
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
        borderColor: isDark ? '#334155' : '#e5e7eb',
        borderWidth: 1,
        textStyle: {
          color: isDark ? '#f1f5f9' : '#171717',
        },
        padding: [12, 16],
        extraCssText: 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border-radius: 12px;',
        formatter: (params: unknown) => {
          const p = params as { seriesName: string; value: number[] };
          let content = `<div style="font-weight: 600; margin-bottom: 8px;">${p.seriesName}</div>`;
          
          p.value.forEach((value, index) => {
            const indicator = indicators[index];
            if (indicator) {
              const percent = ((value / indicator.max) * 100).toFixed(1);
              content += `<div style="display: flex; justify-content: space-between; gap: 16px; margin: 4px 0;">
                <span>${indicator.name}:</span>
                <span style="font-weight: 600;">${value} (${percent}%)</span>
              </div>`;
            }
          });
          
          return content;
        },
      },
      radar: {
        indicator: radarIndicators,
        shape: shape,
        splitNumber: splitNumber,
        center: ['50%', '50%'],
        radius: '65%',
        axisName: {
          color: isDark ? '#94a3b8' : '#6b7280',
          fontSize: 12,
          padding: [3, 5],
        },
        splitLine: {
          lineStyle: {
            color: isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(229, 231, 235, 0.5)',
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: isDark 
              ? ['rgba(15, 23, 42, 0.5)', 'rgba(30, 41, 59, 0.3)', 'rgba(15, 23, 42, 0.5)']
              : ['rgba(241, 243, 245, 0.5)', 'rgba(255, 255, 255, 0.5)', 'rgba(241, 243, 245, 0.5)'],
          },
        },
        axisLine: {
          lineStyle: {
            color: isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(229, 231, 235, 0.5)',
          },
        },
      },
      series: seriesData,
    } as EChartsOption;
  }, [indicators, data, title, theme, palette, shape, splitNumber, fillOpacity, areaStyle, isDark]);

  return (
    <EChartBase
      option={option}
      theme={theme}
      height={height}
      loading={loading}
    />
  );
}

export default RadarChart;

