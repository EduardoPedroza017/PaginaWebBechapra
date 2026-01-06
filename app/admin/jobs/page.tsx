"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import JobsList from './JobsList';
import JobsForm from './JobsForm';
import { TranslateText } from '@/components/TranslateText';
import { Sidebar } from '../dashboard/Sidebar';
import { Header } from '../dashboard/Header';
import { Briefcase, Plus, RefreshCw, AlertCircle } from 'lucide-react';import { adminApi } from '../utils/admin-api';
// Adjust the `Job` type to ensure `updatedAt` is consistently optional
interface Job {
  _id?: string; // Make `_id` optional
  title: string;
  description?: string;
  location?: string;
  salary?: string;
  type?: string;
  createdAt?: string; // Make `createdAt` optional
  updatedAt?: string; // Make `updatedAt` optional
}

interface JobInput {
  title: string;
  description: string;
  requirements: string;
  location: string;
  modality: string;
  salary: string;
}

const JobsPage = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [role, setRole] = useState('');
  const [admin, setAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sincronizar tema con localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      }
    }
  }, []);

  // Verificar autenticación
  useEffect(() => {
    const adminVal = sessionStorage.getItem('admin') === 'true';
    const roleVal = sessionStorage.getItem('role') || '';
    setAdmin(adminVal);
    setRole(roleVal);
  }, []);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.getJobs();
      setJobs(Array.isArray(data) ? data : data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('No se pudieron cargar las vacantes. Intenta de nuevo.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs, refreshKey]);

  // Adjust the handleCreateJob function to use JobInput
  const handleCreateJob = async (job: JobInput) => {
    try {
      setSubmitting(true);
      setError(null);
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/jobs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          ...job,
          createdBy: role,
          status: 'active'
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la vacante');
      }

      const data = await response.json();
      
      setJobs(prev => [data.data, ...prev]);
      setRefreshKey(prev => prev + 1);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error creating job:', error);
      setError('Error al crear la vacante. Verifica tu conexión.');
      return Promise.reject(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem('token');
    router.push('/admin');
  };

  // Correct the explicit cast syntax for `handleJobClick`
  const handleJobClick = (job: Job): void => {
    if (!job._id) {
      console.error("Job ID is undefined");
      return;
    }
    console.log('Job clicked:', job);
    // Aquí podrías navegar a una página de detalles
    // router.push(`/admin/jobs/${job._id}`);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-linear-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-linear-to-br from-white via-slate-50 to-slate-100'
    }`}>
      <Sidebar selected="/admin/jobs" theme={theme} role={role} admin={admin} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onLogout={handleLogout}
          onToggleTheme={handleToggleTheme}
          theme={theme}
          role={role}
          admin={admin}
        />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-350 mx-auto w-full overflow-y-auto">
          {/* Header de la página */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl shadow-lg ${
                  theme === 'dark' 
                    ? 'bg-linear-to-br from-blue-600 to-blue-700 shadow-blue-500/30' 
                    : 'bg-linear-to-br from-blue-500 to-blue-600 shadow-blue-500/30'
                }`}>
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className={`text-2xl md:text-3xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    <TranslateText text="Feria de Empleo" />
                  </h1>
                  <p className={`text-sm font-medium mt-0.5 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <TranslateText text="Gestión de vacantes laborales" />
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 disabled:opacity-50'
                      : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 disabled:opacity-50'
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <TranslateText text="Actualizar" />
                </button>

                <button
                  onClick={handleOpenModal}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-green-700 hover:bg-green-600 text-white border border-green-600'
                      : 'bg-green-500 hover:bg-green-400 text-white border border-green-500'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <TranslateText text="Crear Vacante" />
                </button>
              </div>
            </div>
            
            {error && (
              <div className={`mb-6 p-4 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-red-900/20 border-red-700/50 text-red-300'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de vacantes */}
            <div className="lg:col-span-2">
              <div className={`rounded-2xl p-6 ${
                theme === 'dark'
                  ? 'bg-slate-900/50 backdrop-blur-sm border border-slate-700/50'
                  : 'bg-white/80 backdrop-blur-sm border border-slate-200/60'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    <TranslateText text="Vacantes activas" />
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    theme === 'dark'
                      ? 'bg-blue-900/40 text-blue-300'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {jobs.length} <TranslateText text="vacantes" />
                  </span>
                </div>
                
                <JobsList 
                  jobs={jobs}
                  loading={loading}
                  emptyMessage="No hay vacantes publicadas"
                  onJobClick={handleJobClick}
                />
              </div>
            </div>
            
            {/* Formulario para crear vacantes */}
            <div>
              <div className={`sticky top-8 rounded-2xl p-6 ${
                theme === 'dark'
                  ? 'bg-slate-900/50 backdrop-blur-sm border border-slate-700/50'
                  : 'bg-white/80 backdrop-blur-sm border border-slate-200/60'
              }`}>
                <div className="flex items-center gap-2 mb-6">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'
                  }`}>
                    <Plus className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    }`} />
                  </div>
                  <h2 className={`text-xl font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    <TranslateText text="Nueva vacante" />
                  </h2>
                </div>
                
                <p className={`text-sm mb-6 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <TranslateText text="Completa los detalles para publicar una nueva vacante laboral" />
                </p>
                
                <JobsForm 
                  onCreate={(job) => handleCreateJob(job)}
                  isSubmitting={submitting}
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobsPage;