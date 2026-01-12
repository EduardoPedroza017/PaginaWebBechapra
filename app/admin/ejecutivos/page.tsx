"use client";

import React, { useState, useEffect } from 'react';
import { Plus, BarChart3, AlertCircle } from 'lucide-react';
import { Sidebar } from '../dashboard/Sidebar';
import { Header } from '../dashboard/Header';
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

export default function EjecutivosPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'stats'>('list');

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

  // Estadísticas (simuladas por ahora - en una implementación real vendrían del backend)
  const [stats] = useState({
    total: ejecutivos.length,
    activos: ejecutivos.filter(e => e.activo).length,
    inactivos: ejecutivos.filter(e => !e.activo).length,
    con_foto: ejecutivos.filter(e => e.foto_url).length,
    sin_foto: ejecutivos.filter(e => !e.foto_url).length,
    puestos: [] as Array<{ _id: string; count: number }>,
    carreras: [] as Array<{ _id: string; count: number }>,
  });

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        requestAnimationFrame(() => setTheme(savedTheme as 'dark' | 'light'));
      }
      
      // Check for authentication: either token OR header-based auth (user_email + role + admin)
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const userEmail = localStorage.getItem('user_email') || sessionStorage.getItem('user_email');
      const role = localStorage.getItem('role') || sessionStorage.getItem('role');
      const admin = localStorage.getItem('admin') || sessionStorage.getItem('admin');
      
      // Valid auth: either token exists OR (userEmail + role + admin) for header-based auth
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
    // Check for either token OR header-based auth (user_email + role + admin)
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
    console.log('[DEBUG handleSave] Auth check passed:', { token: !!token, hasHeaderAuth, userEmail, role, admin });
    
    try {
      let ejecutivo;
      if (selectedEjecutivo) {
        ejecutivo = await updateEjecutivo(selectedEjecutivo._id, data);
      } else {
        ejecutivo = await createEjecutivo(data);
      }

      // Si hay foto seleccionada, subirla
      if (photo && ejecutivo) {
        await uploadFoto(ejecutivo._id, photo);
      }

      if (ejecutivo) {
        // refrescar lista en la primera página y mostrar mensaje
        fetchEjecutivos({ page: 1, per_page: pagination.per_page });
        setSuccessMessage(selectedEjecutivo ? 'Ejecutivo actualizado correctamente.' : 'Ejecutivo creado correctamente.');
        // cerrar modal
        setShowForm(false);
        // limpiar seleccion
        setSelectedEjecutivo(null);
        // borrar mensaje despues de unos segundos
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        // si no se creó, dejar que el error global lo maneje
        setSuccessMessage(null);
      }
    } catch (err) {
      // errores ya manejados en hook; mostrar si hay
      setSuccessMessage(null);
    }
  };

  const handlePhotoUpload = async (id: string, file: File) => {
    await uploadFoto(id, file);
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Sidebar selected="ejecutivos" theme={theme} />

      <div className="flex-1 flex flex-col">
        <Header onLogout={() => {}} onToggleTheme={handleToggleTheme} theme={theme} />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  <TranslateText text="Gestión de Ejecutivos" />
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  <TranslateText text="Administra la información de los ejecutivos de la organización" />
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setActiveTab(activeTab === 'list' ? 'stats' : 'list')}
                  className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 flex items-center gap-2 font-medium border border-gray-200 dark:border-gray-700"
                >
                  <BarChart3 className="w-4 h-4" />
                  {activeTab === 'list' ? <TranslateText text="Ver Estadísticas" /> : <TranslateText text="Ver Lista" />}
                </button>

                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <TranslateText text="Nuevo Ejecutivo" />
                </button>
              </div>
            </div>

            {/* Error de autenticación */}
            {authError && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                      <TranslateText text="Autenticación requerida" />
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-300 mt-1">{authError}</p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                      Accede a través del sistema de login para obtener un token válido.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error global */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                      <TranslateText text="Error" />
                    </h3>
                    <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success global */}
            {successMessage && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">¡Éxito!</h3>
                    <p className="text-green-700 dark:text-green-300 mt-1">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contenido principal */}
            {activeTab === 'list' ? (
              <>
                {/* Filtros */}
                <EjecutivosFilters
                  filters={filters}
                  onFiltersChange={applyFilters}
                  onClearFilters={clearFilters}
                  theme={theme}
                />

                {/* Lista de ejecutivos */}
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

                {/* Paginación */}
                {pagination.total_pages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => changePage(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      className="px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <TranslateText text="Anterior" />
                    </button>

                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      <TranslateText text="Página" /> {pagination.page} <TranslateText text="de" /> {pagination.total_pages}
                    </span>

                    <button
                      onClick={() => changePage(pagination.page + 1)}
                      disabled={pagination.page >= pagination.total_pages}
                      className="px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <TranslateText text="Siguiente" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Estadísticas */
              <EjecutivosStats stats={stats} theme={theme} />
            )}
          </div>
        </main>
      </div>

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
    </div>
  );
}