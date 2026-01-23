"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Clock } from "lucide-react";
import Footer from "@/components/Footer";
import { TranslateText } from "@/components/TranslateText";
import PressHero from "./components/PressHero";
import PressFilter from "./components/PressFilter";
import { motion } from 'framer-motion';
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
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
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
      .then((data: unknown) => {
        const rec = data as Record<string, unknown>;
        const list = Array.isArray(rec.items)
          ? (rec.items as unknown[])
          : (rec.rows as unknown[]) || (rec.results as unknown[]) || [];

        const withId = list.map((it: unknown, i: number) => {
          const obj = it as Record<string, unknown>;
          return {
            title: String(obj.title ?? ""),
            excerpt: obj.excerpt ? String(obj.excerpt) : undefined,
            date: obj.date ? String(obj.date) : undefined,
            slug: obj.slug ? String(obj.slug) : undefined,
            file_url: obj.file_url ? String(obj.file_url) : undefined,
            link: obj.link ? String(obj.link) : undefined,
            __fid: String(obj.slug ?? obj.id ?? i)
          } as PressItem;
        });
        setItems(withId);
        setVisible(withId);
      })
      .catch(() => {
        setItems([]);
        setVisible([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Prepare data for the filter component (memoized to avoid identity changes)
  type FilterItem = { id: string; title: string; date: string; excerpt: string; link?: string };
  const pressForFilter: FilterItem[] = useMemo(
    () =>
      items.map((it) => ({
        id: it.__fid || it.slug || "",
        title: it.title,
        date: it.date || "",
        excerpt: it.excerpt || "",
        link: it.link || it.file_url || ""
      })),
    [items]
  );

  const handleFilter = useCallback((filtered: { id: string }[]) => {
    const ids = new Set(filtered.map((f) => f.id));
    setVisible(items.filter((it) => ids.has(it.__fid || it.slug || "")));
  }, [items]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PressHero />

      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div id="comunicados" className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{<TranslateText text="Comunicados" />}</h2>
            <p className="text-sm text-slate-600">Listado público de comunicados.</p>
          </div>

          <PressFilter press={pressForFilter} onFilter={handleFilter} totalCount={items.length} filteredCount={visible.length} />

          {loading ? (
            <p>Cargando...</p>
          ) : visible.length === 0 ? (
            <p>No hay comunicados.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((it, i) => (
                <motion.div
                  key={it.__fid || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <article className="group bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                    {it.file_url && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <OptimizedImage
                          src={it.file_url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_API_URL || ''}${it.file_url}` : it.file_url}
                          alt={it.title}
                          className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{formatDate(it.date)}</p>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        <Link href={`/prensa/${it.slug || slugify(it.title)}`}>{it.title}</Link>
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">{it.excerpt}</p>
                      <Link href={`/prensa/${it.slug || slugify(it.title)}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:gap-2 transition-all">
                        Ver comunicado
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </article>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
