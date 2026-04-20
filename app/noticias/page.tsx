"use client";

import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, TrendingUp, Calendar, Clock, ArrowRight, Search, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import Section from "@/app/components/Section";
import SubpageHero from "@/components/SubpageHero";
import { TranslateText } from "@/components/TranslateText";

interface NewsItem {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  published_date?: string;
  image_url?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  altText?: string;
  author?: string;
}

const slugify = (s: string) =>
  s
    ? s
        .toString()
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036F]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
    : "";

export default function NoticiasPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const externalApi = process.env.NEXT_PUBLIC_API_URL ? String(process.env.NEXT_PUBLIC_API_URL).replace(/\/$/, '') : '';
    const url = externalApi ? `${externalApi}/api/news` : '/api/backend/news';

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const extractItems = (d: any): NewsItem[] => {
          if (Array.isArray(d)) return d;
          if (d && typeof d === 'object') {
            return d.news || d.items || d.results || d.data || d.rows || [];
          }
          return [];
        };
        const items = extractItems(data);
        const sorted = items.sort((a, b) => new Date((b.date || b.published_date || '')).getTime() - new Date((a.date || a.published_date || '')).getTime());
        setNews(sorted);
      })
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SubpageHero 
        badge="Blog Corporativo"
        title="Noticias y Actualidad"
        subtitle="Manténgase al día con los cambios legislativos, eventos destacados y las últimas tendencias en capital humano."
      />

      {/* Featured News / Grid Section */}
      <Section variant="white" size="lg">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
              Información de <span className="text-blue-600">Alto Impacto</span>
            </h2>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar artículos..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-sm font-bold outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[500px] rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((item, i) => (
              <NewsCard key={i} item={item} index={i} />
            ))}
          </div>
        )}
      </Section>

      {/* Categories / Topics */}
      <Section variant="blue" size="md">
        <div className="bg-slate-950 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">Suscríbase a nuestro Newsletter</h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">Reciba mensualmente un resumen de las actualizaciones legislativas y consejos estratégicos para su empresa.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="su@correo.com" 
                className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-all"
              />
              <button className="px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:bg-blue-500 transition-all">Suscribirse</button>
            </form>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const glowY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const dateStr = new Date(item.date).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative h-full"
    >
      <Link href={`/noticias/${slugify(item.title)}`} className="block h-full">
        <div className="relative h-full bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-slate-200/60 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.08), transparent 40%)`
              ),
            }}
          />
          
          <div className="relative h-64 overflow-hidden">
            {item.image_url ? (
              <Image 
                src={`${process.env.NEXT_PUBLIC_API_URL}${item.image_url}`} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Newspaper className="w-12 h-12 text-slate-300" />
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                {item.category || "General"}
              </span>
            </div>
          </div>

          <div className="p-10 flex flex-col flex-1 relative z-20">
            <div className="flex items-center gap-3 text-blue-600 mb-4">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">{dateStr}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
              <TranslateText text={item.title} />
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed mb-8 line-clamp-3 flex-1">
              <TranslateText text={item.description} />
            </p>
            <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest pt-6 border-t border-slate-100 dark:border-slate-800">
              Leer Artículo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl bg-blue-600/5 -z-10 transition-opacity duration-500" />
    </motion.div>
  );
}
