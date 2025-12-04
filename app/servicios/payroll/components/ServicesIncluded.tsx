"use client";

import { motion } from "framer-motion";

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface ServicesIncludedProps {
  title: string;
  subtitle?: string;
  items: ServiceItem[];
}

export default function ServicesIncluded({
  title,
  subtitle,
  items,
}: ServicesIncludedProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-blue-700 font-semibold max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                i % 2 === 0
                  ? "bg-white border-blue-100 hover:border-blue-300 hover:shadow-lg"
                  : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400 hover:shadow-lg"
              }`}
            >
              <div className="w-12 h-12 min-w-[48px] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center border border-blue-200">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
