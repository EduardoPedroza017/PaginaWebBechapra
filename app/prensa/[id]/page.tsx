"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  ExternalLink,
  ArrowLeft,
  Download,
  Share2,
  Clock,
  FileText,
  Copy,
  Check,
  Zap,
  ChevronDown,
} from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { TranslateText } from "@/components/TranslateText";

interface PressItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
  link?: string;
  file_url?: string;
}

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('prensa-theme');
  if (saved) return saved as 'light' | 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function PressDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [press, setPress] = useState<PressItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPress, setRelatedPress] = useState<PressItem[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [copied, setCopied] = useState(false);
  const mediaQueryRef = useRef<MediaQueryList | null>(null);
  const handlerRef = useRef<((e: MediaQueryListEvent) => void) | null>(null);

  useEffect(() => {
    if (!params?.id) return;
    fetch(`/api/press`)
      .then((res) => res.json())
      .then((data: PressItem[]) => {
        const found = data.find((item: PressItem) => item.id === params.id);
        setPress(found || null);

        // Get 3 related press items (excluding current)
        const related = data
          .filter((item: PressItem) => item.id !== params.id)
          .slice(0, 3);
        setRelatedPress(related);
      })
      .finally(() => setLoading(false));
  }, [params]);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: press?.title,
          text: press?.excerpt || press?.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <main style={{ background: theme === 'dark' ? '#0f172a' : '#f9fafb' }} className="min-h-screen transition-colors duration-300">
        {/* Hero Skeleton */}
        <div style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%)'
            : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
        }} className="pt-24 pb-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="animate-pulse">
              <div className="w-32 h-10 bg-white/20 rounded-xl mb-8" />
              <div className="w-40 h-6 bg-white/20 rounded-full mb-6" />
              <div className="w-3/4 h-12 bg-white/20 rounded-lg mb-4" />
              <div className="w-1/2 h-12 bg-white/20 rounded-lg" />
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 -mt-20">
          <div style={{
            background: theme === 'dark' ? '#1e293b' : 'white',
            boxShadow: theme === 'dark' ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
          }} className="rounded-3xl p-10 animate-pulse transition-colors duration-300">
            <div className="space-y-4">
              <div style={{ background: theme === 'dark' ? '#475569' : '#e5e7eb' }} className="w-full h-4 rounded transition-colors duration-300" />
              <div style={{ background: theme === 'dark' ? '#475569' : '#e5e7eb' }} className="w-full h-4 rounded transition-colors duration-300" />
              <div style={{ background: theme === 'dark' ? '#475569' : '#e5e7eb' }} className="w-3/4 h-4 rounded transition-colors duration-300" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!press) {
    return (
      <main style={{ background: theme === 'dark' ? '#0f172a' : '#f9fafb' }} className="min-h-screen flex items-center justify-center transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div style={{
            background: theme === 'dark' ? '#1e293b' : '#f3f4f6'
          }} className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center transition-colors duration-300">
            <FileText size={40} style={{ color: theme === 'dark' ? '#64748b' : '#9ca3af' }} />
          </div>
          <h1 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1f2937' }} className="text-2xl font-bold mb-2 transition-colors duration-300">
            <TranslateText text="Comunicado no encontrado" />
          </h1>
          <p style={{ color: theme === 'dark' ? '#94a3b8' : '#6b7280' }} className="mb-6 transition-colors duration-300">
            <TranslateText text="El comunicado que buscas no existe o fue eliminado." />
          </p>
          <Link
            href="/prensa"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={18} />
            <TranslateText text="Volver a Comunicados" />
          </Link>
        </motion.div>
      </main>
    );
  }

  const formattedDate = new Date(press.date).toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Estimate reading time (roughly 200 words per minute) with null-safe excerpt
  const excerptText = (press.excerpt || press.content || press.title || '').toString();
  const wordCount = excerptText.trim() ? excerptText.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main style={{ background: theme === 'dark' ? '#0f172a' : '#f9fafb' }} className="min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%)'
          : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
      }} className="relative pt-24 pb-40 overflow-hidden transition-colors duration-300">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.35, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-linear-to-br from-cyan-400/20 to-blue-500/20 dark:from-cyan-500/15 dark:to-blue-600/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-48 -left-32 w-[500px] h-[500px] bg-linear-to-tr from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255,255,255,.5) 25%, rgba(255,255,255,.5) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.5) 75%, rgba(255,255,255,.5) 76%, transparent 77%, transparent),
                                  linear-gradient(90deg, transparent 24%, rgba(255,255,255,.5) 25%, rgba(255,255,255,.5) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.5) 75%, rgba(255,255,255,.5) 76%, transparent 77%, transparent)`,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => router.back()}
            className="group flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md text-white rounded-xl font-medium mb-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <TranslateText text="Volver a Comunicados" />
          </motion.button>

          {/* Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-blue-100 text-sm font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Calendar size={16} />
              {new Date(press.date).toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </motion.span>
            
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-cyan-400/30 to-blue-400/30 backdrop-blur-md rounded-full text-cyan-100 text-sm font-semibold border border-cyan-400/50 hover:from-cyan-400/40 hover:to-blue-400/40 transition-all duration-300"
            >
              <Zap size={16} />
              {readingTime} <TranslateText text="min" />
            </motion.span>

            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-blue-100 text-xs font-semibold border border-white/20 uppercase tracking-wider"
            >
              <Clock size={14} />
              <TranslateText text="Lectura" />
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4"
          >
            {press.title}
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="h-1 w-20 bg-linear-to-r from-cyan-400 to-blue-400 rounded-full origin-left"
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 -mt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Content Card */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: theme === 'dark' ? '#1e293b' : 'white',
              boxShadow: theme === 'dark' ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
            }}
            className="rounded-3xl overflow-hidden transition-all duration-300 border border-transparent hover:border-blue-500/20 dark:hover:border-blue-500/30"
          >
            {/* Top Accent */}
            <motion.div 
              className="h-1.5 bg-linear-to-r from-blue-600 via-indigo-500 to-purple-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />

            <div className="p-8 md:p-12">
              {/* Content */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="prose prose-lg max-w-none"
              >
                <p style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }} className="text-base md:text-lg leading-8 whitespace-pre-wrap transition-colors duration-300">
                  {press.excerpt}
                </p>
              </motion.div>

              {/* External Link */}
              {press.link && (
                <motion.a
                  href={press.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: theme === 'dark' ? '#1e3a5f' : '#eff6ff',
                    color: '#2563eb'
                  }}
                  className="inline-flex items-center gap-3 mt-10 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 border border-blue-200/50 dark:border-blue-400/30"
                >
                  <ExternalLink size={18} />
                  <TranslateText text="Ver enlace externo" />
                </motion.a>
              )}

              {/* File Preview & Download */}
              {press.file_url && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  style={{
                    background: theme === 'dark' ? 'rgba(15, 23, 42, 0.4)' : 'linear-gradient(135deg, rgba(248,250,252,1) 0%, rgba(241,245,249,1) 100%)',
                    borderColor: theme === 'dark' ? '#475569' : '#e2e8f0'
                  }} 
                  className="mt-10 rounded-2xl border backdrop-blur-sm transition-all duration-300 overflow-hidden"
                >
                  {/* Image Preview */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="relative w-full bg-gray-100 dark:bg-slate-800 aspect-video overflow-hidden"
                  >
                    <img
                      src={`http://localhost:5000${press.file_url}`}
                      alt="Archivo adjunto"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay de opcacidad en hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-lg"
                      >
                        <Download size={28} className="text-blue-600 dark:text-blue-400" />
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  {/* Download Section */}
                  <div className="p-8">
                    <h3 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1f2937' }} className="flex items-center gap-3 font-bold mb-6 transition-colors duration-300 text-lg">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-2 rounded-lg bg-blue-500/20"
                      >
                        <FileText size={20} className="text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <TranslateText text="Archivo adjunto" />
                    </h3>
                    
                    {/* File Info */}
                    <div style={{ 
                      background: theme === 'dark' ? '#1e293b' : '#f8fafc',
                      borderColor: theme === 'dark' ? '#334155' : '#cbd5e1'
                    }} className="p-4 rounded-lg border mb-6 flex items-center justify-between">
                      <div>
                        <p style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }} className="text-sm font-medium">
                          {press.file_url.split("/").pop()}
                        </p>
                        <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }} className="text-xs mt-1">
                          <TranslateText text="Imagen JPG/PNG" />
                        </p>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FileText size={24} className="text-blue-600 dark:text-blue-400" />
                      </motion.div>
                    </div>

                    {/* Download Button */}
                    <motion.a
                      href={`http://localhost:5000${press.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:shadow-xl transition-all duration-300"
                    >
                      <Download size={20} />
                      <span><TranslateText text="Descargar archivo" /></span>
                      <motion.div
                        animate={{ y: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </motion.a>

                    {/* Additional Info */}
                    <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }} className="text-center text-sm mt-4">
                      <TranslateText text="Haz clic para descargar o haz clic en la imagen arriba" />
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Divider with Icon */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="my-10 flex items-center gap-4"
              >
                <div style={{ borderColor: theme === 'dark' ? '#475569' : '#e5e7eb' }} className="flex-1 h-px border-t transition-colors duration-300" />
                <div style={{ color: theme === 'dark' ? '#94a3b8' : '#9ca3af' }}>
                  <Share2 size={18} />
                </div>
                <div style={{ borderColor: theme === 'dark' ? '#475569' : '#e5e7eb' }} className="flex-1 h-px border-t transition-colors duration-300" />
              </motion.div>

              {/* Share Section */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4"
              >
                <div style={{ color: theme === 'dark' ? '#94a3b8' : '#6b7280' }} className="text-sm transition-colors duration-300">
                  <TranslateText text="¿Te resultó útil? Comparte este comunicado" />
                </div>
                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: copied 
                      ? 'rgb(34, 197, 94)' 
                      : (theme === 'dark' ? '#1e293b' : '#f3f4f6'),
                    color: copied 
                      ? 'white' 
                      : (theme === 'dark' ? '#e2e8f0' : '#374151'),
                    borderColor: theme === 'dark' ? '#475569' : 'transparent'
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all duration-300"
                >
                  {copied ? (
                    <>
                      <Check size={18} />
                      <TranslateText text="¡Copiado!" />
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      <TranslateText text="Copiar enlace" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </motion.article>

          {/* Related Press */}
          {relatedPress.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-20"
            >
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ color: theme === 'dark' ? '#e2e8f0' : '#111827' }} 
                className="text-3xl font-black mb-8 transition-colors duration-300 flex items-center gap-3"
              >
                <Zap size={28} className="text-blue-600 dark:text-blue-400" />
                <TranslateText text="Otros comunicados" />
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPress.map((item, i) => (
                  <Link
                    key={item.id}
                    href={`/prensa/${item.id}`}
                    className="group h-full"
                  >
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                      style={{
                        background: theme === 'dark' ? '#1e293b' : 'white',
                        borderColor: theme === 'dark' ? '#475569' : '#e5e7eb',
                        boxShadow: theme === 'dark' ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.08)'
                      }}
                      className="h-full rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-500/50 dark:hover:border-blue-500/40"
                    >
                      <motion.div 
                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 + 0.2 }}
                      >
                        <Calendar size={14} />
                        {new Date(item.date).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </motion.div>
                      <h3 style={{ color: theme === 'dark' ? '#e2e8f0' : '#111827' }} className="text-lg font-bold group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      <p style={{ color: theme === 'dark' ? '#94a3b8' : '#6b7280' }} className="text-sm line-clamp-2">
                        {item.excerpt}
                      </p>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Back to Press List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <Link
              href="/prensa"
              className="inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <TranslateText text="Ver todos los comunicados" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
