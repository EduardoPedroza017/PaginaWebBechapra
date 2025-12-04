"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
}

interface ServiceCardsProps {
  title: string;
  services: Service[];
}

export default function ServiceCards({ title, services }: ServiceCardsProps) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-blue-900 text-center mb-16 tracking-tight"
        >
          {title}
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="group relative bg-white rounded-xl p-8 border border-gray-100 border-l-4 border-l-blue-600 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col min-h-[280px]"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                  <Icon size={32} className="text-blue-900" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-justify mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Link */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all duration-300 mt-auto"
                >
                  Ver mas
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
