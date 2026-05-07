"use client";

import { useState, useEffect, useCallback } from 'react';
import { adminApi, type EventoItem } from '../../utils/admin-api';

interface Evento {
  id: string;
  titulo: string;
  fecha_hora: string;
  ubicacion: string;
  descripcion: string;
  categoria: string;
  estado: boolean;
  imagen?: string;
}

const useEventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEventos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminApi.getEventos();
      const items = Array.isArray(response) ? response : [];
      setEventos(items.map((evento: EventoItem) => {
        const rawImage = evento.imagen || '';
        const normalizedImage = rawImage && rawImage.startsWith('/uploads/')
          ? `${process.env.NEXT_PUBLIC_API_URL || ''}${rawImage}`
          : rawImage || undefined;

        return {
          id: evento.id || evento._id || '',
          titulo: evento.titulo || '',
          fecha_hora: evento.fecha_hora || '',
          ubicacion: evento.ubicacion || '',
          descripcion: evento.descripcion || '',
          categoria: evento.categoria || '',
          estado: typeof evento.estado === 'string'
            ? evento.estado.toLowerCase() === 'true'
            : Boolean(evento.estado),
          imagen: normalizedImage,
        };
      }));
    } catch (err) {
      setError('Error al cargar los eventos.');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvento = async (data: FormData) => {
    try {
      await adminApi.createEvento(data);
      await fetchEventos();
    } catch (err) {
      setError('Error al crear el evento.');
    }
  };

  const updateEvento = async (id: string, data: FormData) => {
    try {
      await adminApi.updateEvento(id, data);
      await fetchEventos();
    } catch (err) {
      setError('Error al actualizar el evento.');
    }
  };

  const deleteEvento = async (id: string) => {
    try {
      await adminApi.deleteEvento(id);
      setEventos((prev) => prev.filter((evento) => evento.id !== id));
    } catch (err) {
      setError('Error al eliminar el evento.');
    }
  };

  useEffect(() => {
    fetchEventos();
  }, [fetchEventos]);

  return { eventos, loading, error, fetchEventos, createEvento, updateEvento, deleteEvento };
};

export default useEventos;
