"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

export default function TeamSection() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-semibold mb-4">
            <Users size={16} />
            <TranslateText text="Liderazgo" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            <TranslateText text="Nuestro Equipo" />{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              <TranslateText text="Directivo" />
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            <TranslateText text="Liderazgo con experiencia y compromiso con la excelencia." />
          </p>
        </motion.div>

        {/* Team Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-10 text-center max-w-sm shadow-2xl shadow-blue-900/30 overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/30 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ opacity: [0.1, 0.15, 0.1], scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/30 rounded-full blur-3xl"
              />
            </div>

            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative z-10 w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl"
            >
              <Users size={40} className="text-blue-600" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">
                <TranslateText text="Dirección General" />
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-500 mx-auto rounded-full mb-4" />
              <p className="text-blue-200 font-medium">
                <TranslateText text="Chief Executive Officer" />
              </p>
            </div>

            {/* Decorative Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
