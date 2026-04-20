"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";
import {
  Users,
  TrendingUp,
  Zap,
  Shield,
  Briefcase,
  Heart,
  CheckCircle,
} from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import Section from "@/app/components/Section";

const reasons = [
  {
    icon: Users,
    title: "Equipo experto",
    desc: "Profesionales con 15+ años en consultoría empresarial, HR y transformación digital.",
    color: "blue",
  },
  {
    icon: TrendingUp,
    title: "Resultados comprobados",
    desc: "Más de 500 empresas han transformado su operación con nuestras soluciones.",
    color: "indigo",
  },
  {
    icon: Zap,
    title: "Innovación continua",
    desc: "Metodologías actualizadas, herramientas modernas y enfoque ágil en cada proyecto.",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "Confiabilidad",
    desc: "Compromiso con la confidencialidad, ética profesional y transparencia total.",
    color: "blue",
  },
  {
    icon: Briefcase,
    title: "Soluciones integrales",
    desc: "De capital humano a finanzas: una sola empresa para todas tus necesidades.",
    color: "indigo",
  },
  {
    icon: Heart,
    title: "Enfoque humano",
    desc: "Entendemos que detrás de cada número hay personas y su bienestar es prioritario.",
    color: "cyan",
  },
];

export default function WhyUsSection() {
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
            <CheckCircle size={14} />
            <TranslateText text="Nuestras Fortalezas" />
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            <TranslateText text="¿Por qué" />{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              BAUSEN
            </span>
            ?
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            <TranslateText text="Descubre las razones por las que cientos de empresas confían en nosotros para liderar su transformación." />
          </p>
        </motion.div>

        {/* Grid de Fortalezas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, i) => (
            <StrengthCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function StrengthCard({ item, index }: { item: any; index: number }) {
  const Icon = item.icon;
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
      className="group relative"
    >
      <div className="relative h-full bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden">
        
        {/* Interactive Glow Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.08), transparent 40%)`
            ),
          }}
        />

        <div className="relative z-20 flex flex-col h-full">
          {/* Icon con escala en hover */}
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg shadow-blue-500/10">
            <Icon size={24} className="text-blue-600 dark:text-blue-400" />
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
            <TranslateText text={item.title} />
          </h3>
          
          <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            <TranslateText text={item.desc} />
          </p>
        </div>
      </div>
      
      {/* Outer subtle glow */}
      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-2xl bg-blue-600/5 -z-10 transition-opacity duration-500" />
    </motion.div>
  );
}
