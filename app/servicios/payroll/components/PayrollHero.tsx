"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { AnimatedHeroBackground } from "@/components/ui/AnimatedHeroBackground";

interface PayrollHeroProps {
  title: string;
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

export default function PayrollHero({
  title,
  description,
  imageSrc,
  imageAlt,
  backLink = "/servicios",
  backLabel = "Volver",
  ctaLabel = "Contactar a BAUSEN",
  ctaLink = "#contacto",
}: PayrollHeroProps) {
  return (
    <AnimatedHeroBackground
      gradientClass=""
      style={{
        backgroundColor: "var(--hero-services-from)",
        backgroundImage: `${servicesBlueGlow}, ${servicesBlueGradient}`,
      }}
      overlayClassName="bg-black/10"
      orbClass="from-white/20 via-white/10 to-transparent"
      orbAnimation={{ scale: [1, 1.2, 1], opacity: [0.18, 0.3, 0.18] }}
    >
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -28, 0],
            opacity: [0.22, 0.45, 0.22],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.45,
          }}
          className="absolute z-20 h-2 w-2 rounded-full bg-white/35"
          style={{
            left: `${15 + i * 13}%`,
            top: `${18 + (i % 3) * 24}%`,
          }}
        />
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
                <TranslateText text="Servicio Premium" />
              </span>
            </motion.div>

            <h1 className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              {title.split("&").map((part, i) => (
                <span key={i}>
                  {i > 0 && (
                    <span className="bg-gradient-to-r from-blue-100 via-cyan-100 to-white bg-clip-text text-transparent">
                      &
                    </span>
                  )}
                  <TranslateText text={part} />
                </span>
              ))}
            </h1>

            <p className="mb-10 max-w-140 text-lg leading-relaxed text-white/88 md:text-xl">
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

              <div className="relative aspect-11/8 w-full max-w-140 overflow-hidden rounded-2xl border border-white/18 shadow-2xl shadow-blue-950/30">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    priority
                    unoptimized={String(imageSrc).startsWith("http")}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white/10">
                    <svg
                      className="h-16 w-16 text-white/60"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8 10h.01"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M3 19l4-4 3 3 5-5 6 6"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent" />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-4 left-4 rounded-2xl bg-white px-6 py-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">
                      <TranslateText text="Cumplimiento" />
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                      <TranslateText text="100% Legal" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

    </AnimatedHeroBackground>
  );
}
