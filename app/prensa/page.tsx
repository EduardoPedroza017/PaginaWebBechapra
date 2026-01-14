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
import { ChevronDown, Loader2, Newspaper, Calendar, Download, ExternalLink, Mail, Phone, Megaphone, TrendingUp } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface PressItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
  category?: string;
  type?: 'press-release' | 'article' | 'interview' | 'announcement';
  mediaOutlet?: string;
  views?: number;
}

export default function PrensaPage() {
  const [press, setPress] = useState<PressItem[]>([]);
  const [filtered, setFiltered] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loadingMore, setLoadingMore] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    mediaOutlets: 0,
    featured: 0
  });

  useEffect(() => {
    const proxyPath = "/api/backend/press";
    const directBackend = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api/press`
      : null;
    const url = directBackend || proxyPath;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((rawData: any) => {
        // Normalize different backend response shapes
        let items: PressItem[] = [];
        if (Array.isArray(rawData)) items = rawData;
        else if (Array.isArray(rawData.data)) items = rawData.data;
        else if (Array.isArray(rawData.items)) items = rawData.items;
        else if (Array.isArray(rawData.results)) items = rawData.results;
        else items = [];

        // Sort by date descending
        const sorted = items.slice().sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setPress(sorted);
        setFiltered(sorted);

        // Calculate stats
        const now = new Date();
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        setStats({
          total: sorted.length,
          thisMonth: sorted.filter((item) => new Date(item.date) >= thisMonth).length,
          mediaOutlets: new Set(sorted.map((item) => item.mediaOutlet).filter(Boolean)).size,
          featured: sorted.filter((item) => item.type === "press-release").length,
        });
      })
      .catch((err) => {
        console.error("Error fetching press:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Reset pagination on filter
  const handleFilter = useCallback((filteredList: PressItem[]) => {
    setFiltered(filteredList);
    setVisibleCount(9);
  }, []);

  // Load more with animation
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((c) => c + 9);
      setLoadingMore(false);
    }, 300);
  };

  // Split items: first 3 featured (large), next 6 regular
  const featuredItems = filtered.slice(0, 7); // show more in carousel
  const regularItems = filtered.slice(7, visibleCount);
  const hasMore = filtered.length > visibleCount;

  // Carousel state for codeflower-like layout
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || featuredItems.length <= 1) return;
    const iv = setInterval(() => setActiveIndex((i) => (i + 1) % featuredItems.length), 4500);
    return () => clearInterval(iv);
  }, [isPaused, featuredItems.length]);

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-blue-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-900 to-blue-800 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold mb-8 border border-white/20"
            >
              <Megaphone className="w-4 h-4" />
              <TranslateText text="Sala de Prensa Oficial" />
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              <span className="bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
                <TranslateText text="Sala de" />
              </span>
              <br />
              <span className="bg-linear-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                <TranslateText text="Prensa" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-blue-100/90 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              <TranslateText text="Comunicados oficiales, coberturas mediáticas y recursos para periodistas y medios de comunicación." />
            </p>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
            >
              {[
                { label: "Comunicados", value: stats.total, icon: Newspaper, color: "from-blue-500 to-cyan-500" },
                { label: "Este Mes", value: stats.thisMonth, icon: Calendar, color: "from-emerald-500 to-green-500" },
                { label: "Medios", value: stats.mediaOutlets, icon: TrendingUp, color: "from-amber-500 to-orange-500" },
                { label: "Destacados", value: stats.featured, icon: Megaphone, color: "from-purple-500 to-pink-500" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-blue-200/70">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#comunicados"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-white to-blue-50 text-blue-900 font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
              >
                <Newspaper className="w-5 h-5" />
                <TranslateText text="Ver Comunicados" />
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </a>
              <a
                href="#media-kit"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/30 hover:border-white/60 hover:bg-white/20 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                <TranslateText text="Kit de Medios" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              d="M0,120L48,112C96,104,192,88,288,80C384,72,480,72,576,80C672,88,768,104,864,112C960,120,1056,120,1152,112C1248,104,1344,88,1392,80L1440,72L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="fill-white dark:fill-slate-900"
            />
          </svg>
        </div>
      </section>

      {/* Media Kit Section */}
      <section id="media-kit" className="py-16 bg-linear-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                  <TranslateText text="Recursos para" />{" "}
                  <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    <TranslateText text="Medios" />
                  </span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  <TranslateText text="Todo lo que necesitan los periodistas y medios de comunicación para cubrir nuestras actividades." />
                </p>
                <div className="space-y-4">
                  <a href="#" className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors">
                    <Download className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        <TranslateText text="Kit de Prensa Completo" />
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        <TranslateText text="Logos, fotos, biografías (ZIP, 45MB)" />
                      </div>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors">
                    <ExternalLink className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        <TranslateText text="Galeria de Fotos" />
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        <TranslateText text="Imágenes de alta resolución" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  <TranslateText text="Contacto Directo" />
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">prensa@bausen.com</div>
                      <div className="text-sm text-blue-200">
                        <TranslateText text="Respuesta en 24h" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">+52 55 1234 5678</div>
                      <div className="text-sm text-blue-200">
                        <TranslateText text="Línea directa prensa" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section id="comunicados" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold mb-6">
              <Newspaper className="w-4 h-4" />
              <TranslateText text="Comunicados Oficiales" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
                <TranslateText text="Últimos Comunicados" />
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              <TranslateText text="Información oficial verificada y recursos exclusivos para medios de comunicación." />
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6" />
          </motion.div>

          {/* Filter */}
          <PressFilter
            press={press}
            onFilter={handleFilter}
            totalCount={press.length}
            filteredCount={filtered.length}
          />

          {/* Results Summary */}
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">{filtered.length}</span>{" "}
              <TranslateText text="comunicados encontrados" />
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <TranslateText text={`Mostrando ${Math.min(visibleCount, filtered.length)} de ${filtered.length}`} />
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <PressSkeleton />
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-12">
              {/* Featured Press Items (Large Cards) */}
              {featuredItems.length > 0 && (
                <div
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                  className="relative w-full h-[520px] md:h-[420px] lg:h-[520px] flex items-center justify-center"
                  style={{ perspective: 1400 }}
                >
                  <button
                    aria-label="Anterior"
                    onClick={() => setActiveIndex((i) => (i - 1 + featuredItems.length) % featuredItems.length)}
                    className="absolute left-6 z-40 w-11 h-11 rounded-full bg-slate-800/60 backdrop-blur-sm text-white flex items-center justify-center"
                  >
                    <ChevronDown className="-rotate-90 w-5 h-5" />
                  </button>

                  <div className="w-full max-w-6xl h-full relative flex items-center justify-center">
                    {featuredItems.map((item, i) => {
                      const offset = i - activeIndex;
                      // Normalize offsets so carousel wraps nicely
                      let normalized = offset;
                      if (offset > featuredItems.length / 2) normalized = offset - featuredItems.length;
                      if (offset < -featuredItems.length / 2) normalized = offset + featuredItems.length;

                        const abs = Math.abs(normalized);
                        // Tamer spacing and scale for clearer hierarchy
                        const translateX = normalized * 200;
                        const scale = abs === 0 ? 1 : abs === 1 ? 0.92 : Math.max(0.82, 1 - abs * 0.06);
                        const rotateY = normalized * -10;
                        const zIndex = 200 - Math.round(abs * 10);
                        const opacity = abs > 2 ? 0 : 1 - abs * 0.22;

                        // size class mapping for PressCard
                        const sizeProp = abs === 0 ? 'large' : abs === 1 ? 'medium' : 'small';

                        return (
                          <div
                            key={item.id}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500"
                            style={{
                              width: abs === 0 ? 560 : abs === 1 ? 480 : 420,
                              transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                              zIndex,
                              opacity,
                              pointerEvents: abs > 1.8 ? 'none' : 'auto'
                            }}
                          >
                            <div style={{boxShadow: abs === 0 ? '0 30px 60px rgba(2,6,23,0.6)' : '0 12px 30px rgba(2,6,23,0.35)'}}>
                              <PressCard item={item} index={i} isFeatured size={sizeProp} />
                            </div>
                          </div>
                        );
                    })}
                  </div>

                  <button
                    aria-label="Siguiente"
                    onClick={() => setActiveIndex((i) => (i + 1) % featuredItems.length)}
                    className="absolute right-6 z-40 w-11 h-11 rounded-full bg-slate-800/60 backdrop-blur-sm text-white flex items-center justify-center"
                  >
                    <ChevronDown className="rotate-90 w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Regular Press Items */}
              {regularItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {regularItems.map((item, i) => (
                    <PressCard
                      key={item.id}
                      item={item}
                      index={i + 3}
                      isFeatured={false}
                      size="small"
                    />
                  ))}
                </motion.div>
              )}

              {/* Load More Button */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center pt-12"
                >
                  <motion.button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-2xl shadow-blue-600/30"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {loadingMore ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span><TranslateText text="Cargando más..." /></span>
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
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Media Contact CTA */}
      <section className="py-20 relative overflow-hidden bg-linear-to-br from-slate-900 via-blue-950 to-indigo-950">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-6">
              <Megaphone className="w-4 h-4" />
              <TranslateText text="Para Medios de Comunicación" />
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              <TranslateText text="¿Eres" />{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                <TranslateText text="Periodista" />
              </span>{" "}
              <TranslateText text="o Medio?" />
            </h2>

            <p className="text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              <TranslateText text="Solicita entrevistas exclusivas, acceso a fuentes directas o agenda una sesión informativa con nuestro equipo directivo." />
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href="/#contacto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-white to-blue-50 text-blue-900 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                <TranslateText text="Solicitar Entrevista" />
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="mailto:prensa@bausen.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span className="font-mono">+52 55 1234 5678</span>
              </motion.a>
            </div>

            <p className="text-blue-200/70 text-sm mt-8">
              <TranslateText text="Horario de atención para prensa: Lunes a Viernes de 9:00 a 18:00 hrs" />
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}