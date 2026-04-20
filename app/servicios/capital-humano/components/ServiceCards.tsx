"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, MouseEvent } from "react";
import { ArrowRight, LucideIcon, Sparkles } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';
import Section from "@/app/components/Section";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  link: string;
}

interface ServiceCardsProps {
  title: string;
  services: Service[];
}

export default function ServiceCards({ title, services }: ServiceCardsProps) {
  return (
    <Section variant="white" size="lg">
      <div className="max-w-7xl mx-auto">
        {/* Header Unificado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
           <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100 dark:border-blue-800/50">
            <Sparkles size={14} />
            Especialización
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
            <TranslateText text={title} />
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, i) => (
            <ServiceDetailCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function ServiceDetailCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
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
      <Link href={service.link} className="block h-full">
        <div className="relative h-full bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-200/60 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
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
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-8 shadow-xl shadow-blue-600/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Icon size={32} />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
              <TranslateText text={service.title} />
            </h3>

            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 flex-1">
              <TranslateText text={service.desc} />
            </p>

            <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest pt-6 border-t border-slate-100 dark:border-slate-800">
              Ver Detalles <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl bg-blue-600/5 -z-10 transition-opacity duration-500" />
    </motion.div>
  );
}
