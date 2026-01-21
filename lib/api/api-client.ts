/**
 * ==============================================================================
 * API CLIENT - CLIENTE HTTP CENTRALIZADO
 * ==============================================================================
 * 
 * Cliente HTTP configurado para todas las llamadas al backend desde componentes
 * del cliente. Incluye manejo de errores, retry logic y logging.
 * 
 * @module lib/api-client
 */

import { config, debugLog, errorLog } from '../config/config';

// ==============================================================================
// TIPOS
// ==============================================================================

export interface ApiError {
  message: string;
  status: number;
  data?: any;
}

export interface ApiOptions extends RequestInit {
  retry?: number;
  timeout?: number;
}

// ==============================================================================
// API CLIENT
// ==============================================================================

class ApiClient {
  private baseUrl: string;
  private useProxy: boolean;

  constructor(baseUrl: string, useProxy: boolean = true) {
    this.baseUrl = baseUrl;
    // En cliente (navegador), siempre usar proxy para evitar CORS
    this.useProxy = useProxy && typeof window !== 'undefined';
  }

  /**
   * Construye la URL completa
   */
  private buildUrl(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    
    // Para endpoints de logo, hacer requests directos al backend
    if (normalizedPath.includes('/api/logo/')) {
      return `${process.env.NEXT_PUBLIC_API_URL}${normalizedPath}`;
    }
    
    // Si estamos en navegador, usar proxy de Next.js
    if (this.useProxy) {
      // Strip /api/ prefix and route through proxy: /api/news -> /api/backend/news
      // But first remove /api/ so /api/news becomes /news, then add /api/backend/
      const withoutApiPrefix = normalizedPath.replace(/^\/api\//, '/');
      return `/api/backend${withoutApiPrefix}`;
    }
    
    // En servidor (SSR), usar la URL interna del API
    const normalizedBase = this.baseUrl.endsWith('/') 
      ? this.baseUrl.slice(0, -1) 
      : this.baseUrl;
    return `${normalizedBase}${normalizedPath}`;
  }

  /**
   * Maneja errores HTTP
   */
  private async handleError(response: Response): Promise<ApiError> {
    let data;
    try {
      data = await response.json();
    } catch {
      try {
        data = await response.text();
      } catch {
        data = null;
      }
    }

    const error: ApiError = {
      message: data?.error || data?.message || response.statusText || `HTTP ${response.status}: ${response.statusText || 'Request failed'}`,
      status: response.status,
      data: data || undefined,
    };

    errorLog('API Error:', {
      message: error.message,
      status: error.status,
      data: error.data,
      url: response.url,
      method: response.headers.get('x-method-used') || 'Unknown', // Added method logging
      headers: response.headers, // Log headers for debugging
    });
    return error;
  }

  /**
   * Realiza una petición HTTP con retry
   */
  private async fetchWithRetry(
    url: string,
    options: ApiOptions = {},
    retriesLeft: number = 0
  ): Promise<Response> {
    try {
      debugLog('API Request:', options.method || 'GET', url);

      // If body is FormData, do not force Content-Type (browser will add the correct
      // multipart/form-data boundary). Only add default Content-Type when body is
      // not FormData and no Content-Type header was provided.
      const providedHeaders = options.headers || {};
      const isFormData = options.body instanceof FormData;
      const defaultHeaders: Record<string, string> = {};
      if (!isFormData && !(providedHeaders as any)['Content-Type'] && !(providedHeaders as any)['content-type']) {
        defaultHeaders['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...providedHeaders,
        },
      });

      if (!response.ok && retriesLeft > 0) {
        debugLog(`Retrying... (${retriesLeft} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.fetchWithRetry(url, options, retriesLeft - 1);
      }

      return response;
    } catch (error) {
      if (retriesLeft > 0) {
        debugLog(`Network error, retrying... (${retriesLeft} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.fetchWithRetry(url, options, retriesLeft - 1);
      }
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T = any>(path: string, options: ApiOptions = {}): Promise<T> {
    const url = this.buildUrl(path);
    const response = await this.fetchWithRetry(url, {
      ...options,
      method: 'GET',
    }, options.retry);

    if (!response.ok) {
      throw await this.handleError(response);
    }

    return response.json();
  }

  /**
   * POST request
   */
  async post<T = any>(path: string, data?: any, options: ApiOptions = {}): Promise<T> {
    const url = this.buildUrl(path);
    
    // Determinar si es FormData
    const isFormData = data instanceof FormData;
    
    const response = await this.fetchWithRetry(url, {
      ...options,
      method: 'POST',
      body: isFormData ? data : (data ? JSON.stringify(data) : undefined),
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
    }, options.retry);

    if (!response.ok) {
      throw await this.handleError(response);
    }

    return response.json();
  }

  /**
   * PUT request
   */
  async put<T = any>(path: string, data?: any, options: ApiOptions = {}): Promise<T> {
    const url = this.buildUrl(path);
    const response = await this.fetchWithRetry(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }, options.retry);

    if (!response.ok) {
      throw await this.handleError(response);
    }

    return response.json();
  }

  /**
   * PATCH request
   */
  async patch<T = any>(path: string, data?: any, options: ApiOptions = {}): Promise<T> {
    const url = this.buildUrl(path);
    const response = await this.fetchWithRetry(url, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }, options.retry);

    if (!response.ok) {
      throw await this.handleError(response);
    }

    return response.json();
  }

  /**
   * DELETE request
   */
  async delete<T = any>(path: string, options: ApiOptions = {}): Promise<T> {
    const url = this.buildUrl(path);
    const response = await this.fetchWithRetry(url, {
      ...options,
      method: 'DELETE',
    }, options.retry);

    if (!response.ok) {
      throw await this.handleError(response);
    }

    return response.json();
  }

  /**
   * Upload de archivos (multipart/form-data)
   */
  async upload<T = any>(path: string, formData: FormData, options: ApiOptions = {}): Promise<T> {
    const url = this.buildUrl(path);
    
    // No establecer Content-Type para FormData, el navegador lo hace automáticamente
    const { headers, ...restOptions } = options;
    
    const response = await this.fetchWithRetry(url, {
      ...restOptions,
      method: 'POST',
      body: formData,
      headers: {
        ...headers,
        // NO incluir 'Content-Type' para FormData
      },
    }, options.retry);

    if (!response.ok) {
      throw await this.handleError(response);
    }

    return response.json();
  }
}

// ==============================================================================
// INSTANCIA GLOBAL
// ==============================================================================

/**
 * Cliente API configurado con la URL del backend
 * 
 * @example
 * ```typescript
 * import { apiClient } from '@/lib/api-client';
 * 
 * // GET
 * const news = await apiClient.get('/api/news');
 * 
 * // POST
 * const newUser = await apiClient.post('/admin/users', {
 *   name: 'John',
 *   email: 'john@example.com'
 * });
 * 
 * // Con retry
 * const data = await apiClient.get('/api/data', { retry: 3 });
 * 
 * // Upload de archivo
 * const formData = new FormData();
 * formData.append('file', file);
 * const result = await apiClient.upload('/api/upload', formData);
 * ```
 */
// Decide whether to use the Next.js proxy or call backend directly.
// Bypass proxy when NEXT_PUBLIC_BYPASS_PROXY=true OR when backend URL points to localhost:5000
const bypassProxyEnv = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BYPASS_PROXY === 'true';
const backendIsLocal5000 = config.api.url.includes('localhost:5000');
const useProxyFlag = !(bypassProxyEnv || backendIsLocal5000);
export const apiClient = new ApiClient(config.api.url, useProxyFlag);

// ==============================================================================
// HELPERS ESPECÍFICOS
// ==============================================================================

/**
 * Construye URL de archivo subido
 */
export function getUploadUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${config.api.url}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * Verifica si es una imagen válida
 */
export function isImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(url);
}

// ==============================================================================
// EXPORTACIONES
// ==============================================================================

export default apiClient;
