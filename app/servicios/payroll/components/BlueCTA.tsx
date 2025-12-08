"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface BlueCTAProps {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export default function BlueCTA({
  title,
  subtitle,
  ctaLabel = "Solicitar consultoria gratuita",
  ctaLink = "#contacto",
}: BlueCTAProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-blue-500/10 dark:from-blue-600/5 to-transparent rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-gradient-to-tl from-indigo-500/10 dark:from-indigo-600/5 to-transparent rounded-full"
        />
        {/* Dots Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
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
          className="text-xl text-blue-100/90 dark:text-blue-200/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          <TranslateText text={subtitle} />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-900 rounded-2xl font-bold text-lg shadow-xl shadow-black/20 hover:shadow-2xl transition-all duration-300"
          >
            <TranslateText text={ctaLabel} />
            <ArrowRight size={22} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
