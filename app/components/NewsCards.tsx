'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TranslateText } from '@/components/TranslateText';

interface NewsItem {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image_url?: string;
}

const NewsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800"
        >
          <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-1/4" />
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-5/6" />
            </div>
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-32" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default function NewsCards() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/news');
        const data = await response.json();
        setNews(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              <TranslateText text="Blog y noticias" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              <TranslateText text="Últimas Noticias" />
            </h2>
          </motion.div>
        </div>

        {loading ? (
          <NewsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/20 transition-all duration-300">
                  {item.image_url && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {formatDate(item.date)}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    <Link
                      href="/noticias"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:gap-2 transition-all"
                    >
                      <TranslateText text="Leer más" />
                      <svg
                        className="w-4 h-4 ml-2 group-hover:ml-3 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
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
            href="/noticias"
            className="inline-flex items-center px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
          >
            <TranslateText text="Ver todas las noticias" />
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
