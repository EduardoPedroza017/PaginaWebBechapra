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
  const variantStyles = {
    white: {
      background: "var(--surface-section-white)",
    },
    blue: {
      background: "var(--surface-section-blue)",
    },
    transparent: {
      background: "transparent",
    },
  };
  
  const paddingY = {
    none: "py-0",
    sm: "py-12 sm:py-16",
    md: "py-16 sm:py-24 lg:py-32",
    lg: "py-24 sm:py-32 lg:py-48",
  };
  
  const isOverlap = /-mt-/.test(className);
  const effectiveStyle = isOverlap ? variantStyles.transparent : variantStyles[variant];

  return (
    <section
      id={id}
      data-overlap={isOverlap}
      style={effectiveStyle}
      className={`relative w-full overflow-hidden transition-colors duration-500 ${className}`}
    >
      {/* Decorative Gradient Overlays for smooth transitions
          If the section is intentionally pulled up with a negative top margin (e.g. -mt-16)
          we skip the top overlay to avoid a visible seam when overlapping a Hero. */}
      { !isOverlap && (
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-inherit to-transparent pointer-events-none z-10 opacity-60" />
      ) }
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
