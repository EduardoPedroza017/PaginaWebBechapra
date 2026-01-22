'use client';

import { useState, useEffect } from 'react';
// Image import removed (using native <img> for simplicity)
import { motion } from 'framer-motion';
import { Calendar, MapPin, Tag } from 'lucide-react';
import Section from '../components/Section';
import AnimatedSection from '../components/AnimatedSection';
import { TranslateText } from '@/components/TranslateText';
import Footer from '@/components/Footer';

// Note: removed static example data so page shows real API events only

interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
  categoria: string;
  ubicacion: string;
}

// (framer-motion variants removed for clarity)

const responsiveStyles = {
  container: "relative flex items-center justify-center min-h-[700px] sm:min-h-[500px] md:min-h-[600px]",
  card: "absolute w-[260px] sm:w-80 md:w-[420px] lg:w-[520px] h-[420px] sm:h-[480px] md:h-[520px] cursor-pointer",
};

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  // Autoplay: advance every 4.5s unless paused by hover/focus
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev < eventos.length - 1 ? prev + 1 : 0));
    }, 4500);
    return () => clearInterval(id);
  }, [isPaused, eventos.length]);

  // derive sorted lists: most recent first
  const sortedEventos = [...eventos].sort((a, b) => {
    const ta = new Date(a.fecha).getTime() || 0;
    const tb = new Date(b.fecha).getTime() || 0;
    return tb - ta;
  });
  const carouselEventos = sortedEventos.slice(0, 6);

  // Ensure activeIndex is within carousel bounds
  useEffect(() => {
    if (activeIndex >= carouselEventos.length) setActiveIndex(0);
  }, [carouselEventos.length]);

  // Modal state: show details in a modal when clicking any card
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState<Evento | null>(null);

  const openModalForIndex = (index: number) => {
    const ev = carouselEventos[index];
    if (ev) {
      setModalEvent(ev);
      setModalOpen(true);
    }
  };

  const openModalForEvent = (ev: Evento) => {
    setModalEvent(ev);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalEvent(null);
  };

  // close modal with Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (modalOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  // Mejora: Formateador de fechas más robusto
  const formatFecha = (fechaStr: string, formato: 'corta' | 'larga' = 'corta') => {
    const fecha = new Date(fechaStr);
    const opciones: Intl.DateTimeFormatOptions = 
      formato === 'larga' 
        ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        : { year: 'numeric', month: 'short', day: 'numeric' };
    
    return fecha.toLocaleDateString('es-ES', opciones);
  };

  // Cargar eventos publicados desde el backend público
  useEffect(() => {
    let mounted = true;
    const API = process.env.NEXT_PUBLIC_API_URL || '';
    const fetchEventos = async () => {
      try {
        // use proxy endpoint on frontend; avoids relying on build-time env for base
        const res = await fetch(`/api/eventos`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted && Array.isArray(data)) {
          type Raw = Record<string, unknown>;
          const mapped = data.map((it: Raw, idx: number) => {
            const pickString = (...keys: string[]) => {
              for (const k of keys) {
                const v = it[k];
                if (typeof v === 'string' && v) return v;
                if (typeof v === 'number') return String(v);
              }
              return '';
            };

            const rawImage = pickString('imagen', 'image', 'foto', 'file_url', 'image_url');
            const imgStr = rawImage || '';
            const resolvedImage = imgStr.startsWith('/uploads/') ? `${API}${imgStr}` : (imgStr || '');

            const estadoVal = it['estado'];
            const activeVal = it['active'];
            const statusVal = it['status'];

            return {
              id: (it['id'] || it['_id'] || idx) as any,
              titulo: pickString('titulo', 'title', 'nombre'),
              descripcion: pickString('descripcion', 'description'),
              fecha: pickString('fecha_hora', 'fecha', 'date'),
              imagen: resolvedImage,
              categoria: pickString('categoria', 'category'),
              ubicacion: pickString('ubicacion', 'location'),
              estado: estadoVal,
              active: activeVal,
              status: statusVal,
            } as unknown as Evento & { estado?: unknown; active?: unknown; status?: unknown };
          });

          const activeOnly = mapped.filter((m: any) => (
            m.status === 'active' ||
            m.active === true ||
            m.estado === true ||
            String(m.estado) === 'true'
          ));

          console.debug('eventos fetched:', data.length, 'mapped:', mapped.length, 'active:', activeOnly.length);
          setEventos(activeOnly);
          setActiveIndex(0);
        }
      } catch (err) {
        console.error('Error cargando eventos públicos:', err);
      }
    };
    fetchEventos();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Section variant="blue" size="lg">
        <div className="text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TranslateText text="Eventos y Actividades" />
          </motion.h1>
          <motion.p
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TranslateText text="Descubre los próximos eventos y actividades organizadas por BAUSEN. Conecta con nuestra comunidad y participa en experiencias únicas diseñadas para inspirar y conectar." />
          </motion.p>
        </div>
      </Section>

      {/* Galería Interactiva de Eventos */}
      <Section variant="white" size="lg">
        <AnimatedSection>
          <div
            className={responsiveStyles.container}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <div className="relative w-full max-w-7xl h-[600px] flex items-center justify-center" style={{ perspective: 1200 }}>
            {carouselEventos.map((evento, index) => {
              const isActive = index === activeIndex;
              const isPrev = index === activeIndex - 1 || (activeIndex === 0 && index === eventos.length - 1);
              const isNext = index === activeIndex + 1 || (activeIndex === eventos.length - 1 && index === 0);
              const isFar = Math.abs(index - activeIndex) > 1 && Math.abs(index - activeIndex) < eventos.length - 1;

              // compute numeric transforms for smooth framer-motion animations
              let x = 0;
              let scale = 1;
              let rotateY = 0;
              let opacityNum = 0.3;
              let zIndex = 0;

              if (isActive) {
                x = 0;
                scale = 1;
                rotateY = 0;
                opacityNum = 1;
                zIndex = 10;
              } else if (isPrev) {
                x = -350;
                scale = 0.85;
                rotateY = 12;
                opacityNum = 0.75;
                zIndex = 5;
              } else if (isNext) {
                x = 350;
                scale = 0.85;
                rotateY = -12;
                opacityNum = 0.75;
                zIndex = 5;
              } else if (isFar) {
                x = index < activeIndex ? -700 : 700;
                scale = 0.7;
                rotateY = index < activeIndex ? 25 : -25;
                opacityNum = 0.5;
                zIndex = 1;
              }

              return (
                <motion.div
                  key={evento.id}
                  className={responsiveStyles.card}
                  style={{ zIndex }}
                  animate={{ x, scale, rotateY, opacity: opacityNum }}
                  transition={{ type: 'spring', stiffness: 120, damping: 22 }}
                      onClick={() => openModalForIndex(index)}
                  whileHover={{ scale: isActive ? 1.02 : 0.92 }}
                  aria-label={`Ver detalles de ${evento.titulo}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openModalForIndex(index)}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group bg-white dark:bg-slate-800">
                    {/* Imagen del evento */}
                    <div className="relative w-full h-3/5">
                      <img
                        src={evento.imagen || `https://via.placeholder.com/800x600?text=${encodeURIComponent(evento.titulo)}`}
                        alt={evento.titulo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ width: '100%', height: '100%' }}
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/800x600?text=${encodeURIComponent(evento.titulo)}`; }}
                      />
                      {/* Overlay con gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Información del evento */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-slate-900 dark:text-white">
                      <div className="mb-3">
                        <span className="inline-flex items-center px-3 py-1 bg-blue-500 text-xs font-semibold rounded-full text-white">
                          <Tag className="w-3 h-3 mr-1" />
                          {evento.categoria}
                        </span>
                      </div>
                        <h3 className="text-xl font-bold mb-2 line-clamp-2 text-slate-900 dark:text-white">
                        {evento.titulo}
                      </h3>
                        <p className="text-sm text-slate-700 dark:text-gray-200 line-clamp-2 mb-3">
                        {evento.descripcion}
                      </p>
                        <div className="flex items-center text-sm text-slate-700 dark:text-gray-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatFecha(evento.fecha, 'corta')}
                      </div>
                    </div>

                    {/* Efecto de hover */}
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation buttons removed by request (use indicators or click to select) */}
          {/* Indicadores de eventos */}
          <div className="flex justify-center space-x-3 mt-8" role="tablist" aria-label="Seleccionar evento">
            {carouselEventos.map((evento, index) => (
              <motion.button
                key={evento.id}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-blue-500 scale-125'
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Evento ${index + 1}: ${evento.titulo}`}
                aria-selected={index === activeIndex}
                role="tab"
                tabIndex={0}
              />
            ))}
          </div>
        </div>
        </AnimatedSection>
      </Section>

      {/* Todos los eventos: muestra cards con todos los eventos activos */}
      <Section variant="white" size="lg">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Todos los eventos</h3>
            {sortedEventos.length === 0 ? (
              <p className="text-slate-600 dark:text-slate-400">No hay eventos activos disponibles.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEventos.map((ev) => (
                  <article
                    key={ev.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => openModalForEvent(ev)}
                    onKeyDown={(e) => e.key === 'Enter' && openModalForEvent(ev)}
                  >
                    <div className="relative h-40 w-full">
                      <img src={ev.imagen || `https://via.placeholder.com/800x400?text=${encodeURIComponent(ev.titulo)}`} alt={ev.titulo} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{ev.titulo}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 line-clamp-2">{ev.descripcion}</p>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{formatFecha(ev.fecha, 'corta')}</div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      </Section>

      {/* Modal para mostrar detalles del evento (reemplaza la sección de detalles inline) */}
      {modalOpen && modalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={closeModal} />
          <div role="dialog" aria-modal="true" className="relative z-60 max-w-4xl w-full mx-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-auto max-h-[90vh] shadow-xl">
              <div className="p-4 flex justify-end">
                <button onClick={closeModal} aria-label="Cerrar" className="text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-full p-2 hover:bg-slate-200">✕</button>
              </div>
              <div className="px-6 pb-6">
                <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg mb-4">
                  <img src={modalEvent.imagen || `https://via.placeholder.com/1200x800?text=${encodeURIComponent(modalEvent.titulo)}`} alt={modalEvent.titulo} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{modalEvent.titulo}</h2>
                <div className="text-sm text-slate-600 dark:text-slate-300 mb-4">{formatFecha(modalEvent.fecha, 'larga')}</div>
                <p className="text-slate-700 dark:text-slate-200 mb-4">{modalEvent.descripcion}</p>
                {modalEvent.ubicacion && (
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{modalEvent.ubicacion}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}