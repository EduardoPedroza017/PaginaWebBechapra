"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface HowWeWorkProps {
  title: string;
  description: string;
  points: string[];
  imageSrc: string;
  imageAlt: string;
}

export default function HowWeWork({
  title,
  description,
  points,
  imageSrc,
  imageAlt,
}: HowWeWorkProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-blue-50 via-blue-50/50 to-slate-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900 overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-blue-200/20 dark:from-blue-900/20 dark:to-blue-800/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-gradient-to-tl from-blue-200/25 to-blue-200/15 dark:from-blue-900/15 dark:to-blue-800/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-blue-500/20 dark:from-blue-600/10 dark:to-blue-700/10 rounded-3xl blur-2xl" />
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/50 dark:border-slate-700/50">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-blue-900 dark:text-white mb-6 tracking-tight">
              <TranslateText text={title} />
            </h2>
            <p className="text-lg text-blue-800/80 dark:text-slate-300 leading-relaxed mb-8">
              <TranslateText text={description} />
            </p>

            <div className="space-y-4">
              {points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-6 h-6 min-w-[24px] rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <span className="text-blue-900 font-medium leading-relaxed">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
