"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Users, TrendingUp, Briefcase, ArrowRight } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

type ServiceCardProps = {
  title: string;
  items: string[];
  description?: string;
  href: string;
  gradient: string;
  color?: "blue" | "slate" | "indigo";
};

export default function ServiceCard({
  title,
  items,
  description,
  href,
  color = "blue",
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for the glow effect
  const springConfig = { damping: 20, stiffness: 150 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const renderIcon = () => {
    const iconClass = "w-8 h-8 transition-transform duration-500 group-hover:scale-110 text-[color:var(--brand-primary)] dark:text-blue-400";
    if (title.toLowerCase().includes("capital") || title.toLowerCase().includes("human")) {
      return <Users className={iconClass} />;
    }
    if (title.toLowerCase().includes("desarrollo")) {
      return <TrendingUp className={iconClass} />;
    }
    return <Briefcase className={iconClass} />;
  };

  const colors = {
    blue: "text-[color:var(--brand-primary)] dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 border-[color:var(--surface-border)] dark:border-blue-800/40",
    slate: "text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/20 border-slate-100 dark:border-slate-700/40",
    indigo: "text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/40",
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block w-full h-full"
    >
      <a href={href} className="relative z-20 block h-full">
        <div className="relative h-full bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 dark:border-slate-800/50 shadow-xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden flex flex-col justify-between transition-colors duration-500">
          
          {/* Interactive Glow Effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.08), transparent 40%)`
              ),
            }}
          />

          <div>
            {/* Header Icon & Title */}
            <div className="flex items-start justify-between mb-8">
              <div className={`p-4 rounded-2xl ${colors[color]} border transition-all duration-500 group-hover:shadow-lg group-hover:scale-105`}>
                {renderIcon()}
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
              <TranslateText text={title} />
            </h3>

            {description && (
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6 font-medium">
                <TranslateText text={description} />
              </p>
            )}

            {/* Service Items List */}
            <div className="space-y-3">
              {items.slice(0, 3).map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-800/50 group-hover:border-blue-100 dark:group-hover:border-blue-900/30 transition-colors duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 tracking-wide">
                    <TranslateText text={item} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-[--brand-primary] dark:text-blue-400 group-hover:text-[--brand-accent] transition-colors">
              <TranslateText text="Descubrir más" />
              <div className="w-8 h-px bg-blue-700 dark:bg-blue-400 group-hover:w-12 transition-all duration-500" />
            </span>
          </div>
        </div>
      </a>

      {/* Outer Border Glow */}
      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-2xl bg-blue-600/10 dark:bg-blue-400/5 -z-10 transition-opacity duration-500" />
    </motion.div>
  );
}
