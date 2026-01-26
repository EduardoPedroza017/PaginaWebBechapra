"use client";

import React, { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChartBase } from './EChartBase';
import { ThemeMode } from './echartsTheme';

export interface GaugeChartProps {
  /**
   * Current value to display
   */
  value: number;
  /**
   * Minimum value
   */
  min?: number;
  /**
   * Maximum value
   */
  max?: number;
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
   * Unit label (e.g., '%', 'ms', 'GB')
   */
  unit?: string;
  /**
   * Custom colors for ranges
   */
  colors?: {
    low?: string;
    medium?: string;
    high?: string;
  };
  /**
   * Thresholds for color ranges
   */
  thresholds?: {
    low: number;
    medium: number;
  };
  /**
   * Whether chart is loading
   */
  loading?: boolean;
  /**
   * Show detail value
   */
  showDetail?: boolean;
  /**
   * Gauge radius
   */
  radius?: number;
  /**
   * Number of decimal places
   */
  decimals?: number;
  /**
   * Progress type (full gauge or partial)
   */
  progress?: boolean;
}

/**
 * Animated Gauge Chart for KPIs and metrics
 */
export function GaugeChart({
  value,
  min = 0,
  max = 100,
  title,
  theme = 'light',
  height = 250,
  unit = '%',
  colors: customColors,
  thresholds = { low: 50, medium: 80 },
  loading = false,
  showDetail = true,
  radius = 80,
  decimals = 0,
  progress = false,
}: GaugeChartProps) {
  const isDark = theme === 'dark';
  
  const defaultColors = {
    low: '#059669',      // Green
    medium: '#d97706',   // Amber
    high: '#dc2626',     // Red
  };
  
  const colors = { ...defaultColors, ...customColors };
  
  // Determine color based on value
  const getColor = () => {
    if (value >= thresholds.medium) return colors.high;
    if (value >= thresholds.low) return colors.medium;
    return colors.low;
  };

  const pointerColor = getColor();
  const accentColor = isDark ? '#3b82f6' : '#0057D9';

  const option = useMemo(() => {
    const centerX = '50%';
    const centerY = '50%';
    
    // Calculate ranges
    const range1End = thresholds.low;
    const range2End = thresholds.medium;
    
    return {
      title: title ? {
        text: title,
        left: 'center',
        top: 0,
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: isDark ? '#f1f5f9' : '#171717',
        },
      } : undefined,
      series: [
        {
          type: 'gauge',
          center: [centerX, centerY],
          radius: `${radius}%`,
          startAngle: 200,
          endAngle: -20,
          min,
          max,
          splitNumber: 5,
          progress: {
            show: true,
            width: 18,
            itemStyle: {
              color: pointerColor,
            },
          },
          axisLine: {
            lineStyle: {
              width: 18,
              color: [
                [range1End / max, colors.low],
                [range2End / max, colors.medium],
                [1, colors.high],
              ],
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          anchor: {
            show: true,
            size: 20,
            itemStyle: {
              color: isDark ? '#1e293b' : '#f1f3f5',
              borderWidth: 3,
              borderColor: pointerColor,
            },
          },
          pointer: {
            show: false, // Using progress instead
          },
          pointer2: {
            show: false,
          },
          pointer3: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: showDetail ? {
            valueAnimation: true,
            fontSize: 28,
            fontWeight: 'bold',
            offsetCenter: [0, '70%'],
            formatter: (val: number) => `${val.toFixed(decimals)}${unit}`,
            color: isDark ? '#f1f5f9' : '#171717',
          } : undefined,
          data: [
            {
              value: value,
              name: '',
            },
          ],
          // Add second gauge for background ring effect
          axisLine2: {
            lineStyle: {
              width: 4,
              color: [[1, isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)']],
            },
          },
        },
        // Add decorative arc
        {
          type: 'gauge',
          center: [centerX, centerY],
          radius: `${radius - 2}%`,
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 100,
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          pointer: { show: false },
          title: { show: false },
          detail: { show: false },
          data: [{ value: 100 }],
          progress: {
            show: true,
            width: 2,
            itemStyle: {
              color: accentColor,
              opacity: 0.3,
            },
          },
        },
      ],
    } as EChartsOption;
  }, [value, min, max, title, theme, unit, colors, thresholds, radius, decimals, isDark, pointerColor, accentColor]);

  return (
    <EChartBase
      option={option}
      theme={theme}
      height={height}
      loading={loading}
    />
  );
}

export default GaugeChart;

