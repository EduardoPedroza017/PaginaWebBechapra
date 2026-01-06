/**
 * IMAGE OPTIMIZATION UTILITIES
 * 
 * Utilidades y presets para optimizar imágenes en Next.js
 */

import Image from 'next/image';

/**
 * Props preconfigurados para diferentes tipos de imagen
 */

export const heroImageProps = {
  priority: true,
  quality: 85,
  sizes: '(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px',
} as const;

export const cardImageProps = {
  quality: 80,
  sizes: '(max-width: 640px) 320px, (max-width: 1024px) 400px, 500px',
} as const;

export const thumbnailProps = {
  quality: 75,
  sizes: '(max-width: 640px) 100px, 150px',
} as const;

export const avatarProps = {
  quality: 80,
  sizes: '50px',
} as const;

/**
 * Generar LQIP (Low Quality Image Placeholder)
 */
export function generateLQIP(color: string = '#e2e8f0'): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='${encodeURIComponent(
    color
  )}' width='1' height='1'/%3E%3C/svg%3E`;
}

/**
 * Verificar si una imagen puede ser optimizada
 */
export function isOptimizableImage(src: string): boolean {
  // No optimizar imágenes externas sin dominio autorizado
  if (src.startsWith('http')) {
    const whitelistedDomains = ['example.com', 'cdn.example.com'];
    return whitelistedDomains.some(domain => src.includes(domain));
  }
  return true;
}

/**
 * Obtener dimensiones responsivas para imágenes
 */
export function getResponsiveImageDimensions(imageType: 'hero' | 'card' | 'thumbnail' | 'avatar') {
  const dimensions = {
    hero: { mobile: 640, tablet: 1024, desktop: 1920 },
    card: { mobile: 320, tablet: 400, desktop: 500 },
    thumbnail: { mobile: 100, tablet: 150, desktop: 150 },
    avatar: { mobile: 50, tablet: 50, desktop: 50 },
  };
  return dimensions[imageType];
}

/**
 * Calcular altura de imagen basada en aspect ratio
 */
export function calculateImageHeight(width: number, aspectRatio: number = 16 / 9): number {
  return Math.round(width / aspectRatio);
}

/**
 * Helper para estilos CSS de aspect ratio
 */
export const aspectRatioStyles = {
  '16/9': { aspectRatio: '16 / 9' },
  '4/3': { aspectRatio: '4 / 3' },
  '1/1': { aspectRatio: '1 / 1' },
  '3/2': { aspectRatio: '3 / 2' },
} as const;
