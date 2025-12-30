import React, { useState } from 'react';
import { Briefcase, Clock, MapPin, DollarSign, Building, Users, Calendar, X } from 'lucide-react';
import { TranslateText } from '@/components/TranslateText';
import { motion, AnimatePresence } from 'framer-motion';

interface Job {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  location?: string;
  salary?: string;
  type?: string;
  modality?: string;
  company?: string;
  department?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface JobsListProps {
  jobs: Job[];
  loading?: boolean;
  emptyMessage?: string;
  onJobClick?: (job: Job) => void;
  onEdit?: (job: Job) => void;
  onDelete?: (job: Job) => void;
}

// Define the ModalProps interface
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Example usage for Delete Modal
const DeleteModal: React.FC<{ isOpen: boolean; onClose: () => void; onDelete: () => void }> = ({ isOpen, onClose, onDelete }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Confirmar eliminación</h2>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">¿Estás seguro de que deseas eliminar esta vacante?</p>
    <div className="flex justify-end gap-3">
      <button
        onClick={onClose}
        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
      >
        Cancelar
      </button>
      <button
        onClick={onDelete}
        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
      >
        Eliminar
      </button>
    </div>
  </Modal>
);

// Example usage for Edit Modal
const EditModal: React.FC<{ isOpen: boolean; onClose: () => void; job: Job; onSave: (updatedJob: Job) => void }> = ({ isOpen, onClose, job, onSave }) => {
  const [updatedJob, setUpdatedJob] = useState(job);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedJob((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Editar vacante</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(updatedJob);
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Título
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={updatedJob.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border"
          />
        </div>
        {/* Add other fields similarly */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          >
            Guardar
          </button>
        </div>
      </form>
    </Modal>
  );
};

const JobsList: React.FC<JobsListProps> = ({ 
  jobs, 
  loading = false,
  emptyMessage = "No hay vacantes disponibles",
  onJobClick, 
  onEdit,
  onDelete
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getJobId = (job: Job) => job._id || job.id || Math.random().toString();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i}
            className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
          <Briefcase className="w-10 h-10 text-blue-500 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
          <TranslateText text={emptyMessage} />
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          <TranslateText text="No se encontraron vacantes disponibles. Publica una nueva oportunidad laboral para comenzar." />
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            <TranslateText text="Vacantes Disponibles" />
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            <TranslateText text="Explora nuestras oportunidades laborales" />
          </p>
        </div>
        <div className="px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
          <TranslateText text={`${jobs.length} ${jobs.length === 1 ? 'vacante' : 'vacantes'}`} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={getJobId(job)}
            onClick={() => onJobClick?.(job)}
            className={`
              group relative bg-white dark:bg-gray-900 rounded-2xl p-6
              border border-gray-200 dark:border-gray-800
              transition-all duration-300
              hover:shadow-2xl hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-700
              ${onJobClick ? 'cursor-pointer' : ''}
              overflow-hidden
            `}
          >
            {/* Efecto de fondo sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/20 group-hover:to-indigo-50/20 dark:group-hover:from-blue-900/10 dark:group-hover:to-indigo-900/10 transition-all duration-300"></div>
            
            {/* Header de la tarjeta */}
            <div className="relative flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-1">
                  {job.title && job.title.trim() !== '' ? job.title : 'Vacante sin título'}
                </h3>
                {(job.company || job.department) && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    {job.company && (
                      <>
                        <Building className="w-3 h-3" />
                        <span>{job.company}</span>
                      </>
                    )}
                    {job.company && job.department && <span className="mx-1">•</span>}
                    {job.department && (
                      <>
                        <Users className="w-3 h-3" />
                        <span>{job.department}</span>
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Descripción */}
            {job.description && (
              <div className="relative mb-6">
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed">
                  {job.description}
                </p>
              </div>
            )}

            {/* Badges de información */}
            <div className="relative space-y-3">
              <div className="flex flex-wrap gap-2">
                {job.location && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
                    <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{job.location}</span>
                  </div>
                )}
                
                {job.salary && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm">
                    <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-green-700 dark:text-green-300">{job.salary}</span>
                  </div>
                )}
                
                {job.type && (
                  <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
                    <span className="font-medium text-blue-700 dark:text-blue-300">{job.type}</span>
                  </div>
                )}
                
                {job.modality && (
                  <div className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-sm">
                    <span className="font-medium text-purple-700 dark:text-purple-300">{job.modality}</span>
                  </div>
                )}
              </div>

              {/* Fecha */}
              {job.createdAt && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Publicado:</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {formatDate(job.createdAt)}
                  </span>
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="relative mt-6 flex gap-2">
              <button
                onClick={() => onJobClick?.(job)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium text-sm transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <TranslateText text="Ver detalles" />
              </button>

              <button
                onClick={() => onEdit?.(job)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium text-sm transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <TranslateText text="Editar" />
              </button>

              <button
                onClick={() => onDelete?.(job)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium text-sm transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <TranslateText text="Eliminar" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsList;