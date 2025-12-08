"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Trophy } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface DarkCTAProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  primaryLink?: string;
  primaryLabel?: string;
  secondaryLink?: string;
  secondaryLabel?: string;
}

export default function DarkCTA({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  primaryLink = "#contacto",
  primaryLabel = "Agenda una cita",
  secondaryLink = "#",
  secondaryLabel = "Ver casos de éxito",
}: DarkCTAProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-gradient-to-tl from-indigo-600/10 to-transparent rounded-full"
        />
        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
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
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
            >
              <TranslateText text={title} />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-gray-300 dark:text-gray-400 mb-10 leading-relaxed"
            >
              <TranslateText text={subtitle} />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={primaryLink}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/25 hover:bg-blue-500 transition-all duration-300"
                >
                  <Calendar size={20} />
                  {primaryLabel}
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={secondaryLink}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white rounded-2xl font-bold text-lg border-2 border-blue-600 dark:border-blue-700 hover:bg-blue-600/10 dark:hover:bg-blue-700/10 transition-all duration-300"
                >
                  <Trophy size={20} />
                  <TranslateText text={secondaryLabel} />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-[520px] aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
