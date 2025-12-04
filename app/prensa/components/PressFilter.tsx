"use client";

import React, { useState, useEffect } from "react";
import { Search, Calendar, X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isFiltering, setIsFiltering] = useState(false);

  // Get unique years sorted descending
  const years = Array.from(
    new Set(press.map((p) => new Date(p.date).getFullYear().toString()))
  ).sort((a, b) => b.localeCompare(a));

  useEffect(() => {
    let filtered = press;

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.excerpt.toLowerCase().includes(searchLower)
      );
    }

    if (year) {
      filtered = filtered.filter(
        (p) => new Date(p.date).getFullYear().toString() === year
      );
    }

    setIsFiltering(search.trim() !== "" || year !== "");
    onFilter(filtered);
  }, [search, year, press, onFilter]);

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
        className="bg-white rounded-2xl p-6 shadow-lg shadow-blue-900/5 border border-gray-100"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar comunicados..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 text-gray-800 placeholder:text-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Year Select */}
          <div className="relative w-full lg:w-56">
            <Calendar
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 text-gray-800 appearance-none cursor-pointer"
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
                className="w-4 h-4 text-gray-400"
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
                className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors duration-300 flex items-center gap-2 justify-center"
              >
                <X size={18} />
                <span>Limpiar</span>
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
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <div className="flex items-center gap-2 text-sm">
                <Filter size={16} className="text-blue-600" />
                <span className="text-gray-600">
                  Mostrando{" "}
                  <span className="font-semibold text-blue-600">
                    {filteredCount}
                  </span>{" "}
                  de{" "}
                  <span className="font-semibold text-gray-800">
                    {totalCount}
                  </span>{" "}
                  comunicados
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
