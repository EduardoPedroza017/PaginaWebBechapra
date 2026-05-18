"use client";

import React from "react";

/**
 * Counter — animated number reveal. EditorialLayer attaches the IntersectionObserver.
 */
export function Counter({
  target,
  unit,
  className = "",
}: {
  target: number;
  unit?: string;
  className?: string;
}) {
  return (
    <span className={`ed-counter-wrap ${className}`}>
      <span className="ed-counter" data-target={target}>0</span>
      {unit && <span className="ed-counter-unit">{unit}</span>}
    </span>
  );
}
