"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
      data-cursor="Ver servicio"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative w-full max-w-lg mx-auto flex flex-col overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ed-hover-lift"
    >
      {/* Contenedor de Imagen Superior (Vertical) */}
      <div className="relative h-72 w-full overflow-hidden">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.name ? `Imagen de servicio: ${service.name}` : 'Imagen de servicio'}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(min-width: 1280px) 700px, 100vw"
            priority={index < 2}
          />
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
             <div className="w-12 h-12 rounded-full bg-blue-500/20" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
      </div>

      {/* Badge de Icono flotante (Movido fuera del overflow-hidden) */}
      <div className="absolute top-[288px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <div className="flex h-20 w-20 min-h-[44px] min-w-[44px] items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-110">
          {service.icon ? (
            <Image src={service.icon} alt="Icono decorativo" width={40} height={48} className="object-contain transition-all duration-500" />
          ) : null}
        </div>
      </div>

      {/* Contenido Inferior Centrado */}
      <div className="relative pt-16 pb-10 px-8 text-center flex flex-col items-center">
        <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          <TranslateText text="Excelencia Operativa" />
        </div>
        <h3 className="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          <TranslateText text={service.name || ""} />
        </h3>
        
        <p className="mb-8 text-slate-500 dark:text-slate-400 leading-relaxed text-sm max-w-sm">
          <TranslateText text={service.description || ""} />
        </p>

        <div className="inline-flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 group-hover:gap-4 transition-all">
          <TranslateText text="Conocer más detalles" />
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      {/* Barra de acento inferior */}
      <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-blue-600 transition-all duration-700 group-hover:w-full" />
    </motion.a>
  );
}

import { apiClient } from "@/lib/api/api-client";

// ... (Service type and ServiceCard component remains same)

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const mappedStatic = staticServices.map(s => ({ 
      id: s.id, 
      slug: s.id, 
      name: s.title, 
      description: s.description, 
      image: s.image, 
      icon: s.icon 
    }));
    
    (async () => {
      try {
        const data = await apiClient.get('/api/services/cards?active=true');
        
        // Si el backend devuelve datos y el arreglo NO está vacío
        if (mounted && Array.isArray(data) && data.length > 0) {
          const fetched = data.map((s: any) => ({
            id: s.id || s._id,
            slug: s.slug,
            name: s.name,
            description: s.description,
            icon: s.icon,
            image: s.image,
          }));
          setServices(fetched);
        } else if (mounted) {
          // Si el backend está vacío o no devuelve un arreglo válido, 
          // usamos los 3 servicios estáticos por defecto
          setServices(mappedStatic);
        }
      } catch (err) {
        console.error('Error fetching services, falling back to static data', err);
        if (mounted) setServices(mappedStatic);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  return (
    <section id="servicios" className="py-24 px-4 bg-slate-50 dark:bg-black/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-24"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <TranslateText text="Estrategia Global" />
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tighter">
          <TranslateText text="Nuestros Servicios" />
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          <TranslateText text="Soluciones de ingeniería y logística para el mercado internacional." />
        </p>
      </motion.div>

      {/* Una sola fila (Grid responsivo) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {!loading && services.map((service, i) => (
          <ServiceCard key={service.id || i} service={service} index={i} />
        ))}
        {loading && (
          <div className="col-span-full text-center py-12 text-slate-400 italic">
            <TranslateText text="Preparando servicios..." />
          </div>
        )}
      </div>
    </section>
  );
}
