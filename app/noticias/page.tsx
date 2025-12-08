"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, TrendingUp, Calendar, Clock, ArrowRight, Search } from "lucide-react";
import Footer from "@/components/Footer";
import { TranslateText } from "@/components/TranslateText";

interface NewsItem {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image_url?: string;
}

export default function NoticiasPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a: NewsItem, b: NewsItem) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setNews(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 py-20 lg:py-28 px-6">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-blue-100 text-sm font-semibold mb-6"
            >
              <Newspaper className="w-4 h-4" />
              <TranslateText text="Blog & Actualidad" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                <TranslateText text="Noticias" />
              </span>{" "}
              <TranslateText text="y Actualidad" />
            </h1>

            <p className="text-lg sm:text-xl text-blue-100/90 max-w-2xl mx-auto mb-10 leading-relaxed">
              <TranslateText text="Blog corporativo, eventos destacados y actualizaciones sobre cambios legislativos que impactan tus operaciones empresariales." />
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/#contacto"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-blue-700 dark:text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <TranslateText text="Suscríbete al newsletter" />
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(248 250 252)"
            />
          </svg>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-2xl mx-auto px-6">
          <div className="relative">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar noticias, temas o palabras clave..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                  disabled
                />
              </div>
              <button
                className="px-6 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/25 opacity-50 cursor-not-allowed"
                disabled
              >
                <TranslateText text="Buscar" />
              </button>
            </div>
            <p className="text-center text-slate-400 dark:text-slate-500 text-sm mt-3">
              <TranslateText text="Buscador próximamente disponible" />
            </p>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
              <TranslateText text="Noticias" />{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                <TranslateText text="Más Recientes" />
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              <TranslateText text="Mantente informado con las últimas novedades del sector" />
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mt-6" />
          </motion.div>

          {/* News Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-slate-100 rounded-2xl h-[420px] animate-pulse"
                />
              ))}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-16">
              <Newspaper className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                <TranslateText text="No hay noticias disponibles" />
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {news.slice(0, 6).map((item, i) => (
                <NewsCard key={i} item={item} index={i} />
              ))}
            </motion.div>
          )}

          {/* Load More Button */}
          {news.length > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-1 transition-all">
                <TranslateText text="Ver más noticias" />
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4">
              <TranslateText text="Explora por" />{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                <TranslateText text="Categoría" />
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              <TranslateText text="Encuentra el contenido que más te interesa" />
            </p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Newspaper,
                title: "Blog Corporativo",
                count: "42 artículos",
                color: "blue" as const,
                description: "Tendencias, insights y mejores prácticas",
              },
              {
                icon: Calendar,
                title: "Eventos",
                count: "18 eventos",
                color: "indigo" as const,
                description: "Webinars, conferencias y capacitaciones",
              },
              {
                icon: TrendingUp,
                title: "Cambios Legislativos",
                count: "27 actualizaciones",
                color: "amber" as const,
                description: "Reformas fiscales, laborales y normativas",
              },
            ].map((category, i) => (
              <CategoryCard key={i} category={category} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// News Card Component
function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const isFeatured = index < 2;

  return (
    <Link href={`/noticias/${encodeURIComponent(item.title)}`}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className={`group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 h-full flex flex-col ${
          isFeatured
            ? "border-blue-600 dark:border-blue-500 shadow-xl shadow-blue-600/10 dark:shadow-blue-500/20"
            : "border-slate-100 dark:border-slate-700 shadow-lg hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl"
        }`}
      >
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-blue-400 to-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg">
            <TranslateText text="Destacado" />
          </div>
        )}

        {/* Image */}
        <div className="relative h-52 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
          {item.image_url ? (
            <Image
              src={`http://localhost:5000${item.image_url}`}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Newspaper className="w-16 h-16 text-blue-200" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Category Tag */}
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
            {item.subtitle || "Noticia"}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Date */}
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-3">
            <Clock className="w-4 h-4" />
            <span>
              {new Date(item.date).toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            <TranslateText text={item.title} />
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1 line-clamp-3">
            <TranslateText text={item.description} />
          </p>

          {/* Read More */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <span className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm group-hover:gap-3 transition-all">
              <TranslateText text="Leer artículo completo" />
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

// Category Card Component
function CategoryCard({
  category,
  index,
}: {
  category: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    count: string;
    color: "blue" | "indigo" | "amber";
    description: string;
  };
  index: number;
}) {
  const IconComponent = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl p-8 cursor-pointer border-2 border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
    >
      {/* Icon */}
      {category.color === "indigo" ? (
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
      ) : category.color === "amber" ? (
        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
      ) : (
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        <TranslateText text={category.title} />
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
        <TranslateText text={category.description} />
      </p>

      {/* Count */}
      {category.color === "indigo" ? (
        <p className="text-base font-bold text-indigo-600 dark:text-indigo-400">
          <TranslateText text={category.count} />
        </p>
      ) : (
        <p className="text-base font-bold text-blue-600 dark:text-blue-400">
          <TranslateText text={category.count} />
        </p>
      )}
    </motion.div>
  );
}
