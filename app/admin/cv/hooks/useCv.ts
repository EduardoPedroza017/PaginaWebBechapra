"use client";

import { useState, useEffect, useCallback } from 'react';

export interface FormularioItem {
  id: string;
  nombre_completo: string;
  correo: string;
  area_interes: string;
  comentario?: string;
  fecha: string;
  cv_filename?: string;
  cv_original_name?: string;
  cv_download_url?: string;
}

export const useCv = () => {
  const [items, setItems] = useState<FormularioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const backendBase = 'http://localhost:5000';

  const getAuthHeaders = (includeContentType = false): Record<string, string> => {
    const headers: Record<string, string> = {};
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const userEmail = (
      localStorage.getItem('user_email') ||
      sessionStorage.getItem('user_email') ||
      ''
    );
    const role = (
      localStorage.getItem('role') ||
      sessionStorage.getItem('role') ||
      ''
    );
    const adminFlag = (
      localStorage.getItem('admin') ||
      sessionStorage.getItem('admin') ||
      ''
    );

    if (userEmail) headers['X-User'] = userEmail;
    if (role) headers['X-Role'] = role;
    if (adminFlag) headers['X-Admin'] = String(adminFlag);
    if (includeContentType) headers['Content-Type'] = 'application/json';
    return headers;
  };

  const fetchFormularios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backendBase}/api/admin/formularios`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const normalized = (data || []).map((it: any) => ({
        id: it.id || it._id || it._id?.$oid || '',
        nombre_completo: it.nombre_completo || it.name || '',
        correo: it.correo || it.email || '',
        area_interes: it.area_interes || it.area || '',
        comentario: it.comentario || it.note || '',
        fecha: it.fecha || it.created_at || '',
        cv_filename: it.cv_filename,
        cv_original_name: it.cv_original_name,
        cv_download_url: it.cv_download_url || `${backendBase}/api/admin/formularios/${it.id || it._id}/cv`,
      }));
      setItems(normalized);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadCv = useCallback(async (id: string, filename?: string) => {
    try {
      const res = await fetch(`${backendBase}/api/admin/formularios/${id}/cv`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || `cv_${id}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      return true;
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Error al descargar CV');
      return false;
    }
  }, []);

  useEffect(() => {
    fetchFormularios();
  }, [fetchFormularios]);

  return { items, loading, error, fetchFormularios, downloadCv };
};
