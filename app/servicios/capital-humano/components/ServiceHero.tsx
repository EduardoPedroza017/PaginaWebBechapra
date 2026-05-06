"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Users, Sparkles, Newspaper } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

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
  const servicesBlueGradient = "linear-gradient(90deg, var(--hero-services-from), var(--hero-services-via), var(--hero-services-to))";
  const servicesBlueGlow =
    "radial-gradient(circle at 30% 40%, var(--hero-services-glow-primary) 0%, transparent 40%), radial-gradient(circle at 70% 60%, var(--hero-services-glow-secondary) 0%, transparent 40%)";

  return (
    <section
      className="relative overflow-hidden pb-20 pt-32 lg:pb-32 lg:pt-48"
      style={{
        backgroundColor: "var(--hero-services-from)",
        background: servicesBlueGradient,
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "transparent",
            backgroundImage: servicesBlueGlow,
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 2xl:max-w-[1440px]">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <Link
            href={backLink}
            className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <TranslateText text={backLabel} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white"
            >
              <Sparkles size={14} />
              <TranslateText text="Solucion Estrategica" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl font-black leading-[0.95] tracking-tighter text-white lg:text-8xl"
            >
              {highlight ? (
                <>
                  <TranslateText text={title.split(highlight)[0] || ""} />
                  <span className="bg-linear-to-r from-blue-200 via-cyan-200 to-blue-100 bg-clip-text text-transparent italic">
                    <TranslateText text={highlight} />
                  </span>
                  <TranslateText text={title.split(highlight)[1] || ""} />
                </>
              ) : (
                <TranslateText text={title} />
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-xl text-xl font-medium leading-relaxed text-white/85"
            >
              <TranslateText text={description} />
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="pt-4">
              <Link
                href="#contacto"
                className="group inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-sm font-black uppercase tracking-widest text-[var(--hero-services-to)] shadow-2xl shadow-blue-900/25 transition-all hover:-translate-y-1 hover:bg-blue-50"
              >
                <TranslateText text="Contactar Ahora" />
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[3rem] border border-white/15 shadow-2xl shadow-black/35">
              {imageSrc ? (
                <Image src={imageSrc} alt={imageAlt} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" priority unoptimized={String(imageSrc).startsWith("http")} />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-900/40">
                  <Newspaper size={64} className="text-white/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-blue-950/55 via-transparent to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-4 left-4 rounded-[2rem] border border-slate-200/80 bg-white/92 p-8 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl">
                  <Users size={28} />
                </div>
                <div>
                  <div className="text-lg font-black leading-tight text-slate-900"><TranslateText text="Certificación" /></div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-widest text-blue-600"><TranslateText text="Garantía Bausen" /></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
