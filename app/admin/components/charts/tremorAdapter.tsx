// tremorAdapter.tsx
// Helpers to adapt chart.js-like datasets into Tremor-friendly structures

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

const TAILWIND_PALETTE: Record<string, TailwindColor> = {
  blue: { light: '#3b82f6', dark: '#60a5fa' },
  emerald: { light: '#10b981', dark: '#34d399' },
  amber: { light: '#f59e0b', dark: '#fbbf24' },
  purple: { light: '#8b5cf6', dark: '#a78bfa' },
  pink: { light: '#ec4899', dark: '#f472b6' },
  cyan: { light: '#06b6d4', dark: '#22d3ee' },
  orange: { light: '#f97316', dark: '#fb923c' },
  lime: { light: '#84cc16', dark: '#a3e635' },
  indigo: { light: '#6366f1', dark: '#818cf8' },
  red: { light: '#ef4444', dark: '#f87171' },
};

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

export function themeColorsForTremor(
  theme: ThemeMode,
  count = 6
): string[] {
  const mode: ThemeMode = theme === 'dark' ? 'dark' : 'light';
  const colors = Object.values(TAILWIND_PALETTE).map(c => c[mode]);

  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(colors[i % colors.length]);
  }

  return out;
}

export function colorForIndex(theme: ThemeMode, index: number): string {
  return themeColorsForTremor(theme, index + 1)[index];
}

const adapter = {
  mapBarDataToTremor,
  mapMultiSeriesToTremor,
  themeColorsForTremor,
  colorForIndex,
};

export default adapter;
