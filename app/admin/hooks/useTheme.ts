"use client";

import { useContext } from 'react';
import { AdminThemeContext } from '../providers/ThemeProvider';

export function useAdminTheme() {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) {
    return {
      theme: 'light',
      resolvedTheme: 'light',
      systemTheme: 'light',
      setTheme: undefined,
      toggleTheme: () => {},
      isDark: false,
      themeReady: false,
    };
  }
  return ctx;
}

export default useAdminTheme;