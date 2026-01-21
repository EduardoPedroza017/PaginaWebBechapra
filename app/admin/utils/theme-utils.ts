export function getThemeClass(theme?: string | null) {
  if (!theme) return '';
  return theme === 'dark' ? 'dark' : '';
}

export function isDarkTheme(theme?: string | null) {
  return (theme || '') === 'dark';
}

// Simple luminance-based contrast helper for two-color fallback
export function getContrastColor(hex: string) {
  try {
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0,2), 16);
    const g = parseInt(c.substring(2,4), 16);
    const b = parseInt(c.substring(4,6), 16);
    const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
    return luminance > 0.5 ? 'dark' : 'light';
  } catch (e) {
    return 'light';
  }
}
