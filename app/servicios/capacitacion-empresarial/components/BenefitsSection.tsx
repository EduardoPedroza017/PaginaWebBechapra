"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Benefit {
  title: string;
  icon: LucideIcon;
}

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export default function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-8 border border-blue-100 shadow-lg hover:shadow-xl hover:border-cyan-300 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
                  <Icon
                    size={32}
                    className="text-blue-600 group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold text-blue-900 leading-relaxed group-hover:text-cyan-600 transition-colors">
                  {benefit.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
