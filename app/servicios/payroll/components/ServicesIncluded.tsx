"use client";

import { motion } from "framer-motion";
import { TranslateText } from '@/components/TranslateText';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface ServicesIncludedProps {
  title: string;
  subtitle?: string;
  items: ServiceItem[];
}

export default function ServicesIncluded({
  title,
  subtitle,
  items,
}: ServicesIncludedProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-slate-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            <TranslateText text={title} />
          </h2>
          {subtitle && (
            <p className="text-lg text-blue-700 dark:text-blue-400 font-semibold max-w-2xl mx-auto">
              <TranslateText text={subtitle} />
            </p>
          )}
        </motion.div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                i % 2 === 0
                  ? "bg-white dark:bg-slate-800 border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg"
                  : "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg"
              }`}
            >
              <div className="w-12 h-12 min-w-[48px] bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-700">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
