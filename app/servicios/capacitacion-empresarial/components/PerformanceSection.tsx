"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface PerformanceSectionProps {
  title: string;
  description: string;
  highlight: string;
  ctaLabel: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt: string;
}

export default function PerformanceSection({
  title,
  description,
  highlight,
  ctaLabel,
  ctaLink,
  imageSrc,
  imageAlt,
}: PerformanceSectionProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-blue-50 via-blue-50/50 to-slate-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900 overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-blue-200/20 dark:from-blue-900/20 dark:to-blue-800/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-blue-900 dark:text-white mb-6 tracking-tight">
              <TranslateText text={title} />
            </h2>
            <p className="text-lg text-blue-800/80 dark:text-slate-300 leading-relaxed mb-4">
              <TranslateText text={description} />
            </p>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-bold italic mb-8">
              <TranslateText text={highlight} />
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300"
              >
                <TranslateText text={ctaLabel} />
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/50">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
