"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// import { services } from "./data/homeData";
import { ArrowUpRight } from "lucide-react";
import Image from 'next/image';
import { TranslateText } from "@/components/TranslateText";
import { services as staticServices } from "./data/homeData";

type Service = {
  id?: string;
  slug?: string;
  name?: string;
  description?: string;
  image?: string;
  icon?: string;
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const slugOrName = String(service.slug ?? service.name ?? '');
  const featured = index === 0;
  return (
    <motion.a
      href={`/web/servicios/${encodeURIComponent(slugOrName)}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 ${
        featured
          ? "bg-gradient-to-br from-white via-blue-50/50 to-white shadow-2xl shadow-blue-100/80 md:col-span-2 lg:col-span-2 dark:border dark:border-blue-800/40 dark:bg-slate-800/90"
          : "bg-white shadow-lg hover:shadow-2xl dark:border dark:border-slate-700 dark:bg-slate-800/90 dark:hover:border-slate-600"
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? "h-72 lg:h-80" : "h-56"}`}>
        {service.image ? (
          <Image
            src={service.image}
            alt={service.name || 'Servicio'}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className={`object-cover transition-transform duration-700 ${featured ? "scale-105 group-hover:scale-110" : "group-hover:scale-110"}`}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
            <span className="text-sm text-slate-500 dark:text-slate-400">Sin imagen</span>
          </div>
        )}
        <div className={`absolute inset-0 ${featured ? "bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-blue-500/10 dark:from-slate-950/85 dark:via-slate-950/30 dark:to-blue-500/15" : "bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent dark:from-slate-950/80 dark:via-slate-900/40 dark:to-transparent"}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_32%)]" />
        
        {/* Icon Badge */}
        <div className="absolute top-4 left-4 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-white/95 backdrop-blur-sm dark:bg-slate-800/95 dark:border dark:border-slate-700">
          {service.icon ? (
            <Image src={service.icon} alt="" width={36} height={36} className="object-contain" />
          ) : null}
        </div>
        {featured && (
          <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-slate-950/40 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white backdrop-blur-md">
            Servicio destacado
          </div>
        )}
        
        {/* Arrow */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-blue-600/90 backdrop-blur-sm dark:bg-blue-600/80">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Content */}
        <div className={`flex flex-1 flex-col ${featured ? "p-8 lg:p-10" : "p-6"}`}>
        <div className="mb-3 inline-flex w-fit items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-blue-700 dark:border-blue-800/50 dark:bg-blue-950/30 dark:text-blue-300">
          Solucion empresarial
        </div>
        <h3 className={`${featured ? "text-2xl lg:text-3xl" : "text-xl"} font-bold mb-2 group-hover:text-blue-600 transition-colors text-slate-900 dark:text-white`}>
          {service.name}
        </h3>
        <p className={`${featured ? "max-w-2xl text-base" : "text-sm"} leading-relaxed flex-1 text-slate-500 dark:text-slate-400`}>
          {service.description}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
            <TranslateText text="Conocer más" />
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const mappedStatic = staticServices.map(s => ({ id: s.id, slug: s.id, name: s.title, description: s.description, image: s.image, icon: s.icon }));
    (async () => {
      try {
        const API = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API}/api/services/cards?active=true`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        if (mounted && Array.isArray(data)) {
          const fetched = data.map((s: unknown) => {
            const raw = s as Record<string, unknown>;
            const normalize = (url?: unknown) => {
              if (!url) return undefined;
              const u = String(url);
              return u.startsWith('/uploads/') ? `${API}${u}` : u;
            };
            const svc: Service = {
              id: raw['id'] ? String(raw['id']) : undefined,
              slug: raw['slug'] ? String(raw['slug']) : undefined,
              name: raw['name'] ? String(raw['name']) : undefined,
              description: raw['description'] ? String(raw['description']) : undefined,
              icon: normalize(raw['icon']),
              image: normalize(raw['image']),
            };

            return svc;
          });
          const mappedStaticFormatted: Service[] = mappedStatic.map(s => ({ id: s.id, slug: s.slug ?? s.id, name: s.name, description: s.description, image: s.image, icon: s.icon }));
          const merged = [
            ...fetched,
            ...mappedStaticFormatted.filter(ms => !fetched.some(f => (f.id && ms.id && f.id === ms.id) || (f.slug && ms.slug && f.slug === ms.slug) || (f.name && ms.name && f.name === ms.name)))
          ];
          setServices(merged);
        } else if (mounted) {
          setServices(mappedStatic.map(s => ({ id: s.id, slug: s.slug ?? s.id, name: s.name, description: s.description, image: s.image, icon: s.icon })));
        }
      } catch (err) {
        console.error('Error fetching services', err);
        // Fallback to static services
        if (mounted) setServices(mappedStatic);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  return (
    <section id="servicios">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="inline-block font-semibold text-sm px-4 py-2 rounded-full mb-4 text-[--brand-primary] bg-[--background] dark:text-blue-400 dark:bg-blue-900/30 dark:border dark:border-blue-800/50">
          <TranslateText text="Lo que hacemos" />
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[--brand-accent] dark:text-white">
          <TranslateText text="Nuestros Servicios" />
        </h2>
        <div className="w-24 h-1.5 rounded-full mx-auto mb-6 bg-gradient-to-r from-[--brand-primary] to-[--brand-accent] dark:from-slate-600 dark:to-slate-500" />
        <p className="text-lg max-w-2xl mx-auto text-[--foreground] dark:text-slate-300">
          <TranslateText text="Soluciones integrales diseñadas para optimizar cada aspecto de tu organización" />
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!loading && services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
        {loading && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-slate-500">Cargando servicios...</div>
        )}
      </div>
    </section>
  );
}
