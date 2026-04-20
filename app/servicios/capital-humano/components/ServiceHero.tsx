"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Users, Sparkles, Newspaper } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';
import Section from "@/app/components/Section";

interface ServiceHeroProps {
  title: string;
  highlight?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  backLink?: string;
  backLabel?: string;
}

export default function ServiceHero({
  title,
  highlight,
  description,
  imageSrc,
  imageAlt,
  backLink = "/servicios",
  backLabel = "Volver a Servicios",
}: ServiceHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950">
      {/* Background Parallax Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 lg:px-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href={backLink}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md text-white/70 hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] border border-white/10 hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <TranslateText text={backLabel} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full"
            >
              <Sparkles size={14} />
              <TranslateText text="Solución Estratégica" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter"
            >
              {highlight ? (
                <>
                  <TranslateText text={title.split(highlight)[0] || ''} />
                  <span className="bg-linear-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent italic">
                    <TranslateText text={highlight} />
                  </span>
                  <TranslateText text={title.split(highlight)[1] || ''} />
                </>
              ) : (
                <TranslateText text={title} />
              )}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-slate-400 leading-relaxed font-medium max-w-xl"
            >
              <TranslateText text={description} />
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-4"
            >
              <Link
                href="#contacto"
                className="inline-flex items-center gap-3 px-10 py-5 bg-blue-700 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-2xl shadow-blue-700/30 hover:bg-blue-600 hover:-translate-y-1 transition-all group"
              >
                <TranslateText text="Contactar Ahora" />
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Image Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/5 group">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  priority
                  unoptimized={String(imageSrc).startsWith('http')}
                />
              ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                   <Newspaper size={64} className="text-white/10" />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>
            
            {/* Floating Detail Card */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl">
                  <Users size={28} />
                </div>
                <div>
                  <div className="text-lg font-black text-slate-900 dark:text-white leading-tight">Certificación</div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">Garantía Bausen</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
