"use client";
import React from "react";
import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  targetBlank?: boolean;
};

export default function NeonButton({ href, children, className = "", onClick, targetBlank }: Props) {
  const base = `neon-btn ${className}`.trim();

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} target={targetBlank ? "_blank" : undefined} rel={targetBlank ? "noreferrer" : undefined} className={base} onClick={onClick}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={base} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={base} onClick={onClick}>
      {children}
    </button>
  );
}
