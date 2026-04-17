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
  return (
    <motion.a
      href={`/web/servicios/${encodeURIComponent(slugOrName)}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-800/90 dark:border dark:border-slate-700 dark:hover:border-slate-600"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.name || 'Servicio'}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
            <span className="text-sm text-slate-500 dark:text-slate-400">Sin imagen</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent dark:from-slate-950/80 dark:via-slate-900/40 dark:to-transparent" />
        
        {/* Icon Badge */}
        <div className="absolute top-4 left-4 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-white/95 backdrop-blur-sm dark:bg-slate-800/95 dark:border dark:border-slate-700">
          {service.icon ? (
            <Image src={service.icon} alt="" width={36} height={36} className="object-contain" />
          ) : null}
        </div>
        
        {/* Arrow */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-blue-600/90 backdrop-blur-sm dark:bg-blue-600/80">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors text-slate-900 dark:text-white">
          {service.name}
        </h3>
        <p className="text-sm leading-relaxed flex-1 text-slate-500 dark:text-slate-400">
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
        <span className="inline-block font-semibold text-sm px-4 py-2 rounded-full mb-4 text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30 dark:border dark:border-blue-800/50">
          <TranslateText text="Lo que hacemos" />
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
          <TranslateText text="Nuestros Servicios" />
        </h2>
        <div className="w-24 h-1.5 rounded-full mx-auto mb-6 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-400" />
        <p className="text-lg max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
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
