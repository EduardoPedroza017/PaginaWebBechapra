"use client";

import React, { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChartBase } from './EChartBase';
import { ThemeMode, getChartPalette } from './echartsTheme';

export interface PieChartProps {
  /**
   * Data for the pie chart - array of { name, value }
   */
  data: { name: string; value: number }[];
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
   * Whether to use donut style (ring in center)
   */
  donut?: boolean;
  /**
   * Inner radius for donut (0-1)
   */
  innerRadius?: number;
  /**
   * Radius for pie chart (0-1 or string)
   */
  radius?: number | string;
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
   * Show percentage in labels
   */
  showPercentage?: boolean;
  /**
   * Center text (for donut)
   */
  centerText?: string;
  /**
   * Center value
   */
  centerValue?: string | number;
  /**
   * Rose type (optional for rose chart effect)
   */
  roseType?: 'radius' | 'area';
  /**
   * Minimum angle for small slices
   */
  minAngle?: number;
}

/**
 * Animated Pie/Donut Chart with Bausen styling
 */
export function PieChart({
  data,
  title,
  theme = 'light',
  height = 300,
  donut = true,
  innerRadius = 0.6,
  radius = 0.75,
  colors: customColors,
  valueFormatter = (v) => v.toLocaleString(),
  loading = false,
  showPercentage = true,
  centerText,
  centerValue,
  roseType,
  minAngle = 5,
}: PieChartProps) {
  const palette = customColors || getChartPalette(theme);
  
  // Calculate total for percentages
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const option = useMemo(() => {
    const centerX = '50%';
    const centerY = '50%';
    
    // Create rich text for center if needed
    const centerLabel = centerText || centerValue !== undefined 
      ? {
          show: true,
          top: 'center',
          left: 'center',
          text: centerValue !== undefined 
            ? `${centerText || ''}\n${centerValue}`
            : centerText,
          textStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme === 'dark' ? '#f1f5f9' : '#171717',
          },
        }
      : undefined;

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
        trigger: 'item',
        backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
        borderColor: theme === 'dark' ? '#334155' : '#e5e7eb',
        borderWidth: 1,
        textStyle: {
          color: theme === 'dark' ? '#f1f5f9' : '#171717',
        },
        padding: [12, 16],
        extraCssText: 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border-radius: 12px;',
        formatter: (params: unknown) => {
          const p = params as { name: string; value: number; percent: number; color: string };
          const percent = total > 0 ? ((p.value / total) * 100).toFixed(1) : '0';
          return `
            <div style="font-weight: 600; margin-bottom: 8px;">${p.name}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${p.color};"></span>
              <span>${valueFormatter(p.value)} (${percent}%)</span>
            </div>
          `;
        },
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        left: 'center',
        textStyle: {
          color: theme === 'dark' ? '#94a3b8' : '#6b7280',
          fontSize: 11,
        },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 16,
      },
      graphic: centerLabel ? [{
        type: 'group',
        left: 'center',
        top: '45%',
        children: centerValue !== undefined ? [
          {
            type: 'text',
            style: {
              text: String(centerValue),
              fill: theme === 'dark' ? '#f1f5f9' : '#171717',
              fontSize: 28,
              fontWeight: 'bold',
              textAlign: 'center',
            },
          },
          {
            type: 'text',
            top: 32,
            style: {
              text: centerText || '',
              fill: theme === 'dark' ? '#94a3b8' : '#6b7280',
              fontSize: 12,
              textAlign: 'center',
            },
          },
        ] : [],
      }] : undefined,
      series: [
        {
          type: 'pie',
          radius: donut 
            ? [`${innerRadius * 100}%`, `${typeof radius === 'number' ? radius * 100 : radius}%`]
            : radius,
          center: [centerX, centerY],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: donut ? 0 : 8,
            borderColor: theme === 'dark' ? '#0f172a' : '#ffffff',
            borderWidth: 2,
          },
          label: {
            show: data.length <= 8,
            position: 'outside',
            formatter: (params: unknown) => {
              const p = params as { name: string; percent: number };
              if (!showPercentage) return p.name;
              return `${p.name}\n${p.percent}%`;
            },
            color: theme === 'dark' ? '#94a3b8' : '#6b7280',
            fontSize: 11,
            lineHeight: 16,
          },
          labelLine: {
            show: true,
            length: 15,
            length2: 10,
            smooth: true,
            lineStyle: {
              color: theme === 'dark' ? '#334155' : '#e5e7eb',
            },
          },
          emphasis: {
            scale: true,
            scaleSize: 8,
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
            },
          },
          roseType,
          minShowLabelAngle: minAngle,
          data: data.map((item, index) => ({
            ...item,
            itemStyle: {
              color: palette[index % palette.length],
            },
          })),
        },
      ],
    } as EChartsOption;
  }, [data, title, theme, donut, innerRadius, radius, palette, valueFormatter, total, showPercentage, centerText, centerValue, roseType, minAngle]);

  return (
    <EChartBase
      option={option}
      theme={theme}
      height={height}
      loading={loading}
    />
  );
}

export default PieChart;

