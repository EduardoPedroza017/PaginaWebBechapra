﻿"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, BarChart3, RefreshCw } from 'lucide-react';
import EventosList from './EventosList';
import EventosFilters from './EventosFilters';
import EventosModal from './EventosModal';
import EventosWizardForm from './EventosWizardForm';
import EventosStats from './EventosStats';
import useEventos from './hooks/useEventos';

import { TranslateText } from '@/components/TranslateText';
import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";
import { useTheme } from "../hooks";

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

type TabId = 'list' | 'create' | 'stats';

const EventosPage: React.FC = () => {
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();
  const themeStrict: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  const { eventos, loading, error, createEvento, updateEvento, deleteEvento } = useEventos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("list");
  const [refreshing, setRefreshing] = useState(false);
  const [useWizardForm, setUseWizardForm] = useState(true); // Usar wizard por defecto
  const [editingWizardEvento, setEditingWizardEvento] = useState<Evento | null>(null);
  
  const [loadingTabs, setLoadingTabs] = useState<Record<TabId, boolean>>({
    list: false,
    create: false,
    stats: false,
  });

  const handleTabChange = async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 300));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  useEffect(() => {
    requestAnimationFrame(() => {});
  }, []);

  const handleOpenModal = (evento: Evento | null = null) => {
    setSelectedEvento(evento);
    if (evento) {
      setEditingWizardEvento(evento);
    }
    setIsModalOpen(true);
  };

  const handleEventoSaved = (savedEvento: Record<string, unknown>) => {
    // Refresh will be handled by the useEventos hook
    setEditingWizardEvento(null);
  };

  const handleCloseWizard = () => {
    setEditingWizardEvento(null);
    setIsModalOpen(false);
    setSelectedEvento(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvento(null);
  };

  const handleSaveEvento = (formData: FormData) => {
    if (selectedEvento) {
      updateEvento(selectedEvento.id, formData);
    } else {
      createEvento(formData);
    }
    handleCloseModal();
  };

  const handleDeleteEvento = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      deleteEvento(id);
    }
  };

  const tabs: TabItem[] = [
    { id: 'list', label: 'Listado', icon: <Calendar size={18} /> },
    { id: 'create', label: 'Crear', icon: <Plus size={18} /> },
    { id: 'stats', label: 'Estadísticas', icon: <BarChart3 size={18} /> },
  ];

  if (!themeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  const upcomingEventos = eventos.filter((e) => new Date(e.fecha_hora) > new Date());
  const pastEventos = eventos.filter((e) => new Date(e.fecha_hora) <= new Date());

  return (
    <div className="min-h-screen">
      <AdminPageHeader
        title="Gestión de Eventos"
        subtitle="Administra los eventos de la organización"
        icon={<Calendar className="w-6 h-6 text-white" />}
        iconColor="purple"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: refreshing },
          add: { onClick: () => handleOpenModal(null), label: 'Crear Evento', loading: false }
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Eventos" }]}
      />

      <AdminTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tabId) => handleTabChange(tabId as TabId)}
        loadingTabs={loadingTabs}
        theme={themeStrict}
        variant="pills"
      />

      <AdminSection theme={themeStrict}>
        {activeTab === 'stats' && (
          <EventosStats
            totalEventos={eventos.length}
            upcomingEventos={upcomingEventos.length}
            pastEventos={pastEventos.length}
          />
        )}

        {activeTab === 'create' && (
          <div>
            {/* Toggle entre formularios */}
            <div className="mb-4 flex items-center gap-4">
              <span className={`text-sm font-medium ${themeStrict === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Formulario:
              </span>
              <button
                onClick={() => setUseWizardForm(true)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  useWizardForm
                    ? 'bg-blue-600 text-white'
                    : themeStrict === 'dark'
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-200 text-gray-600'
                }`}
              >
                Wizard (Nuevo)
              </button>
              <button
                onClick={() => setUseWizardForm(false)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  !useWizardForm
                    ? 'bg-blue-600 text-white'
                    : themeStrict === 'dark'
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-200 text-gray-600'
                }`}
              >
                Tradicional
              </button>
            </div>
            
            {useWizardForm ? (
              <EventosWizardForm
                isOpen={true}
                onClose={() => setActiveTab("list")}
                onSaved={handleEventoSaved}
                initialData={undefined}
                theme={themeStrict}
              />
            ) : (
              <EventosModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSaveEvento}
                initialData={undefined}
              />
            )}
          </div>
        )}

        {activeTab === 'list' && (
          <>
            <EventosFilters onFilterChange={(filters) => console.log(filters)} />
            
            {loading ? (
              <div className="rounded-lg border p-12 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-600 mb-4"></div>
                <p className={themeStrict === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  <TranslateText text="Cargando eventos..." />
                </p>
              </div>
            ) : error ? (
              <div className={`rounded-lg border p-6 ${
                themeStrict === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <p className={themeStrict === 'dark' ? 'text-red-400' : 'text-red-600'}>{error}</p>
              </div>
            ) : (
              <EventosList 
                eventos={eventos} 
                onEdit={(evento) => handleOpenModal(evento as Evento)}
                onDelete={handleDeleteEvento}
              />
            )}
          </>
        )}
      </AdminSection>

      <EventosModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveEvento}
        initialData={selectedEvento || undefined}
      />
      
      {/* Wizard Form for Editing */}
      <EventosWizardForm
        isOpen={!!editingWizardEvento}
        onClose={handleCloseWizard}
        onSaved={handleEventoSaved}
        initialData={editingWizardEvento || undefined}
        theme={themeStrict}
      />
    </div>
  );
};

export default EventosPage;
