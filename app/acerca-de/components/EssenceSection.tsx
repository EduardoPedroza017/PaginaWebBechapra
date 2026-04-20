"use client";

import { useEffect, useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Target, Eye, Heart, Sparkles } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import Section from "@/app/components/Section";

interface EssenceData {
  mision: string;
  vision: string;
  valores: string;
}

const defaultEssence: EssenceData = {
  mision:
    "Impulsar el crecimiento y éxito de las organizaciones a través de soluciones integrales en Capital Humano, Desarrollo Organizacional y Management Services.",
  vision:
    "Ser la empresa líder en soluciones empresariales, reconocida por nuestra excelencia, innovación y compromiso con el éxito de nuestros clientes.",
  valores:
    "Integridad, transparencia, compromiso, innovación y pasión por el éxito de nuestros clientes son nuestros pilares fundamentales.",
};

const essenceItems = [
  {
    key: "mision" as const,
    title: "Misión",
    icon: Target,
    color: "blue",
  },
  {
    key: "vision" as const,
    title: "Visión",
    icon: Eye,
    featured: true,
  },
  {
    key: "valores" as const,
    title: "Valores",
    icon: Heart,
    color: "indigo",
  },
];

export default function EssenceSection() {
  const [essence, setEssence] = useState<EssenceData | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/api/essence`)
        .then((res) => res.json())
        .then((data) => setEssence(data))
        .catch(() => setEssence(null));
    }
  }, []);

  const data = essence || defaultEssence;

  return (
    <Section id="esencia" variant="white" size="lg">
      <div className="max-w-7xl mx-auto">
        {/* Header Unificado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-blue-100 dark:border-blue-800/50">
            <Sparkles size={14} />
            <TranslateText text="Lo que nos define" />
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            <TranslateText text="Nuestra" />{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              <TranslateText text="Esencia" />
            </span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            <TranslateText text="Los pilares fundamentales que guían cada decisión y acción en BAUSEN." />
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {essenceItems.map((item, i) => (
            <EssenceCard 
              key={item.key} 
              item={item} 
              content={data[item.key]} 
              index={i} 
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function EssenceCard({ item, content, index }: { item: any; content: string; index: number }) {
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

  if (item.featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative group h-full"
      >
        <div className="relative h-full bg-slate-950 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/30 overflow-hidden flex flex-col border border-white/5">
          {/* Animated Background */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full blur-[100px]"
            />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8 shadow-xl">
              <Icon size={32} className="text-blue-400" />
            </div>

            <h3 className="text-3xl font-black text-white mb-6 tracking-tight">
              <TranslateText text={item.title} />
            </h3>

            <p className="text-lg text-slate-400 leading-relaxed font-medium flex-1">
              <TranslateText text={content} />
            </p>
          </div>
        </div>
      </motion.div>
    );
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
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110">
            <Icon size={28} className="text-blue-600 dark:text-blue-400" />
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            <TranslateText text={item.title} />
          </h3>

          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium flex-1">
            <TranslateText text={content} />
          </p>
        </div>
      </div>
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl bg-blue-600/5 -z-10 transition-opacity duration-500" />
    </motion.div>
  );
}
