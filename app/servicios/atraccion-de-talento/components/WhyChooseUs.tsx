"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
}

interface WhyChooseUsProps {
  title: string;
  benefits: Benefit[];
}

export default function WhyChooseUs({ title, benefits }: WhyChooseUsProps) {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-20 -left-20 w-56 h-56 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-gradient-to-tl from-amber-100 to-orange-100 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight"
        >
          <span className="text-gray-900">{title.split(' ').slice(0, -1).join(' ')} </span>
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            {title.split(' ').slice(-1)}
          </span>
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl hover:border-amber-200 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon size={28} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-amber-600/80 font-medium mb-4">
                  {benefit.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.desc}
                </p>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
