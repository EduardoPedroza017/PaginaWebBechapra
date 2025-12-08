"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Course {
  id: string;
  title: string;
  description?: string;
  items?: string[];
}

interface CoursesAccordionProps {
  title: string;
  courses: Course[];
}

export default function CoursesAccordion({ title, courses }: CoursesAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center mb-12 tracking-tight"
        >
          <span className="text-gray-900 dark:text-white"><TranslateText text="Explora" /> </span>
          <span className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
            <TranslateText text="Nuestros Cursos" />
          </span>
        </motion.h2>

        {/* Accordions */}
        <div className="space-y-4">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border-2 border-blue-100 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => setOpenId(openId === course.id ? null : course.id)}
                className={`w-full px-6 py-5 flex justify-between items-center text-left transition-all duration-300 ${
                  openId === course.id
                    ? "bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-950/50 dark:to-blue-900/50"
                    : "bg-white dark:bg-slate-800 hover:bg-blue-50/50 dark:hover:bg-slate-700/50"
                }`}
              >
                {/* Left accent bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                    openId === course.id
                      ? "bg-gradient-to-b from-blue-600 to-cyan-500"
                      : "bg-transparent"
                  }`}
                />

                <span className="text-lg font-bold text-blue-900 pr-4">
                  {course.title}
                </span>

                <motion.div
                  animate={{ rotate: openId === course.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    openId === course.id
                      ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === course.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5 bg-gradient-to-b from-blue-50/50 to-white border-t border-blue-100">
                      {course.description && (
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {course.description}
                        </p>
                      )}
                      {course.items && course.items.length > 0 && (
                        <ul className="space-y-2">
                          {course.items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-3 text-gray-700"
                            >
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
