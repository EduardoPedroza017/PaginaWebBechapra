"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles, LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

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
  ctaLabel = "Solicitar consultoría",
  ctaLink = "#contacto",
}: ServiceHeroProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 pt-20 pb-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-blue-500/20 dark:from-blue-600/10 dark:to-blue-700/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-48 -left-32 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/20 to-indigo-500/20 dark:from-blue-600/10 dark:to-indigo-700/10 rounded-full blur-3xl"
        />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={backLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 text-blue-900 dark:text-white rounded-full font-bold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <TranslateText text={backLabel} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            {subtitle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full border border-white/20 dark:border-white/10 mb-6"
              >
                <Sparkles size={16} className="text-blue-400" />
                <span className="text-white/90 text-sm font-medium">
                  <TranslateText text={subtitle} />
                </span>
              </motion.div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              <TranslateText text={title} />
            </h1>

            {/* Description */}
            <p className="text-xl text-blue-100/90 dark:text-blue-200/80 leading-relaxed mb-8 max-w-xl">
              <TranslateText text={description} />
            </p>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-blue-900 dark:text-white rounded-2xl font-bold text-lg shadow-xl shadow-black/20 hover:shadow-2xl transition-all duration-300"
              >
                <TranslateText text={ctaLabel} />
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
            </div>
            {/* Decorative Element */}
            {IconComponent && (
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 dark:from-cyan-500 dark:to-blue-600 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <IconComponent size={36} className="text-white" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-white dark:fill-slate-900"
          />
        </svg>
      </div>
    </section>
  );
}
