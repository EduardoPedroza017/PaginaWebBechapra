"use client";

import React, { useState, useEffect } from 'react';
import { Plus, BarChart3, AlertCircle, TrendingUp, Camera, Briefcase, CheckCircle, XCircle, FileText, Eye, Edit, Trash2, Upload } from 'lucide-react';

import { TranslateText } from '@/components/TranslateText';

// Hooks y tipos
import { useEjecutivos, EjecutivoFormData } from './hooks/useEjecutivos';
import type { Ejecutivo } from './hooks/useEjecutivos';

// Componentes
import { EjecutivosFilters } from './EjecutivosFilters';
import { EjecutivosList } from './EjecutivosList';
import { EjecutivosForm } from './EjecutivosForm';
import { EjecutivosModal } from './EjecutivosModal';
import { EjecutivosStats } from './EjecutivosStats';
import { EjecutivosPhotoUpload } from './EjecutivosPhotoUpload';
import AdminPageShell from '@/app/admin/components/layout/AdminPageShell';
import AdminPageHeader from '../components/ui/AdminPageHeader';
import AdminTabs, { TabItem } from '../components/ui/AdminTabs';
import AdminSection from '../components/ui/AdminSection';
import { useTheme } from '../hooks';
import { Users } from 'lucide-react';

export default function EjecutivosPage() {
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();
  const themeStrict: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'stats' | 'activeList' | 'inactiveList'>('list');

  // Estados de modales
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [selectedEjecutivo, setSelectedEjecutivo] = useState<Ejecutivo | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Hook de ejecutivos
  const {
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
  } = useEjecutivos();

  // Estadísticas mejoradas
  const stats = {
    total: ejecutivos.length,
    activos: ejecutivos.filter(e => e.activo).length,
    inactivos: ejecutivos.filter(e => !e.activo).length,
    con_foto: ejecutivos.filter(e => e.foto_url).length,
    sin_foto: ejecutivos.filter(e => !e.foto_url).length,
    puestos: [] as Array<{ _id: string; count: number }>,
    carreras: [] as Array<{ _id: string; count: number }>,
  };

  const [activeExecutives, setActiveExecutives] = useState<Ejecutivo[]>([]);
  const [inactiveExecutives, setInactiveExecutives] = useState<Ejecutivo[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setActiveExecutives(ejecutivos.filter(e => e.activo));
    setInactiveExecutives(ejecutivos.filter(e => !e.activo));
  }, [ejecutivos]);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const userEmail = localStorage.getItem('user_email') || sessionStorage.getItem('user_email');
      const role = localStorage.getItem('role') || sessionStorage.getItem('role');
      const admin = localStorage.getItem('admin') || sessionStorage.getItem('admin');
      
      const hasHeaderAuth = userEmail && role && admin;
      
      if (!token && !hasHeaderAuth) {
        setAuthError('No hay autenticación. Por favor, inicia sesión para acceder a esta sección.');
      } else {
        setAuthError(null);
      }
    }
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchEjecutivos({ page: 1, per_page: pagination.per_page });
    setTimeout(() => setRefreshing(false), 500);
  };

  // Handlers para acciones
  const handleCreate = () => {
    setSelectedEjecutivo(null);
    setShowForm(true);
  };

  const handleEdit = (ejecutivo: Ejecutivo) => {
    setSelectedEjecutivo(ejecutivo);
    setShowForm(true);
  };

  const handleView = (ejecutivo: Ejecutivo) => {
    setSelectedEjecutivo(ejecutivo);
    setShowModal(true);
  };

  const handleDelete = async (ejecutivo: Ejecutivo) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${ejecutivo.nombre} ${ejecutivo.apellido_paterno}?`)) {
      await deleteEjecutivo(ejecutivo._id);
    }
  };

  const handleUploadPhoto = (ejecutivo: Ejecutivo) => {
    setSelectedEjecutivo(ejecutivo);
    setShowPhotoUpload(true);
  };

  const handleToggleActive = async (ejecutivo: Ejecutivo, activo: boolean) => {
    try {
      const updated = await updateEjecutivo(ejecutivo._id, { activo });
      if (updated) {
        fetchEjecutivos({ page: pagination.page, per_page: pagination.per_page });
        setSuccessMessage('Estado actualizado correctamente.');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      // error handled in hook
    }
  };

  const handleSave = async (data: EjecutivoFormData, photo?: File | null) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userEmail = localStorage.getItem('user_email') || sessionStorage.getItem('user_email');
    const role = localStorage.getItem('role') || sessionStorage.getItem('role');
    const admin = localStorage.getItem('admin') || sessionStorage.getItem('admin');
    
    const hasHeaderAuth = userEmail && role && admin;
    
    if (!token && !hasHeaderAuth) {
      setAuthError('No hay autenticación. Por favor, inicia sesión para crear o editar ejecutivos.');
      return;
    }

    setAuthError(null);
    
    try {
      let ejecutivo;
      if (selectedEjecutivo) {
        ejecutivo = await updateEjecutivo(selectedEjecutivo._id, data);
      } else {
        ejecutivo = await createEjecutivo(data);
      }

      if (photo && ejecutivo) {
        await uploadFoto(ejecutivo._id, photo);
      }

      if (ejecutivo) {
        fetchEjecutivos({ page: 1, per_page: pagination.per_page });
        setSuccessMessage(selectedEjecutivo ? 'Ejecutivo actualizado correctamente.' : 'Ejecutivo creado correctamente.');
        setShowForm(false);
        setSelectedEjecutivo(null);
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setSuccessMessage(null);
      }
    } catch (err) {
      setSuccessMessage(null);
    }
  };

  const handlePhotoUpload = async (id: string, file: File) => {
    await uploadFoto(id, file);
  };

  if (!mounted || !themeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminPageHeader
        title="Gestión de Ejecutivos"
        subtitle="Administra la información de los ejecutivos de la organización"
        icon={<Users className="w-6 h-6 text-white" />}
        iconColor="blue"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: refreshing },
          add: { onClick: handleCreate, label: 'Nuevo Ejecutivo' }
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Ejecutivos" }]}
      />

      <AdminTabs
        tabs={[
          { id: 'list', label: 'Ejecutivos', icon: <Users size={18} /> },
          { id: 'stats', label: 'Estadísticas', icon: <BarChart3 size={18} /> },
        ]}
        activeTab={activeTab === 'list' || activeTab === 'activeList' || activeTab === 'inactiveList' ? 'list' : 'stats'}
        onChange={(tabId) => setActiveTab(tabId as typeof activeTab)}
        theme={themeStrict}
        variant="pills"
      />

      <AdminSection theme={themeStrict}>
        {/* Mensajes de estado */}
        {authError && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-red-700 dark:text-red-400 text-sm">{authError}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top duration-300">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-green-700 dark:text-green-400 text-sm font-medium">{successMessage}</p>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Resumen Ejecutivo */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  <TranslateText text="Resumen Ejecutivo" />
                </h3>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  <TranslateText text="Esta sección proporciona una visión general de la gestión de ejecutivos. Aquí puedes analizar las estadísticas, distribuciones por puesto, estado activo y disponibilidad de fotos profesionales." />
                </p>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
              <EjecutivosStats stats={stats} theme={themeStrict} />
            </div>
          </div>
        )}

        {activeTab !== 'stats' && (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider">Total</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider">Activos</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activos}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider">Inactivos</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inactivos}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider">Con Foto</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.con_foto}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
              <EjecutivosFilters
                filters={filters}
                onFiltersChange={applyFilters}
                onClearFilters={clearFilters}
                theme={themeStrict}
              />
            </div>

            {/* List */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      <TranslateText text="Ejecutivos" />
                      <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">
                        ({ejecutivos.length} registros)
                      </span>
                    </h3>
                  </div>
                </div>
              </div>

              <EjecutivosList
                ejecutivos={ejecutivos}
                loading={loading}
                error={null}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
                onUploadPhoto={handleUploadPhoto}
                onToggleActive={handleToggleActive}
                theme={themeStrict}
              />
            </div>
          </>
        )}
      </AdminSection>

      {/* Modales */}
      <EjecutivosForm
        ejecutivo={selectedEjecutivo}
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
        loading={loading}
        theme={themeStrict}
      />

      <EjecutivosModal
        ejecutivo={selectedEjecutivo}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onEdit={handleEdit}
        onUploadPhoto={handleUploadPhoto}
        theme={themeStrict}
      />

      <EjecutivosPhotoUpload
        ejecutivo={selectedEjecutivo!}
        isOpen={showPhotoUpload}
        onClose={() => setShowPhotoUpload(false)}
        onUpload={handlePhotoUpload}
        loading={loading}
        theme={themeStrict}
      />
    </div>
  );
}
