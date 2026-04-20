"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  variant?: "white" | "blue" | "transparent";
  className?: string;
  size?: "sm" | "md" | "lg" | "none";
  animate?: boolean;
}

export default function Section({ 
  children, 
  id, 
  variant = "white", 
  className = "", 
  size = "md",
  animate = true
}: SectionProps) {
  
  const bgStyles = {
    white: "bg-white dark:bg-slate-950",
    blue: "bg-blue-50/50 dark:bg-slate-900/40",
    transparent: "bg-transparent"
  };
  
  const paddingY = {
    none: "py-0",
    sm: "py-12 sm:py-16",
    md: "py-16 sm:py-24 lg:py-32",
    lg: "py-24 sm:py-32 lg:py-48",
  };
  
  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden transition-colors duration-500 ${bgStyles[variant]} ${className}`}
    >
      {/* Decorative Gradient Overlays for smooth transitions */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-inherit to-transparent pointer-events-none z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-inherit to-transparent pointer-events-none z-10 opacity-60" />

      <motion.div 
        className={`relative z-20 max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 ${paddingY[size]}`}
        initial={animate ? { opacity: 0, y: 30 } : undefined}
        whileInView={animate ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
