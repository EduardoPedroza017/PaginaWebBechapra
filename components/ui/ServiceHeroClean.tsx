"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface ServiceHeroCleanProps {
  title: string;
  description: string;
  backLabel?: string;
  backLink?: string;
}

export default function ServiceHeroClean({
  title,
  description,
  backLabel = "Volver a Servicios",
  backLink = "/servicios",
}: ServiceHeroCleanProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
      <div className="relative z-10 max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 lg:px-8">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <TranslateText text={backLabel} />
        </Link>

        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter mb-8"
          >
            <TranslateText text={title} />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-justify"
          >
            <TranslateText text={description} />
          </motion.p>
        </div>
      </div>
    </section>
  );
}
