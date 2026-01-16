import React from 'react';
import EventosForm from './EventosForm';

interface EventosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: { titulo: string; fecha_hora: string; ubicacion: string; descripcion: string; categoria: string; estado: boolean };
}

const EventosModal: React.FC<EventosModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {initialData ? 'Editar Evento' : 'Crear Evento'}
        </h2>
        <EventosForm onSubmit={onSubmit} initialData={initialData} />
      </div>
    </div>
  );
};

export default EventosModal;