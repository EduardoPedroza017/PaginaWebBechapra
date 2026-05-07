"use client";

import { useEffect, useState, useMemo, useCallback, useRef, MouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Clock, ArrowRight, Newspaper, Search, Sparkles, FileText } from "lucide-react";
import Footer from "@/components/Footer";
import Section from "@/app/components/Section";
import SubpageHero from "@/components/SubpageHero";
import PressFilter from "./components/PressFilter";
import SpotlightCTA from "@/app/components/SpotlightCTA";
import { OptimizedImage } from "@/lib/images/image-utils";
import { TranslateText } from "@/components/TranslateText";

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
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
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
          __fid: String(it.slug ?? it.id ?? i),
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
    () =>
      items.map((it) => ({
        id: it.__fid || it.slug || "",
        title: it.title,
        date: it.date || "",
        excerpt: it.excerpt || "",
        link: it.link || it.file_url || "",
      })),
    [items]
  );

  const handleFilter = useCallback(
    (filtered: any[]) => {
      const ids = new Set(filtered.map((f) => f.id));
      setVisible(items.filter((it) => ids.has(it.__fid || it.slug || "")));
    },
    [items]
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SubpageHero
        badge="Comunicacion Oficial"
        title="Sala de Prensa"
        variant="servicesBlue"
        subtitle="Mantenemos a los medios y al publico informados sobre nuestras iniciativas corporativas y logros estrategicos."
      />

      <Section variant="blue" className="-mt-20 relative z-20">
        <PressFilter press={pressForFilter} onFilter={handleFilter} totalCount={items.length} filteredCount={visible.length} />
      </Section>

      <Section variant="white" size="lg">
        <div className="mb-16 space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-blue-700 dark:border-blue-800/40 dark:bg-blue-950/30 dark:text-blue-300">
              <Sparkles size={14} />
              <TranslateText text="Radar editorial" />
            </span>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30">
              <Newspaper size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white lg:text-5xl">
                <TranslateText text="Ultimos Comunicados" />
              </h2>
              <p className="font-medium text-slate-500">
                <TranslateText text="Informacion oficial actualizada para prensa y asociados." />
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-[2.5rem] bg-slate-50 animate-pulse dark:bg-slate-900" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-[3rem] bg-slate-50 py-20 text-center dark:bg-slate-900">
            <Search className="mx-auto mb-6 h-16 w-16 text-slate-300" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              <TranslateText text="No se encontraron resultados" />
            </h3>
            <p className="mt-2 text-slate-500">
              <TranslateText text="Intente ajustar los filtros de busqueda." />
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((it, i) => (
              <PressCard key={it.__fid || i} item={it} index={i} />
            ))}
          </div>
        )}
      </Section>

      <SpotlightCTA
        eyebrow="Enlace institucional"
        title="Requiere informacion de prensa?"
        subtitle="Nuestro equipo de comunicacion esta listo para compartir materiales, entrevistas y contexto institucional con una experiencia mas clara y profesional."
        imageSrc="/web/image/servicios/service.png"
        imageAlt="Atencion institucional para prensa"
        primaryLink="/#contacto"
        primaryLabel="Solicitar media kit"
        secondaryLink="mailto:prensa@bausen.com.mx"
        secondaryLabel="Contactar comunicacion"
      />

      <Footer />
    </div>
  );
}

function PressCard({ item, index }: { item: PressItem; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const glowY = useSpring(mouseY, { damping: 20, stiffness: 150 });
  const featured = index === 0;

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const profileUrl = `/prensa/${item.slug || slugify(item.title)}`;
  const imageSrc =
    item.file_url && item.file_url.startsWith("/uploads/")
      ? `${process.env.NEXT_PUBLIC_API_URL || ""}${item.file_url}`
      : item.file_url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      className={`group relative h-full ${featured ? "md:col-span-2" : ""}`}
    >
      <Link href={profileUrl} className="block h-full">
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 ${
            featured
              ? "border-blue-200/80 bg-gradient-to-br from-white via-blue-50/40 to-white shadow-2xl shadow-blue-100/70 dark:border-blue-800/40 dark:bg-slate-900/90 dark:shadow-blue-950/30"
              : "border-slate-200/60 bg-white shadow-xl hover:shadow-2xl dark:border-slate-800/50 dark:bg-slate-900/80"
          }`}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px z-10 rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.08), transparent 40%)`
              ),
            }}
          />

          {imageSrc ? (
            <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${featured ? "h-72 lg:h-80" : "h-56"}`}>
              <OptimizedImage src={imageSrc} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/80 text-white backdrop-blur-md">
                <FileText size={20} />
              </div>
              {featured && (
                <div className="absolute right-6 top-6 rounded-full border border-white/20 bg-slate-950/55 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white backdrop-blur-md">
                  <TranslateText text="Destacado" />
                </div>
              )}
            </div>
          ) : null}

          <div className="relative z-20 flex flex-1 flex-col p-10">
            <div className="mb-4 flex items-center gap-3 text-blue-600">
              <Clock className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">{formatDate(item.date)}</span>
            </div>
            <h3
              className={`mb-4 font-black leading-tight text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400 ${
                featured ? "line-clamp-3 text-3xl lg:text-4xl" : "line-clamp-2 text-2xl"
              }`}
            >
              <TranslateText text={item.title} />
            </h3>
            <p
              className={`mb-8 flex-1 font-medium leading-relaxed text-slate-500 dark:text-slate-400 ${
                featured ? "line-clamp-4 max-w-3xl text-base" : "line-clamp-3 text-sm"
              }`}
            >
              <TranslateText text={item.excerpt || ""} />
            </p>
            <div
              className={`flex items-center gap-2 border-t pt-6 text-[10px] font-black uppercase tracking-widest text-blue-600 ${
                featured ? "border-blue-100 dark:border-blue-900/40" : "border-slate-100 dark:border-slate-800"
              }`}
            >
              <TranslateText text="Leer Comunicado" />
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-blue-600/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
