"use client";

import React, { useState, useEffect, useCallback } from 'react';
import JobsList from './JobsList';
import JobsForm from './JobsForm';
import { TranslateText } from '@/components/TranslateText';
import { Briefcase, AlertCircle } from 'lucide-react';
import { adminApi, JobItem } from '../utils/admin-api';
import type { Job as JobType } from './JobsList';
import AdminPageHeader from '../components/ui/AdminPageHeader';
import AdminSection from '../components/ui/AdminSection';
import { useTheme } from '../hooks';

// Interfaz para el formulario de creación
interface JobInput {
  title: string;
  description: string;
  requirements: string;
  location: string;
  modality: string;
  salary?: string;
  image_url?: string;
}

const JobsPage = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { resolvedTheme, themeReady } = useTheme();
  const themeStrict: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [role, setRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Verificar autenticación
  useEffect(() => {
    const roleVal = sessionStorage.getItem('role') || '';
    setRole(roleVal);
  }, []);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.getJobs();
      // Backend returns a paginated object { items, total, page, per_page }
      const items = Array.isArray(data) ? data : (data.items || []);
      setJobs(items as JobItem[]);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('No se pudieron cargar las vacantes. Intenta de nuevo.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs, refreshKey]);

  const handleCreateJob = async (job: JobInput) => {
    try {
      setSubmitting(true);
      setError(null);
      
      await adminApi.createJob({
        ...job,
        createdBy: role,
        is_active: true
      });
      
      setRefreshKey(prev => prev + 1);
      return Promise.resolve();
    } catch (err) {
      console.error('Error creating job:', err);
      setError('Error al crear la vacante. Verifica tu conexión.');
      return Promise.reject(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setRefreshKey(prev => prev + 1);
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleJobClick = (job: JobItem): void => {
    console.log('Job clicked:', job);
  };

  const handleDelete = async (job: JobItem) => {
    const id = job._id || job.id;
    if (!id) {
      console.error('Cannot delete job, id is undefined', job);
      return;
    }
    try {
      setLoading(true);
      await adminApi.deleteJob(id);
      setJobs(prev => prev.filter(j => (j._id || j.id) !== id));
      setRefreshKey(k => k + 1);
    } catch (err) {
      console.error('Error deleting job', err);
      setError(err instanceof Error ? err.message : 'No se pudo eliminar la vacante');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (job: JobItem) => {
    const id = job._id || job.id;
    if (!id) {
      console.error('Cannot edit job, id is undefined', job);
      return;
    }
    try {
      setLoading(true);
      const payload = {
        title: job.title,
        description: job.description,
        requirements: job.requirements,
        location: job.location,
        modality: job.modality,
        is_active: job.is_active
      };
      const res = await adminApi.updateJob(id, payload);
      setJobs(prev => prev.map(j => (j._id || j.id) === id ? ((res as JobItem) || j) : j));
      setRefreshKey(k => k + 1);
    } catch (err) {
      console.error('Error updating job', err);
      setError(err instanceof Error ? err.message : 'No se pudo actualizar la vacante');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (!themeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminPageHeader
        title="Feria de Empleo"
        subtitle="Gestión de vacantes laborales"
        icon={<Briefcase className="w-6 h-6 text-white" />}
        iconColor="blue"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: refreshing },
          add: { onClick: handleOpenModal, label: 'Crear Vacante' }
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Empleo" }]}
      />

      <AdminSection theme={themeStrict}>
        {error && (
          <div className={`mb-6 p-4 rounded-xl border ${
            themeStrict === 'dark'
              ? 'bg-red-900/20 border-red-700/50 text-red-300'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className={`rounded-2xl p-6 ${
          themeStrict === 'dark'
            ? 'bg-slate-900/50 backdrop-blur-sm border border-slate-700/50'
            : 'bg-white/80 backdrop-blur-sm border border-slate-200/60'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${
              themeStrict === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <TranslateText text="Vacantes activas" />
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              themeStrict === 'dark'
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
      </AdminSection>

      <div className={themeStrict === 'dark' ? 'dark' : ''}>
        <JobsForm
          onCreate={(job) => handleCreateJob(job)}
          isSubmitting={submitting}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default JobsPage;

