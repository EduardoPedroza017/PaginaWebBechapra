"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface TrainingHeroProps {
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

export default function TrainingHero({
  title,
  highlightWord,
  description,
  imageSrc,
  imageAlt,
  backLink = "/servicios",
  backLabel = "Volver",
  ctaLabel = "Solicitar diagnóstico",
  ctaLink = "#contacto",
}: TrainingHeroProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] min-h-[620px] bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 pt-20 pb-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 180],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/3 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-blue-400/20 via-blue-500/15 to-transparent dark:from-blue-600/10 dark:via-blue-700/8 dark:to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 3 }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/15 via-blue-500/10 to-transparent dark:from-blue-600/8 dark:via-blue-700/5 dark:to-transparent rounded-full blur-3xl"
        />
        {/* Mesh Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Floating Icons */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              delay: i * 0.7,
            }}
            className="absolute"
            style={{
              left: `${10 + i * 18}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
          >
            <GraduationCap size={20 + i * 4} className="text-white/20" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href={backLink}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-sm mb-8 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 group"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform duration-300"
                />
                {backLabel}
              </Link>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full border border-cyan-400/30 mb-6"
            >
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-cyan-200 text-sm font-medium">
                Formación Certificada
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              {title}{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                {highlightWord}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed mb-10 max-w-[540px]">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={ctaLink}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300"
                >
                  {ctaLabel}
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#programas"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Ver programas
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-3xl blur-2xl" />

              <div className="relative w-full max-w-[550px] h-[380px] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
              </div>

              {/* Floating Stats */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 px-5 py-3 bg-white rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">100%</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Cursos</div>
                    <div className="text-sm font-bold text-gray-900">Prácticos</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-4 -right-4 px-5 py-3 bg-white rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                    <GraduationCap size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Instructores</div>
                    <div className="text-sm font-bold text-gray-900">Certificados</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
