"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface ServiceHeroProps {
  title: string;
  highlightWord?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  backLink?: string;
  backLabel?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export default function ServiceHero({
  title,
  highlightWord,
  description,
  imageSrc,
  imageAlt,
  backLink = "/servicios",
  backLabel = "Volver",
  ctaLabel = "Solicitar asesoria",
  ctaLink = "#contacto",
}: ServiceHeroProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 dark:from-slate-950 dark:via-blue-950 dark:to-blue-900 pt-24 pb-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-white/10 dark:bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-12 -left-12 w-[250px] h-[250px] bg-blue-400/15 dark:bg-blue-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Back Link */}
            <Link
              href={backLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 text-blue-900 dark:text-white rounded-full font-semibold text-sm mb-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              <TranslateText text={backLabel} />
            </Link>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.8rem] font-black text-white mb-6 leading-[1.1] tracking-tight">
              <TranslateText text={title} />{" "}
              {highlightWord && (
                <span className="bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-300 dark:to-blue-400 bg-clip-text text-transparent">
                  <TranslateText text={highlightWord} />
                </span>
              )}
            </h1>

            {/* Description */}
            <p className="text-xl text-white/90 dark:text-white/80 leading-relaxed mb-8 max-w-xl">
              <TranslateText text={description} />
            </p>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-blue-900 dark:text-white rounded-xl font-bold text-lg shadow-xl shadow-black/15 hover:shadow-2xl transition-all duration-300"
              >
                <TranslateText text={ctaLabel} />
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-[520px] h-[380px] rounded-2xl overflow-hidden shadow-2xl shadow-black/25">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
