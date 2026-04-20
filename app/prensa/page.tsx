"use client";

import React, { useEffect, useState, useMemo, useCallback, useRef, MouseEvent } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, Newspaper, Search, Sparkles, Filter, FileText } from "lucide-react";
import Footer from "@/components/Footer";
import Section from "@/app/components/Section";
import SubpageHero from "@/components/SubpageHero";
import { TranslateText } from "@/components/TranslateText";
import PressFilter from "./components/PressFilter";
import { OptimizedImage } from '@/lib/images/image-utils';

interface PressItem {
  title: string;
  excerpt?: string;
  date?: string;
  slug?: string;
  file_url?: string;
  link?: string;
  __fid?: string;
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

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function PrensaPage() {
  const [items, setItems] = useState<PressItem[]>([]);
  const [visible, setVisible] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL ? String(process.env.NEXT_PUBLIC_API_URL).replace(/\/$/, "") : "";
    const url = base ? `${base}/api/press` : "/api/backend/press";

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Fetch error");
        return r.json();
      })
      .then((data: any) => {
        const list = data.items || data.rows || data.results || data || [];
        const withId = list.map((it: any, i: number) => ({
          title: String(it.title ?? ""),
          excerpt: it.excerpt || it.description || "",
          date: it.date || it.published_date || "",
          slug: it.slug || slugify(it.title),
          file_url: it.file_url || it.image_url || "",
          link: it.link || it.file_url || "",
          __fid: String(it.slug ?? it.id ?? i)
        }));
        setItems(withId);
        setVisible(withId);
      })
      .catch(() => {
        setItems([]);
        setVisible([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const pressForFilter = useMemo(
    () => items.map((it) => ({
      id: it.__fid || it.slug || "",
      title: it.title,
      date: it.date || "",
      excerpt: it.excerpt || "",
      link: it.link || it.file_url || ""
    })),
    [items]
  );

  const handleFilter = useCallback((filtered: any[]) => {
    const ids = new Set(filtered.map((f) => f.id));
    setVisible(items.filter((it) => ids.has(it.__fid || it.slug || "")));
  }, [items]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SubpageHero 
        badge="Comunicación Oficial"
        title="Sala de Prensa"
        subtitle="Mantenemos a los medios y al público informados sobre nuestras iniciativas corporativas y logros estratégicos."
      />

      {/* Filter & Stats Section */}
      <Section variant="blue" className="-mt-20 relative z-20">
        <PressFilter 
          press={pressForFilter} 
          onFilter={handleFilter} 
          totalCount={items.length} 
          filteredCount={visible.length} 
        />
      </Section>

      {/* Press Grid */}
      <Section variant="white" size="lg">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
            <Newspaper size={24} />
          </div>
          <div>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Últimos Comunicados</h2>
            <p className="text-slate-500 font-medium">Información oficial actualizada para prensa y asociados.</p>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 animate-pulse" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-[3rem]">
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">No se encontraron resultados</h3>
            <p className="text-slate-500 mt-2">Intente ajustar los filtros de búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {visible.map((it, i) => (
              <PressCard key={it.__fid || i} item={it} index={i} />
            ))}
          </div>
        )}
      </Section>

      {/* Media Contact CTA */}
      <Section variant="blue" size="md">
        <div className="bg-slate-950 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="relative z-10 text-center space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter">¿Requiere información de prensa?</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">Nuestro equipo de comunicación está disponible para atender solicitudes de entrevistas, materiales gráficos y datos institucionales.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <Link
                href="/#contacto"
                className="px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:bg-blue-500 transition-all hover:-translate-y-1"
              >
                Solicitar Media Kit
              </Link>
              <Link
                href="mailto:prensa@bausen.com.mx"
                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 transition-all"
              >
                Contactar Comunicación
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

function PressCard({ item, index }: { item: PressItem; index: number }) {
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

  const profileUrl = `/prensa/${item.slug || slugify(item.title)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      className="group relative h-full"
    >
      <Link href={profileUrl} className="block h-full">
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
          
          {item.file_url && (
            <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <OptimizedImage
                src={item.file_url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_API_URL || ''}${item.file_url}` : item.file_url}
                alt={item.title}
                className="object-cover transition-transform duration-700 group-hover:scale-110 w-full h-full"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-6 left-6">
                <div className="w-10 h-10 rounded-xl bg-blue-600/80 backdrop-blur-md flex items-center justify-center text-white">
                  <FileText size={20} />
                </div>
              </div>
            </div>
          )}

          <div className="p-10 flex flex-col flex-1 relative z-20">
            <div className="flex items-center gap-3 text-blue-600 mb-4">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">{formatDate(item.date)}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
              {item.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed mb-8 line-clamp-3 flex-1">
              {item.excerpt}
            </p>
            <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest pt-6 border-t border-slate-100 dark:border-slate-800">
              Leer Comunicado <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl bg-blue-600/5 -z-10 transition-opacity duration-500" />
    </motion.div>
  );
}
