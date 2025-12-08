"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

interface SolutionsGridProps {
  title: string;
  subtitle: string;
  services: Service[];
}

const cardBgColors = [
  "from-blue-100/80 to-blue-200/60 dark:from-blue-950/50 dark:to-blue-900/30",
  "from-blue-100/80 to-blue-200/60 dark:from-blue-950/50 dark:to-blue-900/30",
  "from-blue-100/80 to-blue-200/60 dark:from-blue-950/50 dark:to-blue-900/30",
  "from-blue-100/80 to-blue-200/60 dark:from-blue-950/50 dark:to-blue-900/30",
  "from-blue-100/80 to-blue-200/60 dark:from-blue-950/50 dark:to-blue-900/30",
  "from-blue-100/80 to-blue-200/60 dark:from-blue-950/50 dark:to-blue-900/30",
  "from-blue-100/80 to-blue-200/60 dark:from-blue-950/50 dark:to-blue-900/30",
];

export default function SolutionsGrid({
  title,
  subtitle,
  services,
}: SolutionsGridProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === i;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative p-8 rounded-3xl border-[2.5px] cursor-pointer overflow-hidden transition-all duration-400 ${
                  isHovered
                    ? "border-blue-600 shadow-xl shadow-blue-600/20 -translate-y-4 scale-[1.025]"
                    : "border-blue-200 shadow-md"
                } bg-gradient-to-br ${cardBgColors[i % cardBgColors.length]}`}
              >
                {/* Background Glow */}
                <div
                  className={`absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(0,87,217,0.1)_0%,transparent_70%)] transition-all duration-400 ${
                    isHovered ? "scale-120 opacity-100" : "scale-80 opacity-0"
                  }`}
                />

                {/* Icon */}
                <div
                  className={`relative z-10 w-[70px] h-[70px] rounded-2xl flex items-center justify-center mb-6 transition-all duration-400 ${
                    isHovered
                      ? "bg-blue-600 rotate-[-5deg] scale-110"
                      : "bg-blue-600/10"
                  }`}
                >
                  <Icon
                    size={32}
                    strokeWidth={2.5}
                    className={`transition-colors duration-400 ${
                      isHovered ? "text-white" : "text-blue-600"
                    }`}
                  />
                </div>

                {/* Content */}
                <h3
                  className={`relative z-10 text-xl font-extrabold mb-3 tracking-tight transition-colors duration-300 ${
                    isHovered ? "text-blue-700" : "text-gray-900"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`relative z-10 text-base leading-relaxed transition-opacity duration-300 ${
                    isHovered ? "text-gray-800 opacity-95" : "text-gray-700 opacity-75"
                  }`}
                >
                  {service.desc}
                </p>

                {/* Arrow CTA */}
                <div
                  className={`relative z-10 mt-6 flex items-center gap-2 font-bold text-sm transition-all duration-300 ${
                    isHovered
                      ? "text-blue-700 opacity-100 translate-x-0"
                      : "text-blue-600 opacity-0 -translate-x-3"
                  }`}
                >
                  Conocer mas <ChevronRight size={18} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
