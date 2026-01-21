"use client";

import React, { useState, useEffect } from 'react';
import EventosList from './EventosList';
import EventosFilters from './EventosFilters';
import EventosModal from './EventosModal';
import EventosStats from './EventosStats';
import useEventos from './hooks/useEventos';

import { TranslateText } from '@/components/TranslateText';

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

const EventosPage: React.FC = () => {
  const { eventos, loading, error, createEvento, updateEvento, deleteEvento } = useEventos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(''); // Add activeTab state

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        requestAnimationFrame(() => setTheme(savedTheme as 'dark' | 'light'));
      }
    }
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      // Ignore if localStorage isn't available
    }
  };

  const handleOpenModal = (evento: Evento | null = null) => {
    setSelectedEvento(evento);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvento(null);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log("Cerrando sesión...");
  };

  const handleSaveEvento = (formData: FormData) => {
    if (selectedEvento) {
      // Actualizar evento existente
      updateEvento(selectedEvento.id, formData);
    } else {
      // Crear nuevo evento
      createEvento(formData);
    }
    handleCloseModal();
  };

  const handleDeleteEvento = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      deleteEvento(id);
    }
  };

  return (
    <div className="flex">
      
      <div className="flex-1">
        
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            <TranslateText text="Eventos" />
          </h1>
          <div className="mb-6">
            <EventosFilters onFilterChange={(filters) => console.log(filters)} />
          </div>
          <div className="mb-6">
            <EventosStats
              totalEventos={eventos.length}
              upcomingEventos={eventos.filter((e) => new Date(e.fecha_hora) > new Date()).length}
              pastEventos={eventos.filter((e) => new Date(e.fecha_hora) <= new Date()).length}
            />
          </div>
          <div className="mb-6">
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Crear Evento
            </button>
          </div>
          {loading ? (
            <p>Cargando eventos...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <EventosList 
              eventos={eventos} 
              onEdit={(evento) => handleOpenModal(evento as Evento)}
              onDelete={handleDeleteEvento}
            />
          )}
          <EventosModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSaveEvento}
            initialData={selectedEvento || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default EventosPage;
