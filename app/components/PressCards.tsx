'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TranslateText } from '@/components/TranslateText';

interface PressItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
  image_url?: string;
}

const PressSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-800/90 rounded-xl p-6 border border-gray-200 dark:border-slate-700"
        >
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-1/3" />
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-4/5" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-3/4" />
            </div>
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-28" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default function PressCards() {
  const [press, setPress] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPress = async () => {
      try {
        const response = await fetch('/api/eventos');
        const data = await response.json();
        // Normalize response: accept array or paginated object { items, data, results }
        const items = Array.isArray(data)
          ? data
          : (data.items || data.data || data.results || []);

        const API = process.env.NEXT_PUBLIC_API_URL || '';
        const normalized = (Array.isArray(items) ? items : []).map((p: Record<string, unknown>, index: number) => {
          const pickString = (...keys: string[]) => {
            for (const key of keys) {
              const value = p[key];
              if (typeof value === 'string' && value) return value;
            }
            return '';
          };

          const rawImage = pickString('imagen', 'image', 'foto', 'file_url', 'image_url');
          const imageStr = rawImage ? String(rawImage) : '';
          const resolvedImage = imageStr.startsWith('/uploads/') ? `${API}${imageStr}` : (imageStr || undefined);
          const status = p['status'] || p['active'] || p['estado'];

          return {
            id: String(p['id'] || p['_id'] || `event-${index}`),
            title: pickString('titulo', 'title', 'nombre'),
            date: pickString('fecha_hora', 'fecha', 'date'),
            excerpt: pickString('descripcion', 'description', 'summary', 'excerpt'),
            link: '/eventos',
            image_url: resolvedImage,
            status,
          } as PressItem;
        });

        const activeOnly = normalized.filter((item: any) => item.status === 'active' || item.status === true || String(item.status) === 'true');
        setPress(activeOnly.slice(0, 3));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPress();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              <TranslateText text="Calendario" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              <TranslateText text="Eventos Destacados" />
            </h2>
          </motion.div>
        </div>

        {loading ? (
          <PressSkeleton />
        ) : press.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              <TranslateText text="No hay eventos disponibles" />
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-center">
              <TranslateText text="Por favor, intenta más tarde" />
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {press.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
                  >
                    <a
                      href={item.link || '/eventos'}
                      className={`block overflow-hidden rounded-3xl transition-all duration-500 ${
                        index === 0
                          ? "bg-linear-to-br from-white via-blue-50/50 to-white shadow-2xl shadow-blue-100/80 dark:border dark:border-blue-800/40 dark:bg-slate-800/90"
                          : "bg-white shadow-lg hover:shadow-2xl dark:bg-slate-800/90"
                      }`}
                    >
                      <div className={`relative overflow-hidden ${index === 0 ? "h-72 lg:h-80" : "h-48"}`}>
                        {item.image_url ? (
                          <img src={String(item.image_url)} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Sin imagen</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/20 to-transparent dark:from-slate-950/80 dark:via-slate-900/40 dark:to-transparent" />
                        <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-white/95 backdrop-blur-sm dark:bg-slate-800/95 dark:border dark:border-slate-700">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1"/></svg>
                        </div>
                        {index === 0 && (
                          <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-slate-950/45 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white backdrop-blur-md">
                            Evento clave
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{formatDate(item.date)}</p>
                        <h3 className={`${index === 0 ? "text-2xl lg:text-3xl" : "text-xl"} font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors`}>{item.title}</h3>
                        <p className={`${index === 0 ? "max-w-2xl text-base line-clamp-4" : "line-clamp-3"} text-slate-600 dark:text-slate-300 mb-4 grow`}>{item.excerpt}</p>
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">Ver evento
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                          </span>
                        </div>
                      </div>
                    </a>
                  </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/eventos"
            className="inline-flex items-center px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
          >
            <TranslateText text="Ver todos los eventos" />
            <svg
              className="w-5 h-5 ml-2"
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
