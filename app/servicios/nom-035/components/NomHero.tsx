"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatedHeroBackground } from "@/components/ui/AnimatedHeroBackground";

interface NomHeroProps {
  title: string;
  highlightWord: string;
  description: string;
  backLink?: string;
  backLabel?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export default function NomHero({
  title,
  highlightWord,
  description,
  backLink = "/servicios",
  backLabel = "Volver",
  ctaLabel = "Solicitar asesoria",
  ctaLink = "#contacto",
}: NomHeroProps) {
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
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -25, 0], rotate: [0, 10, 0], opacity: [0.16, 0.32, 0.16] }}
          transition={{ duration: 5 + i * 0.8, repeat: Infinity, delay: i * 0.7 }}
          className="absolute z-20"
          style={{ left: `${10 + i * 18}%`, top: `${15 + (i % 3) * 25}%` }}
        >
          <ShieldCheck size={20 + i * 4} className="text-white/18" />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Link
                href={backLink}
                className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/40"
              >
                <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                {backLabel}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles size={16} className="text-white" />
              <span className="text-sm font-medium text-white">Cumplimiento Normativo</span>
            </motion.div>

            <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              {title}{" "}
              <span className="bg-gradient-to-r from-blue-100 via-cyan-100 to-white bg-clip-text text-transparent">{highlightWord}</span>
            </h1>

            <p className="mb-10 max-w-140 text-lg leading-relaxed text-white/88 md:text-xl">{description}</p>

            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={ctaLink}
                  className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-(--hero-services-to) shadow-xl shadow-blue-900/20 transition-all duration-300 hover:shadow-2xl"
                >
                  {ctaLabel}
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#enfoque"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                >
                  Ver enfoque
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative hidden items-center justify-center lg:flex"
          >
            <div className="relative aspect-11/9 w-full max-w-[450px]">
              <div className="absolute inset-0 rounded-3xl bg-white/12 blur-3xl" />
              <div className="relative flex h-full flex-col justify-center rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                <div className="absolute left-0 right-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-blue-100 via-white to-cyan-100" />

                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-white shadow-xl"
                  >
                    <ShieldCheck size={48} className="text-[var(--hero-services-to)]" />
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-black text-white">NOM-035-STPS</h3>
                  <p className="text-sm text-white/80">Factores de riesgo psicosocial</p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/12 p-4 text-center">
                    <div className="text-2xl font-black text-white">+120</div>
                    <div className="text-xs text-white/75">Organizaciones</div>
                  </div>
                  <div className="rounded-xl bg-white/12 p-4 text-center">
                    <div className="text-2xl font-black text-white">95%</div>
                    <div className="text-xs text-white/75">Exito</div>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute bottom-4 right-4 rounded-xl bg-white px-5 py-3 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <ShieldCheck size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Bienestar</div>
                    <div className="text-sm font-bold text-gray-900">Garantizado</div>
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
