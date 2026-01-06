"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Use resolvedTheme so we respect system when enabled; fall back to theme
  const current = resolvedTheme ?? theme;
  const isDark = current === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Prevent hydration mismatch - render placeholder until mounted
  if (!mounted) {
    return (
      <div className="relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800" aria-hidden />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 ${isDark ? 'bg-slate-800 text-blue-400' : 'bg-slate-100 text-yellow-500'}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.35 }}
      >
        {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </motion.div>

      {/* decorative halo to emphasize state */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{ boxShadow: isDark ? '0 0 20px rgba(59,130,246,0.18)' : '0 0 18px rgba(245,158,11,0.12)' }}
        transition={{ duration: 0.35 }}
      />
    </motion.button>
  );
}
