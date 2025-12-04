"use client";

import { motion } from "framer-motion";

interface PositionsCloudProps {
  title: string;
  positions: string[];
}

export default function PositionsCloud({ title, positions }: PositionsCloudProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-12 tracking-tight"
        >
          {title}
        </motion.h2>

        {/* Tags Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {positions.map((position, i) => (
            <motion.span
              key={position}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              whileHover={{ scale: 1.1, y: -4 }}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm cursor-pointer transition-all duration-300 ${
                i % 3 === 0
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/40"
                  : i % 3 === 1
                  ? "bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-400 hover:text-amber-600"
                  : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200"
              }`}
            >
              {position}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-gray-500 mt-8 text-sm"
        >
          Y muchos mas perfiles operativos, administrativos y especializados
        </motion.p>
      </div>
    </section>
  );
}
