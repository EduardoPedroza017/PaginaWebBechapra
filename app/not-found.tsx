"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import Link from "next/link";
import { TranslateText } from "@/components/TranslateText";

export default function NotFound() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto text-center">
          {/* Animation */}
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <DotLottieReact
              src="https://lottie.host/2f3da450-2689-45e0-834a-453f9c2dc725/vSm7Jng7iz.lottie"
              loop
              autoplay
              style={{ width: "280px", height: "280px" }}
            />
          </div>

          {/* Error code */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold tracking-wide">
              ERROR 404
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            <TranslateText text="Página no encontrada" />
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md leading-relaxed">
            <TranslateText text="Lo sentimos, la página que buscas no existe. Es posible que la URL sea incorrecta o que la página haya sido movida." />
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/"
              className="group px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver al inicio
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-lg shadow hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Página anterior
            </button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}