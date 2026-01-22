"use client";

import React from "react";

type WithOptionalId = { id?: string | number };

interface CardContainerProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  loading?: boolean;
  columns?: string;
  skeletonCount?: number;
  emptyState?: React.ReactNode;
}

export default function CardContainer<T extends WithOptionalId>({ 
  items, 
  renderItem, 
  loading = false, 
  columns = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3", 
  skeletonCount = 6,
  emptyState 
}: CardContainerProps<T>) {
  
  if (loading) {
    return (
      <div className={`grid ${columns} gap-4`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div 
            key={`skeleton-${i}`} 
            className="rounded-xl bg-gray-100 dark:bg-gray-800 h-40 animate-pulse" 
          />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return emptyState || (
      <div className="flex flex-col items-center justify-center min-h-[200px] py-10">
        <div className="text-gray-400 dark:text-gray-500 mb-2">
          📭
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No hay elementos para mostrar
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${columns} gap-4`}>
      {items.map((item, idx) => {
        const key = item.id ? String(item.id) : `item-${idx}`;
        return (
          <React.Fragment key={key}>
            {renderItem(item)}
          </React.Fragment>
        );
      })}
    </div>
  );
}