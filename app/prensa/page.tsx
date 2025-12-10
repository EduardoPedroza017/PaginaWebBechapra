"use client";

import React, { useEffect, useState, useCallback } from "react";
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

export default function PrensaPage() {
  const [press, setPress] = useState<PressItem[]>([]);
  const [filtered, setFiltered] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetch("/api/press")
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
    <main className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <PressHero />

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
            <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 transition-colors duration-300 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <TranslateText text="Comunicados Oficiales" />
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4 transition-colors duration-300 text-gray-900 dark:text-white">
              <TranslateText text="Nuestros" /> {" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                <TranslateText text="Comunicados" />
              </span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto transition-colors duration-300 text-gray-600 dark:text-slate-300">
              <TranslateText text="Información oficial sobre nuestras actividades, logros y novedades." />
            </p>
          </motion.div>

          {/* Filter */}
          <PressFilter
            press={press}
            onFilter={handleFilter}
            totalCount={press.length}
            filteredCount={filtered.length}
          />

          {/* Content */}
          {loading ? (
            <PressSkeleton />
          ) : filtered.length === 0 ? (
            <EmptyState />
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
                    className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/30"
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
                className="text-center text-sm pt-4 transition-colors duration-300 text-gray-400 dark:text-slate-400"
              >
                <TranslateText text={`Mostrando ${Math.min(visibleCount, filtered.length)} de ${filtered.length} comunicados`} />
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden transition-colors duration-300 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
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
            className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-gradient-to-tl from-cyan-400/10 to-transparent rounded-full"
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
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
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
                className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-blue-900 dark:text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
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
