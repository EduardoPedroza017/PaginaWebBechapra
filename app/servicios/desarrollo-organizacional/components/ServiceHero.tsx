"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles, LucideIcon } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { AnimatedHeroBackground } from "@/components/ui/AnimatedHeroBackground";

interface ServiceHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  iconComponent?: LucideIcon;
  backLink?: string;
  backLabel?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export default function ServiceHero({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  iconComponent: IconComponent,
  backLink = "/servicios",
  backLabel = "Volver",
  ctaLabel = "Solicitar consultoria",
  ctaLink = "#contacto",
}: ServiceHeroProps) {
  const servicesBlueGradient = "linear-gradient(90deg, var(--hero-services-from), var(--hero-services-via), var(--hero-services-to))";
  const servicesBlueGlow =
    "radial-gradient(circle at 30% 40%, var(--hero-services-glow-primary) 0%, transparent 40%), radial-gradient(circle at 70% 60%, var(--hero-services-glow-secondary) 0%, transparent 40%)";

  return (
    <AnimatedHeroBackground
      gradientClass=""
      style={{
        backgroundColor: "var(--hero-services-from)",
        backgroundImage: `${servicesBlueGlow}, ${servicesBlueGradient}`,
      }}
      overlayClassName="bg-black/10"
      orbClass="absolute -top-1/3 -right-1/4 w-[700px] h-[700px] rounded-full bg-white/10 blur-3xl"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href={backLink}
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-bold text-white/80 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <TranslateText text={backLabel} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {subtitle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <Sparkles size={16} className="text-white" />
                <span className="text-sm font-medium text-white">
                  <TranslateText text={subtitle} />
                </span>
              </motion.div>
            )}

            <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              <TranslateText text={title} />
            </h1>

            <p className="mb-8 max-w-xl text-xl leading-relaxed text-white/85">
              <TranslateText text={description} />
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-[var(--hero-services-to)] shadow-xl shadow-black/20 transition-all duration-300 hover:shadow-2xl"
              >
                <TranslateText text={ctaLabel} />
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-4/3 w-full max-w-130 overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-black/30">
              {imageSrc ? (
                <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority unoptimized={String(imageSrc).startsWith("http")} />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-900/40">
                  <svg className="h-16 w-16 text-white/60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                    <path d="M8 10h.01" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M3 19l4-4 3 3 5-5 6 6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-blue-950/45 to-transparent" />
            </div>
            {IconComponent && (
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 shadow-xl"
              >
                <IconComponent size={36} className="text-white" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-white dark:fill-slate-900"
          />
        </svg>
      </div>
    </AnimatedHeroBackground>
  );
}
