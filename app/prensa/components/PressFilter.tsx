"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, Calendar, X, Filter, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TranslateText } from "@/components/TranslateText";

interface PressItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
}

interface PressFilterProps {
  press: PressItem[];
  onFilter: (filtered: PressItem[]) => void;
  totalCount: number;
  filteredCount: number;
}

export default function PressFilter({ press, onFilter, totalCount, filteredCount }: PressFilterProps) {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");

  // Get unique years sorted descending
  const years = Array.from(
    new Set(press.map((p) => new Date(p.date).getFullYear().toString()))
  ).sort((a, b) => b.localeCompare(a));

  const filtered = useMemo(() => {
    let result = press;

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.excerpt.toLowerCase().includes(searchLower)
      );
    }

    if (year) {
      result = result.filter(
        (p) => new Date(p.date).getFullYear().toString() === year
      );
    }

    return result;
  }, [press, search, year]);

  const isFiltering = search.trim() !== "" || year !== "";

  useEffect(() => {
    onFilter(filtered);
  }, [filtered, onFilter]);

  const clearFilters = () => {
    setSearch("");
    setYear("");
  };

  return (
    <div className="mb-16">
      {/* Filter Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/80 dark:to-slate-900/50 border border-gray-200 dark:border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-lg shadow-blue-900/5 backdrop-blur-sm transition-all duration-300"
      >
        {/* Accent Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 rounded-t-3xl" />

        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center relative z-10">
          {/* Search Input */}
          <div className="relative flex-1 group">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors duration-300"
            />
            <input
              type="text"
              placeholder="Buscar por título o contenido..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-xl border bg-white dark:bg-slate-900/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-slate-500"
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-300"
                >
                  <X size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Year Select */}
          <div className="relative w-full lg:w-56 group">
            <Calendar
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors duration-300"
            />
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-xl border bg-white dark:bg-slate-900/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 outline-none transition-all duration-300 appearance-none cursor-pointer font-medium"
            >
              <option value="">Todos los años</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400 dark:text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Clear Button */}
          <AnimatePresence>
            {isFiltering && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                onClick={clearFilters}
                className="px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-500/10 dark:to-orange-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 hover:bg-gradient-to-r hover:from-red-100 hover:to-orange-100 dark:hover:from-red-500/20 dark:hover:to-orange-500/20 whitespace-nowrap"
              >
                <X size={18} />
                <span><TranslateText text="Limpiar" /></span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <AnimatePresence>
          {isFiltering && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="pt-4 border-t border-gray-200 dark:border-slate-700/50"
            >
              <motion.div 
                className="flex items-center gap-3 flex-wrap"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Zap size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-slate-300">
                  Mostrando{" "}
                  <motion.span 
                    className="font-bold text-blue-600 dark:text-blue-400"
                    key={filteredCount}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {filteredCount}
                  </motion.span>{" "}
                  de{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {totalCount}
                  </span>{" "}
                  <TranslateText text="comunicados" />
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-0 right-0 w-1 h-12 bg-gradient-to-b from-blue-400 to-transparent rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
