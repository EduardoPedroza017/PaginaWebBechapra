"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles, Users } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { AnimatedHeroBackground } from "@/components/ui/AnimatedHeroBackground";

interface TalentHeroProps {
  title: string;
  highlightWord: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  backLink?: string;
  backLabel?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

const servicesBlueGradient =
  "linear-gradient(90deg, var(--hero-services-from) 0%, var(--hero-services-via) 52%, var(--hero-services-to) 100%)";
const servicesBlueGlow =
  "radial-gradient(circle at 18% 26%, var(--hero-services-glow-primary) 0%, transparent 38%), radial-gradient(circle at 82% 24%, var(--hero-services-glow-secondary) 0%, transparent 32%)";

export default function TalentHero({
  title,
  highlightWord,
  description,
  imageSrc,
  imageAlt,
  backLink = "/servicios",
  backLabel = "Volver",
  ctaLabel = "Contactar a BAUSEN",
  ctaLink = "#contacto",
}: TalentHeroProps) {
  return (
    <AnimatedHeroBackground
      gradientClass=""
      style={{
        backgroundColor: "var(--hero-services-from)",
        backgroundImage: `${servicesBlueGlow}, ${servicesBlueGradient}`,
      }}
      overlayClassName="bg-black/10"
      orbClass="from-white/20 via-white/10 to-transparent"
      orbAnimation={{ scale: [1, 1.22, 1], opacity: [0.18, 0.3, 0.18] }}
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 10, 0],
            opacity: [0.18, 0.35, 0.18],
          }}
          transition={{
            duration: 5 + i * 0.8,
            repeat: Infinity,
            delay: i * 0.7,
          }}
          className="absolute z-20"
          style={{
            left: `${10 + i * 18}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
        >
          <Users size={20 + i * 4} className="text-white/18" />
        </motion.div>
      ))}

      <div className="relative z-30 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href={backLink}
                className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/16 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/24"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
                <TranslateText text={backLabel} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/14 px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles size={16} className="text-blue-100" />
              <span className="text-sm font-medium text-white">
                <TranslateText text="Reclutamiento Especializado" />
              </span>
            </motion.div>

            <h1 className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              <TranslateText text={title} />{" "}
              <span className="bg-gradient-to-r from-blue-100 via-cyan-100 to-white bg-clip-text text-transparent">
                <TranslateText text={highlightWord} />
              </span>
            </h1>

            <p className="mb-10 max-w-[540px] text-lg leading-relaxed text-white/88 md:text-xl">
              <TranslateText text={description} />
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={ctaLink}
                  className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-xl shadow-blue-950/20 transition-all duration-300 hover:shadow-2xl"
                >
                  <TranslateText text={ctaLabel} />
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#proceso"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/28 bg-white/12 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/18"
                >
                  <TranslateText text="Ver proceso" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-white/25 via-white/10 to-transparent blur-2xl" />

              <div className="relative h-[380px] w-full max-w-[550px] overflow-hidden rounded-2xl border border-white/18 shadow-2xl shadow-blue-950/30">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent" />
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 rounded-xl bg-white px-5 py-3 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    <span className="text-sm font-bold">85%</span>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">
                      <TranslateText text="Tasa de" />
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      <TranslateText text="Aceptación" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -right-4 -top-4 rounded-xl bg-white px-5 py-3 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    <span className="text-sm font-bold">48h</span>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">
                      <TranslateText text="Respuesta" />
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      <TranslateText text="Primeros CVs" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="h-auto w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-white dark:fill-slate-900"
          />
        </svg>
      </div>
    </AnimatedHeroBackground>
  );
}
