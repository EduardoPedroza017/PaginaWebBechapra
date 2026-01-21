"use client";

import { useState, useEffect, useCallback } from 'react';

export interface Ejecutivo {
  _id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string; // Made non-optional to match EjecutivoFormData
  fecha_nacimiento: string; // Made non-optional to match EjecutivoFormData
  edad?: number;
  puesto: string; // Made non-optional to match EjecutivoFormData
  carrera_estudiada: string; // Made non-optional to match EjecutivoFormData
  biografia: string; // Made non-optional to match EjecutivoFormData
  telefono: string; // Made non-optional to match EjecutivoFormData
  email: string;
  activo: boolean;
  foto?: string;
  foto_thumbnail?: string;
  foto_version?: string;
  foto_url?: string;
  foto_thumbnail_url?: string;
  created_at: string;
  updated_at: string;
  descripcion: string; // Made non-optional to match EjecutivoFormData
}

export interface EjecutivosResponse {
  items: Ejecutivo[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface EjecutivosFilters {
  search?: string;
  activo?: boolean;
  puesto?: string;
  page?: number;
  per_page?: number;
}

export interface EjecutivoFormData {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  puesto: string;
  carrera_estudiada: string;
  biografia: string;
  telefono: string;
  email: string;
  activo: boolean;
  descripcion: string;
}

export const useEjecutivos = () => {
  const [ejecutivos, setEjecutivos] = useState<Ejecutivo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EjecutivosFilters>({
    page: 1,
    per_page: 12,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    per_page: 12,
    total_pages: 0,
  });

  // Fetch ejecutivos
  const fetchEjecutivos = useCallback(async (newFilters?: Partial<EjecutivosFilters>) => {
    setLoading(true);
    setError(null);

    const currentFilters = { ...filters, ...newFilters };
    setFilters(currentFilters);

    try {
      const queryParams = new URLSearchParams();

      if (currentFilters.search) queryParams.append('search', currentFilters.search);
      if (currentFilters.activo !== undefined) queryParams.append('activo', currentFilters.activo.toString());
      if (currentFilters.puesto) queryParams.append('puesto', currentFilters.puesto);
      if (currentFilters.page) queryParams.append('page', currentFilters.page.toString());
      if (currentFilters.per_page) queryParams.append('per_page', currentFilters.per_page.toString());

      const headers: Record<string, string> = {};
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
      }

      const response = await fetch(`${apiUrl}/api/ejecutivos?${queryParams}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Error al cargar ejecutivos');
      }

      const data: EjecutivosResponse = await response.json();
      // Normalize returned docs to ensure `_id` exists (backend serializes ObjectId -> `id`) and fix upload URLs
      const normalized = data.items.map(item => {
        const it: any = { ...item, _id: (item as any)._id || (item as any).id };
        it.foto_url = fullUrl(it.foto_url);
        it.foto_thumbnail_url = fullUrl(it.foto_thumbnail_url);
        return it;
      });
      setEjecutivos(normalized as Ejecutivo[]);
      setPagination({
        total: data.total,
        page: data.page,
        per_page: data.per_page,
        total_pages: data.total_pages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Helper: build auth headers including development header-bypass fields
  const getAuthHeaders = (includeContentType = true): Record<string, string> => {
    const headers: Record<string, string> = {};

    // Read token and user info from both localStorage and sessionStorage (some flows store in sessionStorage)
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // Header-based development bypass requires an email and role/admin flags
    const userEmail = (
      localStorage.getItem('user_email') ||
      sessionStorage.getItem('user_email') ||
      localStorage.getItem('user') ||
      sessionStorage.getItem('user') ||
      localStorage.getItem('email') ||
      sessionStorage.getItem('email') ||
      ''
    );
    const role = (
      localStorage.getItem('role') ||
      sessionStorage.getItem('role') ||
      localStorage.getItem('user_role') ||
      sessionStorage.getItem('user_role') ||
      ''
    );
    const adminFlag = (
      localStorage.getItem('admin') ||
      sessionStorage.getItem('admin') ||
      localStorage.getItem('is_admin') ||
      sessionStorage.getItem('is_admin') ||
      ''
    );

    if (userEmail) headers['X-User'] = userEmail;
    if (role) headers['X-Role'] = role;
    if (adminFlag) headers['X-Admin'] = String(adminFlag);

    if (includeContentType) headers['Content-Type'] = 'application/json';

    // DEBUG: Log headers being sent (remove after debugging)
    console.log('[DEBUG useEjecutivos] Auth headers:', {
      token: token ? 'exists' : 'null',
      userEmail,
      role,
      adminFlag,
      headers
    });

    return headers;
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
  }
  const backendBase = apiUrl;

  const fullUrl = (p?: string | null): string | undefined => {
    if (!p) return undefined;
    if (p.startsWith('http://') || p.startsWith('https://')) return p;
    if (p.startsWith('/')) return `${backendBase}${p}`;
    return `${backendBase}/${p}`;
  };

  // Crear ejecutivo
  const createEjecutivo = useCallback(async (data: EjecutivoFormData): Promise<Ejecutivo | null> => {
    setLoading(true);
    setError(null);

    console.log('[DEBUG createEjecutivo] Starting create with data:', data);
    const headers = getAuthHeaders(true);
    console.log('[DEBUG createEjecutivo] Using headers:', headers);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
      }
      const response = await fetch(`${apiUrl}/api/ejecutivos`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      console.log('[DEBUG createEjecutivo] Response status:', response.status, response.statusText);

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          console.log('[DEBUG createEjecutivo] Error response body:', errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // If not JSON, use the status text
        }
        throw new Error(errorMessage);
      }

      const newEjecutivo: any = await response.json();
      console.log('[DEBUG createEjecutivo] Success! New ejecutivo:', newEjecutivo);
      const normalized = { ...newEjecutivo, _id: newEjecutivo._id || newEjecutivo.id };
      normalized.foto_url = fullUrl(normalized.foto_url);
      normalized.foto_thumbnail_url = fullUrl(normalized.foto_thumbnail_url);
      setEjecutivos(prev => [normalized as Ejecutivo, ...prev]);
      return normalized as Ejecutivo;
    } catch (err) {
      console.error('[DEBUG createEjecutivo] Caught error:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar ejecutivo
  const updateEjecutivo = useCallback(async (id: string, data: Partial<EjecutivoFormData>): Promise<Ejecutivo | null> => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
      }
      const response = await fetch(`${apiUrl}/api/ejecutivos/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(true),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar ejecutivo');
      }

      const updatedEjecutivo: any = await response.json();
      const normalized = { ...updatedEjecutivo, _id: updatedEjecutivo._id || updatedEjecutivo.id };
      normalized.foto_url = fullUrl(normalized.foto_url);
      normalized.foto_thumbnail_url = fullUrl(normalized.foto_thumbnail_url);
      setEjecutivos(prev =>
        prev.map(ej => (ej._id === id || (ej as any).id === id) ? (normalized as Ejecutivo) : ej)
      );
      return normalized as Ejecutivo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar ejecutivo
  const deleteEjecutivo = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
      }
      const response = await fetch(`${apiUrl}/api/ejecutivos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(false),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar ejecutivo');
      }

      setEjecutivos(prev => prev.filter(ej => ej._id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Subir foto
  const uploadFoto = useCallback(async (id: string, file: File): Promise<{
    foto?: string;
    foto_thumbnail?: string;
    foto_url?: string;
    foto_thumbnail_url?: string;
    version?: string;
  } | null> => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
      }
      const response = await fetch(`${apiUrl}/api/ejecutivos/${id}/upload-foto`, {
        method: 'POST',
        headers: getAuthHeaders(false),
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al subir foto');
      }

      const result = await response.json();

      // Actualizar el ejecutivo en el estado (convertir rutas relativas a URLs completas)
      setEjecutivos(prev =>
        prev.map(ej =>
          ej._id === id
            ? {
                ...ej,
                foto: result.foto ? result.foto.replace('/uploads/', '') : ej.foto,
                foto_thumbnail: result.foto_thumbnail ? result.foto_thumbnail.replace('/uploads/', '') : ej.foto_thumbnail,
                foto_url: fullUrl(result.foto),
                foto_thumbnail_url: fullUrl(result.foto_thumbnail),
                foto_version: result.version,
              }
            : ej
        )
      );

      return {
        foto: result.foto,
        foto_thumbnail: result.foto_thumbnail,
        foto_url: fullUrl(result.foto),
        foto_thumbnail_url: fullUrl(result.foto_thumbnail),
        version: result.version,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cambiar página
  const changePage = useCallback((page: number) => {
    fetchEjecutivos({ page });
  }, [fetchEjecutivos]);

  // Aplicar filtros
  const applyFilters = useCallback((newFilters: Partial<EjecutivosFilters>) => {
    fetchEjecutivos({ ...newFilters, page: 1 });
  }, [fetchEjecutivos]);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({ page: 1, per_page: 12 });
    fetchEjecutivos({ page: 1, per_page: 12 });
  }, [fetchEjecutivos]);

  // Cargar inicial
  useEffect(() => {
    fetchEjecutivos();
  }, []);

  return {
    ejecutivos,
    loading,
    error,
    pagination,
    filters,
    fetchEjecutivos,
    createEjecutivo,
    updateEjecutivo,
    deleteEjecutivo,
    uploadFoto,
    changePage,
    applyFilters,
    clearFilters,
  };
};