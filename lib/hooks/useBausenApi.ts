"use client";

import { useState, useEffect } from "react";

/**
 * Hook centralizado para peticiones a la API de Bausen
 */
export function useBausenApi<T>(endpoint: string, initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
        const res = await fetch(`${baseUrl}/api/${endpoint}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        
        const json = await res.json();
        
        // Normalización automática de respuestas de API
        const items = Array.isArray(json) ? json : (json.items || json.news || json.data || json.rows || []);
        setData(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}
