"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Trophy } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface CTASectionProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  primaryLink?: string;
  primaryLabel?: string;
  secondaryLink?: string;
  secondaryLabel?: string;
}

export default function CTASection({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  primaryLink = "#contacto",
  primaryLabel = "Agenda una cita",
  secondaryLink = "#",
  secondaryLabel = "Ver casos de éxito",
}: CTASectionProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-gradient-to-tl from-amber-400/10 to-transparent rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              <TranslateText text={title} />
            </h2>
            <p className="text-xl text-blue-100/90 dark:text-blue-200/80 mb-10 leading-relaxed">
              <TranslateText text={subtitle} />
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={primaryLink}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-blue-900 dark:text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Calendar size={20} />
                  <TranslateText text={primaryLabel} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={secondaryLink}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 dark:bg-white/5 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
                >
                  <Trophy size={20} />
                  <TranslateText text={secondaryLabel} />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Trophy size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900">500+</div>
                  <div className="text-sm text-gray-500">Empresas</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
