"use client";

import React, { createContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { useTheme } from '@/lib/contexts/ThemeContext';

type AdminThemeContextShape = {
  theme?: string | null;
  resolvedTheme?: string | null;
  systemTheme?: string | null;
  setTheme?: (t: string) => void;
  toggleTheme: () => void;
  isDark: boolean;
  themeReady?: boolean;
};

export const AdminThemeContext = createContext<AdminThemeContextShape>({
  toggleTheme: () => {},
  isDark: false,
  themeReady: false,
});

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const themeCtx = useTheme();

  const theme = themeCtx.theme;
  const resolvedTheme = themeCtx.resolvedTheme;
  const systemTheme = themeCtx.systemTheme;
  const setTheme = themeCtx.setTheme;

  const toggleTheme = () => {
    const current = resolvedTheme || theme || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    console.log(`Switching theme from ${current} to ${next}`); // Debugging log
    setTheme?.(next);
  };

  const isDark = (resolvedTheme || theme) === 'dark';

  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    // mark ready on mount — next-themes resolves server/client during hydration
    setThemeReady(true);
  }, []);

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    systemTheme,
    setTheme,
    toggleTheme,
    isDark,
    themeReady,
  }), [theme, resolvedTheme, systemTheme, setTheme, isDark, themeReady]);

  return (
    <AdminThemeContext.Provider value={value}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export default AdminThemeProvider;
