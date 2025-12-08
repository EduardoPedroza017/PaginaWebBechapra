"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Modality {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface ModalitiesProps {
  title: string;
  modalities: Modality[];
}

const cardGradients = [
  "from-blue-500 to-indigo-600",
  "from-amber-500 to-orange-600",
  "from-purple-500 to-violet-600",
];

export default function Modalities({ title, modalities }: ModalitiesProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-950 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-blue-600/5 to-transparent rounded-full"
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center text-white mb-16 tracking-tight"
        >
          <TranslateText text={title} />
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modalities.map((modality, i) => {
            const Icon = modality.icon;
            return (
              <motion.div
                key={modality.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="group relative"
              >
                <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all duration-500 overflow-hidden">
                  {/* Top Gradient Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cardGradients[i % cardGradients.length]}`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cardGradients[i % cardGradients.length]} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">
                    {modality.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors">
                    {modality.desc}
                  </p>

                  {/* Hover Glow */}
                  <div
                    className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${cardGradients[i % cardGradients.length]} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
