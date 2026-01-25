// tremorAdapter.tsx
// Helpers to adapt chart.js-like datasets into Tremor-friendly structures
// Using Bausen brand colors from globals.css

export type ThemeMode = 'light' | 'dark';

type TremorRow = {
  name: string;
  [key: string]: string | number;
};

type SeriesInput = {
  key: string;
  data: number[];
};

type TailwindColor = {
  light: string;
  dark: string;
};

// Bausen brand palette - matches globals.css
const BAUSEN_PALETTE: Record<string, TailwindColor> = {
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
const FULL_PALETTE: TailwindColor[] = [
  { light: '#0057D9', dark: '#3b82f6' },   // Blue (brand primary)
  { light: '#059669', dark: '#34d399' },   // Green
  { light: '#6B21A8', dark: '#a78bfa' },   // Purple
  { light: '#d97706', dark: '#fbbf24' },   // Amber
  { light: '#0099CC', dark: '#22d3ee' },   // Cyan
  { light: '#dc2626', dark: '#f87171' },   // Red
  { light: '#0891b2', dark: '#22d3ee' },   // Teal
  { light: '#7c3aed', dark: '#818cf8' },   // Violet
];

export function mapBarDataToTremor(
  labels: string[],
  values: number[],
  label = 'value'
): TremorRow[] {
  return labels.map((l, i) => ({
    name: l,
    [label]: values[i] ?? 0,
  }));
}

export function mapMultiSeriesToTremor(
  labels: string[],
  series: SeriesInput[]
): TremorRow[] {
  return labels.map((l, i) => {
    const out: TremorRow = { name: l };

    series.forEach(s => {
      out[s.key] = s.data[i] ?? 0;
    });

    return out;
  });
}

/**
 * Get color palette adapted to theme using Bausen brand colors
 */
export function themeColorsForTremor(
  theme: ThemeMode,
  count = 6
): string[] {
  const mode: 'light' | 'dark' = theme === 'dark' ? 'dark' : 'light';
  
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const color = FULL_PALETTE[i % FULL_PALETTE.length];
    out.push(color[mode]);
  }

  return out;
}

/**
 * Get single color for index
 */
export function colorForIndex(theme: ThemeMode, index: number): string {
  const mode: 'light' | 'dark' = theme === 'dark' ? 'dark' : 'light';
  const color = FULL_PALETTE[index % FULL_PALETTE.length];
  return color[mode];
}

/**
 * Get gradient colors for area/line charts
 */
export function gradientColorsForTremor(
  theme: ThemeMode
): { fill: string; stroke: string } {
  if (theme === 'dark') {
    return {
      fill: 'rgba(59, 130, 246, 0.3)',
      stroke: '#3b82f6',
    };
  }
  return {
    fill: 'rgba(0, 87, 217, 0.2)',
    stroke: '#0057D9',
  };
}

/**
 * Get chart background color based on theme
 */
export function chartBackgroundColor(theme: ThemeMode): string {
  return theme === 'dark' ? '#0f172a' : '#ffffff';
}

/**
 * Get chart text colors based on theme
 */
export function chartTextColors(theme: ThemeMode): { primary: string; secondary: string } {
  return {
    primary: theme === 'dark' ? '#f1f5f9' : '#171717',
    secondary: theme === 'dark' ? '#94a3b8' : '#6b7280',
  };
}

const adapter = {
  mapBarDataToTremor,
  mapMultiSeriesToTremor,
  themeColorsForTremor,
  colorForIndex,
  gradientColorsForTremor,
  chartBackgroundColor,
  chartTextColors,
};

export default adapter;

