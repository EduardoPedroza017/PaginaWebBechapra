"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, MouseEvent } from "react";
import { Quote, Star, ArrowUpRight } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import Section from "@/app/components/Section";

const testimonials = [
  {
    nombre: "María López",
    empresa: "Grupo Alfa",
    texto:
      "BAUSEN nos ayudó a transformar nuestra cultura organizacional y optimizar procesos clave. ¡Resultados tangibles en meses!",
    resultado: "Reducción del 40% en rotación anual.",
    foto: "/web/image/icon/CapitalHumano_IconLight_Azul@2x.png",
    rating: 5,
  },
  {
    nombre: "Carlos Méndez",
    empresa: "Finanzas XYZ",
    texto:
      "El equipo de BAUSEN es profesional, cercano y siempre proactivo. Los recomendamos ampliamente.",
    resultado: "Ahorro de 120 horas/mes.",
    foto: "/web/image/icon/Servicios Administrativos_IconLight_Azul@2x.png",
    rating: 5,
  },
  {
    nombre: "Ana Torres",
    empresa: "TechNova",
    texto:
      "Gracias a su consultoría, logramos una integración exitosa tras una fusión compleja.",
    resultado: "Transición sin conflictos y aumento de satisfacción.",
    foto: "/web/image/icon/ServiciosdeImpuestos_IconLight_Azul@2x.png",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <Section variant="blue" size="lg">
      <div className="max-w-7xl mx-auto">
        {/* Header Unificado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-blue-100 dark:border-blue-800/50">
            <Star size={14} />
            <TranslateText text="Casos de Éxito" />
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            <TranslateText text="Historias de" />{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Clientes
            </span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            <TranslateText text="Descubre cómo hemos ayudado a empresas líderes a alcanzar sus objetivos estratégicos." />
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.nombre} item={item} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function TestimonialCard({ item, index }: { item: any; index: number }) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative h-full"
    >
      <div className="relative h-full bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-200/60 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden">
        
        {/* Interactive Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.08), transparent 40%)`
            ),
          }}
        />

        <div className="relative z-20 flex flex-col h-full">
          {/* Quote Icon */}
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-600/30">
            <Quote size={20} className="text-white" />
          </div>

          {/* Rating */}
          <div className="flex gap-1 mb-6">
            {[...Array(item.rating)].map((_, j) => (
              <Star key={j} size={16} className="text-blue-500 fill-blue-500" />
            ))}
          </div>

          <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic mb-8 flex-1">
            &ldquo;<TranslateText text={item.texto} />&rdquo;
          </p>

          {/* Result Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-100 dark:border-blue-900/30 mb-10 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors">
            <ArrowUpRight size={16} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-black uppercase tracking-widest text-blue-700 dark:text-blue-400">
              <TranslateText text={item.resultado} />
            </span>
          </div>

          {/* Author */}
          <div className="flex items-center gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="relative w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 overflow-hidden border border-slate-100 dark:border-slate-700">
              <Image
                src={item.foto}
                alt={item.nombre}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>
            <div>
              <div className="font-black text-slate-900 dark:text-white leading-tight">{item.nombre}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{item.empresa}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl bg-blue-600/5 -z-10 transition-opacity duration-500" />
    </motion.div>
  );
}
