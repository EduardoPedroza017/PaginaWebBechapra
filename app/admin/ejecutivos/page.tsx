"use client";

import React, { useState, useEffect } from 'react';
import { Plus, BarChart3, AlertCircle, TrendingUp, Users, Camera, Briefcase, CheckCircle, XCircle, FileText, Eye, Edit, Trash2, Upload } from 'lucide-react';

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

export default function EjecutivosPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
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

  useEffect(() => {
    setActiveExecutives(ejecutivos.filter(e => e.activo));
    setInactiveExecutives(ejecutivos.filter(e => !e.activo));
  }, [ejecutivos]);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        requestAnimationFrame(() => setTheme(savedTheme as 'dark' | 'light'));
      }
      
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

  const handleToggleTheme = () => {
    const newTheme = (theme === 'light' ? 'dark' : 'light');
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      // ignore if localStorage isn't available
    }
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

  if (!mounted) return null;

  return (
    <AdminPageShell containerClassName="flex min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      <main className="flex-1 p-6 md:p-8 lg:p-10 space-y-8">
          {/* Header de la página */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                <TranslateText text="Gestión de Ejecutivos" />
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                <TranslateText text="Administra la información de los ejecutivos de la organización" />
              </p>
            </div>

            {/* Botón principal de acción */}
            <button
              onClick={handleCreate}
              className="px-6 py-3.5 bg-linear-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 w-fit"
            >
              <Plus className="w-5 h-5" />
              <TranslateText text="Nuevo Ejecutivo" />
            </button>
          </div>

          {/* Tabs principales mejorados */}
          <div className="bg-linear-to-br from-white/90 to-slate-100/90 dark:from-gray-900/90 dark:to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('list')}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 flex-1 text-center ${
                  activeTab === 'list' || activeTab === 'activeList' || activeTab === 'inactiveList'
                    ? 'bg-linear-to-r from-slate-700 to-slate-800 text-white shadow-lg'
                    : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Users className="w-5 h-5" />
                <TranslateText text="Ejecutivos" />
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 flex-1 text-center ${
                  activeTab === 'stats'
                    ? 'bg-linear-to-r from-slate-700 to-slate-800 text-white shadow-lg'
                    : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <TranslateText text="Estadísticas" />
              </button>
            </div>
          </div>

          {/* Mensajes de estado */}
          {authError && (
            <div className="bg-linear-to-r from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 border border-rose-200 dark:border-rose-700 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <p className="text-rose-700 dark:text-rose-400 text-sm">{authError}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-linear-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-700 rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top duration-300">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <p className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">{successMessage}</p>
            </div>
          )}

          {/* Contenido basado en la pestaña activa */}
          {activeTab === 'stats' ? (
            <>
              {/* Resumen Ejecutivo */}
              <div className="bg-linear-to-br from-white/90 to-slate-100/90 dark:from-gray-900/90 dark:to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    <TranslateText text="Resumen Ejecutivo" />
                  </h3>
                </div>
                <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <TranslateText text="Esta sección proporciona una visión general de la gestión de ejecutivos. Aquí puedes analizar las estadísticas, distribuciones por puesto, estado activo y disponibilidad de fotos profesionales." />
                  </p>
                  <div className="flex items-center gap-3 mt-4 text-sm text-slate-600 dark:text-slate-400">
                    <Briefcase className="w-4 h-4" />
                    <span>
                      <TranslateText text="Total de puestos únicos:" /> 0
                    </span>
                  </div>
                </div>
              </div>

              {/* Estadísticas - Expandidas */}
              <div className="bg-linear-to-br from-white/90 to-slate-100/90 dark:from-gray-900/90 dark:to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    <TranslateText text="Estadísticas Detalladas" />
                  </h3>
                </div>
                <EjecutivosStats stats={stats} theme={theme} />
              </div>
            </>
          ) : (
            <>
              {/* Tabs de subcategoría para ejecutivos */}
              <div className="bg-linear-to-br from-white/90 to-slate-100/90 dark:from-gray-900/90 dark:to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTab('list')}
                    className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 flex-1 text-center ${
                      activeTab === 'list'
                        ? 'bg-linear-to-r from-slate-700 to-slate-800 text-white shadow-lg'
                        : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Users className="w-5 h-5" />
                    <TranslateText text="Todos" />
                  </button>
                  <button
                    onClick={() => setActiveTab('activeList')}
                    className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 flex-1 text-center ${
                      activeTab === 'activeList'
                        ? 'bg-linear-to-r from-slate-700 to-slate-800 text-white shadow-lg'
                        : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <TrendingUp className="w-5 h-5" />
                    <TranslateText text="Activos" />
                  </button>
                  <button
                    onClick={() => setActiveTab('inactiveList')}
                    className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 flex-1 text-center ${
                      activeTab === 'inactiveList'
                        ? 'bg-linear-to-r from-slate-700 to-slate-800 text-white shadow-lg'
                        : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <XCircle className="w-5 h-5" />
                    <TranslateText text="Inactivos" />
                  </button>
                </div>
              </div>

              {/* Bloque de estadísticas rápidas - SOLO para pestaña de Ejecutivos */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-linear-to-br from-white to-slate-50 dark:from-gray-900 dark:to-slate-900 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        <TranslateText text="Total" />
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-linear-to-br from-white to-slate-50 dark:from-gray-900 dark:to-slate-900 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        <TranslateText text="Activos" />
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.activos}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-linear-to-br from-white to-slate-50 dark:from-gray-900 dark:to-slate-900 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-rose-600 to-rose-800 flex items-center justify-center shadow-lg">
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        <TranslateText text="Inactivos" />
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.inactivos}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-linear-to-br from-white to-slate-50 dark:from-gray-900 dark:to-slate-900 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-600 to-indigo-800 flex items-center justify-center shadow-lg">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        <TranslateText text="Con Foto" />
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.con_foto}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filtros - SOLO para pestaña de Ejecutivos */}
              <div className="bg-linear-to-br from-white/90 to-slate-100/90 dark:from-gray-900/90 dark:to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    <TranslateText text="Filtros de Búsqueda" />
                  </h3>
                </div>
                <EjecutivosFilters
                  filters={filters}
                  onFiltersChange={applyFilters}
                  onClearFilters={clearFilters}
                  theme={theme}
                />
              </div>

              {/* Lista de ejecutivos */}
              <div className="bg-linear-to-br from-white/90 to-slate-100/90 dark:from-gray-900/90 dark:to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        <TranslateText text="Ejecutivos" />
                        <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">
                          {activeTab === 'list' && `(${ejecutivos.length} registros)`}
                          {activeTab === 'activeList' && `(${activeExecutives.length} activos)`}
                          {activeTab === 'inactiveList' && `(${inactiveExecutives.length} inactivos)`}
                        </span>
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-linear-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">
                          <TranslateText text="Agregar" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Renderizar lista según la pestaña activa */}
                {activeTab === 'list' && (
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
                    theme={theme}
                  />
                )}
                {activeTab === 'activeList' && (
                  <EjecutivosList
                    ejecutivos={activeExecutives}
                    loading={loading}
                    error={null}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCreate={handleCreate}
                    onUploadPhoto={handleUploadPhoto}
                    onToggleActive={handleToggleActive}
                    theme={theme}
                  />
                )}
                {activeTab === 'inactiveList' && (
                  <EjecutivosList
                    ejecutivos={inactiveExecutives}
                    loading={loading}
                    error={null}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCreate={handleCreate}
                    onUploadPhoto={handleUploadPhoto}
                    onToggleActive={handleToggleActive}
                    theme={theme}
                  />
                )}
              </div>
            </>
          )}
        </main>

        {/* Modales */}
        <EjecutivosForm
          ejecutivo={selectedEjecutivo}
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          loading={loading}
          theme={theme}
        />

        <EjecutivosModal
          ejecutivo={selectedEjecutivo}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onEdit={handleEdit}
          onUploadPhoto={handleUploadPhoto}
          theme={theme}
        />

        <EjecutivosPhotoUpload
          ejecutivo={selectedEjecutivo!}
          isOpen={showPhotoUpload}
          onClose={() => setShowPhotoUpload(false)}
          onUpload={handlePhotoUpload}
          loading={loading}
          theme={theme}
        />
      </AdminPageShell>
  );
}
