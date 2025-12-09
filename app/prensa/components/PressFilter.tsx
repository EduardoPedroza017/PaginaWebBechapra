"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, Calendar, X, Filter } from "lucide-react";
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
    <div className="mb-12">
      {/* Filter Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 shadow-lg transition-colors duration-300"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400"
            />
            <input
              type="text"
              placeholder="Buscar comunicados..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-slate-500"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Year Select */}
          <div className="relative w-full lg:w-56">
            <Calendar
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-slate-400"
            />
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-xl border bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 appearance-none cursor-pointer"
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
                className="w-4 h-4 text-gray-400 dark:text-slate-400"
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={clearFilters}
                className="px-6 py-3.5 border rounded-xl font-semibold transition-colors duration-300 flex items-center gap-2 justify-center bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 border-gray-200 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-600"
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-2 text-sm">
                <Filter size={16} className="text-blue-600 dark:text-blue-400" />
                <span className="text-gray-600 dark:text-slate-300">
                  Mostrando{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {filteredCount}
                  </span>{" "}
                  de{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {totalCount}
                  </span>{" "}
                  <TranslateText text="comunicados" />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
