"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  primaryLabel = "Solicitar reunion",
  secondaryLink = "/servicios",
  secondaryLabel = "Ver servicios",
}: DarkCTAProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-20 px-6 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] font-black text-white mb-5 leading-tight tracking-tight">
              <TranslateText text={title} />
            </h2>

            <p className="text-lg text-white/85 dark:text-white/80 mb-10 leading-relaxed">
              <TranslateText text={subtitle} />
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={primaryLink}
                  className="inline-block px-10 py-4 bg-blue-600 dark:bg-blue-700 text-white rounded-xl font-bold text-base shadow-xl shadow-blue-600/30 dark:shadow-blue-700/20 hover:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 min-w-[220px] text-center"
                >
                  <TranslateText text={primaryLabel} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={secondaryLink}
                  className="inline-block px-10 py-4 bg-transparent text-white rounded-xl font-bold text-base border-2 border-white/30 dark:border-white/20 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 min-w-[220px] text-center"
                >
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
            className="hidden lg:flex justify-end items-center"
          >
            <div className="w-full max-w-[520px] h-[300px] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={520}
                height={300}
                quality={95}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
