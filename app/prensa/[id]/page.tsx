"use client";

import React, { useEffect, useState } from "react";
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

interface PressItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
  file_url?: string;
}

export default function PressDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [press, setPress] = useState<PressItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPress, setRelatedPress] = useState<PressItem[]>([]);

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
      <main className="min-h-screen bg-gray-50">
        {/* Hero Skeleton */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 pt-24 pb-32">
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
          <div className="bg-white rounded-3xl p-10 shadow-xl animate-pulse">
            <div className="space-y-4">
              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-3/4 h-4 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!press) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <FileText size={40} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Comunicado no encontrado
          </h1>
          <p className="text-gray-500 mb-6">
            El comunicado que buscas no existe o fue eliminado.
          </p>
          <Link
            href="/prensa"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Volver a Comunicados
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
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 pt-24 pb-40 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl"
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
            Volver a Comunicados
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
              {readingTime} min de lectura
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
            className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden"
          >
            {/* Top Accent */}
            <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />

            <div className="p-8 md:p-12">
              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed whitespace-pre-line">
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
                  className="inline-flex items-center gap-3 mt-8 px-6 py-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors duration-300"
                >
                  <ExternalLink size={18} />
                  Ver enlace externo
                </motion.a>
              )}

              {/* File Download */}
              {press.file_url && (
                <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                  <h3 className="flex items-center gap-2 text-gray-800 font-bold mb-4">
                    <FileText size={20} className="text-blue-600" />
                    Archivo adjunto
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
                    Descargar archivo
                    {press.file_url.split("/").pop() && (
                      <span className="ml-2 px-3 py-1 bg-white/20 rounded-lg text-sm">
                        {press.file_url.split("/").pop()}
                      </span>
                    )}
                  </motion.a>
                </div>
              )}

              {/* Divider */}
              <hr className="my-8 border-gray-200" />

              {/* Share Section */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-gray-500 text-sm">
                  ¿Te resultó útil este comunicado? Compártelo.
                </div>
                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-300"
                >
                  <Share2 size={18} />
                  Compartir
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Otros comunicados
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
                      className="h-full bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
                        <Calendar size={14} />
                        {new Date(item.date).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
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
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              <ArrowLeft size={18} />
              Ver todos los comunicados
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
