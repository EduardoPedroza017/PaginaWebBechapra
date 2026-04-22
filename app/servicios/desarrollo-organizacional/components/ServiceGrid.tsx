"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { MouseEvent } from "react";
import { ArrowRight, LucideIcon } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
}

interface ServiceGridProps {
  title: string;
  services: Service[];
}

export default function ServiceGrid({ title, services }: ServiceGridProps) {
  return (
    <section className="bg-white px-6 py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-blue-700 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-400">
            Especializacion
          </span>
          <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <TranslateText text={title} />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <GridCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GridCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const glowY = useSpring(mouseY, { damping: 20, stiffness: 150 });
  const featured = index === 0;

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
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      className={`group ${featured ? "md:col-span-2" : ""}`}
    >
      <Link href={service.href} className="block h-full">
        <div className={`relative h-full rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${featured ? "border border-blue-200/80 bg-gradient-to-br from-white via-blue-50/50 to-white shadow-2xl shadow-blue-100/80 dark:border-blue-800/40 dark:bg-slate-800/90" : "border border-gray-100 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 shadow-lg dark:border-slate-700 dark:from-slate-800 dark:via-slate-800 dark:to-blue-950/30"}`}>
          <motion.div
            className="pointer-events-none absolute -inset-px z-10 rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: useTransform([glowX, glowY], ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.08), transparent 40%)`),
            }}
          />

          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
            className="absolute left-0 right-0 top-0 h-1 rounded-t-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-500 dark:via-indigo-400 dark:to-purple-400"
          />

          <div className="relative z-20">
            {featured && (
              <div className="mb-5 inline-flex rounded-full bg-blue-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white">
                Solucion principal
              </div>
            )}

            <div className="mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-100 to-indigo-100 transition-transform duration-300 group-hover:scale-110 dark:border-blue-700/50 dark:from-blue-900/50 dark:to-indigo-900/50">
              <Icon size={28} className="text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className={`${featured ? "text-2xl lg:text-3xl" : "text-xl"} mb-3 font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400`}>
              <TranslateText text={service.title} />
            </h3>
            <p className={`${featured ? "max-w-2xl text-base" : ""} mb-6 text-justify leading-relaxed text-gray-600 dark:text-slate-400`}>
              <TranslateText text={service.desc} />
            </p>

            <div className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 group-hover:gap-3 dark:text-blue-400">
              <TranslateText text="Ver mas" />
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-blue-500/0 to-indigo-500/0 transition-all duration-500 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 dark:group-hover:from-blue-500/10 dark:group-hover:to-indigo-500/10" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
