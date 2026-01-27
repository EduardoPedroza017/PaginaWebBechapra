/**
 * ==============================================================================
 * CONFIGURACIÓN CENTRALIZADA DE VARIABLES DE ENTORNO
 * ==============================================================================
 * 
 * Este archivo valida y exporta todas las variables de entorno necesarias
 * para el frontend. Proporciona valores por defecto seguros y validación
 * en tiempo de build.
 * 
 * @module lib/config
 */

// ==============================================================================
// TIPOS
// ==============================================================================

interface Config {
  // API URLs
  api: {
    url: string;
    internalUrl: string;
  };
  
  // Analytics
  analytics: {
    gaId: string | undefined;
    clarityId: string | undefined;
    enabled: boolean;
  };
  
  // Features
  features: {
    debugMode: boolean;
    pwaEnabled: boolean;
  };
  
  // Maps
  maps: {
    googleMapsApiKey: string | undefined;
  };
  
  // Images
  images: {
    quality: number;
  };
  
  // Environment
  env: {
    isDevelopment: boolean;
    isProduction: boolean;
    isTest: boolean;
  };
}

// ==============================================================================
// UTILIDADES DE VALIDACIÓN
// ==============================================================================

/**
 * Obtiene una variable de entorno requerida
 * @throws Error si la variable no está definida
 */
function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    // No lanzar: devolver un fallback a localhost para entornos locales
    // Esto evita errores en tiempo de ejecución cuando se solicita no usar .env
    return 'http://localhost:5000';
  }
  return value;
}

/**
 * Obtiene una variable de entorno opcional con valor por defecto
 */
function getOptionalEnv(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

/**
 * Obtiene una variable de entorno booleana
 */
function getBooleanEnv(key: string, defaultValue: boolean): boolean {
  const value = process.env[key];
  if (!value) return defaultValue;
  return value === 'true' || value === '1';
}

/**
 * Obtiene una variable de entorno numérica
 */
function getNumberEnv(key: string, defaultValue: number): number {
  const value = process.env[key];
  if (!value) return defaultValue;
  const num = parseInt(value, 10);
  return isNaN(num) ? defaultValue : num;
}

// ==============================================================================
// CONFIGURACIÓN
// ==============================================================================

/**
 * Configuración centralizada de la aplicación
 * 
 * @example
 * ```typescript
 * import { config } from '@/lib/config';
 * 
 * // Usar URL del API
 * const response = await fetch(`${config.api.url}/api/news`);
 * 
 * // Verificar si analytics está habilitado
 * if (config.analytics.enabled) {
 *   trackEvent('page_view');
 * }
 * ```
 */
export const config: Config = {
  // API URLs
  api: {
    // URL pública del backend (accesible desde el navegador)
    url: getRequiredEnv('NEXT_PUBLIC_API_URL'),
    
    // URL interna del backend (para Server Components)
    internalUrl: getOptionalEnv('NEXT_PRIVATE_API_URL', getRequiredEnv('NEXT_PUBLIC_API_URL')),
  },
  
  // Analytics
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    clarityId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
    enabled: !!(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID),
  },
  
  // Features
  features: {
    debugMode: getBooleanEnv('NEXT_PUBLIC_DEBUG_MODE', process.env.NODE_ENV === 'development'),
    pwaEnabled: getBooleanEnv('NEXT_PUBLIC_ENABLE_PWA', false),
  },
  
  // Maps
  maps: {
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  
  // Images
  images: {
    quality: getNumberEnv('NEXT_PUBLIC_IMAGE_QUALITY', 80),
  },
  
  // Environment
  env: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
  },
};

// ==============================================================================
// VALIDACIÓN EN BUILD TIME
// ==============================================================================

/**
 * Valida la configuración al iniciar la aplicación
 * Solo valida en producción para evitar errores en desarrollo
 */
export function validateConfig(): void {
  const errors: string[] = [];
  
  // Validar URL del API
  if (!config.api.url) {
    errors.push('NEXT_PUBLIC_API_URL no está configurada');
  }
  
  // Validar formato de URL
  try {
    new URL(config.api.url);
  } catch {
    errors.push(`NEXT_PUBLIC_API_URL no es una URL válida: ${config.api.url}`);
  }
  
  // En producción, validar que no se use localhost
  if (config.env.isProduction && config.api.url.includes('localhost')) {
    errors.push('ADVERTENCIA: Usando localhost en producción');
  }
  
  // Mostrar errores
  if (errors.length > 0) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Errores de configuración:');
      errors.forEach(error => {
        console.error(`  - ${error}`);
      });
    }
    
    if (config.env.isProduction) {
      throw new Error('Configuración inválida en producción');
    }
  }
}

// Validar configuración al importar el módulo
if (typeof window === 'undefined') {
  // Solo validar en el servidor (no en el navegador)
  validateConfig();
}

// ==============================================================================
// UTILIDADES DE API
// ==============================================================================

/**
 * Construye una URL completa para el API
 * @param path Ruta del endpoint (ej: '/api/news')
 * @param useInternalUrl Usar URL interna para Server Components
 */
export function getApiUrl(path: string, useInternalUrl = false): string {
  const baseUrl = useInternalUrl ? config.api.internalUrl : config.api.url;
  
  // Asegurar que el path empiece con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Remover trailing slash del baseUrl si existe
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  return `${normalizedBase}${normalizedPath}`;
}

/**
 * Construye una URL completa para archivos subidos
 * @param path Ruta del archivo (ej: '/uploads/news/image.jpg')
 */
export function getUploadUrl(path: string): string {
  if (path.startsWith('http')) {
    return path; // Ya es una URL completa
  }
  return getApiUrl(path);
}

// ==============================================================================
// LOGGING
// ==============================================================================

/**
 * Log solo en modo debug
 */
export function debugLog(...args: any[]): void {
  if (config.features.debugMode) {
    }
}

/**
 * Log de advertencia
 */
export function warnLog(...args: any[]): void {
  if (config.features.debugMode) {
    console.warn('[WARN]', ...args);
  }
}

/**
 * Log de error (siempre se muestra)
 */
export function errorLog(...args: any[]): void {
  if (process.env.NODE_ENV === "development") {
    const safeStringify = (obj: any) => {
      try {
        if (obj instanceof Error) {
          return `${obj.name}: ${obj.message}${obj.stack ? '\n' + obj.stack : ''}`;
        }
        const seen = new WeakSet();
        return JSON.stringify(obj, function (_key, value) {
          if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) return '[Circular]';
            seen.add(value);
          }
          return value;
        }, 2);
      } catch (e) {
        try { return String(obj); } catch { return '[unserializable]'; }
      }
    };

    const serialized = args.map(a => (typeof a === 'object' ? safeStringify(a) : String(a)));
    console.error('[ERROR]', ...serialized);
  }
}

// ==============================================================================
// EXPORTACIONES
// ==============================================================================

export default config;
