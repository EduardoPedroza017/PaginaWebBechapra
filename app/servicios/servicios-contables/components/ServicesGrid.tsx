"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface ServicesGridProps {
  services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4"
          >
            <TranslateText text="Nuestros Servicios" />
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            <TranslateText text="Qué" />{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              <TranslateText text="ofrecemos" />
            </span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-blue-50 via-indigo-50/50 to-slate-50 dark:from-slate-800 dark:via-blue-950/30 dark:to-slate-800 rounded-3xl p-8 border border-blue-100 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Top Accent */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 dark:from-blue-600 dark:via-indigo-600 dark:to-blue-600 rounded-t-3xl"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20 group-hover:shadow-blue-500/40 dark:group-hover:shadow-blue-900/40 transition-shadow duration-300"
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  <TranslateText text={service.title} />
                </h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  <TranslateText text={service.desc} />
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-indigo-400/0 group-hover:from-blue-400/5 group-hover:to-indigo-400/5 rounded-3xl transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
