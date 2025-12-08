"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "./data/homeData";
import { ArrowUpRight } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <motion.a
      href={service.href}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-800/90 dark:border dark:border-slate-700 dark:hover:border-slate-600"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent dark:from-slate-950/80 dark:via-slate-900/40 dark:to-transparent" />
        
        {/* Icon Badge */}
        <div className="absolute top-4 left-4 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-white/95 backdrop-blur-sm dark:bg-slate-800/95 dark:border dark:border-slate-700">
          <Image src={service.icon} alt="" width={36} height={36} className="object-contain" />
        </div>
        
        {/* Arrow */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-blue-600/90 backdrop-blur-sm dark:bg-blue-600/80">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors text-slate-900 dark:text-white">
          <TranslateText text={service.title} />
        </h3>
        <p className="text-sm leading-relaxed flex-1 text-slate-500 dark:text-slate-400">
          <TranslateText text={service.description} />
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
            <TranslateText text="Conocer más" />
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function ServicesSection() {
  return (
    <section id="servicios">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="inline-block font-semibold text-sm px-4 py-2 rounded-full mb-4 text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30 dark:border dark:border-blue-800/50">
          <TranslateText text="Lo que hacemos" />
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
          <TranslateText text="Nuestros Servicios" />
        </h2>
        <div className="w-24 h-1.5 rounded-full mx-auto mb-6 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-400" />
        <p className="text-lg max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
          <TranslateText text="Soluciones integrales diseñadas para optimizar cada aspecto de tu organización" />
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
