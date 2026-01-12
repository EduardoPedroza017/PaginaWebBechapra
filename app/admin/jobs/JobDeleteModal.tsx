import React from 'react';
import { Modal } from './utils/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function JobDeleteModal({ isOpen, onClose, onDelete }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <div className="flex flex-col items-start gap-4">
        <div className="w-full flex items-center gap-3">
          <div className="bg-red-100 text-red-700 rounded-full w-10 h-10 flex items-center justify-center">!</div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Confirmar eliminación</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">¿Estás seguro de que deseas eliminar esta vacante? Esta acción no se puede deshacer.</p>
        <div className="w-full flex justify-end gap-3 mt-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">Cancelar</button>
          <button onClick={onDelete} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white">Eliminar</button>
        </div>
      </div>
    </Modal>
  );
}
