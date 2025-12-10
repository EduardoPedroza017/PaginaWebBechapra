"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowUpRight, FileText, Sparkles } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface PressItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
}

interface PressCardProps {
  item: PressItem;
  index: number;
  isFeatured?: boolean;
}

export default function PressCard({ item, index, isFeatured = false }: PressCardProps) {
  const formattedDate = new Date(item.date).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  if (isFeatured) {
    return (
      <Link href={`/prensa/${item.id}`} className="block group h-full">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="relative h-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 dark:from-blue-950 dark:via-blue-900 dark:to-indigo-950 rounded-3xl p-8 md:p-10 overflow-hidden flex flex-col"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          {/* Animated Glow Effects */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-cyan-400/40 to-blue-500/20 rounded-full blur-3xl"
          />
          
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-cyan-400/30 to-blue-500/10 rounded-full blur-3xl"
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Featured Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="inline-flex items-center gap-2 w-fit px-4 py-2 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 backdrop-blur-md rounded-full border border-cyan-400/50 mb-6"
            >
              <Sparkles size={14} className="text-cyan-300" />
              <span className="text-cyan-200 text-xs font-bold tracking-widest uppercase"><TranslateText text="Destacado" /></span>
            </motion.div>

            {/* Date */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex items-center gap-2 text-cyan-200/90 mb-5"
            >
              <Calendar size={16} className="flex-shrink-0" />
              <span className="text-sm font-semibold">{formattedDate}</span>
            </motion.div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight group-hover:text-cyan-300 transition-colors duration-300 flex-grow">
              {item.title}
            </h3>

            {/* Excerpt */}
            <p className="text-cyan-100/85 text-base md:text-lg leading-relaxed mb-8 line-clamp-3">
              {item.excerpt}
            </p>

            {/* CTA Arrow */}
            <div className="flex items-center gap-3 text-cyan-300 font-bold group-hover:gap-4 transition-all duration-300">
              <span className="text-sm uppercase tracking-wide"><TranslateText text="Leer comunicado completo" /></span>
              <motion.div
                whileHover={{ x: 4, y: -4 }}
                className="p-2 rounded-full bg-cyan-400/20 group-hover:bg-cyan-400/40 transition-colors duration-300"
              >
                <ArrowUpRight size={18} />
              </motion.div>
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  return (
    <Link href={`/prensa/${item.id}`} className="block group h-full">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="relative h-full bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-gray-150 dark:border-slate-700/50 backdrop-blur-sm shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-600/15 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
      >
        {/* Top Gradient Accent */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: index * 0.08 + 0.2 }}
        />

        {/* Hover Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 rounded-2xl pointer-events-none"
          whileHover={{ 
            background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.05))'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Date Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 + 0.1 }}
            className="inline-flex items-center gap-2 w-fit px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 rounded-full mb-4 border border-blue-100 dark:border-blue-500/20"
          >
            <Calendar size={14} className="text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300 text-xs font-semibold">{formattedDate}</span>
          </motion.div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 flex-grow">
            {item.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">
            {item.excerpt}
          </p>

          {/* Read More CTA */}
          <motion.div 
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300 mt-auto"
            whileHover={{ x: 2 }}
          >
            <span><TranslateText text="Leer más" /></span>
            <motion.div
              whileHover={{ x: 2, y: -1 }}
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </motion.div>
        </div>

        {/* Shine Effect on Hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
          whileHover={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)'
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        />
      </motion.article>
    </Link>
  );
}
