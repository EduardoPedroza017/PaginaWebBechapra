"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  href?: string;
}

interface ServiceGridProps {
  title: string;
  services: Service[];
}

export default function ServiceGrid({ title, services }: ServiceGridProps) {
  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
            <TranslateText text={title.split(" ").slice(0, -1).join(" ")} />{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              <TranslateText text={title.split(" ").slice(-1).join(" ")} />
            </span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group"
              >
                <div className="relative h-full bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 dark:from-slate-800 dark:via-slate-800 dark:to-blue-950/30 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
                  {/* Top Accent */}
                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-500 dark:via-indigo-400 dark:to-purple-400 rounded-t-3xl"
                  />

                  {/* Icon */}
                  <div className="w-[70px] h-[70px] bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-2xl flex items-center justify-center mb-6 border border-blue-200/50 dark:border-blue-700/50 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={28} className="text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <TranslateText text={service.title} />
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6 text-justify">
                    <TranslateText text={service.desc} />
                  </p>

                  {/* Link */}
                  {service.href && (
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 group-hover:gap-3"
                    >
                      <TranslateText text="Ver más" />
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </Link>
                  )}

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 dark:group-hover:from-blue-500/10 dark:group-hover:to-indigo-500/10 transition-all duration-500 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
