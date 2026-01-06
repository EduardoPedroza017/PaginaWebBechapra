"use client";

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  themeReady: boolean;
}

export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<Theme>('light');
  const [themeReady, setThemeReady] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  useEffect(() => {
    const initializeTheme = () => {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
          setTheme(savedTheme);
        }
      }
      setThemeReady(true);
    };

    const timer = setTimeout(initializeTheme, 0);
    return () => clearTimeout(timer);
  }, []);

  return {
    theme,
    toggleTheme,
    themeReady,
  };
}