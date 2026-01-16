"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

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

const apiBaseUrl = 'http://localhost:5000';

const useEventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEventos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiBaseUrl}/api/admin/eventos`);
      setEventos(response.data);
    } catch (err) {
      setError('Error al cargar los eventos.');
    } finally {
      setLoading(false);
    }
  };

  const createEvento = async (data: FormData) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/admin/eventos`, data);
      setEventos((prev) => [...prev, response.data]);
    } catch (err) {
      setError('Error al crear el evento.');
    }
  };

  const updateEvento = async (id: string, data: FormData) => {
    try {
      const response = await axios.put(`${apiBaseUrl}/api/admin/eventos/${id}`, data);
      setEventos((prev) => prev.map((evento) => (evento.id === id ? response.data : evento)));
    } catch (err) {
      setError('Error al actualizar el evento.');
    }
  };

  const deleteEvento = async (id: string) => {
    try {
      await axios.delete(`${apiBaseUrl}/api/admin/eventos/${id}`);
      setEventos((prev) => prev.filter((evento) => evento.id !== id));
    } catch (err) {
      setError('Error al eliminar el evento.');
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return { eventos, loading, error, fetchEventos, createEvento, updateEvento, deleteEvento };
};

export default useEventos;