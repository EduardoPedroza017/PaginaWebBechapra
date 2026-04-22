"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TranslateText } from '@/components/TranslateText';
import { OptimizedImage } from '@/lib/images/image-utils';
import { Calendar, ArrowRight } from 'lucide-react';
import { CardFlat } from '@/components/ui/CardFlat';

interface NewsItem {
  title: string;
  description: string;
  date: string;
  image_url?: string;
  status?: string;
  active?: boolean;
}

const slugify = (s: string) =>
  s
    ? s.toString().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036F]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")
    : "";

export default function NewsCards() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || '';
        const response = await fetch(`${apiBase}/api/news`);
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.news || data.items || []);
        
        const sorted = items.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setNews(sorted.slice(0, 3));
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter">
            <TranslateText text="Últimas Noticias" />
          </h2>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => <div key={i} className="h-96 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <CardFlat>
                  <Link href={`/noticias/${slugify(item.title)}`} className="group h-full flex flex-col">
                    <div className={`relative overflow-hidden bg-slate-50 dark:bg-slate-800 ${index === 0 ? "h-72 lg:h-80" : "h-56"}`}>
                      {item.image_url && (
                        <OptimizedImage
                          src={item.image_url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_API_URL}${item.image_url}` : item.image_url}
                          alt={item.title}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                      {index === 0 && (
                        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-slate-950/45 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white backdrop-blur-md">
                          Nota destacada
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4 font-black text-[10px] uppercase tracking-widest">
                        <Calendar size={12} />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      <h3 className={`${index === 0 ? "text-2xl lg:text-3xl" : "text-lg"} font-black text-slate-900 dark:text-white mb-4 leading-tight`}>
                        {item.title}
                      </h3>
                      <p className={`${index === 0 ? "max-w-2xl text-base" : "text-sm"} text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 flex-1 text-justify`}>
                        {item.description}
                      </p>
                      <div className="pt-6 border-t border-slate-50 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-blue-700 flex items-center gap-2">
                        Leer más <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </CardFlat>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
