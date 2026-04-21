"use client";

import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useTheme } from 'next-themes';

const Loading = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Efecto sutil de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/30 to-transparent dark:via-slate-950/20 pointer-events-none" />
      
      {/* Animación principal */}
      <div className="relative">
        <DotLottieReact
          src="https://lottie.host/86ac2c3d-c400-498c-b8b0-2124e72ebb1e/SG6q7VP5dc.lottie"
          loop
          autoplay
          style={{ width: '220px', height: '220px' }}
        />
      </div>
    </div>
  );
};

export default Loading;
