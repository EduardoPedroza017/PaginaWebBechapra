"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Benefit {
  title: string;
  desc: string;
}

interface BenefitsSectionProps {
  title: string;
  benefits: Benefit[];
  imageSrc: string;
  imageAlt: string;
}

export default function BenefitsSection({
  title,
  benefits,
  imageSrc,
  imageAlt,
}: BenefitsSectionProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50/50 dark:from-slate-950 dark:to-blue-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent" />
            </div>
            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl -z-10"
            />
            <motion.div
              animate={{ rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl -z-10"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold mb-6">
              <CheckCircle size={16} />
              <TranslateText text="Beneficios Exclusivos" />
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">
              <TranslateText text={title.split(" ").slice(0, -2).join(" ")} />{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                <TranslateText text={title.split(" ").slice(-2).join(" ")} />
              </span>
            </h2>

            {/* Benefits Cards */}
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        <TranslateText text={benefit.title} />
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                        <TranslateText text={benefit.desc} />
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
