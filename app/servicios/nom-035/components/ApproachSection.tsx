"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Step {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface ApproachSectionProps {
  title: string;
  steps: Step[];
}

export default function ApproachSection({ title, steps }: ApproachSectionProps) {
  return (
    <section id="enfoque" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-gradient-to-tl from-cyan-100 to-teal-100 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight"
        >
          <span className="text-gray-900">Nuestro </span>
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-emerald-50 via-teal-50/50 to-cyan-50/30 rounded-3xl p-8 border border-emerald-100 shadow-lg hover:shadow-2xl hover:border-emerald-300 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Large Number Background */}
                <div className="absolute -top-4 -right-4 text-[120px] font-black text-emerald-500/10 leading-none pointer-events-none">
                  {step.num}
                </div>

                {/* Top Gradient Line */}
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400 rounded-t-3xl"
                />

                {/* Icon */}
                <div className="relative w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 border border-emerald-200 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon size={32} className="text-emerald-600" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-emerald-800 mb-3 group-hover:text-emerald-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-teal-400/0 group-hover:from-emerald-400/5 group-hover:to-teal-400/5 rounded-3xl transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
