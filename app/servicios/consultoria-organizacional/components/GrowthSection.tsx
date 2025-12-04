"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface GrowthSectionProps {
  title: string;
  description: string;
  highlight: string;
  ctaLabel: string;
  ctaLink: string;
}

export default function GrowthSection({
  title,
  description,
  highlight,
  ctaLabel,
  ctaLink,
}: GrowthSectionProps) {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">
              {title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              {description}
            </p>
            <p className="text-xl text-violet-600 font-bold mb-8">
              {highlight}
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-violet-500/25 hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-300"
              >
                {ctaLabel}
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-violet-100 to-purple-100 border border-violet-200 shadow-2xl flex items-center justify-center">
              {/* Growth Visual */}
              <div className="text-center p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    className="w-12 h-12"
                  >
                    <path d="M23 6l-9.5 9.5-5-5L1 18" />
                    <path d="M17 6h6v6" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-black text-violet-900 mb-2">
                  Crecimiento Sostenible
                </h3>
                <p className="text-violet-700/80">
                  Estrategias que impulsan resultados
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
