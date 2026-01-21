"use client";

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import useAdminTheme from '@/app/admin/hooks/useTheme';

type Props = {
  className?: string;
};

export default function ThemeToggle({ className = '' }: Props) {
  const { isDark, resolvedTheme, theme, toggleTheme } = useAdminTheme();

  const ariaLabel = `Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`;

  return (
    <button
      aria-label={ariaLabel}
      title={ariaLabel}
      onClick={() => toggleTheme()}
      className={`${className} inline-flex items-center gap-2 px-3 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
}
