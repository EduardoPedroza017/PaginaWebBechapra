"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DivisionButton({ label, description }: { label: string; description?: string }) {
  return (
    <div className="group relative w-full text-left p-6 rounded-xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
      <div className="min-w-0">
        <div className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">{label}</div>
        {description && (
          <div className="text-slate-500 text-sm mt-1 transition-colors duration-300">{description}</div>
        )}
      </div>

      {/* Animated progress bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-blue-600"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}
