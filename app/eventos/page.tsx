'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, X, Sparkles } from 'lucide-react';
import Section from '@/app/components/Section';
import SubpageHero from '@/components/SubpageHero';
import Footer from '@/components/Footer';
import SpotlightCTA from '@/app/components/SpotlightCTA';

interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
  categoria: string;
  ubicacion: string;
}

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState<Evento | null>(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await fetch(`/api/eventos`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const mapped = data.map((it: any, idx: number) => {
            const pickString = (...keys: string[]) => {
              for (const k of keys) {
                const v = it[k];
                if (typeof v === 'string' && v) return v;
              }
              return '';
            };
            const rawImage = pickString('imagen', 'image', 'foto', 'file_url', 'image_url');
            const resolvedImage = rawImage.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_API_URL}${rawImage}` : rawImage;

            return {
              id: it.id || it._id || idx,
              titulo: pickString('titulo', 'title', 'nombre'),
              descripcion: pickString('descripcion', 'description'),
              fecha: pickString('fecha_hora', 'fecha', 'date'),
              imagen: resolvedImage,
              categoria: pickString('categoria', 'category') || 'Corporativo',
              ubicacion: pickString('ubicacion', 'location') || 'Mexico',
              status: it.status || it.active || it.estado,
            };
          });
          const activeOnly = mapped.filter((m: any) => m.status === 'active' || m.status === true || String(m.status) === 'true');
          setEventos(activeOnly);
        }
      } catch (err) {
        console.error('Error cargando eventos:', err);
      }
    };
    fetchEventos();
  }, []);

  const formatFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const carouselEventos = eventos.slice(0, 6);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SubpageHero
        badge="Nuestra Comunidad"
        title="Eventos y Actividades"
        variant="servicesBlue"
        subtitle="Conecte con expertos y participe en experiencias unicas disenadas para inspirar el crecimiento empresarial."
      />

      <Section variant="blue" size="lg">
        <div className="relative flex h-[600px] items-center justify-center overflow-hidden" style={{ perspective: 1200 }}>
          <AnimatePresence mode="wait">
            {carouselEventos.length > 0 &&
              carouselEventos.map((evento, index) => {
                const isActive = index === activeIndex;
                if (!isActive) return null;

                return (
                  <motion.div
                    key={evento.id}
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute w-full max-w-5xl"
                  >
                    <div className="flex flex-col overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 md:flex-row">
                      <div className="relative h-[300px] w-full md:h-[500px] md:w-1/2">
                        <img src={evento.imagen} alt={`Imagen del evento: ${evento.titulo}`} className="h-full w-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
                      </div>
                      <div className="flex w-full flex-col justify-center p-10 md:w-1/2 md:p-16">
                        <div className="mb-6">
                          <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-600 dark:border-blue-800/50 dark:bg-blue-900/30 dark:text-blue-400">
                            {evento.categoria}
                          </span>
                        </div>
                        <h2 className="mb-6 text-3xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white lg:text-5xl">{evento.titulo}</h2>
                        <p className="mb-10 line-clamp-3 text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-400">{evento.descripcion}</p>
                        <div className="mb-10 space-y-4">
                          <div className="flex items-center gap-3 text-slate-500">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-bold uppercase tracking-widest">{formatFecha(evento.fecha)}</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-500">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-bold uppercase tracking-widest">{evento.ubicacion}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setModalEvent(evento);
                            setModalOpen(true);
                          }}
                          className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-10 py-5 text-xs font-black uppercase tracking-widest text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-blue-500 min-h-[44px] min-w-[44px]"
                          aria-label={`Ver detalles del evento: ${evento.titulo}`}
                        >
                          Ver Detalles
                          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" aria-label="Flecha decorativa" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          {carouselEventos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-12 bg-blue-600' : 'w-4 bg-slate-200 dark:bg-slate-800'}`}
            />
          ))}
        </div>
      </Section>

      <Section variant="white" size="lg">
        <div className="mb-16 space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-blue-700 dark:border-blue-800/40 dark:bg-blue-950/30 dark:text-blue-300">
            <Sparkles size={14} />
            Calendario activo
          </span>
          <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white lg:text-5xl">Proximos Encuentros</h3>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {eventos.map((ev, index) => (
            <motion.div
              key={ev.id}
              whileHover={{ y: -10 }}
              onClick={() => {
                setModalEvent(ev);
                setModalOpen(true);
              }}
              className={`group cursor-pointer overflow-hidden rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl ${
                index === 0
                  ? 'bg-gradient-to-br from-white via-blue-50/40 to-white shadow-2xl shadow-blue-100/70 md:col-span-2 dark:border-blue-800/40 dark:bg-slate-900 dark:shadow-blue-950/30'
                  : 'bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <div className={`relative ${index === 0 ? 'h-80 lg:h-96' : 'h-64'}`}>
                <img src={ev.imagen} alt={`Imagen del evento: ${ev.titulo}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 to-transparent" />
                <div className="absolute left-6 top-6">
                  <span className="rounded-full border border-white/10 bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                    {ev.categoria}
                  </span>
                </div>
                {index === 0 && (
                  <div className="absolute right-6 top-6 rounded-full border border-white/20 bg-slate-950/55 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white backdrop-blur-md">
                    Evento principal
                  </div>
                )}
              </div>

              <div className="p-10">
                <div className="mb-4 flex items-center gap-3 text-blue-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{new Date(ev.fecha).toLocaleDateString()}</span>
                </div>
                <h4 className={`mb-4 font-black leading-tight text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400 ${index === 0 ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>
                  {ev.titulo}
                </h4>
                <p className={`mb-8 font-medium leading-relaxed text-slate-500 dark:text-slate-400 ${index === 0 ? 'line-clamp-3 max-w-2xl text-base' : 'line-clamp-2 text-sm'}`}>
                  {ev.descripcion}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600">
                  Explorar Evento
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <SpotlightCTA
        eyebrow="Reserva tu espacio"
        title="Conecta con las experiencias mas relevantes de Bausen"
        subtitle="Activa tu participacion en encuentros que mezclan comunidad, aprendizaje y oportunidades reales de crecimiento empresarial."
        imageSrc="/web/image/servicios/desarrollorganizacional.jpg"
        imageAlt="Encuentros y experiencias Bausen"
        primaryLink="/#contacto"
        primaryLabel="Solicitar informacion"
        secondaryLink="/training-center"
        secondaryLabel="Explorar training center"
        theme="blue"
      />

      <AnimatePresence>
        {modalOpen && modalEvent && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[3rem] bg-white shadow-2xl dark:bg-slate-900"
            >
              <button onClick={() => setModalOpen(false)} className="absolute right-8 top-8 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-blue-600">
                <X size={24} />
              </button>
              <div className="flex h-[85vh] flex-col overflow-y-auto">
                <div className="relative h-96 shrink-0">
                  <img src={modalEvent.imagen} alt={modalEvent.titulo} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-2 text-xs font-black uppercase tracking-widest text-white">
                      {modalEvent.categoria}
                    </span>
                    <h2 className="text-4xl font-black leading-tight tracking-tighter text-white lg:text-6xl">{modalEvent.titulo}</h2>
                  </div>
                </div>
                <div className="space-y-10 p-10 lg:p-16">
                  <div className="flex flex-wrap gap-10">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Fecha del Evento</div>
                        <div className="font-black text-slate-900 dark:text-white">{formatFecha(modalEvent.fecha)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ubicacion</div>
                        <div className="font-black text-slate-900 dark:text-white">{modalEvent.ubicacion}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">Sobre el Evento</h3>
                    <p className="text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-400">{modalEvent.descripcion}</p>
                  </div>
                  <div className="border-t border-slate-100 pt-10 dark:border-slate-800">
                    <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-6 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-blue-500">
                      <Sparkles size={20} />
                      Registrar mi Asistencia
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
