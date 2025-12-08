"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface ServiceHeroProps {
  title: string;
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
  description,
  imageSrc,
  imageAlt,
  backLink = "/servicios",
  backLabel = "Volver",
  ctaLabel = "Contactar a Bechapra",
  ctaLink = "#contacto",
}: ServiceHeroProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 pt-16 pb-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_0%,transparent_40%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08)_0%,transparent_40%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-[600px]"
          >
            {/* Back Link */}
            <Link
              href={backLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 rounded-full font-bold text-sm mb-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              {backLabel}
            </Link>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-[1.1] tracking-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-lg text-white/85 leading-relaxed mb-8 max-w-[540px]">
              {description}
            </p>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-br from-white to-blue-50 text-blue-700 rounded-full font-bold shadow-xl shadow-white/20 hover:shadow-2xl transition-all duration-300 border-2 border-white/30"
              >
                {ctaLabel}
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:flex justify-end items-center"
          >
            <div className="relative w-full max-w-[580px] h-[340px] rounded-2xl overflow-hidden shadow-2xl shadow-black/25">
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
