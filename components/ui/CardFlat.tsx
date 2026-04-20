"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardFlatProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function CardFlat({ children, className = "", onClick }: CardFlatProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
