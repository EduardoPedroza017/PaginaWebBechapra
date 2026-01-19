'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Tag } from 'lucide-react';
import Section from '../components/Section';
import AnimatedSection from '../components/AnimatedSection';
import { TranslateText } from '@/components/TranslateText';
import Footer from '@/components/Footer';

// Datos de ejemplo (se usan como fallback si el backend no responde)
const eventosData = [
  {
    id: 1,
    titulo: 'Conferencia Tecnológica 2024',
    descripcion: 'Evento anual de tecnología con ponentes internacionales y demostraciones de las últimas innovaciones en el sector.',
    fecha: '2024-03-15',
    imagen: 'https://picsum.photos/800/600?random=1',
    categoria: 'Tecnología',
    ubicacion: 'Centro de Convenciones, Ciudad de México'
  }
];

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
  const [eventos, setEventos] = useState<Evento[]>(eventosData);
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

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : eventos.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < eventos.length - 1 ? prev + 1 : 0));
  };

  const handleEventoClick = (index: number) => {
    setActiveIndex(index);
  };

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
    const base = process.env.NEXT_PUBLIC_API_BASE;
    const fetchEventos = async () => {
      try {
        const res = await fetch(`${base}/api/eventos`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Mapear respuesta a la forma que usa este componente
        if (mounted && Array.isArray(data)) {
          const mapped = data.map((it: any, idx: number) => ({
            id: it.id || it._id || idx,
            titulo: it.titulo || it.title || it.nombre || '',
            descripcion: it.descripcion || it.description || it.descripcion || '',
            fecha: it.fecha_hora || it.fecha || it.date || '',
            imagen: it.imagen || it.image || it.foto || '',
            categoria: it.categoria || it.category || '',
            ubicacion: it.ubicacion || it.location || ''
          }));
          setEventos(mapped.length ? mapped : eventosData);
          setActiveIndex(mapped.length ? 0 : 0);
        }
      } catch (err) {
        // mantener datos de ejemplo si falla la petición
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
            {eventos.map((evento, index) => {
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
                  onClick={() => handleEventoClick(index)}
                  whileHover={{ scale: isActive ? 1.02 : 0.92 }}
                  aria-label={`Ver detalles de ${evento.titulo}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleEventoClick(index)}
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

          {/* Botones de navegación */}
          <motion.button
            onClick={handlePrev}
            className="absolute left-4 z-20 p-4 bg-white dark:bg-slate-800 shadow-lg rounded-full text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Evento anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="absolute right-4 z-20 p-4 bg-white dark:bg-slate-800 shadow-lg rounded-full text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Siguiente evento"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
          {/* Indicadores de eventos */}
          <div className="flex justify-center space-x-3 mt-8" role="tablist" aria-label="Seleccionar evento">
            {eventos.map((evento, index) => (
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

      {/* Sección de Detalles del Evento */}
      <Section variant="blue" size="md">
        <AnimatedSection>
          <motion.div
            className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {eventos[activeIndex]?.titulo}
              </motion.h2>
              <motion.p
                className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {eventos[activeIndex]?.descripcion}
              </motion.p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              key={`details-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <Calendar className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    <TranslateText text="Fecha y Hora" />
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    {formatFecha(eventos[activeIndex]?.fecha, 'larga')}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <TranslateText text="Horario por confirmar" />
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <MapPin className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    <TranslateText text="Ubicación" />
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    {eventos[activeIndex]?.ubicacion}
                  </p>
                  <button 
                    className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mt-1 flex items-center"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(eventos[activeIndex]?.ubicacion)}`, '_blank')}
                  >
                    <TranslateText text="Ver en mapa" />
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Información adicional del evento */}
            <motion.div
              className="mt-8 p-6 bg-blue-50 dark:bg-slate-900/50 rounded-xl border border-blue-100 dark:border-slate-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                <TranslateText text="Información Importante" />
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <TranslateText text="Registro requerido con anticipación" />
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <TranslateText text="Llegar 15 minutos antes del inicio" />
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <TranslateText text="Aforo limitado - Reserva tu lugar" />
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TranslateText text="Registrarme" />
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </motion.button>
              
              <motion.button
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TranslateText text="Compartir Evento" />
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </Section>

      <Footer />
    </>
  );
}