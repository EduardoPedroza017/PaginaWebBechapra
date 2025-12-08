"use client";

import React from "react";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  variant?: "white" | "blue";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Section({ children, id, variant = "white", className = "", size = "md" }: SectionProps) {
  const bgColor = variant === "blue" 
    ? "bg-blue-50 dark:bg-slate-800" 
    : "bg-white dark:bg-slate-950";
  
  const paddingY = {
    sm: "py-12 sm:py-16",
    md: "py-16 sm:py-20 lg:py-24",
    lg: "py-20 sm:py-24 lg:py-32",
  };
  
  return (
    <section
      id={id}
      className={`${bgColor} ${className} transition-colors duration-300`}
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
      }}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${paddingY[size]}`}>
        {children}
      </div>
    </section>
  );
}
