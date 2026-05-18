"use client";

import React from "react";

/**
 * MagneticLink / MagneticButton — wraps children with a `data-magnetic` element
 * that EditorialLayer will translate based on cursor position.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
  as: As = "span",
  ...rest
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
} & React.HTMLAttributes<HTMLElement>) {
  const Component = As as React.ElementType;
  return (
    <Component
      data-magnetic
      data-magnetic-strength={strength}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
