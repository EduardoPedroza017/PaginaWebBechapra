import React, { useState } from 'react';
import { Modal } from './utils/Modal';

interface Job {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  requirements?: string;
  location?: string;
  salary?: string;
  modality?: string;
  image_url?: string;
  is_active?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onSave: (updated: Job) => void;
}

export default function JobEditModal({ isOpen, onClose, job, onSave }: Props) {
  const [title, setTitle] = useState(job?.title || '');
  const [description, setDescription] = useState(job?.description || '');
  const [requirements, setRequirements] = useState(job?.requirements || '');
  const [location, setLocation] = useState(job?.location || '');
  const [modality, setModality] = useState(job?.modality || '');
  const [salary, setSalary] = useState(job?.salary || '');
  const [isActive, setIsActive] = useState(!!job?.is_active);

  // reset when job changes
  React.useEffect(() => {
    setTitle(job?.title || '');
    setDescription(job?.description || '');
    setRequirements(job?.requirements || '');
    setLocation(job?.location || '');
    setModality(job?.modality || '');
    setSalary(job?.salary || '');
    setIsActive(!!job?.is_active);
  }, [job]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;
    const updated: Job = {
      ...job,
      title,
      description,
      requirements,
      location,
      modality,
      salary,
      is_active: isActive
    };
    onSave(updated);
  };

  if (!job) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Editar vacante</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Título</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" />

            <label className="block text-sm font-medium mt-3 text-gray-700 dark:text-gray-300">Ubicación</label>
            <input value={location} onChange={e => setLocation(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" />

            <label className="block text-sm font-medium mt-3 text-gray-700 dark:text-gray-300">Modalidad</label>
            <input value={modality} onChange={e => setModality(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" />

            <div className="flex items-center gap-2 mt-3">
              <input id="active" type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="w-4 h-4" />
              <label htmlFor="active" className="text-sm text-gray-700 dark:text-gray-300">Vacante activa</label>
            </div>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Salario</label>
            <input value={salary} onChange={e => setSalary(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" />

            <label className="block text-sm font-medium mt-3 text-gray-700 dark:text-gray-300">Descripción</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 h-24" />

            <label className="block text-sm font-medium mt-3 text-gray-700 dark:text-gray-300">Requisitos</label>
            <textarea value={requirements} onChange={e => setRequirements(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 h-24" />
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">Guardar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
