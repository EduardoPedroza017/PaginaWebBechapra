"use client";

import React from "react";

/**
 * Marquee — infinite horizontal scroll. Pass `items` (rendered twice for loop).
 */
export function Marquee({
  items,
  speed = 80,
  className = "",
  separator = "✦",
}: {
  items: React.ReactNode[];
  /** seconds for one full loop */
  speed?: number;
  className?: string;
  separator?: React.ReactNode;
}) {
  const doubled = [...items, ...items];
  return (
    <section className={`ed-marquee-section ${className}`}>
      <div className="ed-marquee">
        <div
          className="ed-marquee-track"
          style={{ animationDuration: `${speed}s` }}
        >
          {doubled.map((item, i) => (
            <React.Fragment key={i}>
              <span>{item}</span>
              <span className="ed-marquee-dot" aria-hidden>{separator}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * StatusStrip — slim top bar with marquee of short certifications/claims.
 */
export function StatusStrip({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="ed-status-strip">
      <div className="ed-status-marquee">
        <div className="ed-status-track">
          {doubled.map((it, i) => (
            <React.Fragment key={i}>
              <span>{it}</span>
              <span className="dot" aria-hidden>●</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
