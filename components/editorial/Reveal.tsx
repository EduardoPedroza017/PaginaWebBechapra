"use client";

import React from "react";

/**
 * Reveal — fade + lift on scroll. Wraps children in a div with `.reveal-up`.
 */
export function Reveal({
  children,
  delay,
  as: As = "div",
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const Component = As as React.ElementType;
  return (
    <Component
      className={`reveal-up ${className}`}
      data-delay={delay}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * RevealWords — splits text into per-word animated spans (handled by EditorialLayer).
 * Use only with plain text or simple <em> children for best results.
 */
export function RevealWords({
  children,
  delay,
  as: As = "span",
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const Component = As as React.ElementType;
  return (
    <Component className={`reveal-words ${className}`} data-delay={delay} {...rest}>
      {children}
    </Component>
  );
}

/**
 * MaskReveal — clip-path mask reveal on scroll. Children get the animation.
 */
export function MaskReveal({
  children,
  delay,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mask-reveal ${className}`} data-delay={delay} {...rest}>
      {children}
    </div>
  );
}
