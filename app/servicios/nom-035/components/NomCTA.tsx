"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface NomCTAProps {
  title: string;
  subtitle: string;
  primaryLabel?: string;
  primaryLink?: string;
  secondaryLabel?: string;
  secondaryLink?: string;
}

export default function NomCTA({
  title,
  subtitle,
  primaryLabel = "Contáctanos",
  primaryLink = "#contacto",
  secondaryLabel = "Solicitar presupuesto",
  secondaryLink = "#contacto",
}: NomCTAProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-full h-full bg-gradient-to-br from-white/10 dark:from-white/5 to-transparent rounded-full"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-1/2 -left-1/4 w-3/4 h-full bg-gradient-to-tr from-indigo-400/20 dark:from-indigo-600/15 to-transparent rounded-full"
        />
        {/* Floating Icons */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute"
            style={{
              left: `${5 + i * 16}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <ShieldCheck size={24 + i * 3} className="text-white/20" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
        >
          <TranslateText text={title} />
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-white/90 dark:text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          <TranslateText text={subtitle} />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={primaryLink}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-700 rounded-2xl font-bold text-lg shadow-xl shadow-black/15 hover:shadow-2xl hover:bg-blue-50 transition-all duration-300"
            >
              {primaryLabel}
              <ArrowRight size={22} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={secondaryLink}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/15 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/25 transition-all duration-300"
            >
              {secondaryLabel}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
