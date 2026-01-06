'use client';

import Image from 'next/image';
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  blur?: boolean;
  className?: string;
  onLoad?: () => void;
  [key: string]: any;
}

/**
 * Genera un blur SVG simple para usar como placeholder
 */
function generateBlurPlaceholder(): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect width="100" height="100" fill="#f3f4f6"/>
      <circle cx="50" cy="50" r="30" fill="#d1d5db" opacity="0.5"/>
    </svg>
  `;
  
  try {
    const encoded = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${encoded}`;
  } catch (e) {
    // Fallback si Buffer no está disponible
    return 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23f3f4f6%22/%3E%3C/svg%3E';
  }
}

/**
 * Componente de imagen optimizada con lazy loading y blur placeholder
 */
export const OptimizedImage = React.forwardRef<
  HTMLImageElement,
  OptimizedImageProps
>(function OptimizedImage(
  {
    src,
    alt,
    width = 400,
    height = 300,
    priority = false,
    blur = true,
    onLoad,
    className = '',
    ...props
  },
  ref
) {
  const blurUrl = blur ? generateBlurPlaceholder() : undefined;

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder={blur ? 'blur' : 'empty'}
        blurDataURL={blurUrl}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={onLoad}
        className="w-full h-full object-cover"
        {...props}
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';
