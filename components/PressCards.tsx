"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TranslateText } from '@/components/TranslateText';
import { OptimizedImage } from '@/lib/images/image-utils';
import { FileText, ArrowRight, Calendar } from 'lucide-react';

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 animate-pulse h-96" />
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/press`);
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.items || data.data || []);

        const normalized = items.map((p: any, i: number) => ({
          id: String(p.id ?? i),
          title: String(p.title ?? ""),
          date: String(p.date ?? p.published_date ?? ""),
          excerpt: String(p.excerpt || p.description || ""),
          link: `/prensa/${p.slug || i}`,
          image_url: p.file_url || p.image_url || "",
        }));
        setPress(normalized.slice(0, 3));
      } catch (error) {
        console.error('Error fetching press:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPress();
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 dark:border-blue-800/50">
              <TranslateText text="Sala de prensa" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic">
              <TranslateText text="Comunicados Oficiales" />
            </h2>
          </motion.div>
        </div>

        {loading ? (
          <PressSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {press.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  href={item.link || '/prensa'}
                  className="block h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-50 dark:bg-slate-800">
                    {item.image_url && (
                        <OptimizedImage
                            src={item.image_url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_API_URL}${item.image_url}` : item.image_url}
                            alt={item.title}
                            className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
                        />
                    )}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-blue-700 shadow-sm">
                      <FileText size={16} />
                    </div>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center gap-3 text-blue-700 dark:text-blue-400 mb-4 font-black text-[10px] uppercase tracking-widest">
                      <Calendar size={14} />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 line-clamp-2 italic">
                        {item.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8 flex-1 text-justify">
                        {item.excerpt}
                    </p>
                    <div className="pt-6 border-t border-slate-50 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-blue-700 flex items-center gap-2">
                        Leer más <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
