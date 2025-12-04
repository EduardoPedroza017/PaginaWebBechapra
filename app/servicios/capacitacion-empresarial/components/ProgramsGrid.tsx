"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Program {
  title: string;
  icon: LucideIcon;
  desc: string;
  color: string;
}

interface ProgramsGridProps {
  title: string;
  programs: Program[];
}

export default function ProgramsGrid({ title, programs }: ProgramsGridProps) {
  return (
    <section id="programas" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-gradient-to-tl from-teal-100 to-emerald-100 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight"
        >
          <span className="text-gray-900">Nuestros Programas de </span>
          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Capacitación
          </span>
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, i) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all duration-500 cursor-pointer overflow-hidden text-center"
              >
                {/* Top Gradient Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${program.color}, ${program.color}99)` }}
                />

                {/* Background Glow */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `${program.color}15` }}
                />

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.2, type: "spring" }}
                  className="relative w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center border-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${program.color}15, ${program.color}08)`,
                    borderColor: `${program.color}20`,
                  }}
                >
                  <Icon size={36} style={{ color: program.color }} />
                </motion.div>

                {/* Content */}
                <h3
                  className="text-xl font-bold mb-3 transition-colors group-hover:brightness-110"
                  style={{ color: program.color }}
                >
                  {program.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {program.desc}
                </p>

                {/* Bottom Accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(90deg, ${program.color}, ${program.color}99)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
