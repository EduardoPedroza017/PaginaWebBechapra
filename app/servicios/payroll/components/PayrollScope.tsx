"use client";

import { motion } from "framer-motion";

interface ScopeItem {
  text: string;
}

interface PayrollScopeProps {
  title: string;
  items: ScopeItem[];
}

export default function PayrollScope({ title, items }: PayrollScopeProps) {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-20 -left-20 w-56 h-56 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-gradient-to-tl from-blue-200 to-cyan-100 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-12 tracking-tight"
        >
          {title}
        </motion.h2>

        {/* Scope Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl p-5 border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Check Icon */}
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-300">
                <svg className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <p className="text-gray-700 font-medium pr-8 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
