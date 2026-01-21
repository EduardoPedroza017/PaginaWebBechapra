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
  id?: string;
  _id?: string; // Make `_id` optional
  title: string;
  description?: string;
  requirements?: string;
  image_url?: string;
  thumbnail_url?: string;
  location?: string;
  salary?: string;
  type?: string;
  modality?: string;
  company?: string;
  department?: string;
  is_active?: boolean;
  createdBy?: string;
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
  image_url?: string;
}

const JobsPage = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') return saved as 'dark' | 'light';
      }
    } catch {
      // ignore
    }
    return 'light';
  });
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [role, setRole] = useState('');
  const [admin, setAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Theme initialized from localStorage in the useState initializer to avoid
  // a flash / overwrite by child components (Header writes theme to storage)

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
      // Backend returns a paginated object { items, total, page, per_page }
      // Accept either an array or the paginated shape
      const items = Array.isArray(data) ? data : (data.items || data.jobs || []);
      setJobs(items);
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
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL no está definido");
      }
      // Build auth headers: prefer token, fall back to header-based dev bypass
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        const userEmail = (
          localStorage.getItem('user_email') ||
          sessionStorage.getItem('user_email') ||
          localStorage.getItem('user') ||
          sessionStorage.getItem('user') ||
          localStorage.getItem('email') ||
          sessionStorage.getItem('email') ||
          ''
        );
        const roleVal = localStorage.getItem('role') || sessionStorage.getItem('role') || '';
        const adminFlag = localStorage.getItem('admin') || sessionStorage.getItem('admin') || '';
        if (userEmail) headers['X-User'] = userEmail;
        if (roleVal) headers['X-Role'] = roleVal;
        if (adminFlag) headers['X-Admin'] = String(adminFlag);
      }

      const response = await fetch(`${apiUrl}/api/jobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...job,
          createdBy: role,
          status: 'active'
        }),
      });

      if (!response.ok) {
        let bodyText = '';
        try { bodyText = await response.text(); } catch {}
        console.error('[Jobs] create failed', response.status, response.statusText, bodyText);
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
    const id = (job as any).id || job._id;
    if (!id) {
      console.error("Job ID is undefined", job);
      return;
    }
    console.log('Job clicked:', job);
    // Aquí podrías navegar a una página de detalles
    // router.push(`/admin/jobs/${id}`);
  };

  const handleDelete = async (job: Job) => {
    const id = (job as any).id || job._id;
    if (!id) {
      console.error('Cannot delete job, id is undefined', job);
      return;
    }
    try {
      setLoading(true);
      await adminApi.deleteJob(id);
      setJobs(prev => prev.filter(j => ((j as any).id || j._id) !== id));
      setRefreshKey(k => k + 1);
    } catch (err: any) {
      console.error('Error deleting job', err);
      setError(err?.message || 'No se pudo eliminar la vacante');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (job: Job) => {
    const id = (job as any).id || job._id;
    if (!id) {
      console.error('Cannot edit job, id is undefined', job);
      return;
    }
    try {
      setLoading(true);
      // Build payload from job (avoid sending internal fields)
      const payload: any = {
        title: job.title,
        description: (job as any).description,
        requirements: (job as any).requirements,
        location: job.location,
        modality: job.modality,
        salary: (job as any).salary,
        is_active: (job as any).is_active
      };
      const res = await adminApi.updateJob(id, payload);
      // update local list
      setJobs(prev => prev.map(j => (((j as any).id || j._id) === id ? (res.data || res) : j)));
      setRefreshKey(k => k + 1);
    } catch (err: any) {
      console.error('Error updating job', err);
      setError(err?.message || 'No se pudo actualizar la vacante');
    } finally {
      setLoading(false);
    }
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
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        </main>

        {/* JobsForm modal rendered at top-level so it centers and adapts to theme */}
        <div className={theme === 'dark' ? 'dark' : ''}>
          <JobsForm
            onCreate={(job) => handleCreateJob(job)}
            isSubmitting={submitting}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </div>
      </div>
    </div>
  );
};

export default JobsPage;