"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Benefit {
  icon: LucideIcon;
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-blue-900 dark:text-white text-center mb-16 tracking-tight"
        >
          <TranslateText text={title} />
        </motion.h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 to-blue-700/10 pointer-events-none" />
          </motion.div>

          {/* Right - Benefits Stagger */}
          <div className="flex flex-col gap-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              const isHovered = hoveredIndex === i;

              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ marginLeft: `${i * 60}px` }}
                  className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-400 overflow-hidden ${
                    isHovered
                      ? "bg-gradient-to-br from-blue-900 to-blue-700 dark:from-blue-800 dark:to-blue-900 shadow-2xl shadow-blue-900/35 dark:shadow-blue-800/30"
                      : "bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-blue-950/30 border-2 border-blue-100/50 dark:border-slate-700 shadow-lg"
                  }`}
                >
                  {/* Left Border Accent */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl transition-all duration-400 ${
                      isHovered
                        ? "bg-gradient-to-b from-blue-400 to-blue-500 dark:from-blue-300 dark:to-blue-400"
                        : "bg-gradient-to-b from-blue-900 via-blue-700 to-blue-600 dark:from-blue-700 dark:via-blue-600 dark:to-blue-500"
                    }`}
                  />

                  {/* Content */}
                  <div className="flex items-start gap-6 relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-[70px] h-[70px] min-w-[70px] rounded-2xl flex items-center justify-center transition-all duration-400 ${
                        isHovered
                          ? "bg-white/20 border border-white/30"
                          : "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 border border-blue-200/50 dark:border-blue-700/50"
                      }`}
                    >
                      <Icon
                        size={36}
                        strokeWidth={2.5}
                        className={`transition-colors duration-400 ${
                          isHovered ? "text-white" : "text-blue-900 dark:text-blue-400"
                        }`}
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3
                        className={`text-xl font-bold mb-3 leading-tight transition-colors duration-400 ${
                          isHovered ? "text-white" : "text-blue-900 dark:text-white"
                        }`}
                      >
                        <TranslateText text={benefit.title} />
                      </h3>
                      <p
                        className={`text-base leading-relaxed text-justify transition-colors duration-400 ${
                          isHovered ? "text-white/95" : "text-gray-600 dark:text-slate-400"
                        }`}
                      >
                        <TranslateText text={benefit.desc} />
                      </p>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  {isHovered && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15)_0%,transparent_60%)] rounded-2xl pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
