import React from 'react';
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
  company?: string;
  department?: string;
  createdAt?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export default function JobViewModal({ isOpen, onClose, job }: Props) {
  if (!job) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="flex flex-col md:flex-row gap-6">
        {job.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <div className="w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden shadow-inner">
            <img src={job.image_url} alt={job.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-full md:w-1/3 h-48 md:h-auto rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold">No imagen</span>
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">{job.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{job.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {job.location && <div className="text-sm"><strong>Ubicación:</strong> <div className="text-gray-700 dark:text-gray-300">{job.location}</div></div>}
            {job.salary && <div className="text-sm"><strong>Salario:</strong> <div className="text-gray-700 dark:text-gray-300">{job.salary}</div></div>}
            {job.modality && <div className="text-sm"><strong>Modalidad:</strong> <div className="text-gray-700 dark:text-gray-300">{job.modality}</div></div>}
            {job.company && <div className="text-sm"><strong>Empresa:</strong> <div className="text-gray-700 dark:text-gray-300">{job.company}</div></div>}
          </div>

          {job.requirements && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Requisitos</h4>
              <div className="prose prose-sm dark:prose-invert text-gray-700 dark:text-gray-300 max-h-40 overflow-auto whitespace-pre-wrap">{job.requirements}</div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
