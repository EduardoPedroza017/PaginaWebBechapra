"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Benefit {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface BenefitsGridProps {
  title: string;
  benefits: Benefit[];
}

const cardColors = [
  "from-blue-500 to-indigo-600",
  "from-blue-600 to-indigo-700",
  "from-blue-500 to-blue-700",
  "from-indigo-500 to-blue-600",
];

export default function BenefitsGrid({ title, benefits }: BenefitsGridProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight"
        >
          <span className="text-gray-900 dark:text-white"><TranslateText text={title.split(' ').slice(0, -1).join(' ')} /> </span>
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            <TranslateText text={title.split(' ').slice(-1)[0]} />
          </span>
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative h-full bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-slate-700">
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cardColors[i % cardColors.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cardColors[i % cardColors.length]} flex items-center justify-center mb-6 shadow-lg group-hover:bg-white/20 group-hover:shadow-xl transition-all duration-500`}>
                      <Icon size={28} className="text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-500">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 group-hover:text-white/90 leading-relaxed transition-colors duration-500">
                      {benefit.desc}
                    </p>
                  </div>

                  {/* Decorative Circle */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-50 group-hover:opacity-20 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
