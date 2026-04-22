"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, Calendar, ArrowRight, Search } from "lucide-react";
import Footer from "@/components/Footer";
import Section from "@/app/components/Section";
import SubpageHero from "@/components/SubpageHero";
import { TranslateText } from "@/components/TranslateText";

interface NewsItem {
  title: string;
  description: string;
  date: string;
  image_url?: string;
  category?: string;
}

const slugify = (s: string) =>
  s ? s.toString().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036F]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-") : "";

export default function NoticiasPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`)
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.news || [];
        setNews(items);
      })
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SubpageHero 
        badge="Actualidad"
        title="Noticias Bausen"
        variant="servicesBlue"
        subtitle="Manténgase informado sobre las últimas tendencias en capital humano, cambios legislativos y eventos corporativos de alto impacto."
      />

      <Section variant="white" size="lg">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic">
            Artículos <span className="text-blue-700">Destacados</span>
          </h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar noticias..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-sm font-bold outline-none focus:border-blue-700 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-slate-50 dark:bg-slate-900 animate-pulse" />
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

      <Footer />
    </div>
  );
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/noticias/${slugify(item.title)}`} className="block h-full">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
          <div className="relative h-56 overflow-hidden bg-slate-50 dark:bg-slate-800">
            {item.image_url && (
              <Image 
                src={`${process.env.NEXT_PUBLIC_API_URL}${item.image_url}`} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
            )}
          </div>
          <div className="p-8 flex flex-col flex-1">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4 font-black text-[10px] uppercase tracking-widest">
              <Calendar size={12} />
              {new Date(item.date).toLocaleDateString()}
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 leading-tight">
              {item.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8 flex-1 text-justify">
              {item.description}
            </p>
            <div className="pt-6 border-t border-slate-50 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-blue-700 flex items-center gap-2">
              Leer más <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
