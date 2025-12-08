"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import {
  PressHero,
  PressCard,
  PressFilter,
  PressSkeleton,
  EmptyState,
} from "./components";
import { ChevronDown, Loader2 } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface PressItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
}

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('prensa-theme');
  if (saved) return saved as 'light' | 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function PrensaPage() {
  const [press, setPress] = useState<PressItem[]>([]);
  const [filtered, setFiltered] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const mediaQueryRef = useRef<MediaQueryList | null>(null);
  const handlerRef = useRef<((e: MediaQueryListEvent) => void) | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/press")
      .then((res) => res.json())
      .then((data: PressItem[]) => {
        // Sort by date descending
        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPress(sorted);
        setFiltered(sorted);
      })
      .catch((err) => {
        console.error("Error fetching press:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem('prensa-theme', theme);
  }, [theme]);

  useEffect(() => {
    handlerRef.current = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    mediaQueryRef.current = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQueryRef.current.addEventListener('change', handlerRef.current);
    
    return () => {
      if (mediaQueryRef.current && handlerRef.current) {
        mediaQueryRef.current.removeEventListener('change', handlerRef.current);
      }
    };
  }, []);

  // Reset pagination on filter
  const handleFilter = useCallback((filteredList: PressItem[]) => {
    setFiltered(filteredList);
    setVisibleCount(8);
  }, []);

  // Load more with animation
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((c) => c + 6);
      setLoadingMore(false);
    }, 300);
  };

  // Split items: first 2 featured, rest regular
  const featuredItems = filtered.slice(0, 2);
  const regularItems = filtered.slice(2, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <main style={{ background: theme === 'dark' ? '#0f172a' : '#f9fafb' }} className="min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <PressHero theme={theme} setTheme={setTheme} />

      {/* Press Releases Section */}
      <section id="comunicados" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span style={{ 
              background: theme === 'dark' ? 'rgba(96, 165, 250, 0.2)' : 'rgb(219, 234, 254)',
              color: theme === 'dark' ? '#60a5fa' : 'rgb(37, 99, 235)'
            }} className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 transition-colors duration-300">
              <TranslateText text="Comunicados Oficiales" />
            </span>
            <h2 style={{ color: theme === 'dark' ? '#e2e8f0' : '#111827' }} className="text-4xl md:text-5xl font-black mb-4 transition-colors duration-300">
              <TranslateText text="Nuestros" /> {" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                <TranslateText text="Comunicados" />
              </span>
            </h2>
            <p style={{ color: theme === 'dark' ? '#cbd5e1' : 'rgb(75, 85, 99)' }} className="text-xl max-w-2xl mx-auto transition-colors duration-300">
              <TranslateText text="Información oficial sobre nuestras actividades, logros y novedades." />
            </p>
          </motion.div>

          {/* Filter */}
          <PressFilter
            press={press}
            onFilter={handleFilter}
            totalCount={press.length}
            filteredCount={filtered.length}
            theme={theme}
          />

          {/* Content */}
          {loading ? (
            <PressSkeleton theme={theme} />
          ) : filtered.length === 0 ? (
            <EmptyState theme={theme} />
          ) : (
            <div className="space-y-8">
              {/* Featured Press Items */}
              {featuredItems.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredItems.map((item, i) => (
                    <PressCard
                      key={item.id}
                      item={item}
                      index={i}
                      isFeatured={true}
                      theme={theme}
                    />
                  ))}
                </div>
              )}

              {/* Regular Press Items */}
              {regularItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {regularItems.map((item, i) => (
                    <PressCard
                      key={item.id}
                      item={item}
                      index={i + 2}
                      isFeatured={false}
                      theme={theme}
                    />
                  ))}
                </motion.div>
              )}

              {/* Load More Button */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center pt-8"
                >
                  <motion.button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: theme === 'dark' 
                        ? 'linear-gradient(to right, #1e40af, #4f46e5)' 
                        : 'linear-gradient(to right, #2563eb, #4f46e5)',
                      color: 'white',
                      boxShadow: theme === 'dark' 
                        ? '0 20px 25px -5px rgba(30, 64, 175, 0.3)'
                        : '0 20px 25px -5px rgba(37, 99, 235, 0.3)'
                    }}
                    className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span><TranslateText text="Cargando..." /></span>
                      </>
                    ) : (
                      <>
                        <span><TranslateText text="Ver más comunicados" /></span>
                        <ChevronDown
                          size={20}
                          className="group-hover:translate-y-1 transition-transform duration-300"
                        />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}

              {/* Results Summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: theme === 'dark' ? '#94a3b8' : '#9ca3af' }}
                className="text-center text-sm pt-4 transition-colors duration-300"
              >
                <TranslateText text={`Mostrando ${Math.min(visibleCount, filtered.length)} de ${filtered.length} comunicados`} />
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)'
          : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
      }} className="py-20 px-6 relative overflow-hidden transition-colors duration-300">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-gradient-to-tl from-amber-400/10 to-transparent rounded-full"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              <TranslateText text="¿Eres medio de" /> {" "}
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                <TranslateText text="comunicación" />
              </span>
              ?
            </h2>
            <p className="text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              <TranslateText text="Contáctanos para solicitar información, entrevistas o material de prensa. Nuestro equipo de comunicación está disponible para atenderte." />
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="/#contacto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-900 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <TranslateText text="Contacto de Prensa" />
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:prensa@bechapra.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                prensa@bechapra.com
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
