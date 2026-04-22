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

interface ServiceCardsProps {
  title: string;
  services: Service[];
}

export default function ServiceCards({ title, services }: ServiceCardsProps) {
  return (
    <section className="bg-white px-6 py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-blue-700 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-400">
            Especializacion
          </span>
          <h2 className="text-4xl font-black tracking-tight text-blue-900 dark:text-white md:text-5xl lg:text-6xl">
            <TranslateText text={title} />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`group relative ${featured ? "md:col-span-2" : ""}`}
    >
      <Link href={service.href} className="block h-full">
        <div className={`relative flex min-h-[280px] h-full flex-col rounded-[2.5rem] p-8 transition-all duration-300 ${featured ? "border border-blue-200/80 bg-gradient-to-br from-white via-blue-50/50 to-white shadow-2xl shadow-blue-100/80 dark:border-blue-800/40 dark:bg-slate-800/90" : "border border-gray-100 border-l-4 border-l-blue-600 bg-white shadow-lg hover:shadow-2xl dark:border-slate-700 dark:border-l-blue-500 dark:bg-slate-800"}`}>
          <motion.div
            className="pointer-events-none absolute -inset-px z-10 rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: useTransform([glowX, glowY], ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.08), transparent 40%)`),
            }}
          />

          <div className="relative z-20 flex h-full flex-col">
            {featured && (
              <div className="mb-5 inline-flex w-fit rounded-full bg-blue-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white">
                Servicio principal
              </div>
            )}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-50 transition-colors duration-300 group-hover:bg-blue-100 dark:bg-blue-900/50 dark:group-hover:bg-blue-900">
              <Icon size={32} className="text-blue-900 dark:text-blue-400" />
            </div>

            <div className="flex-1">
              <h3 className={`${featured ? "text-2xl lg:text-3xl" : "text-xl"} mb-3 font-bold text-gray-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400`}>
                <TranslateText text={service.title} />
              </h3>
              <p className={`${featured ? "max-w-2xl text-base" : ""} mb-6 leading-relaxed text-gray-600 dark:text-slate-400 text-justify`}>
                <TranslateText text={service.desc} />
              </p>
            </div>

            <div className="mt-auto inline-flex items-center gap-2 text-blue-600 font-bold transition-all duration-300 group-hover:gap-3 dark:text-blue-400">
              <TranslateText text="Ver mas" />
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
