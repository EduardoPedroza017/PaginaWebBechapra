"use client";

import { useEffect, useState, MouseEvent } from "react";
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
  mision: "Impulsar el crecimiento y exito de las organizaciones a traves de soluciones integrales en Capital Humano, Desarrollo Organizacional y Management Services.",
  vision: "Ser la empresa lider en soluciones empresariales, reconocida por nuestra excelencia, innovacion y compromiso con el exito de nuestros clientes.",
  valores: "Integridad, transparencia, compromiso, innovacion y pasion por el exito de nuestros clientes son nuestros pilares fundamentales.",
};

const essenceItems = [
  {
    key: "mision" as const,
    title: "Mision",
    icon: Target,
    eyebrow: "Nuestro enfoque",
  },
  {
    key: "vision" as const,
    title: "Vision",
    icon: Eye,
    eyebrow: "Direccion futura",
    featured: true,
  },
  {
    key: "valores" as const,
    title: "Valores",
    icon: Heart,
    eyebrow: "Nuestra cultura",
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
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-700 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-400">
            <Sparkles size={14} />
            <TranslateText text="Lo que nos define" />
          </span>
          <h2 className="mb-6 text-4xl font-black tracking-tighter text-slate-900 dark:text-white md:text-6xl">
            <TranslateText text="Nuestra" />{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              <TranslateText text="Esencia" />
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-medium text-slate-500 dark:text-slate-400">
            <TranslateText text="Los pilares fundamentales que guian cada decision y accion en BAUSEN." />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {essenceItems.map((item, i) => (
            <EssenceCard key={item.key} item={item} content={data[item.key]} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function EssenceCard({ item, content, index }: { item: any; content: string; index: number }) {
  const Icon = item.icon;
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
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="relative group h-full">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-950 p-10 shadow-2xl shadow-blue-900/30 lg:p-12">
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600 blur-[100px]"
            />
          </div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-6 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-blue-300">
              <TranslateText text={item.eyebrow} />
            </div>
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl">
              <Icon size={32} className="text-blue-400" />
            </div>
            <h3 className="mb-6 text-3xl font-black tracking-tight text-white">
              <TranslateText text={item.title} />
            </h3>
            <p className="flex-1 text-lg font-medium leading-relaxed text-slate-300">
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
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white p-10 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800/50 dark:bg-slate-900/80">
        <motion.div
          className="pointer-events-none absolute -inset-px z-10 rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.08), transparent 40%)`
            ),
          }}
        />

        <div className="relative z-20 flex h-full flex-col">
          <div className="mb-6 inline-flex w-fit items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-blue-700 dark:border-blue-800/50 dark:bg-blue-950/30 dark:text-blue-300">
            <TranslateText text={item.eyebrow} />
          </div>
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 transition-transform duration-500 group-hover:scale-110 dark:border-blue-800/40 dark:bg-blue-900/20">
            <Icon size={28} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="mb-6 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            <TranslateText text={item.title} />
          </h3>
          <p className="flex-1 text-base font-medium leading-relaxed text-slate-600 dark:text-slate-400">
            <TranslateText text={content} />
          </p>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-blue-600/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
