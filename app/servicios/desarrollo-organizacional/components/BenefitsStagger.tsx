"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Benefit {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface BenefitsStaggerProps {
  title: string;
  benefits: Benefit[];
  imageSrc: string;
  imageAlt: string;
}

export default function BenefitsStagger({
  title,
  benefits,
  imageSrc,
  imageAlt,
}: BenefitsStaggerProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-blue-100/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Content */}
          <div>
            {/* Header */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-12"
            >
              <TranslateText text={title.split(" ").slice(0, -1).join(" ")} />{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                <TranslateText text={title.split(" ").slice(-1).join(" ")} />
              </span>
            </motion.h2>

            {/* Staggered Cards */}
            <div className="flex flex-col gap-6">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    whileHover={{ scale: 1.03, x: 10 }}
                    style={{ marginLeft: `${i * 2}rem` }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700 hover:border-blue-600 dark:hover:border-blue-700 group transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 group-hover:bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                        <Icon
                          size={28}
                          className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-white mb-2 transition-colors duration-300">
                          <TranslateText text={benefit.title} />
                        </h3>
                        <p className="text-gray-600 dark:text-slate-400 group-hover:text-blue-100 text-sm leading-relaxed transition-colors duration-300">
                          <TranslateText text={benefit.desc} />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center items-center"
          >
            <div className="relative">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={300}
                height={420}
                className="rounded-3xl shadow-2xl object-cover"
              />
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl -z-10"
              />
              <motion.div
                animate={{ rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 dark:from-cyan-500 dark:to-blue-600 rounded-2xl -z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
