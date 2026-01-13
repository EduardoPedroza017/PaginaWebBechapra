"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
  size?: string; // Added 'size' property
}

export default function PressCard({ item, index, isFeatured = false, size }: PressCardProps) {
  const formattedDate = new Date(item.date).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const sizeClasses = size === 'large' ? 'p-6 md:p-8 text-xl md:text-2xl' : size === 'medium' ? 'p-5 text-lg md:text-xl' : 'p-4 text-base';

  const router = useRouter();

  const navigateTo = () => router.push(`/prensa/${item.id}`);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigateTo();
    }
  };

  if (isFeatured) {
    return (
      <div
        role="link"
        tabIndex={0}
        onClick={navigateTo}
        onKeyDown={handleKeyDown}
        className={`block group h-full ${sizeClasses}`}
      >
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="relative h-full min-h-[340px] md:min-h-[380px] lg:min-h-[460px] bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 dark:from-blue-950 dark:via-blue-900 dark:to-indigo-950 rounded-2xl overflow-hidden flex flex-col"
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

          <div className="relative z-10 flex flex-col justify-between h-full gap-6">
            {/* Decorative Thumbnail */}
            <div className="absolute -right-8 -top-8 w-48 h-40 rounded-2xl overflow-hidden shadow-2xl transform rotate-1 bg-gradient-to-br from-blue-700 to-indigo-600/80 opacity-95">
              <div className="w-full h-full flex items-center justify-center text-white/90">
                <FileText size={48} />
              </div>
            </div>
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
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 leading-tight group-hover:text-cyan-300 transition-colors duration-300">
              <span className="block line-clamp-2 break-words">{item.title}</span>
            </h3>

            {/* Excerpt */}
            <p className="text-cyan-100/85 text-sm md:text-sm leading-relaxed mb-2 line-clamp-3 break-words opacity-90">
              {item.excerpt}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full font-semibold shadow-sm hover:bg-white/20 transition-colors duration-300">
                <span className="text-sm"><TranslateText text="Leer comunicado completo" /></span>
                <ArrowUpRight size={16} />
              </span>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 text-white rounded-full font-semibold shadow-sm hover:bg-white/20 transition-colors duration-300">
                  <span className="text-sm"><TranslateText text="Ver fuente" /></span>
                  <FileText size={16} />
                </a>
              )}
            </div>
          </div>
        </motion.article>
      </div>
      );
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={navigateTo}
      onKeyDown={handleKeyDown}
      className={`block group h-full ${sizeClasses}`}
    >
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative h-full min-h-[180px] bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 dark:from-blue-950 dark:via-blue-900 dark:to-indigo-950 rounded-2xl overflow-hidden flex flex-col"
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
          {/* Thumbnail left on md+ */}
          <div className="hidden md:flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md flex-shrink-0">
              <FileText size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2 line-clamp-2">
                {item.excerpt}
              </p>
            </div>
          </div>

          {/* Small screens: regular flow title/excerpt */}
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

          {/* Title (for small screens) */}
          <h3 className="text-lg md:hidden font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
            {item.title}
          </h3>

          {/* Excerpt (for small screens) */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5 md:hidden line-clamp-2">
            {item.excerpt}
          </p>

          {/* Read More CTA */}
          <div className="flex items-center gap-4 mt-auto">
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300 rounded-full font-semibold hover:bg-blue-100 transition-colors duration-300">
              <span className="text-sm"><TranslateText text="Leer más" /></span>
              <ArrowUpRight size={16} />
            </button>
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 text-gray-700 dark:text-gray-200 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300">
                <span className="text-sm"><TranslateText text="Fuente" /></span>
                <FileText size={14} />
              </a>
            )}
          </div>
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
    </div>
  );
}
