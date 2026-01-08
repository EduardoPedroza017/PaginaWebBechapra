import React, { useState } from 'react';
import { Service } from './ServiceForm';
import { ServiceCard } from './ServiceCard';

interface Props {
  services: Service[];
  loading?: boolean;
  onEdit: (s: Service) => void;
  onDelete: (s: Service) => void;
  onToggleActive: (s: Service) => void;
  toggleLoading?: string | null;
}

const ITEMS_PER_PAGE = 5;

const SkeletonCard = () => (
  <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border animate-pulse h-full">
    <div className="h-44 bg-gray-200 dark:bg-gray-700" />
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
    </div>
  </div>
)

export const ServiceCardList: React.FC<Props> = ({ services, loading, onEdit, onDelete, onToggleActive, toggleLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
  const paginatedServices = services.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 items-stretch auto-rows-fr">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No hay servicios aún. Usa "Nuevo Servicio" para crear uno.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 items-stretch auto-rows-fr">
        {paginatedServices.map(s => (
          <ServiceCard key={s.id} service={s} onEdit={onEdit} onDelete={onDelete} onToggleActive={onToggleActive} toggleLoading={toggleLoading} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </>
  );
}

export default ServiceCardList;
