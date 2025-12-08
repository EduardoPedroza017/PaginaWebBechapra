"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowUpRight, FileText } from "lucide-react";
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
  theme: 'light' | 'dark';
}

export default function PressCard({ item, index, isFeatured = false, theme }: PressCardProps) {
  const formattedDate = new Date(item.date).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  if (isFeatured) {
    return (
      <Link href={`/prensa/${item.id}`} className="block group">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-8 md:p-10 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }}
            />
          </div>

          {/* Glow Effect */}
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-60 h-60 bg-amber-400/30 rounded-full blur-3xl"
          />

          <div className="relative z-10">
            {/* Featured Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/20 backdrop-blur-sm rounded-full border border-amber-400/30 mb-6">
              <FileText size={14} className="text-amber-400" />
              <span className="text-amber-300 text-sm font-semibold"><TranslateText text="Destacado" /></span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-blue-200/80 mb-4">
              <Calendar size={16} />
              <span className="text-sm font-medium">{formattedDate}</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-amber-300 transition-colors duration-300">
              {item.title}
            </h3>

            {/* Excerpt */}
            <p className="text-blue-100/80 text-lg leading-relaxed mb-6 line-clamp-3">
              {item.excerpt}
            </p>

            {/* Read More */}
            <div className="flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-3 transition-all duration-300">
              <span><TranslateText text="Leer comunicado completo" /></span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  return (
    <Link href={`/prensa/${item.id}`} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="relative h-full bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
      >
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500" />

        {/* Date Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full mb-4">
          <Calendar size={14} className="text-blue-600" />
          <span className="text-blue-700 text-sm font-medium">{formattedDate}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {item.excerpt}
        </p>

        {/* Read More */}
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300 mt-auto">
          <span><TranslateText text="Leer más" /></span>
          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-500 rounded-2xl pointer-events-none" />
      </motion.article>
    </Link>
  );
}
