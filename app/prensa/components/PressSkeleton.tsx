"use client";

import { motion } from "framer-motion";
import { TranslateText } from "@/components/TranslateText";

export function PressCardSkeleton({ isFeatured = false }: { isFeatured?: boolean }) {
  if (isFeatured) {
    return (
      <div className="bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded-3xl p-8 md:p-10 animate-pulse">
        <div className="w-24 h-8 bg-gray-300/50 dark:bg-slate-500/50 rounded-full mb-6" />
        <div className="w-32 h-4 bg-gray-300/50 dark:bg-slate-500/50 rounded mb-4" />
        <div className="w-3/4 h-8 bg-gray-300/50 dark:bg-slate-500/50 rounded mb-2" />
        <div className="w-1/2 h-8 bg-gray-300/50 dark:bg-slate-500/50 rounded mb-6" />
        <div className="space-y-2 mb-6">
          <div className="w-full h-4 bg-gray-300/50 dark:bg-slate-500/50 rounded" />
          <div className="w-full h-4 bg-gray-300/50 dark:bg-slate-500/50 rounded" />
          <div className="w-2/3 h-4 bg-gray-300/50 dark:bg-slate-500/50 rounded" />
        </div>
        <div className="w-40 h-5 bg-gray-300/50 dark:bg-slate-500/50 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-lg animate-pulse">
      <div className="h-1 bg-gray-200 dark:bg-slate-600 rounded-t-2xl absolute top-0 left-0 right-0" />
      <div className="w-28 h-7 bg-gray-200 dark:bg-slate-600 rounded-full mb-4" />
      <div className="w-full h-6 bg-gray-200 dark:bg-slate-600 rounded mb-2" />
      <div className="w-3/4 h-6 bg-gray-200 dark:bg-slate-600 rounded mb-4" />
      <div className="space-y-2 mb-4">
        <div className="w-full h-3 bg-gray-200 dark:bg-slate-600 rounded" />
        <div className="w-full h-3 bg-gray-200 dark:bg-slate-600 rounded" />
        <div className="w-1/2 h-3 bg-gray-200 dark:bg-slate-600 rounded" />
      </div>
      <div className="w-24 h-4 bg-gray-200 dark:bg-slate-600 rounded" />
    </div>
  );
}

export default function PressSkeleton() {
  return (
    <div className="space-y-8">
      {/* Featured Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PressCardSkeleton isFeatured />
        <PressCardSkeleton isFeatured />
      </div>

      {/* Regular Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <PressCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center transition-colors duration-300 bg-gray-100 dark:bg-slate-800">
        <svg
          className="w-12 h-12 text-gray-400 dark:text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2 transition-colors duration-300 text-gray-900 dark:text-white">
        <TranslateText text="No se encontraron comunicados" />
      </h3>
      <p className="max-w-md mx-auto transition-colors duration-300 text-gray-500 dark:text-slate-400">
        <TranslateText text="No hay comunicados que coincidan con tu búsqueda. Intenta con otros términos o elimina los filtros." />
      </p>
    </motion.div>
  );
}
