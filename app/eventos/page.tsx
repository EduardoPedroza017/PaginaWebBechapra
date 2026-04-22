'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Tag, ArrowRight, X, Sparkles, Clock } from 'lucide-react';
import Section from '@/app/components/Section';
import SubpageHero from '@/components/SubpageHero';
import { TranslateText } from '@/components/TranslateText';
import Footer from '@/components/Footer';

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
              ubicacion: pickString('ubicacion', 'location') || 'México',
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
        subtitle="Conecte con expertos y participe en experiencias únicas diseñadas para inspirar el crecimiento empresarial."
      />

      {/* Featured Events Carousel */}
      <Section variant="blue" size="lg">
        <div className="relative h-[600px] flex items-center justify-center overflow-hidden" style={{ perspective: 1200 }}>
          <AnimatePresence mode="wait">
            {carouselEventos.length > 0 && carouselEventos.map((evento, index) => {
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
                  <div className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-100 dark:border-slate-800">
                    <div className="relative w-full md:w-1/2 h-[300px] md:h-[500px]">
                      <img src={evento.imagen} alt={evento.titulo} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
                    </div>
                    <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                      <div className="mb-6">
                        <span className="px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800/50">
                          {evento.categoria}
                        </span>
                      </div>
                      <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-tight">
                        {evento.titulo}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 font-medium mb-10 line-clamp-3 text-lg leading-relaxed">
                        {evento.descripcion}
                      </p>
                      <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-3 text-slate-500">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <span className="font-bold text-sm uppercase tracking-widest">{formatFecha(evento.fecha)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <span className="font-bold text-sm uppercase tracking-widest">{evento.ubicacion}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => { setModalEvent(evento); setModalOpen(true); }}
                        className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:bg-blue-500 transition-all hover:-translate-y-1 group"
                      >
                        Ver Detalles
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-4 mt-12">
          {carouselEventos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? "w-12 bg-blue-600" : "w-4 bg-slate-200 dark:bg-slate-800"}`}
            />
          ))}
        </div>
      </Section>

      {/* Grid of All Events */}
      <Section variant="white" size="lg">
        <div className="mb-16">
          <h3 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Próximos Encuentros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {eventos.map((ev) => (
            <motion.div
              key={ev.id}
              whileHover={{ y: -10 }}
              onClick={() => { setModalEvent(ev); setModalOpen(true); }}
              className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 cursor-pointer transition-all duration-500 hover:shadow-2xl"
            >
              <div className="relative h-64">
                <img src={ev.imagen} alt={ev.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                    {ev.categoria}
                  </span>
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-3 mb-4 text-blue-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{new Date(ev.fecha).toLocaleDateString()}</span>
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {ev.titulo}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm line-clamp-2 mb-8 leading-relaxed">
                  {ev.descripcion}
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                  Explorar Evento <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {modalOpen && modalEvent && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-8 right-8 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col h-[85vh] overflow-y-auto">
                <div className="relative h-96 shrink-0">
                  <img src={modalEvent.imagen} alt={modalEvent.titulo} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-widest mb-4 inline-block">
                      {modalEvent.categoria}
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-tight">{modalEvent.titulo}</h2>
                  </div>
                </div>
                <div className="p-10 lg:p-16 space-y-10">
                  <div className="flex flex-wrap gap-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Fecha del Evento</div>
                        <div className="text-slate-900 dark:text-white font-black">{formatFecha(modalEvent.fecha)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ubicación</div>
                        <div className="text-slate-900 dark:text-white font-black">{modalEvent.ubicacion}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Sobre el Evento</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {modalEvent.descripcion}
                    </p>
                  </div>
                  <div className="pt-10 border-t border-slate-100 dark:border-slate-800">
                     <button className="w-full py-6 bg-blue-600 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3">
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
