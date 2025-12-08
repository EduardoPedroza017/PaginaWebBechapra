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
} from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { TranslateText } from "@/components/TranslateText";

interface PressItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
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
  const mediaQueryRef = useRef<MediaQueryList | null>(null);
  const handlerRef = useRef<((e: MediaQueryListEvent) => void) | null>(null);

  useEffect(() => {
    if (!params?.id) return;
    fetch(`http://localhost:5000/api/press`)
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
          text: press?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
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

  // Estimate reading time (roughly 200 words per minute)
  const wordCount = press.excerpt.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main style={{ background: theme === 'dark' ? '#0f172a' : '#f9fafb' }} className="min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%)'
          : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
      }} className="relative pt-24 pb-40 overflow-hidden transition-colors duration-300">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 dark:from-cyan-500/15 dark:to-blue-600/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-48 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => router.back()}
            className="group flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium mb-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <TranslateText text="Volver a Comunicados" />
          </motion.button>

          {/* Date & Reading Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-100 text-sm font-medium border border-white/20">
              <Calendar size={16} />
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-100 text-sm font-medium border border-white/20">
              <Clock size={16} />
              {readingTime} <TranslateText text="min de lectura" />
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight"
          >
            {press.title}
          </motion.h1>
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
            className="rounded-3xl overflow-hidden transition-colors duration-300"
          >
            {/* Top Accent */}
            <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />

            <div className="p-8 md:p-12">
              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <p style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }} className="text-lg md:text-xl leading-relaxed whitespace-pre-line transition-colors duration-300">
                  {press.excerpt}
                </p>
              </div>

              {/* External Link */}
              {press.link && (
                <motion.a
                  href={press.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: theme === 'dark' ? '#1e3a5f' : '#eff6ff',
                    color: '#2563eb'
                  }}
                  className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-xl font-semibold hover:opacity-80 transition-all duration-300"
                >
                  <ExternalLink size={18} />
                  <TranslateText text="Ver enlace externo" />
                </motion.a>
              )}

              {/* File Download */}
              {press.file_url && (
                <div style={{
                  background: theme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)',
                  borderColor: theme === 'dark' ? '#475569' : '#e5e7eb'
                }} className="mt-8 p-6 rounded-2xl border transition-colors duration-300">
                  <h3 style={{ color: theme === 'dark' ? '#e2e8f0' : '#1f2937' }} className="flex items-center gap-2 font-bold mb-4 transition-colors duration-300">
                    <FileText size={20} className="text-blue-600" />
                    <TranslateText text="Archivo adjunto" />
                  </h3>
                  <motion.a
                    href={`http://localhost:5000${press.file_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all duration-300"
                  >
                    <Download size={18} />
                    <TranslateText text="Descargar archivo" />
                    {press.file_url.split("/").pop() && (
                      <span className="ml-2 px-3 py-1 bg-white/20 rounded-lg text-sm">
                        {press.file_url.split("/").pop()}
                      </span>
                    )}
                  </motion.a>
                </div>
              )}

              {/* Divider */}
              <hr style={{ borderColor: theme === 'dark' ? '#475569' : '#e5e7eb' }} className="my-8 transition-colors duration-300" />

              {/* Share Section */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div style={{ color: theme === 'dark' ? '#94a3b8' : '#6b7280' }} className="text-sm transition-colors duration-300">
                  <TranslateText text="¿Te resultó útil este comunicado? Compártelo." />
                </div>
                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: theme === 'dark' ? '#1e293b' : '#f3f4f6',
                    color: theme === 'dark' ? '#e2e8f0' : '#374151',
                    borderColor: theme === 'dark' ? '#475569' : 'transparent'
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium border transition-all duration-300"
                >
                  <Share2 size={18} />
                  <TranslateText text="Compartir" />
                </motion.button>
              </div>
            </div>
          </motion.article>

          {/* Related Press */}
          {relatedPress.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16"
            >
              <h2 style={{ color: theme === 'dark' ? '#e2e8f0' : '#111827' }} className="text-2xl font-bold mb-6 transition-colors duration-300">
                <TranslateText text="Otros comunicados" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPress.map((item, i) => (
                  <Link
                    key={item.id}
                    href={`/prensa/${item.id}`}
                    className="group"
                  >
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                      style={{
                        background: theme === 'dark' ? '#1e293b' : 'white',
                        borderColor: theme === 'dark' ? '#475569' : '#f3f4f6',
                        boxShadow: theme === 'dark' ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                      className="h-full rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                    >
                      <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
                        <Calendar size={14} />
                        {new Date(item.date).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <h3 style={{ color: theme === 'dark' ? '#e2e8f0' : '#111827' }} className="text-lg font-bold group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </h3>
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
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 text-center"
          >
            <Link
              href="/prensa"
              style={{ color: '#2563eb' }}
              className="inline-flex items-center gap-2 font-semibold hover:text-blue-700 transition-colors"
            >
              <ArrowLeft size={18} />
              <TranslateText text="Ver todos los comunicados" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
