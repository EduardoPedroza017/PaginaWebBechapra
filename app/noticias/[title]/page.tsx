"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Newspaper, TrendingUp, Calendar, Clock, ArrowRight, Search, Filter, 
  Star, BookOpen, Users, BarChart3, Zap, ChevronDown, X, Eye, 
  Bookmark, Share2, TrendingUp as TrendingUpIcon 
} from "lucide-react";
import Footer from "@/components/Footer";
import { TranslateText } from "@/components/TranslateText";

interface NewsItem {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image_url?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  altText?: string;
  author?: string;
  readTime?: number;
  views?: number;
}

type FilterType = 'all' | 'featured' | 'recent' | 'popular';
type CategoryType = string;

export default function NoticiasPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    fetch(`${apiUrl}/api/news`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : (Array.isArray((data as any).news) ? (data as any).news : []);
        const sorted = items.sort(
          (a: NewsItem, b: NewsItem) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        // Add simulated data for demo
        const enhancedItems = sorted.map((item: NewsItem) => ({
          ...item,
          readTime: Math.ceil(item.description.length / 1500),
          views: Math.floor(Math.random() * 10000) + 1000
        }));
        setNews(enhancedItems);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setError("No se pudieron cargar las noticias");
        setNews([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = news
      .map((item: NewsItem) => item.category) // Added type annotation for `item`
      .filter(Boolean) as string[];
    return ['all', ...Array.from(new Set(cats))];
  }, [news]);

  // Filter and search logic
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Type filter
      let matchesFilter = true;
      switch(selectedFilter) {
        case 'featured':
          matchesFilter = item.featured === true;
          break;
        case 'recent':
          // Already sorted by recent
          matchesFilter = true;
          break;
        case 'popular':
          matchesFilter = (item.views || 0) > 5000;
          break;
        default:
          matchesFilter = true;
      }

      return matchesSearch && matchesCategory && matchesFilter;
    });
  }, [news, searchQuery, selectedCategory, selectedFilter]);

  const featuredNews = useMemo(() => 
    news.filter(item => item.featured).slice(0, 2), 
  [news]);

  const handleBookmark = useCallback((title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  }, []);

  const getTotalStats = useMemo(() => {
    return {
      total: news.length,
      featured: news.filter(n => n.featured).length,
      categories: categories.length - 1,
      totalViews: news.reduce((sum, item) => sum + (item.views || 0), 0),
    };
  }, [news, categories]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-blue-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/10">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-blue-100 text-sm font-semibold mb-8 border border-white/20"
            >
              <Zap className="w-4 h-4" fill="currentColor" />
              <TranslateText text="Actualización en tiempo real" />
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                <TranslateText text="Centro de" />
              </span>
              <br />
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                <TranslateText text="Inteligencia" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-blue-100/90 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              <TranslateText text="Noticias estratégicas, análisis profundo y tendencias que transforman negocios" />
            </p>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              {[
                { label: "Noticias", value: getTotalStats.total, icon: Newspaper },
                { label: "Destacadas", value: getTotalStats.featured, icon: Star },
                { label: "Categorías", value: getTotalStats.categories, icon: BookOpen },
                { label: "Visitas", value: `${(getTotalStats.totalViews / 1000).toFixed(1)}K`, icon: Eye },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-300" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-blue-200/70">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="#noticias"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-white to-blue-50 text-blue-700 font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
              >
                <TranslateText text="Explorar Noticias" />
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#contacto"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-bold rounded-2xl border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <Users className="w-5 h-5" />
                <TranslateText text="Unirse a la Comunidad" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="fill-white dark:fill-slate-900"
            />
          </svg>
        </div>
      </section>

      {/* Featured News Banner */}
      {featuredNews.length > 0 && (
        <section className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 border-y border-slate-200/50 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    <TranslateText text="Destacado del Día" />
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <TranslateText text="Lo más relevante de hoy" />
                  </p>
                </div>
              </div>
              <Link
                href={`/noticias/${encodeURIComponent(featuredNews[0].title)}`}
                className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
              >
                <TranslateText text="Leer ahora" />
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Search & Filter Section */}
      <section id="noticias" className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar noticias, temas, categorías..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  <TranslateText text="Filtros" />
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 z-50"
                    >
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                            <TranslateText text="Tipo" />
                          </h4>
                          <div className="space-y-2">
                            {[
                              { value: 'all', label: 'Todas' },
                              { value: 'featured', label: 'Destacadas' },
                              { value: 'recent', label: 'Más recientes' },
                              { value: 'popular', label: 'Más populares' }
                            ].map(filter => (
                              <button
                                key={filter.value}
                                onClick={() => {
                                  setSelectedFilter(filter.value as FilterType);
                                  setShowFilters(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedFilter === filter.value 
                                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
                                }`}
                              >
                                {filter.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                            <TranslateText text="Categoría" />
                          </h4>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {categories.map(category => (
                              <button
                                key={category}
                                onClick={() => {
                                  setSelectedCategory(category);
                                  setShowFilters(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === category 
                                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
                                }`}
                              >
                                {category === 'all' ? 'Todas las categorías' : category}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Active Filters */}
              {(selectedFilter !== 'all' || selectedCategory !== 'all') && (
                <div className="flex flex-wrap items-center gap-2">
                  {selectedFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm">
                      {selectedFilter === 'featured' ? 'Destacadas' : 
                       selectedFilter === 'recent' ? 'Recientes' : 'Populares'}
                      <button onClick={() => setSelectedFilter('all')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-sm">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('all')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-slate-600 dark:text-slate-400">
              <TranslateText text="Mostrando" /> <span className="font-semibold text-slate-900 dark:text-white">{filteredNews.length}</span> <TranslateText text="de" /> {news.length} <TranslateText text="noticias" />
            </p>
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                +{(getTotalStats.totalViews / 1000000).toFixed(1)}M <TranslateText text="visitas totales" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main News Grid */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-2xl h-[420px] animate-pulse" />
              ))}
            </div>
          ) : filteredNews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                <Search className="w-12 h-12 text-slate-400 dark:text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                <TranslateText text="No se encontraron noticias" />
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                <TranslateText text="Intenta con otros términos o filtros diferentes" />
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
              >
                <TranslateText text="Limpiar filtros" />
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredNews.map((item, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <NewsCard 
                      item={item} 
                      index={i}
                      isBookmarked={bookmarkedItems.has(item.title)}
                      onBookmark={handleBookmark}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More */}
              {filteredNews.length > 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-16"
                >
                  <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <span><TranslateText text="Cargar más noticias" /></span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
                <TranslateText text="Explora por Área" />
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              <TranslateText text="Contenido especializado organizado para maximizar tu aprendizaje" />
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Análisis Estratégico",
                count: "15 reportes",
                color: "from-blue-500 to-cyan-500",
                gradient: "from-blue-50 to-cyan-50",
                description: "Tendencias del mercado y análisis profundo"
              },
              {
                icon: Newspaper,
                title: "Blog Corporativo",
                count: "42 artículos",
                color: "from-indigo-500 to-purple-500",
                gradient: "from-indigo-50 to-purple-50",
                description: "Insights y mejores prácticas empresariales"
              },
              {
                icon: Calendar,
                title: "Eventos & Webinars",
                count: "18 eventos",
                color: "from-emerald-500 to-green-500",
                gradient: "from-emerald-50 to-green-50",
                description: "Capacitaciones y networking profesional"
              },
              {
                icon: TrendingUp,
                title: "Normativa Legal",
                count: "27 actualizaciones",
                color: "from-amber-500 to-orange-500",
                gradient: "from-amber-50 to-orange-50",
                description: "Cambios legislativos que afectan negocios"
              }
            ].map((category, i) => (
              <CategoryCard key={i} category={category} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-blue-100 text-sm font-semibold mb-6">
              <Newspaper className="w-4 h-4" />
              <TranslateText text="Mantente Actualizado" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              <TranslateText text="No te pierdas" />{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                <TranslateText text="ninguna novedad" />
              </span>
            </h2>
            
            <p className="text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              <TranslateText text="Recibe análisis exclusivos, tendencias del mercado y actualizaciones legales directamente en tu correo." />
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200/50 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-500/30"
              />
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-white to-blue-50 text-blue-700 font-bold hover:shadow-2xl hover:-translate-y-1 transition-all">
                <TranslateText text="Suscribirme" />
              </button>
            </div>
            
            <p className="text-blue-200/70 text-sm mt-4">
              <TranslateText text="Sin spam. Puedes darte de baja en cualquier momento." />
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Enhanced News Card Component
function NewsCard({ 
  item, 
  index, 
  isBookmarked, 
  onBookmark 
}: { 
  item: NewsItem; 
  index: number; 
  isBookmarked: boolean;
  onBookmark: (title: string, e: React.MouseEvent) => void;
}) {
  return (
    <Link href={`/noticias/${encodeURIComponent(item.title)}`}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden cursor-pointer border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
      >
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {item.featured && (
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg">
              <Star className="w-3 h-3" fill="currentColor" />
              <TranslateText text="Destacado" />
            </span>
          )}
          {item.category && (
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg">
              {item.category}
            </span>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => onBookmark(item.title, e)}
          className={`absolute top-4 right-4 z-10 p-2 rounded-lg backdrop-blur-sm transition-all ${isBookmarked 
            ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' 
            : 'bg-white/20 text-slate-600 hover:text-amber-500 dark:bg-slate-800/20 dark:text-slate-400'}`}
        >
          <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
        </button>

        {/* Image */}
        <div className="relative h-52 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
          {item.image_url ? (
            <Image
              src={item.image_url.startsWith('http') ? item.image_url : `${process.env.NEXT_PUBLIC_API_URL}${item.image_url}`}
              alt={item.altText || item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Newspaper className="w-16 h-16 text-blue-200 dark:text-slate-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
          
          {/* Views Counter */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white/90 text-sm">
            <Eye className="w-4 h-4" />
            <span>{(item.views || 0).toLocaleString()}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(item.date).toLocaleDateString("es-MX", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {item.readTime || 5} min
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-1 mb-4 line-clamp-3">
            {item.description}
          </p>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.slice(0, 3).map((tag, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                <TranslateText text="Leer más" />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              {item.author && (
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Por {item.author}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

// Enhanced Category Card Component
function CategoryCard({
  category,
  index,
}: {
  category: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    count: string;
    color: string;
    gradient: string;
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
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 cursor-pointer border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${category.color}`} />
      
      {/* Icon */}
      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="w-8 h-8 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 text-center">
        {category.title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400 mb-4 text-center text-sm leading-relaxed">
        {category.description}
      </p>

      {/* Count */}
      <div className="text-center">
        <span className={`inline-flex items-center gap-2 text-lg font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
          {category.count}
        </span>
      </div>

      {/* Hover arrow */}
      <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-slate-400 dark:text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </motion.div>
  );
}